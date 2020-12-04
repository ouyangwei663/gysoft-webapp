<template>
  <div class="hello">
    <van-grid
      :column-num="3"
      icon-size="30"
      gutter="30"
      :border="false"
      :square="true"
    >
      <van-grid-item
        id="first"
        icon="friends"
        text="会员管理"
        to="/vipcheck"
      ></van-grid-item>
      <van-grid-item
        id="second"
        icon="gold-coin"
        text="收银"
        @click="toBank()"
      />
      <van-grid-item v-if="false" id="seventh" icon="aim" text="回访跟踪" />
      <van-grid-item
        id="seventh"
        icon="manager"
        text="员工"
        to="/worker_check"
      />

      <van-grid-item v-if="false" id="third" icon="star" text="会员积分" />

      <van-grid-item
        v-if="false"
        id="fourth"
        icon="calendar-o"
        text="预约管理"
      />
      <van-grid-item
        id="fifth"
        icon="credit-pay"
        text="次卡"
        @click="toContscard_check()"
      />
      <van-grid-item v-if="false" id="sixth" icon="bell" text="失客提醒" />

      <van-grid-item
        id="second"
        icon="todo-list"
        text="报表"
        @click="toChart()"
      />
      <van-grid-item
        v-if="true"
        id="ninth"
        icon="bill-o"
        text="会员账本"
        @click="tobook()"
      />
      <van-grid-item v-if="false" id="eigth" icon="fire" text="今日生日" />
      <van-grid-item v-if="false" id="ninth" icon="bill-o" text="充值" />

      <van-grid-item v-if="false" id="tenth" icon="paid" text="取现" />
      <van-grid-item
        v-if="false"
        id="ninth"
        icon="bill-o"
        text="职务权限"
        @click="toJug()"
      />
      <!-- <van-grid-item
        id="eleventh"
        icon="records"
        text="积分录入"
        to="/bankadd"
      /> -->
    </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from "vant";

export default {
  name: "shouye",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toBank() {
      this.$router.push({
        name: "bank",
      });
    },
    toContscard_check() {
      this.$router.push({
        name: "contscard_check",
      });
    },
    hide() {
      console.log(111);
      this.visible = false;
    },
    toChart() {
      this.$router.push({
        name: "chart_route",
      });
    },
    toJug() {
      this.$router.push({
        name: "jug",
      });
    },
    tobook() {
      this.$router.push({
        name: "book",
      });
    },
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
/deep/ .van-icon-gold-coin {
  color: #f7416c;
}
/deep/ .van-icon-star {
  color: #0cd59e;
}
/deep/ .van-icon-calendar-o {
  color: #4368ff;
}
/deep/ .van-icon-credit-pay {
  color: #7963eb;
}
/deep/ .van-icon-bell {
  color: #ff3440;
}
/deep/ .van-icon-aim {
  color: #ffa31a;
}
/deep/ .van-icon-fire {
  color: #f66b00;
}
/deep/ .van-icon-bill-o {
  color: #25d07a;
}
/deep/ .van-icon-paid {
  color: #299cff;
}
</style>


