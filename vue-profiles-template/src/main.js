// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRotter from "vue-router"

import router from './router'

Vue.use(VueRotter)

Vue.config.productionTip = false
Vue.prototype.$baseUrl = process.env.baseUrl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
