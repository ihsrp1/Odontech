import axios from 'axios'

export const agendamento = {
  namespaced: true,
  state: {
    events: []
  },
  getters: {
    getAgendamentos: state => {
      console.log('aaa')
      return state.events
    }
  },
  actions: {
    async list({ commit }) {
      let result = []
      result = await axios.get('http://localhost:3000/listAgendamento')
      commit('setList', result.data)
    },
    async addAgendamento({ commit }, event) {
      console.log('addAgendamento')
      let result = []
      result = await axios.post('http://localhost:3000/addAgendamento', event)
      console.log(result)
      commit('setList', result.data)
    }
  },
  mutations: {
    setList(state, list) {
      state.events = list
    }
  }
}