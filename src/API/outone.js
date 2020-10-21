import {
  get,
  post
} from './http/http'
var second = localStorage.getItem("second") //获取的二级域名
var classname = "n_outone_hy"

export const OutOne_open = p => { //   这个是收银开单

  p.action = "findby";
  p.classname = classname;
  p.funcname = "open";
  p.classmemo = "会员查询"
  return post(second, p)
};


export const OutOne_save = p => { //   这个是收银保存

  p.action = "billsave";
  p.classname = classname;
  p.funcname = "save";
  p.classmemo = "收银保存"
  return post(second, p)
};
export const OutOne_find = p => { //   收银查询  这个是收银默认当天记录

  p.action = "billsave";
  p.classname = classname;
  p.funcname = "find";
  p.classmemo = "会员查询"
  return post(second, p)
};


