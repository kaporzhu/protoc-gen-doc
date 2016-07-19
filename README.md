protoc-gen-doc
================

> Generate API document from proto files.

API doc rule
------------------

> All the comments for message, service and rpc will be used for the document.
Both leading comment and tailing comment are fine.
The comment line start with @ will be recognized as decorator.
Supported decorator:

| **decorator** | **usage** |
| ------------- | --------- |
| url | API URL. service_url + rpc url |


Sample proto

```
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


How use it?
---------------

1. Copy **bin/<linux|mac>/protoc-gen-doc** to your proto folder
2. Compile proto with plugin `protoc-gen-doc`

    ```
    $ protoc --plugin=protoc-gen-doc --doc_out=build/doc -Isrc sample.proto
    ```

3. Copy the build folder to protoc-gen-doc project root
4. Compile the API doc:

    ```
    $ make compile
    ```

5. Step into doc-viewer folder and install the nodejs dependencies with **npm install**
6. Launch the debug server

    ```
    $ npm run dev
    ```

How to deploy the doc?
--------------------------

1. Step into doc-viewer and build the project

    ```
    $ npm run build
    ```

2. Upload the dist folder to your server. No backend server is required.
