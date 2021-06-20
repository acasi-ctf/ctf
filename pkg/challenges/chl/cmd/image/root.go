package image

import (
	"github.com/spf13/cobra"

	"github.com/spf13/viper"
)

// Command represents the base command when called without any subcommands
var Command = &cobra.Command{
	Use:   "image",
	Short: "Manage challenge images",
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the Command.
func Execute() {
	cobra.CheckErr(Command.Execute())
}

func init() {
	cobra.OnInitialize(initConfig)
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	viper.AutomaticEnv() // read in environment variables that match
}
