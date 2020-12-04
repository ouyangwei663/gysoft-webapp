import axios from 'axios'; // 引入axios
import QS from 'qs';
import {
  Toast
} from "vant"
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */


var token = window.localStorage.getItem("token")

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  params.token = token
  params.aspnetid = token
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        console.log('查询条件', params)
        if (res.data.errcode == 0) {
          resolve(res.data);
        } else(
          // alert(res.data.errmsg)
          console.log('错误日志', res.data.errmsg)
  
        
        )
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
