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
  console.log(params)
  params.token = "lx_mf"
  params.aspnetid = "lx_mf"
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
          resolve(res.data);
        
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
