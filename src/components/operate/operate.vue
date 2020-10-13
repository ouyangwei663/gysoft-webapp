<template>
  <div>
    <van-nav-bar
      title="查询结果"
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      :left-arrow="true"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <div class="card">
      <p class="one">姓名：{{ name }}</p>
      <p class="one">卡号：{{ cid }}</p>
      <p class="one">手机号：{{ phone }}</p>
      <p class="one">性别：{{ sex }}</p>
      <p class="one">充值余额：￥{{ money }}</p>
      <p class="one">赠送余额：￥{{ secondmoney }}</p>
      <button>查询流水</button>
    </div>
    <h3>会员操作</h3>
    <van-grid
      :column-num="3"
      icon-size="30"
      gutter="30"
      :border="false"
      :square="true"
    >
      <van-grid-item id="first" text="充值">
        <template #icon>
          <van-icon name="gold-coin-o" size="30" color="#1989fa" />
        </template>
      </van-grid-item>
      <van-grid-item id="second" icon text="恢复会员">
        <template #icon>
          <van-icon name="share-o" size="30" color="#1989fa" />
        </template>
      </van-grid-item>
      <van-grid-item id="close" icon text="注销会员">
        <template #icon>
          <van-icon name="close" size="30" color="#1989fa" />
        </template>
      </van-grid-item>

      <van-grid-item id="fourth" icon text="新增次卡">
        <template #icon>
          <van-icon name="add-o" size="30" color="#1989fa" />
        </template>
      </van-grid-item>
      <van-grid-item id="fifth" icon text="赠送充值">
        <template #icon>
          <van-icon name="gift-o" size="30" color="#1989fa" />
        </template>
      </van-grid-item>
      <van-grid-item id="sixth" icon text="赠送次卡">
        <template #icon>
          <van-icon name="gift-card-o" size="30" color="#1989fa" />
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { NavBar, Icon, Button, Grid, GridItem } from "vant";
export default {
  data() {
    return {
      name: "张三",
      sex: "男",
      cid: "123456",
      money: 100,
      phone: "136555555445",
      secondmoney: 0,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
};
</script>
<style scoped>
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}

.card {
  text-align: left;
  color: white;
  width: 90%;
  margin-left: 5%;
  height: 25vh;
  background-color: #3b4146;
  border-radius: 0.5rem;
  padding-top: 2%;
  margin-top: 3%;
  font-size: 1rem;
}
.card p {
  text-indent: 5vw;
}
.one {
  font-size: 0.5rem;
}
.two {
  font-size: 1.5rem;
  margin: 0;
}
.card button {
  width: 30vw;
  height: 5vh;
  background-color: #fcdfa0;
  color: #a88453;
  border-radius: 1rem;
  position: relative;
  left: 50vw;
  top: -8vh;
}
</style>