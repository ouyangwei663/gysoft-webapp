import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    sata: false,
    keepAlive: []
  },
  getters: {
    keepAlive: state => state.keepAlive
  },
  mutations: {
    change(state) {
      state.sata = !state.sata
    },
    setKeepAlive: (state, keepAlive) => {
      console.log("改变成功")
      state.keepAlive = keepAlive;

    }

  }
})

export default store
