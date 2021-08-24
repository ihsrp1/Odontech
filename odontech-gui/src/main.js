import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'

import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)

import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
