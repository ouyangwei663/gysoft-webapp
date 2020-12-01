//修改密码

import {
  get,
  post
} from './http/http'
var second = localStorage.getItem("second") //获取的二级域名


export const modifypassword = p => { //   这个是收银开单
  p.action = "findby";
  p.classname = "n_customer_small_find_mf";
  p.funcname = "modifypassword";
  p.classmemo = "修改密码"
  return post(second, p)
};
