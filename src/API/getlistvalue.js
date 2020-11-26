import {
  get,
  post
} from './http/http'

var subcom = window.localStorage.getItem("subcom")
var action = "getlist"

var second = localStorage.getItem("second") //获取的二级域名
export const GetList_Shop = p => { //   这个店铺下拉菜单的接口
  p.subcom = subcom
  p.action = action;
  p.name = "分店"
  return post(second, p)
};

export const GetList_Hy = p => { //   这个会员下拉菜单的接口
  p.subcom = subcom
  p.action = action;
  p.name = "会员卡类型"
  return post(second, p)
};

export const GetList_Erp = p => { //   这个员工下拉菜单的接口
  p.subcom = subcom
  p.action = action;
  p.name = "员工"
  return post(second, p)
};





export const GetList_Erp2 = p => { //   
  p.subcom = subcom
  p.action = action;
  p.classname = "n_employer_hy";
  p.funcname = "getmaster";
  p.classmemo = "员工"
 
  return post(second, p)
};




