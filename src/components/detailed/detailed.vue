<template>
  <div>
    <van-nav-bar
      title="流水详情"
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <!-- <div class="box">

      <table>
        <tr>
          <td>会员名称</td>
          <td>性别</td>
          <td>会员级别</td>
          <td>充值余额</td>
          <td>赠送余额</td>
          <td>手机号</td>
          <td>卡号</td>
        </tr>
      </table>
    </div>-->
    <div class="bb" v-for="(item, index) in List" :key="index">
      <van-card @click="show = true">
        <template #title>
          <div class="name">
            {{ item.cus_name }}
            <van-tag type="primary" round color="#FFD90B" size="medium"
              >超级会员</van-tag
            >
          </div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td>
                充值余额：￥{{
                  item.givehavemoney === null ? 0 : item.givehavemoney
                }}
              </td>
              <td>卡号：{{ item.cardno }}</td>
            </tr>
            <tr>
              <td>赠送余额：￥{{ item.lastmoney }}</td>
              <td>手机号码：{{ item.mobile }}</td>
            </tr>
            <tr>
              <td>性别：{{ item.sex == "女士" ? "女士" : "男士" }}</td>
              <td>备注：{{ item.memo === null ? "无" : item.memo }}</td>
            </tr>
            <tr>
              <td>
                地址：{{ item.address === null ? "暂无记录" : item.address }}
              </td>
            </tr>
          </table>
        </template>
      </van-card>
      <van-action-sheet v-model="show" title="会员操作">
        <div>
          <van-cell title="充值" icon="gold-coin-o" is-link />
          <van-cell title="恢复会员" icon="share-o" is-link />
          <van-cell title="注销会员" icon="close" is-link />
          <van-cell title="新增次卡" icon="add-o" is-link />
          <van-cell title="赠送充值" icon="gift-o" is-link />
          <van-cell title="赠送次卡" icon="gift-card-o" is-link />
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  Card,
  Tag,
  Button,
  ActionSheet,
  Cell,
  CellGroup,
} from "vant";
import "@/assets/icon/iconfont.css";
export default {
  data() {
    return {
      money: "100",
      phone: 13653035648,
      show: false,
      List: [],
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  created() {
    this.$route.params;
    this.getdate();
  },

  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },

    getdate() {
      var that = this;
      console.log(this.$route.params)
      var source = {
        cus_name: "福海",
        Sex: "Y",
      };
      var par = {
        action: "findby",
        token: "lx_mf",
        aspnetid: "lx_mf",
        classname: "n_customer_small_find_mf",
        funcname: "find",
        classmemo: "会员查询",
      };
      const newpar = Object.assign(par, source);
      console.log(newpar);
      this.$axios
        .post("erpcore/", newpar)
        .then((res) => {
          that.List = res.data.table;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scope>
.van-nav-bar {
  background-color: #157aff;
}
.van-nav-bar__title {
  color: #ffffff;
}
.van-tag {
  margin-left: 5vw;
}
.bb {
  margin-left: 5vw;
  margin-bottom: 3vh;
  width: 90vw;
}
.box {
  margin-left: 5vw;
  width: 90vw;
  font-size: 1rem;
  overflow-x: auto;
}
.vant-card {
  margin-left: 10%;
  width: 80%;
}
.van-card {
  background-color: #157aff;
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
.vipinfo td {
  width: 50%;
}

.van-action-sheet__name {
  color: black;
}
.van-cell__title span {
  color: black;
}
</style>