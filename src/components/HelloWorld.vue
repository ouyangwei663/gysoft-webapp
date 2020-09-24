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
        name="crashid"
        placeholder="请输入姓名"
        :required="true"
      >
        <template #label>
          <span>名称</span>
        </template>
      </van-field>
      <van-field
        v-model="phone"
        name="phone"
        placeholder="1365323"
        :required="true"
      >
        <template #label>
          <span>手机号码</span>
        </template>
      </van-field>

      <van-field name="sex" label="性别" input-align="right" :required="true">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="shop"
        name="shop"
        placeholder="请输入店铺名"
        :required="true"
      >
        <template #label>
          <span>所属分店</span>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="会员级别"
        placeholder="点击选择会员级别"
        @click="showPicker = true"
        :required="true"
      />
      <van-popup v-model="showPicker" position="bottom" :required="true">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field v-model="card" name="card" placeholder="可以为空">
        <template #label>
          <span>卡号</span>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="timepicker"
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
        />
      </van-popup>
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="*****"
      >
        <template #label>
          <span>密码</span>
        </template>
      </van-field>
      <van-field name="radio" label="状态" input-align="right">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">有卡状态</van-radio>
            <van-radio name="2">无卡状态</van-radio>
          </van-radio-group>
        </template>
      </van-field>

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
export default {
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
      console.log("submit", values);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
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
