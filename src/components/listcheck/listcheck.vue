<template>
  <div class="hello">
    <van-nav-bar
      title="收银查询"
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
        readonly
        clickable
        :value="aa"
        name="datetimePicker"
        label="开始"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          title="选择年月日"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-button round block type="info" native-type="submit"
        >收银查询</van-button
      >
    </van-form>

    <!-- <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="show"
    /> -->
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
      aa: "",
      value: "",
      showPicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date().toISOString().slice(0,10),
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
    onConfirm() {
      console.log(this.currentDate)
      this.aa=this.currentDate.getFullYear()+'-'+ (this.currentDate.getMonth()+1) +'-' +this.currentDate.getDate()
  

    },
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    // show(){
    //   console.log(this.currentDate.toISOString().slice(0,10))
    // }
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
