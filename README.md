# protoc-gen-doc

> Generate API document from proto files.

## Sample

[protoc-gen-doc API sample](http://kaporzhu.github.io/protoc-gen-doc-sample/)

[protoc-gen-doc proto sample](http://kaporzhu.github.io/protoc-gen-doc-sample/sample.proto)

## Decorators

> All the comments for message, service and rpc will be used for the document.
Both leading comment and tailing comment are fine.
The comment line start with @ will be recognized as decorator.
Supported decorator:

| **decorator** | **usage** |
| ------------- | --------- |
| url | // @url: /user |


Sample proto

``` proto
// leading comment
message GetUserReq { // tailing comment
    int32 id = 1; // user id
}

message GetUserResp {
    User user = 1;
}

// @url: /user
service UserService {
    // @url: /get
    // Get user by ID
    rpc GetUser(GetUserReq) returns(GetUserResp);
}
```


## How to use it?

1. Copy **bin/\<linux|mac\>/protoc-gen-doc** to your proto folder
2. Compile proto with plugin `protoc-gen-doc`

    ``` bash
    protoc --plugin=protoc-gen-doc --doc_out=build/doc -Isrc sample.proto
    ```

3. Copy the build folder to protoc-gen-doc project root
4. Compile the API doc:

    ``` bash
    make compile
    ```

5. Step into doc-viewer folder and install the nodejs dependencies with **npm install**
6. Launch the debug server

    ``` bash
    npm run dev
    ```

## How to deploy the doc?

1. Step into doc-viewer and build the project

    ```bash
    npm run build
    ```

2. Upload the dist folder to your server. No backend server is required.
