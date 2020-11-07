<template>
  <div class="hello">
    <van-nav-bar
      title="员工业绩汇总"
      :fixed="true"
      :left-arrow="true"
      right-text="三天前时间"
      @click-left="onClickLeft"
      @click-right="onClickRight"
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
    全总客数：{{ "200000" }}
    <div class="main">
      <v-touch
        @swipeleft="swipeLeft"
        :swipe-options="{ direction: 'horizontal' }"
        @swiperight="swipeRight"
      >
        <table class="chart">
          <tr class="charttitle">
            <td class="firstchart">员工姓名</td>
            <td v-show="index == 1">分店</td>
            <td v-show="index == 1">总客数</td>
            <td v-show="index == 1">男客数</td>
            <td v-show="index == 1">女客数</td>
            <td v-show="index == 2">指名客数</td>
            <td v-show="index == 2">指名业绩</td>
            <td v-show="index == 2">散客客数</td>
            <td v-show="index == 2">散客业绩</td>
            <td v-show="index == 4">新增会员</td>
            <td v-show="index == 4">总业绩</td>
            <td v-show="index == 4">总客单价</td>
            <td v-show="index == 4">个人总业绩占比</td>

            <td v-show="index == 5">指名业绩比例(%)</td>
            <td v-show="index == 5">散客业绩比例(%)</td>
            <td v-show="index == 5">应缴金额</td>
            <td v-show="index == 5">实缴金额</td>
            <td v-show="index == 6">男客数</td>
            <td v-show="index == 6">女客数</td>
            <td v-show="index == 6">指名数</td>
            <td v-show="index == 6">散客数</td>
            <td v-show="index == 7">男客金额</td>
            <td v-show="index == 7">女客金额</td>
            <td v-show="index == 7">日结操作</td>
            <td v-show="index == 7">日结日期</td>
            <td v-show="index == 8">赠送金额</td>
            <td v-show="index == 8">客户挂账金额</td>
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
} from "vant";

import {
  timeday,
  timesevenday,
  timethreeday,
  timemonthday,
} from "@/methods/time";
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
      subcom: "",
      showshop: "false",
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
  },

  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onClickRight() {
      var data = timethreeday();
      console.log(data);
    },
    swipeLeft() {
      if (this.index < 8) {
        this.index++;
      }
      console.log(this.currentPage);
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
          console.log(index); //找出所有大于229的元素
          return item;
        }
      });
      console.log(this.data1);
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
    },
    changcolor(index1) {
      this.changeindex = index1;
    },
  },
  created() {
    this.page = Math.ceil(this.data.length / 8);
    console.log(this.page);
    var that = this;
    this.data1 = this.data.filter(function (item, index) {
      if (index >= (that.currentPage - 1) * 8 && index < that.currentPage * 8) {
        console.log(item); //找出所有大于229的元素
        return item;
      }
    });
    console.log(this.data1);
  },
  mounted() {},
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
  height: 70vh;
  overflow: hidden;
}
.bottompage {
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
