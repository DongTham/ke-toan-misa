<template>
  <div class="dialog" v-if="showEmployeeForm">
    <div class="dialog-wrapper employee-form">
      <form class="dialog-container">
        <div class="dialog__header">
          <div class="dialog-header__title">
            <span class="header-title">Thông tin nhân viên</span>
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
            v-on:click="handleCloseForm"
            type="close"
            class="dialog-header__button"
            buttonIconClass="btn-icon btn-close"
          ></the-button>
        </div>
        <div class="dialog__content">
          <div class="dialog-content__field">
            <div class="field-left">
              <text-field Label="Mã" IsValidate="true" style="width: 65%"></text-field>
              <text-field Label="Tên" IsValidate="true"></text-field>
            </div>
            <div class="field-right">
              <text-field class="input-date" Label="Ngày sinh" Type="date"></text-field>
              <div class="content-checkbox">
                <label>Giới tính</label>
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
              <text-field Label="Đơn vị" IsValidate="true"></text-field>
            </div>
            <div class="field-right">
              <text-field Label="Số CMND"></text-field>
              <text-field class="input-date" Label="Ngày cấp" Type="date"></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <div class="field-left">
              <text-field Label="Chức danh"></text-field>
            </div>
            <div class="field-right">
              <text-field Label="Nơi cấp"></text-field>
            </div>
          </div>

          <div class="dialog-content__field">
            <text-field Label="Địa chỉ"></text-field>
          </div>

          <div class="dialog-content__field" style="width: 75%">
            <text-field Label="ĐT di động"></text-field>
            <text-field Label="ĐT cố định"></text-field>
            <text-field Label="Email"></text-field>
          </div>
          <div class="dialog-content__field" style="width: 75%">
            <text-field Label="Tài khoản ngân hàng"></text-field>
            <text-field Label="Tên ngân hàng"></text-field>
            <text-field Label="Chi nhánh"></text-field>
          </div>
        </div>
        <div class="dialog__footer">
          <the-button class="btn btn-cancel" titleExtra="Hủy"></the-button>
          <div class="footer-right">
            <the-button class="btn btn-add" titleExtra="Cất"></the-button>
            <the-button class="btn btn-add-renew" titleExtra="Cất và Thêm"></the-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TheButton from '@/components/base/TheButton.vue';
import TextField from '@/components/base/input_field/TextField.vue';
import { EventBus } from '../i18n/i18nEventBus';
// import TheDropDown from '@/components/base/TheDropDown.vue';

export default {
  name: 'TheEmployee',
  components: {
    TheButton,
    TextField,
  },
  props: {
    // showEmployeeForm: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  emits: [],
  setup() {
    const count = ref(0);
    EventBus.$on('showEmployeeForm', this.handleCloseForm);
    return {
      count,
    };
  },
  methods: {
    handleCloseForm() {
      this.showEmployeeForm = !this.showEmployeeForm;
    },
  },
  data() {
    return {
      showEmployeeForm: false,
    };
  },
  mounted() {
    EventBus.$off('showEmployeeForm', this.showEmployeeForm);
  },
};
</script>

<style scoped>
@import url(../style/pages/employee.css);
</style>
