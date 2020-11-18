import {
  get,
  post
} from './http/http'
var second = localStorage.getItem("second") //获取的二级域名
var subcom = window.localStorage.getItem("subcom")


export const secondcard_open = p => { //   

  p.action = "billopen";
  p.classname = 'n_nursecard_hy';
  p.funcname = "open";
  p.classmemo = "次卡开单"
  p.subcom = subcom
  return post(second, p)
};

export const secondcard_save = p => { //   

  p.action = "billsave";
  p.classname = 'n_nursecard_hy';
  p.funcname = "save";
  p.classmemo = "次卡保存"
  p.subcom = subcom
  return post(second, p)
};


export const secondcard_find = p => { //   

  p.action = "findby";
  p.classname = 'n_nursecard_hy';
  p.funcname = "Retrieve";
  p.classmemo = "次卡查询"
  return post(second, p)
};
