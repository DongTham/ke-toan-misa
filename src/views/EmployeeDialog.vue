<template>
  <div
    class="dialog dialog-confirm"
    ref="employeeDialog"
    @keydown.esc.stop="handleCloseEmployeeDialog"
    tabindex="0"
  >
    <div class="dialog-wrapper">
      <form class="employee-dialog">
        <div class="employee-dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">{{ contentEmployeeDialog.TitleHeader }}</span>
          </div>
          <the-button
            :tabindex="-1"
            @click="handleCloseEmployeeDialog"
            Tooltip="Đóng (ESC)"
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
            ref="buttonCancel"
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
import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import employeeRequests from '@/js/utils/employeeRequests';
import TheButton from '@/components/base/TheButton.vue';
import { toastMessage, showToast } from '@/i18n/i18nCommon';

const employeeDialog = ref(null);
const buttonCancel = ref(null);

onUnmounted(() => {
  if (
    contentEmployeeDialog.value.Type != 'delete' &&
    contentEmployeeDialog.value.Type != 'delete-multiple'
  ) {
    emitsDialog('focusCodeField');
  }
});

onMounted(() => {
  buttonCancel.value.$el.focus();
});
onUpdated(() => {
  buttonCancel.value.$el.focus();
});

const store = useStore();

// Khởi tạo Emits
// eslint-disable-next-line no-undef
const emitsDialog = defineEmits([
  'refreshEvent',
  'refreshSelectedEmployees',
  'handleConfirm',
  'focusCodeField',
]);

// Khởi tạo Props
// eslint-disable-next-line no-undef
const propsDialog = defineProps({ selectedEmployees: Array });
const contentEmployeeDialog = computed(() => store.getters.getContentEmployeeDialog);

/**
 * Hành động khi bấm tắt modal
 * Author: NQDONG (10/11/2022)
 */
const handleCloseEmployeeDialog = async () => {
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
      handleCloseEmployeeDialog();
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
    await employeeRequests.delete(employeeId);

    store.commit('updateSelectedEmployeeId', '');
    emitsDialog('refreshEvent');

    // Hiện alert thông báo thành công
    showToast(toastMessage.DeleteSuccess.Msg, toastMessage.DeleteSuccess.Type);

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
    await employeeRequests.deleteMultiple(propsDialog.selectedEmployees);

    emitsDialog('refreshEvent');
    emitsDialog('refreshSelectedEmployees');

    // Hiện alert thông báo thành công
    showToast(toastMessage.DeleteBatchSuccess.Msg, toastMessage.DeleteBatchSuccess.Type);

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
