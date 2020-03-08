import moment from "moment";
import _ from "lodash";

export function getCalendarWeeksPerMonth(year, month) {
  var arr = Array.from(
    {
      length: getIsoWeeksInMonth(year, month)
    },
    (x, i) =>
      moment({ year: year, month: month })
        .startOf("isoWeek")
        .add(i, "weeks")
  );

  return arr.map(x => {
    return {
      weekId: x.weekId(),
      weekNum: x.isoWeek(),
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
      labelCount: 0,
      isInReqMonth: weekObj.monthId === x.monthId(),
      weekObj: weekObj
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
      moment(year + "-" + month + "-01", "YYYY-MM-DD")
        .startOf("isoWeek")
        .add(i, "days")
  );

  var reqMonthId = moment(year + "-" + month + "-01", "YYYY-MM-DD").monthId();
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
  return moment(year + "-" + month + "-" + day, "YYYY-MM-DD").format("MMMM");
}

export function getIsoWeeksInMonth(year, month) {
  var momentObj = moment(year + "-" + month + "-01", "YYYY-MM-DD");

  var mFirstIsoWeekDayOfMonth = momentObj
    .clone()
    .startOf("month")
    .startOf("isoWeek");
  var mLastIsoWeekDayOfMonth = momentObj
    .clone()
    .endOf("month")
    .endOf("isoWeek");

  var d = moment.duration(mLastIsoWeekDayOfMonth.diff(mFirstIsoWeekDayOfMonth));

  return d.weeks() + 1;
}

export function getIsoWeekDaysInMonth(year, month, day) {
  var momentObj = moment(year + "-" + month + "-" + day, "YYYY-MM-DD");

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

moment.prototype.monthId = function() {
  return Number(this.format("YYYYMM"));
};

moment.prototype.weekId = function() {
  return Number(this.format("YYYYWW"));
};

moment.prototype.dayId = function() {
  return Number(this.format("YYYYMMDD"));
};
