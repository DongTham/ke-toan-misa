import axios from 'axios';

const contentStore = {
    state: () => ({
        employeesList: [],
        isCollapse: false,
    }),
    getters: {
        employeesList: (state) => state.employeesList,
        getIsCollapse: (state) => state.isCollapse,
    },
    actions: {
        async getEmployeessByPaging(context, payload) {
            try {
                const response = await axios.get(
                    `https://localhost:44369/api/v1/Employees/filter?pageSize=${payload.pageSize.value}&pageNumber=${payload.pageNumber.value}&keyword=${payload.keyword.value}`,
                );

                const data = response.data.dataResult;
                context.commit('updateEmployeesList', data.Data);
                const totalRecords = data.totalRecords;
                const totalPages = data.totalPages;
                return { totalRecords, totalPages };
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
    },
};

export { contentStore };