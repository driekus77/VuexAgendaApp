import moment from "moment";

const fakeResponse = [
  {
    id: 202003141100,
    start: moment({ year: 2020, month: 2, day: 14, hour: 11, minute: 0 }),
    monthId: 202003,
    weekId: 202011,
    dayId: 20200314,
    hourInDayId: 1100,
    hour: "11:00",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    label: "normal"
  },
  {
    id: 202003210800,
    start: moment({ year: 2020, month: 2, day: 21, hour: 8, minute: 0 }),
    monthId: 202003,
    weekId: 202012,
    dayId: 20200321,
    hourInDayId: 800,
    hour: " 8:00",
    text: "Stet clita kasd gubergren, no sea takimata sanctus est.",
    label: "important"
  },
  {
    id: 202003220800,
    start: moment({ year: 2020, month: 2, day: 22, hour: 8, minute: 0 }),
    monthId: 202003,
    weekId: 202012,
    dayId: 20200322,
    hourInDayId: 800,
    hour: " 8:00",
    text: "Sanctus est Lorem ipsum dolor sit amet.",
    label: "important"
  },
  {
    id: 202003230800,
    start: moment({ year: 2020, month: 2, day: 23, hour: 8, minute: 0 }),
    monthId: 202003,
    weekId: 202013,
    dayId: 20200323,
    hourInDayId: 800,
    hour: " 8:00",
    text: "Gubergren, no sea takimata sanctus est.",
    label: "important"
  }
];

export default {
  async list() {
    return fakeResponse;
  }
};
