<template>
  <div class="hello">
    <van-nav-bar
      title="访客登记"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="value"
      show-action
      label="卡号"
      placeholder="请输入卡号"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">查询</div>
      </template>
    </van-search>
    <van-cell title="号主信息" left>
      <template #label>
        <table class="bankadd">
          <tr>
            <td>顾客名称：愤怒的张三</td>
            <td>性别：dp111111746</td>
          </tr>
          <tr>
            <td>开卡店：东平店</td>
            <td>会员级别：VIP龙腾卡</td>
          </tr>
        </table>
      </template>
    </van-cell>
    <van-divider>请填写资料</van-divider>
    <van-form @submit="onSubmit" class="bankaddform">
      <van-field
        v-model="username"
        name="selfinfo"
        label="手工单号"
        placeholder="请输入手工单号"
      />
      <van-field name="radio" label="是否指名">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="memo"
        name="memo"
        label="备注"
        placeholder="请填写备注"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
    <van-cell
      class="bankaddcenter"
      title="添加项目"
      is-link
      icon="shop-o"
      @click="show = true"
    />
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <van-card
        v-for="(item, index) in addList"
        :key="index"
        class="addcard"
        num="1"
        price="2.00"
        :title="item.project"
        origin-price="10.00"
      >
        <template #desc>
          <p>员工信息</p>
          工种： 员工：{{ item.person }} 业绩：
        </template>
        <template #footer>
          <van-button size="mini" @click="addbankdelet(index)">删除</van-button>
        </template>
      </van-card>

      <van-button
        round
        class="bankaddbottom"
        type="danger"
        @click="secondshow = true"
      >
        添加新项目</van-button
      >
      <van-button
        round
        class="bankaddbottom2"
        @click="show = false"
        size="mini"
      >
        返回</van-button
      >
      <van-popup
        v-model="secondshow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-search
          v-model="value"
          show-action
          label="项目"
          placeholder="请输入项目"
          @search="onSearch2"
        >
          <template #action>
            <div @click="onSearch2">查询</div>
          </template>
        </van-search>
        <van-form @submit="onSubmit2">
          <van-field
            v-model="project"
            name="project"
            label="项目"
            placeholder="请输入项目"
            readonly
          />
          <van-field
            v-model="person"
            name="person"
            label="员工"
            placeholder="请输入员工"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit2">
              提交
            </van-button>
          </div>
        </van-form>
        <table class="bankaddtable">
          <td>名称</td>
          <td>品种编码</td>
          <td>销售定价</td>
          <tr v-for="(item, index) in List" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.money }}</td>
            <td>
              <van-button
                round
                type="primary"
                size="mini"
                @click="addproject(item.name)"
                >添加</van-button
              >
            </td>
          </tr>
        </table>
      </van-popup>
    </van-popup>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  Cell,
  Step,
  Steps,
  Search,
  Form,
  Field,
  Button,
  Radio,
  RadioGroup,
  Divider,
  Popup,
  Card,
  Dialog,
} from "vant";
import contact from "./contact";
export default {
  data() {
    return {
      active: 0,
      value: "",
      username: "",
      password: "",
      memo: "",
      radio: "",
      show: false,
      secondshow: false,
      project: "",
      person: "",
      List: [
        // { name: "洗头发", id: 100, money: 1000 },
        // { name: "吹头发", id: 101, money: 1001 },
        // { name: "剪头发", id: 102, money: 1002 },
      ],
      addList: [],
    };
  },
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Search.name]: Search,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Divider.name]: Divider,
    [Popup.name]: Popup,
    [Card.name]: Card,
    [Dialog.name]: Dialog,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch(val) {
      alert("查询" + this.value);
    },
    onSearch2(val) {
      this.List = [
        { name: "洗头发", id: 100, money: 1000 },
        { name: "吹头发", id: 101, money: 1001 },
        { name: "剪头发", id: 102, money: 1002 },
      ];
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onSubmit2(values) {
      if (values.project == "") {
        this.$toast.fail("项目不能为空");
      } else {
        console.log(values);
        this.addList.push(values);
        this.List = [];
        this.secondshow = false;
        this.project = "";
        this.person = "";
      }
    },
    addproject(name) {
      this.project = name;
    },
    addbankdelet(index) {
      Dialog.confirm({
        title: "删除所选项目",
        message: "确定删除所选项目吗",
      })
        .then(() => {
          this.addList.splice(index, 1);
        })
        .catch(() => {
          // on cancel
        });
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
.bankadd {
  width: 90%;
  margin-left: 5%;
}
.bankadd td {
  text-align: left;
}
.bankaddform {
  width: 90%;
  margin-left: 5%;
}
.bankaddcenter {
  width: 90%;
  margin-left: 5%;
}
.bankaddbottom {
  position: fixed;
  left: 5%;
  width: 90%;
  bottom: 2vh;
}
.bankaddbottom2 {
  position: fixed;
  right: 1vh;
}
.bankaddtable {
  border-radius: 0.3rem;
  width: 90%;
  font-size: 0.7rem;
  margin-left: 5%;
  color: white;
  background-color: #157aff;
}
.addcard {
  width: 90%;
  margin-left: 5%;
  text-align: left;
}
.addcard .van-card__title {
  margin-top: 1vh;
  font-size: 1rem;
}
.addcard .van-card__bottom {
  margin-top: 3vh;
}
</style>