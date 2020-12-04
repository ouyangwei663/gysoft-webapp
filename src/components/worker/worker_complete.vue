<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="完善资料"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" class="bankaddform">
      <van-field
        readonly
        clickable
        name="born"
        :value="begindate"
        label="出生日期"
        placeholder="点击选择开始日期"
        @click="showtime = true"
      />

      <van-popup v-model="showtime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleEndDateConfirm"
          @cancel="showtime = false"
        />
      </van-popup>
      <van-field
        name="nation"
        v-model="mingzu"
        label="民族"
        placeholder="请输入民族"
      />
      <van-field
        name="idno"
        type="number"
        v-model="idcard"
        label="身份证"
        placeholder="请输入身份证号码"
      />
      <van-field
        name="whereborn"
        v-model="jiguan"
        label="籍贯"
        placeholder="请输入籍贯"
      />
      <van-field
        name="introman"
        v-model="person"
        label="介绍人员"
        placeholder="请输入介绍人员"
      />
      <van-field
        name="basewage"
        type="number"
        v-model="money"
        label="底薪"
        placeholder="请输入底薪"
      />
      <van-field
        name="empgroup"
        type="number"
        v-model="idno"
        label="分组编码"
        placeholder="请输入分组编码"
      />
      <van-field
        name="linkman"
        v-model="name"
        label="紧急联系人"
        placeholder="请输入紧急联系人"
      />
      <van-field
        name="intr_phone"
        v-model="personphone"
        label="紧急联系电话"
        placeholder="请输入紧急联系人电话"
      />
      <!-- <van-field
        name="billnotype"
        :value="billnotype"
        label="单据类型"
        class="colordanger"
        ><template #input>
          <a-select
            show-search

            option-filter-prop="children"
            style="width: 100%"
            @change="handleChange2"
          >
            <a-select-option
              v-for="(item, index) in product_type"
              :key="index"
              :value="item.no"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </template>
      </van-field> -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Icon,
  Form,
  Field,
  RadioGroup,
  Radio,
  Button,
  Popup,
  Picker,
  DatetimePicker,
  Dialog,
} from "vant";
import { Product_type } from "@/API/product";
import { clean } from "@/methods/clean";
import { GetList_Shop } from "@/API/getlistvalue.js";
import { timeday, timetwoyearday } from "@/methods/time";
import { work_save } from "@/API/work.js";
export default {
  data() {
    return {
      selfno: "",
      billnotype: "",
      product_type: [],
      showviplevel: false,
      subcom: "",
      columns2: [],
      columns22: [],
      reallsubcom: "",
      count: "",
      showtime: false,
      showendtime: false,
      currentDate: new Date(),
      enddate: "",
      begindate: "",
      gegindate: "",
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2020, 9, 28),
      mingzu: "",
      idcard: "",
      jiguan: "",
      person: "",
      money: "",
      idno: "",
      name: "",
      personphone: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    handleChange2(value) {
      this.billnotype = value;
    },
    onSubmit(values) {
      var pams = clean(values);

      pams.empId = this.$route.params.empId;
      var pamms = {};
      pamms.data = pams;
      work_save(pamms).then((res) => {
        Dialog.alert({
          title: "保存成功",
          message: res.table[0].hintstr,
        });
      });
    },
    onConfirm4(value, index) {
      console.log(value, index);
      this.subcom = value;
      this.reallsubcom = this.columns22[index];
      this.showviplevel = false;
    },
    handleEndDateConfirm(value) {
      this.timeShow = false;
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.begindate = timer;
      this.showtime = false;
    },
    endhandleEndDateConfirm(value) {
      this.timeShow = false;
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.enddate = timer;
      this.showendtime = false;
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Dialog.name]: Dialog,
  },
  created() {
    console.log("路由", this.$route);
    if (sessionStorage.getItem("product_type") == null) {
      //获取列表

      Product_type({}).then((res) => {
        this.product_type = res.table;
        sessionStorage.setItem(
          "product_type",
          JSON.stringify(this.product_type)
        );
      });
    } else {
      this.product_type = JSON.parse(sessionStorage.getItem("product_type"));
    }

    if (sessionStorage.getItem("subcom") == null) {
      var that = this;
      GetList_Shop({}).then((res) => {
        sessionStorage.setItem("subcom", JSON.stringify(res.table));

        that.columns2 = JSON.parse(sessionStorage.getItem("subcom")).map(
          function (item) {
            return item.name;
          }
        );
        that.columns22 = JSON.parse(sessionStorage.getItem("subcom")).map(
          function (item) {
            return item.no;
          }
        );
      });
    } else {
      this.columns2 = JSON.parse(sessionStorage.getItem("subcom")).map(
        function (item) {
          return item.name;
        }
      );
      this.columns22 = JSON.parse(sessionStorage.getItem("subcom")).map(
        function (item) {
          return item.no;
        }
      );
    }
    this.mingzu = this.$route.params.nation;
    this.begindate = this.$route.params.born;
    this.idcard = this.$route.params.idno;
    this.jiguan = this.$route.params.whereborn;
    this.person = this.$route.params.introman;
    this.money = this.$route.params.basewage;
    this.idno = this.$route.params.empgroup;
    this.name = this.$route.params.linkman;
    this.personphone = this.$route.params.intr_phone;
  },
  mounted() {},
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
</style>
