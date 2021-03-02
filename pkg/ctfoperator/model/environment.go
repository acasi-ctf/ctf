package model

import (
	proto2 "github.com/golang/protobuf/proto"
	// TODO: rename proto package to pb, to avoid the above...
	"github.com/lgorence/goctfprototype/proto"
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

func (d *EnvironmentDao) Set(uuid *proto.UUID, env *proto.Environment) error {
	// TODO: would we rather store the key as a UUID in Protobuf or as a string?
	k, err := proto2.Marshal(uuid)
	if err != nil {
		return err
	}
	v, err := proto2.Marshal(env)
	if err != nil {
		return err
	}

	return d.db.Update(func(tx *bolt.Tx) error {
		return tx.Bucket(environmentBucket).Put(k, v)
	})
}

func (d *EnvironmentDao) List() (map[*proto.UUID]*proto.Environment, error) {
	list := make(map[*proto.UUID]*proto.Environment)

	err := d.db.View(func(tx *bolt.Tx) error {
		return tx.Bucket(environmentBucket).ForEach(func(k, v []byte) error {
			bk := &proto.UUID{}
			bv := &proto.Environment{}

			err := proto2.Unmarshal(k, bk)
			if err != nil {
				return err
			}

			err = proto2.Unmarshal(v, bv)
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
