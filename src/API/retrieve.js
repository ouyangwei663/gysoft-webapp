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
  p.daylen=6
  return post(second, p)
};
