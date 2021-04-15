package cmd

import (
	"fmt"
	"github.com/acasi-ctf/ctf/pkg/challenges/builder"
	"github.com/spf13/cobra"
	"os"
)

// buildCmd represents the build command
var buildCmd = &cobra.Command{
	Use:   "build DIRECTORY OUTPUT",
	Short: "Build a challenge set",
	Long:  `Build a challenge set from the appropriate files.`,
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) != 2 {
			cmd.Help()
			return
		}

		dir := args[0]
		out := args[1]
		err := builder.BuildPackage(dir, out)
		if err != nil {
			fmt.Printf("Error while building package: %v\n", err)
			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(buildCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// buildCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// buildCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
