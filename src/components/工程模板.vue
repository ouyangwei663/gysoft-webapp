<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="会员资料查询"
      :fixed="true"
      right-text="新增会员"
      :left-arrow="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Toast, Icon } from "vant";

export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
  },
  created() {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-cell {
  /* width: 90%; */
  background-color: #fafafa;
  /* margin-left: 5%; */
  border-radius: 8px;
  margin-top: 2%;
}
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-field {
  width: 90%;
  background-color: #fafafa;
  margin-left: 5%;
  border-radius: 8px;
  margin-bottom: 2vh;
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ .van-field__control--custom {
  margin-left: 6%;
}
</style>
