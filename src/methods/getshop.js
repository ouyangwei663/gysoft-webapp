import {
  apiShop
} from '@/API/api'

export function getshop(a) { //获取店铺
  var shop = JSON.parse(localStorage.getItem("shop"))
  var name={}
 
 

  for (let i = 0; i < shop.length; i++) {

    if (shop[i].no == a) {

      name.name=shop[i].name

    }
  }


 return name.name

}
