<template>
  <div class="hello">
    <van-nav-bar
      title="来客登记"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <table class="banktoptable">
      <tr>
        <td class="diyi">查找会员</td>
        <td class="dier">
          <a-select
            class="banksearch"
            show-search
            showArrow
            :value="value"
            placeholder="Tags Mode"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select-option
              v-for="(d, index) in data"
              :key="index"
              class="banktoselect"
            >
              {{ d.cus_name }} 余额：{{ d.lastmoney }} 手机号:{{
                d.mobile
              }}
              性别：{{ d.sex }}
            </a-select-option>
          </a-select>
        </td>
      </tr>
    </table>

    <van-cell title="会员信息" left>
      <template #label>
        <table class="bankadd">
          <tr>
            <td>顾客名称：{{ cus_name }}</td>
            <td>性别：{{ sex }}</td>
          </tr>
          <tr>
            <td>开卡店:{{ subcom }}</td>
            <td>会员级别：VIP龙腾卡</td>
          </tr>
          <tr>
            <td class="red">余额:{{ lastmoney }}</td>
            <td class="red">赠送余额：{{ givehavemoney }}</td>
          </tr>
        </table>
      </template>
    </van-cell>
    <van-divider>请填写资料</van-divider>
    <van-form @submit="onSubmit" class="bankaddform">
      <van-field
        v-model="selfno"
        name="selfno"
        label="手工单号"
        placeholder="请输入手工单号"
        disabled
      />
      <van-field name="oneisorder" label="是否指名">
        <template #input>
          <van-radio-group v-model="oneisorder" direction="horizontal">
            <van-radio name="Y">是</van-radio>
            <van-radio name="N">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="memo"
        name="memo"
        label="备注"
        placeholder="请填写备注"
      />
      <van-field
        name="firstemp"
        :value="firstemp"
        label="员工"
        placeholder="点击选择员工"
        ><template #input>
          <a-select
            show-search
            placeholder="Select a person"
            option-filter-prop="children"
            style="width: 100%"
            :filter-option="filterOption1"
            @focus="handleFocus1"
            @blur="handleBlur1"
            @change="handleChange1"
          >
            <a-select-option
              v-for="(item, index) in workerselect"
              :key="index"
              :value="item.no"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </template>
      </van-field>
      <van-field name="billsex" label="会员性别">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="Y">男</van-radio>
            <van-radio name="N">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="billtype" :value="billtype" label="单据类型"
        ><template #input>
          <a-select
            show-search
            placeholder="Select a type"
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          下一步
        </van-button>
      </div>
    </van-form>
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
        @click="(secondshow = true), (isproject = true)"
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
            name="firstemp"
            :value="firstemp"
            label="员工"
            placeholder="点击选择员工"
            ><template #input>
              <a-select
                show-search
                placeholder="Select a person"
                option-filter-prop="children"
                style="width: 100%"
                :filter-option="filterOption1"
                @focus="handleFocus1"
                @blur="handleBlur1"
                @change="handleChange1"
              >
                <a-select-option
                  v-for="(item, index) in workerselect"
                  :key="index"
                  :value="item.no"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit2">
              提交
            </van-button>
          </div>
        </van-form>
        <table v-if="isproject" class="bankaddtable">
          <td>名称</td>
          <td>品种编码</td>
          <td>销售定价</td>
          <tr v-for="(item, index) in List" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.no }}</td>
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
        <table v-if="isproject" class="bankaddtable addbottom">
          <tr>
            <td colspan="4">历史消费记录</td>
          </tr>
          <td>名称</td>
          <td>品种编码</td>
          <td>销售定价</td>
          <tr v-for="(item, index) in Listhistory" :key="index">
            <td>{{ item.goo_name }}</td>
            <td>{{ item.goods_code }}</td>
            <td>{{ item.price }}</td>
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
        <table v-if="worker" class="bankaddtable addbottom worker">
          <tr>
            <td colspan="4">员工列表</td>
          </tr>
          <td>姓名</td>
          <td>编号</td>
          <td>工种</td>
          <tr v-for="(item, index) in Listwork" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.type }}</td>
            <td>
              <van-button
                round
                type="primary"
                size="mini"
                @click="addworker(item.name)"
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
  DropdownMenu,
  DropdownItem,
  Picker,
  Toast,
} from "vant";
import contact from "./contact";
import DropList from "vue-droplist";
import { GetList_Erp } from "@/API/getlistvalue";
import { OutOne_open, OutOne_save } from "@/API/outone.js";
import { getshop } from "@/methods/getshop";
import { Customer_find } from "@/API/customer";
import { Product_history, Product_type } from "@/API/product";
import { clean } from "@/methods/clean";
export default {
  data() {
    return {
      empty: "",
      active: 0,
      value: "",
      selfno: "",
      password: "",
      memo: "",
      oneisorder: "",
      show: false,
      secondshow: false,
      project: "",
      person: "",
      worker: false, //是否显示员工
      isproject: true,
      List: [
        // { name: "洗头发", id: 100, money: 1000 },
        // { name: "吹头发", id: 101, money: 1001 },
        // { name: "剪头发", id: 102, money: 1002 },
      ],

      Listhistory: [
        { name: "洗头发1", id: 1001, money: 10001 },
        { name: "吹头发2", id: 1011, money: 10011 },
        { name: "剪头发3", id: 1021, money: 10021 },
      ],
      Listwork: [
        { name: "张三", id: 100, type: "助理" },
        { name: "李四", id: 1001, type: "技师" },
        { name: "王五", id: 1003, type: "助理" },
        { name: "赵六", id: 1002, type: "技师" },
      ],
      data: [],
      cus_name: "",
      sex: "",
      subcom: "",
      subno: "",
      datetime: "",
      workerselect: {},
      addList: [],
      lastmoney: "",
      givehavemoney: "",
      firstemp: "",
      columns: ["张三", "李四", "温州", "嘉兴", "湖州"],
      showPicker: false,
      cusid: "",
      selectworker: [], //员工表
      product_type: [],
      billtype: "",
      radio: "",
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
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
  },
  created() {
    if (sessionStorage.getItem("product_type") == null) {
      Product_type({}).then((res) => {
        this.product_type = res.table;
        sessionStorage.setItem(
          "product_type",
          JSON.stringify(this.product_type)
        );
        console.log(res.table);
      });
    } else {
      this.product_type = JSON.parse(sessionStorage.getItem("product_type"));
    }

    if (sessionStorage.getItem("getlist_erp") == null) {
      GetList_Erp({}).then((res) => {
        this.workerselect = res.table;
        sessionStorage.setItem(
          "getlist_erp",
          JSON.stringify(this.workerselect)
        );
        console.log(res.table);
      });
    } else {
      this.workerselect = JSON.parse(sessionStorage.getItem("getlist_erp"));
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch(val) {
      this.$refs.droplist.show();
    },
    onSearch2(val) {
      this.isproject = true;
      this.List = [
        { name: "洗头发", id: 100, money: 1000 },
        { name: "吹头发", id: 101, money: 1001 },
        { name: "剪头发", id: 102, money: 1002 },
      ];
    },
    onSubmit(values) {
      this.$router.push({
        name: "qindan",
      });

      // var that = this;
      // values.sex = this.sex;
      // values.subcom = this.subno;
      // values.givehavemoney = this.givehavemoney;
      // values.out_date = this.datetime;
      // if (values.out_date == "") {
      //   Toast.fail("请选择用户");
      // } else if (this.firstemp == "") {
      //   Toast.fail("请选择员工");
      // } else {
      //   var pams = clean(values);

      //   var pam = {};
      //   pam.cusid = this.cusid;
      //   pam.data = pams;

      //   OutOne_save(pam).then((res) => {
      //     if (res.errmsg == "OK") {
      //       this.show = true;

      //       Product_history({ cusid: "146DK::UB+L+&#!A" }).then((res) => {
      //         console.log(res.table);
      //         this.$router.push({
      //           name: "qindan",

      //         });
      //       });
      //     }
      //   });
      // }
    },
    onConfirm(value) {
      this.firstemp = value;
      this.showPicker = false;
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
      this.isproject = false;
      this.worker = true;
    },
    addworker(name) {
      this.person = name;
      this.worker = false;
    },
    addbankdelet(index) {
      Dialog.confirm({
        title: "删除所选项目",
        message: "确定删除所选项目吗",
      })
        .then(() => {
          this.addList.splice(index, 1);
        })
        .catch(() => {});
    },
    handleSearch(value) {
      var that = this;
      console.log(value);
      var pam = {};
      // pam.card = value;
      pam.card = value;
      if (value) {
        Customer_find(pam).then((res) => {
          console.log(res);
          that.data = res.table;
        });
      }
    },
    handleChange(value) {
      var that = this;
      this.cus_name = this.data[value].cus_name;
      this.sex = this.data[value].sex;
      this.subno = this.data[value].subcom;
      this.subcom = getshop(this.data[value].subcom);
      this.lastmoney = this.data[value].lastmoney;
      this.givehavemoney = this.data[value].givehavemoney;
      this.cusid = this.data[value].cusid;
      console.log(this.cusid);

      OutOne_open({ subcom: that.subno }).then((res) => {
        this.selfno = res.table[0].selfno;
        this.datetime = res.table[0].out_date;
      });
    },
    handleChange1(value) {
      this.firstemp = value;
      console.log(`selected ${value}`);
    },
    handleChange2(value) {
      console.log(`selected ${value}`);
    },
    handleBlur1() {},
    handleFocus1() {},
    filterOption1(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange3(value) {
      console.log(`selected ${value}`);
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
.addbottom {
  margin-top: 3vh;
  background-color: #25d07a;
}
.worker {
  background-color: #f7416c;
}
.banktoptable {
  width: 90%;
  margin-left: 5%;
}
.banktoptable .diyi {
  width: 20%;
}
.banktoptable .dier {
  width: 80%;
}
.banktoptable .dier .banksearch {
  width: 100%;
}
.banktoselect {
  width: 100%;
  background-color: #25d07a;
}
.red {
  color: #f7416c;
}
/deep/.ant-select-search {
  z-index: 10000000000;
}
</style>