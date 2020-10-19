import {
  get,
  post
} from './http/http'

var second = localStorage.getItem("second") //获取的二级域名
export const apiAddress = p => post(second, p); //  在首页获取的一个测试的接口

export const apiWorker = p => { //   这个员工下拉菜单的接口
  p.action = "getlist";
  p.name = "emp"
  return post(second, p)
};
