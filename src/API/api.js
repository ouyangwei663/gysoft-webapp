import {
  get,
  post
} from './http/http'

var second = localStorage.getItem("second") //获取的二级域名
export const apiAddress = p => post(second, p); //  在首页获取的一个测试的接口

