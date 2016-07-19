<template>
  <div id="app">
    <div id="main" class="fix-sidebar">
      <sidebar></sidebar>
      <div class="content api with-sidebar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  elements: 'body',
  components: {
    Sidebar
  }
}

</script>
