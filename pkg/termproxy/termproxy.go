package termproxy

import (
	"github.com/lgorence/goctfprototype/proto"
	"golang.org/x/crypto/ssh"
	"google.golang.org/grpc"
	"io"
	"io/ioutil"
	"log"
	"net"
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

	err = client.RequestPty("vt100", 24, 80, ssh.TerminalModes{
		ssh.ECHO:  0,
		ssh.IGNCR: 1,
	})
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
		log.Fatalf("failed to listen: %v", err)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	proto.RegisterTermproxyServiceServer(grpcServer, &termproxyServiceImpl{})

	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatalf("failed to serve grpc: %v", err)
	}
}
