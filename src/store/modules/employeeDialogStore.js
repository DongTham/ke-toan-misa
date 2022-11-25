const employeeDialogStore = {
    state: () => ({
        contentEmployeeDialog: {},
        isShowEmployeeDialog: false,
    }),
    getters: {
        getContentEmployeeDialog: (state) => state.contentEmployeeDialog,
        getIsShowEmployeeDialog: (state) => state.isShowEmployeeDialog,
    },
    actions: {
        // async getAllDepartments({ commit }) {
        //     try {
        //         const response = await axios.get('https://localhost:7228/api/v1/Departments');
        //         commit('updateDepartmentsList', response.data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        // handleCloseOrOpenEmployeeForm({ commit }, payload) {
        //     commit('updateShowEmployeeForm', payload);
        // },
    },
    mutations: {
        updateIsShowEmployeeDialog: (state, payload) => (state.isShowEmployeeDialog = payload),
        updateContentEmployeeDialog(state, payload) {
            state.contentEmployeeDialog = JSON.parse(JSON.stringify(payload));
        },
    },
};

export { employeeDialogStore };