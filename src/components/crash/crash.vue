<template>
  <div>
    <van-nav-bar
      title="储蓄卡充值"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
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
            {{ $route.params.cus_name }}
            <van-tag type="primary" round color="#FFD90B" size="medium"
              >超级会员</van-tag
            >
          </div>
        </template>
        <template #desc>
          <table class="crashvipinfo">
            <tr>
              <td>会员卡类型：{{ $route.params.cus_type }}</td>

              <td>卡号：{{ $route.params.cardno }}</td>
            </tr>
            <tr>
              <td>手机号码：{{ $route.params.mobile }}</td>
              <td>有效期：{{ effecttime }}</td>
            </tr>
            <tr>
              <td>充值余额：￥{{ $route.params.lastmoney }}</td>
              <td>赠送余额：￥{{ $route.params.givehavemoney }}</td>
            </tr>
          </table>
        </template>
      </van-card>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        label="卡号"
        v-model="crashid"
        name="cardno"
        :required="true"
        :disabled="first"
      >
      </van-field>

      <van-field
        label="充值金额"
        id="imp"
        v-model="money"
        name="money"
        placeholder="请输入充值金额"
        :required="true"
        :disabled="first"
      >
      </van-field>

      <van-field
        v-model="exertmoney"
        name="addmoney"
        label="赠送金额"
        placeholder="赠送金额（选填）"
        :disabled="first"
      />
      <van-field
        readonly
        clickable
        name="subcom"
        :value="viplevel"
        label="店铺名"
        placeholder="点击选择店铺"
        @click="
          first == false ? (showviplevel = true) : (showviplevel = showviplevel)
        "
        :disabled="first"
      />
      <van-field
        v-model="time"
        name="moneychangedate"
        label="存钱时间"
        placeholder="存钱时间"
        :disabled="first"
      />
      <!-- <van-field
        v-model="person"
        name="cus_name"
        label="提钱人"
        placeholder=""
      /> -->
      <van-field
        v-model="memo"
        name="memo"
        label="备注"
        placeholder="请填写备注"
        :disabled="first"
      />
      <van-field
        v-model="selfno"
        name="selfno"
        label="手工单号"
        placeholder="请填写手工单号"
        :disabled="first"
      />
      <van-field
        id="bg"
        name="payway"
        v-model="payway"
        label="充值方式"
        :disabled="true"
      ></van-field>
      <van-radio-group v-model="payway">
        <van-cell-group>
          <van-cell
            clickable
            @click="first == false ? (payway = '1') : (payway = payway)"
          >
            <template #title>
              <van-icon name="coupon" color="#0CD59E" size="25" />
              <span>现金</span>
            </template>
            <template #right-icon>
              <van-radio name="1" :disabled="first" />
            </template>
          </van-cell>
          <van-cell
            clickable
            @click="first == false ? (payway = '2') : (payway = payway)"
          >
            <template #title>
              <van-icon name="card" color="#46B705" size="25" />
              <span>银行卡</span>
            </template>
            <template #right-icon>
              <van-radio name="2" :disabled="first" />
            </template>
          </van-cell>
          <van-cell
            clickable
            @click="first == false ? (payway = '3') : (payway = payway)"
          >
            <template #title>
              <van-icon name="scan" color="#000000" size="25" />
              <span>扫码付款</span>
            </template>
            <template #right-icon>
              <van-radio name="3" :disabled="first" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="buttonsata"
          loading-text="充值中..."
          :disabled="isable"
          >确定充值</van-button
        >
        <van-popup v-model="showviplevel" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns2"
            @confirm="onConfirm4"
            @cancel="showviplevel = false"
          />
        </van-popup>
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
  Popup,
  Picker,
  Dialog,
} from "vant";
import { apiKaidan, apiChongzhi, apiShop } from "@/API/api";
export default {
  data() {
    return {
      crashid: this.$route.params.cardno,
      password: "",
      money: "",
      exertmoney: "0",
      moneyshop: "",
      time: "", //存钱时间
      person: this.$route.params.cus_name,
      radio: "1",
      crashmethod: "1",
      checkboxGroup: [],
      memo: "",
      payway: "1",
      selfno: "",
      effecttime: "",
      columns2: ["店铺1", "状态2", "状态3", "状态4", "状态5"],
      columns22: [10, 9, 8, 7, 6],
      viplevel: "伊美东平店",
      showviplevel: false,
      viplevelreally: "",
      reallyshop: 14,
      buttonsata: false,
      isable: false,
      first: false,
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
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
  },
  methods: {
    getshop() {
      var that = this;
      apiShop({}).then((res) => {
        that.columns2 = res.table.map(function (item) {
          return item.name;
        });
        that.columns22 = res.table.map(function (item) {
          return item.no;
        });
      });
    },
    getkaidan() {
      var that = this;
      apiKaidan({}).then((res) => {
        that.memo = res.table[0].memo;
        that.time = res.table[0].storedate;
        that.selfno = res.table[0].selfno;
        that.effecttime = res.table[0].effecttime;
      });
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onConfirm4(value, index) {
      this.viplevel = this.columns2[index];
      this.reallyshop = this.columns22[index];

      this.showviplevel = false;
    },

    onSubmit(values) {
      var that = this;
      var data = {
        cusid: this.$route.params.cusid,
      };
      for (let i in values) {
        if (values[i]) {
          data[i] = values[i];
        }
      }
      data.subcom = this.reallyshop;
      if (this.money == "") {
        this.$toast.fail("请输入金额");
      } else {
        Dialog.confirm({
          title: "确定充值吗",
          message:
            `<table>
          <tr><td>充值客户：</td><td>` +
            that.$route.params.cus_name +
            `</td></tr>
            <tr><td>充值金额：</td><td>` +
            that.money +
            `</td></tr>
              <tr><td>赠送金额：</td><td>` +
            that.exertmoney +
            `</td></tr>
         
            <tr><td>手工单号：</td><td>` +
            that.selfno +
            `</td></tr>
           
      
          
          </table>`,
        })
          .then(() => {
            apiChongzhi({ data }).then((res) => {
              if (res.errmsg == "OK") {
                this.buttonsata = false;
                this.isable = true;
                Dialog.alert({
                  title: "充值成功",
                  message: res.table[0].hintstr,
                });
                that.first = true;
                that.$route.params.lastmoney = res.table[0].aftermoney;
              } else {
                this.buttonsata = false;
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
  created() {
    this.viplevel = window.localStorage.getItem("subname");
    this.reallyshop = window.localStorage.getItem("subcom");
    this.getkaidan();
    this.getshop();
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