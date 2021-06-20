package cmd

import (
	"context"
	"github.com/acasi-ctf/ctf/pb"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"io/ioutil"
	"os"
)

// uploadCmd represents the upload command
var uploadCmd = &cobra.Command{
	Use:   "upload",
	Short: "Upload challenge set to server",
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) == 0 {
			cmd.Help()
			return
		}
		path := args[0]

		opts := []grpc.DialOption{
			grpc.WithInsecure(),
		}
		conn, err := grpc.Dial("localhost:1234", opts...)
		if err != nil {
			panic(err)
		}

		envZipFile, err := os.Open(path)
		if err != nil {
			panic(err)
		}
		defer envZipFile.Close()

		envZipBytes, err := ioutil.ReadAll(envZipFile)
		if err != nil {
			panic(err)
		}

		client := pb.NewEnvironmentProvisioningServiceClient(conn)
		_, err = client.UploadEnvironmentTemplate(context.Background(), &pb.UploadEnvironmentTemplateRequest{
			EnvZip: envZipBytes,
		})
		if err != nil {
			panic(err)
		}
	},
}

func init() {
	rootCmd.AddCommand(uploadCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// uploadCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// uploadCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
