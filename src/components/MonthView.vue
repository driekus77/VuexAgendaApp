<template>
  <div id="month-view">
    <h2>{{ monthName }}</h2>
    <table class="month">
      <thead>
        <tr>
          <th>Week</th>
          <th>Sun.</th>
          <th>Mon.</th>
          <th>Tue.</th>
          <th>Wed.</th>
          <th>Thu.</th>
          <th>Fri.</th>
          <th>Sat.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in currentWeeksInMonth" :key="week.weekId" class="week">
          <td class="weeknum">{{week.number}}</td>
          <td v-for="day in getDaysInWeekById(week.weekId)" :key="day.dayId" class="weekday">
            <button
              :disabled="!checkValidMonthDay(day)"
              @click="onDayClick(day.date, $event)"
              class="day"
              :class="{ 'badge-top-right': day.labelCount }"
              :data-count="day.labelCount"
            >{{day.number}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getFullMonthName } from "../helpers";

export default {
  name: "month-view",
  props: ["importantDateCount"],
  methods: {
    checkValidMonthDay(d) {
      return d.date.month() === this.currentMonth;
    },
    onDayClick(day, event) {
      this.currentDay = day;
      this.$emit("clicked", day);
    }
  },
  computed: {
    ...mapState(["currentYear", "currentMonth"]),
    ...mapGetters(["getDaysInWeekById"]),

    monthName() {
      return getFullMonthName(this.currentYear, this.currentMonth);
    },
    currentDay: {
      get() {
        return this.$store.state.currentDay;
      },
      set(value) {
        this.$store.commit("SELECT_DAY", value);
      }
    },
    currentWeeksInMonth: {
      get() {
        return this.$store.getters.currentWeeksInMonth;
      }
    }
  }
};
</script>


<style>
.month {
  border-width: 1px;
  border-style: solid;
  table-layout: fixed;
  border-radius: 15px;
  box-shadow: 5px 5px 5px var(--bloemertshadow-color);
}

.month > thead > tr > th:not(first),
.month > thead > tr > td:not(first) {
  text-align: center;
  width: 50px;
}

.weeknum {
  text-align: right;
}

.weekday {
  width: 50px;
}
button.day {
  background-color: var(--bloemertlight-color);
  padding: 15px;
  width: 100%;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
}

button.day:hover {
  cursor: pointer;
}

button.day:active {
  cursor: grabbing;
}

button.badge-top-right:before {
  content: attr(data-count);
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  display: block;
  border-radius: 50%;
  background: rgb(255, 50, 50);
  border: 1px solid #FFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  color: #FFF;
  position: absolute;
  top: -7px;
  left: -7px;
  left: auto;
  right: -7px;
}
</style>
