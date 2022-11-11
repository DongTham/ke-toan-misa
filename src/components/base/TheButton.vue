<template>
  <button>
    <img v-bind:src="imageLink" alt="" v-bind:class="imageClass" v-show="imageLink" />
    <span v-bind:class="buttonTitleClass">{{ titleHeader }}</span>
    <div v-bind:class="buttonIconClass"></div>
    {{ titleExtra }}
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
  },

  emits: [],
  setup() {},
  mounted() {},
};
</script>

<style scoped>
@import url(../../style/components/button.css);
</style>
