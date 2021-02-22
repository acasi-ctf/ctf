package termproxy

import (
	"context"
	"encoding/base64"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/lgorence/goctfprototype/proto"
	"golang.org/x/crypto/ssh"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"strings"
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

func (tp *termproxyServiceImpl) OpenTerminal(srv proto.TermproxyService_OpenTerminalServer) error {
	config := &ssh.ClientConfig{
		User: "player",
		Auth: []ssh.AuthMethod{
			key("/home/lgorence/.ssh/id_rsa"),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
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

	err = client.RequestPty("xterm", 24, 80, ssh.TerminalModes{})
	if err != nil {
		return err
	}

	err = client.Shell()
	if err != nil {
		return err
	}

	readBuffer := make([]byte, 1024)
	go func() error {
		for {
			n, err := clientStdout.Read(readBuffer)

			if err == io.EOF {
				return nil
			}
			if err != nil {
				// TODO: use error chan
				log.Printf("read error: %v", err)
				return err
			}

			err = srv.Send(&proto.TerminalBytes{
				Contents: readBuffer[:n],
			})
			if err != nil {
				// TODO: use error chan
				log.Printf("OpenTerminal Send error: %v", err)
				return err
			}
		}
	}()

	for {
		message, err := srv.Recv()
		if err == io.EOF {
			// TODO
			log.Printf("EOF")
			break
		}
		if err != nil {
			log.Printf("Recv failure")
			return err
		}

		log.Printf("Recv data: %s", string(message.Contents))
		b64 := base64.StdEncoding.EncodeToString(message.Contents)
		log.Printf("Recv data(b64): %s", b64)

		_, err = clientStdin.Write(message.Contents)
		if err != nil {
			log.Printf("Write failure")
			return nil
		}
	}

	return nil
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
		//resp.Header().Set("Access-Control-Allow-Origin", "*")
		//resp.Header().Set("Access-Control-Allow-Headers", "*")
		if wrappedGrpc.IsGrpcWebRequest(req) {
			wrappedGrpc.ServeHTTP(resp, req)
		} else if strings.ToLower(req.Header.Get("Upgrade")) == "websocket" {
			wrappedGrpc.HandleGrpcWebsocketRequest(resp, req)
		} else {
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
