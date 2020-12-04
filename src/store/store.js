import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    sata: false,
    keepAlive: [],
    bankperson: {},
    frompage:false
    
  },
  getters: {
    keepAlive: state => state.keepAlive
  },
  mutations: {
    change(state) {
      state.sata = !state.sata
    },
    setKeepAlive: (state, keepAlive) => {

      state.keepAlive.push(keepAlive)

    },
    deletKeepAlive: (state, keepAlive) => {
      state.keepAlive.splice(state.keepAlive.indexOf(keepAlive), 1);

    },
    changebankperson(state) {
      console.log(1)
    }, resetKeepAlive: (state, keepAlive) => {

      state.keepAlive = keepAlive

    },
    setbankperson: (state, keepAlive) => {

      state.bankperson=keepAlive

    },
    setfrompage: (state, keepAlive) => {

      state.frompage=keepAlive

    },

  }
})

export default store
