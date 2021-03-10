package model

import (
	"github.com/acasi-ctf/ctf/pb"
	"github.com/golang/protobuf/proto"
	"github.com/google/uuid"
	bolt "go.etcd.io/bbolt"
	"google.golang.org/protobuf/types/known/timestamppb"
	"io/ioutil"
	"os"
	"reflect"
	"testing"
)

var (
	uuid1 = createUuid()
	uuid2 = createUuid()
	env1  *pb.Environment
)

func init() {
	tpb := timestamppb.Now()
	env1 = &pb.Environment{
		CreatedTime:  tpb,
		LastPingTime: tpb,
	}
}

func createUuid() *pb.UUID {
	uid, err := uuid.NewRandom()
	if err != nil {
		panic(err)
	}

	return &pb.UUID{
		Contents: uid.String(),
	}
}

func tempFile() string {
	f, err := ioutil.TempFile("", "ctf-operator-")
	if err != nil {
		panic(err)
	}
	err = f.Close()
	if err != nil {
		panic(err)
	}
	return f.Name()
}

func createDao() (*EnvironmentDao, error) {
	db, err := bolt.Open(tempFile(), 0666, nil)
	if err != nil {
		return nil, err
	}

	return NewEnvironmentDao(db)
}

func cleanupDao(db *bolt.DB) {
	os.RemoveAll(db.Path())
}

func TestNewEnvironmentDao(t *testing.T) {
	dao, err := createDao()
	if err != nil {
		t.Fatal(err)
	}
	defer cleanupDao(dao.db)
}

func TestEnvironmentDao_Set(t *testing.T) {
	dao, err := createDao()
	if err != nil {
		t.Fatal(err)
	}
	defer cleanupDao(dao.db)

	err = dao.Set(uuid1, env1)
	if err != nil {
		t.Fatalf("Failed to Set on DAO: %v", err)
	}

	dao.db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket(environmentBucket)
		keyBytes, err := proto.Marshal(uuid1)
		if err != nil {
			t.Fatalf("Failed to marshal key: %v", err)
		}

		exEnvBytes, err := proto.Marshal(env1)
		if err != nil {
			t.Fatalf("Failed to marshal environment: %v", err)
		}

		envBytes := b.Get(keyBytes)

		if !reflect.DeepEqual(exEnvBytes, envBytes) {
			t.Fatalf("Bytes inside database don't match what was set")
		}

		return nil
	})
}

func TestEnvironmentDao_List(t *testing.T) {
	dao, err := createDao()
	if err != nil {
		t.Fatal(err)
	}
	defer cleanupDao(dao.db)

	err = dao.Set(uuid1, env1)
	err = dao.Set(uuid2, env1)

	envs, err := dao.List()
	if err != nil {
		t.Fatalf("Failed to List on DAO: %v", err)
	}

	if len(envs) != 2 {
		t.Fatalf("Unexpected number of environments returned from DAO")
	}
}
