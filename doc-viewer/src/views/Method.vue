<template>
  <h2>{{ service.name }}.{{ method.name }}</h2>
  <ul>
    <li v-if="method.comments">
      <p v-for="comment in method.comments">{{ comment }}</p>
    </li>
    <li v-for="(signName, signValue) in method.signs">
      <h3>{{ signName | uppercase }}</h3>
      <p>{{ signValue }}</p>
    </li>
    <li>
      <h3>Request <a v-link="{ name: 'message', params: {name: inputMessage.type_name} }">{{ inputMessage.name }}</a></h3>
      <message-fields :fields="inputMessage.fields"></message-fields>
    </li>
    <li>
      <h3>Response <a v-link="{ name: 'message', params: {name: outputMessage.type_name} }">{{ outputMessage.name }}</a></h3>
      <message-fields :fields="outputMessage.fields"></message-fields>
    </li>
  </ul>
</template>
<script>
  import db from '../db'
  import MessageFields from '../components/Fields.vue'

  export default {
    data () {
      return {
        service: {},
        method: {},
        inputMessage: {},
        outputMessage: {}
      }
    },
    components: [MessageFields],
    route: {
      data ({ to }) {
        for (let service of db.services) {
          if (service.name === to.params.service) {
            this.service = service
            break
          }
        }
        for (let method of this.service.methods) {
          if (method.name === to.params.method) {
            this.method = method
            this.inputMessage = db.messages[this.method.input_type]
            this.outputMessage = db.messages[this.method.output_type]
            break
          }
        }
      }
    }
  }
</script>
