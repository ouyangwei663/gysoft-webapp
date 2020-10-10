<template>
  <div class="hello">
    <van-nav-bar
      title="会员账本"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-sticky :offset-top="46">
      <table class="booktop">
        <tr>
          <td><van-button type="primary">作废</van-button></td>
          <td><van-button type="primary">存取款重打</van-button></td>

          <td><van-button type="primary">会员资料</van-button></td>

          <td><van-button type="primary">修改</van-button></td>
          <td>
            <van-button type="primary">充值提成录入</van-button>
          </td>
          <td>
            <van-button type="primary">其他</van-button>
          </td>
        </tr>
      </table>
    </van-sticky>
    <div v-for="(item, index) in List" :key="index">
      <van-cell-group @click="item.show = !item.show" class="bookcenter">
        <van-cell title="伊美东平店" center>
          <template #label>
            <table class="centertable">
              <tr>
                <td>姓名：欧阳威</td>
                <td>性别：男</td>
              </tr>
              <tr>
                <td>手工单号：0050197</td>
                <td>系统单号：14G17040003</td>
              </tr>
              <tr>
                <td>发生金额：￥400</td>
                <td>赠送金额：￥0</td>
              </tr>
              <tr>
                <td>实际金额金额：￥-690</td>
                <td>充值消费前余额：￥4790</td>
              </tr>
              <tr v-show="item.show">
                <td>会员卡类型：MM黑金卡</td>
                <td>会员卡号：dp111111746</td>
              </tr>

              <tr v-show="item.show">
                <td>手机号码：13653035648</td>
                <td>备注:冷烫（欧莱雅）</td>
              </tr>
              <tr v-show="item.show">
                <td>是否付款：是</td>
                <td>付款方式：会员卡消费</td>
              </tr>
              <tr v-show="item.show">
                <td>开卡店：青岛万象</td>
                <td>操作员：Amy（QW）</td>
              </tr>
              <tr v-show="item.show">
                <td>录入日期：2020/9/23</td>
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
            <td>分类</td>
          </tr>
          <tr>
            <td></td>
            <td>洗剪吹（导师）</td>
            <td>1</td>
            <td>180</td>
            <td>80</td>
            <td>144</td>
            <td>144</td>
            <td>洗剪吹类</td>
          </tr>
          <tr>
            <td></td>
            <td>数码烫、陶瓷烫</td>
            <td>1</td>
            <td>980</td>
            <td>80</td>
            <td>784</td>
            <td>784</td>
            <td>热烫类</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>928</td>
            <td></td>
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
  Sticky,
} from "vant";
export default {
  data() {
    return {
      phone: "131351356485",
      List: [
        { show: false, bottom: false },
        { show: false, bottom: false },
        { show: false, bottom: false },
        { show: false, bottom: false },
        { show: false, bottom: false },
        { show: false, bottom: false },
      ],
    };
  },
  components: {
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    click(index) {
      this.List[index].bottom = true;
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
  text-align: right;
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
.van-sticky {
  padding: 0;
}
.van-sticky .van-button {
  width: 100%;
  font-size: 0.5rem;
  padding: 0;
}
.booktop {
  width: 100%;
  padding: 0;
  border: #fafafa solid 1px;
  background-color: #fafafa;
}

.booktop td {
  margin: 0;
  width: 16.67%;
  background-color: #fafafa;
}
.centertable {
  width: 100%;
}
.bookcenter {
  margin: auto;
}
</style>
