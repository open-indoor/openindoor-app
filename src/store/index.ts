import Vue from "vue";
import Vuex from "vuex";
import { InitialState } from './state';
import { MapState, Map } from '../types';
Vue.use(Vuex);

export default new Vuex.Store({
  state: InitialState,
  mutations: {
    updateMap(state:MapState,m: Map) {
      state.map = m;
    }
  },
  actions: {
    updateMap(context, m: Map) {
      context.commit('updateMap', m);
    }
  }
});
