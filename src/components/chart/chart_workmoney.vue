<template>
  <div class="hello">
    <van-nav-bar
      title="员工提成报表"
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
          is-link
          clickable
          name="subcom"
          title="店铺"
          placeholder="点击选择会员店铺"
          @click="showshop = true"
          :value="subname"
        />
        <!-- <van-cell is-link clickable style="text-align: center">
          <template #title>
            <div>
              <a-range-picker
                :ranges="{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')],
                }"
                @change="onChange"
              />
            </div>
          </template>
        </van-cell> -->
        <van-cell
          is-link
          clickable
          style="text-align: center"
          @click="onClickRight"
        >
          <template #title
            >    <van-icon name="search" size="15" color="hotpink"/> 查询
          </template>
        </van-cell>
        <van-popup v-model="showshop" position="bottom">
          <van-picker
            show-toolbar
            :columns="secondshop"
            @confirm="onConfirm"
            @cancel="showshop = false"
          />
        </van-popup>
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
    <van-collapse v-model="activeNames2" class="banktimecenter">
      <van-collapse-item name="1" left>
        <template #title> 快速查询 </template>
        <van-cell title="昨天" is-link @click="yesterday" />
        <van-cell title="今天" is-link @click="today" />
        <van-cell title="近三天" is-link @click="threeday" />
        <van-cell title="近一周" is-link @click="sevenday" />
        <van-cell title="本月" is-link @click="monthday" />
        <van-cell title="全年" is-link @click="yearday" />
      </van-collapse-item>
    </van-collapse>
    <div id="guazai" style="width: 100%"></div>
    <div class="main">
      <v-touch
        @swipeleft="swipeLeft"
        :swipe-options="{ direction: 'horizontal' }"
        @swiperight="swipeRight"
      >
        <table class="chart">
          <tr class="charttitle">
            <td class="firstchart">分店</td>
            <td v-show="index == 1">员工姓名</td>
            <td v-show="index == 1">业绩金额</td>
            <td v-show="index == 1">提成</td>
            <td v-show="index == 2">客数</td>
            <td v-show="index == 2">充值金额</td>
            <td v-show="index == 2">充值提成</td>
            <td v-show="index == 2">操作</td>
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
              {{ item.empName }}
            </td>
            <td v-show="index == 1" class="red">
              {{ item.money }}
            </td>
            <td v-show="index == 1" class="blue">
              {{ item.deductmoney | num }}
            </td>
            <td v-show="index == 2">
              {{ item.count | num }}
            </td>
            <!-- <td v-show="index == 2">
              {{ item.cardpay }}
            </td> -->
            <td v-show="index == 2">
              {{ item.cusmoney | num }}
            </td>
            <td v-show="index == 2">
              {{ item.cusdeductmoney | num }}
            </td>
            <td v-show="index == 2">
              <van-button
                icon="plus"
                type="primary"
                size="mini"
                @click="detail(item)"
                >详情</van-button
              >
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
    <van-popup class="tanchu" v-model="show" get-container="#guazai">
      <van-nav-bar
        title="提成明细"
        :fixed="true"
        :left-arrow="true"
        @click-left="show = false"
        class="bank"
      >
        <template #left>
          <van-icon name="arrow-left" size="21" color="#FFFFFF" />
        </template>
      </van-nav-bar>
      <table class="lizi">
        <tr>
          <td colspan="5">员工服务提成明细</td>
        </tr>
        <tr>
          <td colspan="3">时间:{{ "2020-11-12至2020-11-12" }}</td>
          <td colspan="2">姓名:{{empName }}</td>
        </tr>
        <tr class="charttitle">
          <td>手工单号</td>
          <td>会员姓名</td>
          <td>服务项目</td>
          <td>业绩金额</td>
          <td>业绩提成</td>
        </tr>
        <tr
          v-for="(item, index) in data2"
          :key="index"
          :style="{ background: index % 2 == 0 ? '#F5E699' : '' }"
        >
          <td>{{ item.selfno }}</td>
          <td>
            {{ item.salecusname }}
            <span style="color：red">{{
              item.cus_type == null ? "" : "(" + item.vipname + ")"
            }}</span>
          </td>
          <td>{{ item.goo_name }}</td>
          <td class="blue">{{ item.outstand | num }}</td>
          <td class="red">{{ item.deductmoney | num }}</td>
        </tr>
      </table>
    </van-popup>
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
  Picker,
} from "vant";
import { chart_day, chart_work, chart_work_detail } from "@/API/retrieve.js";
import {
  timeday,
  timeyesterday,
  timethreeday,
  timesevenday,
  timemonthday,
  timeyearday,
} from "@/methods/time";
import { OutOne_find } from "@/API/outone.js";
import moment from "moment";
import { GetList_Hy } from "@/API/getlistvalue.js";
export default {
  data() {
    return {
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
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
      activeNames2: [],
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
      showshop: false,
      secondshop: [],
      subname: "",
      show: false,
      data2: [
        {
          no: "123456",
          name: "总监剪发",
          project: "李四",
          money: "10000",
          money1: "10000",
        },
        {
          no: "123456",
          name: "总监剪发",
          project: "李四",
          money: "10000",
          money1: "10000",
        },
        {
          no: "123456",
          name: "总监剪发",
          project: "李四",
          money: "10000",
          money1: "10000",
        },
        {
          no: "123456",
          name: "总监剪发",
          project: "李四",
          money: "10000",
          money1: "10000",
        },
      ],
      vipname: [],
      empName: "",
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
    [Picker.name]: Picker,
  },

  methods: {
    onConfirm(value) {
      this.subname = value;
      for (let i = 0; i < this.shop.length; i++) {
        if (this.shop[i].name == value) {
          this.subcom = this.shop[i].no;
        }
      }
      this.showshop = false;
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.begindate == "") {
        Toast.fail("请输入开始时间");
      } else if (this.enddate == "") {
        Toast.fail("请输入结束时间");
      } else {
        Toast.loading({
          duration: 0, // 持续展示 toast
          message: "加载中...",
          forbidClick: false,
        });
        var data = {
          begindate: this.begindate,
          enddate: this.enddate,
          subcom: this.subcom,
        };
        // chart_work({
        //   begindate: "2016-12-01",
        //   enddate: "2017-01-30",
        //   empid: "14N.WN+UJ:6PW3WE",
        // }).then((res) => {
        //   console.log(res);
        // });
        chart_work(data).then((res) => {
          Toast.clear();
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
        this.activeNames = [];
      }
    },
    swipeLeft() {
      if (this.index < 2) {
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
    today() {
      this.begindate = timeday();
      this.enddate = timeday();
      this.onClickRight();
      this.activeNames2 = [];
    },
    yesterday() {
      this.begindate = timeyesterday();
      this.enddate = timeyesterday();
      this.onClickRight();
      this.activeNames2 = [];
    },
    threeday() {
      this.begindate = timethreeday().needday;
      this.enddate = timethreeday().day;
      this.onClickRight();
      this.activeNames2 = [];
    },
    sevenday() {
      this.begindate = timesevenday().needday;
      this.enddate = timesevenday().day;
      this.onClickRight();
      this.activeNames2 = [];
    },
    monthday() {
      this.begindate = timemonthday().needday;
      this.enddate = timemonthday().day;
      this.onClickRight();
      this.activeNames2 = [];
    },
    yearday() {
      this.begindate = timeyearday().needday;
      this.enddate = timeyearday().day;
      this.onClickRight();
      this.activeNames2 = [];
    },
    detail(item) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        message: "加载中...",
        forbidClick: false,
      });
      this.empName = item.empName;
      var data = {
        empid: item.empid,
        begindate: this.begindate,
        enddate: this.enddate,
        subcom: this.subcom,
      };
      chart_work_detail(data).then((res) => {
        Toast.clear();
        this.show = true;
        console.log(res);
        this.data2 = res.table;

        this.data2.map((item, index) => {
          item.vipname = this.vipname[item.cus_type - 1];
        });
      });
    },
  },
  created() {
    this.shop = JSON.parse(localStorage.getItem("shop"));
    this.secondshop = this.shop.map((item) => {
      return item.name;
    });
    if (sessionStorage.getItem("vip_list") == null) {
      GetList_Hy({}).then((res) => {
        sessionStorage.setItem("vip_list", JSON.stringify(res.table));
      });
      this.vipname = JSON.parse(sessionStorage.getItem("vip_list")).map(
        function (item) {
          return item.name;
        }
      );
    } else {
      this.vipname = JSON.parse(sessionStorage.getItem("vip_list")).map(
        function (item) {
          return item.name;
        }
      );
    }
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
.tanchu {
  width: 100%;
  height: 100%;
}
.tanchu td {
  border: 1px solid black;
}
.lizi {
  margin-top: 65px;
  width: 90%;
  margin-left: 5%;
  font-size: 0.5rem;
}
</style>
