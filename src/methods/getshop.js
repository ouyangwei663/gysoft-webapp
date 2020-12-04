import { GetList_Hy } from "@/API/getlistvalue.js";
export function getshop(a) { //获取店铺
  var shop = JSON.parse(localStorage.getItem("shop"))
  var name = {}



  for (let i = 0; i < shop.length; i++) {

    if (shop[i].no == a) {

      name.name = shop[i].name

    }
  }


  return name.name

}
export function getvip(a) { //获取店铺


  if (sessionStorage.getItem("vip_list") == null) {
    GetList_Hy({}).then((res) => {
      sessionStorage.setItem("vip_list", JSON.stringify(res.table));
    });
    var vipname = JSON.parse(sessionStorage.getItem("vip_list"))
  } else {
    var vipname = JSON.parse(sessionStorage.getItem("vip_list"))
  }

  console.log('会员名字方法',vipname)

  var name = {}


  for (let i = 0; i < vipname.length; i++) {

    if (vipname[i].no == a) {

      name.name = vipname[i].name

    }
  }


  return name.name

}