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

    <div class="bb" v-for="(item, index) in Listtrue" :key="index">
      <van-card :class="index % 2 == 0 ? 'detailedcard' : 'detailedcard2'">
        <template #title>
          <div class="name">{{ item.out_no }}({{ item.selfno }})</div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td colspan="2">
                卡号： {{ item.cus_type }}
                {{ item.cus_type == null ? "" : "(" + item.cardno + ")" }}
              </td>
            </tr>
            <tr>
              <td>
                客户：{{
                  item.salecusname === null ? "散客" : item.salecusname
                }}({{ item.sex == "N" ? "女士" : "男士" }}) &nbsp;{{
                  item.oneisorder == "Y" ? "指名" : "轮牌"
                }}
              </td>
              <td>
                员工：{{ item.firstemp === null ? "暂无记录" : item.firstemp }}
              </td>
            </tr>
            <tr>
              <td>付款金额：</td>
              <td>
                <van-button
                  type="primary"
                  size="mini"
                  @click.stop="clickon(item)"
                  >修改</van-button
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
} from "vant";
import { timeday } from "@/methods/time";
import { OutOne_find } from "@/API/outone.js";
export default {
  name:"bank",
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
  },

  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
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
      params=item
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
    getbaninfo() {
      var pam = {};
      pam.begindate = this.begindate;
      pam.enddate = this.enddate;
      pam.subcom = window.localStorage.getItem("subcom");
      OutOne_find(pam).then((res) => {
        console.log("查询结果", res.table);
        if (res.table[0].subcom === null) {
          this.empty = true;
          this.Listtrue = [];
        } else {
          this.empty = false;
          this.Listtrue = res.table.map(function (item) {
            item.show = false;
            item.bottom = false;
            return item;
          });
        }
      });
    },
  },
  created() {
    console.log('初始化了')
    if (JSON.stringify(this.$route.params) !== "{}") {
      var pam = this.$route.params;
      this.begindate = pam.begindate;
      this.enddate = pam.enddate;
      OutOne_find(pam).then((res) => {
        if (res.table[0].cusid === null) {
          this.empty = true;
        } else {
          this.empty = false;
          console.log("查询结果", res.table);
          this.Listtrue = res.table.map(function (item) {
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
      

      this.$store.commit("setKeepAlive", ["bankadd","bank"]); //这是此页面的name属性名字
    } else {
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
.bb table{
  width: 100%;
}
.bb table td {
  width: 50%;
}
</style>
