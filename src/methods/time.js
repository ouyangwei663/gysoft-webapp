
export function time(str) {
 
  var arr = str.split("/");
 
  var arr2 = arr[2].split(" "); //时间格式修改方法定位（可封装）


 return (arr2[0] + "-" + arr[0] + "-" + arr[1] + " " + arr2[1]) 

}

