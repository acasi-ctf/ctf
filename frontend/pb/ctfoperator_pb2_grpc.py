# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import ctfoperator_pb2 as ctfoperator__pb2
from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2


class EnvironmentProvisioningServiceStub(object):
    """*
    gRPC service used to provision environments.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.StartEnvironment = channel.unary_unary(
                '/ctf.EnvironmentProvisioningService/StartEnvironment',
                request_serializer=ctfoperator__pb2.StartEnvironmentRequest.SerializeToString,
                response_deserializer=ctfoperator__pb2.StartEnvironmentResponse.FromString,
                )
        self.StopEnvironment = channel.unary_unary(
                '/ctf.EnvironmentProvisioningService/StopEnvironment',
                request_serializer=ctfoperator__pb2.StopEnvironmentRequest.SerializeToString,
                response_deserializer=ctfoperator__pb2.StopEnvironmentResponse.FromString,
                )
        self.UploadEnvironmentTemplate = channel.unary_unary(
                '/ctf.EnvironmentProvisioningService/UploadEnvironmentTemplate',
                request_serializer=ctfoperator__pb2.UploadEnvironmentTemplateRequest.SerializeToString,
                response_deserializer=google_dot_protobuf_dot_empty__pb2.Empty.FromString,
                )


class EnvironmentProvisioningServiceServicer(object):
    """*
    gRPC service used to provision environments.
    """

    def StartEnvironment(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def StopEnvironment(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UploadEnvironmentTemplate(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_EnvironmentProvisioningServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'StartEnvironment': grpc.unary_unary_rpc_method_handler(
                    servicer.StartEnvironment,
                    request_deserializer=ctfoperator__pb2.StartEnvironmentRequest.FromString,
                    response_serializer=ctfoperator__pb2.StartEnvironmentResponse.SerializeToString,
            ),
            'StopEnvironment': grpc.unary_unary_rpc_method_handler(
                    servicer.StopEnvironment,
                    request_deserializer=ctfoperator__pb2.StopEnvironmentRequest.FromString,
                    response_serializer=ctfoperator__pb2.StopEnvironmentResponse.SerializeToString,
            ),
            'UploadEnvironmentTemplate': grpc.unary_unary_rpc_method_handler(
                    servicer.UploadEnvironmentTemplate,
                    request_deserializer=ctfoperator__pb2.UploadEnvironmentTemplateRequest.FromString,
                    response_serializer=google_dot_protobuf_dot_empty__pb2.Empty.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'ctf.EnvironmentProvisioningService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class EnvironmentProvisioningService(object):
    """*
    gRPC service used to provision environments.
    """

    @staticmethod
    def StartEnvironment(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentProvisioningService/StartEnvironment',
            ctfoperator__pb2.StartEnvironmentRequest.SerializeToString,
            ctfoperator__pb2.StartEnvironmentResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def StopEnvironment(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentProvisioningService/StopEnvironment',
            ctfoperator__pb2.StopEnvironmentRequest.SerializeToString,
            ctfoperator__pb2.StopEnvironmentResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UploadEnvironmentTemplate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentProvisioningService/UploadEnvironmentTemplate',
            ctfoperator__pb2.UploadEnvironmentTemplateRequest.SerializeToString,
            google_dot_protobuf_dot_empty__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)


class EnvironmentLookupServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.IsEnvironmentReady = channel.unary_unary(
                '/ctf.EnvironmentLookupService/IsEnvironmentReady',
                request_serializer=ctfoperator__pb2.IsEnvironmentReadyRequest.SerializeToString,
                response_deserializer=ctfoperator__pb2.IsEnvironmentReadyResponse.FromString,
                )
        self.GetEnvironmentInfo = channel.unary_unary(
                '/ctf.EnvironmentLookupService/GetEnvironmentInfo',
                request_serializer=ctfoperator__pb2.GetEnvironmentInfoRequest.SerializeToString,
                response_deserializer=ctfoperator__pb2.GetEnvironmentInfoResponse.FromString,
                )
        self.ListUserEnvironments = channel.unary_unary(
                '/ctf.EnvironmentLookupService/ListUserEnvironments',
                request_serializer=ctfoperator__pb2.ListUserEnvironmentsRequest.SerializeToString,
                response_deserializer=ctfoperator__pb2.ListUserEnvironmentsResponse.FromString,
                )
        self.ListEnvironmentServices = channel.unary_unary(
                '/ctf.EnvironmentLookupService/ListEnvironmentServices',
                request_serializer=ctfoperator__pb2.ListEnvironmentServicesRequest.SerializeToString,
                response_deserializer=ctfoperator__pb2.ListEnvironmentServicesResponse.FromString,
                )


class EnvironmentLookupServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def IsEnvironmentReady(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetEnvironmentInfo(self, request, context):
        """deprecated: ListEnvironmentServices replaces this call.
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ListUserEnvironments(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ListEnvironmentServices(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_EnvironmentLookupServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'IsEnvironmentReady': grpc.unary_unary_rpc_method_handler(
                    servicer.IsEnvironmentReady,
                    request_deserializer=ctfoperator__pb2.IsEnvironmentReadyRequest.FromString,
                    response_serializer=ctfoperator__pb2.IsEnvironmentReadyResponse.SerializeToString,
            ),
            'GetEnvironmentInfo': grpc.unary_unary_rpc_method_handler(
                    servicer.GetEnvironmentInfo,
                    request_deserializer=ctfoperator__pb2.GetEnvironmentInfoRequest.FromString,
                    response_serializer=ctfoperator__pb2.GetEnvironmentInfoResponse.SerializeToString,
            ),
            'ListUserEnvironments': grpc.unary_unary_rpc_method_handler(
                    servicer.ListUserEnvironments,
                    request_deserializer=ctfoperator__pb2.ListUserEnvironmentsRequest.FromString,
                    response_serializer=ctfoperator__pb2.ListUserEnvironmentsResponse.SerializeToString,
            ),
            'ListEnvironmentServices': grpc.unary_unary_rpc_method_handler(
                    servicer.ListEnvironmentServices,
                    request_deserializer=ctfoperator__pb2.ListEnvironmentServicesRequest.FromString,
                    response_serializer=ctfoperator__pb2.ListEnvironmentServicesResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'ctf.EnvironmentLookupService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class EnvironmentLookupService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def IsEnvironmentReady(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentLookupService/IsEnvironmentReady',
            ctfoperator__pb2.IsEnvironmentReadyRequest.SerializeToString,
            ctfoperator__pb2.IsEnvironmentReadyResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetEnvironmentInfo(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentLookupService/GetEnvironmentInfo',
            ctfoperator__pb2.GetEnvironmentInfoRequest.SerializeToString,
            ctfoperator__pb2.GetEnvironmentInfoResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ListUserEnvironments(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentLookupService/ListUserEnvironments',
            ctfoperator__pb2.ListUserEnvironmentsRequest.SerializeToString,
            ctfoperator__pb2.ListUserEnvironmentsResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ListEnvironmentServices(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ctf.EnvironmentLookupService/ListEnvironmentServices',
            ctfoperator__pb2.ListEnvironmentServicesRequest.SerializeToString,
            ctfoperator__pb2.ListEnvironmentServicesResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
