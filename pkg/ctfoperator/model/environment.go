package model

import (
	"github.com/acasi-ctf/ctf/pb"
	"github.com/golang/protobuf/proto"
	bolt "go.etcd.io/bbolt"
)

var environmentBucket = []byte("environment")

func NewEnvironmentDao(db *bolt.DB) (*EnvironmentDao, error) {
	err := db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists(environmentBucket)
		return err
	})
	if err != nil {
		return nil, err
	}

	return &EnvironmentDao{
		db: db,
	}, nil
}

type EnvironmentDao struct {
	db *bolt.DB
}

func (d *EnvironmentDao) Set(uuid *pb.UUID, env *pb.Environment) error {
	k, err := proto.Marshal(uuid)
	if err != nil {
		return err
	}
	v, err := proto.Marshal(env)
	if err != nil {
		return err
	}

	return d.db.Update(func(tx *bolt.Tx) error {
		return tx.Bucket(environmentBucket).Put(k, v)
	})
}

func (d *EnvironmentDao) List() (map[*pb.UUID]*pb.Environment, error) {
	list := make(map[*pb.UUID]*pb.Environment)

	err := d.db.View(func(tx *bolt.Tx) error {
		return tx.Bucket(environmentBucket).ForEach(func(k, v []byte) error {
			bk := &pb.UUID{}
			bv := &pb.Environment{}

			err := proto.Unmarshal(k, bk)
			if err != nil {
				return err
			}

			err = proto.Unmarshal(v, bv)
			if err != nil {
				return err
			}
			list[bk] = bv

			return nil
		})
	})
	if err != nil {
		return nil, err
	}

	return list, nil
}
