import moment from "moment";
import _ from "lodash";

export function getCalendarWeeksPerMonth(year, month) {
  var arr = Array.from(
    {
      length: getWeeksInMonth(year, month)
    },
    (x, i) =>
      moment({ year: year, month: month })
        .startOf("month")
        .startOf("week")
        .add(i, "weeks")
  );

  return arr.map(x => {
    return {
      weekId: x.weekId(),
      number: x.isoWeek(),
      year: year,
      month: month,
      start: x.startOf("isoWeek"),
      end: x.endOf("isoWeek"),
      monthId: x.monthId()
    };
  });
}

export function getCalendarDaysPerWeek(weekObj) {
  var arr = Array.from(
    {
      length: 7
    },
    (x, i) => weekObj.start.clone().add(i, "days")
  );

  return arr.map(x => {
    return {
      dayId: x.dayId(),
      date: x,
      number: Number(x.format("D")),
      dayOfWeek: Number(x.day()),
      year: weekObj.year,
      month: weekObj.month,
      labelCount: 0,
      weekObj: weekObj,
      monthId: x.monthId()
    };
  });
}

export function getCalendarMonth(year, month, day) {
  var arr = getItemsPerMonth(year, month, day);

  var weeks = _.groupBy(arr, function(m) {
    return m.date.isoWeek();
  });

  return Object.keys(weeks).map(function(w) {
    return { weeknum: w, weekId: weeks[w][0].date.weekId(), data: weeks[w] };
  });
}

export function getItemsPerMonth(year, month, day) {
  var n = getIsoWeekDaysInMonth(year, month, day);

  var arr = Array.from(
    {
      length: n
    },
    (x, i) =>
      moment({ year: year, month: month, day: day })
        .startOf("isoWeek")
        .add(i, "days")
  );

  var reqMonthId = moment({ year: year, month: month, day: day }).monthId();
  return arr.map(x => {
    return {
      dayId: x.dayId(),
      date: x,
      labelCount: 0,
      isInReqMonth: reqMonthId === x.monthId()
    };
  });
}

export function getFullMonthName(year, month, day) {
  return moment({ year: year, month: month, day: day }).format("MMMM");
}

export function getWeeksInMonth(year, month) {
  var momentObj = moment({ year: year, month: month });

  var mFirstWeekDayOfMonth = momentObj
    .clone()
    .startOf("month")
    .startOf("week");
  var mLastWeekDayOfMonth = momentObj
    .clone()
    .endOf("month")
    .endOf("week");

  return mLastWeekDayOfMonth.diff(mFirstWeekDayOfMonth, "weeks") + 1;
}

export function getIsoWeekDaysInMonth(year, month, day) {
  var momentObj = moment({ year: year, month: month, day: day });

  var mFirstIsoWeekDayOfMonth = momentObj
    .clone()
    .startOf("month")
    .startOf("isoWeek");
  var mLastIsoWeekDayOfMonth = momentObj
    .clone()
    .endOf("month")
    .endOf("isoWeek");

  var d = moment.duration(mLastIsoWeekDayOfMonth.diff(mFirstIsoWeekDayOfMonth));

  return d.asDays() + 1;
}

export function initAppointments(year, month, day, startHour, endHour) {
  return Array.from({ length: endHour - startHour }, (_, i) => i).reduce(
    (r, hour) => {
      r.push({
        id: moment({
          year: year,
          month: month,
          day: day.date(),
          hour: startHour + hour,
          minute: 0
        }).hourId(),
        start: moment({
          year: year,
          month: month,
          day: day.date(),
          hour: startHour + hour,
          minute: 0
        }),
        hourInDayId: moment({
          hour: startHour + hour,
          minute: 0
        }).hourInDayId(),
        text: "",
        label: "normal",
        dayId: day.dayId(),
        monthId: day.monthId()
      });

      return r;
    },
    []
  );
}

moment.prototype.monthId = function() {
  return Number(this.format("YYYYMM"));
};

moment.prototype.weekId = function() {
  return Number(this.format("YYYYWW"));
};

moment.prototype.dayId = function() {
  return Number(this.format("YYYYMMDD"));
};

moment.prototype.hourId = function() {
  return Number(this.format("YYYYMMDDHHmm"));
};
moment.prototype.hourInDayId = function() {
  return Number(this.format("HHmm"));
};
