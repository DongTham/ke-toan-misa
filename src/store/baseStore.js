import { contentStore } from './modules/contentStore';
import { employeeStore } from './modules/employeeStore';
import { employeeDialogStore } from './modules/employeeDialogStore';

const storeConfigs = {
    modules: {
        employeeStore: employeeStore,
        contentStore: contentStore,
        employeeDialogStore: employeeDialogStore,
    },
};

export { storeConfigs };