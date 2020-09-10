import Vue from 'vue'
import Vuex from '../../../src/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },

  mutations: {
    increment(state) {
      state.count++
    }
  },

  actions: {
    increment({commit}, paylaod) {
      setTimeout(function () {
        commit('increment')
      }, 1000)
    }
  },

  modules: {
  },

  getters: {
    doubleCount: (state) => 2 * state.count
  }
})
