package validator

import (
	"encoding/json"
	"github.com/acasi-ctf/ctf/challenges/schemas"
	"github.com/qri-io/jsonschema"
)

var kubernetesProvisionerSchema = &jsonschema.Schema{}

func init() {
	err := json.Unmarshal(schemas.KubernetesProvisionerSchema, kubernetesProvisionerSchema)
	if err != nil {
		panic(err)
	}
}

func ValidateKubernetesProvisioner(jsonBytes []byte) ([]string, error) {
	return validate(jsonBytes, kubernetesProvisionerSchema)
}
