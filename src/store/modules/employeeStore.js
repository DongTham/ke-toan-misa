import axios from 'axios';
import { customizeDateTime } from '@/js/funtions/convertDateTime';

const employeeStore = {
    state: () => ({
        showEmployeeForm: false,
        singleEmployee: {},
        departmentsList: [],
        titleHeader: '',
        handleAction: '',
        isModified: false,
    }),
    getters: {
        showEmployeeForm: (state) => state.showEmployeeForm,
        departmentsList: (state) => state.departmentsList,
        singleEmployee: (state) => state.singleEmployee,
        getTitleHeader: (state) => state.titleHeader,
        getHandleAction: (state) => state.handleAction,
        getIsModified: (state) => state.isModified,
    },
    actions: {
        async getAllDepartments({ commit }) {
            try {
                const response = await axios.get('https://localhost:7228/api/v1/Departments');
                commit('updateDepartmentsList', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        handleCloseOrOpenEmployeeForm({ commit }, payload) {
            commit('updateShowEmployeeForm', payload);
        },

        async getSingleEmployee({ commit }, employeeId) {
            try {
                const response = await axios.get(`https://localhost:7228/api/v1/Employees/${employeeId}`);
                response.data.DateOfBirth = customizeDateTime(response.data.DateOfBirth, 'YYYY-MM-DD');
                response.data.IdentityIssueDate = customizeDateTime(
                    response.data.IdentityIssueDate,
                    'YYYY-MM-DD',
                );
                commit('updateSingleEmployee', response.data);
            } catch (error) {
                console.log(error);
            }
        },

        async getMaxRecord() {
            try {
                const response = await axios.get('https://localhost:7228/api/v1/Employees/maxRecord');
                let maxRecord = response.data[0].EmployeeCode;
                maxRecord = parseInt(maxRecord.replace('NV', '')) + 1;
                return maxRecord;
            } catch (error) {
                console.log(error);
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
    },
};

export { employeeStore };