<template>
  <div class="header">
    <div class="header-left">
      <the-button
        class="btn-icon header__icon btn-toggle"
        @click="handleCollapseSidebar"
        v-show="!isCollapse"
      ></the-button>
      <the-button
        class="btn header__branch"
        buttonTitleClass="header__branch-name"
        buttonIconClass="btn-icon header__icon btn-down"
        titleHeader="CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC"
      ></the-button>
    </div>
    <div class="header-right">
      <the-button
        class="header__actions"
        buttonIconClass="btn-icon header__icon btn-features"
      ></the-button>
      <the-button
        class="header__actions"
        buttonIconClass="btn-icon header__icon btn-setting"
      ></the-button>
      <the-button
        class="header__actions"
        buttonIconClass="btn-icon header__icon btn-chat"
      ></the-button>
      <the-button
        class="header__actions"
        buttonIconClass="btn-icon header__icon btn-help"
      ></the-button>
      <the-button
        class="header__actions"
        buttonIconClass="btn-icon header__icon btn-notify"
      ></the-button>
      <the-button
        class="btn profile"
        buttonIconClass="btn-icon header__icon profile__icon"
        buttonTitleClass="profile__name"
        titleHeader="Nguyễn Văn Mạnh"
        imageLink="https://id.misa.vn/image/getavatar?userId=b9616c97-acf9-4d72-adfa-da91bbed0d93&width=32&height=32"
        imageClass="profile__avatar"
      ></the-button>
    </div>
  </div>
</template>

<script setup>
// import { ref } from '@vue/reactivity';
import TheButton from '../base/TheButton.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

const store = useStore();
const handleCollapseSidebar = () => {
  store.dispatch('updateIsCollapse');
};

const isCollapse = computed(() => store.getters.getIsCollapse);
</script>

<style scoped>
@import url(../../style/layout/header.css);
</style>
