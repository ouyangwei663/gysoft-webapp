<template>
  <div id="app">
    <van-nav-bar
      title="赠送项目"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit2">
      <van-field v-model="project" name="project" label="项目">
        <template #input>
          <a-select
            style="width: 70%"
            show-search
            showArrow
            :value="value0"
            placeholder="Tags Mode"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch0"
            @change="handleChange0"
          >
            <a-select-option
              style="width: 200%"
              v-for="(d, index) in data"
              :key="index"
              class="banktoselect"
              >{{ d.goo_name }} {{ d.goo_price }}</a-select-option
            >
          </a-select>
          <!-- <a-input-number     style="width: 30%"  :min="0" :max="10" :step="0.1" @change="onChange11" /> -->
        </template>
      </van-field>
      <van-field v-model="num" name="num" label="数量">
        <template #input>
          <a-input-number
            v-model="num"
            style="width: 30%"
            :default-value="1"
            :min="0.1"
            :max="10"
            :step="1"
            @change="onChange11"
          />
        </template>
      </van-field>


      <label class="left" for>员工</label>
      <div>
        <div
          class="right"
          v-for="(item, index) in newlist"
          :key="index"
          label="员工"
        >
          <a-select
            label="员工"
            show-search
            :value="newlist[index].name"
       
            option-filter-prop="children"
            style="width: 50%"
            @change="handleChange"
          >
            <a-select-option
              v-for="(d, index1) in workerselect"
              :key="index1"
              :value="d.no"
              @click="numbername(index)"
              >{{ d.name }}( {{ d.workname }})</a-select-option
            >
          </a-select>
          <a-select
            style="width: 30%"
            @change="handleChange5"
            :value="newlist[index].isorder"
          >
            <a-select-option @click="numbername5(index)" value="Y"
              >指名</a-select-option
            >
            <a-select-option @click="numbername5(index)" value="N"
              >轮牌</a-select-option
            >
          </a-select>
          <a-button type="dashed" @click="delet(index)">
            <a-icon type="minus-circle-o" />
          </a-button>
        </div>
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus" />添加员工
        </a-button>
      </div>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit2">{{
          ischange ? "修改" : "保存"
        }}</van-button>
      </div>
    </van-form>
    <!-- <button @click="add">添加</button> -->
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
    <!-- <table class="bankaddtable addbottom addthis">
      <tr>
        <td colspan="4">此次记录</td>
      </tr>
      <tr>
        <td>品种名称</td>
        <td>人员</td>
        <td>价格</td>
      </tr>
      <tr
        v-for="(item, index) in dataList"
        :key="index"
        :class="index % 2 == 0 ? 'addlist' : 'addlist2'"
      >
        <td>{{ item.goo_name }}</td>
        <td>{{ item.empname }}</td>
        <td>{{ item.price }}</td>

        <td>
          <van-button
            round
            type="danger"
            size="mini"
            @click="deletproject(item)"
            >删除</van-button
          >
        </td>
        <td>
          <van-button round type="primary" size="mini" @click="addproject(item)"
            >修改</van-button
          >
        </td>
      </tr>
    </table> -->
    <van-cell
      :title="item.goo_name"
      :class="index % 2 == 0 ? 'groupcontact' : 'groupcontact2'"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <template #label>
        员工：{{ item.empname }}
        <van-button
          :type="index % 2 == 0 ? 'info' : 'primary'"
          size="mini"
          class="fr"
          icon="edit"
          @click="addproject(item)"
          >修改</van-button
        ><br /><br />
        价格:{{ item.price }} &nbsp;&nbsp;&nbsp;&nbsp; 折扣：{{
          item.discount == null ? "100" : "item.discount"
        }}
        &nbsp;&nbsp;&nbsp;&nbsp; 实价：{{ item.price }} &nbsp;&nbsp; 数量：{{
          item.num
        }}
        <van-button
          type="danger"
          size="mini"
          @click="deletproject(item)"
          icon="cross"
          class="fr"
          >删除</van-button
        >
      </template>
    </van-cell>
  </div>
</template>
<script>
import {
  Form,
  Field,
  Button,
  Icon,
  Cell,
  Toast,
  Popup,
  NavBar,
  SubmitBar,
  Checkbox,
  Radio,
  RadioGroup,
  CellGroup,
  Dialog,
} from "vant";
import {
  Product_history,
  Goodsno_find,
  Product_discount,
  Product_save,
  Product_delet,
  Product_open,
  Product_emp,
  Product_pay,
} from "@/API/product";
import { clean } from "@/methods/clean";
import { GetList_Erp } from "@/API/getlistvalue";
export default {
  data() {
    return {
      num: "1",
      newlist: [{}],
      goo_code: "",
      List: [],
      show: false,
      Listhistory: [],
      Listwork: [],
      project: "",
      firstemp: "",
      workerlist: [],
      workerlistname: [],
      isproject: false,
      worker: [{}],
      workerselect: [],
      workername: "",
      value: undefined,
      value0: undefined,
      data: [],
      dataList: [],
      ischange: false,
      index: 1,
      project2: "",
      indexname: "",
      goo_price: "",
      discount: "100",
      reallyprice: "",
      historyshow: true,
      out_no: "",
      show: false,
      name: "大头玛歌香薰理疗护理单次",
      message: false,
      pay: "",
      allprice: 0,
      text: "",
      money: "",
      givemoney: "",
      weixin: "",
      alipay: "",
      otherpay: "",
      needsendsms: true,
      disable: false,
      isloading: false,
    };
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    add() {
      this.newlist.push({});
    },
    delet(index) {
      this.newlist.splice(index, 1);
    },
    onSubmit3() {},
    onSubmit2() {
      if (this.ischange == false) {
        var that = this;
        var pam = {};
        if (this.project == "") {
          Toast.fail("请添加项目");
        } else {
          var data = {};
          for (var i = 0; i < this.newlist.length; i++) {
            if (this.newlist[i].emp) {
              var name = "emp" + (i + 1);

              var value = this.newlist[i].emp;
              data[name] = value;
            }
          }
          for (var i = 0; i < this.newlist.length; i++) {
            if (this.newlist[i].name) {
              var name = "isorder" + (i + 1);

              var value = this.newlist[i].isorder;
              data[name] = value;
            }
          }
          data.goo_code = this.goo_code;
          data.out_no = that.$route.params.out_no;
          data.num = this.num;
          data.price = this.reallyprice;
          data.goo_price = this.goo_price;
          data.discount = this.discount;
          var pamn = {};
          pamn.data = data;

        //   Product_save(pamn).then((res) => {
        //     console.log("保存/修改项目", res);
        //     this.dataList = res.table;

        //     var shop = this.dataList.map(function (item) {
        //       return item;
        //     });
        //   });

        console.log(pamn)

          var namearr = [];
          namearr = this.newlist.map(function (item) {
            return item.name;
          });

          pam.project = this.project;
          var a = namearr.join(",");
          pam.work = a;
          that.dataList.push(pam);
          this.project = "";
          this.value0 = "";
        }
        this.disable = false;
      } else {
        var that = this;
        var pam = {};
        if (this.project == "") {
          Toast.fail("请添加项目");
        } else {
          var data = {};
          for (var i = 0; i < this.newlist.length; i++) {
            if (this.newlist[i].emp) {
              var name = "emp" + (i + 1);

              var value = this.newlist[i].emp;
              data[name] = value;
            }
          }
          for (var i = 0; i < this.newlist.length; i++) {
            if (this.newlist[i].name) {
              var name = "isorder" + (i + 1);

              var value = this.newlist[i].isorder;
              data[name] = value;
            }
          }
          data.goo_code = this.goo_code;
          data.out_no = that.$route.params.out_no;
          data.num = this.num;
          data.goo_price = this.goo_price;
          data.discount = this.discount;
          data.price = this.reallyprice;
          data.outmanyid = this.outmanyid;
          var pamn = {};
          pamn.data = data;

        //   Product_save(pamn).then((res) => {
        //     console.log("保存/修改项目", res);
        //     this.dataList = res.table;

        //     var shop = this.dataList.map(function (item) {
        //       return item;
        //     });
        //   });

          var namearr = [];
          namearr = this.newlist.map(function (item) {
            return item.name;
          });

          pam.project = this.project;
          var a = namearr.join(",");
          pam.work = a;
          that.dataList.push(pam);
          this.project = "";
          this.value0 = "";
          this.ischange = false;
        }
      }
      this.disable = false;
    },
    onClickRight() {
      this.show = true;
      this.allprice = 0;
      for (var i = 0; i < this.dataList.length; i++) {
        this.allprice =
          this.dataList[i].price * this.dataList[i].num + this.allprice;
        console.log("zongjia", this.allprice);
      }
    },
    handleChange(value) {
      //标记

      this.$forceUpdate();
      this.newlist[this.index].name =
        arguments[1].componentOptions.children[0].text;

      this.newlist[this.index].emp = arguments[0];
      this.disable = false;
    },
    handleChange5() {
      this.newlist[this.index].isno =
        arguments[1].componentOptions.children[0].text;
      this.newlist[this.index].Isorder = arguments[0];
      this.newlist[this.index].isorder = arguments[0];

      this.$forceUpdate();
    },
    handleSearch0(value) {
      var that = this;

      var pam = {};
      // pam.card = value;
      pam.card = value;
      pam.out_no = that.$route.params.out_no;
      if (value) {
        Goodsno_find(pam).then((res) => {
          that.data = res.table;
        });
      }
    },
    handleSearch1(value) {
      var that = this;

      var pam = {};
      // pam.card = value;
      pam.card = value;
      if (value) {
        Goodsno_find(pam).then((res) => {
          that.data = res.table;
        });
      }
    },
    addproject0(item) {
      this.project = item.goo_name;
      this.value0 = item.goo_name;
      this.goo_code = item.goods_code;
      Product_discount({ goo_code: item.goods_code }).then((res) => {
        console.log("查询商品折扣", res);
        this.goo_price = res.table[0].goo_price;
        this.reallyprice = res.table[0].goo_price;
        this.discount = res.table[0].discount;
      });
    },
    onChange(value) {
      this.workerlist = value;
      this.value = value;

      this.workerlistname = arguments[1];
    },
    onchangediscount(value) {
      this.reallyprice = Math.floor(this.goo_price * this.discount * 0.01);
    },
    onSearch() {},
    onSelect() {},
    numbername(index) {
      this.index = index;
    },
    numbername5(index) {
      this.index = index;
    },
    deletproject(item) {
      var out_no = this.$route.params.out_no;
      Product_delet({ outmanyid: item.outmanyid, out_no: out_no }).then(
        (res) => {
          this.dataList = res.table;
        }
      );
    },
    addproject(item) {
      // 修改
      this.goo_code = item.goods_code;
      this.value0 = item.goo_name;
      this.project = item.goo_name;
      this.outmanyid = item.outmanyid;
      this.ischange = true;
      this.num = item.num;
      Product_discount({ goo_code: item.goods_code }).then((res) => {
        console.log("查询商品折扣", res);
        this.goo_price = res.table[0].goo_price;
        this.reallyprice = res.table[0].goo_price;
        this.discount = res.table[0].discount;
      });

      Product_emp({ outmanyid: item.outmanyid, out_no: this.out_no }).then(
        (res) => {
          console.log("员工信息", res);

          var bbb = JSON.parse(
            JSON.stringify(res.table).replace(/empname/g, "name")
          );
          var ccc = JSON.parse(JSON.stringify(bbb).replace(/detailid/g, "emp"));
          this.newlist = ccc;
          this.newlist[this.index].name =
            arguments[1].componentOptions.children[0].text;

          this.newlist[this.index].emp = arguments[0];
        }
      );
    },
    filterOption1(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onchange2(e) {
      this.discount = "";
      this.disable = true;
    },
    handleChange0(value) {
      this.goo_code = this.data[value].goo_code;
      this.project = this.data[value].goo_name;
      this.value0 = value;

      Product_discount({ goo_code: this.goo_code }).then((res) => {
        console.log("商品折扣", res);
        this.goo_price = res.table[0].goo_price;
        this.reallyprice = res.table[0].goo_price;
        this.discount = res.table[0].discount;
      });
    },
    handleChange1(value) {
      this.project = this.data[value].goo_name;
      this.value0 = value;
    },
    submit3() {
      this.ischange = false;
    },
    onChange6(value) {
      this.discount = value;
      this.reallyprice = this.goo_price * value * 0.01;
    },
    onChange7(value) {
      this.reallyprice = value;
      this.discount = Math.ceil((value / this.goo_price) * 100);
    },
    onChange11(value) {
      console.log(value);
      this.num = value;
    },

    //支付
    paybill() {
      var that = this;
      if (this.paymoney / 100 < this.allprice) {
        Toast.fail("支付金额不够");
      } else if (this.paymoney / 100 > this.allprice) {
        Toast.fail("支付金额超出所需金额");
      } else {
        var pams = {
          out_no: that.out_no,
          weixin: that.weixin,
          money: that.money,
          givemoney: that.givemoney,
          alipay: that.alipay,
          otherpay: that.otherpay,
        };
        var data = clean(pams);
        that.isloading = true;
        Product_pay(data).then((res) => {
          console.log("支付返回", res);
          if (res.table[0].havepay == "Y") {
            Toast.success("支付成功");
            this.$router.push({
              name: "bank",
            });
          } else {
            that.isloading = false;
          }
        });
        console.log("支付成功");
      }
    },
  },
  created() {
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

    if (this.$route.params.out_no && this.$route.params.cusid === undefined) {
      this.historyshow = false;
      this.out_no = this.$route.params.out_no;
      var out_no = this.$route.params.out_no;
      Product_open({ out_no: out_no }).then((res) => {
        this.dataList = res.table;
      });
    }

    if (this.$route.params.out_no && this.$route.params.cusid) {
      this.out_no = this.$route.params.out_no;

      var that = this;
      var cusid = this.$route.params.cusid;

      Product_history({ cusid: cusid }).then((res) => {
        that.Listhistory = res.table;
        console.log("历史记录", res.table);
      });
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 6) {
        return value.slice(0, 6) + "...";
      }
      return value;
    },
  },
  computed: {
    paymoney: function () {
      var total;
      total =
        Number(this.money) +
        Number(this.givemoney) +
        Number(this.weixin) +
        Number(this.alipay) +
        Number(this.otherpay);
      return total * 100;
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
/deep/ .van-nav-bar__text {
  color: #ffffff;
}
.bankaddtable {
  border-radius: 0.3rem;
  width: 90%;
  font-size: 0.7rem;
  margin-left: 5%;
  color: white;
  background-color: #157aff;
}
.banktoptable {
  width: 90%;
  margin-left: 5%;
}
.addbottom {
  background-color: Peru;
}
.addthis {
  margin-top: 3vh;
  background-color: #157aff;
}
.left {
  float: left;
  margin-left: 3vh;
}
.right {
  width: 80%;
  margin-top: 1vh;
  float: right;
}
.addlist td {
  color: blue;
}
.addlist2 td {
  color: white;
}
.historyhigh {
  margin-top: 2vh;
}
.groupcontact {
  color: #ffffff;
  text-align: left;
  width: 90%;
  margin-left: 5%;
  background: #25d07a;
  margin-bottom: 0.5vh;
  border-radius: 0.5rem;
}
.groupcontact .van-cell__label {
  color: white;
}
.groupcontact2 .van-cell__label {
  color: white;
}
.groupcontact2 {
  color: #ffffff;
  text-align: left;
  width: 90%;
  margin-left: 5%;
  background: #157aff;
  margin-bottom: 0.5vh;
  border-radius: 0.5rem;
}
.fr {
  float: right;
}
.popupmoney {
  margin-top: 48px;
  text-align: left;
}
.moneytable {
  width: 100%;
}
.red {
  color: red;
}
.high {
  width: 30%;
}

.paycontact {
  margin-top: 2vh;
  text-align: left;
  width: 90%;
  margin-left: 5%;

  border-radius: 0.2rem;
  text-align: left;
}

.gray {
  background: #f8f8f8;
}
/deep/ .van-cell-group__title {
  background-color: white;
}
</style>