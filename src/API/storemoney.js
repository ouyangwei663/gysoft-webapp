import {
  get,
  post
} from './http/http'
var second = localStorage.getItem("second") //获取的二级域名
var classname = "n_storemoney_hy"
var subcom = window.localStorage.getItem("subcom")
export const StoreMoney_open = p => { //   这个是会员充值开单的接口

  p.action = "billopen";
  p.classname = classname;
  p.funcname = "open";
  p.classmemo = "会员充值开单"
  p.subcom = subcom
  return post(second, p)
};

export const StoreMoney_save = p => { //   这个是会员充值的接口
  p.action = "billsave";
  p.classname = classname;
  p.funcname = "save";
  p.classmemo = "会员充值"
  return post(second, p)
};
