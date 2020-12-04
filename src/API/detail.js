import {
  get,
  post
} from './http/http'

var action = "findby"
var classname = "n_customer_small_listdetail"



var second = localStorage.getItem("second") //获取的二级域名

export const detail_history = p => { //    这个是会员资料l查询的接口
  p.action = action;
  p.classname = classname;
  p.funcname = "uselist";
  p.classmemo = "会员详情历史消费"
  return post(second, p)
};

export const detail_Storelist = p => { //    这个是会员资料查询的接口
  p.action = action;
  p.classname = classname;
  p.funcname = "Storelist";
  p.classmemo = "会员详情充值明细"
  return post(second, p)
};

export const detail_Nurselist = p => { //    
  p.action = action;
  p.classname = classname;
  p.funcname = "Nurselist";
  p.classmemo = "会员详细店次卡查询"
  return post(second, p)
};

export const detail_Billlist = p => { //    
  p.action = action;
  p.classname = classname;
  p.funcname = "Billlist";
  p.classmemo = "会员详细对账单"
  return post(second, p)
};
