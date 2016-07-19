<template>
    <table class="pure-table pure-table-bordered">
        <tbody>
            <tr v-for="field in fields">
            <td>{{ field.name }}</td>
            <td v-if="field.type | isMessage">
                <a v-link="{ name: 'message', params: {name: field.type_name} }">{{ field.type_name | extract }} <b v-if="field.label == 3">[ ]</b></a>
            </td>
            <td v-if="field.type | isEnum">
                <a v-link="{ name: 'enum', params: {name: field.type_name} }">{{ field.type_name | extract }} <b v-if="field.label == 3">[ ]</b></a>
            </td>
            <td v-if="field.type | isNotMessageEnum">{{ field.type }} <b v-if="field.label == 3">[ ]</b></td>
            <td>
                <p v-for="comment in field.comments">{{ comment }}</p>
            </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
  export default {
    name: 'message-fields',
    props: ['fields']
  }
</script>
