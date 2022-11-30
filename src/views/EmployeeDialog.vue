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
            Tooltip="Đóng"
            :DisableTooltip="false"
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
import { employeeRequest } from '@/js/utils/httpRequests';
import TheButton from '@/components/base/TheButton.vue';

const store = useStore();

// Khởi tạo Emits
const emitsDialog = defineEmits(['refreshEvent', 'refreshSelectedEmployees', 'handleConfirm']);

// Khởi tạo Props
const propsDialog = defineProps({ selectedEmployees: Array });
const contentEmployeeDialog = computed(() => store.getters.getContentEmployeeDialog);

/**
 * Hành động khi bấm tắt modal
 * Author: NQDONG (10/11/2022)
 */
const handleCloseEmployeeDialog = () => {
  store.commit('updateIsShowEmployeeDialog', false);
  store.commit('updateContentEmployeeDialog', {});
};

/**
 * Hành động khi bấm vào nút xác nhận trong modal
 * Author: NQDONG (10/11/2022)
 */
const actionConfirmed = async () => {
  switch (contentEmployeeDialog.value.Type) {
    // Xóa
    case 'delete':
      await handleDeleteEmployee();
      break;

    // Xóa nhiều
    case 'delete-multiple':
      await handleDeleteMultipleEmployee();
      break;

    // Đã bị chỉnh sửa
    case 'modified-employee':
      emitsDialog('handleConfirm');
      break;
    default:
      break;
  }
};

/**
 * Hành động khi bấm vào nút không xác nhận trong modal
 * Author: NQDONG (10/11/2022)
 */
const actionUnConfirmed = async () => {
  switch (contentEmployeeDialog.value.Type) {
    // Trường hợp form nhân viên đã bị sửa đổi
    case 'modified-employee':
      handleCloseEmployeeDialog();

      // Lấy danh sách nhân viên theo bộ lọc và phân trang
      await store
        .dispatch('getEmployeesByPaging')
        .finally(
          await store.commit('updateShowEmployeeForm', false),
          store.commit('updateIsModified', false),
          store.commit('updateSingleEmployee', {}),
        );
      break;
    default:
      handleCloseEmployeeDialog();
      break;
  }
};

/**
 * Xóa 1 nhân viên theo ID
 * Author: NQDONG (10/11/2022)
 */
const handleDeleteEmployee = async () => {
  try {
    store.commit('updateShowProgress', true);
    const employeeId = store.getters.getSelectedEmployeeId;

    // Thực hiện xóa 1 nhân viên qua API
    await employeeRequest.delete(`${employeeId}`);

    store.commit('updateSelectedEmployeeId', '');
    emitsDialog('refreshEvent');
    handleCloseEmployeeDialog();
  } catch (error) {
    // Mở modal thông báo lỗi
    store.dispatch('openEmployeeDialog', {
      Msg: { Msg: [error.response.data.UserMsg] },
      Type: 'ErrorPostData',
    });
  }
};

/**
 * Xóa hàng loạt nhân viên theo danh sách ID
 * Author: NQDONG (10/11/2022)
 */
const handleDeleteMultipleEmployee = async () => {
  try {
    store.commit('updateShowProgress', true);

    // Thực hiện xóa hàng loạt qua API
    await employeeRequest.post('deleteBatch', { EmployeeIDs: propsDialog.selectedEmployees });

    emitsDialog('refreshEvent');
    emitsDialog('refreshSelectedEmployees');
    handleCloseEmployeeDialog();
  } catch (error) {
    // Mở modal thông báo lỗi
    store.dispatch('openEmployeeDialog', {
      Msg: { Msg: [error.response.data.UserMsg] },
      Type: 'ErrorPostData',
    });
  }
};
</script>

<style scoped>
@import url(../style/pages/employeedialog.css);
</style>
