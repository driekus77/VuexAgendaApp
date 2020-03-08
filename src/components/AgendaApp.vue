<template>
  <div id="agenda">
    <h1>My Agenda App!</h1>
    <div class="main-content">
      <label for="YearSelectionid">Select Year:</label>
      <input type="number" placeholder="Type year..." v-model.number="currentYear">
      {{currentYear}} - {{typeof(currentYear)}}
      <br>
      <label for="step">Select Month:</label>
      <select id="step" type="number" v-model.number="currentMonth">
        <option value="1">January</option>
        <option value="2">Februari</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      {{currentMonth}} - {{typeof(currentMonth)}}
      <div class="row">
        <MonthView
          class="col-4 montview"
          :year="currentYear"
          :month="currentMonth"
          :weekArray="currentWeeksInMonth"
          :daysArray="currentDaysInMonth"
          :appointmentsArray="currentAppointmentsInMonth"
          :importantDateCount="importantDateCount"
          @clicked="onDayClick"
        />
        <Appointments
          class="col-8 appointments"
          :day="currentAppointmentsDate"
          :appointments="currentAppointments"
          @importantLabelChange="onImportantLabelChange"
        />
      </div>
    </div>
    {{currentMonthId}} - {{currentAppointmentsDayId}}
    {{JSON.stringify(currentMonthMap)}}
    {{JSON.stringify(currentAppointments)}}
  </div>
</template>

<script>
import MonthView from "./MonthView";
import Appointments from "./Appointments";
import { getCalendarWeeksPerMonth, getCalendarDaysPerWeek } from "../helpers";
import moment from "moment";
import _ from "lodash";

export default {
  name: "agenda-app",
  data() {
    return {
      currentYear: moment().year(),
      currentMonth: moment().month() + 1,
      currentAppointmentsDate: moment(),
      arrMonths: [],
      arrWeeks: [],
      arrDays: [],
      arrAppointments: [],
      importantDateCount: { dayId: moment().dayId(), day: moment(), count: 0 }
    };
  },
  computed: {
    currentMonthId: {
      get() {
        return moment({
          year: this.currentYear,
          month: this.currentMonth - 1
        }).monthId();
      }
    },
    currentWeeksInMonth: {
      get() {
        return this.getWeeks;
      }
    },
    currentAppointmentsDayId: {
      get() {
        return this.currentAppointmentsDate.dayId();
      }
    },
    currentAppointments: {
      get() {
        if (this.arrMonths.length) {
          return _.find(this.arrMonths, function(x) {
            return x.dayId === this.currentAppointmentsDayId;
          });
        }
      }
    }
  },
  mounted() {
    this.addMonth(2020, 3);
  },
  components: {
    MonthView,
    Appointments
  },
  methods: {
    addMonth(year, month) {
      var weeks = getCalendarWeeksPerMonth(year, month);

      var m = {
        monthId: weeks[0].monthId,
        weeks: weeks.map(function(x) {
          return x.weekId;
        })
      };
      this.arrMonths.push(m);

      weeks.forEach(function(x) {
        this.arrWeeks.push(x);

        var daysInWeek = getCalendarDaysPerWeek(x);

        daysInWeek.forEach(function(x) {
          this.arrDays.push(x);

          var appointments = this.initAppointments(x.monthId, x.dayId, 7, 19);
          this.arrAppointments.push(...appointments);
        });
      });
    },

    getMonth(monthId) {
      return _.find(this.arrMonths, { monthId: monthId });
    },
    getWeek(weekId) {
      return _.find(this.arrWeeks, { weekId: weekId });
    },
    getDay(dayId) {
      return _.find(this.arrDays, { dayId: dayId });
    },
    getDaysInMonth(monthId) {
      return _.filter(this.arrDays, { monthId: monthId });
    },
    getAppointment(appId) {
      return _.find(this.arrAppointments, { appId: appId });
    },
    getAppointmentsInMonth(monthId) {
      return _.filter(this.arrDays, { monthId: monthId });
    },

    onDayClick(day) {
      this.currentAppointmentDate = day;
    },
    onImportantLabelChange({ dayId, day, count }) {
      //alert("dayId: " + dayId + " count: " + count + " typeof(count): " + typeof(count));
      this.importantDateCount = { dayId: dayId, day: day, count: count };
    },
    initAppointments(monthId, dayId, startHour, endHour) {
      return Array.from({ length: endHour - startHour }, (_, i) => i).reduce(
        (r, hour) => {
          r.push({
            appId: dayId * 100000000 + startHour + hour,
            start: moment({ hour: startHour + hour, minute: 0 }),
            text: "",
            label: "normal",
            dayId: dayId,
            monthId: monthId
          });

          return r;
        },
        []
      );
    }
  }
};
</script>


<style>
.monthview {
  margin: 15px;
}
.appointments {
  margin: 15px;
}
</style>
