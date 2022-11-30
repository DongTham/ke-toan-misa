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
        /**
         * Hành động mở dialog nhân viên
         * @param {Object} payload Object chứa thông tin thông báo và loại thông báo
         * Author: NQDONG (10/11/2022)
         */
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