<template>
  <div class="container">
    <the-sidebar></the-sidebar>
    <div class="content">
      <the-header></the-header>
      <the-content></the-content>
      <the-employee v-if="showEmployeeForm"></the-employee>
    </div>
    <div class="progress" v-show="showProgress">
      <v-progress-circular
        :indeterminate="showProgress"
        :size="50"
        :width="8"
        color="teal"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue';
import TheSidebar from './components/layout/TheSidebar.vue';
import TheContent from './components/layout/TheContent.vue';
import TheEmployee from './views/TheEmployee.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

const store = useStore();

const showProgress = computed(() => store.getters.getShowProgress);
const showEmployeeForm = computed(() => store.getters.showEmployeeForm);
</script>

<style>
@import url(./style/main.css);
@import url(./style/components/button.css);
@import url(./style/components/function.css);
@import url(./style/components/table.css);
@import url(./style/components/scrollbar.css);
@import url(./style/components/dropdown.css);
</style>
