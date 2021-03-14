package termproxy

import (
	"context"
	"github.com/acasi-ctf/ctf/pkg/termproxy/service"
	"log"
	"net"
	"net/http"
	"strings"

	"github.com/acasi-ctf/ctf/pb"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
)

func RunService() {
	opOpts := []grpc.DialOption{
		grpc.WithInsecure(),
	}

	opConn, err := grpc.Dial("ctf-operator:1234", opOpts...)
	if err != nil {
		log.Fatalf("Failed to dial operator: %v", err)
	}
	lookupSvcClient := pb.NewEnvironmentLookupServiceClient(opConn)

	listener, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterTermproxyServiceServer(grpcServer, &service.TermproxyServiceImpl{
		LookupClient: lookupSvcClient,
	})

	httpServer := &http.Server{
		Addr: ":1235",
	}

	var grpcWrapperOpts []grpcweb.Option
	{
		grpcweb.WithWebsockets(true)
		grpcweb.WithOriginFunc(func(origin string) bool {
			// TODO: we're allowing all origins
			return true
		})
		grpcweb.WithCorsForRegisteredEndpointsOnly(false)
	}
	wrappedGrpc := grpcweb.WrapServer(grpcServer, grpcWrapperOpts...)
	httpServer.Handler = http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		switch {
		case wrappedGrpc.IsGrpcWebRequest(req):
			wrappedGrpc.ServeHTTP(resp, req)
		case strings.ToLower(req.Header.Get("Upgrade")) == "websocket":
			wrappedGrpc.HandleGrpcWebsocketRequest(resp, req)
		default:
			resp.WriteHeader(http.StatusNoContent)
		}
	})

	eg, _ := errgroup.WithContext(context.Background())

	eg.Go(func() error {
		return grpcServer.Serve(listener)
	})
	eg.Go(func() error {
		return httpServer.ListenAndServe()
	})

	err = eg.Wait()
	if err != nil {
		log.Fatalf("Failed to run servers: %v", err)
	}
}
