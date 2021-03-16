// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.23.0
// 	protoc        v3.12.4
// source: termproxy.proto

package pb

import (
	proto "github.com/golang/protobuf/proto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

type ClientMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Message:
	//	*ClientMessage_OpenConnection
	//	*ClientMessage_Stdin
	Message isClientMessage_Message `protobuf_oneof:"message"`
}

func (x *ClientMessage) Reset() {
	*x = ClientMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_termproxy_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ClientMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ClientMessage) ProtoMessage() {}

func (x *ClientMessage) ProtoReflect() protoreflect.Message {
	mi := &file_termproxy_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ClientMessage.ProtoReflect.Descriptor instead.
func (*ClientMessage) Descriptor() ([]byte, []int) {
	return file_termproxy_proto_rawDescGZIP(), []int{0}
}

func (m *ClientMessage) GetMessage() isClientMessage_Message {
	if m != nil {
		return m.Message
	}
	return nil
}

func (x *ClientMessage) GetOpenConnection() *OpenConnectionMessage {
	if x, ok := x.GetMessage().(*ClientMessage_OpenConnection); ok {
		return x.OpenConnection
	}
	return nil
}

func (x *ClientMessage) GetStdin() *StreamMessage {
	if x, ok := x.GetMessage().(*ClientMessage_Stdin); ok {
		return x.Stdin
	}
	return nil
}

type isClientMessage_Message interface {
	isClientMessage_Message()
}

type ClientMessage_OpenConnection struct {
	OpenConnection *OpenConnectionMessage `protobuf:"bytes,1,opt,name=open_connection,json=openConnection,proto3,oneof"`
}

type ClientMessage_Stdin struct {
	Stdin *StreamMessage `protobuf:"bytes,2,opt,name=stdin,proto3,oneof"`
}

func (*ClientMessage_OpenConnection) isClientMessage_Message() {}

func (*ClientMessage_Stdin) isClientMessage_Message() {}

type ServerMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Message:
	//	*ServerMessage_CloseConnection
	//	*ServerMessage_Stdout
	//	*ServerMessage_Stderr
	Message isServerMessage_Message `protobuf_oneof:"message"`
}

func (x *ServerMessage) Reset() {
	*x = ServerMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_termproxy_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ServerMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ServerMessage) ProtoMessage() {}

func (x *ServerMessage) ProtoReflect() protoreflect.Message {
	mi := &file_termproxy_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ServerMessage.ProtoReflect.Descriptor instead.
func (*ServerMessage) Descriptor() ([]byte, []int) {
	return file_termproxy_proto_rawDescGZIP(), []int{1}
}

func (m *ServerMessage) GetMessage() isServerMessage_Message {
	if m != nil {
		return m.Message
	}
	return nil
}

func (x *ServerMessage) GetCloseConnection() *CloseConnectionMessage {
	if x, ok := x.GetMessage().(*ServerMessage_CloseConnection); ok {
		return x.CloseConnection
	}
	return nil
}

func (x *ServerMessage) GetStdout() *StreamMessage {
	if x, ok := x.GetMessage().(*ServerMessage_Stdout); ok {
		return x.Stdout
	}
	return nil
}

func (x *ServerMessage) GetStderr() *StreamMessage {
	if x, ok := x.GetMessage().(*ServerMessage_Stderr); ok {
		return x.Stderr
	}
	return nil
}

type isServerMessage_Message interface {
	isServerMessage_Message()
}

type ServerMessage_CloseConnection struct {
	CloseConnection *CloseConnectionMessage `protobuf:"bytes,1,opt,name=close_connection,json=closeConnection,proto3,oneof"`
}

type ServerMessage_Stdout struct {
	Stdout *StreamMessage `protobuf:"bytes,2,opt,name=stdout,proto3,oneof"`
}

type ServerMessage_Stderr struct {
	Stderr *StreamMessage `protobuf:"bytes,3,opt,name=stderr,proto3,oneof"`
}

func (*ServerMessage_CloseConnection) isServerMessage_Message() {}

func (*ServerMessage_Stdout) isServerMessage_Message() {}

func (*ServerMessage_Stderr) isServerMessage_Message() {}

type OpenConnectionMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	EnvironmentId *UUID `protobuf:"bytes,1,opt,name=environment_id,json=environmentId,proto3" json:"environment_id,omitempty"`
}

func (x *OpenConnectionMessage) Reset() {
	*x = OpenConnectionMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_termproxy_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *OpenConnectionMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*OpenConnectionMessage) ProtoMessage() {}

func (x *OpenConnectionMessage) ProtoReflect() protoreflect.Message {
	mi := &file_termproxy_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use OpenConnectionMessage.ProtoReflect.Descriptor instead.
func (*OpenConnectionMessage) Descriptor() ([]byte, []int) {
	return file_termproxy_proto_rawDescGZIP(), []int{2}
}

func (x *OpenConnectionMessage) GetEnvironmentId() *UUID {
	if x != nil {
		return x.EnvironmentId
	}
	return nil
}

type CloseConnectionMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *CloseConnectionMessage) Reset() {
	*x = CloseConnectionMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_termproxy_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CloseConnectionMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CloseConnectionMessage) ProtoMessage() {}

func (x *CloseConnectionMessage) ProtoReflect() protoreflect.Message {
	mi := &file_termproxy_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CloseConnectionMessage.ProtoReflect.Descriptor instead.
func (*CloseConnectionMessage) Descriptor() ([]byte, []int) {
	return file_termproxy_proto_rawDescGZIP(), []int{3}
}

type StreamMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Contents []byte `protobuf:"bytes,1,opt,name=contents,proto3" json:"contents,omitempty"`
}

func (x *StreamMessage) Reset() {
	*x = StreamMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_termproxy_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *StreamMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*StreamMessage) ProtoMessage() {}

func (x *StreamMessage) ProtoReflect() protoreflect.Message {
	mi := &file_termproxy_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use StreamMessage.ProtoReflect.Descriptor instead.
func (*StreamMessage) Descriptor() ([]byte, []int) {
	return file_termproxy_proto_rawDescGZIP(), []int{4}
}

func (x *StreamMessage) GetContents() []byte {
	if x != nil {
		return x.Contents
	}
	return nil
}

var File_termproxy_proto protoreflect.FileDescriptor

var file_termproxy_proto_rawDesc = []byte{
	0x0a, 0x0f, 0x74, 0x65, 0x72, 0x6d, 0x70, 0x72, 0x6f, 0x78, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x0c, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22,
	0x85, 0x01, 0x0a, 0x0d, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x12, 0x41, 0x0a, 0x0f, 0x6f, 0x70, 0x65, 0x6e, 0x5f, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x16, 0x2e, 0x4f, 0x70, 0x65,
	0x6e, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4d, 0x65, 0x73, 0x73, 0x61,
	0x67, 0x65, 0x48, 0x00, 0x52, 0x0e, 0x6f, 0x70, 0x65, 0x6e, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x26, 0x0a, 0x05, 0x73, 0x74, 0x64, 0x69, 0x6e, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x05, 0x73, 0x74, 0x64, 0x69, 0x6e, 0x42, 0x09, 0x0a, 0x07,
	0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0xb4, 0x01, 0x0a, 0x0d, 0x53, 0x65, 0x72, 0x76,
	0x65, 0x72, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x44, 0x0a, 0x10, 0x63, 0x6c, 0x6f,
	0x73, 0x65, 0x5f, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x43, 0x6c, 0x6f, 0x73, 0x65, 0x43, 0x6f, 0x6e, 0x6e, 0x65,
	0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x0f,
	0x63, 0x6c, 0x6f, 0x73, 0x65, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x12,
	0x28, 0x0a, 0x06, 0x73, 0x74, 0x64, 0x6f, 0x75, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x0e, 0x2e, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48,
	0x00, 0x52, 0x06, 0x73, 0x74, 0x64, 0x6f, 0x75, 0x74, 0x12, 0x28, 0x0a, 0x06, 0x73, 0x74, 0x64,
	0x65, 0x72, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x53, 0x74, 0x72, 0x65,
	0x61, 0x6d, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x06, 0x73, 0x74, 0x64,
	0x65, 0x72, 0x72, 0x42, 0x09, 0x0a, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x49,
	0x0a, 0x15, 0x4f, 0x70, 0x65, 0x6e, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e,
	0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x30, 0x0a, 0x0e, 0x65, 0x6e, 0x76, 0x69, 0x72,
	0x6f, 0x6e, 0x6d, 0x65, 0x6e, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x09, 0x2e, 0x63, 0x74, 0x66, 0x2e, 0x55, 0x55, 0x49, 0x44, 0x52, 0x0d, 0x65, 0x6e, 0x76, 0x69,
	0x72, 0x6f, 0x6e, 0x6d, 0x65, 0x6e, 0x74, 0x49, 0x64, 0x22, 0x18, 0x0a, 0x16, 0x43, 0x6c, 0x6f,
	0x73, 0x65, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x22, 0x2b, 0x0a, 0x0d, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x4d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x73,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x08, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x73,
	0x32, 0x47, 0x0a, 0x10, 0x54, 0x65, 0x72, 0x6d, 0x70, 0x72, 0x6f, 0x78, 0x79, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x33, 0x0a, 0x0d, 0x50, 0x72, 0x6f, 0x78, 0x79, 0x54, 0x65, 0x72,
	0x6d, 0x69, 0x6e, 0x61, 0x6c, 0x12, 0x0e, 0x2e, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x4d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x1a, 0x0e, 0x2e, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x4d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x28, 0x01, 0x30, 0x01, 0x42, 0x1d, 0x5a, 0x1b, 0x67, 0x69, 0x74,
	0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x61, 0x63, 0x61, 0x73, 0x69, 0x2d, 0x63, 0x74,
	0x66, 0x2f, 0x63, 0x74, 0x66, 0x2f, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_termproxy_proto_rawDescOnce sync.Once
	file_termproxy_proto_rawDescData = file_termproxy_proto_rawDesc
)

func file_termproxy_proto_rawDescGZIP() []byte {
	file_termproxy_proto_rawDescOnce.Do(func() {
		file_termproxy_proto_rawDescData = protoimpl.X.CompressGZIP(file_termproxy_proto_rawDescData)
	})
	return file_termproxy_proto_rawDescData
}

var file_termproxy_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_termproxy_proto_goTypes = []interface{}{
	(*ClientMessage)(nil),          // 0: ClientMessage
	(*ServerMessage)(nil),          // 1: ServerMessage
	(*OpenConnectionMessage)(nil),  // 2: OpenConnectionMessage
	(*CloseConnectionMessage)(nil), // 3: CloseConnectionMessage
	(*StreamMessage)(nil),          // 4: StreamMessage
	(*UUID)(nil),                   // 5: ctf.UUID
}
var file_termproxy_proto_depIdxs = []int32{
	2, // 0: ClientMessage.open_connection:type_name -> OpenConnectionMessage
	4, // 1: ClientMessage.stdin:type_name -> StreamMessage
	3, // 2: ServerMessage.close_connection:type_name -> CloseConnectionMessage
	4, // 3: ServerMessage.stdout:type_name -> StreamMessage
	4, // 4: ServerMessage.stderr:type_name -> StreamMessage
	5, // 5: OpenConnectionMessage.environment_id:type_name -> ctf.UUID
	0, // 6: TermproxyService.ProxyTerminal:input_type -> ClientMessage
	1, // 7: TermproxyService.ProxyTerminal:output_type -> ServerMessage
	7, // [7:8] is the sub-list for method output_type
	6, // [6:7] is the sub-list for method input_type
	6, // [6:6] is the sub-list for extension type_name
	6, // [6:6] is the sub-list for extension extendee
	0, // [0:6] is the sub-list for field type_name
}

func init() { file_termproxy_proto_init() }
func file_termproxy_proto_init() {
	if File_termproxy_proto != nil {
		return
	}
	file_common_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_termproxy_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ClientMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_termproxy_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ServerMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_termproxy_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*OpenConnectionMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_termproxy_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CloseConnectionMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_termproxy_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*StreamMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_termproxy_proto_msgTypes[0].OneofWrappers = []interface{}{
		(*ClientMessage_OpenConnection)(nil),
		(*ClientMessage_Stdin)(nil),
	}
	file_termproxy_proto_msgTypes[1].OneofWrappers = []interface{}{
		(*ServerMessage_CloseConnection)(nil),
		(*ServerMessage_Stdout)(nil),
		(*ServerMessage_Stderr)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_termproxy_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_termproxy_proto_goTypes,
		DependencyIndexes: file_termproxy_proto_depIdxs,
		MessageInfos:      file_termproxy_proto_msgTypes,
	}.Build()
	File_termproxy_proto = out.File
	file_termproxy_proto_rawDesc = nil
	file_termproxy_proto_goTypes = nil
	file_termproxy_proto_depIdxs = nil
}
