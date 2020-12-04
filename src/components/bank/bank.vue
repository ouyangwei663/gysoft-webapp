<template>
  <div class="hello">
    <van-nav-bar
      title="收银查询"
      :fixed="true"
      :left-arrow="true"
      right-text="来客登记"
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
          title="时间"
          readonly
          clickable
          :value="timename"
          placeholder="点击选择时间"
          @click="showlist = true"
          class="checktwoone"
        />
        <van-popup v-model="showlist" position="bottom">
          <van-picker
            show-toolbar
            :columns="timedate"
            @confirm="onConfirmtime"
            @cancel="showlist = false"
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
    <van-cell
      class="bankcenter"
      title="高级查询"
      is-link
      @click="toBankcheck"
    />

    <van-empty v-if="empty" image="error" description="Data is empty" />
    <van-sticky  :offset-top="46">
      <div style="width: 100%; background: white">
        <van-pagination v-if="!empty"
          @change="pagechange"
          v-model="currentPage"
          :page-count="totalpage"
          mode="simple"
          style="width: 80%; margin-bottom: 3vh; float: left"
        /><van-button
          @click="reflash"
          type="primary"
          style="width: 20%; margin-bottom: 3vh;"
        >
          刷新
        </van-button>
        <div class="clear"></div>
      </div>
    </van-sticky>
    <div class="bb" v-for="(item, index) in Listtrue" :key="index">
      <van-card :class="index % 2 == 0 ? 'detailedcard' : 'detailedcard2'">
        <template #title>
          <div class="name">{{ item.out_no }}({{ item.selfno }})</div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td>
                项目:{{ item.goodname }}
                <!-- {{ item.cus_type == null ? "" : "(" + item.cardno + ")" }} -->
              </td>
              <td>日期:{{ item.out_date1 }}</td>
            </tr>
            <tr>
              <td>
                客户：{{ item.cus_name === null ? "散客" : item.cus_name }}({{
                  item.sex == "N" ? "女士" : "男士"
                }}) &nbsp;{{ item.oneisorder == "Y" ? "指名" : "轮牌" }}
              </td>
              <td>
                员工：{{ item.firstemp === null ? "暂无记录" : item.firstemp }}
              </td>
            </tr>
            <tr>
              <td v-show="item.havepay == 'Y'" class="blue">
                <span style="color: white"> 金额:{{ item.factmoney }}</span
                >(已付款)
              </td>
              <td v-show="item.havepay == 'N'" class="red">
                <span style="color: white"> 金额:{{ item.factmoney }}</span
                >(未付款)
              </td>
              <td>
                <van-button
                  type="primary"
                  size="mini"
                  @click.stop="clickon(item)"
                  >详细资料</van-button
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
  Tag,
  Picker,
  Pagination,
  Sticky,
} from "vant";

import { OutOne_find } from "@/API/outone.js";
import {
  timehalf,
  timeday,
  timetwoyearday,
  timeyesterday,
  timesevenday,
  timemonthday,
  timeyearday,
} from "@/methods/time";
export default {
  name: "bank",
  data() {
    return {
      phone: "131351356485",
      List: [],
      Listtrue: [],
      activeNames: [],
      begindate: "",
      enddate: "",
      showtime: false,
      showendtime: false,
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2020, 12, 1),
      currentDate: new Date(),
      outno: "",
      empty: false,
      activeNames: [],
      showlist: false,
      timedate: ["今天", "昨天", "近一周", "本月", "全年"],
      timename: "",
      currentPage: 1,
      totalpage: "",
      pam: {},
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
    [Tag.name]: Tag,
    [Picker.name]: Picker,
    [Pagination.name]: Pagination,
    [Sticky.name]: Sticky,
  },
  activated() {
    this.$store.commit("setbankperson", {});
    this.$store.commit("resetKeepAlive", ["bank"]);
    this.$store.commit("setfrompage", false);
    console.log(this.$route.params);
    if (JSON.stringify(this.$route.params) !== "{}") {
      console.log(this.$route.params);
      this.begindate = this.$route.params.begindate;
      this.enddate = this.$route.params.enddate;
      var pam = {};
      pam.begindate = this.begindate;
      pam.enddate = this.enddate;

      if (this.$route.params.enddate == null) {
        pam.subcom = window.localStorage.getItem("subcom");
      } else {
        pam.subcom = this.$route.params.subcom;
      }
      OutOne_find(pam).then((res) => {
        this.pam = pam;
        console.log("查询结果", res.table);
        if (res.table[0].subcom === null) {
          this.empty = true;
          this.Listtrue = [];
        } else {
          this.empty = false;
          this.totalpage = res.extended.totalpage;
          this.Listtrue = res.table.map(function (item) {
            item.out_date1 = timehalf(item.out_date);
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    }
  },

  methods: {
    onConfirmtime(value) {
      this.timename = value;
      if (value == "今天") {
        console.log("今天");
        this.begindate = timeday();
        this.enddate = timeday();
        this.getbaninfo();
      } else if (value == "昨天") {
        console.log("昨天");
        this.begindate = timeyesterday();
        this.enddate = timeyesterday();
        this.getbaninfo();
      } else if (value == "近一周") {
        console.log("近一周");
        this.begindate = timesevenday().needday;
        this.enddate = timesevenday().day;
        this.getbaninfo();
      } else if (value == "本月") {
        console.log("本月");
        this.begindate = timemonthday().needday;
        this.enddate = timemonthday().day;
        this.getbaninfo();
      } else if (value == "全年") {
        console.log("全年");
        this.begindate = timeyearday().needday;
        this.enddate = timeyearday().day;
        this.getbaninfo();
      }

      this.showlist = false;
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.push({ name: "shouye" });
    },
    onClickRight() {
      this.$router.push({
        name: "bankadd",
      });
    },
    click(index) {
      this.Listtrue[index].bottom = true;
    },
    clickon(item) {
      var params = {};
      params = item;
      var bankperson = {
        cus_name: item.cus_name,
        sex: item.sex,
        vip: item.carcname,
        cardno: item.cardno,
      };
      this.$store.commit("setbankperson", bankperson);
      this.$router.push({
        name: "bankaddco",
        params,
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
      this.getbaninfo();
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
      this.getbaninfo();
    },
    toBankcheck() {
      var params = {};
      params.begindate = this.begindate;
      params.enddate = this.enddate;

      this.$router.push({
        name: "bankcheck",
        params,
      });
    },
    pagechange() {
      var pam = this.pam;
      pam.indexpage = this.currentPage;
      OutOne_find(pam).then((res) => {
        if (res.table[0].subcom === null) {
          this.empty = true;
          this.Listtrue = [];
        } else {
          console.log("翻页了", res);
          this.empty = false;

          this.totalpage = res.extended.totalpage;

          this.Listtrue = res.table.map(function (item) {
            item.out_date1 = timehalf(item.out_date);
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    },
    reflash() {
      var pam = this.pam;
      OutOne_find(pam).then((res) => {
        if (res.table[0].subcom === null) {
          this.empty = true;
          this.Listtrue = [];
        } else {
          console.log("刷新了", res);
          this.empty = false;

          this.totalpage = res.extended.totalpage;

          this.Listtrue = res.table.map(function (item) {
            item.out_date1 = timehalf(item.out_date);
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    },
    getbaninfo() {
      var pam = {};
      pam.begindate = this.begindate;
      pam.enddate = this.enddate;
      pam.subcom = window.localStorage.getItem("subcom");
      OutOne_find(pam).then((res) => {
        this.pam = pam;
        if (res.table[0].subcom === null) {
          this.empty = true;
          this.Listtrue = [];
        } else {
          this.empty = false;
          console.log("查询出来", res);
          this.totalpage = res.extended.totalpage;

          this.Listtrue = res.table.map(function (item) {
            item.out_date1 = timehalf(item.out_date);
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    },
  },

  created() {
    console.log("初始化了");
    this.$store.commit("setfrompage", false);
    if (JSON.stringify(this.$route.params) !== "{}") {
      var pam = this.$route.params;
      this.begindate = pam.begindate;
      this.enddate = pam.enddate;
      OutOne_find(pam).then((res) => {
        this.pam = pam;
        if (res.table[0].cusid === null) {
          this.empty = true;
        } else {
          this.empty = false;
          console.log("查询结果", res.table);
          this.Listtrue = res.table.map(function (item) {
            this.totalpage = res.extended.totalpage;
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    } else {
      this.begindate = timeday();
      this.enddate = this.begindate;

      var pam = {};
      pam.begindate = this.begindate;
      pam.enddate = this.enddate;
      pam.subcom = window.localStorage.getItem("subcom");
      OutOne_find(pam).then((res) => {
        this.pam = pam;
        console.log("查询结果", res.table);
        if (res.table[0].cusid === null) {
          this.empty = true;
        } else {
          this.empty = false;
          this.Listtrue = res.table.map(function (item) {
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/bankadd") {
      // 这是路由path

      this.$store.commit("setKeepAlive", "bankadd"); //这是此页面的name属性名字
      this.$store.commit("setKeepAlive", "bank"); //这是此页面的name属性名字
    } else if (to.path === "/bankaddco") {
      this.$store.commit("setKeepAlive", "bankadd"); //这是此页面的name属性名字
      this.$store.commit("setKeepAlive", "bank"); //这是此页面的name属性名字
      // this.$store.commit("setKeepAlive", []);
    }
    next();
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
  background: #423eb1;
}
.bb {
  margin-left: 2.5vw;
  margin-bottom: 3vh;
  width: 95vw;
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
.bb table {
  width: 100%;
}
.bb table td {
  width: 50%;
}
.blue {
  color: #cd5c5c;
}
.red {
  color: red;
}
.clear {
  clear: both;
}
</style>
