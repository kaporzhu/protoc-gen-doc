<template>
  <h2>{{ enum.name }}</h2>
  <ul>
    <li v-if="enum.comments">
      <p v-for="comment in enum.comments">{{ comment }}</p>
    </li>
    <li>
      <h3>Value</h3>
      <table class="pure-table pure-table-bordered">
        <tbody>
          <tr v-for="item in enum.items">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>
              <p v-for="comment in item.comments">{{ comment }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  </ul>
</template>

<script>
  import db from '../db'

  export default {
    data () {
      return {
        enum: {}
      }
    },
    route: {
      data ({ to }) {
        this.enum = db.enums[to.params.name]
      }
    }
  }
</script>
