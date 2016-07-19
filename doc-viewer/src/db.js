import constants from './constants'

export default {
  services: [],
  messages: {},
  enums: [],

  initData (protoFiles) {
    for (let proto of protoFiles) {
      let comments = this.parseComments(proto.source_code_info.location)
      this.parseServices(proto, comments, proto.service)
      this.parseMessages(proto, '', '.' + proto.package, comments, proto.message_type)
      this.parseEnums(proto, '', '.' + proto.package, comments, proto.enum_type)
    }
  },
  parseServices (proto, comments, services) {
    for (let sIndex in services) {
      let servicePath = constants.FileDescriptor.Service + ',' + sIndex
      let s = services[sIndex]

      // parse service basic info
      let pruned = this.pruneComments(comments[servicePath])
      let service = {
        name: s.name,
        comments: pruned.comments,
        signs: pruned.signs,
        methods: []
      }

      // parse service method
      for (let mIndex in s.method) {
        let m = s.method[mIndex]
        let pruned = this.pruneComments(comments[servicePath + ',' + constants.ServiceDescriptor.Method + ',' + mIndex])

        // join url sign
        if (service.signs.url && pruned.signs.url) {
          pruned.signs.url = service.signs.url + pruned.signs.url
        }

        let method = {
          name: m.name,
          input_type: m.input_type,
          output_type: m.output_type,
          comments: pruned.comments,
          signs: pruned.signs
        }
        service.methods.push(method)
      }
      this.services.push(service)
    }
  },
  parseMessages (proto, basePath, basePackage, comments, messages) {
    for (let mIndex in messages) {
      let msgPath = basePath ? (basePath + ',') : '' + constants.FileDescriptor.MessageType + ',' + mIndex
      let m = messages[mIndex]

      // parse message basic info
      let pruned = this.pruneComments(comments[msgPath])
      let message = {
        name: m.name,
        file: proto.name,
        package: proto.package,
        type_name: basePackage + '.' + m.name,
        comments: pruned.comments,
        signs: pruned.signs,
        fields: []
      }

      // parse message field
      for (var fIndex in m.field) {
        pruned = this.pruneComments(comments[msgPath + ',' + constants.MessageDescriptor.Field + ',' + fIndex])
        let f = m.field[fIndex]
        let field = {
          name: f.name,
          type: constants.FieldType[f.type],
          type_name: f.type_name,
          comments: pruned.comments,
          signs: pruned.signs,
          label: f.label
        }
        message.fields.push(field)
      }
      this.messages[message.type_name] = message

      // parse nested message
      this.parseMessages(proto, msgPath, message.type_name, comments, m.nested_type)

      // parse enum in message
      this.parseEnums(proto, msgPath, message.type_name, comments, m.enum_type)
    }
  },
  parseEnums (proto, basePath, basePackage, comments, enums) {
    for (var eIndex in enums) {
      let e = enums[eIndex]
      let enumPath = basePath ? (basePath + ',') : '' + constants.MessageDescriptor.EnumType + ',' + eIndex
      let pruned = this.pruneComments(comments[enumPath])
      let eu = {
        name: e.name,
        type_name: basePackage + '.' + e.name,
        comments: pruned.comments,
        signs: pruned.signs,
        items: []
      }

      for (var efIndex in e.value) {
        let ef = e.value[efIndex]
        let pruned = this.pruneComments(comments[enumPath + ',' + constants.EnumDescriptor.Value + ',' + efIndex])
        let item = {
          name: ef.name,
          value: ef.number,
          comments: pruned.comments,
          signs: pruned.signs
        }
        eu.items.push(item)
      }
      this.enums[eu.type_name] = eu
    }
  },
  parseComments (locations) {
    let comments = {}
    for (let loc of locations) {
      let cmt = ''
      if (loc.leading_comments) {
        cmt += loc.leading_comments
      }
      if (loc.trailing_comments) {
        cmt += loc.trailing_comments
      }
      if (cmt.length === 0) {
        continue
      }
      let path = loc.path.join(',')
      let lines = []
      for (var line of cmt.split('\n')) {
        if (line.trim().length > 0) {
          lines.push(line.trim())
        }
      }
      comments[path] = lines
    }
    return comments
  },
  pruneComments (comments) {
    let prunedComments = []
    let signs = {}
    for (let line of comments || []) {
      let match = line.trim().match(/^@(\w+):(.*)$/)
      if (match) {
        signs[match[1].trim()] = match[2].trim()
      } else {
        prunedComments.push(line.trim())
      }
    }
    return {signs: signs, comments: prunedComments}
  }
}
