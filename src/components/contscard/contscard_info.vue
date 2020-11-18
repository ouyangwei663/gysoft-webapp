<template>
  <div>
    <van-nav-bar
      title="次卡详情"
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <div class="bb" v-for="(item, index) in List" :key="index">
      <van-card
        :class="index % 2 == 0 ? 'detailedcard' : 'detailedcard2'"
        @click="showoperate(item)"
      >
        <template #title>
          <div class="name">
            {{ item.cus_name }}
          </div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td>护理项目：{{ item.goo_name }}</td>
              <td>总次数：{{ item.totalnum }}</td>
            </tr>
            <tr>
              <td>购买次数：{{ item.num }}</td>
              <td>已用次数：{{ item.usenum }}</td>
            </tr>
            <tr>
              <td>赠送次数：{{ item.givenum }}</td>
              <td>已支付金额：{{ item.factmoney }}</td>
            </tr>
            <tr>
              <td>剩余次数：{{ item.cp_last }}</td>
              <td>
                <van-button
                  v-if="item.num + item.givenum == item.totalnum ? false : true"
                  type="primary"
                  size="mini"
                  @click.stop="clickperson(item)"
                  >续费</van-button
                >
              </td>
            </tr>
          </table>
        </template>
      </van-card>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  Card,
  Tag,
  Button,
  ActionSheet,
  Cell,
  CellGroup,
} from "vant";
import "@/assets/icon/iconfont.css";
import { Customer_find } from "@/API/customer";
import { secondcard_find } from "@/API/secondcard";
export default {
  name: "HellWorld",
  data() {
    return {
      money: "100",
      phone: 13653035648,
      show: false,
      List: [],
      params: {},
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  created() {
    console.log(this.$route.params.enddate);
    if (this.$route.params.enddate !==undefined) {
      this.getdate();
    }
  },
  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },

    getdate() {
      secondcard_find(this.$route.params).then((res) => {
        console.log(res);
        this.List = res.table;
      });
    },
    showoperate(item) {
      this.show = true;
      this.params = item;
    },
    clickperson(item) {
      var params = item;
      console.log(params);
      this.$router.push({
        name: "contscard_pay",
        params,
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/contscard_pay") {
      // 这是路由path

      this.$store.commit("setKeepAlive", ["HellWorld"]); //这是此页面的name属性名字
    } else {
      this.$store.commit("setKeepAlive", []);
    }
    next();
  },
};
</script>
<style scope>
.van-nav-bar {
  background-color: #157aff;
}
.van-nav-bar__title {
  color: #ffffff;
}
.van-tag {
  margin-left: 5vw;
}
.bb {
  margin-left: 5vw;
  margin-bottom: 3vh;
  width: 90vw;
}
.box {
  margin-left: 5vw;
  width: 90vw;
  font-size: 1rem;
  overflow-x: auto;
}
.detailedcard {
  margin-left: 5%;
  width: 90%;
}
.detailedcard2 {
  margin-left: 5%;
  width: 90%;
}
.detailedcard {
  background-color: #3c5276;
  color: white;
  border-radius: 0.4rem;
}
.detailedcard2 {
  background-color: #445e89;
  color: white;
  border-radius: 0.4rem;
}
.van-card__content {
  text-align: left;
}
.van-card__title {
  font-size: 1rem;
}
.name {
  font-size: 1rem;
}
.vipinfo {
  width: 100%;
}
.vipinfo td {
  width: 50%;
}

.van-action-sheet__name {
  /* color: black; */
}
/* .van-cell__title span {
  color: black;
} */
.fl {
  text-align: left;
  width: 90%;
  margin-left: 5%;
}
</style>