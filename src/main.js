import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vue3Spinner from 'vue3-spinner';
import {LoadingPlugin} from 'vue-loading-overlay';
import axios from 'axios';
import * as constants from '../constants'
import { vue3Debounce } from 'vue-debounce'

import 'vue-loading-overlay/dist/css/index.css';

axios.defaults.baseURL = constants.API_URL; //import backend url

const app = createApp(App);
app.use(vue3Spinner);
app.use(LoadingPlugin);
app.use(router);

app.mount('#app');


/* import {createApp} from 'vue';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// Your app initialization logic goes here
const app = createApp({});
app.use(LoadingPlugin);
app.mount('#app'); */