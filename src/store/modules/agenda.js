import moment from "moment";

const state = {
  selectedMoment: moment().valueOf()
};

const getters = {
  selectedYear: (state, getters) => {
    return moment(state.selectedMoment).year();
  },
  selectedMonth: (state, getters) => {
    return moment(state.selectedMoment).month();
  },
  selectedDay: (state, getters) => {
    return moment(state.selectedMoment).date();
  },

  selectedMoment: (state, getters) => {
    return moment(state.selectedMoment);
  }
};

const mutations = {
  SELECT_YEAR(state, year) {
    var mObj = moment(state.selectedMoment);
    mObj.year(year);
    mObj.month(0);
    mObj.date(1);
    state.selectedMoment = mObj.valueOf();
  },
  SELECT_MONTH(state, month) {
    var mObj = moment(state.selectedMoment);
    mObj.month(month);
    mObj.date(1);
    state.selectedMoment = mObj.valueOf();
  },
  SELECT_DAY(state, day) {
    var mObj = moment(state.selectedMoment);
    mObj.date(day);
    state.selectedMoment = mObj.valueOf();
  },
  SELECT_MOMENT(state, mObj) {
    state.selectedMoment = mObj.valueOf();
  }
};

const actions = {
  async selectYear({ commit, state }, year) {
    commit("SELECT_YEAR", year);
  },

  async selectMonth({ commit, state }, month) {
    commit("SELECT_MONTH", month);
  },

  async selectDay({ commit, state }, day) {
    commit("SELECT_DAY", day);
  },

  async selectMoment({ commit, dispatch }, mObj) {
    commit("SELECT_MOMENT", mObj);

    dispatch("appointment/syncCache", mObj, { root: true });
  }
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
