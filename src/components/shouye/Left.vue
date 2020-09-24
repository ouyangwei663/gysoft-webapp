<template>
  <div class="hello">
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup
      v-model="show"
      position="left"
      get-container="hello"
      :style="{width:'60%',height:'100%'}"
    >
      <alert></alert>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell } from "vant";
import alert from "./alert";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      show: this.$store.state.sata,
    };
  },
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    alert,
  },
  methods: {
    showPopup() {
      // this.show = true;
      this.$store.commit("change")
    },
  },
  mounted() {
    this.show=this.$store.state.sata;
    console.log(this.$store.state.sata)
    
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
</style>
