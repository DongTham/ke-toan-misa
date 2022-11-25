<template>
  <div class="dialog">
    <div class="dialog-wrapper">
      <form class="employee-dialog">
        <div class="employee-dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">{{ contentEmployeeDialog.TitleHeader }}</span>
          </div>
          <the-button
            @click="handleCloseEmployeeDialog"
            class="dialog-header__button"
            buttonIconClass="btn-icon btn-close"
          ></the-button>
        </div>
        <div class="employee-dialog__content">
          <div class="dialog-content__icon" :class="contentEmployeeDialog.IconContent"></div>
          <div class="dialog-content__text">
            <p>
              {{ contentEmployeeDialog.Message }}
            </p>
          </div>
        </div>
        <div class="employee-dialog__footer">
          <the-button
            class="btn btn-cancel"
            v-if="contentEmployeeDialog.CancelButton != null"
            :titleExtra="contentEmployeeDialog.CancelButton"
            @click="handleCloseEmployeeDialog"
          ></the-button>
          <div class="footer-right">
            <the-button
              class="btn btn-unconfirm"
              v-if="contentEmployeeDialog.UnConfirmButton != null"
              :titleExtra="contentEmployeeDialog.UnConfirmButton"
              type="button"
              @click="handleAddNewEmployee"
            ></the-button>
            <the-button
              class="btn btn-confirm"
              v-if="contentEmployeeDialog.ConfirmButton != null"
              :titleExtra="contentEmployeeDialog.ConfirmButton"
              type="button"
              @click="handleAddNewEmployeeAndRenewForm"
            ></the-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TheButton from '@/components/base/TheButton.vue';

const store = useStore();

const contentEmployeeDialog = computed(() => store.getters.getContentEmployeeDialog);
const handleCloseEmployeeDialog = () => {
  store.commit('updateContentEmployeeDialog', {});
  store.commit('updateIsShowEmployeeDialog', false);
};
</script>

<style scoped>
@import url(../style/pages/employeedialog.css);
</style>
