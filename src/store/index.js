import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import selteacher from './modules/selteacher'
import dynamic from './modules/dynamic'
import teacher from './modules/teacher'


Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        selteacher,
        dynamic,
        teacher,
    },
    getters
})

export default store