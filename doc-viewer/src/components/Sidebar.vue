<template>
  <div class="sidebar">
    <div class="pure-menu">
      <h2>API文档</h2>
      <ul class="menu-root">
        <li v-for="service in services">
          <a v-bind:class="{ 'sidebar-link': true, 'current': selectedService == service.name }" v-link="{ name: 'service', params: {service: service.name} }">{{ service.name }}</a>
          <ul class="menu-sub">
            <li v-for="method in service.methods">
              <a v-bind:class="{ 'sidebar-link': true, 'current': selectedMethod == method.name }" v-link="{ name: 'method', params: {service: service.name, method: method.name} }">{{ method.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import db from '../db'

  export default {
    data () {
      return {
        services: db.services,
        selectedService: undefined,
        selectedMethod: undefined
      }
    },
    ready: function () {
      this.$router.afterEach((transition) => {
        this.selectedService = transition.to.params.service
        this.selectedMethod = transition.to.params.method
      })
    }
  }
</script>
