export function clean(a) { //清空属性为空的字段

  var pams = {};
  for (let i in a) {
    if (a[i]) {
      pams[i] = a[i];
    }
  }
  return pams
}
