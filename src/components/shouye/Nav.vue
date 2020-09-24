<template>
  <div class="hello">
    <van-nav-bar
      title="首页"
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    
    >
      <template #right>
        <van-icon name="friends" size="21" color="#FFFFFF" />
      </template>
      <template #left>
        <van-icon name="bars" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Toast, Icon } from "vant";
import jsonp from "jsonp";
export default {
  name: "Nav",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
  },
  methods: {
    onClickLeft() {
      //jsonp请求数据
      //     var keyword = "李白";
      //     var baseUrl = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
      //     var _url ='http://192.168.1.199:8177/erpcore?action=ok';
      //     jsonp(_url,(res)=>{
      //         callback(res);
      //     })

      // //注意:callback需挂载到window下
      //     window.callback = function(data){
      //         console.log(data)
      //     }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://wintop.36x.cn/erpcore/?action=ok");
      xhr.setRequestHeader("token", "123");
      xhr.send(null);
      xhr.onload = function (e) {
        var xhr = e.target;
        console.log(xhr.responseText);
      };
    },
    onClickRight() {
 this.$axios
     .get("erpcore/?action=ok")
     .then(res => {
        console.log(res.data.msg);
     })
     .catch(err => {
        console.log(err);
 });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
</style>
