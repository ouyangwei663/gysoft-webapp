import {
  apiShop
} from '@/API/api'

export function getshop(a) { //获取店铺
  var name = {}
  console.log(apiShop({}).then((res) => {

    for (let i = 0; i < res.table.length; i++) {
      if (res.table[i].no == a) {

        name.name = '1'
      }
    }

  }))
  return name.name



}
