import axios from 'axios';

const contentStore = {
    state: () => ({
        employeesList: [],
    }),
    getters: {
        employeesList: (state) => state.employeesList,
    },
    actions: {
        async getDepartmentsByPaging(context, payload) {
            try {
                const response = await axios.get(
                    `https://localhost:7228/api/v1/Employees/filter?pageSize=${payload.pageSize.value}&pageNumber=${payload.pageNumber.value}&keyword=${payload.keyword.value}`,
                );
                context.commit('updateEmployeesList', response.data.employees);
                const totalRecords = response.data.totalRecord;
                const totalPages = response.data.totalPage;
                return { totalRecords, totalPages };
            } catch (error) {
                return error;
            }
        },
    },
    mutations: {
        updateEmployeesList(state, payload) {
            state.employeesList = JSON.parse(JSON.stringify(payload));
        },
    },
};

export { contentStore };