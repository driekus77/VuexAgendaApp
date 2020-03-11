<template>
  <div id="agenda">
    <h1>My Agenda App!</h1>
    <h3>Selected: {{selectedMoment.format()}}</h3>
    <div class="main-content">
      <div style="display: table">
        <div style="display: table-row">
          <label for="YearSelectionid" style="display:table-cell;width:150px;">Select Year:</label>
          <input
            type="number"
            style="display:table-cell;width: 150px;height:20px;"
            placeholder="Type year..."
            v-model.number="selectedYear"
          >
        </div>
        <div style="display: table-row">
          <label for="step" style="display: table-cell;width:150px;">Select Month:</label>
          <select
            id="step"
            style="display: table-cell;width:150px;height:20px;"
            type="number"
            v-model.number="selectedMonth"
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
        <MonthView class="col-4 montview" :importantDateCount="importantDateCount"/>

        <Appointments
          class="col-8 appointments"
          v-model="selectedMoment"
          @importantLabelChange="onImportantLabelChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MonthView from "./MonthView";
import Appointments from "./Appointments";

//import { mapGetters } from "vuex";
//import { } from "vuex-map-fields";

import moment from "moment";

export default {
  name: "agenda-app",
  data() {
    return {
      importantDateCount: { dayId: moment().dayId(), day: moment(), count: 0 }
    };
  },
  computed: {
    selectedYear: {
      get() {
        return this.$store.getters["agenda/selectedYear"];
      },
      set(value) {
        this.$store.dispatch("agenda/selectYear", value);
      }
    },
    selectedMonth: {
      get() {
        return this.$store.getters["agenda/selectedMonth"];
      },
      set(value) {
        this.$store.dispatch("agenda/selectMonth", value);
      }
    },
    selectedMoment: {
      get() {
        return this.$store.getters["agenda/selectedMoment"];
      },
      set(value) {
        this.$store.dispatch("agenda/selectMoment", value);
      }
    }
  },
  components: {
    MonthView,
    Appointments
  },
  methods: {
    onImportantLabelChange({ dayId, day, count }) {
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
