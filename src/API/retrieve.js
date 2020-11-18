import {
  get,
  post
} from './http/http'

var second = localStorage.getItem("second") //获取的二级域名
var classname = "n_outone_hy"
var subcom = window.localStorage.getItem("subcom")


export const chart_day = p => { //   营业收入报表

  p.action = "findby";
  p.classname = "n_calc_daybusinese"
  p.funcname = "Retrieve";
  p.classmemo = "营业收入报表"
  p.daylen = 6
  return post(second, p)
};

export const chart_shop = p => { //   店面统计报表

  p.action = "findby";
  p.classname = "n_subcom_total_rep"
  p.funcname = "Retrieve";
  p.classmemo = "店面统计报表"
  // p.daylen=6
  return post(second, p)
};
export const chart_work = p => { //   员工提成报表

  p.action = "findby";
  p.classname = "n_emp_deduct_total"
  p.funcname = "Retrieve";
  p.classmemo = "员工提成报表"

  // p.daylen=6
  return post(second, p)
};

export const chart_work_detail = p => { //   营业收入报表详细

  p.action = "findby";
  p.classname = "n_emp_deduct_total"
  p.funcname = "vf_finddetaildata";
  p.classmemo = "员工提成报表详细"

  // p.daylen=6
  return post(second, p)
};
