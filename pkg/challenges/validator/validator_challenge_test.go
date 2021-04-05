package validator

import "testing"

var (
	validChallengeJson = `
{
  "id": "f332ab2e-6b10-42e6-8c54-6902f0dc01a4",
  "slug": "example-challenge",
  "name": "Basic Environment Example",
  "description": "This is an example challenge to demonstrate basic environments",
  "provisioner": {
    "type": "kubernetes"
  },
  "documentation": [
    {
      "name": "Hello 1",
      "path": "docs/Hello1.md"
    },
    {
      "name": "Hello 2",
      "path": "docs/Hello2.md"
    },
    {
      "name": "Hello 3",
      "path": "docs/Hello3.md"
    }
  ]
}`
)

func validateChallengeFunc(jsonMod []byte) ([]string, error) {
	return ValidateChallenge(jsonMod)
}

func TestValidateChallenge_Valid(t *testing.T) {
	errors, err := ValidateChallenge([]byte(validChallengeJson))
	if err != nil {
		t.Fatal(err)
	}

	if len(errors) > 0 {
		t.Fatalf("Expected zero errors from valid input")
	}
}

func TestValidateChallenge_Invalid_InvalidID(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeJson, "id", "1-2-3-4")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_MissingID(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeJson, "id")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_InvalidSlug(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeJson, "slug", "-2-3-")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_EmptySlug(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeJson, "slug", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_MissingSlug(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeJson, "slug")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_EmptyName(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeJson, "name", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_MissingName(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeJson, "name")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_EmptyDescription(t *testing.T) {
	jsonMod, err := updateKeyValueInJsonString(validChallengeJson, "description", "")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}

func TestValidateChallenge_Invalid_MissingDescription(t *testing.T) {
	jsonMod, err := deleteKeyValueInJson(validChallengeJson, "description")
	if err != nil {
		t.Fatal(err)
	}
	validateAndThrowIfNoErrors(t, jsonMod, validateChallengeFunc)
}
