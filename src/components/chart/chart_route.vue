<template>
  <div>
    <van-nav-bar
      title="报表"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="bank"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-grid
      :column-num="3"
      icon-size="30"
      gutter="30"
      :border="false"
      :square="true"
    >
      <!-- <van-grid-item
        id="first"
        icon="friends"
        text="会员资料"
        to="/vipcheck"
      ></van-grid-item> -->
      <van-grid-item id="second" icon="comment" text="日营业情况" to="/chart" />
      <van-grid-item
        id="third"
        icon="chart-trending-o"
        text="店面统计报表"
        to="/chart_shop"
      />
      <van-grid-item
        id="third"
        icon="balance-list"
        text="员工提成报表"
        to="/chart_workmoney"
      />

      <!-- <van-grid-item id="fourth" icon="calendar-o" text="预约管理" />
      <van-grid-item id="fifth" icon="credit-pay" text="次卡" />
      <van-grid-item id="sixth" icon="bell" text="失客提醒" />

      <template slot="content"> </template>
      <van-grid-item id="second" icon="todo-list" text="报表" />

      <van-grid-item id="eigth" icon="fire" text="今日生日" />
      <van-grid-item id="ninth" icon="bill-o" text="充值" />
      <van-grid-item id="tenth" icon="paid" text="取现" />
      <van-grid-item
        id="eleventh"
        icon="records"
        text="积分录入"
        to="/bankadd"
      />-->
    </van-grid>
  </div>
</template>
<script>
import { Grid, GridItem, Icon, NavBar } from "vant";
export default {
  data() {
    return {};
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
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
/deep/ #first .van-grid-item__content {
  background-color: #fefaf4;
}
/deep/ #second .van-grid-item__content {
  background-color: #f1f8f6;
}
/deep/ #third .van-grid-item__content {
  background-color: #f4f5ff;
}
/deep/ #fourth .van-grid-item__content {
  background-color: #fdf4f7;
}
/deep/ #fifth .van-grid-item__content {
  background-color: #fefaf4;
}
/deep/ #sixth .van-grid-item__content {
  background-color: #f6f2ff;
}
/deep/ #seventh .van-grid-item__content {
  background-color: #f4faff;
}

/deep/ #eigth .van-grid-item__content {
  background-color: #f4faff;
}
/deep/ #ninth .van-grid-item__content {
  background-color: #fefaf2;
}
/deep/ #tenth .van-grid-item__content {
  background-color: #f1f8f6;
}
/deep/ #eleventh .van-grid-item__content {
  background-color: #fdf4f7;
}
/deep/ .van-icon-friends {
  color: #299cff;
}
/deep/ .van-icon-chart-trending-o {
  color: #f7416c;
}
/deep/ .van-icon-star {
  color: #0cd59e;
}
/deep/ .van-icon-manager {
  color: #4368ff;
}
/deep/ .van-icon-credit-pay {
  color: #7963eb;
}
/deep/ .van-icon-bell {
  color: #ff3440;
}
/deep/ .van-icon- {
  color: #ffa31a;
}
/deep/ .van-icon-commemt {
  color: #f66b00;
}
/deep/ .van-icon-bill-o {
  color: #25d07a;
}
/deep/ .van-icon-paid {
  color: #299cff;
}
</style>