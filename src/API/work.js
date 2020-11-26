//员工的API



import {
    get,
    post
  } from './http/http'
  
  var second = localStorage.getItem("second") //获取的二级域名
 
  var subcom = window.localStorage.getItem("subcom")
  
  
  export const work_save = p => { //   员工的保存

    p.action = "findby";
    p.classname = "n_employer_hy "
    p.funcname = "save";
    p.classmemo = "员工保存"

    return post(second, p)
  };
  

  export const work_find = p => { //   员工的查询

    p.action = "findby";
    p.classname = "n_employer_hy "
    p.funcname = "find";
    p.classmemo = "员工查询"

    return post(second, p)
  };
  
 