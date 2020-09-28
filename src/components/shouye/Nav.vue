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
    <van-dialog v-model="show" title="详情信息"   theme="round">
      <table class="alert">
        <tr>
          <td>公司名称：</td>
          <td>{{comname}}</td>
        </tr>
        <tr>
          <td>使用人：</td>
          <td>{{username}}</td>
        </tr>
      </table>
    </van-dialog>
  </div>
</template>

<script>
import { NavBar, Toast, Icon, Dialog } from "vant";
import jsonp from "jsonp";
export default {
  name: "Nav",
  data() {
    return {
      comname: "",
      username: "",
      show: false,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  methods: {
    onClickLeft() {
      this.$store.commit("change");
      console.log(this.$store.state.sata);
    },
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

    onClickRight() {
      this.$axios
        .get("erpcore/", {
          params: {
            action: "getuser",
            token: "lx_mf",
          },
        })
        .then((res) => {
            console.log(res.data.user)
          this.comname=res.data.user.comname;
          this.username=res.data.user.username
        })
        .catch((err) => {
          console.log(err);
        });
      this.show = true;
    },
    // onClickRight() {
    //   this.$axios
    //     .get('',{
    //       params:{
    //         action:"token",
    //         token:"as_token"
    //       }
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
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
.alert {
margin-left: auto;
margin-right: auto;
}
.alert td{
  text-align: left;
 width: 50%;
}
</style>
