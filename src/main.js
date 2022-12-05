import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(ElementUI);
new Vue({
  beforeCreate () { 
    //全局事件总线
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')
