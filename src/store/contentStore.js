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
                    `https://localhost:7228/api/v1/Employees/filter?pageSize=${payload.pageSize.value}&pageNumber=${payload.pageNumber.value}`,
                );
                context.commit('updateEmployeesList', response.data.employees);
                return {};
            } catch (error) {
                console.log(error);
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