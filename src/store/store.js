/*
import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import _ from "lodash";

import {
  getCalendarWeeksPerMonth,
  getCalendarDaysPerWeek,
  initAppointments
} from "../helpers";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    currentYear: moment().year(),
    currentMonth: moment().month(),
    currentDay: moment(),

    currentMonthObj: {},
    currentWeekObjs: [],
    currentDayObj: {},

    currentAppointments: [],
    currentAppointment: {},

    arrMonths: [],
    arrWeeks: [],
    arrDays: [],

    arrAppointments: []
  },
  getters: {
    currentMonthId: state => {
      return state.currentDay.monthId();
    },
    currentWeekId: state => {
      return state.currentDay.weekId();
    },
    currentDayId: state => {
      return state.currentDay.dayId();
    },
    currentAppointmentId: state => {
      return state.currentAppointment.appId;
    },

    getMonthById: state => monthId => {
      return state.arrMonths.find(month => month.monthId === monthId);
    },
    getMonthByNums: state => (year, month) => {
      return state.arrMonths.find(
        monthObj => monthObj.year === year && monthObj.month === month
      );
    },

    currentWeeksInMonth: (state, getters) => {
      var monthObj = getters.getMonthByNums(
        state.currentYear,
        state.currentMonth
      );
      if (monthObj) {
        return monthObj.weeks.map(weekId => getters.getWeekById(weekId));
      } else {
        return undefined;
      }
    },

    getWeekById: state => weekId => {
      return state.arrWeeks.find(week => week.weekId === weekId);
    },

    getDaysInWeeksByObj: state => weekObj => {
      return state.arrDays.filter(dayObj =>
        weekObj.days.some(d => d === dayObj.dayId)
      );
    },
    getDaysInWeekById: (state, getters) => weekId => {
      var weekObj = getters.getWeekById(weekId);
      return getters.getDaysInWeeksByObj(weekObj);
    },

    getDayById: state => dayId => {
      return state.arrDays.find(day => day.dayId === dayId);
    },
    getAppointmentById: state => appId => {
      return state.arrAppointments.find(
        appointment => appointment.appId === appId
      );
    },
    getAppointmentsByDay: state => day => {
      return state.arrAppointments.filter(app => app.dayId === day.dayId());
    }
  },
  mutations: {
    SELECT_YEAR(state, year) {
      state.currentYear = year;
    },
    SELECT_MONTH(state, month) {
      state.currentMonth = month;
    },
    SELECT_DAY(state, day) {
      state.currentDay = day;
    },
    SELECT_APPOINTMENT(state, appointment) {
      state.currentAppointment = appointment;
    },

    ADD_APPOINTMENT(state, appObj) {
      if (!state.arrAppointments.some(a => a.appId === appObj.appId)) {
        state.arrAppointments.push(appObj);
      }
    },
    ADD_DAY(state, dayObj) {
      if (!state.arrDays.some(d => d.dayId === dayObj.dayId)) {
        state.arrDays.push(dayObj);
      }
    },
    ADD_WEEK(state, weekObj) {
      if (!state.arrWeeks.some(w => w.weekId === weekObj.weekId)) {
        state.arrWeeks.push(weekObj);
      }
    },
    ADD_MONTH(state, monthObj) {
      if (!state.arrMonths.some(m => m.monthId === monthObj.monthId)) {
        state.arrMonths.push(monthObj);
      }
    },

    UPDATE_DAY(state, dayObj) {
      var targetObj = _.find(state.arrDays, { dayId: dayObj.dayId });
      Object.assign(targetObj, dayObj);
    },
    UPDATE_APPOINTMENT(state, appObj) {
      var targetObj = _.find(state.arrAppointments, { appId: appObj.appId });
      Object.assign(targetObj, appObj);
    }
  },
  actions: {
    selectYear({ commit, state }, year) {},

    selectMonth({ commit, state }, month) {
      if (
        state.arrMonths.length === 0 ||
        !state.arrMonths.some(function(x) {
          return x.year === state.currentYear && x.month === month;
        })
      ) {
        var weeks = getCalendarWeeksPerMonth(state.currentYear, month);

        var newMonth = {
          monthId: weeks[0].monthId,
          month: month,
          year: state.currentYear,
          weeks: weeks.map(function(x) {
            return x.weekId;
          })
        };

        commit("ADD_MONTH", newMonth);

        weeks.forEach(function(wObj) {
          var daysInWeek = getCalendarDaysPerWeek(wObj);

          var newWeek = _.assign({ days: daysInWeek.map(d => d.dayId) }, wObj);

          commit("ADD_WEEK", newWeek);

          daysInWeek.forEach(function(dObj) {
            var appointmentsInDay = initAppointments(
              dObj.monthId,
              dObj.dayId,
              7,
              19
            );

            var newDay = _.assign(
              { appointments: appointmentsInDay.map(a => a.appId) },
              dObj
            );

            commit("ADD_DAY", newDay);

            appointmentsInDay.forEach(a => {
              commit("ADD_APPOINTMENT", a);
            });
          });
        });
      }

      commit("SELECT_MONTH", month);
    },
    selectAppointment({ commit, state }, appointment) {
      commit("SELECT_APPOINTMENT", appointment);
    },

    updateDay({ commit, state }, dayObj) {
      commit("UPDATE_DAY", dayObj);
    },
    updateAppointment({ commit, state }, appointmentObj) {
      commit("UPDATE_APPOINTMENT", appointmentObj);
    }
  }
});
*/
