<template>
  <div>
    <van-nav-bar
      title="储蓄卡提现"
      :fixed="true"
      :left-arrow="true"
      :style="{color:'#000000'}"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#000000" />
      </template>
    </van-nav-bar>
    <div class="card">
      <p class="one">可提现金额</p>
      <p class="two">
        <b>{{max}}</b>
        <button>
          <span>全部提现</span>
        </button>
      </p>
      <p class="one">取现额度最小为：100</p>
    </div>

    <van-form @submit="onSubmit">
      <p>请输入取现金额</p>
      <van-field class="big" v-model="digit" type="digit" name="money">
        <template #left-icon>
          <van-icon class="iconfont" class-prefix="icon" name="money" size="30" />
        </template>
      </van-field>
      <p>取现必填</p>
      <van-field class="bg" label="卡号" v-model="crashid" type="number" name="crashid" />
      <van-field class="bg" label="会员名称" v-model="person" type="string" name="person" />
      <van-field class="bg" label="取现店铺" v-model="moneyshop" type="string" name="moneyshop" />
      <van-field class="bg" label="备注" v-model="tip" type="string" name="tip" />
      <div>
        <div id="first">
          <van-field name="radio" class="bg">
            <template #input>
              <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="1" icon-size="0.8rem">正常取款</van-radio>
                <van-radio name="2" icon-size="0.8rem">合作商取款</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
        <div id="second">
          <van-field name="checkboxGroup" class="bg">
            <template #input>
              <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
                <van-checkbox name="1" icon-size="0.8rem">取款后短信通知</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </div>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">立即取现</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  Card,
  Form,
  Field,
  Button,
  Raido,
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
} from "vant";
import "@/assets/icon/iconfont.css";
export default {
  data() {
    return {
      max: 568523,
      digit: "5000",
      crashid: "2598445545565",
      person: "愤怒的阿三",
      moneyshop: "株式会01",
      tip: "请多一点",
      radio: "1",
      checkboxGroup: [],
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style scoped>
.card {
  text-align: left;
  color: white;
  width: 90%;
  margin-left: 5%;
  height: 15vh;
  background-color: #3b4146;
  border-radius: 0.5rem;
  padding-top: 1%;
}
.card p {
  text-indent: 5vw;
}
.one {
  font-size: 0.5rem;
}
.two {
  font-size: 1.5rem;
  margin: 0;
}

.card p button {
  background-color: #fadc9e;
  float: right;
  margin-right: 5%;
  border-radius: 1em;
  color: #bb9764;
  font-size: 0.5em;
}
.van-form {
  width: 95%;
  margin-left: 2.5%;
}
/deep/ .big .van-field__control {
  text-align: left;
}
/deep/ .van-field__control {
  text-align: right;
}
.van-form p {
  font-size: 0.5rem;
  text-align: left;
  margin-left: 5%;
}

.big {
  font-size: 2rem;
}
#first {
    float: left;
  width: 58%;
}
#second {
float: right;
  width: 42%;
}
/deep/ .van-radio__label{
    margin-left: 0;
    font-size: 0.5rem;
}
/deep/ .van-checkbox__label{
    margin-left: 0;
    font-size: 0.5rem;
}
.bg{
    background-color: #FAFAFA;
}
</style>