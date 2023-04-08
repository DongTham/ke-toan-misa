<template>
  <div class="dialog" ref="theEmployee" @keydown.esc.stop="handleCloseEmployeeForm" tabindex="0">
    <div class="dialog-wrapper employee-form">
      <form class="dialog-container">
        <div class="dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">{{ titleHeader }}</span>
            <div class="header-checkbox">
              <input
                type="checkbox"
                v-model="singleEmployee.IsCustomer"
                ref="firstEl"
                @keydown.shift.tab="focusToLastEl"
                :tabindex="1"
              />
              <span>Là khách hàng</span>
            </div>
            <div class="header-checkbox">
              <input type="checkbox" v-model="singleEmployee.IsSupplier" :tabindex="2" />
              <span>Là nhà cung cấp</span>
            </div>
          </div>
          <the-button
            :tabindex="-1"
            Tooltip="Đóng (ESC)"
            :DisableTooltip="false"
            @click="handleCloseEmployeeForm"
            type="button"
            class="dialog-header__button"
            buttonIconClass="btn-icon btn-close"
          ></the-button>
        </div>
        <div class="dialog__content">
          <div class="dialog-content__field">
            <div class="field-left">
              <text-field
                ref="firstInputField"
                :tabIndex="3"
                :Label="titleEmployeeDetails.EmployeeCode"
                :IsValidate="true"
                style="width: 65%"
                v-model="singleEmployee.EmployeeCode"
                :TooltipMessage="employeeDetailError.EmployeeCode.Title"
                :IsShowTooltipMsg="employeeDetailError.EmployeeCode.IsShow"
              ></text-field>
              <text-field
                :tabIndex="4"
                :Label="titleEmployeeDetails.EmployeeName"
                :IsValidate="true"
                v-model="singleEmployee.EmployeeName"
                :TooltipMessage="employeeDetailError.EmployeeName.Title"
                :IsShowTooltipMsg="employeeDetailError.EmployeeName.IsShow"
              ></text-field>
            </div>
            <div class="field-right">
              <text-field
                :tabIndex="7"
                class="input-date"
                :Label="titleEmployeeDetails.DateOfBirth"
                Type="date"
                placeholder="dd-mm-yyyy"
                v-model="singleEmployee.DateOfBirth"
                :dateMax="dateMax"
                :TooltipMessage="employeeDetailError.DateOfBirth.Title"
                :IsShowTooltipMsg="employeeDetailError.DateOfBirth.IsShow"
              ></text-field>
              <div class="content-checkbox">
                <label>{{ titleEmployeeDetails.Gender }}</label>
                <div class="content-checkbox__wrapper">
                  <div
                    style="display: flex; justify-content: center; padding-left: 4px"
                    v-for="(item, index) in genderList"
                    :key="index"
                  >
                    <input
                      :tabindex="8"
                      type="radio"
                      name="gender"
                      :value="item.Value"
                      v-model="singleEmployee.Gender"
                    />
                    <span>{{ item.Name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dialog-content__field">
            <div class="field-left" v-click-outside="handleHiddenDepartmentList">
              <text-field
                ref="departmentField"
                @keydown.down="keydownSelectItem"
                @keyup.up="keyupSelectItem"
                @keydown.tab="handleHiddenDepartmentList"
                @keypress.enter="handleSelectDepartment(indexOfSelDepartment)"
                :tabIndex="5"
                :Label="titleEmployeeDetails.Department"
                :IsValidate="true"
                @update:modelValue="handleShowDepartmentList"
                Class="input-main combobox__input select__record-input"
                v-model="singleEmployee.DepartmentName"
                :TooltipMessage="employeeDetailError.DepartmentName.Title"
                :IsShowTooltipMsg="employeeDetailError.DepartmentName.IsShow"
              ></text-field>
              <button
                :tabindex="-1"
                type="button"
                class="btn-selectdown combobox__button"
                @click="handleShowDepartmentList"
              ></button>
              <div class="combobox__data" v-show="isShowSelectDepartment" ref="comboData">
                <div
                  class="data-item"
                  v-for="(item, index) in departmentsList"
                  :key="index"
                  @click="handleSelectDepartment(index)"
                  v-bind:class="{ 'active-item': index == indexOfSelDepartment }"
                >
                  {{ item.DepartmentName }}
                </div>
              </div>
            </div>
            <div class="field-right">
              <text-field
                :tabIndex="11"
                :Label="titleEmployeeDetails.IdentityNumber.Name"
                v-model="singleEmployee.IdentityNumber"
                :TooltipLabel="titleEmployeeDetails.IdentityNumber.Tooltip"
              ></text-field>
              <text-field
                :tabIndex="12"
                class="input-date"
                :Label="titleEmployeeDetails.IdentityIssueDate"
                Type="date"
                v-model="singleEmployee.IdentityIssueDate"
                :dateMax="dateMax"
                :TooltipMessage="employeeDetailError.IdentityIssueDate.Title"
                :IsShowTooltipMsg="employeeDetailError.IdentityIssueDate.IsShow"
              ></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <div class="field-left">
              <text-field
                :tabIndex="6"
                :Label="titleEmployeeDetails.JobPositionName"
                v-model="singleEmployee.JobPositionName"
              ></text-field>
            </div>
            <div class="field-right">
              <text-field
                :tabIndex="13"
                :Label="titleEmployeeDetails.IdentityIssuePlace"
                v-model="singleEmployee.IdentityIssuePlace"
              ></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <text-field
              :tabIndex="14"
              :Label="titleEmployeeDetails.EmployeeAddress"
              v-model="singleEmployee.EmployeeAddress"
            ></text-field>
          </div>

          <div class="dialog-content__field" style="width: 75%">
            <text-field
              :tabIndex="15"
              :Label="titleEmployeeDetails.MobilePhone.Name"
              v-model="singleEmployee.MobilePhone"
              :TooltipLabel="titleEmployeeDetails.MobilePhone.Tooltip"
            ></text-field>
            <text-field
              :tabIndex="16"
              :Label="titleEmployeeDetails.TelePhone.Name"
              v-model="singleEmployee.TelePhone"
              :TooltipLabel="titleEmployeeDetails.TelePhone.Tooltip"
            ></text-field>
            <text-field
              :tabIndex="17"
              :Label="titleEmployeeDetails.Email"
              v-model="singleEmployee.Email"
              :TooltipMessage="employeeDetailError.Email.Title"
              :IsShowTooltipMsg="employeeDetailError.Email.IsShow"
            ></text-field>
          </div>
          <div class="dialog-content__field" style="width: 75%">
            <text-field
              :tabIndex="18"
              :Label="titleEmployeeDetails.BankAccountNumber"
              v-model="singleEmployee.BankAccountNumber"
            ></text-field>
            <text-field
              :tabIndex="19"
              :Label="titleEmployeeDetails.BankName"
              v-model="singleEmployee.BankName"
            ></text-field>
            <text-field
              :tabIndex="20"
              :Label="titleEmployeeDetails.BankBranchName"
              v-model="singleEmployee.BankBranchName"
            ></text-field>
          </div>
        </div>
        <div class="dialog__footer">
          <div class="footer-right">
            <the-button
              :tabindex="21"
              class="btn btn-add"
              titleExtra="Cất"
              type="button"
              @click="handleConfirmPostData"
              title="Cất (Ctrl+S)"
            ></the-button>
            <the-button
              :tabIndex="22"
              class="btn btn-add-renew"
              titleExtra="Cất và Thêm"
              type="button"
              @click="handleConfirmPostDataAndRenewForm"
              title="Cất và Thêm (Ctrl+Shift+S)"
            ></the-button>
          </div>
          <the-button
            :tabIndex="23"
            @keydown.tab="focusToFirstEl"
            ref="lastEl"
            class="btn btn-cancel"
            titleExtra="Hủy"
            type="button"
            @click="handleCloseEmployeeForm"
          ></the-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import TheButton from '@/components/base/TheButton.vue';
import TextField from '@/components/base/input_field/TextField.vue';

import { useStore } from 'vuex';
import { computed, onMounted, ref, watch, getCurrentInstance } from 'vue';
import { titleEmployeeDetails, handleActionEmployeeForm } from '@/i18n/i18nEmployeeDetail';
import { customizeDateTime } from '@/js/functions/convertDateTime';
import { employeeDetailErrors } from '@/i18n/i18nEmployeeDetailError';
import { genderList } from '@/i18n/i18nGender';
import { toastMessage, showToast } from '@/i18n/i18nCommon';
import {
  validateCode,
  validateName,
  validateDepartment,
  validateDateOfBirth,
  validateIdentityIssueDate,
  validateEmail,
} from '@/js/functions/validateEmployeeDetail';
import employeeRequests from '@/js/utils/employeeRequests';

const isShowSelectDepartment = ref(false);
const indexOfSelDepartment = ref(null);
const employeeDetailError = ref(employeeDetailErrors());
const theEmployee = ref(null);
const firstInputField = ref(null);
const firstEl = ref(null);
const lastEl = ref(null);
const instance = getCurrentInstance();

const dateMax = computed(() => customizeDateTime(Date.now(), 'YYYY-MM-DD'));
const store = useStore();

const singleEmployee = computed(() => store.getters.singleEmployee);
const departmentsList = computed(() =>
  store.getters.departmentsList.filter((el) =>
    el.DepartmentName.toLowerCase().includes(singleEmployee.value.DepartmentName?.toLowerCase()),
  ),
);
const titleHeader = computed(() => store.getters.getTitleHeader);
const actionEmployeeForm = computed(() => store.getters.getHandleAction);
const isModified = computed(() => store.getters.getIsModified);
const presentFocusInput = computed(() => store.getters.getPresentFocusInput);

const comboData = ref(null);
const departmentField = ref(null);

const keydownSelectItem = () => {
  if (isShowSelectDepartment.value == true) {
    if (
      indexOfSelDepartment.value == null ||
      indexOfSelDepartment.value >= departmentsList.value.length - 1
    ) {
      indexOfSelDepartment.value = 0;
    } else if (departmentsList.value.length > 0) {
      indexOfSelDepartment.value =
        indexOfSelDepartment.value >= departmentsList.value.length - 1
          ? indexOfSelDepartment.value
          : indexOfSelDepartment.value + 1;
    }
  } else {
    singleEmployee.value.DepartmentName = '';
    isShowSelectDepartment.value = true;
  }
};

const keyupSelectItem = () => {
  if (
    isShowSelectDepartment.value == true &&
    indexOfSelDepartment.value != null &&
    indexOfSelDepartment.value != 0 &&
    departmentsList.value.length > 0
  ) {
    indexOfSelDepartment.value--;
  }
};

const focusCodeField = () => {
  // Focus vào ô mã nhân viên
  firstInputField.value.$refs.focusInput.focus();
};

onMounted(() => {
  // Validate form chi tiết nhân viên
  watch(
    () => computed(() => store.getters.singleEmployee),
    () => {
      if (!isModified.value) {
        store.commit('updateIsModified', true);
      }

      validateEmployeeCode();
      validateEmployeeName();
      validateDepartmentName();
      validateEmployeeDateOfBirth();
      validateEmployeeIdentityIssueDate();
      validateEmployeeEmail();
    },
    { deep: true },
  );

  focusCodeField();

  // Lấy danh sách tất cả đơn vị
  store.dispatch('getAllDepartments');

  instance.keepContext = false;

  theEmployee.value.addEventListener('keydown', (event) => {
    if (event.key == 'Control' || event.key == 'Shift') {
      instance.keepContext = false;
    } else {
      doSave(event);
    }
  });
});

/**
 * Thao tác với bàn phím
 * Author: NQDONG (10/11/2022)
 */
const doSave = (e) => {
  if (e.key.toUpperCase() == 'S' && e.ctrlKey) {
    e.preventDefault();
    if (e.shiftKey) {
      handleConfirmPostDataAndRenewForm();
    } else {
      handleConfirmPostData();
    }
  }
};

/**
 * Focus vào input đầu tiên trong form
 * Author: NQDONG (10/11/2022)
 */
const focusToFirstEl = () => {
  firstEl.value.focus();
};

/**
 * Focus vào button cuối cùng trong form
 * Author: NQDONG (10/11/2022)
 */
const focusToLastEl = () => {
  lastEl.value.$el.focus();
};

/**
 * Kiểm tra trùng mã nhân viên
 * @returns Mã có bị trùng hay không
 * Author: NQDONG (10/11/2022)
 */
const checkDuplicateEmployeeCode = async () => {
  const res = await employeeRequests.checkDuplicateCode(
    singleEmployee.value.EmployeeCode,
    singleEmployee.value.EmployeeID,
  );
  return res.data.IsDuplicateCode;
};

/**
 * Thao tác gửi data qua API để thực hiện thêm mới
 * Author: NQDONG (10/11/2022)
 */
const actionAddEmployee = async () => {
  store.commit('updateFilterAndPaging', [{ pageNumber: 1 }, { keyword: '' }]);
  await employeeRequests.insert(singleEmployee.value).then((data) => {
    store.commit('updateSelectedEmployeeId', data.data.EmployeeID);
  });
};

/**
 * Thao tác gửi data qua API để thực hiện chỉnh sửa
 * Author: NQDONG (10/11/2022)
 */
const actionEditEmployee = async () => {
  await employeeRequests
    .update(singleEmployee.value)
    .finally(
      store.commit('updateTitleHeader', handleActionEmployeeForm.AddNew.Title),
      store.commit('updateHandleAction', handleActionEmployeeForm.AddNew.Action),
    );
};

/**
 * Thao tác thêm/sửa khi bấm vào nút cất và tạo form mới
 * Author: NQDONG (10/11/2022)
 */
const getBiggestCode = async () => {
  // Lấy mã lớn nhất từ store
  let maxRecord = await store.dispatch('getMaxRecord');

  focusCodeField();

  // Cập nhật lại giá trị của nhân viên đang chọn
  await store.commit('updateSingleEmployee', {
    EmployeeCode: 'NV' + maxRecord,
    DepartmentName: '',
  });

  store.commit('updateIsModified', false);
};

/**
 * Thao tác thêm/sửa khi bấm vào nút cất và tạo form mới
 * Author: NQDONG (10/11/2022)
 */
const handleConfirmPostDataAndRenewForm = async () => {
  try {
    store.commit('updateShowProgress', true);
    employeeDetailError.value.Other.IsShow = false;
    validateEmployee();

    // Convert từ object sang array
    let errorList = Object.values(employeeDetailError.value);

    // Kiểm tra xem có lỗi nào hay không
    if (errorList.some((el) => el.IsShow)) {
      // Mở modal thông báo lỗi
      store.dispatch('openEmployeeDialog', {
        Msg: { Field: errorList.filter((el) => el.IsShow).map((el) => el.Title) },
        Type: 'ErrorValidate',
      });
    } else {
      // Kiểm tra trùng mã nhân viên
      const isDuplicateEmployeeCode = await checkDuplicateEmployeeCode();
      if (!isDuplicateEmployeeCode) {
        // Kiểm tra thao tác của form là tạo mới
        if (actionEmployeeForm.value == handleActionEmployeeForm.AddNew.Action) {
          await actionAddEmployee();

          // Hiện alert thông báo thành công
          showToast(toastMessage.AddNewSuccess.Msg, toastMessage.AddNewSuccess.Type);
        } // Kiểm tra thao tác của form là sửa
        else if (actionEmployeeForm.value == handleActionEmployeeForm.Edit.Action) {
          await actionEditEmployee();

          // Hiện alert thông báo thành công
          showToast(toastMessage.EditSuccess.Msg, toastMessage.EditSuccess.Type);
        }

        await getBiggestCode();
      } else {
        // Hiển thị tooltip lỗi trùng mã
        let dataResult = validateCode('Duplicate');
        employeeDetailError.value.EmployeeCode.IsShow = dataResult.IsShow;
        employeeDetailError.value.EmployeeCode.Title = dataResult.Title;

        // Mở modal thông báo lỗi
        store.dispatch('openEmployeeDialog', {
          Msg: { Code: singleEmployee.value.EmployeeCode },
          Type: 'DuplicateEmployeeCode',
        });
      }
    }
  } catch (error) {
    let userMsg = error.response.data.UserMsg;

    // Mở modal thông báo lỗi
    store.dispatch('openEmployeeDialog', {
      Msg: { Msg: userMsg == null ? [employeeDetailError.value.Other.Title] : [userMsg] },
      Type: 'ErrorPostData',
    });

    employeeDetailError.value.Other.IsShow = true;
  }

  store.commit('updateShowProgress', false);
};

/**
 * Thao tác thêm/sửa khi bấm vào nút cất
 * Author: NQDONG (10/11/2022)
 */
const handleConfirmPostData = async () => {
  await handleConfirmPostDataAndRenewForm();
  if (!Object.values(employeeDetailError.value).some((el) => el.IsShow)) {
    await handleCloseEmployeeForm();
  }
};

/**
 * Thao tác đóng form khi bấm vào nút hủy
 * Author: NQDONG (10/11/2022)
 */
const handleCloseEmployeeForm = async () => {
  if (isModified.value) {
    // Mở modal xác nhận
    store.dispatch('openEmployeeDialog', { Type: 'ModifiedEmployee' });
  } else {
    store.commit('updateShowEmployeeForm', false);

    // Lấy danh sách nhân viên theo bộ lọc và phân trang
    await store.dispatch('getEmployeesByPaging').finally(store.commit('updateShowProgress', false));

    store.commit('updateSingleEmployee', {});
  }
};

// eslint-disable-next-line no-undef
defineExpose({
  handleConfirmPostData,
  focusCodeField,
});

/**
 * Hiện dropdown chọn đơn vị
 * Author: NQDONG (10/11/2022)
 */
const handleShowDepartmentList = () => {
  isShowSelectDepartment.value = true;
  singleEmployee.value.DepartmentName = '';
  departmentField.value.$refs.focusInput.focus();
};

/**
 * Thao tác chọn đơn vị
 * @param {Object} el Thông tin 1 đơn vị đã chọn
 * Author: NQDONG (10/11/2022)
 */
const handleSelectDepartment = (el) => {
  // indexOfSelDepartment.value = departmentsList.value.indexOf(
  //   (el) => el.DepartmentID == el.DepartmentID,
  // );
  indexOfSelDepartment.value = el;
  let singleDepartment = departmentsList.value.at(el);
  singleEmployee.value.DepartmentID = singleDepartment.DepartmentID;
  singleEmployee.value.DepartmentName = singleDepartment.DepartmentName;

  isShowSelectDepartment.value = false;
  employeeDetailError.value.DepartmentName.IsShow = false;
};

/**
 * Ẩn dropdown chọn đơn vị
 * Author: NQDONG (10/11/2022)
 */
const handleHiddenDepartmentList = () => {
  if (employeeDetailError.value.DepartmentName.IsShow) {
    singleEmployee.value.DepartmentName = '';
  } else if (
    indexOfSelDepartment.value != null &&
    departmentsList.value.length > 0 &&
    isShowSelectDepartment.value
  ) {
    singleEmployee.value.DepartmentID =
      departmentsList.value[indexOfSelDepartment.value].DepartmentID;
    singleEmployee.value.DepartmentName =
      departmentsList.value[indexOfSelDepartment.value].DepartmentName;
    employeeDetailError.value.DepartmentName.IsShow = false;
  }
  isShowSelectDepartment.value = false;
};

/**
 * Validate chung cho form employee trước khi cất
 * Author: NQDONG (10/11/2022)
 */
const validateEmployee = () => {
  // Validate mã nhân viên
  employeeDetailError.value.EmployeeCode.IsShow = validateCode(
    singleEmployee.value.EmployeeCode,
  ).IsShow;

  // Validate tên nhân viên
  employeeDetailError.value.EmployeeName.IsShow = validateName(singleEmployee.value.EmployeeName);

  // Validate tên đơn vị
  employeeDetailError.value.DepartmentName.IsShow = validateDepartment(
    singleEmployee.value.DepartmentName,
    departmentsList.value,
  ).IsShow;

  // Validate ngày sinh
  employeeDetailError.value.DateOfBirth.IsShow = validateDateOfBirth(
    singleEmployee.value.DateOfBirth,
  );

  // Validate ngày cấp
  employeeDetailError.value.IdentityIssueDate.IsShow = validateIdentityIssueDate(
    singleEmployee.value.IdentityIssueDate,
  );

  // Validate email
  employeeDetailError.value.Email.IsShow = validateEmail(singleEmployee.value.Email);
};

/**
 * Validate trường mã nhân viên
 * Author: NQDONG (10/11/2022)
 */
const validateEmployeeCode = () => {
  if (presentFocusInput.value == titleEmployeeDetails.EmployeeCode) {
    let dataResult = validateCode(singleEmployee.value.EmployeeCode);
    employeeDetailError.value.EmployeeCode.Title = dataResult.Title;
    employeeDetailError.value.EmployeeCode.IsShow = dataResult.IsShow;
  }
};

/**
 * Validate trường tên nhân viên
 * Author: NQDONG (10/11/2022)
 */
const validateEmployeeName = () => {
  if (presentFocusInput.value == titleEmployeeDetails.EmployeeName) {
    employeeDetailError.value.EmployeeName.IsShow = validateName(singleEmployee.value.EmployeeName);
  }
};

/**
 * Validate trường tên đơn vị của nhân viên
 * Author: NQDONG (10/11/2022)
 */
const validateDepartmentName = () => {
  if (presentFocusInput.value == titleEmployeeDetails.Department) {
    let dataResult = validateDepartment(singleEmployee.value.DepartmentName, departmentsList.value);
    employeeDetailError.value.DepartmentName.Title = dataResult.Title;
    employeeDetailError.value.DepartmentName.IsShow = dataResult.IsShow;
  }
};

/**
 * Validate trường ngày sinh của nhân viên
 * Author: NQDONG (10/11/2022)
 */
const validateEmployeeDateOfBirth = () => {
  if (presentFocusInput.value == titleEmployeeDetails.DateOfBirth) {
    employeeDetailError.value.DateOfBirth.IsShow = validateDateOfBirth(
      singleEmployee.value.DateOfBirth,
    );
  }
};

/**
 * Validate trường ngày cấp CMND của nhân viên
 * Author: NQDONG (10/11/2022)
 */
const validateEmployeeIdentityIssueDate = () => {
  if (presentFocusInput.value == titleEmployeeDetails.IdentityIssueDate) {
    employeeDetailError.value.IdentityIssueDate.IsShow = validateIdentityIssueDate(
      singleEmployee.value.IdentityIssueDate,
    );
  }
};

/**
 * Validate trường email của nhân viên
 * Author: NQDONG (10/11/2022)
 */
const validateEmployeeEmail = () => {
  if (presentFocusInput.value == titleEmployeeDetails.Email) {
    employeeDetailError.value.Email.IsShow = validateEmail(singleEmployee.value.Email);
  }
};
</script>

<style scoped>
@import url(../style/pages/employee.css);
</style>
