import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import JsonExcel from "vue-json-excel";
import Print from 'vue-print-nb';
import vueToPdf from 'vue-to-pdf';
 
Vue.use(vueToPdf);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.use(Print);
Vue.component('downloadExcel', JsonExcel)


new Vue({
  render: h => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this
  },
}).$mount('#app')
