package image

import (
	"context"
	"github.com/acasi-ctf/ctf/pkg/challenges/image/docker"
	"github.com/spf13/cobra"
	"io/ioutil"
)

// buildCmd represents the build command
var buildCmd = &cobra.Command{
	Use: "build",
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) == 0 {
			cmd.Help()
			return
		}

		client, err := docker.NewClient()
		if err != nil {
			panic(err)
		}

		bc, err := docker.CreateBuildContext(&docker.BuildContextOptions{
			Dockerfile: "images/challenges/ciphers/Dockerfile",
			Patterns: []string{
				"challenges/**",
			},
			Tag: "ghcr.io/acasi-ctf/challenges/ciphers/caesar-cipher",
			Arguments: map[string]string{
				"CIPHER_FILE": "caesar-cipher/code/Caesar-cipher.py",
			},
		})
		if err != nil {
			panic(err)
		}

		resp, err := client.ImageBuild(context.Background(), bc.BuildContextReader, bc.BuildOptions())
		if err != nil {
			panic(err)
		}

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			panic(err)
		}

		println(string(body))
	},
}

func init() {
	Command.AddCommand(buildCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// buildCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// buildCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
