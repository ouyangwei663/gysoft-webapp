<template>
  <div class="hello">
    <Nav></Nav>
    <div>
      <Left></Left>
      <Gird></Gird>

      <span class="info">{{ subname }}({{ mccdp }}) {{ username }} 201201A</span>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav";
import Gird from "./Gird";
import Left from "./Left";
import { GetList_Shop } from "@/API/getlistvalue.js";
import { apiAddress } from "@/API/api.js";

export default {
  name: "shouye",
  created() {
    this.token = window.localStorage.getItem("token");
    this.url = window.localStorage.getItem("url");
    // apiAddress({
    //   action: "getuser",
    // }).then((res) => {
    //   window.localStorage.setItem("subname", res.user.subname);
    //   window.localStorage.setItem("subcom", res.user.subcom);
    //   window.sessionStorage.setItem("username", res.user.username);
    // });
    apiAddress({
      action: "getuser",
    }).then((res) => {
      console.log(res);
      this.subname = res.user.subname;
      this.subcom = res.user.subcom;
      this.username = res.user.username;
      this.mccdp = res.user.comname;
      this.type = res.user.usertype;
    });

    this.getshop();
  },

  data() {
    return {
      shop: [],
      token: "",
      url: "",
      subname: "",
      subcom: "",
      username: "",
      head: "",
      url: "",
      mccdp: "",
      type: "",
    };
  },
  components: {
    Nav,
    Gird,
    Left,
  },
  methods: {
    getshop() {
      var that = this;
      GetList_Shop({}).then((res) => {
        that.shop = res.table;
        window.localStorage.setItem("shop", JSON.stringify(that.shop));
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/bank") {
      // 这是路由path

      console.log("去收银了");
      this.$store.commit("setKeepAlive", ["bank", "bankadd"]); //这是此页面的name属性名字
    } else {
    }
    next();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  width: 80%;
  position: absolute;
  left: 10%;
  bottom: 50px;
}
</style>
