import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less";
import router from './router'
import axios from 'axios';

Vue.prototype.$axios = axios

import vLoading from './directive/loading'
Vue.directive('loading',vLoading)


new Vue({
 
  render: h => h(App),
  router
}).$mount('#app')
