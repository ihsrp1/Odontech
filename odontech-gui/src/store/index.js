import Vue from 'vue'
import Vuex from 'vuex'
import { loginInformation } from './loginInformation'
import { agendamento } from './agendamento'
import { atendimento } from './atendimento'
import { exame } from './exame'
Vue.use(Vuex)

import VuexPersistence from 'vuex-persist'
const vuexPersistent = new VuexPersistence({
    storage: window.localStorage,
    modules: ['loginInformation']
  })

export default new Vuex.Store({
  plugins: [vuexPersistent.plugin],
  modules: {
    loginInformation,
    agendamento,
    atendimento,
    exame
  }
})