export function time(str) {

  var arr = str.split("/");

  var arr2 = arr[2].split(" "); //时间格式修改方法定位（可封装）


  return (arr2[0] + "-" + arr[0] + "-" + arr[1] + " " + arr2[1])

}

export function timeday() { //获取当天日期

  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;

}
export function timetwoyearday() { //获取当天日期

  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear() + 2;
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;

}

// 使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
//    Vue.mixin({
//     beforeRouteLeave: function(to, from, next) {
//         // 默认是缓存的 在来清除
//         // 1.用tag标记控制 判断上下级
//         // if (from && from.meta.tag && to.meta.tag && (from.meta.tag-to.meta.tag<1))
//         // 2.直接用组件名字来写 不够通用
//         // if (from.path == '/docMng' && to.path == '/docMng/docDetail') {
//         // 3. 用包含关系来判断 通用
//         console.log(to, from)
//         if (to.path.indexOf('useAgreement') != -1 && from.name == 'register') {
//             from.meta.keepAlive = true;
//         } else {
//                 // if (from && from.meta.tag && to.meta.tag && (from.meta.tag-to.meta.tag<1)){
//             if (this.$vnode && this.$vnode.data.keepAlive && from.name == 'register' && to.path.indexOf('home') != -1) {
//                 if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
//                     if (this.$vnode.componentOptions) {
//                         var key = this.$vnode.key == null ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') : this.$vnode.key
//                         var cache = this.$vnode.parent.componentInstance.cache
//                         var keys = this.$vnode.parent.componentInstance.keys
//                         if (cache[key]) {
//                             if (keys.length) {
//                                 var index = keys.indexOf(key)
//                                 if (index > -1) {
//                                     keys.splice(index, 1)
//                                 }
//                             }
//                             delete cache[key]
//                         }
//                     }
//                 }
//                 from.meta.keepAlive = true;
//             }
//             // this.$destroy()
//         }
//         next()
//     }
// })
