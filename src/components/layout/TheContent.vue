<template>
  <div class="main">
    <div class="main-header">
      <div class="main__header-wrapper">
        <div class="main__header-title">
          <span>Nhân viên</span>
        </div>
        <div class="main__header-add">
          <button class="btn btn-add" @click="handleOpenEmployeeForm">Thêm mới nhân viên</button>
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
            <input
              type="text"
              v-model="keyword"
              @keypress.enter="getEmployeesByFilterAndPaging"
              class="input-main"
              placeholder="Tìm theo mã, tên nhân viên"
            />
            <button @click="getEmployeesByFilterAndPaging" class="btn-icon btn-search"></button>
          </div>
          <button class="btn-icon main__icon btn-reload" @click="refreshEmployeesList"></button>
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
                  v-bind:checked="selectedEmpolyee.length == employeesList.length"
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
            <tr v-for="(item, index) in employeesList" :key="index" v-bind:tabindex="index">
              <td class="ms-hidden"></td>
              <td class="ms-td-viewer ms-sticky">
                <input
                  type="checkbox"
                  @click="checkSingleItem(item.EmployeeID)"
                  v-bind:checked="isCheckItem(item.EmployeeID)"
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
              <td class="ms-td-viewer">{{ customizeDateTime(item.DateOfBirth) }}</td>
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
            Tổng số: <b>{{ totalRecords }}</b> bản ghi
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

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import TheButton from '../base/TheButton.vue';
import { selectPageSize } from '../../i18n/i18nCommon';
import { headerTableName } from '../../i18n/i18nCommon';
import { customizeDateTime } from '@/js/funtions/convertDateTime';

const showSelectPageSize = ref(false);
const showSelectContextMenu = ref();
const pageSize = ref(20);
const pageNumber = ref(1);
const totalRecords = ref(0);
const totalPages = ref(0);
const keyword = ref('');
const disableButtonPrev = ref(true);
const disableButtonNext = ref(false);
const selectedEmpolyee = ref([]);

const store = useStore();

const refreshEmployeesList = () => {
  pageSize.value = 20;
  pageNumber.value = 1;
  keyword.value = '';
  getEmployeesByFilterAndPaging();
};

const getEmployeesByFilterAndPaging = () => {
  store
    .dispatch('getDepartmentsByPaging', { pageSize, pageNumber, keyword })
    .then((data) => {
      totalRecords.value = data.totalRecords;
      totalPages.value = data.totalPages;
    })
    .catch((error) => {
      console.log(error);
    });
};

getEmployeesByFilterAndPaging();

const handleOpenEmployeeForm = () => {
  store.dispatch('handleCloseOrOpenEmployeeForm', true);
};

const employeesList = computed(() => store.getters.employeesList);

const isCheckItem = (el) => {
  return selectedEmpolyee.value.includes(el);
};

const checkAllItems = () => {
  if (selectedEmpolyee.value.length == employeesList.value.length) {
    selectedEmpolyee.value.length = 0;
  } else {
    selectedEmpolyee.value.length = 0;
    employeesList.value.forEach((value) => selectedEmpolyee.value.push(value.EmployeeID));
  }
};

const checkSingleItem = (el) => {
  const index = selectedEmpolyee.value.indexOf(el);
  if (index > -1) {
    selectedEmpolyee.value.splice(index, 1);
  } else {
    selectedEmpolyee.value.push(el);
  }

  //const b = {...a};
  //const b = Object.assign({}, a);
  //const b = JSON.parse(JSON.stringify(a));
};

const handleShowPageSize = () => {
  showSelectPageSize.value = showSelectPageSize.value ? false : true;
};

const handleSelectPageSize = (el) => {
  showSelectPageSize.value = false;
  selectedEmpolyee.value.length = 0;
  pageSize.value = el;
  getEmployeesByFilterAndPaging();
};

const handleChangePage = (el) => {
  pageNumber.value = el;
  selectedEmpolyee.value.length = 0;
  getEmployeesByFilterAndPaging();
};

const handleSelectContextMenu = (index) => {
  showSelectContextMenu.value = index;
};
</script>

<style scoped>
@import url(../../style/main.css);
@import url(../../style/layout/footer.css);
</style>
