<template>
  <div>
    <van-nav-bar
      title="找回密码"
      :fixed="true"
      left-text="返回"
      right-text="按钮"
      :left-arrow="true"

    >
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
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="输入密码"
        :rules="[{ required: true, message: '请输入新的密码' }]"
      />
      <van-field
        v-model="secondpassword"
        type="password"
        name="密码"
        label="确认密码"
        placeholder="请输入新的密码"
        :rules="[{ required: true, message: '请再次输入新的密码' }]"
      />
      <van-field v-model="yanzheng" name="yanzhengma" center clearable label="验证码" placeholder="请输入验证码">
        <div slot="button">
          <van-image :src="yyy" />
        </div>
      </van-field>
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
import { NavBar, Icon, Form, Field, Button, Image } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      secondpassword: "",
      yanzheng: "",
      sms: "",
      yyy: require("../../../static/yyy.png"),
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Image.name]: Image,
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>
<style scoped>
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
</style>