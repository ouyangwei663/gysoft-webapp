<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="员工录入"
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
        v-model="name"
        name="empName"
        label="姓名"
        placeholder="请输入员工姓名"
        class="checktwo"
      />
      <van-field
        v-model="secondname"
        name="englishname"
        label="别名"
        placeholder="请输入员工别名"
      />
      <van-field name="worktype1" label="工种" class="colordanger checktwo"
        ><template #input>
          <a-select
            v-model="worktype1"
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
      <van-field
        readonly
        clickable
        name="enterDate"
        :value="begindate"
        label="入职时间"
        placeholder="点击选择开始日期"
        @click="showtime = true"
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

      <van-popup v-model="showviplevel" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm4"
          @cancel="showviplevel = false"
        />
      </van-popup>
      <div style="margin: 16px">
        <van-button round type="info" native-type="submit"> 保存 </van-button>

        <van-button
          v-if="showmore"
          round
          type="danger"
          native-type="submit"
          @click="tomore"
        >
          更多
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
import { timeday, timetwoyearday, time } from "@/methods/time";
import { work_save } from "@/API/work.js";
import worker_completeVue from "./worker_complete.vue";
// import { Select } from "ant-design-vue";
export default {
  name: "Info",
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
      secondname: "",
      phone: "",
      olddate: {},
      diffData: null,
      showmore: false,
      worktype1: "",
    };
  },
  methods: {
    tomore() {
      var params =this.$route.params
      this.$router.push({
        name: "worker_complete",
        params,
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    handleChange2(value) {
      this.worktype1 = value;
    },

    onSubmit(values) {
      values.worktype1 = this.worktype1;
      if (this.$route.params.empId) {
        var last = {};
        last.empId = this.$route.params.empId;
        last.old = {};
        last.data = {};
        console.log(values);
        var newlist = values;
        var old = this.olddate;
        if (this.$route.params.empId) {
          for (let k in old) {
            if (old[k] !== values[k]) {
              last.old[k] = old[k];
              last.data[k] = values[k];
            }
          }
        }
        var arr = Object.keys(last.data);
        if (arr.length == "0") {
          Toast.fail("数据没有改变");
        } else {
          console.log("提交的修改数据", last.data);
          work_save(last).then((res) => {
            Dialog.alert({
              title: "保存成功",
              message: res.table[0].hintstr,
            });
            console.log(res);
          });
        }
      } else {
        if (values.empName == "") {
          Toast.fail("姓名不能为空");
        } else if (values.englishname == "") {
          Toast.fail("别名不能为空");
        } else if (values.enterDate == "") {
          Toast.fail("入职时间不能为空");
        }
        var pam = clean(values);
        var pamms = {};
        pamms.data = pam;

        work_save(pamms).then((res) => {
          console.log(res);
          Dialog.alert({
            title: "保存成功",
            message: res.table[0].hintstr,
          });
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
    // ASelect: Select,
    // ASelectOption: Select.Option,
  },
  created() {
    this.product_type = JSON.parse(sessionStorage.getItem("work_type"));

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
    this.begindate = timeday();

    if (this.$route.params.empId) {
      this.showmore = true;
      this.selfno = this.$route.params.emp_no;
      this.name = this.$route.params.empName;
      this.secondname = this.$route.params.englishname;
      this.begindate = time(this.$route.params.enterDate);
      this.worktype1 = this.$route.params.worktype1;
      this.olddate = {
        empName: this.$route.params.empName,
        englishname: this.$route.params.englishname,
        enterDate: this.$route.params.enterDate,
        worktype1: this.$route.params.worktype1,
      };
    }
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    if (to.path === "/worker_info") {
      // 这是路由path

      this.$store.commit("deletKeepAlive", "Info"); //这是此页面的name属性名字
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
  color: #ff1493;
}
/deep/ .checktwo .van-field__label span {
  color: #ff1493;
}
</style>
