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
              <td>护理项目：{{ item.project }}</td>
              <td>总次数：{{ item.allcount }}</td>
            </tr>
            <tr>
              <td>已付次数：{{ item.paycount }}</td>
              <td>已用次数：{{ item.usecount }}</td>
            </tr>
            <tr>
              <td>总金额：{{ item.allprice }}</td>
              <td>已支付金额：{{ item.havepay }}</td>
            </tr>
            <tr>
              <td>未付金额：{{ item.nopay }}</td>
              <td>
                <van-button
                  v-if="item.nopay == 0 ? false : true"
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
export default {
  data() {
    return {
      money: "100",
      phone: 13653035648,
      show: false,
      List: [
        {
          cus_name: "张三",
          project: "剪发",
          allcount: "10",
          paycount: "2",
          usecount: "1",
          allprice: "2000",
          havepay: "488",
          nopay: "512",
        },
        {
          cus_name: "李四",
          project: "洗头",
          allcount: "10",
          paycount: "10",
          usecount: "1",
          allprice: "2000",
          havepay: "2000",
          nopay: "0",
        },
        {
          cus_name: "王五",
          project: "剪发",
          allcount: "10",
          paycount: "2",
          usecount: "1",
          allprice: "2000",
          havepay: "488",
          nopay: "512",
        },
      ],
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
    this.getdate();
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
      // var that = this;
      // Customer_find(this.$route.params).then((res) => {
      //   console.log(res);
      //   that.List = res.table;
      // });
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