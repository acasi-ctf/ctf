package validator

import (
	"testing"
)

var (
	validKubernetesProvisionerJson = `
{
  "templatePath": "file.yaml",
  "templateCRDVersion": "v1alpha1"
}`
)

func validateKubernetesProvisionerFunc(jsonMod []byte) ([]string, error) {
	return ValidateKubernetesProvisioner(jsonMod)
}

func TestValidateKubernetesProvisioner_Valid(t *testing.T) {
	errors, err := ValidateKubernetesProvisioner([]byte(validKubernetesProvisionerJson))
	if err != nil {
		t.Fatal(err)
	}

	if len(errors) > 0 {
		t.Fatalf("Expected zero errors from valid input")
	}
}

func TestValidateKubernetesProvisioner_Invalid_MissingTemplatePath(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validKubernetesProvisionerJson, "templatePath")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateKubernetesProvisionerFunc)
}

func TestValidateKubernetesProvisioner_Invalid_MissingTemplateCRDVersion(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validKubernetesProvisionerJson, "templateCRDVersion")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateKubernetesProvisionerFunc)
}

func TestValidateKubernetesProvisioner_Invalid_InvalidTemplateCRDVersion(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validKubernetesProvisionerJson, "templateCRDVersion", "v999beta1")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateKubernetesProvisionerFunc)
}
