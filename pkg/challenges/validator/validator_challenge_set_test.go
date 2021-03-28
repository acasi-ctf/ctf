package validator

import (
	"testing"
)

var (
	validChallengeSetJson = `
{
  "id": "d59f2c81-39fe-4e8c-8a7a-427041758a1d",
  "slug": "example",
  "name": "Example challenge set",
  "description": "Example challenge set to be used for reference while developing new challenge sets",
  "version": "0.1.0",
  "challenges": [
    "basic-env-example"
  ]
}`
)

func validateChallengeSetFunc(jsonMod []byte) ([]string, error) {
	return ValidateChallengeSet(jsonMod)
}

func TestValidateChallengeSet_Valid(t *testing.T) {
	errors, err := ValidateChallengeSet([]byte(validChallengeSetJson))
	if err != nil {
		t.Fatal(err)
	}

	if len(errors) > 0 {
		t.Fatalf("Expected zero errors from valid input")
	}
}

func TestValidateChallengeSet_Invalid_InvalidID(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeSetJson, "id", "1-2-3-4")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_MissingID(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeSetJson, "id")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_InvalidSlug(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeSetJson, "slug", "-2-3-")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_EmptySlug(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeSetJson, "slug", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_MissingSlug(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeSetJson, "slug")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_EmptyName(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeSetJson, "name", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_MissingName(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeSetJson, "name")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_EmptyDescription(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeSetJson, "description", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_MissingDescription(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeSetJson, "description")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_EmptyVersion(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeSetJson, "version", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_MissingVersion(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeSetJson, "version")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_MissingChallenges(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeSetJson, "challenges")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}

func TestValidateChallengeSet_Invalid_EmptyChallenges(t *testing.T) {
	jsonMod, err := updateKeyValueInJson(validChallengeSetJson, "challenges", "[]")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeSetFunc)
}
