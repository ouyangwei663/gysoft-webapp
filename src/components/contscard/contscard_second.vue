<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="次卡销售"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-form class="cardsecond">
      <van-field
        name="count"
        v-model="count"
        type="digit"
        label="总次数"
        @input="oneprice = Math.floor(price / count)"
      />
      <van-field
        name="price"
        v-model="price"
        type="digit"
        label="总金额"
        @input="oneprice = Math.floor(price / count)"
      />
      <van-field
        disabled
        name="oneprice"
        v-model="oneprice"
        type="digit"
        label="单次金额"
      />
      <van-field
        name="pay"
        class="checktwo"
        v-model="pay"
        type="digit"
        label="付款金额"
      />
    </van-form>
    <div class="paycontact">
      <van-cell-group>
        <van-field
          v-model="money"
          label-width="10em"
          type="number"
          :disabled="isloading"
        >
          <template #label>
            <a-icon
              type="account-book"
              :style="{ fontSize: '16px', color: 'red' }"
            />

            会员余额支付
          </template>
        </van-field>
        <van-field
          v-model="givemoney"
          label-width="10em"
          type="number"
          :disabled="isloading"
        >
          <template #label>
            <a-icon
              type="dollar"
              :style="{ fontSize: '16px', color: '#FF6600' }"
            />

            会员赠送支付
          </template>
        </van-field>
        <van-field
          v-model="weixin"
          label-width="10em"
          type="number"
          :disabled="isloading"
        >
          <template #label>
            <a-icon
              type="wechat"
              :style="{ fontSize: '16px', color: 'green' }"
            />

            微信支付
          </template>
        </van-field>
        <van-field
          v-model="alipay"
          label-width="10em"
          type="number"
          :disabled="isloading"
        >
          <template #label>
            <a-icon
              type="alipay-circle"
              :style="{ fontSize: '16px', color: '#08c' }"
            />

            支付宝支付
          </template>
        </van-field>
        <van-field
          v-model="otherpay"
          label-width="10em"
          type="number"
          :disabled="isloading"
        >
          <template #label>
            <a-icon
              type="money-collect"
              :style="{ fontSize: '16px' }"
              theme="twoTone"
            />
            其他支付
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="tall"></div>
    <van-submit-bar
      @submit="paybill"
      class="tijiao"
      :price="paymoney"
      button-text="提交订单"
    >
    </van-submit-bar>
    <van-popup
      v-model="showsecond"
      position="bottom"
      :style="{ height: '100%', background: '#f8f8f8' }"
    >
      <div id="contscard_second">
        <third :show="showsecond" @changeshow="changeshow"></third>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Icon,
  SubmitBar,
  Form,
  Field,
  Button,
  CellGroup,
  Cell,
  Popup,
} from "vant";
import Third from "@/components/contscard/contscard_third";
import { secondcard_save } from "@/API/secondcard.js";

export default {
  props: { show: Boolean, data1: Object },
  data() {
    return {
      count: "10",
      oneprice: "",
      price: "0",
      isloading: "false",
      money: "",
      weixin: "",
      givemoney: "",
      alipay: "",
      otherpay: "",
      isloading: false,
      performance: "",
      showsecond: false,
      pay: "",
      paycount: "",
      data2: {},
      successful: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$emit("changeshow", false);
    },
    onClickRight() {
      this.showsecond = true;
    },
    onSubmit(values) {},
    changeshow(Boolen) {
      this.showsecond = Boolen;
    },
    paybill() {
      console.log(this.paymoney);
      var that = this;
      if (this.paymoney / 100 < this.pay) {
        Toast.fail("支付金额不够");
      } else if (this.paymoney / 100 > this.pay) {
        Toast.fail("支付金额超出所需金额");
      } else if (this.pay == "") {
        Toast.fail("请输入付款金额");
      } else if (this.count == "") {
        Toast.fail("请输入次数");
      } else if (this.price == "") {
        Toast.fail("请输入总金额");
      } else {
        this.data2.totalnum = this.count;
        this.data2.price = this.price;
        this.data2.factmoney = this.pay;
        this.data2.money = this.money;
        this.data2.givemoney = this.givemoney;
        this.data2.weixin = this.weixin;
        this.data2.alipay = this.alipay;
        this.data2.otherpay = this.otherpay;
        console.log(this.data2);
        Toast.loading({
          duration: 0, // 持续展示 toast
          message: "结算中...",
          forbidClick: false,
        });
        secondcard_save({ data: this.data2 }).then((res) => {
          Toast.clear();
          console.log(res);
          if (res.errcode == "0") {
            Toast.success("支付成功");
            this.showsecond = true;
          }
        });
      }
    },
  },
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [SubmitBar.name]: SubmitBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    Third,
  },
  created() {
    console.log(this.data1);

    this.data2 = this.data1;
    this.count = this.data2.totalnum;
    this.price = this.data2.price;
  },
  mounted() {},
  computed: {
    paymoney: function () {
      var total;
      total =
        Number(this.money) +
        Number(this.givemoney) +
        Number(this.weixin) +
        Number(this.alipay) +
        Number(this.otherpay);
      return total * 100;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.van-cell {
  /* width: 90%; */
  background-color: #fafafa;
  /* margin-left: 5%; */
  border-radius: 8px;
  margin-top: 2%;
}
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-field {
  width: 90%;
  background-color: #f3f3f3;
  margin-left: 5%;
  border-radius: 8px;
  margin-bottom: 2vh;
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ .van-field__control--custom {
  margin-left: 6%;
}
.cardsecond {
  margin-top: 68px;
}
.paycontact {
  margin-top: 2vh;
  text-align: left;
  width: 90%;
  margin-left: 5%;

  border-radius: 0.2rem;
  text-align: left;
}
.van-cell-group {
  padding-top: 1vh;
  padding-bottom: 1vh;
}
#contscard_second {
  height: 10vh;
  width: 100%;
}
.tall {
  height: 10vh;
  width: 100%;
}
.check {
  color: #ff1493;
}
/deep/ .checktwo .van-field__label span {
  color: #ff1493;
}
</style>
