OS := $(shell uname)
ifeq ($(OS), Darwin)
	# mac
	COLLECT_JSON_APP = bin/mac/collect-json
else ifeq ($(OS), Linux)
	# linux
	COLLECT_JSON_APP = bin/linux/collect-json
else
	$(error Unsupported OS)
endif

compile:
	rm -f ./build/doc/collection.json
	./$(COLLECT_JSON_APP) -doc=build/doc
	mv ./build/doc/collection.json doc-viewer/static

compile-protoc-gen-doc:
	# windows
	GOOS=windows GOARCH=386 go build -o bin/windows/protoc-gen-doc.exe protoc-gen-doc.go
	# linux
	GOOS=linux GOARCH=amd64 go build -o bin/linux/protoc-gen-doc protoc-gen-doc.go
	# mac
	GOOS=darwin GOARCH=amd64 go build -o bin/mac/protoc-gen-doc protoc-gen-doc.go

compile-collect-json:
	# windows
	GOOS=windows GOARCH=386 go build -o bin/windows/collect-json.exe collect-json.go
	# linux
	GOOS=linux GOARCH=amd64 go build -o bin/linux/collect-json collect-json.go
	# mac
	GOOS=darwin GOARCH=amd64 go build -o bin/mac/collect-json collect-json.go

-include *.mk
