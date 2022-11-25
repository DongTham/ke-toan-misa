<template>
  <button>
    <img v-bind:src="imageLink" alt="" v-bind:class="imageClass" v-show="imageLink" />
    <span v-bind:class="buttonTitleClass">{{ titleHeader }}</span>
    <div v-bind:class="buttonIconClass"></div>
    <span v-if="!isCollapse">{{ titleExtra }}</span>
    <v-tooltip
      :text="Tooltip"
      :disabled="DisableTooltip"
      activator="parent"
      location="bottom"
    ></v-tooltip>
  </button>
</template>

<script>
// import { ref } from '@vue/reactivity';

export default {
  name: 'TheContent',
  components: {},
  props: {
    buttonIconClass: {
      type: String,
      default: '',
    },
    buttonTitleClass: {
      type: String,
      default: '',
    },
    titleHeader: {
      type: String,
      default: '',
    },
    titleExtra: {
      type: String,
      default: '',
    },
    imageLink: {
      type: String,
      default: '',
    },
    imageClass: {
      type: String,
      default: '',
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    Tooltip: {
      type: String,
    },
    DisableTooltip: {
      type: Boolean,
      default: true,
    },
  },

  emits: [],
  setup() {},
  mounted() {},
};
</script>

<style scoped>
@import url(../../style/components/button.css);
</style>
