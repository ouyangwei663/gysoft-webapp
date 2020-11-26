<template>
  <div class="hello">
    <van-nav-bar
      title="会员操作"
      :fixed="true"
      :left-arrow="true"
      right-text="详细资料"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <div id="tan">

    </div>
    <van-form @submit="onSubmit" class="infoform">
      <van-field v-model="crashid" name="cus_name" placeholder="请输入姓名">
        <template #label>
          <span class="check">名称</span>
        </template>
      </van-field>

      <van-field
        v-model="phone"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="[{ validator, message: '请输入正确手机格式' }]"
      >
        <template #label>
          <span class="check">手机号码</span>
        </template>
      </van-field>

      <van-field name="sex" label="性别" input-align="right" class="checktwo">
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
        class="checktwo"
      />
      <van-popup v-model="showPicker" position="bottom">
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
        class="checktwo"
      />
      <van-popup v-model="showvipPicker" position="bottom" :required="true">
        <van-picker
          show-toolbar
          :columns="firstvip"
          @confirm="onConfirmvip"
          @cancel="showvipPicker = false"
        />
        6666666666666666
      </van-popup>

      <van-field v-model="card" name="cardno" placeholder="可以为空">
        <template #label>
          <span>卡号</span>
        </template>
      </van-field>

      <van-field
        disabled
        v-if="isshow"
        readonly
        clickable
        name="appenddate"
        :value="time"
        label="录入日期"
        placeholder="点击选择日期"
        @click="showtime = true"
      />
      <!-- <van-field
        v-model="password"
        type="password"
        name="password_enter"
        placeholder="*****"
      >
        <template #label>
          <span>密码</span>
        </template>
      </van-field> -->
      <!-- <van-field name="radio" label="状态" input-align="right">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="男">有卡状态</van-radio>
            <van-radio name="女">无卡状态</van-radio>
          </van-radio-group>
        </template>
      </van-field> -->

      <van-button
        round
        block
        type="info"
        native-type="submit"
        class="gudingfirst"
        >保存资料</van-button
      >
    </van-form>
    <van-button
      v-if="isshow"
      round
      block
      type="primary"
      class="gudingsecond"
      @click="topass()"
      >修改密码</van-button
    >
    <van-button
      v-if="isshow"
      round
      block
      type="danger"
      class="gudingthird"
      @click="toMore()"
      >更多资料</van-button
    >
    <van-popup v-model="show" get-container="#pop" >

    </van-popup>
    <div class="air"></div>
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
  Dialog,
} from "vant";

import { GetList_Shop, GetList_Hy } from "@/API/getlistvalue.js";
import { Customer_find, Customer_open, Customer_save } from "@/API/customer.js";
import { time } from "@/methods/time";
export default {
  name: "HellWorld",
  created() {
    console.log("传递", this.$route.params);
    this.getvip(),
      GetList_Shop({}).then((res) => {
        this.firstshop = res.table;
        console.log("店铺", this.firstshop);
        this.secondshop = this.firstshop.map(function (item) {
          return item.name;
        });
      });
    if (this.$route.params.cusid) {
      console.log("这是修改资料");
      var that = this;
      var pam = {};
      pam.cusid = that.$route.params.cusid;
      Customer_find(pam).then((res) => {
        that.first = res.table[0];
        if (that.first.sex == "女士") {
          that.first.sex = "N";
        }

        this.crashid = res.table[0].cus_name;
        this.phone = res.table[0].mobile;
        this.sex = res.table[0].sex;
        this.card = res.table[0].cardno;
        // this.comname = res.table[0].comname;
        // ths.memo = res.table[0].memo;
        var str = res.table[0].appenddate;
        var arr = str.split("/");
        var arr2 = arr[2].split(" "); //时间格式修改方法定位（可封装）
        var timestr = arr2[0] + "-" + arr[0] + "-" + arr[1] + " " + arr2[1];
        this.time = timestr;
        this.getshopname(res.table[0].subcom);
        if (res.table[0].cardtype) {
          that.getvipname(res.table[0].cardtype);
        }
        this.comname = res.table[0].comname;
        this.memo = res.table[0].memo;
        this.first_date = res.table[0].first_date;
        this.last_date = time(res.table[0].last_date);
      });

      // var pamns = {};
      // pamns.cusid = this.$route.params.cusid;
      // pamns.data = {};
      // pamns.old = {};

      // apiVipSave(pamns).then((res) => {
      //   console.log(res);
      // });
    } else {
      this.isshow = false;
      Customer_open({}).then((res) => {
        this.time = res.table[0].insdate;
        this.shop = window.localStorage.getItem("subname");
      });
      console.log("这是创建资料");
    }
    // this.reallshop = window.localStorage.getItem("subcom");
    // this.value = window.localStorage.getItem("subname");
    // this.getshop();
  },
  activated() {
    console.log("动态", this.$route.params);
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
      show:true,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      first: {},
      firstshop: [],
      secondshop: [],
      firstvip: [],
      secondvip: [],
      showvipPicker: false,
      isshow: true,
      comname: "", //公司名称
      memo: "", //备注
      first_date: "", //首次来店
      last_date: "", //末次来店
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
    [Dialog.name]: Dialog,
  },
  methods: {
    onSubmit(values) {
      var that = this;
      if (values.cus_name == "") {
        Toast.fail("姓名不能为空");
      } else if (values.mobile == "") {
        Toast.fail("手机号码不为空");
      } else if (values.sex == "") {
        Toast.fail("请选择性别");
      } else {
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

        var last = {};
        last.cusid = that.$route.params.cusid;
        last.data = really;
        last.old = old;
        if (this.$route.params.cusid) {
        } else {
          var newobj = old;
          for (let i in old) {
            if (old[i]) {
            } else {
              newobj[i] = null;
            }
          }
          last.old = newobj;
          console.log(newobj);
        }
        var arr = Object.keys(really);
        if (arr.length == 0) {
          Dialog.alert({ message: "没有修改数据" });
        } else {
          Customer_save(last).then((res) => {
            console.log(res.table[0]);
            Dialog.alert({
              title: "保存成功",
              message: res.table[0].hintstr,
            }).then(() => {
              console.log(res.table[0].cusid);
              var params = {};
              params.cusid = res.table[0].cusid;

              //跳转节点
            });
          });
        }
      }
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
    onClickRight() {
      this.$router.push({
        name: "vipbookdetail",
      });
    },
    endTimeChange(e) {
      var endTimeArr = e.getValues();
      this.time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`;
      this.timeshow = false;
    },

    getshopname(a) {
      var that = this;
      GetList_Shop({}).then((res) => {
        for (let i = 0; i < res.table.length; i++) {
          if (res.table[i].no == a) {
            console.log("店铺名称", res.table[i].name);
            that.shop = res.table[i].name;
          }
        }
      });
    },
    getvipname(a) {
      var that = this;
      GetList_Hy({}).then((res) => {
        for (let i = 0; i < res.table.length; i++) {
          if (res.table[i].no == a) {
            that.vipsex = res.table[i].name;
          }
        }
      });
    },
    getvip() {
      var that = this;
      GetList_Hy({}).then((res) => {
        that.firstvip = res.table.map(function (item) {
          return item.name;
        });
        that.secondvip = res.table.map(function (item) {
          return item.no;
        });
      });
    },
    toMore() {
      var params = this.first;
      this.$router.push({
        name: "HelloWorldmore",
        params,
      });
    },
    topass(){
      console.log('修改密码')
    },
    validator(val) {
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(val) || val == "") {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/detailed") {
      // 这是路由path

      this.$store.commit("setKeepAlive", [""]); //这是此页面的name属性名字
      console.log("置空");
    } else {
    }
    next();
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
.gudingfirst {
  position: fixed;
  margin-left: 22.5%;
  bottom: 17vh;
}
.gudingsecond {
  position: fixed;
  bottom: 10vh;
}
.gudingthird {
  position: fixed;
  bottom: 3vh;
}
.air {
  width: 100%;
  height: 10vh;
}

.check {
  color: #ff1493;
}
/deep/ .checktwo .van-field__label span {
  color: #ff1493;
}
/deep/ .van-nav-bar__right .van-nav-bar__text {
  color: white;
}
</style>
