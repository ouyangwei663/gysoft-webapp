import {
  get,
  post
} from './http/http'


var second = localStorage.getItem("second") //获取的二级域名
export const BackMoney_save = p => { //   这个是会员取现的接口
  p.action = "billsave";
  p.classname = "n_backmoney_hy";
  p.funcname = "save";
  p.classmemo = "会员取钱"
  return post(second, p)
};
