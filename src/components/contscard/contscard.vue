<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="销售次卡"
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
        v-model="selfno"
        name="selfno"
        label="手工单号"
        placeholder="请输入手工单号"
        disabled
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
      <van-field
        v-model="project"
        name="goo_code"
        label="项目"
        class="checktwo"
      >
        <template #input>
          <a-select
            style="width: 100%"
            show-search
            showArrow
            :value="value0"
            placeholder="输入价格或编码、名称"
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
      <van-field
        v-model="count"
        name="totalnum"
        type="digit"
        label="总次数"
        class="checktwo"
      />
      <van-cell
        class="centercell"
        title="商品总价值"
        :value="goo_price * count"
      >
      </van-cell>
      <van-field
        readonly
        clickable
        name="carbegin"
        :value="begindate"
        label="开始时间"
        placeholder="点击选择开始日期"
        @click="showtime = true"
        class="checktwo"
      />
      <van-field
        readonly
        clickable
        name="carend"
        :value="enddate"
        label="结束时间"
        placeholder="点击选择结束日期"
        @click="showendtime = true"
        class="checktwo"
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
      <van-field
        name="ismr"
        :value="billnotype"
        label="单据类型"
        class="colordanger checktwo"
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
      </van-field>

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
          下一步
        </van-button>
      </div>
    </van-form>
    <van-popup
      v-model="show"
      position="bottom"
      close-icon="close"
      close-icon-position="bottom-center"
      :style="{ height: '100%', background: '#f8f8f8' }"
    >
      <second :show="show" :data1="data1" @changeshow="changeshow"></second>
    </van-popup>
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
  Cell,
} from "vant";
import { Product_type } from "@/API/product";
import { clean } from "@/methods/clean";
import { GetList_Shop } from "@/API/getlistvalue.js";
import { secondcard_open, secondcard_save } from "@/API/secondcard.js";
import { timeday, timetwoyearday } from "@/methods/time";
import { Goodsno_find } from "@/API/product";
import Second from "@/components/contscard/contscard_second";
// import {Select} from "ant-design-vue"
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
      data: [],
      project: "",
      value0: "",
      count: "",
      show: false,
      out_data: "",
      goo_price: "",
      data1: {},
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.show = true;
    },
    handleChange2(value) {
      this.billnotype = value;
    },
    onSubmit(values) {
      console.log(this.$route.params.cusid);
      values.subcom = this.reallsubcom;
      values.out_date = this.out_data;
      if (this.count == 0 || this.count == "") {
        Toast.fail("请输入正确的次数");
      } else if (this.project == "") {
        Toast.fail("请输入项目");
      } else if (this.billnotype == "") {
        Toast.fail("请输入单据类型");
      } else {
        values.goo_code = this.goo_code;
        console.log(values);
        values.cusid = this.$route.params.cusid;
        values.price = this.goo_price * this.count;

        var data = clean(values);
        this.data1 = data;
        this.show = true;
      }
      // else if (this.selfno == "") {
      //   Toast.fail("单号还未开好");
      // }

      // console.log("发送数据", data);

      // secondcard_save({ data: data }).then((res) => {
      //   console.log(res);
      // });
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
      this.project = this.data[value].goo_name;
      this.goo_code = this.data[value].goo_code;
      this.goo_price = this.data[value].goo_price;
      console.log(this.goo_price);
    },
    changeshow(Boolen) {
      this.show = Boolen;
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
    [Cell.name]: Cell,
    Second,
    // ASelect: Select,
    // ASelectOption: Select.Option,
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
    secondcard_open({}).then((res) => {
      console.log(res);
      this.selfno = res.table[0].selfno;
      this.out_data = res.table[0].out_date;
    });

    this.subcom = localStorage.getItem("subname");
    this.reallsubcom = localStorage.getItem("subcom");
    this.begindate = timeday();
    this.enddate = timetwoyearday();
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
.centercell {
  text-align: left;
  width: 90%;
  background-color: #fafafa;
  margin-left: 5%;
}
.check {
  color: #ff1493;
}
/deep/ .checktwo .van-field__label span {
  color: #ff1493;
}
</style>
