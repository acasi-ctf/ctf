package builder

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/acasi-ctf/ctf/pkg/challenges/model"
	"github.com/acasi-ctf/ctf/pkg/challenges/validator"
	"io/ioutil"
	"os"
	"path"
)

func BuildPackage(source string, destination string) error {
	challengeSetPath := path.Join(source, "challenge-set.json")
	cs, err := readAndValidateSet(challengeSetPath)
	if err != nil {
		return err
	}
	fmt.Println("Validated challenge set file")

	challengesPath := path.Join(source, "challenges")
	for _, challengePathName := range cs.Challenges {
		challengeDirPath := path.Join(challengesPath, challengePathName)
		challenge, err := readAndValidateChallenge(challengeDirPath)
		if err != nil {
			return err
		}
		fmt.Printf("Validated '%s' challenge file\n", challenge.Slug)
	}

	// TODO: Validate challenge slug is equal to challenge directory name.

	return ArchiveChallenge(source, destination)
}

func readAndValidateSet(path string) (*model.ChallengeSet, error) {
	challengeSetFile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer challengeSetFile.Close()

	challengeSetBytes, err := ioutil.ReadAll(challengeSetFile)
	if err != nil {
		return nil, err
	}

	msgs, err := validator.ValidateChallengeSet(challengeSetBytes)
	if err != nil {
		return nil, err
	}
	if len(msgs) > 0 {
		for _, msg := range msgs {
			fmt.Printf("Challenge Set Error: %s\n", msg)
		}
		return nil, errors.New("challenge set failed to validate")
	}

	cs := &model.ChallengeSet{}
	err = json.Unmarshal(challengeSetBytes, cs)
	if err != nil {
		return nil, err
	}

	return cs, nil
}

func readAndValidateChallenge(challengeDirPath string) (*model.Challenge, error) {
	jsonPath := path.Join(challengeDirPath, "challenge.json")

	file, err := os.Open(jsonPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	msgs, err := validator.ValidateChallenge(bytes)
	if err != nil {
		return nil, err
	}
	if len(msgs) > 0 {
		for _, msg := range msgs {
			fmt.Printf("Challenge Error: %s\n", msg)
		}
		return nil, errors.New("challenge failed to validate")
	}

	c := &model.Challenge{}
	err = json.Unmarshal(bytes, c)
	if err != nil {
		return nil, err
	}

	// TODO: Validate provisioner
	if c.Provisioner.Type == "kubernetes" {
		err = validateKubernetesProvisioner(challengeDirPath)
		if err != nil {
			return nil, err
		}
	}

	return c, nil
}

func validateKubernetesProvisioner(challengeDirPath string) error {
	jsonPath := path.Join(challengeDirPath, "kubernetes.json")

	file, err := os.Open(jsonPath)
	if err != nil {
		return err
	}
	defer file.Close()

	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return err
	}

	msgs, err := validator.ValidateKubernetesProvisioner(bytes)
	if err != nil {
		return err
	}
	if len(msgs) > 0 {
		for _, msg := range msgs {
			fmt.Printf("Kubernetes Provisioner Error: %s\n", msg)
		}
		return errors.New("provisioner failed to validate")
	}

	return nil
}
