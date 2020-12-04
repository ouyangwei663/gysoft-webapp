import {
    get,
    post
  } from './http/http'
  
  var second = localStorage.getItem("second") //获取的二级域名
 
  var subcom = window.localStorage.getItem("subcom")
  
  
  export const book_find = p => { //   会员账本查询

    p.action = "findby";
    p.classname = "n_moneychange_hy"
    p.funcname = "find";
    p.classmemo = "会员账本查询"
    return post(second, p)
  };
  
    
  export const book_delet = p => { //   会员账本作废

    p.action = "findby";
    p.classname = "n_moneychange_hy"
    p.funcname = "ToZ";
    p.classmemo = "会员账本作废"
    return post(second, p)
  };
  