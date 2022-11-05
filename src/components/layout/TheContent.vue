<template>
  <div class="main">
    <div class="main-header">
      <div class="main__header-wrapper">
        <div class="main__header-title">
          <span>Nhân viên</span>
        </div>
        <div class="main__header-add">
          <button v-on:click="handleShowEmployeeForm" class="btn btn-add">
            Thêm mới nhân viên
          </button>
        </div>
      </div>
    </div>
    <div class="main-body">
      <div class="main__body-function">
        <div class="function-left">
          <button class="btn batch-operation">
            <div class="button-text align-center">
              <span>Thực hiện hàng loạt</span>
              <div class="btn-icon btn-batch-operation"></div>
            </div>
          </button>
        </div>
        <div class="function-right">
          <div class="function__search">
            <input type="text" class="input-main" placeholder="Tìm theo mã, tên nhân viên" />
            <button class="btn-icon btn-search"></button>
          </div>
          <button class="btn-icon main__icon btn-reload"></button>
          <button class="btn-icon main__icon btn-export"></button>
          <button class="btn-icon main__icon btn-filter"></button>
        </div>
      </div>
      <div class="main__body-table">
        <table>
          <thead>
            <tr>
              <th class="ms-hidden"></th>
              <th class="ms-th-viewer ms-sticky">
                <input
                  type="checkbox"
                  @click="checkAllItems"
                  v-bind:checked="selectedEmpolyee.length == employeeList.length"
                />
              </th>
              <th class="ms-th-viewer" v-for="(item, index) in headerTableName" :key="index">
                {{ item.Name }}
              </th>
              <th class="ms-th-viewer ms-sticky">Chức năng</th>
              <th class="ms-hidden"></th>
              <th class="ms-hidden"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in employeeList" :key="index" v-bind:tabindex="index">
              <td class="ms-hidden"></td>
              <td class="ms-td-viewer ms-sticky">
                <input
                  type="checkbox"
                  @click="checkSingleItem(item.EmployeeId)"
                  v-bind:checked="isCheckItem(item.EmployeeId)"
                />
              </td>
              <td class="ms-td-viewer">{{ item.EmployeeCode }}</td>
              <td class="ms-td-viewer">{{ item.EmployeeName }}</td>
              <td class="ms-td-viewer">
                {{
                  item.Gender == 0
                    ? 'Nam'
                    : item.Gender == 1
                    ? 'Nữ'
                    : item.Gender == 2
                    ? 'Khác'
                    : item.Gender
                }}
              </td>
              <td class="ms-td-viewer">{{ convertFormatDate(item.DateOfBirth) }}</td>
              <td class="ms-td-viewer">{{ item.IdentityNumber }}</td>
              <td class="ms-td-viewer">{{ item.IdentityPlace }}</td>
              <td class="ms-td-viewer">{{ item.DepartmentName }}</td>
              <td class="ms-td-viewer">{{ item.BankAccountNumber }}</td>
              <td class="ms-td-viewer">{{ item.BankName }}</td>
              <td class="ms-td-viewer">{{ item.BankBranchName }}</td>
              <div class="combobox__data" v-show="showSelectContextMenu == index ? true : false">
                <div class="data-item">Nhân bản</div>
                <div class="data-item">Xóa</div>
                <div class="data-item">Ngừng sử dụng</div>
              </div>

              <td class="ms-td-viewer ms-sticky td-context-menu">
                <button class="btn-edit">Sửa</button>
                <the-button
                  class="btn-selectdown combobox__button"
                  @click="handleSelectContextMenu(index)"
                ></the-button>
              </td>
              <td class="ms-hidden"></td>
              <td class="ms-hidden"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="main__body-footer">
        <div class="body__footer-left">
          <p>
            Tổng số: <b>{{ numberRecords }}</b> bản ghi
          </p>
        </div>
        <div class="body__footer-right">
          <div class="combobox select-record">
            <input
              type="text"
              class="input-main combobox__input select__record-input"
              v-bind:value="pageSize + ' bản ghi trên 1 trang'"
              readonly
            />
            <button class="btn-selectdown combobox__button" @click="handleShowPageSize"></button>
            <div class="combobox__data" v-show="showSelectPageSize">
              <div
                class="data-item"
                v-for="(item, index) in selectPageSize"
                :key="index"
                @click="handleSelectPageSize(item.Value)"
                v-bind:class="item.Value == pageSize ? 'active-item' : ''"
              >
                {{ item.Value }} bản ghi trên 1 trang
              </div>
            </div>
          </div>

          <button
            class="btn btn-prev"
            v-bind:disabled="pageNumber == 1 ? disableButtonPrev : !disableButtonPrev"
            @click="handleChangePage(pageNumber - 1)"
          >
            Trước
          </button>
          <div class="pagination">
            <div
              class="btn-pagination"
              v-for="(item, index) in totalPages"
              :key="index"
              @click="handleChangePage(item)"
              v-bind:class="item == pageNumber ? 'active-item' : ''"
            >
              {{ item }}
            </div>
          </div>

          <button
            class="btn btn-next"
            v-bind:disabled="pageNumber == totalPages ? !disableButtonNext : disableButtonNext"
            @click="handleChangePage(pageNumber + 1)"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from '../base/TheButton.vue';
import { selectPageSize } from '../../i18n/i18nCommon';
import { headerTableName } from '../../i18n/i18nCommon';
import moment from 'moment';
import { EventBus } from '../../i18n/i18nEventBus';

export default {
  name: 'TheContent',
  components: {
    TheButton,
  },
  props: {},
  emits: ['showEmployeeForm'],
  created() {
    const me = this;
    me.getAllData();
  },
  methods: {
    getAllData() {
      const me = this;
      fetch(
        `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${me.pageSize}&pageNumber=${me.pageNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          me.employeeList = data.Data;
          me.numberRecords = data.TotalRecord;
          me.totalPages = data.TotalPage;
        })
        .catch((error) => {
          if (me.pageNumber != 1) {
            me.pageNumber = 1;
            me.getAllData();
          } else {
            console.log(error);
          }
        });
    },

    convertFormatDate(date) {
      return date ? moment(date).format('DD/MM/YYYY') : date;
    },

    isCheckItem(el) {
      const me = this;
      return me.selectedEmpolyee.includes(el);
    },

    checkAllItems() {
      const me = this;
      if (me.selectedEmpolyee.length == me.employeeList.length) {
        me.selectedEmpolyee.length = 0;
      } else {
        me.selectedEmpolyee.length = 0;
        me.employeeList.forEach((value) => me.selectedEmpolyee.push(value.EmployeeId));
      }
    },

    checkSingleItem(el) {
      const me = this;
      const index = me.selectedEmpolyee.indexOf(el);
      if (index > -1) {
        me.selectedEmpolyee.splice(index, 1);
      } else {
        me.selectedEmpolyee.push(el);
      }
    },

    handleShowPageSize() {
      const me = this;
      me.showSelectPageSize = me.showSelectPageSize ? false : true;
    },

    handleSelectPageSize(el) {
      const me = this;
      me.showSelectPageSize = false;
      me.selectedEmpolyee.length = 0;
      me.pageSize = el;
      me.getAllData();
    },

    handleChangePage(el) {
      const me = this;
      me.pageNumber = el;
      me.selectedEmpolyee.length = 0;
      me.getAllData();
    },

    handleSelectContextMenu(index) {
      const me = this;
      me.showSelectContextMenu = index;
    },

    handleShowEmployeeForm() {
      EventBus.$emit('showEmployeeForm', true);
    },
  },
  data() {
    return {
      showSelectPageSize: false,
      showSelectContextMenu: -1,
      employeeList: [],
      pageSize: 20,
      pageNumber: 1,
      numberRecords: 0,
      totalPages: 0,
      selectPageSize: selectPageSize,
      headerTableName: headerTableName,
      disableButtonPrev: true,
      disableButtonNext: false,
      selectedEmpolyee: [],
    };
  },
};
</script>

<style scoped>
@import url(../../style/main.css);
@import url(../../style/layout/footer.css);
</style>
