import axios from 'axios'

export const exame = {
  namespaced: true,
  state: {
    events: []
  },
  getters: {
    getExame: state => {
      console.log('aaa')
      return state.events
    }
  },
  actions: {
    async list({ commit }) {
      let result = []
      result = await axios.get('http://localhost:3000/listExame')
      commit('setList', result.data)
    },
    async addExame({ commit }, event) {
      console.log('addExame')
      let result = []
      result = await axios.post('http://localhost:3000/addExame', event)
      console.log(result)
      commit('setList', result.data)
    },
    async filterByPatient({ commit }, patient) {
      let result = []
      result = await axios.get('http://localhost:3000/filterExameByPatient', {params: {patient}})
      commit('setList', result.data)
    },
    async filterByType({ commit }, type) {
      let result = []
      result = await axios.get('http://localhost:3000/filterExameByType', {params: {type}})
      commit('setList', result.data)
    },
  },
  mutations: {
    setList(state, list) {
      state.events = list
    }
  }
}