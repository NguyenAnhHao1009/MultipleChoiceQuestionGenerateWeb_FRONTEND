import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';

createApp(App).use(router).mount('#app');
