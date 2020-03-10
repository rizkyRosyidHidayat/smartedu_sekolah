import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalToken: false
  },
  mutations: {
    updateModalToken (state, payload) {
      state.modalToken = payload
    }
  },
  actions: {
    updateModalToken (context, payload) {
      context.commit('updateModalToken', payload)
    }
  },
  modules: {
  }
})
