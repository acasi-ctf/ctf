package model

import (
	"errors"
	"github.com/acasi-ctf/ctf/pb"
	"github.com/golang/protobuf/proto"
	bolt "go.etcd.io/bbolt"
)

// Defines the name for the environment bucket.
var environmentBucket = []byte("environment")

// NewEnvironmentDao will create a new DAO that can access the environment
// bucket.
// Returns a pointer to the EnvironmentDao and an error. If the error is not
// nil, the returned EnvironmentDao pointer will be nil.
func NewEnvironmentDao(db *bolt.DB) (*EnvironmentDao, error) {
	// Attempt to create a new bucket for persisting environments.
	err := db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists(environmentBucket)
		return err
	})
	if err != nil {
		return nil, err
	}

	// Return the new EnvironmentDao.
	return &EnvironmentDao{
		db: db,
	}, nil
}

// EnvironmentDao is a struct that has a number of methods on it for CRUD of
// Environment Protobuf messages.
type EnvironmentDao struct {
	db *bolt.DB
}

// Set will set an environment to an ID in the database.
// Returns an error if an error occurred during the set operation, otherwise,
// the operation succeeded.
func (d *EnvironmentDao) Set(uuid *pb.UUID, env *pb.Environment) error {
	// Check if inputs are nil, and bail if true.
	if uuid == nil || env == nil {
		return errors.New("invalid arguments")
	}

	// Marshal from Protobuf object to bytes.
	k, err := proto.Marshal(uuid)
	if err != nil {
		return err
	}
	v, err := proto.Marshal(env)
	if err != nil {
		return err
	}

	// Attempt to update the database, and return the resulting error, if any.
	return d.db.Update(func(tx *bolt.Tx) error {
		return tx.Bucket(environmentBucket).Put(k, v)
	})
}

// List will list the environments in the database.
// Returns a map of pb.UUID (key) to pb.Environment (value), and an error.
// If the error is non-nil, an error occurred, and the map will be nil.
func (d *EnvironmentDao) List() (map[*pb.UUID]*pb.Environment, error) {
	// Create our map to fill and return.
	list := make(map[*pb.UUID]*pb.Environment)

	// Attempt to query the database for all of our environments.
	err := d.db.View(func(tx *bolt.Tx) error {
		// Run a ForEach operation against the bucket contents.
		return tx.Bucket(environmentBucket).ForEach(func(k, v []byte) error {
			// Create empty objects to Unmarshal into.
			bk := &pb.UUID{}
			bv := &pb.Environment{}

			// Unmarshal the key.
			err := proto.Unmarshal(k, bk)
			if err != nil {
				return err
			}

			// Unmarshal the value.
			err = proto.Unmarshal(v, bv)
			if err != nil {
				return err
			}

			// Set the key to value in our map.
			list[bk] = bv

			// No error occurred, return nil.
			return nil
		})
	})

	// If the operation returned an error, bail and return a nil map.
	if err != nil {
		return nil, err
	}

	// The operation succeeded, return our map of results.
	return list, nil
}
