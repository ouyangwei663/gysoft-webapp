<template>
  <div>
    <van-nav-bar
      title="储蓄卡充值"
      :fixed="true"
      :left-arrow="true"
      :style="{ color: '#000000' }"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#000000" />
      </template>
    </van-nav-bar>
    <div class="crashbb">
      <van-card>
        <template #title>
          <div class="name">
            {{ $route.params.cus_name}}
            <van-tag type="primary" round color="#FFD90B" size="medium"
              >超级会员</van-tag
            >
          </div>
        </template>
        <template #desc>
          <table class="crashvipinfo">
            <tr>
              <td>余额：￥{{$route.params.lastmoney}}</td>
              <td>卡号：{{$route.params.cardno}}</td>
            </tr>
            <tr>
              <td>手机号码：{{$route.params.mobile}}</td>
              <td>有效期到：{{$route.params.effecttime}}</td>
            </tr>
            <tr>
       
            </tr>
          </table>
        </template>
      </van-card>
    </div>
    <van-form @submit="onSubmit">
      <van-field label="卡号" v-model="crashid" name="crashid" :required="true">
      </van-field>
      <van-field
        label="密码"
        v-model="password"
        type="password"
        name="密码"
        placeholder="**********"
        :required="true"
      >
      </van-field>
      <van-field
        label="充值金额"
        id="imp"
        v-model="money"
        name="Money"
        placeholder="请输入充值金额"
        :required="true"
      >
      </van-field>

      <van-field
        v-model="exertmoney"
        name="Addmoney"
        label="赠送金额"
        placeholder="赠送金额（选填）"
      />
      <van-field
        v-model="moneyshop"
        name="Subcom"
        label="存钱分店"
        placeholder="株式会001号"
      />
      <van-field
        v-model="time"
        name="Storedate"
        label="存钱时间"
        placeholder="2020年6月15号"
      />
      <van-field
        v-model="person"
        name="cus_name"
        label="提钱人"
        placeholder="愤怒的阿三"
      />
      <van-field
        v-model="memo"
        name="memo"
        label="备注"
        placeholder="请填写备注"
      />
      <van-field id="bg" name="radio" label="充值方式"></van-field>
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
          <van-cell clickable @click="radio = '5'">
            <template #title>
              <van-icon name="scan" color="#000000" size="25" />
              <span>扫码付款</span>
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >确定充值</van-button
        >
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
  Card,
  Tag,
} from "vant";
export default {
  data() {
    return {
      name: "大帅哥",
      crashid: "",
      password: "",
      money: "",
      exertmoney: "",
      moneyshop: "",
      time: "",
      person: "",
      radio: "1",
      crashmethod: "1",
      checkboxGroup: [],
      memo:''
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
    [Card.name]: Card,
    [Tag.name]: Tag,
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },created(){
    console.log(this.$route.params)
  }
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
.van-card {
  background-color: #157aff;
  color: white;
  border-radius: 0.4rem;
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
/deep/ .van-field__value {
  margin-left: 50px;
}
#bg {
  background-color: #ffffff;
}
.crashbb {
  width: 90%;
  margin-left: 5%;
  margin-bottom: 3vh;
}
.name {
  text-align: left;
  font-size: 1rem;
}
.crashvipinfo {
  width: 100%;
}
.crashvipinfo td {
  text-align: left;
  width: 50%;
}
</style>