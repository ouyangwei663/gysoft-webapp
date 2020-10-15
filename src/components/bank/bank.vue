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
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
      :scrollable="false"
      :wrapable="true"
    >
      起止日期： 开始日期从 {{ starttime }} 到 {{ starttime }}
    </van-notice-bar>
    <van-cell class="bankcenter" title="高级查询" is-link to="bankcheck" />

    <div v-for="(item, index) in List" :key="index">
      <van-cell-group @click="item.show = !item.show">
        <van-cell title="" center>
          <template #tltle>
            <div></div>
          </template>
          <template #label>
            <table>
              <tr>
                <td>手工单号：0050197</td>
                <td>系统单号：14G17040003</td>
              </tr>
              <tr>
                <td>会员卡类型：VIP龙腾卡</td>
                <td>会员卡号：dp111111746</td>
              </tr>
              <tr>
                <td>客户名称：欧阳威</td>
                <td>性别：男</td>
              </tr>
              <tr>
                <td>服务：洗剪吹</td>
                <td>是否指名：是</td>
              </tr>
              <tr>
                <td>员工：AMY（QA）</td>
                <td>发型师业绩：</td>
              </tr>
              <tr>
                <td>收款金额：￥400</td>
                <td>抵扣金额：￥0</td>
              </tr>
              <tr v-show="item.show">
                <td>手机号码：13653035648</td>
                <td>备注:</td>
              </tr>
              <tr v-show="item.show">
                <td>是否付款：是</td>
                <td>付款方式：会员卡消费</td>
              </tr>
              <tr v-show="item.show">
                <td>来店日期：2020/9/23</td>
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
} from "vant";
import { timeday } from "@/methods/time";
export default {
  data() {
    return {
      phone: "131351356485",
      List: [
        { show: false, bottom: false },
        { show: false, bottom: false },
      ],
      activeNames: [],
      starttime: "",
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
      this.List[index].bottom = true;
    },
  },
  created() {
    this.starttime = timeday();
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
</style>
