<template>
  <div class="sidebar" v-bind:class="isCollapse ? 'sidebar-collapse' : ''">
    <div class="sidebar-logo">
      <the-button
        class="btn-icon header__icon btn-toggle"
        @click="handleCollapseSidebar"
        v-show="isCollapse"
      ></the-button>
      <the-button
        v-show="!isCollapse"
        class="btn-icon header__icon sidebar__logo-option"
      ></the-button>
      <a v-show="!isCollapse" href="#"
        ><img
          src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
          alt=""
          class="sidebar__logo-img"
      /></a>
    </div>
    <div class="sidebar-menu">
      <div class="sidebar__menu-item" v-for="(item, index) in sidebarMenu" :key="index">
        <the-button
          class="menu-button"
          v-bind:class="item.Class"
          :buttonIconClass="'btn-icon menu__button-icon ' + item.ClassButton"
          :titleExtra="item.Title"
          :isCollapse="isCollapse"
        ></the-button>
      </div>
    </div>
  </div>
</template>

<script setup>
//import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { sidebarMenu } from '@/i18n/i18nCommon';
import TheButton from '../base/TheButton.vue';
import { computed } from '@vue/runtime-core';

const store = useStore();

const handleCollapseSidebar = () => {
  store.dispatch('updateIsCollapse');
};
const isCollapse = computed(() => store.getters.getIsCollapse);
</script>

<style>
@import url(../../style/layout/sidebar.css);
</style>
