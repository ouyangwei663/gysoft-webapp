<template>
  <div>
    <van-nav-bar
      title="储蓄卡充值"
      :fixed="true"
      :left-arrow="true"
      :style="{color:'#000000'}"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#000000" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field class="one" v-model="crashid" name="crashid" placeholder="20205698324578">
        <template #label>
          <span>
            <span>*</span>卡号
          </span>
        </template>
      </van-field>
      <van-field class="one" v-model="password" type="password" name="密码" placeholder="**********">
        <template #label>
          <span>
            <span>*</span>密码
          </span>
        </template>
      </van-field>
      <van-field class="one" id="imp" v-model="money" name="money" placeholder="请输入充值金额">
        <template #label>
          <span>
            <span>*</span>金额
          </span>
        </template>
      </van-field>

      <van-field v-model="exertmoney" name="exertmoney" label="赠送金额" placeholder="赠送金额（选填）" />
      <van-field v-model="moneyshop" name="moneyshop" label="存钱分店" placeholder="株式会001号" />
      <van-field v-model="time" name="time" label="存钱时间" placeholder="2020年6月15号" />
      <van-field v-model="person" name="person" label="提钱人" placeholder="愤怒的阿三" />
      <van-field id="bg" v-model="radio" name="radio" label="充值方式"></van-field>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell clickable @click="radio = '1'">
            <template #title>
              <van-icon name="coupon" color="#0CD59E" size="25" />
              <span>现金</span>
            </template>
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell clickable @click="radio = '2'">
            <template #title>
              <van-icon name="card" color="#46B705" size="25" />
              <span>银行卡</span>
            </template>
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell clickable @click="radio = '3'">
            <template #title>
              <van-icon name="balance-list" color="#EC3A4E" size="25" />
              <span>现金+银行卡</span>
            </template>
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell clickable @click="radio = '4'">
            <template #title>
              <van-icon name="gold-coin" color="#167CD5" size="25" />
              <span>挂账</span>
            </template>
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
          <van-cell clickable @click="radio = '5'">
            <template #title>
              <van-icon name="paid" color="#000000" size="25" />
              <span>银行+挂账</span>
            </template>
            <template #right-icon>
              <van-radio name="5" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-field name="checkboxGroup" label="状态">
        <template #input>
          <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
            <van-checkbox name="1">充值完后短信通知</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确定充值</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Form,
  Field,
  Button,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  CheckboxGroup,
  Checkbox,
} from "vant";
export default {
  data() {
    return {
      crashid: "20205698324578",
      password: "123456789",
      money: "",
      exertmoney: "赠送金额（选填）",
      moneyshop: "株式会001号",
      time: "2020年6月15号",
      person: "愤怒的阿三",
      radio: "1",
      crashmethod: "1",
      checkboxGroup: [],
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
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
/deep/ .one .van-field__label span span {
  color: red;
}
.van-field {
  width: 90%;
  background-color: #fafafa;
  margin-left: 5%;
  border-radius: 8px;
  margin-bottom: 2vh;
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ #imp::-webkit-input-placeholder {
  color: red;
}
.van-cell {
  margin-left: 5%;
  width: 90%;
  text-align: left;
}
/deep/ .van-cell__title span {
  vertical-align: 9px;
}
/deep/ .van-field__value{
   margin-left: 50px;
}
#bg {
  background-color: #ffffff;
}
</style>