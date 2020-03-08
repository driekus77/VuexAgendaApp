import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentYear: moment().year(),
    currentMonth: moment().month() + 1,
    currentAppointmentsDate: moment(),

    arrMonths: [],
    arrWeeks: [],
    arrDays: [],

    arrAppointments: []
  }
});
