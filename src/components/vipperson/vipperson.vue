<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="会员资料查询"
      :fixed="true"
      right-text="新增会员"
      :left-arrow="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" class="checkroll">
      <van-field v-model="crashid" name="cus_name" placeholder="请输入姓名">
        <template #label>
          <span>姓名</span>
        </template>
      </van-field>
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="[{ validator, message: '请输入正确手机格式' }]"
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
      <van-field v-model="card" name="Cardno" placeholder="请输入卡号">
        <template #label>
          <span>卡号</span>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="shop"
        :value="viplevel"
        label="店铺名"
        placeholder="点击选择店铺"
        @click="showviplevel = true"
      />
      <van-field v-model="memo" name="memo" placeholder="备注">
        <template #label>
          <span>备注</span>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="calendar"
        :value="date"
        label="录入时间"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />

      <van-calendar
        v-model="showCalendar"
        :show-confirm="false"
        type="range"
        @confirm="onConfirm"
        :min-date="minDate"
        :max-date="maxDate"
      />

      <van-field
        readonly
        clickable
        name="time"
        :value="time"
        label="有效期时间"
        placeholder="点击选择日期"
        @click="show = true"
      />

      <van-calendar
        v-model="show"
        :show-confirm="false"
        type="range"
        @confirm="onConfirm2"
      />

      <van-field
        readonly
        clickable
        name="picker"
        :value="sata"
        label="会员卡等级"
        placeholder="点击选择会员卡等级"
        @click="showPicker = true"
      />
      <van-field v-model="carperson" name="carperson" placeholder="">
        <template #label>
          <span>开卡人</span>
        </template>
      </van-field>
      <van-field v-model="workcom" name="workcom" placeholder="">
        <template #label>
          <span>工作公司</span>
        </template>
      </van-field>
      <van-field v-model="bir" name="bir" placeholder="">
        <template #label>
          <span>生日</span>
        </template>
      </van-field>

      <div class="guding" ref="container">
        <van-sticky :container="container">
          <van-button round block type="info" native-type="submit"
            >查询会员资料</van-button
          ></van-sticky
        >
      </div>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm3"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-popup v-model="showviplevel" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm4"
          @cancel="showviplevel = false"
        />
      </van-popup>
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
  Calendar,
  Picker,
  Popup,
  Sticky,
} from "vant";
import { apiShop, apiVip } from "@/API/api";
export default {
  data() {
    return {
      crashid: "",
      memo: "", //备注
      mobile: "",
      container: null,
      sex: "", //性别
      carperson: "", //开卡人
      value: "",
      shop: "",
      card: "",
      vipsex: "",
      time: "",
      result: [],
      level: "1",
      twotme: "",
      date: "",
      showCalendar: false,
      showviplevel: false, //张开会员等级
      show: false,
      workcom: "", //工作公司
      sata: "",
      columns: ["状态1", "状态2", "状态3", "状态4", "状态5"],
      columns1: [],
      satareall: "",
      columns2: ["状态1", "状态2", "状态3", "状态4", "状态5"],
      columns22: [], //这个是下拉的值
      viplevel: "",
      newvalues: [11, 22, 33, 44, 55],
      showPicker: false,
      minDate: new Date(2017, 0, 1),
      maxDate: new Date(2020, 9, 28),
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
      phonerule: /^1(3|4|5|6|7|8|9)\d{9}$/,
      bir: "", //shengri
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
    [Calendar.name]: Calendar,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
  },
  created() {
    this.getpulldata();
    this.getvip();
  },

  methods: {
    onSubmit(values) {
      var pam = {};
      for (let i in values) {
        if (values[i]) {
          pam[i] = values[i];
        }
      }
      if (pam.shop != "") {
        pam.shop = this.viplevelreally;
      } else {
        delete pam.shop;
      }
      if (pam.sata != "") {
        pam.sata = this.satareall;
      } else {
        delete pam.sata;
      }
      var params = pam;
      this.$router.push({
        name: "detailed",
        params,
      });
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onClickRight() {
      //   this.$sotre.commit('changesata')
      this.$router.push("/info");
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showCalendar = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    onConfirm2(date) {
      const [start, end] = date;
      this.show = false;
      this.time = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    onConfirm3(value, index) {
      this.sata = this.columns[index];
      this.satareall = this.columns1[index];
      this.showPicker = false;
    },
    onConfirm4(value, index) {
      this.viplevel = this.columns2[index];
      this.viplevelreally = this.columns22[index];
      this.showviplevel = false;
    },

    validator(val) {
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(val) || val == "") {
        return true;
      } else {
        return false;
      }
    },
    getpulldata() {
      //获取下拉菜单的数据

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

    getvip() {
   

      var that = this;
      apiVip({}).then((res) => {
        that.columns = res.table.map(function (item) {
          return item.name;
        });
        that.columns1 = res.table.map(function (item) {
          return item.no;
        });
      });


    },
  },
  mounted() {
    this.container = this.$refs.container;
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
  background-color: #fafafa;
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

.van-button {
  margin-top: 3%;
  width: 45%;
  height: 5vh;
  margin-left: 27.5%;
}
.van-checkbox-group {
  margin-left: 20%;
}
/deep/ .check .van-nav-bar__text {
  color: white;
}
.guding {
  text-align: center;
  position: fixed;
  width: 100%;
  height: 5rem;
  bottom: 0vh;
}
.checkroll {
  height: 130vh;
}
</style>
