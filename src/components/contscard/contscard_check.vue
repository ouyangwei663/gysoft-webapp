<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="次卡查询"
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

    <van-form @submit="onSubmit" class="bankaddform">
      <van-field
        clickable
        name="cardno"
        v-model="cardno"
        label="会员卡号"
        class="checktwo"
      />
      <van-field
        clickable
        name="mobileno"
        v-model="mobile"
        label="手机"
        class="checktwo"
      />
      <van-field
        readonly
        clickable
        name="subcom"
        :value="subcom"
        label="店铺名"
        placeholder="点击选择店铺"
        @click="showviplevel = true"
        class="checktwo"
      />
      <van-cell
        title="购买时间"
        readonly
        clickable
        :value="timename"
        placeholder="点击选择时间"
        @click="showlist = true"
        class="checktwoone"
      />
      <van-popup v-model="showlist" position="bottom">
        <van-picker
          show-toolbar
          :columns="timedate"
          @confirm="onConfirmtime"
          @cancel="showlist = false"
        />
      </van-popup>
      <van-field
        v-model="goo_code"
        name="goo_name"
        label="项目"
        class="checktwo"
      >
      </van-field>

      <!-- <van-field name="count" v-model="count" label="次数">
        <template #input>
          <a-select style="width: 100%" @change="handleChange" v-model="count">
            <a-select-option value="A"> 全部 </a-select-option>
            <a-select-option value="Y"> 已用完 </a-select-option>
            <a-select-option value="N"> 未用完 </a-select-option>
          </a-select>
        </template>
      </van-field> -->
      <van-field
        name="Status"
        v-model="ispay"
        label="次卡状态"
        class="checktwo"
      >
        <template #input>
          <a-select style="width: 100%" @change="handleChang1" v-model="ispay">
            <a-select-option value="A"> 全部 </a-select-option>
            <a-select-option value="Y"> 有效 </a-select-option>
            <a-select-option value="N"> 退卡 </a-select-option>
            <a-select-option value="B"> 用完 </a-select-option>
            <a-select-option value="C"> 赠送 </a-select-option>
            <a-select-option value="D"> 已删除 </a-select-option>
            <a-select-option value="E"> 补款记录 </a-select-option>
            <a-select-option value="F"> 过期 </a-select-option>
            <!-- <a-select-option value="N"> 退卡 </a-select-option> -->
          </a-select>
        </template>
      </van-field>
      <van-field
        v-model="mobileno"
        name="mobileno"
        label="手机/卡号"
        class="checktwo"
      >
      </van-field>
      <!-- 
      <van-collapse v-model="activeNames" class="banktimecenter">
        <van-collapse-item name="1" left>
          <template #title> 高级 </template>
          <van-field
            class="checktwo"
            readonly
            clickable
            name="begindate"
            :value="begindate"
            label="开始时间"
            placeholder="点击选择开始日期"
            @click="showtime = true"
          />
          <van-field
            class="checktwo"
            readonly
            clickable
            name="enddate"
            :value="enddate"
            label="结束时间"
            placeholder="点击选择结束日期"
            @click="showendtime = true"
          />
        </van-collapse-item>
      </van-collapse> -->
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
      <van-popup v-model="showendtime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="endhandleEndDateConfirm"
          @cancel="showendtime = false"
        />
      </van-popup>
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

      <van-popup v-model="showviplevel" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm4"
          @cancel="showviplevel = false"
        />
      </van-popup>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          查询
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
  CollapseItem,
  Collapse,
  Cell,
} from "vant";
import { Product_type, Goodsno_find } from "@/API/product";
import { clean } from "@/methods/clean";
import { GetList_Shop } from "@/API/getlistvalue.js";
// import { Select } from "ant-design-vue";
import {
  timeday,
  timetwoyearday,
  timeyesterday,
  timesevenday,
  timemonthday,
  timeyearday,
  timethreeyearday,
} from "@/methods/time";
import { secondcard_find } from "@/API/secondcard";
// import Select from "ant-design-vue/lib/select";
// import "ant-design-vue/lib/select/style/css";

// import 'ant-design-vue/lib/select/style/css';

export default {
  data() {
    return {
      cardno: "",
      cus_name: "",
      ispay: "",
      mobile: "",
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
      goo_code: "",
      data: [],
      value0: "",
      activeNames: [],
      showlist: false,
      timedate: ["今天", "昨天", "近一周", "本月", "全年"],
      timename: "",
      mobileno: "",
    };
  },
  methods: {
    onConfirmtime(value) {
      this.timename = value;
      if (value == "今天") {
        console.log("今天");
        this.begindate = timeday();
        this.enddate = timeday();
      } else if (value == "昨天") {
        console.log("昨天");
        this.begindate = timeyesterday();
        this.enddate = timeyesterday();
      } else if (value == "近一周") {
        console.log("近一周");
        this.begindate = timesevenday().needday;
        this.enddate = timesevenday().day;
      } else if (value == "本月") {
        console.log("本月");
        this.begindate = timemonthday().needday;
        this.enddate = timemonthday().day;
      } else if (value == "全年") {
        console.log("全年");
        this.begindate = timeyearday().needday;
        this.enddate = timeyearday().day;
      }
      this.showlist = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    handleChange2(value) {
      this.billnotype = value;
    },
    handleChange(value) {
      console.log(value);
      this.count = value;
    },
    handleChang1(value) {
      console.log(value);
      this.isplay = value;
    },
    onSubmit(values) {
      values.begindate = this.begindate;
      values.enddate = this.enddate;
      values.subcom = this.reallsubcom;
      values.count = this.count;
      // values.ispay = this.ispay;
      if (values.begindate == "") {
        Toast.fail("请输入开始时间");
      } else if (values.enddate == "") {
        Toast.fail("请输入结束时间");
      } else {
        console.log("次卡查询");
        var pams = clean(values);
        console.log("条件", pams);
        // secondcard_find({ begindate: "2016-01-01", enddate: "2017-11-13" }).then(
        //   (res) => {
        //     console.log("次卡查询", res);
        //   }
        // );
        var params = pams;
        this.$router.push({
          name: "contscard_info",
          params,
        });
      }
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
      var time2 = date.getFullYear() + 2 + "-" + m + "-" + d;
      this.begindate = timer;
      this.enddate = time2;
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
    [CollapseItem.name]: CollapseItem,
    [Collapse.name]: Collapse,
    [Cell.name]: Cell,
    // ASelect: Select,
    // ASelectOption: Select.Option,
    // ASelect: Select
  },
  created() {
    var date = timethreeyearday();
    this.begindate = date.needday;
    this.enddate = date.day;

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
    // this.subcom = localStorage.getItem("subname");
    // this.reallsubcom = localStorage.getItem("subcom");
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
/deep/ .colordanger .van-field__label span {
  color: #ff1493;
}
.check {
  color: #0f09af;
}
/deep/ .checktwo .van-field__label span {
  color: #0f09af;
}
.checktwoone {
  width: 90%;
  margin-left: 5%;
  text-align: left;
}
.checktwoone span {
  color: #0f09af;
}
</style>
