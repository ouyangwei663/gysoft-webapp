<template>
  <div>
    <van-nav-bar
      title="流水详情"
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      :left-arrow="true"
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
    <div class="bb">
      <van-card @click="show = true">
        <template #title>
          <div class="name">
            欧阳威
            <van-tag type="primary" round color="#FFD90B" size="medium">超级会员</van-tag>
          </div>
        </template>
        <template #desc>
          <p>
            <span>充值余额：￥{{money}}</span>
            <span class="one">卡号：{{phone}}</span>
          </p>
          <p>
            <span>赠送余额：￥{{money}}</span>
            <span class="one">手机号码：{{phone}}</span>
          </p>
          <p>
            <span>性别：男</span>
          </p>
        </template>
      </van-card>
      <van-action-sheet v-model="show" title="会员操作">
        <div>
          <van-cell title="充值" icon="gold-coin-o"  is-link />
          <van-cell title="恢复会员" icon="share-o"  is-link />
          <van-cell title="注销会员" icon="close"  is-link/>
          <van-cell title="新增次卡" icon="add-o"  is-link/>
          <van-cell title="赠送充值" icon="gift-o"  is-link/>
          <van-cell title="赠送次卡" icon="gift-card-o"  is-link/>
        </div>
      </van-action-sheet>
    </div>
      <div class="bb">
      <van-card @click="show = true">
        <template #title>
          <div class="name">
            欧阳威
            <van-tag type="primary" round color="#FFD90B" size="medium">超级会员</van-tag>
          </div>
        </template>
        <template #desc>
          <p>
            <span>充值余额：￥{{money}}</span>
            <span class="one">卡号：{{phone}}</span>
          </p>
          <p>
            <span>赠送余额：￥{{money}}</span>
            <span class="one">手机号码：{{phone}}</span>
          </p>
          <p>
            <span>性别：男</span>
          </p>
        </template>
      </van-card>
      <van-action-sheet v-model="show" title="会员操作">
        <div>
          <van-cell title="充值" icon="gold-coin-o"  is-link />
          <van-cell title="恢复会员" icon="share-o"  is-link />
          <van-cell title="注销会员" icon="close"  is-link/>
          <van-cell title="新增次卡" icon="add-o"  is-link/>
          <van-cell title="赠送充值" icon="gift-o"  is-link/>
          <van-cell title="赠送次卡" icon="gift-card-o"  is-link/>
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
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
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
span {
  color: white;
}
p {
  margin-bottom: 0.5rem;
  font-size: 0.6rem;
}
.one {
  position: relative;
  left: 15vw;
}
.van-action-sheet__name {
  color: black;
}
.van-cell__title span {
  color: black;

}
</style>