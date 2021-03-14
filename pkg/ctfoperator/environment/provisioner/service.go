package provisioner

import (
	"context"
	"fmt"
	"github.com/acasi-ctf/ctf/pb"
	"github.com/acasi-ctf/ctf/pb/uuidw"
	"github.com/acasi-ctf/ctf/pkg/ctfoperator/constants"
	"github.com/acasi-ctf/ctf/pkg/ctfoperator/model"
	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
	"io/ioutil"
	core "k8s.io/api/core/v1"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

type ProvisioningService struct {
	pb.UnimplementedEnvironmentProvisioningServiceServer
	EnvDao     *model.EnvironmentDao
	KubeClient *kubernetes.Clientset
}

func (s *ProvisioningService) StartEnvironment(ctx context.Context, _ *pb.StartEnvironmentRequest) (*pb.StartEnvironmentResponse, error) {
	// TODO: All (nil, err) returns need to be using an error response instead.
	//  This still needs work on the Protobuf side to hash out how error responses
	//  will work. Just noting this here.
	// TODO: This is really just a proof of concept for now, we need to extract
	//  k8s operations out into a reconciliation loop (fancy words for something
	//  that I'm still learning), and only do database operations here. The
	//  reconciliation loop will read database, and "reconcile" the state of the
	//  cluster into what the database reflects.

	// Generate a new UUID to uniquely identify this environment.
	envId, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}
	envIdStr := envId.String()

	nowTs := timestamppb.Now()
	env := &pb.Environment{
		CreatedTime:     nowTs,
		LastPingTime:    nowTs,
		ProvisionerDone: false,
		ProvisionerType: pb.ProvisionerType_KUBERNETES,
	}

	err = s.EnvDao.Set(uuidw.GoogleToProto(envId), env)
	if err != nil {
		return nil, err
	}

	publicKeyBytes, err := ioutil.ReadFile("/secrets/auth-key-public/id_rsa.pub")
	if err != nil {
		return nil, err
	}
	publicKey := string(publicKeyBytes)

	// Create a single penimage pod for testing.
	_, err = s.KubeClient.CoreV1().Pods(constants.KubeNamespace).Create(ctx, &core.Pod{
		// Specify the names and a sample label for tracking the resource.
		ObjectMeta: meta.ObjectMeta{
			Name: fmt.Sprintf("ctf-penimage-%s", envIdStr),
			Labels: map[string]string{
				"ctf-env-id": envIdStr,
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
					//  always pull a new version, if available, on pod creation.
					ImagePullPolicy: core.PullAlways,
					// Add the public key for the SSH server.
					Env: []core.EnvVar{
						{
							Name:  "PUBLIC_KEY",
							Value: publicKey,
						},
					},
				},
			},
		},
	}, meta.CreateOptions{})
	if err != nil {
		return nil, err
	}

	// Return a successful response with the new environment ID.
	return &pb.StartEnvironmentResponse{
		Response: &pb.StartEnvironmentResponse_Success{
			Success: &pb.StartEnvironmentSuccessResponse{
				EnvironmentId: uuidw.ProtoFromString(envIdStr),
			},
		},
	}, nil
}

func (s *ProvisioningService) StopEnvironment(context.Context, *pb.StopEnvironmentRequest) (*pb.StopEnvironmentResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method StopEnvironment not implemented")
}
