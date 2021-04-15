package model

type Challenge struct {
	Id            string
	Slug          string
	Name          string
	Description   string
	Provisioner   *Provisioner
	Documentation []*Document
}

type Provisioner struct {
	Type string
}

type Document struct {
	Name string
	Path string
}
