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
        <tr v-for="week in currentWeeks" :key="week.weekId" class="week">
          <td class="weeknum">{{week.number}}</td>
          <td v-for="d in getDaysInWeek(week)" :key="d.dayId" class="weekday">
            <button
              :disabled="!checkValidMonthDay(d)"
              @click="onDayClick(d, $event)"
              class="day"
              :class="{ 'badge-top-right': getCountImportantLabels(d), disabled: !checkValidMonthDay(d), 
                      'today-day': checkToday(d),
                        'selected-day': checkSelectedDay(d)}"
              :data-count="getCountImportantLabels(d)"
            >{{d.number}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import {
  getFullMonthName,
  getCalendarWeeksPerMonth,
  getCalendarDaysPerWeek
} from "../helpers";

export default {
  name: "month-view",
  props: ["year", "month", "day", "importantDateCount"],
  methods: {
    checkValidMonthDay(d) {
      return d.date.month() === this.currentMonth;
    },
    checkSelectedDay(d) {
      return d.dayId === this.currentDay.dayId();
    },
    checkToday(d) {
      return d.dayId === moment().dayId();
    },
    onDayClick(d, event) {
      // Inform parent AgendaApp Component other day clicked!
      this.$emit("clicked", d);
    },
    getDaysInWeek(weekObj) {
      return getCalendarDaysPerWeek(weekObj);
    },
    getCountImportantLabels(d) {
      return this.$store.getters["appointment/countLabelByDayId"](
        d.dayId,
        "important"
      );
    }
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

    monthName() {
      return getFullMonthName(this.currentYear, this.currentMonth);
    },
    currentWeeks: {
      get() {
        return getCalendarWeeksPerMonth(this.currentYear, this.currentMonth);
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

button.today-day {
  background-color: rgba(236, 142, 0, 0.377);
}

button.selected-day {
  background-color: rgba(0, 243, 97, 0.377);
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
