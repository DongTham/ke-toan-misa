// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

/**
 * Khởi tạo vuetify
 * Author: NQDONG (10/11/2022)
 */
const vuetify = createVuetify({
    components,
    directives,
});

export { vuetify };