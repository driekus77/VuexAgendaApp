<template>
  <div id="month-view">
    <h2>{{ monthName }}</h2>
    <table class="month">
      <thead>
        <tr>
          <th>week</th>
          <th>Mon.</th>
          <th>Tue.</th>
          <th>Wed.</th>
          <th>Thu.</th>
          <th>Fri.</th>
          <th>Sat.</th>
          <th>Sun.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in monthMap" :key="week[0].date.weekId()" class="week">
          <td class="weeknum">{{week[0].date.format("w")}}</td>
          <td v-for="weekday in week" :key="weekday.dayId" class="weekday">
            <button
              :disabled="!weekday.isInReqMonth"
              @click="onDayClick(weekday.date, $event)"
              class="day"
              :class="{ 'badge-top-right': weekday.labelCount }"
              :data-count="weekday.labelCount"
            >{{weekday.date.format("D")}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFullMonthName } from "../helpers";
import moment from "moment";
import _ from "lodash";

export default {
  name: "month-view",
  props: ["year", "month", "monthMap", "importantDateCount"],
  data() {
    return {
      currentDate: moment()
    };
  },
  methods: {
    checkValidMonthDay(m) {
      return m.month() + 1 === Number(this.month);
    },
    onDayClick(day, event) {
      this.currentDate = day;
      this.$emit("clicked", day);
    }
  },
  computed: {
    monthName() {
      return getFullMonthName(this.year, this.month);
    }
  },
  watch: {
    importantDateCount(newVal, oldVal) {
      var week = _.find(this.monthMap, function(x) {
        return x[0].date.weekId() === newVal.day.weekId();
      });

      var day = week.find(function(d) {
        return d.date.dayId() === newVal.day.dayId();
      });

      day.labelCount = newVal.count;
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
