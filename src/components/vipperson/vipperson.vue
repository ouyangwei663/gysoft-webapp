<template>
  <div class="hello">
    <van-nav-bar class="check"
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

    <van-form @submit="onSubmit">
      <van-field  v-model="crashid" name="crashid" placeholder="请输入姓名">
        <template #label>
          <span>姓名</span>
        </template>
      </van-field>
      <van-field  v-model="phone" name="phone" placeholder="请输入手机号码">
        <template #label>
          <span>手机号码</span>
        </template>
      </van-field>

      <van-field  v-model="sex" name="sex" placeholder="请输入性别">
        <template #label>
          <span>性别</span>
        </template>
      </van-field>
      <van-field  v-model="shop" name="shop" placeholder="请输入店铺名">
        <template #label>
          <span>店铺</span>
        </template>
      </van-field>
      <van-field  v-model="card" name="card" placeholder="请输入卡号">
        <template #label>
          <span>卡号</span>
        </template>
      </van-field>
      <van-field  v-model="vipsex" name="vipsex" placeholder="普通卡">
        <template #label>
          <span>会员类型</span>
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

      <van-calendar v-model="showCalendar" :show-confirm="false" type="range" @confirm="onConfirm" />

      <van-field
        readonly
        clickable
        name="time"
        :value="time"
        label="有效期时间"
        placeholder="点击选择日期"
        @click="show = true"
      />

      <van-calendar v-model="show" :show-confirm="false" type="range" @confirm="onConfirm2" />

      <van-field
        readonly
        clickable
        name="picker"
        :value="sata"
        label="会员状态"
        placeholder="点击选择会员状态"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm3"
          @cancel="showPicker = false"
        />
      </van-popup>
      

      <van-button round block type="info" native-type="submit">查询会员资料</van-button>
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
      level: "1",
      twotme: "",
      date: "",
      showCalendar: false,
      show: false,
      sata:"",
       columns: ['状态1', '状态2', '状态3', '状态4', '状态5'],
      showPicker: false,
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
  },
  methods: {
    onSubmit(values) {
      let pam = {};
      for (let i in values) {
        if (values[i]) {
          pam[i] = values[i];
        }
      }
      console.log(pam);
      this.$router.push('/detailed')

    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },   onClickRight() {
      //   this.$sotre.commit('changesata')
       this.$router.push('/info')
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
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
    onConfirm3(value) {
      this.sata = value;
      this.showPicker = false;
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
/deep/ .check .van-nav-bar__text{
  color: white;
}
</style>
