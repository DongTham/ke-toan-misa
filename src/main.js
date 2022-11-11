import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import { storeConfigs } from './store/baseStore.js';

const app = createApp(App);
const store = createStore(storeConfigs);

app.use(store);
app.mount('#app');