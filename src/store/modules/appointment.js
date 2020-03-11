import Vue from "vue";
import moment from "moment";

import { initAppointments } from "../../helpers";

import { normalizeRelations, resolveRelations } from "../helpers";
import appointmentService from "../../services/appointment";

const state = {
  byId: {},
  allIds: [],

  cacheById: {},
  cacheAllIds: []
};

const getters = {
  includesId: (state, getters) => id => {
    return state.allIds.includes(id);
  },
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
  },

  cacheIncludesId: (state, getters) => id => {
    return state.cacheAllIds.includes(id);
  },
  cacheFind: (state, _, __, rootGetters) => id => {
    // Swap ID referenes with the resolved author objects.
    return resolveRelations(state.cacheById[id], [], rootGetters);
  },
  // Return a list of appointments in the order of `allIds`.
  cacheList: (state, getters) => {
    return state.cacheAllIds.map(id => getters.cacheFind(id));
  },
  cacheListByDayId: (state, getters) => dayId => {
    return getters.cacheList.filter(appObj => appObj.dayId === dayId);
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
  },

  CACHE_ADD: (state, item) => {
    Vue.set(state.cacheById, item.id, item);
    if (state.cacheAllIds.includes(item.id)) return;
    state.cacheAllIds.push(item.id);
  },
  CACHE_MODIFY: (state, item) => {
    Vue.set(state.cacheById, item.id, item);
  }
};

const actions = {
  async load({ commit, getters, rootGetters, dispatch }) {
    const serviceAppointments = await appointmentService.list();

    serviceAppointments.forEach(function(servApp) {
      commit("ADD", normalizeRelations(servApp, []));
    });

    dispatch("syncCache", moment());
  },

  //selectAppointment({ commit, state }, appointment) {
  async save({ commit, state }, item) {
    if (state.allIds.includes(item.id)) {
      commit("MODIFY", normalizeRelations(item, []));
      commit("CACHE_MODIFY", normalizeRelations(item, []));
    } else {
      commit("ADD", normalizeRelations(item, []));
      commit("CACHE_ADD", normalizeRelations(item, []));
    }
  },

  async remove({ commit, state }, item) {
    if (!state.allIds.includes(item.id)) return;

    commit("REMOVE", normalizeRelations(item, []));
    commit("CACHE_REMOVE", normalizeRelations(item, []));
  },

  async syncCache({ commit, state, getters }, mObj) {
    if (
      !getters.cacheIncludesId(
        mObj
          .clone()
          .hour(12)
          .minute(0)
          .hourId()
      )
    ) {
      var virtualAppointments = initAppointments(
        mObj.year(),
        mObj.month(),
        mObj,
        7,
        19
      );

      virtualAppointments.forEach(function(virtAppointment) {
        commit("CACHE_ADD", normalizeRelations(virtAppointment, []));
      });
    }

    var storedAppointments = getters.listByDayId(mObj.dayId());

    if (storedAppointments.length) {
      storedAppointments.forEach(function(storedAppointment) {
        commit("CACHE_MODIFY", normalizeRelations(storedAppointment, []));
      });
    }
  }
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
