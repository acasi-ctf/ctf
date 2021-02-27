package ctfoperator

import (
	"context"
	"github.com/lgorence/goctfprototype/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type provisioningService struct {
	proto.UnimplementedEnvironmentProvisioningServiceServer
}

func (s *provisioningService) StartEnvironment(context.Context, *proto.StartEnvironmentRequest) (*proto.StartEnvironmentResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method StartEnvironment not implemented")
}

func (s *provisioningService) StopEnvironment(context.Context, *proto.StopEnvironmentRequest) (*proto.StopEnvironmentResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method StopEnvironment not implemented")
}
