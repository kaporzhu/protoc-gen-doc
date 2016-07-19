import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import '../node_modules/purecss/build/pure-min.css'
import '../static/css/main.css'

import App from './App'
import db from './db'
import Enum from './views/Enum.vue'
import Index from './views/Index.vue'
import Message from './views/Message.vue'
import Method from './views/Method.vue'
import Service from './views/Service.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.filter('extract', function (value) {
  return value.split('.').reverse()[0]
})

Vue.filter('isMessage', function (value) {
  return value === 'message'
})

Vue.filter('isEnum', function (value) {
  return value === 'enum'
})

Vue.filter('isNotMessageEnum', function (value) {
  return value !== 'enum' && value !== 'message'
})

var router = new VueRouter()
router.map({
  '/': {
    name: 'home',
    component: Index
  },
  '/:service': {
    name: 'service',
    component: Service
  },
  '/:service/:method': {
    name: 'method',
    component: Method
  },
  '/message/:name': {
    name: 'message',
    component: Message
  },
  '/enum/:name': {
    name: 'enum',
    component: Enum
  }
})

Vue.http.get('./static/collection.json').then((response) => {
  db.initData(response.json())
  router.start(App, '#root')
})
