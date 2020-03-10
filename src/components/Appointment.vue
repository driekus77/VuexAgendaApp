<template>
  <div style="display: table-row">
    <div style="display: table-cell">
      <span style="text-align: right;">{{appointment.start.format('H:mm')}}</span>
    </div>
    <div style="display: table-cell">
      {{appointment.text}}
      <textarea
        class="app-text"
        :value="appointment.text"
        @change="onTextChange(appointment, $event)"
        cols="65"
        rows="2"
      />
    </div>
    <div style="display: table-cell">
      <select
        id="label"
        type="text"
        :value="appointment.label"
        @change="onLabelChange(appointment, $event)"
      >
        <option value="normal">Normal</option>
        <option value="important">Important</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "appointment",
  props: ["appointment"],
  methods: {
    onTextChange(appointment, event) {
      this.$set(appointment, "text", event.target.value);
      this.$store.dispatch("appointment/save", appointment);
    },
    onLabelChange(appointment, event) {
      this.$set(appointment, "label", event.target.value);
      this.$store.dispatch("appointment/save", appointment);
    }
  }
};
</script>


