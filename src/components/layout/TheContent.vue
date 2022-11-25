<template>
  <div class="main">
    <div class="main-header">
      <div class="main__header-wrapper">
        <div class="main__header-title">
          <span>Nhân viên</span>
        </div>
        <div class="main__header-add">
          <button class="btn btn-add" @click="handleAddEmployee">Thêm mới nhân viên</button>
        </div>
      </div>
    </div>
    <div class="main-body">
      <div class="main__body-function">
        <div class="function-left" v-click-outside="handleHiddenActionMultiple">
          <button class="btn batch-operation" @click.stop="handleShowActionMultiple">
            <div class="button-text align-center">
              <span>Thực hiện hàng loạt</span>
              <div
                class="btn-icon btn-batch-operation btn-icon-disable"
                v-show="selectedEmployeeList.length == 0"
              ></div>
              <div
                class="btn-icon btn-batch-operation btn-icon-enable"
                v-show="selectedEmployeeList.length > 0"
              ></div>
            </div>
          </button>
          <div
            class="combobox__data"
            v-show="showActionMultiple && selectedEmployeeList.length > 0"
          >
            <div class="data-item" @click="handleDeleteMultipleEmployees">Xoá</div>
          </div>
          <div class="function-left__count__selected" v-if="selectedEmployeeList.length > 0">
            <p>
              Đã chọn: <b>{{ selectedEmployeeList.length }}</b> bản ghi
            </p>
          </div>
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
            <button @click="getEmployeesByFilterAndPaging" class="btn-icon btn-search">
              <v-tooltip text="Tìm kiếm" activator="parent" location="bottom"></v-tooltip>
            </button>
          </div>

          <button class="btn-icon main__icon btn-reload" @click="refreshEmployeesList">
            <v-tooltip text="Load lại dữ liệu" activator="parent" location="bottom"></v-tooltip>
          </button>

          <a v-bind:href="exportToExcel"
            ><button class="btn-icon main__icon btn-export">
              <v-tooltip
                text="Xuất khẩu file Excel"
                activator="parent"
                location="bottom"
              ></v-tooltip></button
          ></a>
          <!-- <button class="btn-icon main__icon btn-filter"></button> -->
        </div>
      </div>
      <div class="main__body-table">
        <table>
          <thead>
            <tr>
              <th class="ms-hidden"></th>
              <th class="ms-th-viewer ms-sticky">
                <input type="checkbox" @click="checkAllItems" v-bind:checked="isCheckedAll" />
                <v-tooltip
                  :text="(isCheckedAll ? 'Bỏ chọn' : 'Chọn') + ' tất cả'"
                  activator="parent"
                  location="bottom"
                ></v-tooltip>
              </th>
              <th class="ms-th-viewer" v-for="(item, index) in headerTableName" :key="index">
                <v-tooltip
                  :disabled="item.Tooltip == ''"
                  :text="item.Tooltip"
                  activator="parent"
                  location="bottom"
                ></v-tooltip>
                {{ item.Name }}
              </th>
              <th class="ms-th-viewer ms-sticky">Chức năng</th>
              <th class="ms-hidden"></th>
              <th class="ms-hidden"></th>
            </tr>
          </thead>
          <tbody v-if="employeesList.length > 0">
            <tr
              v-for="(item, index) in employeesList"
              :key="index"
              v-bind:tabindex="index"
              @dblclick.stop="handleEditEmployee(item.EmployeeID)"
            >
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
                {{ convertGenderVietNamese(item.Gender) }}
              </td>
              <td class="ms-td-viewer">{{ customizeDateTime(item.DateOfBirth) }}</td>
              <td class="ms-td-viewer">{{ item.IdentityNumber }}</td>
              <td class="ms-td-viewer">{{ item.IdentityIssuePlace }}</td>
              <td class="ms-td-viewer">{{ item.DepartmentName }}</td>
              <td class="ms-td-viewer">{{ item.BankAccountNumber }}</td>
              <td class="ms-td-viewer">{{ item.BankName }}</td>
              <td class="ms-td-viewer">{{ item.BankBranchName }}</td>
              <td class="ms-td-viewer ms-sticky td-context-menu">
                <the-button
                  class="btn-edit"
                  @click.stop="handleEditEmployee(item.EmployeeID)"
                  titleHeader="Sửa"
                ></the-button>
                <the-button
                  class="btn-selectdown combobox__button"
                  @click.stop="handleShowSelectContextMenu(index)"
                >
                </the-button>
                <div class="combobox__data" v-show="showSelectContextMenu == index ? true : false">
                  <div class="data-item" @click="handleCloneEmployee(item.EmployeeID)">
                    Nhân bản
                  </div>
                  <div
                    class="data-item"
                    @click="handleDeleteEmployee(item.EmployeeID, item.EmployeeCode)"
                  >
                    Xóa
                  </div>
                  <!-- <div class="data-item">Ngừng sử dụng</div> -->
                </div>
              </td>
              <td class="ms-hidden"></td>
              <td class="ms-hidden"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="main__body-no-data" v-show="employeesList.length == 0">
        <p>Không có bản ghi nhân viên nào</p>
        <button class="btn btn-add" @click="handleAddEmployee">Thêm mới nhân viên</button>
      </div>
      <div class="main__body-footer">
        <div class="body__footer-left">
          <p>
            Tổng số: <b>{{ totalRecords }}</b> bản ghi
          </p>
        </div>
        <div class="body__footer-right">
          <div class="select-record" v-click-outside="handleHiddenSelectPageSize">
            <p class="records-per-page-text">Số bản ghi/trang:</p>
            <p class="records-per-page-number">
              {{ pageSize }}
            </p>
            <button class="btn-icon btn-selectdown" @click="handleShowSelectPageSize">
              <v-tooltip text="Chọn số bản ghi" activator="parent" location="top"></v-tooltip>
            </button>
            <div class="select__record-data" v-show="showSelectPageSize">
              <div
                class="data-item"
                v-for="(item, index) in selectPageSize"
                :key="index"
                @click="handleSelectPageSize(item.Value)"
                v-bind:class="item.Value == pageSize ? 'active-item' : ''"
              >
                {{ item.Value }}
              </div>
            </div>
          </div>
          <div>
            <p>
              <b>{{ numberRecordsStart }}</b> - <b>{{ numberRecordsEnd }}</b> bản ghi
            </p>
          </div>

          <button
            class="btn-icon"
            v-bind:class="pageNumber == 1 ? 'btn-prev-disable' : 'btn-prev-active'"
            v-bind:disabled="pageNumber == 1 ? true : false"
            @click="handleChangePage(pageNumber - 1)"
          >
            <v-tooltip
              text="Trước"
              :disabled="pageNumber == 1 ? true : false"
              activator="parent"
              location="top"
            ></v-tooltip>
          </button>
          <button
            class="btn-icon"
            v-bind:class="pageNumber >= totalPages ? 'btn-next-disable' : 'btn-next-active'"
            v-bind:disabled="pageNumber >= totalPages ? true : false"
            @click="handleChangePage(pageNumber + 1)"
          >
            <v-tooltip
              :disabled="pageNumber >= totalPages ? true : false"
              text="Sau"
              activator="parent"
              location="top"
            ></v-tooltip>
          </button>
        </div>
      </div>
    </div>
  </div>
  <employee-dialog v-if="isShowEmployeeDialog"></employee-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import TheButton from '../base/TheButton.vue';
import EmployeeDialog from '../../views/EmployeeDialog.vue';
import { selectPageSize, headerTableName } from '../../i18n/i18nEmployeeTable';
import { employeeDialogDetail } from '../../i18n/i18nEmployeeDialogDetail';
import { customizeDateTime } from '@/js/funtions/convertDateTime';
import { convertGenderVietNamese } from '@/js/funtions/convertGender';
import { titleHeaderEmployeeForm, handleActionEmployeeForm } from '../../i18n/i18nEmployeeDetail';
import axios from 'axios';

const showSelectPageSize = ref(false);
const showSelectContextMenu = ref();
const showActionMultiple = ref(false);
const isShowEmployeeDialog = computed(() => store.getters.getIsShowEmployeeDialog);
const selectedEmployeeList = reactive([]);

const exportToExcel = ref('https://localhost:7228/api/v1/Employees/exportAllRecord');

const store = useStore();

const employeesList = computed(() => store.getters.getEmployeesList);
const pageSize = computed(() => store.getters.getPageSize);
const pageNumber = computed(() => store.getters.getPageNumber);
const totalRecords = computed(() => store.getters.getTotalRecords);
const totalPages = computed(() => store.getters.getTotalPages);
const keyword = computed({
  get() {
    return store.getters.getKeyword;
  },
  set(el) {
    store.commit('updateKeyword', el);
  },
});

const numberRecordsStart = computed(() => pageSize.value * (pageNumber.value - 1) + 1);
const numberRecordsEnd = computed(() => employeesList.value.length + numberRecordsStart.value - 1);
const isCheckedAll = computed(
  () =>
    employeesList.value.filter((item) => !selectedEmployeeList.includes(item.EmployeeID)).length ==
      0 && employeesList.value.length > 0,
);

const refreshEmployeesList = async () => {
  store.commit('updateShowProgress', true);
  store.commit('updatePageSize', 25);
  store.commit('updatePageNumber', 1);
  store.commit('updateKeyword', '');
  store.commit('updateSelectedEmployeeId', '');

  selectedEmployeeList.length = 0;
  await getEmployeesByFilterAndPaging();
};

const getEmployeesByFilterAndPaging = async () => {
  store.commit('updateShowProgress', true);
  store.commit('updateKeyword', keyword.value);
  await store.dispatch('getEmployeesByPaging').then(() => {
    store.commit('updateShowProgress', false);
  });
};

getEmployeesByFilterAndPaging();

const handleOpenEmployeeForm = () => {
  store.dispatch('handleCloseOrOpenEmployeeForm', true);
  store.commit('updateIsModified', false);
  store.commit('updateShowProgress', false);
};

const isCheckItem = (el) => {
  return selectedEmployeeList.includes(el);
};

const checkAllItems = () => {
  if (isCheckedAll.value) {
    for (let i = 0; i <= selectedEmployeeList.length - 1; i++) {
      if (employeesList.value.some((el) => el.EmployeeID == selectedEmployeeList.at(i))) {
        selectedEmployeeList.splice(i, 1);
        i--;
      }
    }
    isCheckedAll.value = false;
  } else {
    employeesList.value.forEach((value) => {
      if (!selectedEmployeeList.includes(value.EmployeeID)) {
        selectedEmployeeList.push(value.EmployeeID);
      }
    });
    isCheckedAll.value = true;
  }
};

const checkSingleItem = (el) => {
  const index = selectedEmployeeList.indexOf(el);
  if (index > -1) {
    selectedEmployeeList.splice(index, 1);
  } else {
    selectedEmployeeList.push(el);
  }
};
const handleShowSelectPageSize = () => {
  showSelectPageSize.value = showSelectPageSize.value ? false : true;
};

const handleHiddenSelectPageSize = () => {
  showSelectPageSize.value = false;
};

const handleShowActionMultiple = () => {
  if (selectedEmployeeList.length > 0) {
    showActionMultiple.value = !showActionMultiple.value;
  }
};

const handleHiddenActionMultiple = () => {
  showActionMultiple.value = false;
};

const handleSelectPageSize = (el) => {
  store.commit('updateShowProgress', true);
  showSelectPageSize.value = false;
  //selectedEmployeeList.length = 0;
  store.commit('updatePageSize', el);
  getEmployeesByFilterAndPaging();
};

const handleChangePage = (el) => {
  store.commit('updateShowProgress', true);
  store.commit('updatePageNumber', el);
  //selectedEmployeeList.length = 0;
  getEmployeesByFilterAndPaging();
};

const handleShowSelectContextMenu = (index) => {
  if (showSelectContextMenu.value == index) {
    showSelectContextMenu.value = null;
  } else {
    showSelectContextMenu.value = index;
  }
};

const handleAddEmployee = async () => {
  store.commit('updateShowProgress', true);
  store.commit('updateTitleHeader', titleHeaderEmployeeForm.AddNew);
  store.commit('updateHandleAction', handleActionEmployeeForm.AddNew);
  await store.dispatch('getMaxRecord').then((maxRecord) => {
    let selectedEmployee = computed(() => store.getters.singleEmployee);
    selectedEmployee.value.EmployeeCode = 'NV' + maxRecord;
    employeesList.value.unshift(selectedEmployee.value);
  });

  await handleOpenEmployeeForm();
};

const handleEditEmployee = async (employeeId) => {
  store.commit('updateShowProgress', true);
  store.commit('updateTitleHeader', titleHeaderEmployeeForm.Edit);
  store.commit('updateHandleAction', handleActionEmployeeForm.Edit);
  await store.dispatch('getSingleEmployee', employeeId);
  await handleOpenEmployeeForm();
};

const handleCloneEmployee = async (employeeId) => {
  await store.dispatch('getSingleEmployee', employeeId);
  await handleAddEmployee();
};

const handleDeleteEmployee = async (employeeId, EmployeeCode) => {
  showSelectContextMenu.value = null;
  const DeleteDialog = employeeDialogDetail(EmployeeCode).ConfirmDelete;

  store.commit('updateContentEmployeeDialog', DeleteDialog);
  store.commit('updateSelectedEmployeeId', employeeId);
  store.commit('updateIsShowEmployeeDialog', true);

  // try {
  //   store.commit('updateShowProgress', true);
  //   await axios.delete(`https://localhost:7228/api/v1/Employees/${employeeId}`);
  //   await refreshEmployeesList();
  //   showSelectContextMenu.value = null;
  // } catch (error) {
  //   console.log(error);
  // }
};

const handleDeleteMultipleEmployees = async () => {
  try {
    store.commit('updateShowProgress', true);
    await axios.post('https://localhost:7228/api/v1/Employees/deleteBatch', {
      EmployeeIDs: selectedEmployeeList,
    });
    await refreshEmployeesList();
    selectedEmployeeList.length = 0;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
@import url(../../style/main.css);
@import url(../../style/layout/footer.css);
</style>
