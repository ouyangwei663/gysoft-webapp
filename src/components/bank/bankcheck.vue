<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="收银查询"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" class="checkroll">
      <van-field
        readonly
        clickable
        name="begindate"
        :value="begindate"
        label="开始时间"
        placeholder="点击选择开始日期"
        @click="showtime = true"
        class="checktwo"
      />
      <van-field
        readonly
        clickable
        name="enddate"
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
        name="havepay"
        label="付款状态"
        input-align="right"
        class="checktwo"
      >
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="Y">已付款</van-radio>
            <van-radio name="N">未付款</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="mobile" name="selfno" placeholder="请输入单号">
        <template #label>
          <span class="check">单号</span>
        </template>
      </van-field>
      <van-field v-model="card" name="cardno" placeholder="请输入卡号">
        <template #label>
          <span class="check">卡号</span>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="cus_type"
        :value="sata"
        label="卡类型"
        placeholder="点击选择卡类型"
        @click="showPicker = true"
        class="checktwo"
      />
      <van-field v-model="crashid" name="cus_name" placeholder="请输入会员名称">
        <template #label>
          <span class="check">会员名称</span>
        </template>
      </van-field>

      <van-field
        v-model="shougong"
        name="shougong"
        placeholder="请输入手工单号"
      >
        <template #label>
          <span class="check">手工单号</span>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="subcom"
        :value="viplevel"
        label="店铺名"
        placeholder="点击选择店铺"
        @click="showviplevel = true"
        class="checktwo"
      />
      <van-field v-model="memo" name="memo" placeholder="备注">
        <template #label>
          <span class="check">备注</span>
        </template>
      </van-field>

      <van-field
        v-model="firstemp"
        name="firstemp"
        placeholder=""
        label="员工"
        class="checktwo"
      >
        <template #input>
          <a-select
            label="员工"
            show-search
            option-filter-prop="children"
            style="width: 100%"
            @change="handleChange"
          >
            <a-select-option
              v-for="(d, index1) in workerselect"
              :key="index1"
              :value="d.no"
              >{{ d.name }}( {{ d.workname }})</a-select-option
            >
          </a-select>
        </template>
      </van-field>
      <van-field name="isorder" v-model="isorder" label="指名" class="checktwo">
        <template #input>
          <a-select style="width: 100%" @change="handleChange2">
            <a-select-option value="Y">指名</a-select-option>
            <a-select-option value="N">轮牌</a-select-option>
            <a-select-option value="A">全部</a-select-option>
          </a-select>
        </template>
      </van-field>
      <van-field
        label="最小金额"
        v-model="minmoney"
        name="minmoney"
        placeholder="输入最小金额"
        class="checktwo"
      />
      <van-field
        label="最大金额"
        v-model="maxmoney"
        name="maxmoney"
        placeholder="输入最大金额"
        class="checktwo"
      />
      <div class="guding" ref="container">
        <van-sticky :container="container">
          <van-button round block type="info" native-type="submit"
            >查询</van-button
          ></van-sticky
        >
      </div>
      <div class="height"></div>
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
  DatetimePicker,
} from "vant";
import { GetList_Shop, GetList_Hy ,GetList_Erp} from "@/API/getlistvalue.js";
// import { Select } from "ant-design-vue";
export default {
  data() {
    return {
      shougong: "", //手工单号
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
      showtime: false,
      showendtime: false,
      newvalues: [11, 22, 33, 44, 55],
      showPicker: false,
      currentDate: new Date(),
      minDate: new Date(2016, 0, 1),
      maxDate: new Date(2020, 9, 28),
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
      phonerule: /^1(3|4|5|6|7|8|9)\d{9}$/,
      bir: "", //shengri
      begindate: "",
      enddate: "",
      isorder: "",
      minmoney: "",
      maxmoney: "",
      workerselect: [],
      firstemp: "",
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
    [DatetimePicker.name]: DatetimePicker,
    // ASelect: Select,
    // ASelectOption: Select.Option,
  },
  created() {
    if (window.localStorage.getItem("subcom") !== "") {
      this.viplevelreally = window.localStorage.getItem("subcom");
      this.viplevel= window.localStorage.getItem("subname")
    }
    this.getpulldata();
    this.getvip();
    console.log(this.$route.params);
    this.begindate = this.$route.params.begindate;
    this.enddate = this.$route.params.enddate;

    if (sessionStorage.getItem("getlist_erp") == null) {
      GetList_Erp({}).then((res) => {
        this.workerselect = res.table;
        sessionStorage.setItem(
          "getlist_erp",
          JSON.stringify(this.workerselect)
        );
      });
    } else {
      this.workerselect = JSON.parse(sessionStorage.getItem("getlist_erp"));
    }
  },

  methods: {
    onSubmit(values) {
      var pam = {};
      if (values.subcom != "") {
        values.subcom = this.viplevelreally;
      }
      if (values.cus_type != "") {
        values.cus_type = this.satareall;
      }
      for (let i in values) {
        if (values[i]) {
          pam[i] = values[i];
        }
      }

      var params = pam;
      this.$router.push({
        name: "bank",
        params,
      });
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
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
      GetList_Shop({}).then((res) => {
        that.columns2 = res.table.map(function (item) {
          return item.name;
        });
        that.columns22 = res.table.map(function (item) {
          return item.no;
        });
      });
    },
    handleChange(value) {
      console.log(value);
      this.firstemp = value;
    },
    getvip() {
      var that = this;
      GetList_Hy({}).then((res) => {
        that.columns = res.table.map(function (item) {
          return item.name;
        });
        that.columns1 = res.table.map(function (item) {
          return item.no;
        });
      });
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
    handleChange2(value) {
      this.isorder = value;
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
  bottom: 5vh;
}
.checkroll {
  height: 130vh;
}
.height {
  height: 10vh;
}
.check {
  color: #0f09af;
}
/deep/ .checktwo .van-field__label span {
  color: #0f09af;
}
</style>
