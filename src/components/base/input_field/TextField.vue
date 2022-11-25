<template>
  <div class="field">
    <label for="">
      {{ Label }}
      <span v-show="IsValidate" style="color: red">
        &nbsp;*
        <v-tooltip text="Bắt buộc" activator="parent" location="right"></v-tooltip>
      </span>
      <v-tooltip
        :disabled="TooltipLabel == ''"
        :text="TooltipLabel"
        activator="parent"
        location="bottom"
      ></v-tooltip>
    </label>
    <input
      class="field-normal"
      :class="Class"
      :type="Type"
      :placeholder="PlaceHolder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :ref="focusInput"
      :max="dateMax"
    />
    <v-tooltip
      :disabled="TooltipMessage == ''"
      :text="TooltipMessage"
      activator="parent"
      location="bottom"
    ></v-tooltip>
  </div>
</template>

<script>
// import { ref } from '@vue/reactivity';

export default {
  name: 'TextField',
  components: {},
  props: {
    Label: {
      type: String,
      default: '',
    },
    Type: {
      type: String,
      default: 'text',
    },
    Class: {
      type: String,
      default: '',
    },
    IsValidate: {
      type: Boolean,
      default: false,
    },
    PlaceHolder: {
      type: String,
      default: '',
    },
    modelValue: {},
    focusInput: { type: String },
    maxTimeInput: {},
    dateMax: {},
    TooltipLabel: {
      type: String,
      default: '',
    },
    TooltipMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup() {},
  mounted() {
    this.$refs.input?.focus();
  },
};
</script>

<style scoped>
@import url(../../../style/components/textfield.css);
</style>
