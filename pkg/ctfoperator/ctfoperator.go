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

// StartOperator will start the gRPC servers and services that are necessary to
// provision and lookup environments running inside of our Kubernetes cluster.
func StartOperator() error {
	// Create a config to communicate with the Kubernetes API server.
	config, err := rest.InClusterConfig()
	if err != nil {
		return err
	}

	// Create the client with our local service account config.
	kubeClient, err := kubernetes.NewForConfig(config)
	if err != nil {
		return err
	}

	// Open a bbolt database for the operator.
	db, err := bolt.Open("operator.db", 0666, nil)
	if err != nil {
		return err
	}
	// Close the file handle after this function returns.
	defer db.Close()

	// Create a new EnvironmentDao.
	envDao, err := model.NewEnvironmentDao(db)
	if err != nil {
		return err
	}

	// Listen on port 1234 for gRPC.
	listener, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	// Build our gRPC services and pass respective parameters.
	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterEnvironmentProvisioningServiceServer(grpcServer, &provisioner.ProvisioningService{
		EnvDao:     envDao,
		KubeClient: kubeClient,
	})
	pb.RegisterEnvironmentLookupServiceServer(grpcServer, &lookup.LookupService{
		KubeClient: kubeClient,
	})

	// Create an error group.
	eg, _ := errgroup.WithContext(context.Background())

	// Launch our gRPC server onto a goroutine within our error group.
	eg.Go(func() error {
		return grpcServer.Serve(listener)
	})

	// Wait for the error group to return, which spans the life of our
	// microservice.
	return eg.Wait()
}
