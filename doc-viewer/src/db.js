import constants from './constants'

export default {
  services: [],
  messages: {},
  enums: [],

  initData (protoFiles) {
    for (let proto of protoFiles) {
      let comments = this.parseComments(proto.source_code_info.location)

      // parse message
      for (let mIndex in proto.message_type) {
        let msgPath = constants.FileDescriptor.MessageType + ',' + mIndex
        let m = proto.message_type[mIndex]

        // parse message basic info
        let pruned = this.pruneComments(comments[msgPath])
        let message = {
          name: m.name,
          file: proto.name,
          package: proto.package,
          type_name: '.' + proto.package + '.' + m.name,
          comments: pruned.comments,
          signs: pruned.signs,
          fields: []
        }

        // parse message field
        pruned = this.pruneComments(comments[msgPath + ',' + constants.MessageDescriptor.Field + ',' + fIndex])
        for (var fIndex in m.field) {
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

        // parse message enum
        for (var eIndex in m.enum_type) {
          let e = m.enum_type[eIndex]
          let enumPath = msgPath + ',' + constants.MessageDescriptor.EnumType + ',' + eIndex
          let pruned = this.pruneComments(comments[enumPath])
          let eu = {
            name: e.name,
            type_name: message.type_name + '.' + e.name,
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
      }

      // parse service
      for (let sIndex in proto.service) {
        let servicePath = constants.FileDescriptor.Service + ',' + sIndex
        let s = proto.service[sIndex]

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
