<template>
  <h2>{{ service.name }}</h2>
  <ul>
    <li v-if="service.comments">
      <p v-for="comment in service.comments">{{ comment }}</p>
    </li>
    <li>
      <h3>接口</h3>
      <ul>
        <li v-for="method in service.methods">
          <a v-link="{ name: 'method', params: {service: service.name, method: method.name} }">{{ method.name }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  import db from '../db'

  export default {
    data () {
      return {
        service: {}
      }
    },
    route: {
      data ({ to }) {
        for (let service of db.services) {
          if (service.name === to.params.service) {
            this.service = service
            return
          }
        }
      }
    }
  }
</script>
