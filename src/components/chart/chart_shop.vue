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

    <div>
      <h3>店面统计报表</h3>
      <table class="chart_shop">
        <tr>
          <td colspan="3">
            日期：{{ begindate }} 到 {{ enddate }}
            <span style="margin-left: 2rem">
              分店:<span class="secondname">{{ "伊美东平店" }}</span></span
            >
          </td>
        </tr>
        <tr>
          <td>
            现金消费:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td>
            支出:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td>
            单号张数:<span class="secondname">{{ "10000" }}</span>
          </td>
        </tr>
        <tr>
          <td>
            会员卡消费:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td>
            现金充值:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td>
            应缴现金:<span class="secondname">{{ "10000" }}</span>
          </td>
        </tr>
        <tr>
          <td>
            银行卡消费:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td>
            银行卡充值:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            赠送额消费:<span class="secondname">{{ "10000" }}</span>
          </td>
          <td>
            赠送充值:<span class="secondname">{{ "10000" }}</span>
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
        <tr>
          <td>总计</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>指定</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>非指定</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>消费次卡</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>美容</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>洗剪吹项目</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>洗吹项目</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>洗吹项目</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>美发外卖</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>美容外卖</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>美容项目</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>烫发项目</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
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
} from "vant";

import { timeday } from "@/methods/time";
import { OutOne_find } from "@/API/outone.js";
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
    onClickRight() {},
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
  },
  created() {},
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
  border: 1px solid #D7D4CF;
}
</style>
