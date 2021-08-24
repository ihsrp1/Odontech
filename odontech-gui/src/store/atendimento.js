import axios from 'axios'

export const atendimento = {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    getAtendimentos: state => {
      return state.list
    }
  },
  actions: {
    async list({ commit }) {
      let result = []
      result = await axios.get('http://localhost:3000/listAtendimentos')
      commit('setList', result.data)
    },
    async filterByPatient({ commit }, patient) {
      let result = []
      result = await axios.get('http://localhost:3000/filterAtendimentoByPatient', {params: {patient}})
      commit('setList', result.data)
    },
    async filterByDoctor({ commit }, doctor) {
      let result = []
      result = await axios.get('http://localhost:3000/filterAtendimentoByDoctor', {params: {doctor}})
      commit('setList', result.data)
    },
    async filterByDateRange({ commit }, range) {
      let result = []
      result = await axios.get('http://localhost:3000/filterAtendimentoByRange', {params: range})
      commit('setList', result.data)
    },
    async filterByType({ commit }, type) {
      let result = []
      result = await axios.get('http://localhost:3000/filterAtendimentoByType', {params: {type}})
      commit('setList', result.data)
    }
  },
  mutations: {
    setList(state, list) {
      state.list = list
    }
  },
}