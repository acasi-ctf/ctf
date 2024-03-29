# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import termproxy_pb2 as termproxy__pb2


class TermproxyServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.ProxyTerminal = channel.stream_stream(
                '/TermproxyService/ProxyTerminal',
                request_serializer=termproxy__pb2.ClientMessage.SerializeToString,
                response_deserializer=termproxy__pb2.ServerMessage.FromString,
                )


class TermproxyServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def ProxyTerminal(self, request_iterator, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_TermproxyServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'ProxyTerminal': grpc.stream_stream_rpc_method_handler(
                    servicer.ProxyTerminal,
                    request_deserializer=termproxy__pb2.ClientMessage.FromString,
                    response_serializer=termproxy__pb2.ServerMessage.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'TermproxyService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class TermproxyService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def ProxyTerminal(request_iterator,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.stream_stream(request_iterator, target, '/TermproxyService/ProxyTerminal',
            termproxy__pb2.ClientMessage.SerializeToString,
            termproxy__pb2.ServerMessage.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
