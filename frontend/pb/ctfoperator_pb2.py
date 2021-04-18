# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: ctfoperator.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import common_pb2 as common__pb2
from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
    name="ctfoperator.proto",
    package="ctf",
    syntax="proto3",
    serialized_options=b"\n\026org.acasictf.ctf.protoZ\033github.com/acasi-ctf/ctf/pb",
    create_key=_descriptor._internal_create_key,
    serialized_pb=b'\n\x11\x63tfoperator.proto\x12\x03\x63tf\x1a\x0c\x63ommon.proto\x1a\x1bgoogle/protobuf/empty.proto"M\n\x17StartEnvironmentRequest\x12\x1a\n\x12\x63hallenge_set_slug\x18\x01 \x01(\t\x12\x16\n\x0e\x63hallenge_slug\x18\x02 \x01(\t"\x98\x01\n\x18StartEnvironmentResponse\x12\x37\n\x07success\x18\x01 \x01(\x0b\x32$.ctf.StartEnvironmentSuccessResponseH\x00\x12\x37\n\x07\x66\x61ilure\x18\x02 \x01(\x0b\x32$.ctf.StartEnvironmentFailureResponseH\x00\x42\n\n\x08response"D\n\x1fStartEnvironmentSuccessResponse\x12!\n\x0e\x65nvironment_id\x18\x01 \x01(\x0b\x32\t.ctf.UUID"!\n\x1fStartEnvironmentFailureResponse";\n\x16StopEnvironmentRequest\x12!\n\x0e\x65nvironment_id\x18\x01 \x01(\x0b\x32\t.ctf.UUID"\x19\n\x17StopEnvironmentResponse"2\n UploadEnvironmentTemplateRequest\x12\x0e\n\x06\x65nvZip\x18\x01 \x01(\x0c">\n\x19IsEnvironmentReadyRequest\x12!\n\x0e\x65nvironment_id\x18\x01 \x01(\x0b\x32\t.ctf.UUID"+\n\x1aIsEnvironmentReadyResponse\x12\r\n\x05ready\x18\x01 \x01(\x08">\n\x19GetEnvironmentInfoRequest\x12!\n\x0e\x65nvironment_id\x18\x01 \x01(\x0b\x32\t.ctf.UUID"@\n\x1aGetEnvironmentInfoResponse\x12\x10\n\x08ssh_host\x18\x01 \x01(\t\x12\x10\n\x08ssh_port\x18\x02 \x01(\x05\x32\x9b\x02\n\x1e\x45nvironmentProvisioningService\x12O\n\x10StartEnvironment\x12\x1c.ctf.StartEnvironmentRequest\x1a\x1d.ctf.StartEnvironmentResponse\x12L\n\x0fStopEnvironment\x12\x1b.ctf.StopEnvironmentRequest\x1a\x1c.ctf.StopEnvironmentResponse\x12Z\n\x19UploadEnvironmentTemplate\x12%.ctf.UploadEnvironmentTemplateRequest\x1a\x16.google.protobuf.Empty2\xc8\x01\n\x18\x45nvironmentLookupService\x12U\n\x12IsEnvironmentReady\x12\x1e.ctf.IsEnvironmentReadyRequest\x1a\x1f.ctf.IsEnvironmentReadyResponse\x12U\n\x12GetEnvironmentInfo\x12\x1e.ctf.GetEnvironmentInfoRequest\x1a\x1f.ctf.GetEnvironmentInfoResponseB5\n\x16org.acasictf.ctf.protoZ\x1bgithub.com/acasi-ctf/ctf/pbb\x06proto3',
    dependencies=[
        common__pb2.DESCRIPTOR,
        google_dot_protobuf_dot_empty__pb2.DESCRIPTOR,
    ],
)


_STARTENVIRONMENTREQUEST = _descriptor.Descriptor(
    name="StartEnvironmentRequest",
    full_name="ctf.StartEnvironmentRequest",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="challenge_set_slug",
            full_name="ctf.StartEnvironmentRequest.challenge_set_slug",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
        _descriptor.FieldDescriptor(
            name="challenge_slug",
            full_name="ctf.StartEnvironmentRequest.challenge_slug",
            index=1,
            number=2,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=69,
    serialized_end=146,
)


_STARTENVIRONMENTRESPONSE = _descriptor.Descriptor(
    name="StartEnvironmentResponse",
    full_name="ctf.StartEnvironmentResponse",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="success",
            full_name="ctf.StartEnvironmentResponse.success",
            index=0,
            number=1,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
        _descriptor.FieldDescriptor(
            name="failure",
            full_name="ctf.StartEnvironmentResponse.failure",
            index=1,
            number=2,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[
        _descriptor.OneofDescriptor(
            name="response",
            full_name="ctf.StartEnvironmentResponse.response",
            index=0,
            containing_type=None,
            create_key=_descriptor._internal_create_key,
            fields=[],
        ),
    ],
    serialized_start=149,
    serialized_end=301,
)


_STARTENVIRONMENTSUCCESSRESPONSE = _descriptor.Descriptor(
    name="StartEnvironmentSuccessResponse",
    full_name="ctf.StartEnvironmentSuccessResponse",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="environment_id",
            full_name="ctf.StartEnvironmentSuccessResponse.environment_id",
            index=0,
            number=1,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=303,
    serialized_end=371,
)


_STARTENVIRONMENTFAILURERESPONSE = _descriptor.Descriptor(
    name="StartEnvironmentFailureResponse",
    full_name="ctf.StartEnvironmentFailureResponse",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=373,
    serialized_end=406,
)


_STOPENVIRONMENTREQUEST = _descriptor.Descriptor(
    name="StopEnvironmentRequest",
    full_name="ctf.StopEnvironmentRequest",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="environment_id",
            full_name="ctf.StopEnvironmentRequest.environment_id",
            index=0,
            number=1,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=408,
    serialized_end=467,
)


_STOPENVIRONMENTRESPONSE = _descriptor.Descriptor(
    name="StopEnvironmentResponse",
    full_name="ctf.StopEnvironmentResponse",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=469,
    serialized_end=494,
)


_UPLOADENVIRONMENTTEMPLATEREQUEST = _descriptor.Descriptor(
    name="UploadEnvironmentTemplateRequest",
    full_name="ctf.UploadEnvironmentTemplateRequest",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="envZip",
            full_name="ctf.UploadEnvironmentTemplateRequest.envZip",
            index=0,
            number=1,
            type=12,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"",
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=496,
    serialized_end=546,
)


_ISENVIRONMENTREADYREQUEST = _descriptor.Descriptor(
    name="IsEnvironmentReadyRequest",
    full_name="ctf.IsEnvironmentReadyRequest",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="environment_id",
            full_name="ctf.IsEnvironmentReadyRequest.environment_id",
            index=0,
            number=1,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=548,
    serialized_end=610,
)


_ISENVIRONMENTREADYRESPONSE = _descriptor.Descriptor(
    name="IsEnvironmentReadyResponse",
    full_name="ctf.IsEnvironmentReadyResponse",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="ready",
            full_name="ctf.IsEnvironmentReadyResponse.ready",
            index=0,
            number=1,
            type=8,
            cpp_type=7,
            label=1,
            has_default_value=False,
            default_value=False,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=612,
    serialized_end=655,
)


_GETENVIRONMENTINFOREQUEST = _descriptor.Descriptor(
    name="GetEnvironmentInfoRequest",
    full_name="ctf.GetEnvironmentInfoRequest",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="environment_id",
            full_name="ctf.GetEnvironmentInfoRequest.environment_id",
            index=0,
            number=1,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=657,
    serialized_end=719,
)


_GETENVIRONMENTINFORESPONSE = _descriptor.Descriptor(
    name="GetEnvironmentInfoResponse",
    full_name="ctf.GetEnvironmentInfoResponse",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    create_key=_descriptor._internal_create_key,
    fields=[
        _descriptor.FieldDescriptor(
            name="ssh_host",
            full_name="ctf.GetEnvironmentInfoResponse.ssh_host",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
        _descriptor.FieldDescriptor(
            name="ssh_port",
            full_name="ctf.GetEnvironmentInfoResponse.ssh_port",
            index=1,
            number=2,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
            create_key=_descriptor._internal_create_key,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=721,
    serialized_end=785,
)

_STARTENVIRONMENTRESPONSE.fields_by_name[
    "success"
].message_type = _STARTENVIRONMENTSUCCESSRESPONSE
_STARTENVIRONMENTRESPONSE.fields_by_name[
    "failure"
].message_type = _STARTENVIRONMENTFAILURERESPONSE
_STARTENVIRONMENTRESPONSE.oneofs_by_name["response"].fields.append(
    _STARTENVIRONMENTRESPONSE.fields_by_name["success"]
)
_STARTENVIRONMENTRESPONSE.fields_by_name[
    "success"
].containing_oneof = _STARTENVIRONMENTRESPONSE.oneofs_by_name["response"]
_STARTENVIRONMENTRESPONSE.oneofs_by_name["response"].fields.append(
    _STARTENVIRONMENTRESPONSE.fields_by_name["failure"]
)
_STARTENVIRONMENTRESPONSE.fields_by_name[
    "failure"
].containing_oneof = _STARTENVIRONMENTRESPONSE.oneofs_by_name["response"]
_STARTENVIRONMENTSUCCESSRESPONSE.fields_by_name[
    "environment_id"
].message_type = common__pb2._UUID
_STOPENVIRONMENTREQUEST.fields_by_name[
    "environment_id"
].message_type = common__pb2._UUID
_ISENVIRONMENTREADYREQUEST.fields_by_name[
    "environment_id"
].message_type = common__pb2._UUID
_GETENVIRONMENTINFOREQUEST.fields_by_name[
    "environment_id"
].message_type = common__pb2._UUID
DESCRIPTOR.message_types_by_name["StartEnvironmentRequest"] = _STARTENVIRONMENTREQUEST
DESCRIPTOR.message_types_by_name["StartEnvironmentResponse"] = _STARTENVIRONMENTRESPONSE
DESCRIPTOR.message_types_by_name[
    "StartEnvironmentSuccessResponse"
] = _STARTENVIRONMENTSUCCESSRESPONSE
DESCRIPTOR.message_types_by_name[
    "StartEnvironmentFailureResponse"
] = _STARTENVIRONMENTFAILURERESPONSE
DESCRIPTOR.message_types_by_name["StopEnvironmentRequest"] = _STOPENVIRONMENTREQUEST
DESCRIPTOR.message_types_by_name["StopEnvironmentResponse"] = _STOPENVIRONMENTRESPONSE
DESCRIPTOR.message_types_by_name[
    "UploadEnvironmentTemplateRequest"
] = _UPLOADENVIRONMENTTEMPLATEREQUEST
DESCRIPTOR.message_types_by_name[
    "IsEnvironmentReadyRequest"
] = _ISENVIRONMENTREADYREQUEST
DESCRIPTOR.message_types_by_name[
    "IsEnvironmentReadyResponse"
] = _ISENVIRONMENTREADYRESPONSE
DESCRIPTOR.message_types_by_name[
    "GetEnvironmentInfoRequest"
] = _GETENVIRONMENTINFOREQUEST
DESCRIPTOR.message_types_by_name[
    "GetEnvironmentInfoResponse"
] = _GETENVIRONMENTINFORESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

StartEnvironmentRequest = _reflection.GeneratedProtocolMessageType(
    "StartEnvironmentRequest",
    (_message.Message,),
    {
        "DESCRIPTOR": _STARTENVIRONMENTREQUEST,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.StartEnvironmentRequest)
    },
)
_sym_db.RegisterMessage(StartEnvironmentRequest)

StartEnvironmentResponse = _reflection.GeneratedProtocolMessageType(
    "StartEnvironmentResponse",
    (_message.Message,),
    {
        "DESCRIPTOR": _STARTENVIRONMENTRESPONSE,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.StartEnvironmentResponse)
    },
)
_sym_db.RegisterMessage(StartEnvironmentResponse)

StartEnvironmentSuccessResponse = _reflection.GeneratedProtocolMessageType(
    "StartEnvironmentSuccessResponse",
    (_message.Message,),
    {
        "DESCRIPTOR": _STARTENVIRONMENTSUCCESSRESPONSE,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.StartEnvironmentSuccessResponse)
    },
)
_sym_db.RegisterMessage(StartEnvironmentSuccessResponse)

StartEnvironmentFailureResponse = _reflection.GeneratedProtocolMessageType(
    "StartEnvironmentFailureResponse",
    (_message.Message,),
    {
        "DESCRIPTOR": _STARTENVIRONMENTFAILURERESPONSE,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.StartEnvironmentFailureResponse)
    },
)
_sym_db.RegisterMessage(StartEnvironmentFailureResponse)

StopEnvironmentRequest = _reflection.GeneratedProtocolMessageType(
    "StopEnvironmentRequest",
    (_message.Message,),
    {
        "DESCRIPTOR": _STOPENVIRONMENTREQUEST,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.StopEnvironmentRequest)
    },
)
_sym_db.RegisterMessage(StopEnvironmentRequest)

StopEnvironmentResponse = _reflection.GeneratedProtocolMessageType(
    "StopEnvironmentResponse",
    (_message.Message,),
    {
        "DESCRIPTOR": _STOPENVIRONMENTRESPONSE,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.StopEnvironmentResponse)
    },
)
_sym_db.RegisterMessage(StopEnvironmentResponse)

UploadEnvironmentTemplateRequest = _reflection.GeneratedProtocolMessageType(
    "UploadEnvironmentTemplateRequest",
    (_message.Message,),
    {
        "DESCRIPTOR": _UPLOADENVIRONMENTTEMPLATEREQUEST,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.UploadEnvironmentTemplateRequest)
    },
)
_sym_db.RegisterMessage(UploadEnvironmentTemplateRequest)

IsEnvironmentReadyRequest = _reflection.GeneratedProtocolMessageType(
    "IsEnvironmentReadyRequest",
    (_message.Message,),
    {
        "DESCRIPTOR": _ISENVIRONMENTREADYREQUEST,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.IsEnvironmentReadyRequest)
    },
)
_sym_db.RegisterMessage(IsEnvironmentReadyRequest)

IsEnvironmentReadyResponse = _reflection.GeneratedProtocolMessageType(
    "IsEnvironmentReadyResponse",
    (_message.Message,),
    {
        "DESCRIPTOR": _ISENVIRONMENTREADYRESPONSE,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.IsEnvironmentReadyResponse)
    },
)
_sym_db.RegisterMessage(IsEnvironmentReadyResponse)

GetEnvironmentInfoRequest = _reflection.GeneratedProtocolMessageType(
    "GetEnvironmentInfoRequest",
    (_message.Message,),
    {
        "DESCRIPTOR": _GETENVIRONMENTINFOREQUEST,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.GetEnvironmentInfoRequest)
    },
)
_sym_db.RegisterMessage(GetEnvironmentInfoRequest)

GetEnvironmentInfoResponse = _reflection.GeneratedProtocolMessageType(
    "GetEnvironmentInfoResponse",
    (_message.Message,),
    {
        "DESCRIPTOR": _GETENVIRONMENTINFORESPONSE,
        "__module__": "ctfoperator_pb2"
        # @@protoc_insertion_point(class_scope:ctf.GetEnvironmentInfoResponse)
    },
)
_sym_db.RegisterMessage(GetEnvironmentInfoResponse)


DESCRIPTOR._options = None

_ENVIRONMENTPROVISIONINGSERVICE = _descriptor.ServiceDescriptor(
    name="EnvironmentProvisioningService",
    full_name="ctf.EnvironmentProvisioningService",
    file=DESCRIPTOR,
    index=0,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
    serialized_start=788,
    serialized_end=1071,
    methods=[
        _descriptor.MethodDescriptor(
            name="StartEnvironment",
            full_name="ctf.EnvironmentProvisioningService.StartEnvironment",
            index=0,
            containing_service=None,
            input_type=_STARTENVIRONMENTREQUEST,
            output_type=_STARTENVIRONMENTRESPONSE,
            serialized_options=None,
            create_key=_descriptor._internal_create_key,
        ),
        _descriptor.MethodDescriptor(
            name="StopEnvironment",
            full_name="ctf.EnvironmentProvisioningService.StopEnvironment",
            index=1,
            containing_service=None,
            input_type=_STOPENVIRONMENTREQUEST,
            output_type=_STOPENVIRONMENTRESPONSE,
            serialized_options=None,
            create_key=_descriptor._internal_create_key,
        ),
        _descriptor.MethodDescriptor(
            name="UploadEnvironmentTemplate",
            full_name="ctf.EnvironmentProvisioningService.UploadEnvironmentTemplate",
            index=2,
            containing_service=None,
            input_type=_UPLOADENVIRONMENTTEMPLATEREQUEST,
            output_type=google_dot_protobuf_dot_empty__pb2._EMPTY,
            serialized_options=None,
            create_key=_descriptor._internal_create_key,
        ),
    ],
)
_sym_db.RegisterServiceDescriptor(_ENVIRONMENTPROVISIONINGSERVICE)

DESCRIPTOR.services_by_name[
    "EnvironmentProvisioningService"
] = _ENVIRONMENTPROVISIONINGSERVICE


_ENVIRONMENTLOOKUPSERVICE = _descriptor.ServiceDescriptor(
    name="EnvironmentLookupService",
    full_name="ctf.EnvironmentLookupService",
    file=DESCRIPTOR,
    index=1,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
    serialized_start=1074,
    serialized_end=1274,
    methods=[
        _descriptor.MethodDescriptor(
            name="IsEnvironmentReady",
            full_name="ctf.EnvironmentLookupService.IsEnvironmentReady",
            index=0,
            containing_service=None,
            input_type=_ISENVIRONMENTREADYREQUEST,
            output_type=_ISENVIRONMENTREADYRESPONSE,
            serialized_options=None,
            create_key=_descriptor._internal_create_key,
        ),
        _descriptor.MethodDescriptor(
            name="GetEnvironmentInfo",
            full_name="ctf.EnvironmentLookupService.GetEnvironmentInfo",
            index=1,
            containing_service=None,
            input_type=_GETENVIRONMENTINFOREQUEST,
            output_type=_GETENVIRONMENTINFORESPONSE,
            serialized_options=None,
            create_key=_descriptor._internal_create_key,
        ),
    ],
)
_sym_db.RegisterServiceDescriptor(_ENVIRONMENTLOOKUPSERVICE)

DESCRIPTOR.services_by_name["EnvironmentLookupService"] = _ENVIRONMENTLOOKUPSERVICE

# @@protoc_insertion_point(module_scope)
