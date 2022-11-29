<template>
  <div class="main">
    <div class="main-header">
      <div class="main__header-wrapper">
        <div class="main__header-title">
          <span>Nhân viên</span>
        </div>
        <div class="main__header-add">
          <button class="btn btn-add" @click="openFormAddEmployee">Thêm mới nhân viên</button>
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
              v-model="filterAndPaging.keyword"
              @keypress.enter="getEmployeesByFilterAndPaging"
              class="input-main"
              placeholder="Tìm theo mã, tên nhân viên"
            />
            <button @click="getEmployeesByFilterAndPaging" class="btn-icon btn-search">
              <v-tooltip text="Tìm kiếm" activator="parent" location="bottom"></v-tooltip>
            </button>
          </div>

          <button class="btn-icon main__icon btn-reload" @click="refreshEmployeesList">
            <v-tooltip text="Tải lại dữ liệu" activator="parent" location="bottom"></v-tooltip>
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
          <tbody v-if="employeesList.length > 0" v-click-outside="handleHiddenContextMenu">
            <tr
              v-for="(item, index) in employeesList"
              :key="index"
              v-bind:tabindex="index"
              @dblclick.stop="openFormEditEmployee(item.EmployeeID)"
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
                  @click.stop="openFormEditEmployee(item.EmployeeID)"
                  titleHeader="Sửa"
                ></the-button>
                <the-button
                  class="btn-selectdown combobox__button"
                  @click.stop="handleShowSelectContextMenu(index)"
                >
                </the-button>
                <div class="combobox__data" v-show="showSelectContextMenu == index ? true : false">
                  <div class="data-item" @click="openFormCloneEmployee(item.EmployeeID)">
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
        <button class="btn btn-add" @click="openFormAddEmployee">Thêm mới nhân viên</button>
      </div>
      <div class="main__body-footer">
        <div class="body__footer-left">
          <p>
            Tổng số: <b>{{ filterAndPaging.totalRecords }}</b> bản ghi
          </p>
        </div>
        <div class="body__footer-right">
          <div class="select-record" v-click-outside="handleHiddenSelectPageSize">
            <p class="records-per-page-text">Số bản ghi/trang:</p>
            <p class="records-per-page-number">
              {{ filterAndPaging.pageSize }}
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
                v-bind:class="item.Value == filterAndPaging.pageSize ? 'active-item' : ''"
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
            v-bind:class="filterAndPaging.pageNumber == 1 ? 'btn-prev-disable' : 'btn-prev-active'"
            v-bind:disabled="filterAndPaging.pageNumber == 1 ? true : false"
            @click="handleChangePage(filterAndPaging.pageNumber - 1)"
          >
            <v-tooltip
              text="Trước"
              :disabled="filterAndPaging.pageNumber == 1 ? true : false"
              activator="parent"
              location="top"
            ></v-tooltip>
          </button>
          <button
            class="btn-icon"
            v-bind:class="
              filterAndPaging.pageNumber >= filterAndPaging.totalPages
                ? 'btn-next-disable'
                : 'btn-next-active'
            "
            v-bind:disabled="
              filterAndPaging.pageNumber >= filterAndPaging.totalPages ? true : false
            "
            @click="handleChangePage(filterAndPaging.pageNumber + 1)"
          >
            <v-tooltip
              :disabled="filterAndPaging.pageNumber >= filterAndPaging.totalPages ? true : false"
              text="Sau"
              activator="parent"
              location="top"
            ></v-tooltip>
          </button>
        </div>
      </div>
    </div>
  </div>
  <employee-dialog
    v-if="isShowEmployeeDialog"
    @refresh-event="getEmployeesByFilterAndPaging"
    @refresh-selected-employees="refreshSelectedEmployees"
    :selectedEmployees="selectedEmployeeList"
  ></employee-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import TheButton from '../base/TheButton.vue';
import EmployeeDialog from '@/views/EmployeeDialog.vue';
import { selectPageSize, headerTableName } from '@/i18n/i18nEmployeeTable';
import { customizeDateTime } from '@/js/funtions/convertDateTime';
import { convertGenderVietNamese } from '@/js/funtions/convertGender';
import { handleActionEmployeeForm } from '@/i18n/i18nEmployeeDetail';

const showSelectPageSize = ref(false);
const showSelectContextMenu = ref(null);
const showActionMultiple = ref(false);
const selectedEmployeeList = reactive([]);
const exportToExcel = ref('https://localhost:7228/api/v1/Employees/exportAllRecord');

const store = useStore();

const employeesList = computed(() => store.getters.getEmployeesList);
const isShowEmployeeDialog = computed(() => store.getters.getIsShowEmployeeDialog);
const filterAndPaging = computed(() => store.getters.getFilterAndPaging);

/**
 * Tính chỉ mục bản ghi bắt đầu của trang hiện tại
 * Author: NQDONG (10/11/2022)
 */
const numberRecordsStart = computed(
  () =>
    filterAndPaging.value.pageSize * (filterAndPaging.value.pageNumber - 1) +
    (filterAndPaging.value.totalRecords == 0 ? 0 : 1),
);

/**
 * Tính chỉ mục bản ghi kết thúc của trang hiện tại
 * Author: NQDONG (10/11/2022)
 */
const numberRecordsEnd = computed(
  () =>
    employeesList.value.length +
    numberRecordsStart.value -
    (filterAndPaging.value.totalRecords == 0 ? 0 : 1),
);

/**
 * Kiểm tra có phải chọn tất cả hay không
 * Author: NQDONG (10/11/2022)
 */
const isCheckedAll = computed(
  () =>
    employeesList.value.filter((item) => !selectedEmployeeList.includes(item.EmployeeID)).length ==
      0 && employeesList.value.length > 0,
);

/**
 * Làm mới danh sách nhân viên đã chọn
 * Author: NQDONG (10/11/2022)
 */
const refreshSelectedEmployees = () => {
  selectedEmployeeList.length = 0;
};

/**
 * Làm mới danh sách nhân viên theo bộ lọc và phân trang mặc định
 * Author: NQDONG (10/11/2022)
 */
const refreshEmployeesList = async () => {
  store.commit('updateFilterAndPaging', [
    { pageSize: 25 },
    { pageNumber: 1 },
    { totalRecords: 0 },
    { totalPages: 0 },
    { keyword: '' },
  ]);

  refreshSelectedEmployees();
  await getEmployeesByFilterAndPaging();
};

/**
 * Lấy danh sách nhân viên theo bộ lọc và phân trang
 * Author: NQDONG (10/11/2022)
 */
const getEmployeesByFilterAndPaging = async () => {
  store.commit('updateShowProgress', true);

  // Lấy danh sách nhân viên qua store
  await store.dispatch('getEmployeesByPaging').finally(() => {
    store.commit('updateShowProgress', false);
  });
};

getEmployeesByFilterAndPaging();

/**
 * Mở form chi tiết nhân viên
 * Author: NQDONG (10/11/2022)
 */
const handleOpenEmployeeForm = () => {
  store.commit('updateShowEmployeeForm', true);
  store.commit('updateIsModified', false);
  store.commit('updateShowProgress', false);
};

/**
 * Kiểm tra bản ghi đã có trong danh sách đã chọn hay chưa
 * @param {String} el ID nhân viên
 * Author: NQDONG (10/11/2022)
 */
const isCheckItem = (el) => {
  return selectedEmployeeList.includes(el);
};

/**
 * Thêm/Bỏ tất cả bản ghi của trang hiện tại vào danh sách đã chọn
 * Author: NQDONG (10/11/2022)
 */
const checkAllItems = () => {
  if (isCheckedAll.value) {
    for (let i = 0; i <= selectedEmployeeList.length - 1; i++) {
      // Kiểm tra bản ghi trong danh sách đã chọn có tồn tại trong danh sách của trang hiện tại hay không
      if (employeesList.value.some((el) => el.EmployeeID == selectedEmployeeList.at(i))) {
        selectedEmployeeList.splice(i, 1);
        i--;
      }
    }
    isCheckedAll.value = false;
  } else {
    employeesList.value.forEach((value) => {
      // Kiểm tra bản ghi danh sách của trang hiện tại  có tồn tại trong trong danh sách đã chọn hay không
      if (!selectedEmployeeList.includes(value.EmployeeID)) {
        selectedEmployeeList.push(value.EmployeeID);
      }
    });
    isCheckedAll.value = true;
  }
};

/**
 * Thêm 1 bản ghi nhân viên vào danh sách đã chọn
 * @param {String} el ID nhân viên
 * Author: NQDONG (10/11/2022)
 */
const checkSingleItem = (el) => {
  const index = selectedEmployeeList.indexOf(el);
  if (index > -1) {
    selectedEmployeeList.splice(index, 1);
  } else {
    selectedEmployeeList.push(el);
  }
};

/**
 * Hiện dropdown chọn bản ghi trong 1 trang
 * Author: NQDONG (10/11/2022)
 */
const handleShowSelectPageSize = () => {
  showSelectPageSize.value = showSelectPageSize.value ? false : true;
};

/**
 * Ẩn dropdown chọn bản ghi trong 1 trang
 * Author: NQDONG (10/11/2022)
 */
const handleHiddenSelectPageSize = () => {
  showSelectPageSize.value = false;
};

/**
 * Chọn số bản ghi trong 1 trang
 * @param {Number} el Số bản ghi trong 1 trang
 * Author: NQDONG (10/11/2022)
 */
const handleSelectPageSize = (el) => {
  store.commit('updateShowProgress', true);
  showSelectPageSize.value = false;
  store.commit('updateFilterAndPaging', [{ pageSize: el }]);

  getEmployeesByFilterAndPaging();
};

/**
 * Hiện thao tác hàng loạt
 * Author: NQDONG (10/11/2022)
 */
const handleShowActionMultiple = () => {
  if (selectedEmployeeList.length > 0) {
    showActionMultiple.value = !showActionMultiple.value;
  }
};

/**
 * Ẩn thao tác hàng loạt
 * Author: NQDONG (10/11/2022)
 */
const handleHiddenActionMultiple = () => {
  showActionMultiple.value = false;
};

/**
 * Chuyển trang
 * @param {Number} el Chỉ mục của trang bản ghi
 * Author: NQDONG (10/11/2022)
 */
const handleChangePage = (el) => {
  store.commit('updateShowProgress', true);
  store.commit('updateFilterAndPaging', [{ pageNumber: el }]);

  getEmployeesByFilterAndPaging();
};

/**
 * Hiện menu ở cột chức năng
 * @param {Number} index Chỉ mục của hàng
 * Author: NQDONG (10/11/2022)
 */
const handleShowSelectContextMenu = (index) => {
  if (showSelectContextMenu.value == index) {
    showSelectContextMenu.value = null;
  } else {
    showSelectContextMenu.value = index;
  }
};

/**
 * Ẩn menu ở cột chức năng
 * Author: NQDONG (10/11/2022)
 */
const handleHiddenContextMenu = () => {
  showSelectContextMenu.value = null;
};

/**
 * Cập nhật loại thao tác và lấy mã lớn nhất
 * Author: NQDONG (10/11/2022)
 */
const renewEmployeeCode = async () => {
  store.commit('updateTitleHeader', handleActionEmployeeForm.AddNew.Title);
  store.commit('updateHandleAction', handleActionEmployeeForm.AddNew.Action);

  // Lấy mã lớn nhất từ store
  await store.dispatch('getMaxRecord').then((maxRecord) => {
    let selectedEmployee = store.getters.singleEmployee;
    selectedEmployee.EmployeeCode = 'NV' + maxRecord;

    // Đưa nhân viên đang chọn lên đầu danh sách nhân viên
    employeesList.value.unshift(selectedEmployee);
  });
};

/**
 * Mở form thêm mới nhân viên
 * Author: NQDONG (10/11/2022)
 */
const openFormAddEmployee = async () => {
  store.commit('updateShowProgress', true);
  await renewEmployeeCode();
  handleOpenEmployeeForm();
};

/**
 * Mở form nhân bản nhân viên
 * @param {String} employeeId ID nhân viên
 * Author: NQDONG (10/11/2022)
 */
const openFormCloneEmployee = async (employeeId) => {
  store.commit('updateShowProgress', true);

  // Lấy thông tin 1 nhân viên theo ID qua store
  await store.dispatch('getSingleEmployee', employeeId);

  await renewEmployeeCode();
  handleOpenEmployeeForm();
};

/**
 * Mở form sửa nhân viên
 * @param {String} employeeId ID nhân viên
 * Author: NQDONG (10/11/2022)
 */
const openFormEditEmployee = async (employeeId) => {
  store.commit('updateShowProgress', true);
  store.commit('updateTitleHeader', handleActionEmployeeForm.Edit.Title);
  store.commit('updateHandleAction', handleActionEmployeeForm.Edit.Action);

  // Lấy thông tin 1 nhân viên theo ID qua store
  await store.dispatch('getSingleEmployee', employeeId);

  handleOpenEmployeeForm();
};

/**
 * Xóa 1 nhân viên
 * @param {String} employeeId ID nhân viên
 * @param {String} employeeCode Mã nhân viên
 * Author: NQDONG (10/11/2022)
 */
const handleDeleteEmployee = (employeeId, employeeCode) => {
  // Cập nhật giá trị selectedEmployeeId qua store
  store.commit('updateSelectedEmployeeId', employeeId);

  // Mở dialog xác nhận qua store
  store.dispatch('openEmployeeDialog', { Msg: { Code: employeeCode }, Type: 'ConfirmDelete' });
};

/**
 * Xóa nhiều nhân viên đã chọn
 * Author: NQDONG (10/11/2022)
 */
const handleDeleteMultipleEmployees = () => {
  // Mở dialog xác nhận qua store
  store.dispatch('openEmployeeDialog', { Type: 'ConfirmDeleteMultiple' });
};
</script>

<style scoped>
@import url(../../style/main.css);
@import url(../../style/layout/footer.css);
</style>
