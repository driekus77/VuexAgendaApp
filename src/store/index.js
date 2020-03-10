import Vue from "vue";
import Vuex from "vuex";

import appointment from "./modules/appointment";
//import author from "./modules/author";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appointment
    //    author
  },
  strict: true
});
