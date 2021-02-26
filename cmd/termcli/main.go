package main

import (
	"context"
	"github.com/lgorence/goctfprototype/proto"
	"google.golang.org/grpc"
	"io"
	"log"
	"os"
)

func main() {
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}

	conn, err := grpc.Dial("localhost:1234", opts...)
	if err != nil {
		log.Fatalf("Failed to dial: %v", err)
	}
	defer conn.Close()

	proxy := proto.NewTermproxyServiceClient(conn)

	var callOpts []grpc.CallOption
	srv, err := proxy.OpenTerminal(context.Background(), callOpts...)
	if err != nil {
		log.Fatalf("Failed to open terminal: %v", err)
	}

	go func() {
		for {
			message, err := srv.Recv()
			if err == io.EOF {
				return
			}
			_, err = os.Stdout.Write(message.Contents)
			if err != nil {
				panic(err)
			}
		}
	}()

	stdinBuffer := make([]byte, 1024)
	for {
		n, err := os.Stdin.Read(stdinBuffer)
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}
		err = srv.Send(&proto.TerminalBytes{
			Contents: stdinBuffer[:n],
		})
		if err != nil {
			log.Fatalf("Failed to send message: %v", err)
		}
	}

	srv.CloseSend()
}
