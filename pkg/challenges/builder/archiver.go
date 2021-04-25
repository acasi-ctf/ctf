package builder

import (
	"archive/zip"
	"io"
	"io/fs"
	"os"
	"path/filepath"
)

func ArchiveChallenge(challengeDir string, archiveDest string) error {
	file, err := os.OpenFile(archiveDest, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0755)
	if err != nil {
		return err
	}
	defer file.Close()

	zipWriter := zip.NewWriter(file)
	defer zipWriter.Close()

	oldWd, err := os.Getwd()
	if err != nil {
		return err
	}

	err = os.Chdir(challengeDir)
	if err != nil {
		return err
	}

	err = filepath.Walk(".", func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		return addFileToZip(zipWriter, path)
	})
	if err != nil {
		return err
	}

	return os.Chdir(oldWd)
}

func addFileToZip(zipWriter *zip.Writer, filePath string) error {
	fileToZip, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer fileToZip.Close()

	// Get the file information
	info, err := fileToZip.Stat()
	if err != nil {
		return err
	}

	header, err := zip.FileInfoHeader(info)
	if err != nil {
		return err
	}

	header.Name = filePath
	header.Method = zip.Deflate

	writer, err := zipWriter.CreateHeader(header)
	if err != nil {
		return err
	}
	_, err = io.Copy(writer, fileToZip)
	return err
}
