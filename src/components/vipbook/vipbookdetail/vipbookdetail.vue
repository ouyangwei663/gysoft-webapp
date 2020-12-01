<template>
  <div>
    <van-nav-bar
      title="会员资料详情"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="会员资料">
        <div>
          <van-cell-group class="centergroup">
            <van-cell title="会员资料" left>
              <template #label>
                <table class="bookdetail">
                  <tr>
                    <td>姓名：欧阳威</td>
                    <td>性别：男</td>
                  </tr>
                  <tr>
                    <td>累计充值：5000</td>
                    <td>充值奖励：0</td>
                  </tr>
                  <tr>
                    <td>卡号：qw10000218</td>
                    <td>累计取款：0</td>
                  </tr>
                  <tr>
                    <td>刷卡消费：3119</td>
                    <td>刷卡购护理卡：0</td>
                  </tr>
                  <tr>
                    <td>消费券抵扣：0</td>
                    <td>服务消费：2469</td>
                  </tr>
                  <tr>
                    <td>产品消费：650</td>
                    <td>消费周期：0</td>
                  </tr>
                  <tr>
                    <td>累计消费：3119</td>
                    <td>现有积分：0</td>
                  </tr>
                  <tr>
                    <td>首次来店：2017-07-20</td>
                    <td>末次来店：2018-04-18</td>
                  </tr>
                  <tr>
                    <td>来店次数：11</td>
                    <td>卡类型：储蓄卡</td>
                  </tr>
                  <tr>
                    <td>会员类型：MM黑镜卡</td>
                    <td>生日：1996-09-15</td>
                  </tr>
                  <tr>
                    <td>帐上余额：1881</td>
                  </tr>
                </table>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="历史消费">
        <div v-for="(item, index) in List" :key="index">
          <van-cell-group>
            <van-cell>
              <template #title>
                <div>
                  <table class="tablefirst">
                    <tr>
                      <td>{{ item.goo_name }}</td>
                    </tr>
                  </table>
                </div>
              </template>
              <template #label>
                <table>
                  <tr>
                    <td>消费单号:{{ item.out_no }}</td>
                    <td>消费时间:{{ item.out_date }}</td>
                  </tr>
                  <tr>
                    <td>
                      销售价:{{
                        item.nodisprice == null ? item.price : item.nodisprice
                      }}
                    </td>
                    <td>数量:{{ item.num }}</td>
                  </tr>
                  <tr>
                    <td>
                      折扣:{{
                        item.detail_discountrate == null
                          ? "1"
                          : item.detail_discountrate
                      }}
                    </td>
                    <td>实际销价:{{ item.price }}</td>
                  </tr>
                  <tr>
                    <td>金额:{{ item.price * item.num }}</td>
                    <td>消费方式：{{ item.accountway }}</td>
                  </tr>

                  <tr>
                    <td>消费店:{{ item.subcom }}</td>
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
            <table class="banktwo">
              <tr class="one">
                <td>姓名</td>
                <td>工种</td>
                <td>是否指名</td>
              </tr>
              <tr>
                <td>Faker__1（QW）</td>
                <td>J1助理</td>
                <td>是</td>
              </tr>
              <tr>
                <td>Jason（QW）</td>
                <td>专业发型师</td>
                <td>是</td>
              </tr>
            </table>
          </van-popup>
        </div>
      </van-tab>
      <van-tab title="充值明细">
        <div v-for="(item, index) in liaocheng" :key="index">
          <van-cell-group>
            <van-cell title="">
              <template #label>
                <table class="liaocheng">
                  <tr>
                    <td colspan="2">充值时间:{{item.insdate}}</td>
                  </tr>
                  <tr>
                    <td>充值:{{item.addmoney}}</td>
                    <td>赠送余额：0</td>
                  </tr>
                  <tr>
                    <td>开卡/续卡:{{item.ins_type1=="A"?'开卡':'续费'}}</td>
                    <td>充值店:{{item.subcom}}</td>
                  </tr>
                  <tr>
                    <td>类型:{{item.ins_type=="A"?'赠送充值':'存钱'}}</td>
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
        </div>
      </van-tab>

      <van-tab title="疗程">
        <div v-for="(item, index) in liaocheng" :key="index">
          <van-cell-group>
            <van-cell>
              <template #title>
                <div>
                  <table class="tablefirst">
                    <tr>
                      <td>{{ item.shop }}</td>
                      <td>
                        <van-cell left title="显示详情">
                          <template #right-icon>
                            <van-switch v-model="item.show" size="15" />
                          </template>
                        </van-cell>
                      </td>
                    </tr>
                  </table>
                </div>
              </template>
              <template #label>
                <table class="liaocheng">
                  <tr>
                    <td colspan="2">项目：普通颜色补发银卡5次</td>
                  </tr>
                  <tr>
                    <td>购买日期：2017-09-15</td>
                    <td>购买次数：5</td>
                  </tr>
                  <tr>
                    <td>赠送次数：0</td>
                    <td>已使用次数：5</td>
                  </tr>
                  <tr>
                    <td>剩余次数：0</td>
                    <td>首次付款：￥1380</td>
                  </tr>
                  <tr>
                    <td>补款金额：0</td>
                    <td>金额：</td>
                  </tr>
                  <tr v-show="item.show">
                    <td>欠款：￥-13800</td>
                    <td>套餐总次数：</td>
                  </tr>
                  <tr v-show="item.show">
                    <td>备注：</td>
                    <td>失效日期：2017-09-15</td>
                  </tr>
                  <tr v-show="item.show">
                    <td>疗程卡号：01-1665</td>
                    <td>系统ID：1558</td>
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
        </div>
      </van-tab>
      <van-tab title="对账单">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="设置查询条件" name="1" left>
            <van-cell
              title="开始时间"
              is-link
              :value="starttime"
              @click="showtime = true"
            />
            <van-cell
              title="结束时间"
              is-link
              :value="endtime"
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
              />
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
              />
              />
            </van-popup>
          </van-collapse-item>
        </van-collapse>
        <div v-for="(item, index) in checkbook" :key="index">
          <van-cell-group>
            <van-cell :class="item.type == '充值' ? 'bgblue ' : 'bgred '">
              <template #title>
                <div>
                  <table class="tablefirst">
                    <tr>
                      <td>{{ item.shop }}</td>
                      <td>
                        <van-cell
                          left
                          title="显示详情"
                          :class="item.type == '充值' ? 'bgblue ' : 'bgred '"
                        >
                          <template #right-icon>
                            <van-switch
                              v-model="item.show"
                              size="15"
                              :active-color="
                                item.type == '充值' ? '#07c160' : ' '
                              "
                            />
                          </template>
                        </van-cell>
                      </td>
                    </tr>
                  </table>
                </div>
              </template>
              <template #label>
                <table class="liaocheng colorsize">
                  <tr>
                    <td colspan="2">录入时间：2017-09-15 22：00</td>
                  </tr>
                  <tr>
                    <td>充值、消费前余额：￥1000</td>
                    <td>发生金额：￥1000</td>
                  </tr>
                  <tr>
                    <td>赠送金额：0</td>
                    <td>实际金额：￥1000</td>
                  </tr>
                  <tr>
                    <td>业务后金额：￥1000</td>
                    <td>类型：{{ item.type }}</td>
                  </tr>

                  <tr v-show="item.show">
                    <td>分期到账：</td>
                    <td>充值方式：银行卡</td>
                  </tr>
                  <tr v-show="item.show">
                    <td>开卡/续费：开卡充值</td>
                    <td>开卡店：MM青岛万象店</td>
                  </tr>
                  <tr v-show="item.show">
                    <td>手工单号：01-1665</td>
                    <td>系统单号：1558</td>
                  </tr>
                  <tr v-show="item.show">
                    <td>操作员：Emanily（QW）</td>
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
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Tab,
  Tabs,
  CellGroup,
  Cell,
  Button,
  Popup,
  Switch,
  Collapse,
  CollapseItem,
  DatetimePicker,
} from "vant";
import { detail_history, detail_Storelist } from "@/API/detail.js";
export default {
  data() {
    return {
      cusid: "!$7-NPX&AI3#30Q:",
      active: 0,
      checked: false,
      activeNames: [],
      showtime: false,
      showendtime: false,
      starttime: "",
      endtime: "",

      List: [
        { id: 123456, show: false, bottom: false },
        { id: 123456, show: false, bottom: false },
      ],
      liaocheng: [
        { shop: "伊美东平店", show: false },
        { shop: "伊美东平店", show: false },
      ],
      checkbook: [
        { shop: "伊美东平店", show: false, type: "充值" },
        { shop: "伊美东平店", show: false, type: "消费" },
      ],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Switch.name]: Switch,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [DatetimePicker.name]: DatetimePicker,
  },
  methods: {
    gethistorylist() {
      //获取历史消费
      detail_history({ cusid: this.cusid }).then((res) => {
        console.log("历史消费记录", res);
        this.List = res.table;
      });
    },
    getdetail() {
      detail_Storelist({ cusid: this.cusid }).then((res) => {
        console.log("历史充值明细", res);
        this.liaocheng = res.table;
      });
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    click(index) {
      this.List[index].bottom = true;
    },
    clickliaocheng(index) {
      this.liaocheng[index].show = true;
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
      this.starttime = timer;
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
      this.endtime = timer;
    },
  },
  created() {
    this.gethistorylist();
    this.getdetail();
  },
};
</script>
<style scoped>
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.centergroup {
  width: 90%;
  margin-left: 5%;
}
.bookdetail {
  width: 100%;
}
.bookdetail td {
  width: 50%;
  text-align: left;
}
.fright {
  text-align: right;
}
.banktwo {
  border-radius: 0.3rem;
  width: 80%;
  font-size: 0.7rem;
  margin-left: 10%;
  color: white;
  background-color: #25d07a;
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
.tablefirst {
  width: 100%;
}
.tablefirst td {
  width: 50%;
}
.liaocheng {
  width: 100%;
}
.bgblue {
  color: white;
  background-color: #157aff;
  border-radius: 1rem;
  margin-bottom: 2vh;
}
.bgred {
  color: white;
  background-color: #25d07a;
  border-radius: 1rem;
  margin-bottom: 2vh;
}
.colorsize {
  color: white;
}
</style>