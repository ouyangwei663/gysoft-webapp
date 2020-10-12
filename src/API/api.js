import {
  get,
  post
} from './http'
var second = localStorage.getItem("second") //获取的二级域名




export const apiAddress = p => post(second, p); //  在首页获取的一个测试的接口
export const apiShop = p => { //   这个店铺下拉菜单的接口
  p.action = "getlist";
  p.name = "分店"
  return post(second, p)
};
export const apiVip = p => { //   这个会员下拉菜单的接口
  p.action = "getlist";
  p.name = "会员卡类型"
  return post(second, p)
};
export const apiVipinfo = p => { //   这个是会员查询的接口
  p.action = "findby";
  p.classname = "n_customer_small_find_mf";
  p.funcname = "find";
  p.classmemo = "会员查询"
  return post(second, p)
};
export const apiKaidan = p => { //   这个是会员开单的接口
  p.action = "billopen";
  p.classname = "n_storemoney_hy";
  p.funcname = "open";
  p.classmemo = "会员充值开单"
  p.subcom = window.localStorage.getItem("subcom")
  return post(second, p)
};
export const apiChongzhi = p => { //   这个是会员充值的接口
  p.action = "billsave";
  p.classname = "n_storemoney_hy";
  p.funcname = "save";
  p.classmemo = "会员充值"
  return post(second, p)
};

export const apiQuxian = p => { //   这个是会员取现的接口
  p.action = "billsave";
  p.classname = "n_backmoney_hy";
  p.funcname = "save";
  p.classmemo = "会员取钱"
  return post(second, p)
};


export const apiVipOpen = p => { //   这个是会员开单入口  不需要参数
  p.action = "findby";
  p.classname = "n_customer_small_find_mf";
  p.funcname = "open";
  p.classmemo = "会员查询"
  return post(second, p)
};


export const apiVipSave = p => { //   这个是会员资料保存/修改入口  需要参数  一个是 最外面传递cusid 有就是创建，没有就是修改  二级数据data{修改的数据} ，三级数据是old{修改前的数据}    
  p.action = "findby";
  p.classname = "n_customer_small_find_mf";
  p.funcname = "save";
  p.classmemo = "会员查询"
  return post(second, p)
};
