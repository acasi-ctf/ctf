package termproxy

import (
	"context"
	"encoding/base64"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"strings"

	"github.com/acasi-ctf/ctf/pb"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"golang.org/x/crypto/ssh"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
)

type termproxyServiceImpl struct {
	pb.UnimplementedTermproxyServiceServer
}

func key(path string) ssh.AuthMethod {
	key, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	signer, err := ssh.ParsePrivateKey(key)
	if err != nil {
		panic(err)
	}
	return ssh.PublicKeys(signer)
}

// Writing this callback manually to avoid errors from the linter.
// TODO: Implement host key checking, as we can potentially find it during
//  spin up of the environment.
func insecureHostKeyCallback() ssh.HostKeyCallback {
	return func(hostname string, remote net.Addr, key ssh.PublicKey) error {
		return nil
	}
}

func (tp *termproxyServiceImpl) ProxyTerminal(srv pb.TermproxyService_ProxyTerminalServer) error {
	config := &ssh.ClientConfig{
		User: "player",
		Auth: []ssh.AuthMethod{
			key("/home/lgorence/.ssh/id_rsa"),
		},
		HostKeyCallback: insecureHostKeyCallback(),
	}

	sshConn, err := ssh.Dial("tcp", "localhost:2222", config)
	if err != nil {
		return err
	}

	defer sshConn.Close()

	client, err := sshConn.NewSession()
	if err != nil {
		return err
	}
	defer client.Close()

	clientStdout, err := client.StdoutPipe()
	if err != nil {
		return err
	}

	clientStderr, err := client.StderrPipe()
	if err != nil {
		return err
	}

	clientStdin, err := client.StdinPipe()
	if err != nil {
		return err
	}

	// TODO: We need to send size updates.
	err = client.RequestPty("xterm-256color", 24, 80, ssh.TerminalModes{})
	if err != nil {
		return err
	}

	err = client.Shell()
	if err != nil {
		return err
	}

	errChan := make(chan error)

	go sshPipe(srv, clientStdout, errChan)()
	go sshPipe(srv, clientStderr, errChan)()
	go grpcReadLoop(srv, clientStdin, errChan)()

	select {
	case err = <-errChan:
		if err != nil {
			log.Printf("error occurred during read or write: %v", err)
		}
	case <-srv.Context().Done():
	}

	return nil
}

func sshPipe(srv pb.TermproxyService_ProxyTerminalServer, reader io.Reader, errChan chan error) func() {
	return func() {
		readBuffer := make([]byte, 1024)
		for {
			n, err := reader.Read(readBuffer)

			if err == io.EOF {
				errChan <- nil
			}
			if err != nil {
				log.Printf("read error: %v", err)
				errChan <- err
				return
			}

			msg := &pb.ServerMessage{
				Message: &pb.ServerMessage_Stdout{
					Stdout: &pb.StreamMessage{
						Contents: readBuffer[:n],
					},
				},
			}
			err = srv.Send(msg)
			if err != nil {
				log.Printf("ProxyTerminal Send error: %v", err)
				errChan <- err
				return
			}
		}
	}
}

func grpcReadLoop(srv pb.TermproxyService_ProxyTerminalServer, clientStdin io.WriteCloser, errChan chan error) func() {
	return func() {
		for {
			msg, err := srv.Recv()
			if err == io.EOF {
				log.Printf("EOF")
				errChan <- nil
				return
			}
			if err != nil {
				log.Printf("Recv failure")
				errChan <- err
				return
			}

			// TODO: Clean this up, out into multiple files when we handle more
			//  than one message type.
			switch x := msg.Message.(type) {
			case *pb.ClientMessage_Stdin:
				msg := x.Stdin
				log.Printf("Recv data: %s", string(msg.Contents))
				b64 := base64.StdEncoding.EncodeToString(msg.Contents)
				log.Printf("Recv data(b64): %s", b64)

				_, err = clientStdin.Write(msg.Contents)
				if err != nil {
					log.Printf("Write failure")
					errChan <- err
					return
				}
			}
		}
	}
}

func RunService() {
	listener, err := net.Listen("tcp", "localhost:1234")
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterTermproxyServiceServer(grpcServer, &termproxyServiceImpl{})

	httpServer := &http.Server{
		Addr: "localhost:1235",
	}

	var grpcWrapperOpts []grpcweb.Option
	{
		grpcweb.WithWebsockets(true)
		grpcweb.WithOriginFunc(func(origin string) bool {
			// TODO: we're allowing all origins
			return true
		})
		grpcweb.WithCorsForRegisteredEndpointsOnly(false)
	}
	wrappedGrpc := grpcweb.WrapServer(grpcServer, grpcWrapperOpts...)
	httpServer.Handler = http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		switch {
		case wrappedGrpc.IsGrpcWebRequest(req):
			wrappedGrpc.ServeHTTP(resp, req)
		case strings.ToLower(req.Header.Get("Upgrade")) == "websocket":
			wrappedGrpc.HandleGrpcWebsocketRequest(resp, req)
		default:
			resp.WriteHeader(http.StatusNoContent)
		}
	})

	eg, _ := errgroup.WithContext(context.Background())

	eg.Go(func() error {
		return grpcServer.Serve(listener)
	})
	eg.Go(func() error {
		return httpServer.ListenAndServe()
	})

	err = eg.Wait()
	if err != nil {
		log.Fatalf("Failed to run servers: %v", err)
	}
}
