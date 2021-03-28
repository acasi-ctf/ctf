package validator

import (
	"encoding/json"
	"fmt"
	"testing"
)

func updateKeyValueInJson(jsonStr string, key string, value string) ([]byte, error) {
	var m map[string]json.RawMessage
	err := json.Unmarshal([]byte(jsonStr), &m)
	if err != nil {
		return nil, err
	}

	m[key] = []byte(value)
	return json.Marshal(m)
}

func updateKeyValueInJsonString(jsonStr string, key string, value string) ([]byte, error) {
	return updateKeyValueInJson(jsonStr, key, fmt.Sprintf("\"%s\"", value))
}

func deleteKeyValueInJson(jsonStr string, key string) ([]byte, error) {
	var m map[string]json.RawMessage
	err := json.Unmarshal([]byte(jsonStr), &m)
	if err != nil {
		return nil, err
	}

	delete(m, key)
	return json.Marshal(m)
}

func validateAndThrowIfNoErrors(t *testing.T, jsonMod []byte, f func([]byte) ([]string, error)) {
	errors, err := f(jsonMod)
	if err != nil {
		t.Fatal(err)
	}

	if len(errors) == 0 {
		t.Fatalf("Expected at least one error from invalid input")
	}
}
