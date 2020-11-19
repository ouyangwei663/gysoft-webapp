import {
    get,
    post
  } from './http/http'
  var second = localStorage.getItem("second") //获取的二级域名
  export const private_money = p => { //   这个是收银开单
    p.action = "findby";
    p.classname = "n_givemoney_hy";
    p.funcname = "getgive";
    p.classmemo = "充值赠送余额的权限"
    return post(second, p)
  };
  export const private_outone = p => { //   这个是收银开单
    p.action = "findby";
    p.classname = "n_private_hy";
    p.funcname = "canoutone";
    p.classmemo = "撤销收银单的权限"
    return post(second, p)
  };
  