// ref: https://github.com/google/protobuf/blob/master/src/google/protobuf/descriptor.proto
export default {
  FileDescriptor: {
    FileName: 1,
    PackageName: 2,
    MessageType: 4,
    EnumType: 5,
    Service: 6,
    Extension: 7,
    Options: 8,
    Syntax: 9
  },
  MessageDescriptor: {
    Name: 1,
    Field: 2,
    Extension: 6,
    NestedType: 3,
    EnumType: 4
  },
  ServiceDescriptor: {
    Name: 1,
    Method: 2
  },
  MethodDescriptor: {
    Name: 1,
    InputType: 2,
    OutputType: 3
  },
  EnumDescriptor: {
    Name: 1,
    Value: 2
  },
  EnumValueDescriptor: {
    Name: 1,
    Number: 2
  },
  LabelDescriptor: {
    Optional: 1,
    Required: 2,
    Repeated: 3
  },
  FieldType: {
    1: 'double',
    2: 'float',
    3: 'int64',
    4: 'uint64',
    5: 'int32',
    6: 'fixed64',
    7: 'fixed32',
    8: 'bool',
    9: 'string',
    10: 'group',
    11: 'message',
    12: 'bytes',
    13: 'uint32',
    14: 'enum',
    15: 'sfixed32',
    16: 'sfixed64',
    17: 'sint32',
    18: 'sint64'
  }
}
