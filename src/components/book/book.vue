<template>
  <div class="hello">
    <van-nav-bar
      title="会员账本"
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
        <template #title>快速查询</template>
        <van-cell
          title="时间"
          readonly
          clickable
          :value="timename"
          placeholder="点击选择时间"
          @click="showlist = true"
          class="checktwoone"
        />
        <van-cell
          title="店铺"
          readonly
          clickable
          @click="showviplevel = true"
          class="checktwoone"
        />
        <van-cell clickable style="text-align: center" @click="search">
          <template #title>
            <van-icon name="search" size="15" color="hotpink" /> 查询
          </template>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-cell
      class="bankcenter"
      title="高级查询"
      is-link
      @click="$router.push({ name: 'bookcheck' })"
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
    <van-popup v-model="showviplevel" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns2"
        @confirm="onConfirm4"
        @cancel="showviplevel = false"
      />
    </van-popup>
    <van-empty v-if="empty" image="error" description="Data is empty" />
    <van-sticky :offset-top="46">
      <div style="width: 100%; background: white">
        <van-pagination
          v-if="!empty"
          @change="pagechange"
          v-model="currentPage"
          :page-count="totalpage"
          mode="simple"
          style="width: 80%; margin-bottom: 3vh; margin-left: 10%"
        />
        <!-- <van-button
          @click="reflash"
          type="primary"
          style="width: 20%; margin-bottom: 3vh"
        >
          刷新
        </van-button> -->
        <div class="clear"></div>
      </div>
    </van-sticky>

    <div class="bb" v-for="(item, index) in Listtrue" :key="index">
      <van-card :class="index % 2 == 0 ? 'detailedcard' : 'detailedcard2'">
        <template #title>
          <div class="name">
            {{ item.cus_name == null ? "散客" : item.cus_name }}({{
              item.sex == "Y" ? "男士" : "女士"
            }})
          </div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td>发生分店:{{ "伊美东平店" }}</td>
              <td>时间:{{ item.time }}</td>
            </tr>
            <tr>
              <td>充值金额:{{ "1000" }}</td>
              <td>赠送余额:{{ "0" }}</td>
            </tr>
            <tr>
              <td>赠送消费:{{ "0" }}</td>
              <td>赠送消费:{{ "0" }}</td>
            </tr>
            <tr>
              <td>赠送消费:{{ "0" }}</td>
              <td>
                <van-button type="danger" size="mini" @click="bookdelet(item)"
                  >作废</van-button
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
  Dialog,
} from "vant";

import {
  timehalf,
  timeday,
  timetwoyearday,
  timeyesterday,
  timesevenday,
  timemonthday,
  timeyearday,
} from "@/methods/time";
import { book_find, book_delet } from "@/API/book";
import { GetList_Shop } from "@/API/getlistvalue.js";
// import { timehalf } from "@/methods/time.js";
export default {
  name: "book",
  data() {
    return {
      phone: "131351356485",
      List: [],
      columns: [],
      colums1: [],
      columns2: [],
      Listtrue: [{}, {}],
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
      showviplevel: false,
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
    [Dialog.name]: Dialog,
  },

  methods: {
    pagechange() {},
    onConfirmtime(value) {
      this.timename = value;
      if (value == "今天") {
        console.log("今天");
        this.begindate = timeday();
        this.enddate = timeday();
      } else if (value == "昨天") {
        console.log("昨天");
        this.begindate = timeyesterday();
        this.enddate = timeyesterday();
      } else if (value == "近一周") {
        console.log("近一周");
        this.begindate = timesevenday().needday;
        this.enddate = timesevenday().day;
      } else if (value == "本月") {
        console.log("本月");
        this.begindate = timemonthday().needday;
        this.enddate = timemonthday().day;
      } else if (value == "全年") {
        console.log("全年");
        this.begindate = timeyearday().needday;
        this.enddate = timeyearday().day;
      }

      this.showlist = false;
    },
    bookdelet(item) {
      Dialog.confirm({
        title: "确认作废吗？",
        message: item.cus_name == null ? "散客" : item.cus_name,
      })
        .then(() => {
          book_delet({ id: item.id, cusid: item.cusid }).then((res) => {
            console.log("作废", res);
          });
        })
        .catch(() => {
          // on cancel
        });
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
    reflash() {},
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
    getbookinfo() {
      book_find(this.pam).then((res) => {
        console.log("账本资料", res);
        this.totalpage = res.extended.totalpage;
        this.Listtrue = res.table;
        this.Listtrue.map((item) => {
          item.time = timehalf(item.insdate);
        });
      });
    },
    getpulldata() {
      //获取下拉菜单的数据

      var that = this;
      GetList_Shop({}).then((res) => {
        that.columns2 = res.table.map(function (item) {
          return item.name;
        });
        that.columns22 = res.table.map(function (item) {
          return item.no;
        });
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
    onConfirm4(value, index) {
      this.viplevel = this.columns2[index];
      this.viplevelreally = this.columns22[index];
      this.showviplevel = false;
    },
    search() {
      var pam = {};
      pam.begindate = this.begindate;
      pam.enddate = this.enddate;

      book_find(pam).then((res) => {
        console.log("账本资料", res);
        this.totalpage = res.extended.totalpage;
        this.Listtrue = res.table;
        this.Listtrue.map((item) => {
          item.time = timehalf(item.insdate);
        });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === "/book") {
      next((vm) => {
        vm.$store.commit("setKeepAlive", "book"); //这是此页面的name属性名字
        console.log("vuex状态", vm.$store.state); //vm.permidata即methods内的方法使用的this.permidata
      });
    } else {
    }
    next();
  },
  created() {
    this.getpulldata();
    this.getbookinfo();
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
