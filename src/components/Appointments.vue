<template>
  <div id="appointments">
    <h2>Appointments on: {{currentDay.format("dddd DD MMMM YYYY")}}</h2>
    <table class="appointments" v-if="currentAppointments && currentAppointments.length">
      <thead>
        <tr>
          <th>Start</th>
          <th>Appointment</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="appointment in currentAppointments"
          :key="appointment.appId"
          @click="selectAppointment(appointment)"
        >
          <td>
            <span style="text-align: right;">{{appointment.start.format('H:mm')}}</span>
          </td>
          <td>
            <textarea
              class="app-text"
              :value="appointment.text"
              @change="onTextChange(appointment, $event)"
              cols="65"
              rows="2"
            />
          </td>
          <td>
            <select
              id="label"
              type="text"
              :value="appointment.label"
              @change="onLabelChange(appointment, $event)"
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
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "appointments",
  computed: {
    ...mapState(["currentYear", "currentMonth", "currentDay"]),
    ...mapGetters(["getDaysInWeekById", "getAppointmentsByDay"]),

    currentAppointments: {
      get() {
        return this.getAppointmentsByDay(this.currentDay);
      }
    },

    currentDayObj: {
      get() {
        return this.$store.getters.getDayById(this.currentDay.dayId());
      },
      set(value) {
        this.updateDay(value);
      }
    },
    currentAppointment: {
      get() {
        return this.$store.state.currentAppointment;
      },
      set(value) {
        this.selectAppointment(value);
      }
    }
  },
  methods: {
    ...mapActions(["selectAppointment", "updateDay", "updateAppointment"]),

    onTextChange(appointment, event) {
      this.updateAppointment({
        appId: appointment.appId,
        text: event.target.value
      });
    },
    onLabelChange(appointment, event) {
      this.updateAppointment({
        appId: appointment.appId,
        label: event.target.value
      });

      this.updateDay({
        dayId: this.currentDay.dayId(),
        labelCount: this.currentAppointments.filter(
          h => h.label === "important"
        ).length
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
