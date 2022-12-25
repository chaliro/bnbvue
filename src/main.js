import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Print from 'vue-print-nb'
import vueToPdf from 'vue-to-pdf';
Vue.use(vueToPdf);
Vue.use(ElementUI);
Vue.use(Print);
Vue.config.productionTip = false
Vue.prototype.$axios=axios

new Vue({
  render: h => h(App),
  beforeCreate () { 
    //全局事件总线
    Vue.prototype.$bus = this
  },
}).$mount('#app')
