import axios from 'axios';

const employeeStore = {
    state: () => ({
        showEmployeeForm: false,
        departmentsList: [],
    }),
    getters: {
        showEmployeeForm: (state) => state.showEmployeeForm,
        departmentsList: (state) => state.departmentsList,
    },
    actions: {
        async getAllDepartments({ commit }) {
            try {
                const response = await axios.get('https://localhost:44369/api/v1/Departments');
                commit('updateDepartmentsList', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        handleCloseOrOpenEmployeeForm({ commit }, payload) {
            commit('updateShowEmployeeForm', payload);
        },
    },
    mutations: {
        updateShowEmployeeForm: (state, payload) => (state.showEmployeeForm = payload),
        updateDepartmentsList(state, payload) {
            state.departmentsList = JSON.parse(JSON.stringify(payload));
        },
    },
};

export { employeeStore };