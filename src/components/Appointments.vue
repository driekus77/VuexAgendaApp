<template>
  <div id="appointments">
    <h3>Appointments on: {{currentDay.format("dddd DD MMMM YYYY")}}</h3>
    <div class="appointments" style="display: table;table-layout:fixed;">
      <div style="display: table-head-group">
        <div style="display: table-row">
          <div style="display: table-cell;width: 50px;">Start</div>
          <div style="display: table-cell;width: 500px;">Appointment</div>
          <div style="display: table-cell;width: 100px;">Label</div>
        </div>
      </div>
      <div style="table-column-group">
        <div v-for="(appointment) in currentAppointments" :key="appointment.appId">
          <Appointment :name="appointment.appId" :appointment="appointment"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { initAppointments } from "../helpers";
import Appointment from "./Appointment";
import _ from "lodash";

export default {
  name: "appointments",
  components: { Appointment },
  props: {
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    day: {
      type: moment,
      required: true
    }
  },
  data() {
    return {
      cacheById: {},
      cacheAllIds: [],
      dayIds: []
    };
  },
  computed: {
    currentYear: {
      get() {
        return this.year;
      }
    },
    currentMonth: {
      get() {
        return this.month;
      }
    },
    currentDay: {
      get() {
        return this.day;
      }
    },

    currentAppointments: {
      get() {
        return this.dayIds.map(appId => this.cacheById[appId]);
      }
    }
  },
  created() {
    this.$store.dispatch("appointment/load");
  },
  methods: {
    switchDay(day) {
      var self = this;

      // First create a cache or add appointmentlist per day to cache.
      if (!this.cacheAllIds.includes(day.hourId())) {
        var arrDayApps = initAppointments(
          this.year,
          this.month,
          this.day,
          7,
          19
        );

        var arrIds = arrDayApps.map(item => item.appId);

        Object.assign(self.cacheById, _.keyBy(arrDayApps, "appId"));

        self.cacheAllIds.push(...arrIds);

        self.dayIds = arrIds;
      }

      // "Enrich" the cache with data from state store.
      var storeData = this.$store.getters["appointment/listByDayId"](
        day.dayId()
      );

      storeData.forEach(function(item) {
        console.log("Applying appointments for " + this.day.format());
        Vue.set(self.cacheById, item.appId, item);
      });
    }
  }
};
</script>


<style>
.app-text {
  background-color: var(--bloemertlight-color);
  height: 25px;
  border: none;
  border-style: none;
  width: 100%;
  font-weight: bolder;
  font-size: 10pt;
}

.app-row {
  height: 40px;
}
</style>
