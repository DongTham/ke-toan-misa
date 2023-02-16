import employeeRequests from '@/js/utils/employeeRequests';
import departmentRequests from '@/js/utils/departmentRequests';
import { customizeDateTime } from '@/js/functions/convertDateTime';

const employeeStore = {
    state: () => ({
        showEmployeeForm: false,
        singleEmployee: {},
        departmentsList: [],
        titleHeader: '',
        handleAction: '',
        isModified: false,
        presentFocusInput: '',
    }),
    getters: {
        showEmployeeForm: (state) => state.showEmployeeForm,
        departmentsList: (state) => state.departmentsList,
        singleEmployee: (state) => state.singleEmployee,
        getTitleHeader: (state) => state.titleHeader,
        getHandleAction: (state) => state.handleAction,
        getIsModified: (state) => state.isModified,
        getPresentFocusInput: (state) => state.presentFocusInput,
    },
    actions: {
        /**
         * Lấy danh sách tất cả đơn vị
         * Author: NQDONG (10/11/2022)
         */
        async getAllDepartments({ commit }) {
            try {
                const response = await departmentRequests.getAll();
                commit('updateDepartmentsList', response.data);
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Lấy thông tin 1 nhân viên theo ID
         * @param {String} employeeId Mã nhân viên
         * Author: NQDONG (10/11/2022)
         */
        async getSingleEmployee({ commit }, employeeId) {
            try {
                const response = await employeeRequests.getByID(employeeId);
                response.data.DateOfBirth = customizeDateTime(response.data.DateOfBirth, 'YYYY-MM-DD');
                response.data.IdentityIssueDate = customizeDateTime(
                    response.data.IdentityIssueDate,
                    'YYYY-MM-DD',
                );
                commit('updateSingleEmployee', response.data);
            } catch (error) {
                return error;
            }
        },

        /**
         * Lấy mã nhân viên lớn nhất
         * Author: NQDONG (10/11/2022)
         */
        async getMaxRecord() {
            try {
                const response = await employeeRequests.getBiggestCode();
                let maxRecord = response.data.EmployeeCode;
                return (maxRecord + 1).toString().padStart(5, 0);
            } catch (error) {
                if (error.response.status == 404) {
                    return '00001';
                }
            }
        },
    },
    mutations: {
        updateShowEmployeeForm: (state, payload) => (state.showEmployeeForm = payload),
        updateDepartmentsList(state, payload) {
            state.departmentsList = JSON.parse(JSON.stringify(payload));
        },
        updateSingleEmployee: (state, payload) =>
            (state.singleEmployee = JSON.parse(JSON.stringify(payload))),
        updateTitleHeader: (state, payload) => (state.titleHeader = payload),
        updateHandleAction: (state, payload) => (state.handleAction = payload),
        updateIsModified: (state, payload) => (state.isModified = payload),
        updatePresentFocusInput: (state, payload) => (state.presentFocusInput = payload),
    },
};

export { employeeStore };