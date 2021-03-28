package validator

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/acasi-ctf/ctf/challenges/schemas"
	"github.com/qri-io/jsonschema"
)

var challengeSetSchema = &jsonschema.Schema{}
var challengeSchema = &jsonschema.Schema{}

func init() {
	err := json.Unmarshal(schemas.ChallengeSetSchema, challengeSetSchema)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(schemas.ChallengeSchema, challengeSchema)
	if err != nil {
		panic(err)
	}
}

func validate(jsonBytes []byte, schema *jsonschema.Schema) ([]string, error) {
	ctx := context.Background()
	errs, err := schema.ValidateBytes(ctx, jsonBytes)
	if err != nil {
		return nil, err
	}

	var errMapped []string
	for _, x := range errs {
		errMapped = append(errMapped, fmt.Sprintf("%s - %s", x.PropertyPath, x.Message))
	}

	return errMapped, nil
}

func ValidateChallengeSet(jsonBytes []byte) ([]string, error) {
	return validate(jsonBytes, challengeSetSchema)
}

func ValidateChallenge(jsonBytes []byte) ([]string, error) {
	return validate(jsonBytes, challengeSchema)
}
