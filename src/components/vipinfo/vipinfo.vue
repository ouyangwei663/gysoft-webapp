<template>
  <div class="hello">
    <van-cell title="显示分享面板" @click="showShare = true" />
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import { Toast, Cell } from "vant";
export default {
  name: vipinfo,
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  comments: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
