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

// These are constants that we use within our tests.
var (
	uuid1 = createUuid()
	uuid2 = createUuid()
	env1  *pb.Environment
)

// init initializes data that we use during testing.
func init() {
	tpb := timestamppb.Now()
	env1 = &pb.Environment{
		CreatedTime:  tpb,
		LastPingTime: tpb,
	}
}

// createUuid will generate a random google UUID and convert it to our Protobuf
// format for consumption inside of our database.
func createUuid() *pb.UUID {
	// Generate a UUID.
	uid, err := uuid.NewRandom()
	if err != nil {
		panic(err)
	}

	// Return a Protobuf ID filled with the contents of the UUID as a string.
	return &pb.UUID{
		Contents: uid.String(),
	}
}

// tempFile will create a random temporary file and return its path. This is
// useful for testing, as bbolt does not have an in-memory solution for testing.
func tempFile() string {
	// Get the temporary file.
	f, err := ioutil.TempFile("", "ctf-operator-")
	if err != nil {
		panic(err)
	}

	// Close the temporary file.
	err = f.Close()
	if err != nil {
		panic(err)
	}

	// Return the path of the file.
	return f.Name()
}

// createDao will open a temporary file and open a database consuming that file.
// It returns a pointer to a DAO and an error, if error is non-nil, the database
// will be nil.
func createDao() (*EnvironmentDao, error) {
	// Create the bbolt database.
	db, err := bolt.Open(tempFile(), 0666, nil)
	if err != nil {
		return nil, err
	}

	// Wrap the bbolt database with our DAO layer.
	return NewEnvironmentDao(db)
}

// cleanupDao will delete the database from disk.
func cleanupDao(db *bolt.DB) {
	os.RemoveAll(db.Path())
}

// TestNewEnvironmentDao tests that we can create and cleanup a DAO.
func TestNewEnvironmentDao(t *testing.T) {
	dao, err := createDao()
	if err != nil {
		t.Fatal(err)
	}
	defer cleanupDao(dao.db)
}

// TestEnvironmentDao_Set will create a DAO and test the Set operation.
// To assert our results, it queries the database, instead of using the DAO
// layer.
func TestEnvironmentDao_Set(t *testing.T) {
	// Create our DAO.
	dao, err := createDao()
	if err != nil {
		t.Fatal(err)
	}
	// Clean up the DAO later.
	defer cleanupDao(dao.db)

	// Run the Set operation that sets one UUID to an environment.
	err = dao.Set(uuid1, env1)
	if err != nil {
		t.Fatalf("Failed to Set on DAO: %v", err)
	}

	// Query the bbolt database to ensure that the key-value pair was inserted
	// and the contents are what we expect them to be after unmarshalling them.
	err = dao.db.View(func(tx *bolt.Tx) error {
		// Get the environment bucket.
		b := tx.Bucket(environmentBucket)

		// Marshal our expected values.
		keyBytes, err := proto.Marshal(uuid1)
		if err != nil {
			t.Fatalf("Failed to marshal key: %v", err)
		}
		exEnvBytes, err := proto.Marshal(env1)
		if err != nil {
			t.Fatalf("Failed to marshal environment: %v", err)
		}

		// Get our data from the bucket.
		envBytes := b.Get(keyBytes)

		// Assert that actual == expected.
		if !reflect.DeepEqual(exEnvBytes, envBytes) {
			t.Fatalf("Bytes inside database don't match what was set")
		}

		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
}

// TestEnvironmentDao_List will create a DAO and test the List operation.
func TestEnvironmentDao_List(t *testing.T) {
	// Create our DAO.
	dao, err := createDao()
	if err != nil {
		t.Fatal(err)
	}
	// Clean up the DAO after this function returns.
	defer cleanupDao(dao.db)

	// Set two unique keys to an environment.
	err = dao.Set(uuid1, env1)
	err = dao.Set(uuid2, env1)

	// Run our List operation.
	envs, err := dao.List()
	if err != nil {
		t.Fatalf("Failed to List on DAO: %v", err)
	}

	// Assert that the number of environments returned from List is what we
	// expect.
	if len(envs) != 2 {
		t.Fatalf("Unexpected number of environments returned from DAO")
	}
}
