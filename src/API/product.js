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

export const Goodsno_find = p => { //     消费类型
  p.subcom = subcom
  p.action = "billsave";
  p.classname = "n_goodsno_hy"
  p.funcname = "find";
  p.classmemo = "产品查询"
  return post(second, p)
};
