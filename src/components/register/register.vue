<template>
  <div id="big">
    <h2>欢迎注册</h2>
    <h6>请认真填写以下内容，谢谢！</h6>
    <van-nav-bar title="注册账号" :fixed="true" :left-arrow="true" >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="persopn"
        label="账号"
        placeholder="用户名/手机号"
        :rules="[{ required: true, message: '请填写用户名/手机号' }]"
      />
      <van-field
        v-model="person"
        name="persopn"
        label="联系人"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="shop"
        name="shop"
        label="店铺名"
        placeholder="请输入店铺名"
        :rules="[{ required: true, message: '请输入店铺名' }]"
      />
      <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>

      <van-field v-model="sms" name="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" round plain type="info">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Icon, Form, Field, Button, Image, Popup } from "vant";
export default {
  data() {
    return {
      username: "",
      person: "",
      shop: "",
      yanzheng: "",
      sms: "",
      yyy: require("../../../static/yyy.png"),
      value: "",
      showArea: false,
      areaList: {}, // 数据格式见 Area 组件文档
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Image.name]: Image,
    [Popup.name]: Popup,
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirm(values) {
      this.value = values.map((item) => item.name).join("/");
      this.showArea = false;
    },
    mounted() {
    },
  },
};
</script>
<style scoped>
h2 {
 
  text-align: left;
  margin-left: 5%;
}
h6 {
  margin-top: 0;
  text-align: left;
  margin-left: 5%;
}
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-form {
  width: 90%;
  margin-left: 5%;
}
.van-field {
  background-color: white;
}
#big {
  height: 90vh;
  background-color: #f3f3f3;
}
</style>