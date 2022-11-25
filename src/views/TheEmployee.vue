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
            class="dialog-header__button"
            buttonIconClass="btn-icon btn-close"
          ></the-button>
        </div>
        <div class="dialog__content">
          <div class="dialog-content__field">
            <div class="field-left">
              <text-field
                :Label="titleEmployeeDetails.EmployeeCode"
                IsValidate="true"
                style="width: 65%"
                v-model="singleEmployee.EmployeeCode"
                focusInput="input"
              ></text-field>
              <text-field
                :Label="titleEmployeeDetails.EmployeeName"
                IsValidate="true"
                v-model="singleEmployee.EmployeeName"
              ></text-field>
            </div>
            <div class="field-right">
              <text-field
                class="input-date"
                :Label="titleEmployeeDetails.DateOfBirth"
                Type="date"
                v-model="singleEmployee.DateOfBirth"
                :dateMax="dateMax"
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
                IsValidate="true"
                Class="input-main combobox__input select__record-input"
                v-model="singleEmployee.DepartmentName"
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
import { computed, ref, watch } from 'vue';
import { titleEmployeeDetails } from '@/i18n/i18nEmployeeDetail';
import { customizeDateTime } from '@/js/funtions/convertDateTime';
import { genderList } from '@/i18n/i18nGender';
import axios from 'axios';

// import TheDropDown from '@/components/base/TheDropDown.vue';

const isShowSelectDepartment = ref(false);

const dateMax = computed(() => customizeDateTime(Date.now(), 'YYYY-MM-DD'));
const store = useStore();

store.dispatch('getAllDepartments');

const singleEmployee = computed(() => store.getters.singleEmployee);

const departmentsList = computed(() => store.getters.departmentsList);
const titleHeader = computed(() => store.getters.getTitleHeader);
const actionEmployeeForm = computed(() => store.getters.getHandleAction);
const isModified = computed(() => store.getters.getIsModified);

watch(
  () => store.getters.singleEmployee,
  () => {
    console.log(isModified.value);
    if (!isModified.value) {
      store.commit('updateIsModified', true);
    }
  },
  { deep: true },
);

const checkDuplicateEmployeeCode = async () => {
  const res = await axios.get(
    `https://localhost:7228/api/v1/Employees/checkDuplicateCode?employeeCode=${singleEmployee.value.EmployeeCode}`,
  );
  return res.data.IsDuplicateEmployeeCode;
};

const handleAddNewEmployeeAndRenewForm = async () => {
  try {
    store.commit('updateShowProgress', true);

    if (actionEmployeeForm.value == 0) {
      store.commit('updatePageNumber', 1);
      store.commit('updateKeyword', '');
      await axios
        .post('https://localhost:7228/api/v1/Employees', singleEmployee.value)
        .then((data) => {
          store.commit('updateSelectedEmployeeId', data.data.EmployeeID);
        });
    } else if (actionEmployeeForm.value == 1) {
      await axios.put(
        `https://localhost:7228/api/v1/Employees/${singleEmployee.value.EmployeeID}`,
        singleEmployee.value,
      );
    }

    await store.dispatch('getMaxRecord').then((maxRecord) => {
      store.commit('updateSingleEmployee', { EmployeeCode: 'NV' + maxRecord });
    });
  } catch (error) {
    console.log(error);
  }

  store.commit('updateShowProgress', false);
};

const handleCloseEmployeeForm = async () => {
  store.dispatch('handleCloseOrOpenEmployeeForm', false);
  //store.commit('updateShowProgress', true);
  store.commit('updateSingleEmployee', {});
  store.commit('updateIsModified', false);

  //await store.dispatch('getEmployeesByPaging').then(store.commit('updateShowProgress', false));
  await store.dispatch('getEmployeesByPaging');
};

const handleAddNewEmployee = async () => {
  const isDuplicateEmployeeCode = await checkDuplicateEmployeeCode();
  if (!isDuplicateEmployeeCode) {
    await handleAddNewEmployeeAndRenewForm();
    await handleCloseEmployeeForm();
  } else {
    alert('Mã bị trùng!');
  }
};

const handleShowDepartmentList = () => {
  isShowSelectDepartment.value = !isShowSelectDepartment.value;
};

const handleSelectDepartment = (el) => {
  singleEmployee.value.DepartmentName = el.DepartmentName;
  singleEmployee.value.DepartmentID = el.DepartmentID;
  isShowSelectDepartment.value = false;
};

const handleHiddenDepartmentList = () => {
  isShowSelectDepartment.value = false;
};
</script>

<style scoped>
@import url(../style/pages/employee.css);
</style>
