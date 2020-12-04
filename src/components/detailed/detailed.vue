<template>
  <div>
    <van-nav-bar
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
      <template #title>
        <span>会员资料</span>
      </template>
    </van-nav-bar>
    <van-sticky :offset-top="46">
      <div style="width: 100%; background: white">
        <van-pagination
          @change="pagechange"
          v-model="currentPage"
          :page-count="totalpage"
          mode="simple"
          style="width: 80%; margin-left: 10%; margin-bottom: 3vh"
        />
      </div>
    </van-sticky>
    <!-- <div class="box">

      <table>
        <tr>
          <td>会员名称</td>
          <td>性别</td>
          <td>会员级别</td>
          <td>充值余额</td>
          <td>赠送余额</td>
          <td>手机号</td>
          <td>卡号</td>
        </tr>
      </table>
    </div>-->

    <div class="bb" v-for="(item, index) in List" :key="index">
      <van-card
        :class="index % 2 == 0 ? 'detailedcard' : 'detailedcard2'"
        @click="showoperate(item)"
      >
        <template #title>
          <div class="name">
            {{ item.cus_name }}&nbsp;{{ "        " }}{{ "("
            }}{{ item.sex !== "女士" ? "男士" : "女士" }}{{ ")" }}
            <!-- <van-icon
              v-show="item.sex !== '女士'"
              class="iconfont"
              class-prefix="icon"
              name="nan"
              color="#15FFE7"
            /><van-icon
              v-show="item.sex == '女士'"
              class="iconfont"
              class-prefix="icon"
              name="-businesswoman"
              color="#F5005C"
            /> -->
            <van-tag type="primary" round color="#703DD8" size="medium">{{
              item.vipname
            }}</van-tag>
          </div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td>
                充值余额：{{ item.lastmoney === null ? 0 : item.lastmoney }}
              </td>
              <td>卡号：{{ item.cardno }}</td>
            </tr>
            <tr>
              <td>
                赠送余额：{{
                  item.givehavemoney === null ? 0 : item.givehavemoney
                }}
              </td>
              <td>手机：{{ item.mobile }}</td>
            </tr>
            <tr>
              <td colspan="2">
                备注：{{ item.memo === null ? "无" : item.memo }}
              </td>
            </tr>
            <tr>
              <td>
                最后来店：{{
                  item.last_date === null ? "暂无记录" : item.last_date
                }}
              </td>
              <td>
                <van-button
                  type="primary"
                  size="mini"
                  @click.stop="clickperson(item)"
                  >详细资料</van-button
                >
              </td>
            </tr>
          </table>
        </template>
      </van-card>

      <van-action-sheet v-model="show" title="会员操作">
        <div>
          <van-cell
            title="充值"
            icon="gold-coin-o"
            is-link
            @click="tocrash()"
          />
          <van-cell title="取现" icon="idcard" is-link @click="tomoney()" />
          <van-cell title="恢复会员" icon="share-o" is-link />
          <van-cell title="注销会员" icon="close" is-link />
          <van-cell
            title="销售次卡"
            icon="add-o"
            is-link
            @click="tocontscard(item)"
          />
          <van-cell title="赠送充值" icon="gift-o" is-link />
          <van-cell title="赠送次卡" icon="gift-card-o" is-link />
        </div>
      </van-action-sheet>
    </div>
    <div id="air"></div>
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
  Pagination,
  Sticky,
} from "vant";
import "@/assets/icon/iconfont.css";
import { Customer_find } from "@/API/customer";
import "@/assets/icon2/iconfont.css";
import { timetwo } from "@/methods/time.js";
export default {
  name: "Detailed",
  data() {
    return {
      money: "100",
      phone: 13653035648,
      show: false,
      List: [],
      params: {},
      vipname: [],
      currentPage: 1,
      totalpage: "",
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
    [Pagination.name]: Pagination,
    [Sticky.name]: Sticky,
  },
  created() {
    this.getdate();
    this.vipname = JSON.parse(sessionStorage.getItem("vip_list")).map(function (
      item
    ) {
      return item.name;
    });
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
      var that = this;
      Customer_find(this.$route.params).then((res) => {
        console.log(res);
        that.totalpage = res.extended.totalpage;
        that.List = res.table;
        this.List.map((item) => {
          if (item.last_date) {
            item.last_date = timetwo(item.last_date);
          }
        });
        that.List.map((item, index) => {
          item.vipname = that.vipname[item.cus_type - 1];
        });
      });
    },
    showoperate(item) {
      this.show = true;
      this.params = item;
    },
    pagechange() {
      this.$route.params.pageindex = this.currentPage;
      console.log(this.$route.params);
      this.getdate();
    },
    tocrash() {
      var params = this.params;
      this.$router.push({
        name: "crash",
        params,
      });
      this.show = false;
    },
    tomoney() {
      var params = this.params;
      this.$router.push({
        name: "money",
        params,
      });
      this.show = false;
    },
    tocontscard(item) {
      var params = this.params;
      console.log(params);
      this.$router.push({
        name: "contscard",
        params,
      });
      this.show = false;
    },
    clickperson(item) {
      var params = { cusid: item.cusid };
      console.log(params);
      this.$router.push({
        name: "HelloWorld",
        params,
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/info") {
      // 这是路由path

      this.$store.commit("setKeepAlive", "HellWorld"); //这是此页面的name属性名字
    } else {
      this.$store.commit("setKeepAlive", "HellWorld");
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
#air {
  width: 100%;
  height: 5vh;
}
</style>