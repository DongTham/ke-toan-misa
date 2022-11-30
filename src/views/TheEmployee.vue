<template>
  <div class="dialog">
    <div class="dialog-wrapper employee-form">
      <form class="dialog-container">
        <div class="dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">{{ titleHeader }}</span>
            <div class="header-checkbox">
              <input type="checkbox" v-model="singleEmployee.IsCustomer" />
              <span>Là khách hàng</span>
            </div>
            <div class="header-checkbox">
              <input type="checkbox" v-model="singleEmployee.IsSuplier" />
              <span>Là nhà cung cấp</span>
            </div>
          </div>
          <the-button
            Tooltip="Đóng"
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
                ref="inputFieldRef"
                :Label="titleEmployeeDetails.EmployeeCode"
                :IsValidate="true"
                style="width: 65%"
                v-model="singleEmployee.EmployeeCode"
                focusInput="input"
                :TooltipMessage="employeeDetailError.EmployeeCode.Title"
                :IsShowTooltipMsg="employeeDetailError.EmployeeCode.IsShow"
              ></text-field>
              <text-field
                :Label="titleEmployeeDetails.EmployeeName"
                :IsValidate="true"
                v-model="singleEmployee.EmployeeName"
                :TooltipMessage="employeeDetailError.EmployeeName.Title"
                :IsShowTooltipMsg="employeeDetailError.EmployeeName.IsShow"
              ></text-field>
            </div>
            <div class="field-right">
              <text-field
                class="input-date"
                :Label="titleEmployeeDetails.DateOfBirth"
                Type="date"
                v-model="singleEmployee.DateOfBirth"
                :dateMax="dateMax"
                :TooltipMessage="employeeDetailError.DateOfBirth.Title"
                :IsShowTooltipMsg="employeeDetailError.DateOfBirth.IsShow"
              ></text-field>
              <div class="content-checkbox">
                <label>{{ titleEmployeeDetails.Gender }}</label>
                <div class="content-checkbox__wrapper">
                  <div
                    style="display: flex; justify-content: center"
                    v-for="(item, index) in genderList"
                    :key="index"
                  >
                    <input
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
                :Label="titleEmployeeDetails.Department"
                :IsValidate="true"
                Class="input-main combobox__input select__record-input"
                v-model="singleEmployee.DepartmentName"
                :TooltipMessage="employeeDetailError.DepartmentName.Title"
                :IsShowTooltipMsg="employeeDetailError.DepartmentName.IsShow"
              ></text-field>
              <button
                type="button"
                class="btn-selectdown combobox__button"
                @click="handleShowDepartmentList"
              ></button>
              <div class="combobox__data" v-if="isShowSelectDepartment">
                <div
                  class="data-item"
                  v-for="(item, index) in departmentsList"
                  :key="index"
                  @click="handleSelectDepartment(item)"
                  v-bind:class="
                    item.DepartmentName == singleEmployee.DepartmentName ? 'active-item' : ''
                  "
                >
                  {{ item.DepartmentName }}
                </div>
              </div>
            </div>
            <div class="field-right">
              <text-field
                :Label="titleEmployeeDetails.IdentityNumber.Name"
                v-model="singleEmployee.IdentityNumber"
                :TooltipLabel="titleEmployeeDetails.IdentityNumber.Tooltip"
              ></text-field>
              <text-field
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
                :Label="titleEmployeeDetails.JobPositionName"
                v-model="singleEmployee.JobPositionName"
              ></text-field>
            </div>
            <div class="field-right">
              <text-field
                :Label="titleEmployeeDetails.IdentityIssuePlace"
                v-model="singleEmployee.IdentityIssuePlace"
              ></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <text-field
              :Label="titleEmployeeDetails.EmployeeAddress"
              v-model="singleEmployee.EmployeeAddress"
            ></text-field>
          </div>

          <div class="dialog-content__field" style="width: 75%">
            <text-field
              :Label="titleEmployeeDetails.MobilePhone.Name"
              v-model="singleEmployee.MobilePhone"
              :TooltipLabel="titleEmployeeDetails.MobilePhone.Tooltip"
            ></text-field>
            <text-field
              :Label="titleEmployeeDetails.TelePhone.Name"
              v-model="singleEmployee.TelePhone"
              :TooltipLabel="titleEmployeeDetails.TelePhone.Tooltip"
            ></text-field>
            <text-field
              :Label="titleEmployeeDetails.Email"
              v-model="singleEmployee.Email"
              :TooltipMessage="employeeDetailError.Email.Title"
              :IsShowTooltipMsg="employeeDetailError.Email.IsShow"
            ></text-field>
          </div>
          <div class="dialog-content__field" style="width: 75%">
            <text-field
              :Label="titleEmployeeDetails.BankAccountNumber"
              v-model="singleEmployee.BankAccountNumber"
            ></text-field>
            <text-field
              :Label="titleEmployeeDetails.BankName"
              v-model="singleEmployee.BankName"
            ></text-field>
            <text-field
              :Label="titleEmployeeDetails.BankBranchName"
              v-model="singleEmployee.BankBranchName"
            ></text-field>
          </div>
        </div>
        <div class="dialog__footer">
          <the-button
            class="btn btn-cancel"
            titleExtra="Hủy"
            type="button"
            @click="handleCloseEmployeeForm"
          ></the-button>
          <div class="footer-right">
            <the-button
              class="btn btn-add"
              titleExtra="Cất"
              type="button"
              @click="handleConfirmPostData"
            ></the-button>
            <the-button
              class="btn btn-add-renew"
              titleExtra="Cất và Thêm"
              type="button"
              @click="handleConfirmPostDataAndRenewForm"
            ></the-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import TheButton from '@/components/base/TheButton.vue';
import TextField from '@/components/base/input_field/TextField.vue';

import { useStore } from 'vuex';
import { computed, onMounted, ref, watch, defineExpose } from 'vue';
import { titleEmployeeDetails, handleActionEmployeeForm } from '@/i18n/i18nEmployeeDetail';
import { customizeDateTime } from '@/js/funtions/convertDateTime';
// import { employeeDialogDetail } from '@/i18n/i18nEmployeeDialogDetail';
import { employeeDetailErrors } from '@/i18n/i18nEmployeeDetailError';
import { genderList } from '@/i18n/i18nGender';
import {
  validateCode,
  validateName,
  validateDepartment,
  validateDateOfBirth,
  validateIdentityIssueDate,
  validateEmail,
} from '@/js/funtions/validateEmployeeDetail';
import { employeeRequest } from '@/js/utils/httpRequests';

const isShowSelectDepartment = ref(false);
const employeeDetailError = ref(employeeDetailErrors());
const inputFieldRef = ref();

const dateMax = computed(() => customizeDateTime(Date.now(), 'YYYY-MM-DD'));
const store = useStore();

const singleEmployee = computed(() => store.getters.singleEmployee);
const departmentsList = computed(() => store.getters.departmentsList);
const titleHeader = computed(() => store.getters.getTitleHeader);
const actionEmployeeForm = computed(() => store.getters.getHandleAction);
const isModified = computed(() => store.getters.getIsModified);
const presentFocusInput = computed(() => store.getters.getPresentFocusInput);

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

  // Focus vào ô mã nhân viên
  inputFieldRef.value.focusEmployeeCode();

  // Lấy danh sách tất cả đơn vị
  store.dispatch('getAllDepartments');
});

/**
 * Kiểm tra trùng mã nhân viên
 * @returns Mã có bị trùng hay không
 * Author: NQDONG (10/11/2022)
 */
const checkDuplicateEmployeeCode = async () => {
  let urlCheckDuplicate = `checkDuplicateCode?recordCode=${singleEmployee.value.EmployeeCode}`;
  if (actionEmployeeForm.value == handleActionEmployeeForm.Edit.Action) {
    urlCheckDuplicate += `&recordID=${singleEmployee.value.EmployeeID}`;
  }

  const res = await employeeRequest.get(urlCheckDuplicate);
  return res.data.IsDuplicateCode;
};

/**
 * Thao tác gửi data qua API để thực hiện thêm mới
 * Author: NQDONG (10/11/2022)
 */
const actionAddEmployee = async () => {
  store.commit('updateFilterAndPaging', [{ pageNumber: 1 }, { keyword: '' }]);
  await employeeRequest.post('', singleEmployee.value).then((data) => {
    store.commit('updateSelectedEmployeeId', data.data.EmployeeID);
  });
};

/**
 * Thao tác gửi data qua API để thực hiện chỉnh sửa
 * Author: NQDONG (10/11/2022)
 */
const actionEditEmployee = async () => {
  await employeeRequest
    .put(`${singleEmployee.value.EmployeeID}`, singleEmployee.value)
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

  // Focus vào ô mã nhân viên
  inputFieldRef.value.focusEmployeeCode();

  // Cập nhật lại giá trị của nhân viên đang chọn
  await store.commit('updateSingleEmployee', { EmployeeCode: 'NV' + maxRecord });

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
        } // Kiểm tra thao tác của form là sửa
        else if (actionEmployeeForm.value == handleActionEmployeeForm.Edit.Action) {
          await actionEditEmployee();
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

defineExpose({
  handleConfirmPostData,
});

/**
 * Hiện dropdown chọn đơn vị
 * Author: NQDONG (10/11/2022)
 */
const handleShowDepartmentList = () => {
  isShowSelectDepartment.value = !isShowSelectDepartment.value;
};

/**
 * Thao tác chọn đơn vị
 * @param {String} el Thông tin 1 đơn vị đã chọn
 * Author: NQDONG (10/11/2022)
 */
const handleSelectDepartment = (el) => {
  singleEmployee.value.DepartmentName = el.DepartmentName;
  singleEmployee.value.DepartmentID = el.DepartmentID;
  isShowSelectDepartment.value = false;
  employeeDetailError.value.DepartmentName.IsShow = false;
};

/**
 * Ẩn dropdown chọn đơn vị
 * Author: NQDONG (10/11/2022)
 */
const handleHiddenDepartmentList = () => {
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
