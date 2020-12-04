<template>
  <div class="hello">
    <van-nav-bar
      title="店面营业报表"
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
        <van-cell
          is-link
          clickable
          style="text-align: center"
          @click="onClickRight"
        >
          <template #title
            >
            
            <van-icon name="search" size="15" color="hotpink"/> 查询
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
    <div>
      <h3>店面统计报表</h3>
      <table class="chart_shop">
        <tr>
          <td colspan="3">
            日期： {{ dataobj.date }}
            <span style="margin-left: 2rem">
              分店:<span class="secondname">{{ dataobj.subcom }}</span></span
            >
          </td>
        </tr>
        <tr>
          <td>
            现金消费:<span class="secondname">{{
              Math.ceil(dataobj.crash) | num
            }}</span>
          </td>
          <td>
            支出:<span class="secondname">{{
              Math.ceil(dataobj.out) | num
            }}</span>
          </td>
          <td>
            单号张数:<span class="secondname">{{
              Math.ceil(dataobj.count) | num
            }}</span>
          </td>
        </tr>
        <tr>
          <td>
            会员卡消费:<span class="secondname">{{
              Math.ceil(dataobj.member) | num
            }}</span>
          </td>
          <td>
            现金充值:<span class="secondname">{{
              Math.ceil(dataobj.storecrash) | num
            }}</span>
          </td>
          <td>
            应缴现金:<span class="secondname">{{
              Math.ceil(dataobj.shouldmoney) | num
            }}</span>
          </td>
        </tr>
        <tr>
          <td>
            银行卡消费:<span class="secondname">{{
              Math.ceil(dataobj.bank) | num
            }}</span>
          </td>
          <td>
            银行卡充值:<span class="secondname">{{
              Math.ceil(dataobj.storebank) | num
            }}</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            赠送额消费:<span class="secondname">{{
              Math.ceil(dataobj.give) | num
            }}</span>
          </td>
          <td>
            赠送充值:<span class="secondname">{{
              Math.ceil(dataobj.storegive) | num
            }}</span>
          </td>
          <td></td>
        </tr>
      </table>
      <table class="chart_shop_second">
        <tr
          style="text-align: center; color: #333333; background-color: #f4f6ff"
        >
          <td>项目分类</td>
          <td>客数</td>
          <td>男客</td>
          <td>女客</td>
          <td>客单价</td>
          <td>总价</td>
        </tr>
        <tr
          v-for="(item, index) in data"
          :key="index"
          :style="{ background: index % 2 == 0 ? '#f8f1f1' : '' }"
        >
          <td>{{ item.itemname }}</td>
          <td>{{ item.count | num }}</td>
          <td>{{ item.man | num }}</td>
          <td>{{ item.woman | num }}</td>
          <td>{{ Math.ceil(item.price) | num }}</td>
          <td>{{ Math.ceil(item.money) | num }}</td>
        </tr>
      </table>
    </div>
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

import { OutOne_find } from "@/API/outone.js";
import { chart_shop } from "@/API/retrieve.js";
import {
  timeday,
  timeyesterday,
  timethreeday,
  timesevenday,
  timemonthday,
  timeyearday,
} from "@/methods/time";
export default {
  data() {
    return {
      List: [
        { show: false, bottom: false },
        { show: false, bottom: false },
      ],
      container: null,
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
      data: [],
      dataobj: {},
      activeNames2: [],
      secondshop: [],
      subcom: "",
      subname: "",
      showshop: false,
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
          console.log("店铺编号", this.shop[i].no);
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
        var that = this;

        var data = {
          begindate: this.begindate,
          enddate: this.enddate,
          subcom: this.subcom,
        };
        chart_shop(data).then((res) => {
          console.log(res);
          that.dataobj = res.extended;
          that.data = res.table;
          Toast.clear();
        });
        this.activeNames = [];
      }
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
      console.log(timer);
      this.showendtime = false;
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
  },
  created() {
    this.shop = JSON.parse(localStorage.getItem("shop"));
    console.log(this.shop);
    this.secondshop = this.shop.map((item) => {
      return item.name;
    });
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

.red {
  color: red;
}
.blue {
  color: #2855fa;
}
.chart_shop {
  border: 1px solid black;
  width: 90%;
  margin-left: 5%;
  text-align: left;
  color: #333333;
  font-weight: bold;
  font-size: 0.5rem;
}
.chart_shop td {
  height: 1.5rem;
}
.chart_shop .secondname {
  color: #828283;
  font-weight: normal;
  font-size: 0.4rem;
  margin-left: 0.4rem;
}
.chart_shop_second {
  text-align: left;
  margin-top: 2vh;
  width: 90%;
  margin-left: 5%;
}
.chart_shop_second td {
  height: 1.5rem;
  border: 1px solid #d7d4cf;
}
</style>
