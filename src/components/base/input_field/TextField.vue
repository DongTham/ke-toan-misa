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
      :class="{ Class, 'field-error': IsShowTooltipMsg }"
      :type="Type"
      :placeholder="PlaceHolder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :max="dateMax"
      :ref="focusInput"
      @focus="updateFocusInput(Label)"
    />
    <v-tooltip
      :disabled="!IsShowTooltipMsg"
      :text="TooltipMessage"
      activator="parent"
      location="bottom"
    ></v-tooltip>
  </div>
</template>

<script>
// import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';

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
    IsShowTooltipMsg: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const store = useStore();

    /**
     * Cập nhật ô input đang focus
     * @param {String} data Giá trị ô đang focus
     * Author: NQDONG (10/11/2022)
     */
    const updateFocusInput = (data) => {
      store.commit('updatePresentFocusInput', data);
    };

    return { updateFocusInput };
  },
  mounted() {},
  methods: {
    /**
     * Focus vào input
     * Author: NQDONG (10/11/2022)
     */
    focusEmployeeCode() {
      this.$refs.input?.focus();
    },
  },
};
</script>

<style scoped>
@import url(../../../style/components/textfield.css);
</style>
