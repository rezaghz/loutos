import Vue from 'vue'
import axios from 'axios'
import swal from 'sweetalert';
import App from './App'
import router from './router'
import store from './store'
import persian_date from "persian-date";
import moment_hijri from "moment-hijri";
import events from './migration/runner-migrations';
import helpers from './helpers';

window.persianDate = persian_date;
window.moment = moment_hijri;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app')
