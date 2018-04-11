import Vue from 'vue'
import Vuex from 'vuex'

import loader from './modules/loader'
import editor from './modules/editor'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    loader,
    editor
  }
})

export default store
