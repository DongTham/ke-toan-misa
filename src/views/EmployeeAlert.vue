<template>
  <v-alert class="alert-employee" closable :title="Title" :text="Text" :type="Type"></v-alert>
</template>

<script>
export default {
  props: {
    Type: {
      type: String,
      default: 'success',
    },
    Title: {
      type: String,
      default: '',
    },
    Text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.alert-employee {
  display: flex;
  position: fixed;
  z-index: 999;
  right: 0;
  top: 56px;
}
</style>
