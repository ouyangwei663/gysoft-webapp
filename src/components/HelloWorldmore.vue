<template>
  <div>
    <van-nav-bar
      title="会员高级修改"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" class="moreinfo">
      <van-field v-model="cus_name" name="cus_name" label="用户名" />
      <van-field v-model="memo" name="memo" label="备注" />
      <van-field v-model="comname" name="comname" label="公司" />
      <van-field v-model="worktype" name="worktype" label="职业" />
      <van-field v-model="idcard" name="idcard" label="身份证" />

      <van-field v-model="address" name="address" label="地址" />
      <van-field name="istemp" label="是否有卡">
        <template #input>
          <van-radio-group v-model="istemp" direction="horizontal">
            <van-radio name="Y">有卡</van-radio>
            <van-radio name="N">无卡</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="needpost" label="短信接收账单">
        <template #input>
          <van-radio-group v-model="needpost" direction="horizontal">
            <van-radio name="Y">是</van-radio>
            <van-radio name="N">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="first_date"
        name="first_date"
        label="首次到店"
        disabled
      />
      <van-field
        v-model="last_date"
        name="last_date"
        label="最后到店"
        disabled
      />
      <van-field
        v-model="effecttime"
        name="effecttime"
        label="有效期"
        disabled
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  Form,
  Field,
  Button,
  Cell,
  Radio,
  RadioGroup,
  Dialog,
} from "vant";
import { Customer_save } from "@/API/customer";
export default {
  data() {
    return {
      username: "",
      password: "",
      cus_name: "", //用户名
      memo: "", //备注
      comname: "", //公司
      first_date: "", //首次到店时间
      last_date: "", //最后到店时间
      worktype: "", //职业
      idcard: "", //身份证
      bank: "", //银行
      bankno: "", //银行卡号
      address: "", //地址
      effecttime: "", //有效日期
      istemp: "", //是否有卡顾客
      needpost: "", //短信接收信息
      info: "", // 读取的个人信息
    };
  },
  created() {
    this.info = this.$route.params;
    console.log("资料", this.info);
    //  console.log('职业',this.info.worktype);
    this.cus_name = this.info.cus_name;
    this.memo = this.info.memo;
    this.comname = this.info.comname;
    this.first_date = this.info.first_date;
    this.last_date = this.info.last_date;
    this.worktype = this.info.worktype;
    this.idcard = this.info.idcard;
    this.bank = this.info.bank;
    this.bankno = this.info.bankno;
    this.address = this.info.address;
    this.effecttime = this.info.effecttime;
    this.istemp = this.info.istemp;
    this.needpost = this.info.needpost;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      var that = this;
      var pamns = that.info; //这是初始数据

      let pam = {};
      let really = {};
      let old = {};

      for (let i in values) {
        if (values[i]) {
          pam[i] = values[i];
        }
      }
      console.log(pamns);
      for (let i in pam) {
        if (pam[i] != pamns[i]) {
          really[i] = pam[i];
          old[i] = pamns[i];
        }
      }

      console.log(old, really);
      var last = {};
      last.cusid = that.$route.params.cusid;
      last.data = really;
      last.old = old;
      if (this.$route.params.cusid) {
      } else {
        var newobj = old;
        for (let i in old) {
          if (old[i]) {
          } else {
            newobj[i] = null;
          }
        }
        last.old = newobj;
        console.log(newobj);
      }
      var arr = Object.keys(really);
      if (arr.length == 0) {
        Dialog.alert({ message: "没有修改数据" });
      } else {
        Customer_save(last).then((res) => {
          console.log(res.table[0]);
          Dialog.alert({
            title: "保存成功",
            message: res.table[0].hintstr,
          }).then(() => {
            console.log(res.table[0].cusid);
            var params = {};
            params.cusid = res.table[0].cusid;

            //跳转节点
          });
        });
      }
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Dialog.name]: Dialog,
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
.moreinfo {
  width: 90%;
  margin-left: 5%;
}
</style>