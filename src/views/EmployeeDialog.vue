<template>
  <div class="dialog dialog-confirm">
    <div class="dialog-wrapper">
      <form class="employee-dialog">
        <div class="employee-dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">{{ contentEmployeeDialog.TitleHeader }}</span>
          </div>
          <the-button
            @click="handleCloseEmployeeDialog"
            type="button"
            class="dialog-header__button"
            buttonIconClass="btn-icon btn-close"
          ></the-button>
        </div>
        <div class="employee-dialog__content">
          <div class="dialog-content__icon" :class="contentEmployeeDialog.IconContent"></div>
          <div class="dialog-content__text">
            <p v-for="(item, index) in contentEmployeeDialog.Message" :key="index">
              {{ item }}
            </p>
          </div>
        </div>
        <div class="employee-dialog__footer" :class="contentEmployeeDialog.Style">
          <the-button
            class="btn btn-cancel"
            type="button"
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
              @click="actionUnConfirmed"
            ></the-button>
            <the-button
              class="btn btn-confirm"
              v-if="contentEmployeeDialog.ConfirmButton != null"
              :titleExtra="contentEmployeeDialog.ConfirmButton"
              type="button"
              @click="actionConfirmed"
            ></the-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import TheButton from '@/components/base/TheButton.vue';

const store = useStore();
const emitsDialog = defineEmits(['refreshEvent', 'refreshSelectedEmployees']);
const propsDialog = defineProps({ selectedEmployees: Array });
const contentEmployeeDialog = computed(() => store.getters.getContentEmployeeDialog);

const handleCloseEmployeeDialog = () => {
  store.commit('updateContentEmployeeDialog', {});
  store.commit('updateIsShowEmployeeDialog', false);
};

const actionConfirmed = async () => {
  switch (contentEmployeeDialog.value.Type) {
    case 'delete':
      await handleDeleteEmployee();
      break;
    case 'delete-multiple':
      await handleDeleteMultipleEmployee();
      break;
    default:
      break;
  }
};

const actionUnConfirmed = async () => {
  switch (contentEmployeeDialog.value.Type) {
    case 'modified-employee':
      handleCloseEmployeeDialog();
      await store
        .dispatch('getEmployeesByPaging')
        .finally(
          store.commit('updateShowEmployeeForm', false),
          store.commit('updateSingleEmployee', {}),
          store.commit('updateIsModified', false),
        );
      break;
    default:
      handleCloseEmployeeDialog();
      break;
  }
};

const handleDeleteEmployee = async () => {
  try {
    const employeeId = store.getters.getSelectedEmployeeId;
    store.commit('updateShowProgress', true);
    await axios.delete(`https://localhost:7228/api/v1/Employees/${employeeId}`).then(() => {
      emitsDialog('refreshEvent');
      handleCloseEmployeeDialog();
    });
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteMultipleEmployee = async () => {
  try {
    store.commit('updateShowProgress', true);
    await axios
      .post('https://localhost:7228/api/v1/Employees/deleteBatch', {
        EmployeeIDs: propsDialog.selectedEmployees,
      })
      .then(() => {
        emitsDialog('refreshEvent');
        emitsDialog('refreshSelectedEmployees');
        handleCloseEmployeeDialog();
      });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
@import url(../style/pages/employeedialog.css);
</style>
