# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: ctfoperator_internal.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import common_pb2 as common__pb2
from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='ctfoperator_internal.proto',
  package='ctf',
  syntax='proto3',
  serialized_options=b'\n\026org.acasictf.ctf.protoZ\033github.com/acasi-ctf/ctf/pb',
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x1a\x63tfoperator_internal.proto\x12\x03\x63tf\x1a\x0c\x63ommon.proto\x1a\x1fgoogle/protobuf/timestamp.proto\"\xa0\x02\n\x0b\x45nvironment\x12\x30\n\x0c\x63reated_time\x18\x01 \x01(\x0b\x32\x1a.google.protobuf.Timestamp\x12\x32\n\x0elast_ping_time\x18\x02 \x01(\x0b\x32\x1a.google.protobuf.Timestamp\x12\x18\n\x10provisioner_done\x18\x03 \x01(\x08\x12.\n\x10provisioner_type\x18\x04 \x01(\x0e\x32\x14.ctf.ProvisionerType\x12\x1b\n\x08owner_id\x18\x05 \x01(\x0b\x32\t.ctf.UUID\x12#\n\x10\x63hallenge_set_id\x18\x06 \x01(\x0b\x32\t.ctf.UUID\x12\x1f\n\x0c\x63hallenge_id\x18\x07 \x01(\x0b\x32\t.ctf.UUID*<\n\x0fProvisionerType\x12\x0f\n\x0bUNSPECIFIED\x10\x00\x12\x08\n\x04NONE\x10\x01\x12\x0e\n\nKUBERNETES\x10\x02\x42\x35\n\x16org.acasictf.ctf.protoZ\x1bgithub.com/acasi-ctf/ctf/pbb\x06proto3'
  ,
  dependencies=[common__pb2.DESCRIPTOR,google_dot_protobuf_dot_timestamp__pb2.DESCRIPTOR,])

_PROVISIONERTYPE = _descriptor.EnumDescriptor(
  name='ProvisionerType',
  full_name='ctf.ProvisionerType',
  filename=None,
  file=DESCRIPTOR,
  create_key=_descriptor._internal_create_key,
  values=[
    _descriptor.EnumValueDescriptor(
      name='UNSPECIFIED', index=0, number=0,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='NONE', index=1, number=1,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
    _descriptor.EnumValueDescriptor(
      name='KUBERNETES', index=2, number=2,
      serialized_options=None,
      type=None,
      create_key=_descriptor._internal_create_key),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=373,
  serialized_end=433,
)
_sym_db.RegisterEnumDescriptor(_PROVISIONERTYPE)

ProvisionerType = enum_type_wrapper.EnumTypeWrapper(_PROVISIONERTYPE)
UNSPECIFIED = 0
NONE = 1
KUBERNETES = 2



_ENVIRONMENT = _descriptor.Descriptor(
  name='Environment',
  full_name='ctf.Environment',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='created_time', full_name='ctf.Environment.created_time', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='last_ping_time', full_name='ctf.Environment.last_ping_time', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='provisioner_done', full_name='ctf.Environment.provisioner_done', index=2,
      number=3, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='provisioner_type', full_name='ctf.Environment.provisioner_type', index=3,
      number=4, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='owner_id', full_name='ctf.Environment.owner_id', index=4,
      number=5, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='challenge_set_id', full_name='ctf.Environment.challenge_set_id', index=5,
      number=6, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='challenge_id', full_name='ctf.Environment.challenge_id', index=6,
      number=7, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=83,
  serialized_end=371,
)

_ENVIRONMENT.fields_by_name['created_time'].message_type = google_dot_protobuf_dot_timestamp__pb2._TIMESTAMP
_ENVIRONMENT.fields_by_name['last_ping_time'].message_type = google_dot_protobuf_dot_timestamp__pb2._TIMESTAMP
_ENVIRONMENT.fields_by_name['provisioner_type'].enum_type = _PROVISIONERTYPE
_ENVIRONMENT.fields_by_name['owner_id'].message_type = common__pb2._UUID
_ENVIRONMENT.fields_by_name['challenge_set_id'].message_type = common__pb2._UUID
_ENVIRONMENT.fields_by_name['challenge_id'].message_type = common__pb2._UUID
DESCRIPTOR.message_types_by_name['Environment'] = _ENVIRONMENT
DESCRIPTOR.enum_types_by_name['ProvisionerType'] = _PROVISIONERTYPE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Environment = _reflection.GeneratedProtocolMessageType('Environment', (_message.Message,), {
  'DESCRIPTOR' : _ENVIRONMENT,
  '__module__' : 'ctfoperator_internal_pb2'
  # @@protoc_insertion_point(class_scope:ctf.Environment)
  })
_sym_db.RegisterMessage(Environment)


DESCRIPTOR._options = None
# @@protoc_insertion_point(module_scope)
