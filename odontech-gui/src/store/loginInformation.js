export const loginInformation = {
  namespaced: true,
  state: {
    activeUser: {},
    users: [
      {
        email: 'dentista@email.com',
        type: 'dentista',
        image: 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
      },
      {
        email: 'recepcionista@email.com',
        type: 'recepcionista',
        image: 'https://www.vacker360.com/wp-content/uploads/2020/07/front-desk-receptionist-duties.jpg'
      },
    ]
  },
  getters: {
    getUsers: state => {
      return state.users
    },
    hasActiveUser: state => {
      return typeof state.activeUser.type === typeof '' && typeof state.activeUser.email === typeof ''
    },
    activeUser: state => {
      return state.activeUser
    }
  },
  actions: {
    changeUser({ commit }, user) {
      commit('updateUser', user)
    }
  },
  mutations: {
    updateUser(state, user) {
      state.activeUser = user
    }
  },
}