package ctfoperator

import (
	"context"
	"github.com/google/uuid"
	"github.com/acasi-ctf/ctf/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	core "k8s.io/api/core/v1"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type provisioningService struct {
	pb.UnimplementedEnvironmentProvisioningServiceServer
}

func (s *provisioningService) StartEnvironment(ctx context.Context, _ *pb.StartEnvironmentRequest) (*pb.StartEnvironmentResponse, error) {
	// TODO: All (nil, err) returns need to be using an error response instead.
	//  This still needs work on the Protobuf side to hash out how error responses
	//  will work. Just noting this here.
	// TODO: This is really just a proof of concept for now, we need to extract
	//  k8s operations out into a reconciliation loop (fancy words for something
	//  that I'm still learning), and only do database operations here. The
	//  reconciliation loop will read database, and "reconcile" the state of the
	//  cluster into what the database reflects.

	// Create a config to communicate with the Kubernetes API server.
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}

	// Create a client with our config.
	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	// Generate a new UUID to uniquely identify this environment.
	envId, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	// Create a single penimage pod for testing.
	pod, err := client.CoreV1().Pods("ctf").Create(ctx, &core.Pod{
		// Specify the names and a sample label for tracking the resource.
		ObjectMeta: meta.ObjectMeta{
			Name: "ctf-test-pod",
			Labels: map[string]string{
				"ctf-env-id": envId.String(),
			},
		},
		// Pod spec, specify a single container (pods can be *multiple* containers that share
		//  the same network namespace, etc), I now coin the phrase "n-ary peas (containers) in a pod!".
		Spec: core.PodSpec{
			Containers: []core.Container{
				{
					// Name of this container.
					Name: "penimage",
					// Image that we want to use for the container.
					Image: "ghcr.io/acasi-ctf/ctf/penimage:latest",
					// Image pull policy will determine how to update an image. Always will
					//  well, always check for the latest version on pod creation.
					ImagePullPolicy: core.PullAlways,
				},
			},
		},
	}, meta.CreateOptions{})
	if err != nil {
		return nil, err
	}

	// This likely isn't filled in yet, as the Kubernetes scheduler probably
	//  hasn't scheduled it yet, so it's blank usually.
	println(pod.Status.PodIP)

	// Return a successful response with the new environment ID.
	return &pb.StartEnvironmentResponse{
		Response: &pb.StartEnvironmentResponse_Success{
			Success: &pb.StartEnvironmentSuccessResponse{
				EnvironmentId: &pb.UUID{
					Contents: envId.String(),
				},
			},
		},
	}, nil
}

func (s *provisioningService) StopEnvironment(context.Context, *pb.StopEnvironmentRequest) (*pb.StopEnvironmentResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method StopEnvironment not implemented")
}
