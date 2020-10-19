import {
  get,
  post
} from './http/http'

var second = localStorage.getItem("second") //获取的二级域名
export const GetList_Shop = p => { //   这个店铺下拉菜单的接口
  p.subcom = window.localStorage.getItem("subcom")
  p.action = "getlist";
  p.name = "分店"
  return post(second, p)
};

export const apiVip = p => { //   这个会员下拉菜单的接口
  p.subcom = window.localStorage.getItem("subcom")
  p.action = "getlist";
  p.name = "会员卡类型"
  return post(second, p)
};

export const apiWorker = p => { //   这个员工下拉菜单的接口
  p.action = "getlist";
  p.name = "emp"
  return post(second, p)
};
