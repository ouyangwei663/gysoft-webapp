import {
  get,
  post
} from './http/http'

var second = localStorage.getItem("second") //获取的二级域名
var classname = "n_outone_hy"
var subcom = window.localStorage.getItem("subcom")


export const Product_history = p => { //   历史消费巨鹿

  p.action = "billsave";
  p.classname = "n_history_list"
  p.funcname = "HaveGoods";
  p.classmemo = "历史消费纪录"
  return post(second, p)
};

export const Product_type = p => { //     消费类型

  p.action = "billsave";
  p.classname = "n_history_list"
  p.funcname = "billtype";
  p.classmemo = "会员消费类型"
  return post(second, p)
};

export const Goodsno_find = p => { //     产品查找
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_goodsno_hy"
  p.funcname = "find";
  p.classmemo = "产品查询"
  return post(second, p)
};

export const Product_discount = p => { //     产品折扣
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_goodsno_hy"
  p.funcname = "getprice";
  p.classmemo = "产品折扣查询"
  return post(second, p)
};

export const Product_save = p => { //     产品保存
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_outone_hy"
  p.funcname = "SaveGoodEmp";
  p.classmemo = "保存产品"
  return post(second, p)
};
export const Product_delet = p => { //     产品删除
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_outone_hy"
  p.funcname = "delGood";
  p.classmemo = "删除产品"
  return post(second, p)
};


export const Product_open = p => { //     产品账单查询
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_outone_hy"
  p.funcname = "GetOutmany";
  p.classmemo = "单号查询产品"
  return post(second, p)
};
export const Product_emp = p => { //     获取员工详情信息
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_outone_hy"
  p.funcname = "GetEmp";
  p.classmemo = "员工查询"
  return post(second, p)
};


export const Product_pay = p => { //     产品支付
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_outone_hy"
  p.funcname = "GetMoney";
  p.classmemo = "产品支付"
  return post(second, p)
};
