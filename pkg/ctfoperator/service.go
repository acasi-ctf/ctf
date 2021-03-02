package ctfoperator

import (
	"context"
	"fmt"
	"github.com/lgorence/goctfprototype/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type provisioningService struct {
	pb.UnimplementedEnvironmentProvisioningServiceServer
}

func (s *provisioningService) StartEnvironment(context.Context, *pb.StartEnvironmentRequest) (*pb.StartEnvironmentResponse, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}
	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}
	podList, err := client.CoreV1().Pods("ctf").List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		return nil, err
	}
	for _, pod := range podList.Items {
		fmt.Printf("%s\n", pod.Name)
	}

	return nil, nil
}

func (s *provisioningService) StopEnvironment(context.Context, *pb.StopEnvironmentRequest) (*pb.StopEnvironmentResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method StopEnvironment not implemented")
}
