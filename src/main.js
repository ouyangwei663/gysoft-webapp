// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {
  name: 'v-touch'
})
import {
  WindowsBalloon
} from 'node-notifier'
Vue.use(Antd);
Vue.prototype.$axios = axios


window.localStorage.setItem("token", "lxmf")
window.localStorage.setItem("second", "erpcore/")



var baseURL = window.global_url.BASE_URL

axios.defaults.baseURL = baseURL
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = "lx_mf"
  if (token) {
    config.headers.token = token; //将token放到请求头发送给服务器
    return config;
    //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
    // config.headers['accessToken'] = Token;
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',

  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
