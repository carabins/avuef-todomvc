import "./assets/todo.css"
import Vue from "vue"
import { F, AVue } from "avuef"
import App from "./App.vue"

import items from "./store/items"

// Vue.config.devtools = false
// Vue.config.productionTip = false

const avuef = new AVue({
  items
})
Vue.use(avuef)
Vue.config.silent = true
new Vue({
  el: "#app",
  render: h => h(App)
})
