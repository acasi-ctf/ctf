package service

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/acasi-ctf/ctf/pb"
	"golang.org/x/crypto/ssh"
	"io"
	"io/ioutil"
	"log"
	"net"
	"time"
)

type TermproxyServiceImpl struct {
	pb.UnimplementedTermproxyServiceServer
	LookupClient pb.EnvironmentLookupServiceClient
}

// key will load a key from disk.
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

// ProxyTerminal opens a bi-directional stream that allows a player to connect
// to a terminal over SSH, without using SSH on their side. We open the SSH
// connection for them and relay messages back and forth.
func (tp *TermproxyServiceImpl) ProxyTerminal(srv pb.TermproxyService_ProxyTerminalServer) error {
	// Receive the first message.
	initMsg, err := srv.Recv()
	if err != nil {
		return err
	}
	var openMsg *pb.OpenConnectionMessage

	// If message is not OpenConnection, drop the connection.
	switch x := initMsg.Message.(type) {
	case *pb.ClientMessage_OpenConnection:
		openMsg = x.OpenConnection
	default:
		return errors.New("first message must be OpenConnection")
	}

	log.Printf("Starting proxy for environment %s", openMsg.GetEnvironmentId().GetContents())

	// Perform an environment lookup.
	envCtx, envCtxCancel := context.WithTimeout(srv.Context(), 10*time.Second)
	envInfo, err := tp.LookupClient.GetEnvironmentInfo(
		envCtx,
		&pb.GetEnvironmentInfoRequest{
			EnvironmentId: openMsg.EnvironmentId,
		},
	)
	envCtxCancel()
	if err != nil {
		log.Printf("Failed to lookup environment info: %v", err)
		return err
	}

	// Build the SSH client configuration.
	config := &ssh.ClientConfig{
		User: "player",
		Auth: []ssh.AuthMethod{
			key("/secrets/auth-key-private/id_rsa"),
		},
		HostKeyCallback: insecureHostKeyCallback(),
	}

	// Open the SSH client.
	sshConn, err := ssh.Dial("tcp", fmt.Sprintf("%s:%d", envInfo.SshHost, envInfo.SshPort), config)
	if err != nil {
		return err
	}
	defer sshConn.Close()

	// Open the SSH session.
	client, err := sshConn.NewSession()
	if err != nil {
		return err
	}
	defer client.Close()

	// Open pipes for stdout, stderr, and stdin.
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

	// Request a PTY from the remote system.
	// TODO: We need to send size updates.
	err = client.RequestPty("xterm-256color", 24, 80, ssh.TerminalModes{})
	if err != nil {
		return err
	}

	// Start a shell on the new PTY.
	err = client.Shell()
	if err != nil {
		return err
	}

	errChan := make(chan error)

	// Start read/write goroutines.
	go sshPipe(srv, clientStdout, errChan)
	go sshPipe(srv, clientStderr, errChan)
	go grpcReadLoop(srv, client, clientStdin, errChan)

	// Wait until an error occurs, or the client disconnects.
	select {
	case err = <-errChan:
		if err != nil {
			log.Printf("error occurred during read or write: %v", err)
		}
	case <-srv.Context().Done():
	}

	return nil
}

func sshPipe(srv pb.TermproxyService_ProxyTerminalServer, reader io.Reader, errChan chan error) {
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

func grpcReadLoop(srv pb.TermproxyService_ProxyTerminalServer, client *ssh.Session, clientStdin io.WriteCloser, errChan chan error) {
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
		case *pb.ClientMessage_Resize:
			msg := x.Resize
			err = client.WindowChange(int(msg.Rows), int(msg.Columns))
			if err != nil {
				log.Printf("Resize failure")
				errChan <- err
				return
			}
		}
	}
}
