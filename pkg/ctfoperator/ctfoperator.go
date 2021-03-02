package ctfoperator

import (
	"context"
	"fmt"
	"github.com/golang/protobuf/ptypes"
	"github.com/google/uuid"
	"github.com/lgorence/goctfprototype/pb"
	"github.com/lgorence/goctfprototype/pkg/ctfoperator/model"
	bolt "go.etcd.io/bbolt"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"log"
	"net"
)

func StartOperator() error {
	// TODO: move all of this to some tests
	db, err := bolt.Open("operator.db", 0666, nil)
	if err != nil {
		return err
	}
	defer db.Close()

	dao, err := model.NewEnvironmentDao(db)
	if err != nil {
		return err
	}

	newUuid, err := uuid.NewRandom()
	if err != nil {
		return err
	}

	err = dao.Set(&pb.UUID{
		Contents: newUuid.String(),
	}, &pb.Environment{
		CreatedTime:  ptypes.TimestampNow(),
		LastPingTime: ptypes.TimestampNow(),
	})
	if err != nil {
		return err
	}

	envs, err := dao.List()
	if err != nil {
		return err
	}

	for k, v := range envs {
		fmt.Printf("%s - %v\n", k, v)
	}

	return nil

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
