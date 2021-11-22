package schemas

import _ "embed"

//go:embed challenge-set.schema.json
var ChallengeSetSchema []byte

//go:embed challenge.schema.json
var ChallengeSchema []byte

//go:embed provisioners/kubernetes.schema.json
var KubernetesProvisionerSchema []byte
