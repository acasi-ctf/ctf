package uuidw

import (
	"github.com/acasi-ctf/ctf/pb"
	googleuuid "github.com/google/uuid"
)

func ProtoFromString(str string) *pb.UUID {
	return &pb.UUID{
		Contents: str,
	}
}

func ProtoToGoogle(x *pb.UUID) googleuuid.UUID {
	return googleuuid.MustParse(x.Contents)
}

func GoogleToProto(u googleuuid.UUID) *pb.UUID {
	return &pb.UUID{
		Contents: u.String(),
	}
}
