package ctfoperator

import (
	"context"
	"github.com/acasi-ctf/ctf/pb"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"log"
	"net"
)

func StartOperator() error {
	listener, err := net.Listen("tcp", "localhost:1234")
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterEnvironmentProvisioningServiceServer(grpcServer, &provisioningService{})

	eg, _ := errgroup.WithContext(context.Background())

	eg.Go(func() error {
		return grpcServer.Serve(listener)
	})

	return eg.Wait()
}
