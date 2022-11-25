import axios from 'axios';

const contentStore = {
    state: () => ({
        employeesList: [],
        isCollapse: false,
        selectedEmployeeId: '',
        showProgress: true,
        pageSize: 25,
        pageNumber: 1,
        totalRecords: 0,
        totalPages: 0,
        keyword: '',
        sort: 'EmployeeCode',
    }),
    getters: {
        getEmployeesList: (state) => state.employeesList,
        getIsCollapse: (state) => state.isCollapse,
        getSelectedEmployeeId: (state) => state.selectedEmployeeId,
        getShowProgress: (state) => state.showProgress,
        getPageSize: (state) => state.pageSize,
        getPageNumber: (state) => state.pageNumber,
        getTotalRecords: (state) => state.totalRecords,
        getTotalPages: (state) => state.totalPages,
        getKeyword: (state) => state.keyword,
    },
    actions: {
        async getEmployeesByPaging({ state, commit, dispatch }) {
            try {
                const response = await axios.get(
                    `https://localhost:7228/api/v1/Employees/filter?pageSize=${state.pageSize}&pageNumber=${state.pageNumber}&keyword=${state.keyword}&sort=${state.sort}&ids=${state.selectedEmployeeId}`,
                );
                return new Promise((resolve) => {
                    const data = response.data.dataResult;
                    const employeeList = data.Data;

                    if (employeeList.length == 0 && state.totalPages > data.totalPages) {
                        commit('updatePageNumber', 1);
                        resolve(false);
                    } else {
                        commit('updateTotalRecords', data.totalRecords);
                        commit('updateTotalPages', data.totalPages);
                        resolve(true);
                    }

                    commit('updateEmployeesList', employeeList);
                }).then((data) => {
                    if (!data) {
                        return dispatch('getEmployeesByPaging');
                    } else {
                        return;
                    }
                });
            } catch (error) {
                return error;
            }
        },
        updateIsCollapse(context) {
            context.commit('updateIsCollapse');
        },
    },
    mutations: {
        updateEmployeesList(state, payload) {
            state.employeesList = JSON.parse(JSON.stringify(payload));
        },
        updateIsCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        updateSelectedEmployeeId(state, payload) {
            state.selectedEmployeeId = payload;
        },
        updateShowProgress(state, payload) {
            state.showProgress = payload;
        },
        updatePageSize(state, payload) {
            state.pageSize = payload;
        },
        updatePageNumber(state, payload) {
            state.pageNumber = payload;
        },
        updateTotalRecords(state, payload) {
            state.totalRecords = payload;
        },
        updateTotalPages(state, payload) {
            state.totalPages = payload;
        },
        updateKeyword(state, payload) {
            state.keyword = payload;
        },
    },
};

export { contentStore };