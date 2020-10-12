<template>
  <div class="hello">
    <van-nav-bar
      title="会员操作"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" class="infoform">
      <van-field
        v-model="crashid"
        name="cus_name"
        placeholder="请输入姓名"
        :required="true"
      >
        <template #label>
          <span>名称</span>
        </template>
      </van-field>
      <van-field
        v-model="phone"
        name="mobile"
        placeholder="请输入手机号码"
        :required="true"
      >
        <template #label>
          <span>手机号码</span>
        </template>
      </van-field>

      <van-field name="sex" label="性别" input-align="right" :required="true">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="Y">男</van-radio>
            <van-radio name="N">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- <van-field
        v-model="shop"
        name="subcom"
        placeholder="请输入店铺名"
        :required="true"
      >
        <template #label>
          <span>所属分店</span>
        </template>
      </van-field> -->
      <van-field
        readonly
        clickable
        name="subcom"
        :value="shop"
        label="店铺"
        placeholder="点击选择会员店铺"
        @click="showPicker = true"
        :required="true"
      />
      <van-popup v-model="showPicker" position="bottom" :required="true">
        <van-picker
          show-toolbar
          :columns="secondshop"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="cardtype"
        :value="vipsex"
        label="会员等级"
        placeholder="点击选择会员等级"
        @click="showvipPicker = true"
        :required="true"
      />
      <van-popup v-model="showvipPicker" position="bottom" :required="true">
        <van-picker
          show-toolbar
          :columns="firstvip"
          @confirm="onConfirmvip"
          @cancel="showvipPicker = false"
        />
      </van-popup>

      <van-field v-model="card" name="cardno" placeholder="可以为空">
        <template #label>
          <span>卡号</span>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="appenddate"
        :value="time"
        label="录入日期"
        placeholder="点击选择日期"
        @click="showtime = true"
      />
      <van-popup v-model="showtime" position="bottom" :required="true">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @change="endTimeChange"
          @confirm="showtime = false"
          @cancel="showtime = false"
        />
      </van-popup>
      <van-field
        v-model="password"
        type="password"
        name="password_enter"
        placeholder="*****"
      >
        <template #label>
          <span>密码</span>
        </template>
      </van-field>
      <!-- <van-field name="radio" label="状态" input-align="right">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="男">有卡状态</van-radio>
            <van-radio name="女">无卡状态</van-radio>
          </van-radio-group>
        </template>
      </van-field> -->

      <van-button round block type="info" native-type="submit"
        >保存资料</van-button
      >
    </van-form>
  </div>
</template>

<script>
import {
  Search,
  Cell,
  NavBar,
  Toast,
  Icon,
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  Field,
  Radio,
  RadioGroup,
  Popup,
  Picker,
  DatetimePicker,
} from "vant";
import { apiShop, apiVipSave, apiVipinfo, apiVip, apiVipOpen } from "@/API/api";
export default {
  created() {
    this.getvip(),
      apiShop({}).then((res) => {
        this.firstshop = res.table;
        console.log("店铺", this.firstshop);
        this.secondshop = this.firstshop.map(function (item) {
          return item.name;
        });
      });
    if (this.$route.params.cus_name) {
      console.log("这是修改资料");
      var that = this;
      var pam = {};
      pam.cusid = that.$route.params.cusid;
      apiVipinfo(pam).then((res) => {
        that.first = res.table[0];

        if (that.first.sex == "女士") {
          that.first.sex = "N";
        }

        this.crashid = res.table[0].cus_name;
        this.phone = res.table[0].mobile;
        this.sex = res.table[0].sex;
        this.card = res.table[0].cardno;
        this.time = res.table[0].appenddate;
        // this.vipsex = res.table[0].cardtype;
        this.getshopname(res.table[0].subcom);
        if (res.table[0].cardtype) {
          that.getvipname(res.table[0].cardtype);
        }
      });

      // var pamns = {};
      // pamns.cusid = this.$route.params.cusid;
      // pamns.data = {};
      // pamns.old = {};

      // apiVipSave(pamns).then((res) => {
      //   console.log(res);
      // });
    } else {
      apiVipOpen({}).then((res) => {
        this.time = res.table[0].insdate;
      });
      console.log("这是创建资料");
    }
    // this.reallshop = window.localStorage.getItem("subcom");
    // this.value = window.localStorage.getItem("subname");
    // this.getshop();
  },
  data() {
    return {
      crashid: "",
      phone: "",
      sex: "",
      value: "",
      shop: "",
      card: "",
      vipsex: "",
      time: "",
      result: [],
      password: "",
      radio: "",
      value: "",
      columns: ["超级会员", "普通会员", "白金会员", "散客", "龙腾VIP"],
      showPicker: false,
      showtime: false,

      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      first: {},
      firstshop: [],
      secondshop: [],
      firstvip: [],
      secondvip: [],
      showvipPicker: false,
    };
  },
  components: {
    [Search.name]: Search,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Field.name]: Field,
    [Form.name]: Form,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
  },
  methods: {
    onSubmit(values) {
      var that = this;
      var pamns = that.first; //这是初始数据

      let pam = {};
      let really = {};
      let old = {};
      for (let i in values) {
        if (values[i]) {
          pam[i] = values[i];
        }
      }
      if (pam.subcom) {
        for (let i = 0; i < that.firstshop.length; i++) {
          if (that.firstshop[i].name == pam.subcom) {
            pam.subcom = that.firstshop[i].no;
          }
        }
      }
      if (pam.cardtype) {
        var sata = pam.cardtype;
        for (let i = 0; i < that.firstvip.length; i++) {
          if (sata == that.firstvip[i]) {
            pam.cardtype = that.secondvip[i];
          }
        }
      }
      for (let i in pam) {
        if (pam[i] != pamns[i]) {
          really[i] = pam[i];
          old[i] = pamns[i];
        }
      }
      console.log("修改", really);
      console.log("未修改", old);
      var last = {};
      last.cusid = that.$route.params.cusid;
      last.data = really;
      last.old = old;
      apiVipSave(last).then((res) => {
        console.log(res);
      });
    },
    onConfirm(value) {
      this.shop = value;
      this.showPicker = false;
    },
    onConfirmvip(value) {
      this.vipsex = value;
      this.showvipPicker = false;
    },

    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    endTimeChange(e) {
      var endTimeArr = e.getValues();
      this.time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`;
      this.timeshow = false;
    },

    getshopname(a) {
      var that = this;
      apiShop({}).then((res) => {
        for (let i = 0; i < res.table.length; i++) {
          if (res.table[i].no == a) {
            that.shop = res.table[i].name;
          }
        }
      });
    },
    getvipname(a) {
      var that = this;
      apiVip({}).then((res) => {
        for (let i = 0; i < res.table.length; i++) {
          if (res.table[i].no == a) {
            that.vipsex = res.table[i].name;
          }
        }
      });
    },
    getvip() {
      var that = this;
      apiVip({}).then((res) => {
        that.firstvip = res.table.map(function (item) {
          return item.name;
        });
        that.secondvip = res.table.map(function (item) {
          return item.no;
        });
      });
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
  background-color: #fafafa;
  border-radius: 8px;
  margin-bottom: 2vh;
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ .van-field__control--custom {
  margin-left: 6%;
}

.van-button {
  margin-top: 3%;
  width: 45%;
  height: 5vh;
  margin-left: 27.5%;
}
.van-checkbox-group {
  margin-left: 20%;
}
.van-radio-grou {
  float: right;
}
.infoform {
  width: 90%;
  margin-left: 5%;
}
</style>
