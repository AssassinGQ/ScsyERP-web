import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'

export default new Vuex.Store({
    modules: { user },
    plugins: [createPersistedState()]
})