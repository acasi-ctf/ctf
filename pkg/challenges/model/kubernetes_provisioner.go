package model

type Paths []string

type KubernetesProvisioner struct {
	Manifests *KubernetesManifests
}

type KubernetesManifests struct {
	Pods Paths
}
