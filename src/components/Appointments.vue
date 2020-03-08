<template>
  <div id="appointments">
    <h2>Appointments on: {{day.format("dddd DD MMMM YYYY")}}</h2>

    <table class="appointments" v-if="appointments && appointments.length">
      <thead>
        <tr>
          <th>Start</th>
          <th>Appointment</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.key">
          <td>
            <span style="text-align: right;">{{appointment.start.format('H:mm')}}</span>
          </td>
          <td>
            <textarea class="app-text" v-model="appointment.text" cols="65" rows="2"/>
          </td>
          <td>
            <select
              id="label"
              type="text"
              v-model="appointment.label"
              @change="onLabelChange({day, appointment}, $event)"
            >
              <option value="normal">Normal</option>
              <option value="important">Important</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "appointments",
  props: ["day", "appointments"],
  methods: {
    onLabelChange({ day, appointment }, event) {
      var count = this.appointments
        .get(this.day)
        .hours.filter(h => h.label === "important").length;

      this.$emit("importantLabelChange", {
        dayId: day.dayId(),
        day,
        count: count
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
</style>
