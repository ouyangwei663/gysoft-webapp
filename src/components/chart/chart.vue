<template>
  <div class="hello">
    <van-nav-bar
      title="日营业情况"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
      class="bank"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-collapse v-model="activeNames" class="banktimecenter">
      <van-collapse-item name="1" left>
        <template #title> 日期：{{ begindate }} 到 {{ enddate }} </template>
        <van-cell
          title="开始时间"
          is-link
          :value="begindate"
          @click="showtime = true"
        />
        <van-cell
          title="结束时间"
          is-link
          :value="enddate"
          @click="showendtime = true"
        />
        <van-cell
          title="店铺"
          is-link
          :value="subcom"
          @click="showshop = true"
        />
        <van-popup v-model="showtime" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="handleEndDateConfirm"
            @cancel="showtime = false"
          />
        </van-popup>
        <van-popup v-model="showendtime" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="endhandleEndDateConfirm"
            @cancel="showendtime = false"
          />
        </van-popup>
      </van-collapse-item>
    </van-collapse>
    <div class="main">
      <v-touch
        @swipeleft="swipeLeft"
        :swipe-options="{ direction: 'horizontal' }"
        @swiperight="swipeRight"
      >
        <table class="chart">
          <tr class="charttitle">
            <td class="firstchart">分店</td>
            <td v-show="index == 1">日期</td>
            <td v-show="index == 1">日结</td>
            <td v-show="index == 1">总业绩</td>
            <td v-show="index == 2">产品金额</td>

            <td v-show="index == 2">劳动业绩</td>
            <td v-show="index == 3" colspan="4">
              <table class="secondchart">
                <tr>
                  <td colspan="4">会员首次充值</td>
                </tr>
                <tr>
                  <td>笔数</td>
                  <td>现金</td>
                  <td>银行</td>
                </tr>
              </table>
            </td>
            <td v-show="index == 4" colspan="4">
              <table class="secondchart">
                <tr>
                  <td colspan="4">会员续费充值</td>
                </tr>
                <tr>
                  <td>笔数</td>
                  <td>现金</td>
                  <td>银行</td>
                </tr>
              </table>
            </td>
            <td v-show="index == 5" colspan="4">
              <table class="secondchart">
                <tr>
                  <td colspan="4">销售次卡</td>
                </tr>
                <tr>
                  <td>笔数</td>
                  <td>现金</td>
                  <td>银行</td>
                  <td>会员</td>
                </tr>
              </table>
            </td>
            <td v-show="index == 6" colspan="4">
              <table class="secondchart">
                <tr>
                  <td colspan="4">消费</td>
                </tr>
                <tr>
                  <td>现金</td>
                  <td>银行</td>
                  <td>会员</td>
                  <td>挂账</td>
                </tr>
              </table>
            </td>
            <td v-show="index == 7">消费券</td>
            <td v-show="index == 7">赠送金额</td>
            <td v-show="index == 7">次卡消费</td>
            <td v-show="index == 7">合计</td>

            <td v-show="index == 8">会员取款</td>
            <td v-show="index == 8">店面费用</td>
            <td v-show="index == 8">支付宝</td>
            <td v-show="index == 8">微信</td>
            <td v-show="index == 9">总手工费</td>
            <td v-show="index == 9">应缴现金</td>
            <td v-show="index == 9">男客数</td>
            <td v-show="index == 9">女客数</td>
            <td v-show="index == 10">指名数</td>
            <td v-show="index == 10">散客数</td>
            <td v-show="index == 10">男客金额</td>
            <td v-show="index == 10">女客金额</td>
            <td v-show="index == 11">日结操作</td>
            <td v-show="index == 11">日结日期</td>
          </tr>

          <tr
            class="second"
            v-for="(item, index1) in data1"
            :key="index1"
            :class="index1 % 2 == 0 ? 'bgwhite' : ''"
            @click="changcolor(index1)"
            :style="{ background: index1 == changeindex ? '#F5E699' : '' }"
          >
            <td class="secondtitle">
              {{ "伊美东平店" }}
            </td>
            <td v-show="index == 1">
              {{ item.outdate }}
            </td>
            <td v-show="index == 1" class="red">
              {{ item.ishavedayclose == null ? "未日结" : "已日结" }}
            </td>
            <td v-show="index == 1">
              {{ item.totalmoney | num }}
            </td>
            <td v-show="index == 2">
              {{ item.promoney | num }}
            </td>
            <!-- <td v-show="index == 2">
              {{ item.cardpay }}
            </td> -->
            <td v-show="index == 2">
              {{ item.workmoney | num }}
            </td>
            <td v-show="index == 3" colspan="4">
              <table style="width: 100%">
                <tr>
                  <td style="width: 33.3%" v-show="index == 3">
                    {{ item.storecount | num }}
                  </td>
                  <td style="width: 33.3%" v-show="index == 3">
                    {{ item.storemoney_crash | num }}
                  </td>
                  <td style="width: 33.3%" v-show="index == 3">
                    {{ item.storemoney_bank | num }}
                  </td>
                </tr>
              </table>
            </td>

            <td v-show="index == 4" colspan="4">
              <table style="width: 100%">
                <tr>
                  <td style="width: 33.3%" v-show="index == 4">
                    {{ item.count2 | num }}
                  </td>
                  <td style="width: 33.3%" v-show="index == 4">
                    {{ item.count2money | num }}
                  </td>
                  <td style="width: 33.3%" v-show="index == 4">
                    {{ item.count2bank | num }}
                  </td>
                </tr>
              </table>
            </td>
            <td v-show="index == 5" colspan="4">
              <table style="width: 100%">
                <tr>
                  <td style="width: 25%" v-show="index == 5">
                    {{ item.nursecardcount | num }}
                  </td>
                  <td style="width: 25%" v-show="index == 5">
                    {{ item.nursecard_crashcard | num }}
                  </td>
                  <td style="width: 25%" v-show="index == 5">
                    {{ item.nursecard_bankcard | num }}
                  </td>
                  <td style="width: 25%" v-show="index == 5">
                    {{ item.nursecard_membercard | num }}
                  </td>
                </tr>
              </table>
            </td>
            <td v-show="index == 6" colspan="4">
              <table style="width: 100%">
                <tr>
                  <td style="width: 25%">
                    {{ item.crash | num }}
                  </td>
                  <td style="width: 25%">
                    {{ item.memcard | num }}
                  </td>
                  <td style="width: 25%">
                    {{ item.bankcard | num }}
                  </td>
                  <td style="width: 25%">
                    {{ item.debt | num }}
                  </td>
                </tr>
              </table>
            </td>
            <td v-show="index == 7">
              {{ item.ticketmoney | num }}
            </td>
            <td v-show="index == 7">
              {{ item.usegivemoney | num }}
            </td>
            <td v-show="index == 7">
              {{ item.nursecard | num }}
            </td>
            <td class="red" v-show="index == 7">
              {{ item.usetotal | num }}
            </td>
            <td v-show="index == 8">
              {{ item.membergetmoney }}
            </td>
            <td v-show="index == 8" class="blue">
              {{ item.feemoney | num }}
            </td>
            <td v-show="index == 8">
              {{ item.zfbmoney | num }}
            </td>
            <td v-show="index == 8">
              {{ item.wxmoney | num }}
            </td>
            <td v-show="index == 9">
              {{ item.handmoney | num }}
            </td>
            <td v-show="index == 9">
              {{ item.shouldpay | num }}
            </td>
            <td v-show="index == 9">
              {{ item.mancount | num }}
            </td>
            <td v-show="index == 9">
              {{ item.womancount | num }}
            </td>
            <td v-show="index == 10">
              {{ item.ordercount | num }}
            </td>
            <td v-show="index == 10">
              {{ item.notordercount }}
            </td>
            <td v-show="index == 10" style="color: #7963eb">
              {{ item.mancountmoney | num }}
            </td>
            <td v-show="index == 10" style="color: #63a2eb">
              {{ item.womancountmoney | num }}
            </td>
            <td v-show="index == 11">
              {{ item.person }}
            </td>
            <td v-show="index == 11">
              {{ item.enddata }}
            </td>
          </tr>
        </table>
      </v-touch>
    </div>
    <van-pagination
      class="bottompage"
      v-model="currentPage"
      :page-count="page"
      @change="pagechage"
    />
  </div>
</template>

<script>
import {
  Cell,
  NavBar,
  Icon,
  CellGroup,
  Card,
  Button,
  Popup,
  Collapse,
  CollapseItem,
  NoticeBar,
  DatetimePicker,
  Image,
  Empty,
  Sticky,
  Pagination,
  Toast,
} from "vant";
import { chart_day } from "@/API/retrieve.js";
import { timeday } from "@/methods/time";
import { OutOne_find } from "@/API/outone.js";
export default {
  data() {
    return {
      page: "",
      currentPage: 1,
      List: [
        { show: false, bottom: false },
        { show: false, bottom: false },
      ],
      container: null,
      data: [],
      Listtrue: [],
      data1: [],
      activeNames: [],
      begindate: "",
      enddate: "",
      showtime: false,
      showendtime: false,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      outno: "",
      empty: false,
      index: 1,
      changeindex: "10000",
      subcom: "",
      showshop: false,
      shop: [],
    };
  },
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [NoticeBar.name]: NoticeBar,
    [DatetimePicker.name]: DatetimePicker,
    [Image.name]: Image,
    [Empty.name]: Empty,
    [Sticky.name]: Sticky,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
  },

  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onClickRight() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        message: "加载中...",
        forbidClick: false,
      });
      var data = {
        begindate: this.begindate,
        enddate: this.enddate,
      };
      chart_day(data).then((res) => {
        Toast.clear();
        console.log("数据", res);
        this.data = res.table;

        this.page = Math.ceil(this.data.length / 8);

        var that = this;
        this.data1 = this.data.filter(function (item, index) {
          if (
            index >= (that.currentPage - 1) * 8 &&
            index < that.currentPage * 8
          ) {
            return item;
          }
        });
        this.currentPage = 1;
      });
    },
    swipeLeft() {
      if (this.index < 10) {
        this.index++;
      }
    },
    swipeRight() {
      if (this.index != 1) {
        this.index--;
      }
    },
    pagechage() {
      var that = this;
      this.data1 = this.data.filter(function (item, index) {
        if (
          index >= (that.currentPage - 1) * 8 &&
          index < that.currentPage * 8
        ) {
          return item;
        }
      });
    },
    handleEndDateConfirm(value) {
      this.timeShow = false;
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.begindate = timer;
      this.showtime = false;
      if (this.enddate != "") {
        this.onClickRight();
      }
    },
    endhandleEndDateConfirm(value) {
      this.timeShow = false;
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.enddate = timer;
      this.showendtime = false;

      if (this.begindate != "") {
        this.onClickRight();
      }
    },
    changcolor(index1) {
      this.changeindex = index1;
    },
  },
  created() {
    this.shop = JSON.parse(localStorage.getItem("shop"));
  },
  mounted() {},

  filters: {
    num: (value) => {
      if (!value) return "0";

      /*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
      /*后来改成了 Number(value)|0,但是输入超过十一位就为负数了，具体见评论 */
      var intPart = Number(value) - (Number(value) % 1); //获取整数部分（这里是windy93的方法）
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断

      var value2Array = value.toString().split(".");

      //=2表示数据有小数位
      if (value2Array.length == 2) {
        var floatPart = value2Array[1].toString(); //拿到小数部分

        if (floatPart.length == 1) {
          //补0,实际上用不着
          return intPartFormat;
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-cell-group {
  margin-left: 5%;
}
.van-cell-group td {
  width: 50%;
}
.van-cell {
  text-align: left;
}
.fright {
  text-align: left;
}
.bankpopup {
  padding-top: 3vh;
  padding-bottom: 3vh;
}
.bankone {
  border-radius: 0.3rem;
  width: 90%;
  font-size: 0.7rem;
  margin-left: 5%;
  color: white;
  background-color: #157aff;
  margin-bottom: 3vh;
}
.banktwo {
  border-radius: 0.3rem;
  width: 80%;
  font-size: 0.7rem;
  margin-left: 10%;
  color: white;
  background-color: #25d07a;
}
.bankcenter {
  width: 90%;
  margin-left: 5%;
}
/deep/ .van-nav-bar__text {
  color: white;
}
.banktimecenter {
  text-align: left;
  width: 90%;
  margin-left: 5%;
}
.banktable {
  width: 100%;
  background: #f8f8f8;
}
.chart {
  width: 98%;
  margin-left: 1%;
  height: 100px;
}
.chart td {
  height: 48px;
}
.firstchart {
  width: 20%;
}
.secondchart {
  margin: 0;
  padding: 0;
  width: 100%;
}
.secondchart td {
  height: 23px;
}
.charttitle {
  color: #333333;
  background-color: #f4f6ff;
  font-weight: bold;
}
.chart .secondtitle {
  color: #333333;
  font-weight: bold;
}
.chart .second {
  font-size: 0.5rem;
  border-bottom: 1px solid #eff3f3;
}
.main {
  margin-left: 5%;
  width: 90%;
}
.bottompage {
  margin-top: 3vh;
  margin-left: 10%;
  width: 80%;
}
.red {
  color: red;
}
.blue {
  color: #2855fa;
}
.bgwhite {
  background: #f8f1f1;
}
.yellow {
  background: lightgreen;
}
</style>
