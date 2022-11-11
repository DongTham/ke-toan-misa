import { contentStore } from './contentStore';
import { employeeStore } from './employeeStore';

const storeConfigs = {
    modules: {
        employeeStore: employeeStore,
        contentStore: contentStore,
    },
};

export { storeConfigs };