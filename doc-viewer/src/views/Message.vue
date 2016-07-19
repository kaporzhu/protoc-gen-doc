<template>
  <h2>{{ message.name }}</h2>
  <ul>
    <li v-if="message.comments">
      <p v-for="comment in message.comments">{{ comment }}</p>
    </li>
    <li>
      <h3>Fields</h3>
      <message-fields :fields="message.fields"></message-fields>
    </li>
  </ul>
</template>

<script>
  import db from '../db'
  import MessageFields from '../components/Fields.vue'

  export default {
    data () {
      return {
        message: {}
      }
    },
    components: [
      MessageFields
    ],
    route: {
      data ({ to }) {
        this.message = db.messages[to.params.name]
      }
    }
  }
</script>
