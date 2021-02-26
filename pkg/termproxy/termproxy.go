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

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/lgorence/goctfprototype/proto"
	"golang.org/x/crypto/ssh"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
)

type termproxyServiceImpl struct {
	proto.UnimplementedTermproxyServiceServer
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

// Writing this callback manually to avoid errors.
// TODO: Implement host key checking, as we can potentially find it during
// spin up of the environment.
func insecureHostKeyCallback() ssh.HostKeyCallback {
	return func(hostname string, remote net.Addr, key ssh.PublicKey) error {
		return nil
	}
}

func (tp *termproxyServiceImpl) OpenTerminal(srv proto.TermproxyService_OpenTerminalServer) error {
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

	clientStdin, err := client.StdinPipe()
	if err != nil {
		return err
	}

	err = client.RequestPty("xterm-256color", 24, 80, ssh.TerminalModes{})
	if err != nil {
		return err
	}

	err = client.Shell()
	if err != nil {
		return err
	}

	errChan := make(chan error)

	go sshReadLoop(srv, clientStdout, errChan)()
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

func sshReadLoop(srv proto.TermproxyService_OpenTerminalServer, clientStdout io.Reader, errChan chan error) func() {
	return func() {
		readBuffer := make([]byte, 1024)
		for {
			n, err := clientStdout.Read(readBuffer)

			if err == io.EOF {
				errChan <- nil
			}
			if err != nil {
				log.Printf("read error: %v", err)
				errChan <- err
				return
			}

			err = srv.Send(&proto.TerminalBytes{
				Contents: readBuffer[:n],
			})
			if err != nil {
				log.Printf("OpenTerminal Send error: %v", err)
				errChan <- err
				return
			}
		}
	}
}

func grpcReadLoop(srv proto.TermproxyService_OpenTerminalServer, clientStdin io.WriteCloser, errChan chan error) func() {
	return func() {
		for {
			message, err := srv.Recv()
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

			log.Printf("Recv data: %s", string(message.Contents))
			b64 := base64.StdEncoding.EncodeToString(message.Contents)
			log.Printf("Recv data(b64): %s", b64)

			_, err = clientStdin.Write(message.Contents)
			if err != nil {
				log.Printf("Write failure")
				errChan <- err
				return
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
	proto.RegisterTermproxyServiceServer(grpcServer, &termproxyServiceImpl{})

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
