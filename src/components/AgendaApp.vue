<template>
  <div id="agenda">
    <h1>My Agenda App!</h1>
    <div class="main-content">
      <div style="display: table">
        <div style="display: table-row">
          <label for="YearSelectionid" style="display:table-cell;width:150px;">Select Year:</label>
          <input
            type="number"
            style="display:table-cell;width: 150px;height:20px;"
            placeholder="Type year..."
            v-model.number="currentYear"
          >
        </div>
        <div style="display: table-row">
          <label for="step" style="display: table-cell;width:150px;">Select Month:</label>
          <select
            id="step"
            style="display: table-cell;width:150px;height:20px;"
            type="number"
            v-model.number="currentMonth"
          >
            <option value="0">January</option>
            <option value="1">Februari</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>
      </div>
      <div class="row">
        <MonthView
          class="col-4 montview"
          :importantDateCount="importantDateCount"
          @clicked="onDayClick"
        />
        <Appointments class="col-8 appointments" @importantLabelChange="onImportantLabelChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import MonthView from "./MonthView";
import Appointments from "./Appointments";

import moment from "moment";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "agenda-app",
  data() {
    return {
      importantDateCount: { dayId: moment().dayId(), day: moment(), count: 0 }
    };
  },
  computed: {
    currentYear: {
      get() {
        return this.$store.state.currentYear;
      },
      set(value) {
        this.$store.commit("SELECT_YEAR", value);
      }
    },
    currentMonth: {
      get() {
        return this.$store.state.currentMonth;
      },
      set(value) {
        this.$store.dispatch("selectMonth", value);
      }
    },
    currentDate: {
      get() {
        return this.$store.state.currentDate;
      },
      set(value) {
        this.$store.dispatch("selectDay", { date: value });
      }
    },

    ...mapGetters(["currentMonthId", "currentWeekId", "currentDayId"])
  },
  mounted() {
    this.currentYear = moment().year();
    this.currentMonth = moment().month();
  },
  components: {
    MonthView,
    Appointments
  },
  methods: {
    ...mapActions(["initMonth"]),

    onDayClick(day) {
      this.currentAppointmentDate = day;
    },
    onImportantLabelChange({ dayId, day, count }) {
      //alert("dayId: " + dayId + " count: " + count + " typeof(count): " + typeof(count));
      this.importantDateCount = { dayId: dayId, day: day, count: count };
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
