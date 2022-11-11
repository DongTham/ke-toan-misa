<template>
  <div class="sidebar">
    <div>
      <div class="sidebar-logo">
        <the-button class="btn-icon header__icon sidebar__logo-option"></the-button>
        <a href="#"
          ><img
            src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
            alt=""
            class="sidebar__logo-img"
        /></a>
      </div>
      <div class="sidebar-menu">
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon overview-icon"
            titleExtra="Tổng quan"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon cash-icon"
            titleExtra="Tiền mặt"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon deposits-icon"
            titleExtra="Tiền gửi"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon purchase-icon"
            titleExtra="Mua hàng"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon sell-icon"
            titleExtra="Bán hàng"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon invoice-icon"
            titleExtra="Quản lý hóa đơn"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon warehouse-icon"
            titleExtra="Kho"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon tools-icon"
            titleExtra="Công cụ dụng cụ"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon asset-icon"
            titleExtra="Tài sản cố định"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon tax-icon"
            titleExtra="Thuế"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon price-icon"
            titleExtra="Giá thành"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon synthetic-icon"
            titleExtra="Tổng hợp"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon budget-icon"
            titleExtra="Ngân sách"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon report-icon"
            titleExtra="Báo cáo"
          ></the-button>
        </div>
        <div class="sidebar__menu-item">
          <the-button
            class="menu-button"
            buttonIconClass="btn-icon menu__button-icon finance-icon"
            titleExtra="Phân tích tài chính"
          ></the-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TheButton from '../base/TheButton.vue';

export default {
  name: 'TheContent',
  components: {
    TheButton,
  },
  props: {},
  emits: [],
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
  methods: {},
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style>
@import url(../../style/layout/sidebar.css);
</style>
