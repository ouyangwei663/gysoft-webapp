import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        sata:false
    },
    mutations:{
        change(state){
            state.sata=!state.sata
        }
    }
})

export default store