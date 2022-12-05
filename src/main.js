import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Print from 'vue-print-nb'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Print);
var vm = new Vue({
  render: h => h(App),
}).$mount('#app')
vm.$axios = axios
