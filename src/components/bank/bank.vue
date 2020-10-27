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

    <div v-for="(item, index) in Listtrue" :key="index">
      <van-cell-group @click="item.show = !item.show">
        <van-cell title="" center>
          <template #tltle>
            <div></div>
          </template>
          <template #label>
            <table>
              <tr>
                <td>手工单号：{{ item.selfno }}</td>
                <td>系统单号：{{}}</td>
              </tr>
              <tr>
                <td>会员卡类型：VIP龙腾卡</td>
                <td>会员卡号：{{ item.cardno }}</td>
              </tr>
              <tr>
                <td>客户名称：{{ item.salecusname }}</td>
                <td>性别：{{ item.sex }}</td>
              </tr>
              <tr>
                <td>服务：{{}}</td>
                <td>是否指名：{{ item.oneisorder ? "是" : "否" }}</td>
              </tr>
              <tr>
                <td>员工：{{ item.firstemp }}</td>
                <td>发型师业绩：{{ item.firstmoney }}</td>
              </tr>
              <tr>
                <td>收款金额：{{ item.cmp_money }}</td>
                <td>抵扣金额：{{ item.ticketmoney }}</td>
              </tr>
              <tr v-show="item.show">
                <td>手机号码：{{ item.mobile }}</td>
                <td>备注:{{ item.memo }}</td>
              </tr>
              <tr v-show="item.show">
                <td>是否付款：{{ item.havepay }}</td>
                <td>付款方式：{{ item.accountway }}</td>
              </tr>
              <tr v-show="item.show">
                <td>来店日期：{{ item.orderday }}</td>
              </tr>
              <tr class="power">
                <td class="fright">
                  <van-button
                    @click.stop="click(index)"
                    round
                    type="info"
                    size="mini"
                    >获取详情</van-button
                  >
                </td>
                <td class="fright">
                  <van-button
                    @click.stop="clickon(item.out_no)"
                    round
                    type="info"
                    size="mini"
                    >访客登记</van-button
                  >
                </td>
              </tr>
            </table>
            <!-- <p>
            <span>手工单号：0050197</span>
            <span class="one">系统单号：14G17040003</span>
          </p>
          <p>
            <span>会员卡类型：VIP龙腾卡5折</span>
            <span class="one">会员卡号：dp111111746</span>
          </p>
            <p></p>-->
          </template>
        </van-cell>
      </van-cell-group>
      <van-popup
        class="bankpopup"
        v-model="item.bottom"
        position="bottom"
        round
        :style="{}"
      >
        <table class="bankone">
          <tr class="one">
            <td></td>
            <td>名称</td>
            <td>数量</td>
            <td>销售价</td>
            <td>折扣</td>
            <td>实际售价</td>
            <td>金额</td>
            <td>护理卡号</td>
          </tr>
          <tr>
            <td></td>
            <td>资深剪发师</td>
            <td>1</td>
            <td>60</td>
            <td>45</td>
            <td>27</td>
            <td>27</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>一次性消毒毛巾</td>
            <td>1</td>
            <td>1</td>
            <td>100</td>
            <td>1</td>
            <td>1</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>28</td>
            <td></td>
          </tr>
        </table>
        <table class="banktwo">
          <tr class="one">
            <td>工种</td>
            <td>员工</td>
            <td>指名</td>
            <td>提成</td>
            <td>员工姓名</td>
          </tr>
          <tr>
            <td>首席发型师</td>
            <td>Suking</td>
            <td>轮牌</td>
            <td>6.80</td>
            <td>Suking</td>
          </tr>
          <tr>
            <td>助理</td>
            <td>507</td>
            <td>轮牌</td>
            <td>4.05</td>
            <td>507</td>
          </tr>
        </table>
      </van-popup>
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
} from "vant";
import { timeday } from "@/methods/time";
import { OutOne_find } from "@/API/outone.js";
export default {
  data() {
    return {
      phone: "131351356485",
      List: [
        { show: false, bottom: false },
        { show: false, bottom: false },
      ],
      Listtrue: [],
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
    clickon(out_no) {
      var params={}
      params.out_no=out_no
       this.$router.push({
        name: "qindan",
        params
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
    if (JSON.stringify(this.$route.params) !== "{}") {
      var pam = this.$route.params;
      this.begindate = pam.begindate;
      this.enddate = pam.enddate;
      OutOne_find(pam).then((res) => {
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
    } else {
      this.begindate = timeday();
      this.enddate = this.begindate;

      var pam = {};
      pam.begindate = this.begindate;
      pam.enddate = this.enddate;
      pam.subcom = window.localStorage.getItem("subcom");
      OutOne_find(pam).then((res) => {
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
  width: 90%;
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
</style>
