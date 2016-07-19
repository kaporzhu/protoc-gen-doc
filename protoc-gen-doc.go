// doc plugin for protoc
package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"

	"github.com/golang/protobuf/proto"
	generator "github.com/golang/protobuf/protoc-gen-go/generator"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

func main() {
	g := generator.New()

	data, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		g.Error(err, "reading input")
	}

	if err := proto.Unmarshal(data, g.Request); err != nil {
		g.Error(err, "parsing input proto")
	}

	if len(g.Request.FileToGenerate) == 0 {
		g.Fail("no files to generate")
	}

	// Send back the results.
	response := &plugin.CodeGeneratorResponse{}
	for _, file := range g.Request.ProtoFile {
		bytes, _ := json.Marshal(file)
		content := string(bytes)
		fileName := strings.Replace(*file.Name, ".proto", ".json", 1)
		response.File = append(response.File, &plugin.CodeGeneratorResponse_File{
			Name:    &fileName,
			Content: &content,
		})
	}
	data, err = proto.Marshal(response)
	if err != nil {
		g.Error(err, "failed to marshal output proto")
	}
	_, err = os.Stdout.Write(data)
	if err != nil {
		g.Error(err, "failed to write output proto")
	}
}
