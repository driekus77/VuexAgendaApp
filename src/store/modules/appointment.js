import Vue from "vue";

import { normalizeRelations, resolveRelations } from "../helpers";
import appointmentService from "../../services/appointment";

const state = {
  byId: {},
  allIds: []
};

const getters = {
  // Return a single appointment with the given id.
  // From flat (normalized) to nested
  find: (state, _, __, rootGetters) => id => {
    // Swap ID referenes with the resolved author objects.
    return resolveRelations(state.byId[id], [], rootGetters);
  },
  // Return a list of appointments in the order of `allIds`.
  list: (state, getters) => {
    return state.allIds.map(id => getters.find(id));
  },
  listByDayId: (state, getters) => dayId => {
    return getters.list.filter(appObj => appObj.dayId === dayId);
  },
  countLabelByDayId: (state, getters) => (dayId, label) => {
    return getters.listByDayId(dayId).filter(appObj => appObj.label === label)
      .length;
  }
};

const actions = {
  async load({ commit }) {
    const appointments = await appointmentService.list();
    appointments.forEach(item => {
      // Normalize nested data and swap the author object
      // in the API response with an ID reference.
      commit("ADD", normalizeRelations(item, []));
      // Add or update the author.
      //commit('author/add', item.author, {
      //  root: true,
      //});
    });
  },

  //selectAppointment({ commit, state }, appointment) {
  async save({ commit, state }, item) {
    if (state.allIds.includes(item.id)) {
      commit("MODIFY", normalizeRelations(item, []));
    } else {
      commit("ADD", normalizeRelations(item, []));
    }
  },

  async remove({ commit, state }, item) {
    if (!state.allIds.includes(item.id)) return;

    commit("REMOVE", normalizeRelations(item, []));
  }
};

const mutations = {
  ADD: (state, item) => {
    Vue.set(state.byId, item.id, item);
    if (state.allIds.includes(item.id)) return;
    state.allIds.push(item.id);
  },
  MODIFY: (state, item) => {
    Vue.set(state.byId, item.id, item);
  },
  REMOVE: (state, item) => {
    if (!state.allIds.includes(item.id)) return;
    Vue.delete(state.byId, item.id);
    var idx = state.allIds.indexOf(item.id);
    state.allIds.splice(idx, 1);
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
};
