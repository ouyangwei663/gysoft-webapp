<template>
  <div id="app">
    <keep-alive :include="keepAlive">
   
        <router-view></router-view>
    
    </keep-alive>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="$router.push({ name: 'shouye' })"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        icon="vip-card"
        @click="$router.push({ name: 'vipcheck' })"
        >会员</van-tabbar-item
      >
      <van-tabbar-item icon="gold-coin" @click="$router.push({ name: 'bank' })"
        >收银</van-tabbar-item
      >
      <van-tabbar-item
        icon="chart-trending-o"
        @click="$router.push({ name: 'chart_route' })"
        >报表</van-tabbar-item
      >
    </van-tabbar>
    <div style="width: 100%; height: 5vh"></div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";
export default {
  name: "App",
  data() {
    return {
      active: 0,
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
  },
  computed: {
    keepAlive() {
      return this.$store.getters.keepAlive;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
