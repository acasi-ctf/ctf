package lookup

import (
	"context"
	"errors"
	"fmt"
	"github.com/acasi-ctf/ctf/pb"
	"github.com/acasi-ctf/ctf/pkg/ctfoperator/constants"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

type LookupService struct {
	pb.UnimplementedEnvironmentLookupServiceServer
	KubeClient *kubernetes.Clientset
}

func (s *LookupService) IsEnvironmentReady(context.Context, *pb.IsEnvironmentReadyRequest) (*pb.IsEnvironmentReadyResponse, error) {
	// TODO: Stubbed
	return &pb.IsEnvironmentReadyResponse{
		Ready: false,
	}, nil
}

func (s *LookupService) GetEnvironmentInfo(ctx context.Context, req *pb.GetEnvironmentInfoRequest) (*pb.GetEnvironmentInfoResponse, error) {
	// TODO: This is too specific to Kubernetes.
	pods, err := s.KubeClient.CoreV1().Pods(constants.KubeNamespace).List(ctx, metav1.ListOptions{
		LabelSelector: fmt.Sprintf("ctf-env-id=%s", req.EnvironmentId.Contents),
	})
	if err != nil {
		return nil, err
	}

	if len(pods.Items) == 0 {
		return nil, errors.New("no environment was found")
	}

	pod := pods.Items[0]

	return &pb.GetEnvironmentInfoResponse{
		SshHost: pod.Status.PodIP,
		SshPort: 22,
	}, nil
}
