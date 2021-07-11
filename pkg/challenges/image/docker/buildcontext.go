package docker

import (
	"archive/tar"
	"bytes"
	"github.com/bmatcuk/doublestar/v4"
	"github.com/docker/docker/api/types"
	"io"
	"io/fs"
	"log"
	"os"
	"path/filepath"
)

type BuildContextOptions struct {
	Dockerfile string            `json:"dockerfile"`
	Patterns   []string          `json:"patterns"`
	Arguments  map[string]string `json:"arguments"`
	Tag        string            `json:"tag"`
}

type BuildContext struct {
	Options            *BuildContextOptions
	BuildContextReader io.Reader
}

func (bc *BuildContext) BuildOptions() types.ImageBuildOptions {
	buildArgs := map[string]*string{}
	for k, v := range bc.Options.Arguments {
		buildArgs[k] = &v
	}

	return types.ImageBuildOptions{
		Dockerfile: bc.Options.Dockerfile,
		BuildArgs:  buildArgs,
		Tags:       []string{bc.Options.Tag},
	}
}

func CreateBuildContext(opts *BuildContextOptions) (*BuildContext, error) {
	buf := bytes.NewBuffer([]byte{})

	writer := tar.NewWriter(buf)
	defer writer.Close()

	err := addToTar(writer, opts.Dockerfile)
	if err != nil {
		return nil, err
	}

	err = filepath.Walk(".", func(path string, info fs.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}

		for _, pattern := range opts.Patterns {
			match, err := doublestar.Match(pattern, path)
			if err != nil {
				return err
			}

			if match {
				log.Printf("Adding file %s", path)
				return addToTar(writer, path)
			}
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return &BuildContext{
		opts,
		buf,
	}, nil
}

func addToTar(writer *tar.Writer, path string) error {
	// Open the target file
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	// Fetch file info
	info, err := file.Stat()
	if err != nil {
		return err
	}

	// Create tar header
	header, err := tar.FileInfoHeader(info, info.Name())
	if err != nil {
		return err
	}
	header.Name = path

	// Write the header
	err = writer.WriteHeader(header)
	if err != nil {
		return err
	}

	// Copy contents of the file on disk into the tar
	_, err = io.Copy(writer, file)
	return err
}
