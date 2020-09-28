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
        <div v-for="(item, index) in List" :key="index">
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
      <van-tab title="历史消费">历史消费</van-tab>
      <van-tab title="项目分析">会员消费项目分析</van-tab>
      <van-tab title="会员次卡">会员次卡</van-tab>
      <van-tab title="会员对账单">会员对账单</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Icon, Tab, Tabs, CellGroup, Cell } from "vant";
export default {
  data() {
    return {
      active: 0,
      List: [{}],
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
  },
  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
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
</style>