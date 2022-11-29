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
              @click="handleAddNewEmployee"
            ></the-button>
            <the-button
              class="btn btn-add-renew"
              titleExtra="Cất và Thêm"
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
import TheButton from '@/components/base/TheButton.vue';
import TextField from '@/components/base/input_field/TextField.vue';

import { useStore } from 'vuex';
import { computed, onMounted, ref, watch } from 'vue';
import { titleEmployeeDetails, handleActionEmployeeForm } from '@/i18n/i18nEmployeeDetail';
import { customizeDateTime } from '@/js/funtions/convertDateTime';
import { employeeDialogDetail } from '@/i18n/i18nEmployeeDialogDetail';
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
import axios from 'axios';

// import TheDropDown from '@/components/base/TheDropDown.vue';

const isShowSelectDepartment = ref(false);
const employeeDetailError = ref(employeeDetailErrors());
const inputFieldRef = ref();

const dateMax = computed(() => customizeDateTime(Date.now(), 'YYYY-MM-DD'));
const store = useStore();

store.dispatch('getAllDepartments');

const singleEmployee = computed(() => store.getters.singleEmployee);

const departmentsList = computed(() => store.getters.departmentsList);
const titleHeader = computed(() => store.getters.getTitleHeader);
const actionEmployeeForm = computed(() => store.getters.getHandleAction);
const isModified = computed(() => store.getters.getIsModified);
const presentFocusInput = computed(() => store.getters.getPresentFocusInput);

onMounted(() => {
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

  inputFieldRef.value.focusEmployeeCode();
});

const checkDuplicateEmployeeCode = async () => {
  let urlCheckDuplicate = `https://localhost:7228/api/v1/Employees/checkDuplicateCode?recordCode=${singleEmployee.value.EmployeeCode}`;
  if (actionEmployeeForm.value == handleActionEmployeeForm.Edit.Action) {
    urlCheckDuplicate += `&recordID=${singleEmployee.value.EmployeeID}`;
  }

  const res = await axios.get(urlCheckDuplicate);
  return res.data.IsDuplicateCode;
};

const handleAddNewEmployeeAndRenewForm = async () => {
  try {
    store.commit('updateShowProgress', true);
    employeeDetailError.value.Other.IsShow = false;
    validateEmployee();

    let errorList = Object.values(employeeDetailError.value);
    if (errorList.some((el) => el.IsShow)) {
      const errorDialog = employeeDialogDetail({
        Field: errorList.filter((el) => el.IsShow).map((el) => el.Title),
      }).ErrorValidate;
      store.commit('updateContentEmployeeDialog', errorDialog);
      store.commit('updateIsShowEmployeeDialog', true);
    } else {
      const isDuplicateEmployeeCode = await checkDuplicateEmployeeCode();
      if (!isDuplicateEmployeeCode) {
        if (actionEmployeeForm.value == handleActionEmployeeForm.AddNew.Action) {
          store.commit('updateFilterAndPaging', [{ pageNumber: 1 }, { keyword: '' }]);
          await axios
            .post('https://localhost:7228/api/v1/Employees', singleEmployee.value)
            .then((data) => {
              store.commit('updateSelectedEmployeeId', data.data.EmployeeID);
            });
        } else if (actionEmployeeForm.value == handleActionEmployeeForm.Edit.Action) {
          await axios.put(
            `https://localhost:7228/api/v1/Employees/${singleEmployee.value.EmployeeID}`,
            singleEmployee.value,
          );
        }

        store.dispatch('getMaxRecord').then((maxRecord) => {
          inputFieldRef.value.focusEmployeeCode();
          store.commit('updateSingleEmployee', { EmployeeCode: 'NV' + maxRecord });
        });

        store.commit('updateIsModified', false);
      } else {
        const WarningDialog = employeeDialogDetail({
          Code: singleEmployee.value.EmployeeCode,
        }).DuplicateEmployeeCode;
        let dataResult = validateCode('Duplicate');

        employeeDetailError.value.EmployeeCode.IsShow = dataResult.IsShow;
        employeeDetailError.value.EmployeeCode.Title = dataResult.Title;
        store.commit('updateContentEmployeeDialog', WarningDialog);
        store.commit('updateIsShowEmployeeDialog', true);
      }
    }
  } catch (error) {
    let userMsg = error.response.data.UserMsg;
    const errorDialog = employeeDialogDetail({
      Msg: userMsg == null ? [employeeDetailError.value.Other.Title] : [userMsg],
    }).ErrorPostData;
    store.commit('updateContentEmployeeDialog', errorDialog);
    store.commit('updateIsShowEmployeeDialog', true);
    employeeDetailError.value.Other.IsShow = true;
  }

  store.commit('updateShowProgress', false);
};

const handleCloseEmployeeForm = async () => {
  if (isModified.value) {
    const ConfirmDialog = employeeDialogDetail().ModifiedEmployee;
    store.commit('updateContentEmployeeDialog', ConfirmDialog);
    store.commit('updateIsShowEmployeeDialog', true);
  } else {
    store.commit('updateShowEmployeeForm', false);
    store.commit('updateSingleEmployee', {});
    store.commit('updateIsModified', false);

    await store.dispatch('getEmployeesByPaging').finally(store.commit('updateShowProgress', false));
  }
};

const handleAddNewEmployee = async () => {
  await handleAddNewEmployeeAndRenewForm();
  if (!Object.values(employeeDetailError.value).some((el) => el.IsShow)) {
    await handleCloseEmployeeForm();
  }
};

const handleShowDepartmentList = () => {
  isShowSelectDepartment.value = !isShowSelectDepartment.value;
};

const handleSelectDepartment = (el) => {
  singleEmployee.value.DepartmentName = el.DepartmentName;
  singleEmployee.value.DepartmentID = el.DepartmentID;
  isShowSelectDepartment.value = false;
  employeeDetailError.value.DepartmentName.IsShow = false;
};

const handleHiddenDepartmentList = () => {
  isShowSelectDepartment.value = false;
};

const validateEmployee = () => {
  employeeDetailError.value.EmployeeCode.IsShow = validateCode(
    singleEmployee.value.EmployeeCode,
  ).IsShow;

  employeeDetailError.value.EmployeeName.IsShow = validateName(singleEmployee.value.EmployeeName);
  employeeDetailError.value.DepartmentName.IsShow = validateDepartment(
    singleEmployee.value.DepartmentName,
    departmentsList.value,
  ).IsShow;
  employeeDetailError.value.DateOfBirth.IsShow = validateDateOfBirth(
    singleEmployee.value.DateOfBirth,
  );
  employeeDetailError.value.IdentityIssueDate.IsShow = validateIdentityIssueDate(
    singleEmployee.value.IdentityIssueDate,
  );
  employeeDetailError.value.Email.IsShow = validateEmail(singleEmployee.value.Email);
};

const validateEmployeeCode = () => {
  if (presentFocusInput.value == titleEmployeeDetails.EmployeeCode) {
    let dataResult = validateCode(singleEmployee.value.EmployeeCode);
    employeeDetailError.value.EmployeeCode.Title = dataResult.Title;
    employeeDetailError.value.EmployeeCode.IsShow = dataResult.IsShow;
  }
};

const validateEmployeeName = () => {
  if (presentFocusInput.value == titleEmployeeDetails.EmployeeName) {
    employeeDetailError.value.EmployeeName.IsShow = validateName(singleEmployee.value.EmployeeName);
  }
};

const validateDepartmentName = () => {
  if (presentFocusInput.value == titleEmployeeDetails.Department) {
    let dataResult = validateDepartment(singleEmployee.value.DepartmentName, departmentsList.value);
    employeeDetailError.value.DepartmentName.Title = dataResult.Title;
    employeeDetailError.value.DepartmentName.IsShow = dataResult.IsShow;
  }
};

const validateEmployeeDateOfBirth = () => {
  if (presentFocusInput.value == titleEmployeeDetails.DateOfBirth) {
    employeeDetailError.value.DateOfBirth.IsShow = validateDateOfBirth(
      singleEmployee.value.DateOfBirth,
    );
  }
};

const validateEmployeeIdentityIssueDate = () => {
  if (presentFocusInput.value == titleEmployeeDetails.IdentityIssueDate) {
    employeeDetailError.value.IdentityIssueDate.IsShow = validateIdentityIssueDate(
      singleEmployee.value.IdentityIssueDate,
    );
  }
};

const validateEmployeeEmail = () => {
  if (presentFocusInput.value == titleEmployeeDetails.Email) {
    employeeDetailError.value.Email.IsShow = validateEmail(singleEmployee.value.Email);
  }
};
</script>

<style scoped>
@import url(../style/pages/employee.css);
</style>
