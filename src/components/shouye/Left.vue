<template>
  <div class="hello">
    <van-cell is-link class="lefttop">当前所在 <span><van-icon name="arrow" /></span> 会员管理</van-cell>
    <van-popup
      v-model="show"
      position="left"
      get-container="hello"
      :style="{ width: '60%', height: '100%' }"
      :overlay=false
    >
      <alert></alert>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell,Icon } from "vant";
import alert from "./alert";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Icon.name]:Icon,
    alert,
  },
  methods: {
    
  },
  mounted() {},
  computed: {
    show: {
      get() {
        return this.$store.state.sata;
      },set(){

      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .van-overlay {
  top: 7%;
}
/deep/ .van-popup--left {
  top: 7%;

  transform: translate3d(0, 0, 0);
}
/deep/ .van-popup {
  background-color: #2a282b;
}
.lefttop{
  margin-left: 3vw;
  margin-bottom: 3vh;
}
</style>
