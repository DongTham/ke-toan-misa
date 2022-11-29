import { employeeDialogDetail } from '@/i18n/i18nEmployeeDialogDetail';

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
        openEmployeeDialog({ commit }, payload) {
            const employeeDialog = employeeDialogDetail(payload.Msg)[payload.Type];
            commit('updateContentEmployeeDialog', employeeDialog);
            commit('updateIsShowEmployeeDialog', true);
        },
    },
    mutations: {
        updateIsShowEmployeeDialog: (state, payload) => (state.isShowEmployeeDialog = payload),
        updateContentEmployeeDialog(state, payload) {
            state.contentEmployeeDialog = JSON.parse(JSON.stringify(payload));
        },
    },
};

export { employeeDialogStore };