<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="员工查询"
      :fixed="true"
      right-text="员工录入"
      :left-arrow="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" class="bankaddform">
      <van-field v-model="name" name="empname" label="姓名" class="checktwo" />
      <van-field v-model="phone" name="phone" label="手机号" class="checktwo" />
      <van-field
        readonly
        clickable
        name="subcom"
        :value="subcom"
        label="分店"
        placeholder="点击选择店铺"
        @click="showviplevel = true"
        class="checktwo"
      />
      <van-field
        name="worktype1"
        :value="billnotype"
        label="工种"
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
      <van-collapse v-model="activeNames" class="banktimecenter">
        <van-collapse-item name="1" left>
          <template #title> 高级 </template>
          <van-cell
            title="入职时间"
            is-link
            :value="begindate"
            @click="showtime = true"
          />
          <van-cell
            title="离职时间"
            is-link
            :value="enddate"
            @click="showendtime = true"
          />
          <van-field v-model="empgroup" name="empgroup" label="分组编码" />
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
        </van-collapse-item>
      </van-collapse>

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
  Collapse,
  CollapseItem,
  Picker,
  DatetimePicker,
  Cell,
} from "vant";
import { Product_type } from "@/API/product";
import { clean } from "@/methods/clean";
import { GetList_Shop } from "@/API/getlistvalue.js";
import { timeday, timetwoyearday } from "@/methods/time";
import {Select} from "ant-design-vue"
// import { Select } from "ant-design-vue";
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
      name: "",
      activeNames: [],
      phone: "",
      empgroup: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "worker_push",
      });
    },
    handleChange2(value) {
      this.billnotype = value;
    },
    onSubmit(values) {
      values.subcom = this.reallsubcom;

      var pams = clean(values);
      console.log("员工查询条件", pams);

      var params = pams;
      this.$router.push({
        name: "worker_info",
        params,
      });
    },
    onConfirm4(value, index) {
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
    [Popup.name]: Popup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    ASelect: Select,
    ASelectOption: Select.Option,
    // ASelect: Select,
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
/deep/ .van-nav-bar__text {
  color: white;
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
.check {
  color: #0f09af;
}
/deep/ .checktwo .van-field__label span {
  color: #0f09af;
}
</style>
