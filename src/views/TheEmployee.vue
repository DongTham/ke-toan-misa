<template>
  <div class="dialog" v-if="showEmployeeForm">
    <div class="dialog-wrapper employee-form">
      <form class="dialog-container">
        <div class="dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">Thông tin nhân viên </span>
            <div class="header-checkbox">
              <input type="checkbox" />
              <span>Là khách hàng</span>
            </div>
            <div class="header-checkbox">
              <input type="checkbox" />
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
              ></text-field>
              <text-field :Label="titleEmployeeDetails.EmployeeName" IsValidate="true"></text-field>
            </div>
            <div class="field-right">
              <text-field
                class="input-date"
                :Label="titleEmployeeDetails.DateOfBirth"
                Type="date"
              ></text-field>
              <div class="content-checkbox">
                <label>{{ titleEmployeeDetails.Gender }}</label>
                <div class="content-checkbox__wrapper">
                  <input type="radio" name="gender" />
                  <span>Nam</span>
                  <input type="radio" name="gender" />
                  <span>Nữ</span>
                  <input type="radio" name="gender" />
                  <span>Khác</span>
                </div>
              </div>
            </div>
          </div>

          <div class="dialog-content__field">
            <div class="field-left">
              <text-field
                :Label="titleEmployeeDetails.Department"
                IsValidate="true"
                Class="input-main combobox__input select__record-input"
              ></text-field>
              <button class="btn-selectdown combobox__button" @click="handleShowPageSize"></button>
              <div class="combobox__data" v-if="isShowSelectDepartment">
                <div class="data-item" v-for="(item, index) in departmentsList" :key="index">
                  {{ item.DepartmentName }}
                </div>
              </div>
            </div>
            <div class="field-right">
              <text-field :Label="titleEmployeeDetails.IdentityNumber"></text-field>
              <text-field
                class="input-date"
                :Label="titleEmployeeDetails.IdentityIssueDate"
                Type="date"
              ></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <div class="field-left">
              <text-field :Label="titleEmployeeDetails.JobPosition"></text-field>
            </div>
            <div class="field-right">
              <text-field :Label="titleEmployeeDetails.IdentityIssuePlace"></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <text-field :Label="titleEmployeeDetails.EmployeeAddress"></text-field>
          </div>

          <div class="dialog-content__field" style="width: 75%">
            <text-field :Label="titleEmployeeDetails.MobilePhone"></text-field>
            <text-field :Label="titleEmployeeDetails.TelePhone"></text-field>
            <text-field :Label="titleEmployeeDetails.Email"></text-field>
          </div>
          <div class="dialog-content__field" style="width: 75%">
            <text-field :Label="titleEmployeeDetails.BankAccountNumber"></text-field>
            <text-field :Label="titleEmployeeDetails.BankName"></text-field>
            <text-field :Label="titleEmployeeDetails.BankBranchName"></text-field>
          </div>
        </div>
        <div class="dialog__footer">
          <the-button
            class="btn btn-cancel"
            titleExtra="Hủy"
            @click="handleCloseEmployeeForm"
          ></the-button>
          <div class="footer-right">
            <the-button class="btn btn-add" titleExtra="Cất"></the-button>
            <the-button class="btn btn-add-renew" titleExtra="Cất và Thêm"></the-button>
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
import { computed, ref } from 'vue';
import { titleEmployeeDetails } from '@/i18n/i18nCommon';
// import TheDropDown from '@/components/base/TheDropDown.vue';

const isShowSelectDepartment = ref(false);

const store = useStore();

store.dispatch('getAllDepartments');
const showEmployeeForm = computed(() => store.getters.showEmployeeForm);
const departmentsList = computed(() => store.getters.departmentsList);

const handleCloseEmployeeForm = () => {
  store.dispatch('handleCloseOrOpenEmployeeForm', false);
};
</script>

<style scoped>
@import url(../style/pages/employee.css);
</style>
