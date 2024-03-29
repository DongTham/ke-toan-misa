import employeeRequests from '@/js/utils/employeeRequests';

const contentStore = {
    state: () => ({
        employeesList: [],
        isCollapse: false,
        selectedEmployeeId: '',
        showProgress: true,
        filterAndPaging: {
            pageSize: 25,
            pageNumber: 1,
            totalRecords: 0,
            totalPages: 0,
            keyword: '',
            sort: 'EmployeeCode',
        },
    }),
    getters: {
        getEmployeesList: (state) => state.employeesList,
        getIsCollapse: (state) => state.isCollapse,
        getSelectedEmployeeId: (state) => state.selectedEmployeeId,
        getShowProgress: (state) => state.showProgress,
        getFilterAndPaging: (state) => state.filterAndPaging,
    },
    actions: {
        /**
         * Lấy danh sách nhân viên theo bộ lọc và phân trang
         * Author: NQDONG (10/11/2022)
         */
        async getEmployeesByPaging({ state, commit, dispatch }) {
            try {
                // const response = await axios.get(
                //     `https://localhost:7228/api/v1/Employees/filter?pageSize=${state.filterAndPaging.pageSize}&pageNumber=${state.filterAndPaging.pageNumber}&keyword=${state.filterAndPaging.keyword}&sort=${state.filterAndPaging.sort}&ids=${state.selectedEmployeeId}`,
                // );
                const response = await employeeRequests.getByFilterAndPaging(
                    state.filterAndPaging,
                    state.selectedEmployeeId,
                );
                return new Promise((resolve) => {
                    const data = response.data.dataResult;
                    const employeeList = data.Data;

                    if (employeeList.length == 0 && state.filterAndPaging.totalPages > data.totalPages) {
                        commit('updateFilterAndPaging', [{ pageNumber: 1 }]);
                        resolve(false);
                    } else {
                        commit('updateFilterAndPaging', [{ totalRecords: data.totalRecords }]);
                        commit('updateFilterAndPaging', [{ totalPages: data.totalPages }]);
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
                if (error.response.status == 404) {
                    commit('updateEmployeesList', []);
                } else {
                    return error;
                }
            }
        },

        /**
         * Cập nhật giá trị phóng to/thu nhỏ sidebar
         * Author: NQDONG (10/11/2022)
         */
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
        updateFilterAndPaging(state, payload) {
            payload.forEach((el) => {
                state.filterAndPaging[Object.keys(el)] = el[Object.keys(el)];
            });
        },
    },
};

export { contentStore };