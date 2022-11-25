import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import { storeConfigs } from './store/baseStore.js';

// Vuetify
import { vuetify } from './vuetify/vuetify';

const app = createApp(App);
const store = createStore(storeConfigs);

app.use(store);
app.use(vuetify);
app.mount('#app');