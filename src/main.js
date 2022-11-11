import { createApp } from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import { store } from './js/library/store';

const app = createApp(App);

app.use(Vuex);
app.use(store);

app.mount('#app');