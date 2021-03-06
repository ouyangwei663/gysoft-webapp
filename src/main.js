import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
// import Antd from 'ant-design-vue'
// import "vant/lib/select/style";
import InputNumber from 'ant-design-vue/lib/input-number';
import Button from 'ant-design-vue/lib/button';
import Select from 'ant-design-vue/lib/Select';

import Input from 'ant-design-vue/lib/Input';
// import InputNumber from 'ant-design-vue/lib/input-number';
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Select.Option)


import 'ant-design-vue/lib/select/style/css'; 
import 'ant-design-vue/lib/input-number/style/css'; 
import 'ant-design-vue/lib/button/style/css'; 
import VueTouch from 'vue-touch'
// import { Button } from 'ant-design-vue'
Vue.use(VueTouch, {
  name: 'v-touch'
})
// Vue.use(Antd);
Vue.prototype.$axios = axios




var port = location.port;
function GetCurrDir() {

  var domain = window.location.href.split(':')[0] + '://' + document.domain;

  return domain; //替换空格  
}




function GetUrlParam(paraName) {
  var url = document.location.toString();
  // var url = "https://yw.36x.cn/hy/index.html?token=lx_mf#/"
  var arrObj = url.split("?");
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}


var str = GetUrlParam("token");
var token = str.replace('#/', '')
console.log("token", token)
if (str !== "") {
  window.localStorage.setItem("token", token)
  var delet = 'token=' + token
  var href = document.location.toString()
  var secondhref = href.replace(delet, '')
  window.location.href = secondhref

}

window.localStorage.setItem("second", "erpcore/")


if (port) {
  var baseURL = GetCurrDir() + ':' + port
} else {
  var baseURL = GetCurrDir()
}

console.log('API路径', baseURL + '/erpcore')
window.localStorage.setItem("url", baseURL + '/erpcore')


// axios.defaults.baseURL = baseURL
window.localStorage.setItem("token", "lx_mf")
axios.defaults.baseURL = "https://wintop.36x.cn"
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
