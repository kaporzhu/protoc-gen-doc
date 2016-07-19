// Collect all the json data in the build folder and save them in one single json file: collection.json
package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	// parse args
	var docPath string
	flag.StringVar(&docPath, "doc", "build/doc", "Path for the json document")
	flag.Parse()

	var content []string
	filepath.Walk(docPath, func(path string, f os.FileInfo, err error) error {
		if false == f.IsDir() && ".json" == filepath.Ext(f.Name()) {
			data, _ := ioutil.ReadFile(path)
			content = append(content, string(data))
		}
		return nil
	})
	data := fmt.Sprintf("[%s]", strings.Join(content, ","))
	file, _ := os.Create(fmt.Sprintf("%s/collection.json", docPath))
	file.Write([]byte(data))
	file.Close()
}
