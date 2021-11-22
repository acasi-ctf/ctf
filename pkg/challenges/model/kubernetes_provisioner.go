package model

type KubernetesProvisioner struct {
	TemplatePath       string `json:"templatePath"`
	TemplateCRDVersion string `json:"templateCRDVersion"`
}
