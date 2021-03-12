package ctfoperator

import (
	"context"
	"github.com/acasi-ctf/ctf/pb"
	"github.com/acasi-ctf/ctf/pkg/ctfoperator/environment/lookup"
	"github.com/acasi-ctf/ctf/pkg/ctfoperator/environment/provisioner"
	"github.com/acasi-ctf/ctf/pkg/ctfoperator/model"
	bolt "go.etcd.io/bbolt"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"log"
	"net"
)

func StartOperator() error {
	// Create a config to communicate with the Kubernetes API server.
	config, err := rest.InClusterConfig()
	if err != nil {
		return err
	}

	// Create a client with the local service account config.
	kubeClient, err := kubernetes.NewForConfig(config)
	if err != nil {
		return err
	}

	db, err := bolt.Open("operator.db", 0666, nil)
	if err != nil {
		return err
	}
	defer db.Close()

	envDao, err := model.NewEnvironmentDao(db)
	if err != nil {
		return err
	}

	listener, err := net.Listen("tcp", "localhost:1234")
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterEnvironmentProvisioningServiceServer(grpcServer, &provisioner.ProvisioningService{
		EnvDao:     envDao,
		KubeClient: kubeClient,
	})
	pb.RegisterEnvironmentLookupServiceServer(grpcServer, &lookup.LookupService{
		KubeClient: kubeClient,
	})

	eg, _ := errgroup.WithContext(context.Background())

	eg.Go(func() error {
		return grpcServer.Serve(listener)
	})

	return eg.Wait()
}
