import {
  get,
  post
} from './http/http'

var action = "findby"
var classname = "n_customer_small_listdetail"



var second = localStorage.getItem("second") //获取的二级域名

export const detail_history = p => { //    这个是会员资料查询的接口
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

//   export const Customer_save = p => { //   这个是会员资料保存/修改入口  需要参数  一个是 最外面传递cusid 有就是创建，没有就是修改  二级数据data{修改的数据} ，三级数据是old{修改前的数据}    
//     p.action = action;
//     p.classname = classname;
//     p.funcname = "save";
//     p.classmemo = "会员查询"
//     return post(second, p)
//   };
