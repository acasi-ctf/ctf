package main

import (
	"github.com/lgorence/goctfprototype/pkg/ctfoperator"
	"log"
)

func main() {
	err := ctfoperator.StartOperator()
	if err != nil {
		log.Fatalf("Failed to start operator: %v", err)
	}
}
