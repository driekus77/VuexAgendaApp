import Vue from "vue";
import Vuex from "vuex";

import agenda from "./modules/agenda";
import appointment from "./modules/appointment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    agenda,
    appointment
  },
  strict: true
});
