package docker

import (
	"github.com/docker/cli/cli/connhelper"
	dockerclient "github.com/docker/docker/client"
	"net/http"
	"os"
)

func NewClient() (*dockerclient.Client, error) {
	if len(os.Getenv("DOCKER_HOST")) == 0 {
		return buildNormalClient()
	} else {
		return buildSshClient()
	}
}

func buildNormalClient() (*dockerclient.Client, error) {
	return dockerclient.NewClientWithOpts(dockerclient.FromEnv)
}

func buildSshClient() (*dockerclient.Client, error) {
	helper, err := connhelper.GetConnectionHelper(os.Getenv("DOCKER_HOST"))
	if err != nil {
		return nil, err
	}

	httpClient := &http.Client{
		Transport: &http.Transport{
			DialContext: helper.Dialer,
		},
	}

	clientOpts := []dockerclient.Opt{
		dockerclient.WithHTTPClient(httpClient),
		dockerclient.WithHost(helper.Host),
		dockerclient.WithDialContext(helper.Dialer),
	}

	return dockerclient.NewClientWithOpts(clientOpts...)
}
