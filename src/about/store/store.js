import Vue from 'vue'
import Vuex from 'vuex'
import actionCounter from './actioins/counter'
import mutationCounter from './mutations/counter'
import getterCounter from './getters/counter'
import state from './state/index'
Vue.use(Vuex)

const mutations = {
  ...mutationCounter
}

const actions = {
  ...actionCounter
}

// getters are functions
const getters = {
  ...getterCounter
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
