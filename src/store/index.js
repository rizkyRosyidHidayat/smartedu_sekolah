import Vue from 'vue'
import Vuex from 'vuex'

import dataMaster from './master'
import dataTes from './tes'
import dataSiswa from './siswa'
import dataSoal from './soal'

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
    dataSoal: dataSoal,
    dataSiswa: dataSiswa,
    dataTes: dataTes,
    dataMaster: dataMaster
  }
})
