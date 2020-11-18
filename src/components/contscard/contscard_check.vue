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
      <van-field clickable name="cardno" v-model="cardno" label="会员卡号" class="checktwo"/>
      <van-field clickable name="mobileno" v-model="mobile" label="手机" class="checktwo" />
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
      <van-field v-model="goo_code" name="goo_code" label="项目" class="checktwo">
        <template #input>
          <a-select
            style="width: 100%"
            show-search
            showArrow
            :value="value0"
            placeholder="Tags Mode"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch0"
            @change="handleChange0"
          >
            <a-select-option
              style="width: 200%"
              v-for="(d, index) in data"
              :key="index"
              class="banktoselect"
              >{{ d.goo_name }} {{ d.goo_price }}</a-select-option
            >
          </a-select>
          <!-- <a-input-number     style="width: 30%"  :min="0" :max="10" :step="0.1" @change="onChange11" /> -->
        </template>
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
      <van-field name="ispay" v-model="ispay" label="付款" class="checktwo">
        <template #input>
          <a-select style="width: 100%" @change="handleChang1" v-model="ispay">
            <a-select-option value="A"> 全部 </a-select-option>
            <a-select-option value="Y"> 已付清 </a-select-option>
            <a-select-option value="N"> 未付清 </a-select-option>
          </a-select>
        </template>
      </van-field>
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
} from "vant";
import { Product_type, Goodsno_find } from "@/API/product";
import { clean } from "@/methods/clean";
import { GetList_Shop } from "@/API/getlistvalue.js";
import { timeday, timetwoyearday } from "@/methods/time";
import { secondcard_find } from "@/API/secondcard";

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
    handleChange(value) {
      console.log(value);
      this.count = value;
    },
    handleChang1(value) {
      console.log(value);
      this.isplay = value;
    },
    onSubmit(values) {
      values.subcom = this.reallsubcom;
      values.count = this.count;
      values.ispay = this.ispay;
      console.log(values.begindate);

      if (values.begindate == "") {
        Toast.fail("请输入开始时间");
      } else if (values.enddate == "") {
        Toast.fail("请输入结束时间");
      } else {
        var pams = clean(values);
        console.log(pams);
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
    handleSearch0(value) {
      var that = this;

      var pam = {};
      // pam.card = value;
      pam.card = value;
      pam.out_no = that.$route.params.out_no;
      if (value) {
        Goodsno_find(pam).then((res) => {
          that.data = res.table;
        });
      }
    },
    handleChange0(value) {
      this.value0 = value;
      // this.project = this.data[value].goo_name;
      this.goo_code = this.data[value].goo_code;
      console.log("打印", value);
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
  },
  created() {
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
    this.subcom = localStorage.getItem("subname");
    this.reallsubcom = localStorage.getItem("subcom");
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
</style>
