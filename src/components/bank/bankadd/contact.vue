<template>
  <div id="app">
    <van-nav-bar
      title="来客与保存"
      :fixed="true"
      :left-arrow="true"
      :right-text="ischange ? '修改' : '保存'"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit2">
      <van-field v-model="project" name="project" label="项目">
        <template #input>
          <a-select
            class="banksearch"
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
              v-for="(d, index) in data"
              :key="index"
              class="banktoselect"
              >{{ d.goo_name }} 价格：{{ d.goo_price }}</a-select-option
            >
          </a-select>
        </template>
      </van-field>
      <div class="addhigh">
        <label for>标价:￥{{ goo_price }}</label>
        折扣：<a-input-number
          :default-value="100"
          :min="0"
          :max="100"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
          :value="discount"
          @change="onChange6"
        />
        <label for>实价:￥</label>
        <a-input-number
          :default-value="1000"
          :value="reallyprice"
          @change="onChange7"
        />
      </div>
      <br />
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
            placeholder="Select a person"
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
          <a-select style="width: 30%" @change="handleChange5">
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
    <table class="bankaddtable addbottom">
      <tr>
        <td colspan="4">历史消费记录</td>
      </tr>
      <tr>
        <td>品种编码</td>
        <td>品种名称</td>
        <td>上次服务员工</td>
        <td>价格</td>
        <td>操作</td>
      </tr>
      <tr
        v-for="(item, index) in Listhistory"
        :key="index"
        :class="index % 2 == 0 ? 'addlist' : 'addlist2'"
      >
        <td>{{ item.goo_no }}</td>
        <td>{{ item.goo_name }}</td>
        <td>{{ item.empname }}</td>
        <td>{{ item.price }}</td>
        <td>
          <van-button
            round
            type="primary"
            size="mini"
            @click="addproject0(item.goo_name)"
            >添加</van-button
          >
        </td>
      </tr>
    </table>
    <table class="bankaddtable addbottom addthis">
      <tr>
        <td colspan="4">此次记录</td>
      </tr>
      <tr>
        <td>品种名称</td>
        <td>人员</td>
      </tr>
      <tr
        v-for="(item, index) in dataList"
        :key="index"
        :class="index % 2 == 0 ? 'addlist' : 'addlist2'"
      >
        <td>{{ item.project }}</td>
        <td>{{ item.work }}</td>

        <td>
          <van-button
            round
            type="danger"
            size="mini"
            @click="deletproject(index)"
            >删除</van-button
          >
        </td>
        <td>
          <van-button
            round
            type="primary"
            size="mini"
            @click="addproject(index)"
            >修改</van-button
          >
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { Form, Field, Button, Icon, Cell, Toast, Popup, NavBar } from "vant";
import { Product_history, Goodsno_find } from "@/API/product";
import { GetList_Erp } from "@/API/getlistvalue";
export default {
  data() {
    return {
      newlist: [{}],

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
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    add() {
      this.newlist.push({});
    },
    delet(index) {
      console.log(index);
      console.log(this.newlist);
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
          console.log(this.newlist);
          var namearr = [];
          namearr = this.newlist.map(function (item) {
            return item.name;
          });
          console.log(namearr);
          pam.project = this.project;
          var a = namearr.join(",");
          pam.work = a;
          that.dataList.push(pam);
          this.project = "";
          this.value0 = "";
        }
      } else {
        this.dataList[this.indexname].project = this.project;

        var namearr = [];
        namearr = this.newlist.map(function (item) {
          return item.name;
        });
        var a = namearr.join(",");

        this.dataList[this.indexname].work = a;
        this.ischange = false;
      }
    },
    onClickRight() {
      if (this.ischange == false) {
        var that = this;
        var pam = {};
        if (this.project == "") {
          Toast.fail("请添加项目");
        } else {
          console.log(this.newlist);
          var namearr = [];
          namearr = this.newlist.map(function (item) {
            return item.name;
          });
          console.log(namearr);
          pam.project = this.project;
          var a = namearr.join(",");
          pam.work = a;
          that.dataList.push(pam);
          this.project = "";
          this.value0 = "";
        }
      } else {
        this.dataList[this.indexname].project = this.project;

        var namearr = [];
        namearr = this.newlist.map(function (item) {
          return item.name;
        });
        var a = namearr.join(",");

        this.dataList[this.indexname].work = a;
        this.ischange = false;
      }
    },
    handleChange(value) {
      console.log(arguments[0]);
      console.log(arguments[1].componentOptions.children[0].text);
      this.$forceUpdate();
      this.newlist[this.index].name =
        arguments[1].componentOptions.children[0].text;
    },
    handleChange5() {
      console.log(arguments[0]);
      console.log(arguments[1].componentOptions.children[0].text);
      this.newlist[this.index].isno =
        arguments[1].componentOptions.children[0].text;
    },
    handleSearch0(value) {
      var that = this;
      console.log(value);
      var pam = {};
      // pam.card = value;
      pam.card = value;
      if (value) {
        Goodsno_find(pam).then((res) => {
          console.log(res.table);
          that.data = res.table;
        });
      }
    },
    handleSearch1(value) {
      var that = this;
      console.log(value);
      var pam = {};
      // pam.card = value;
      pam.card = value;
      if (value) {
        Goodsno_find(pam).then((res) => {
          console.log(res.table);
          that.data = res.table;
        });
      }
    },
    addproject0(item) {
      this.project = item;
      this.value0 = item;
    },
    onChange(value) {
      console.log(value);
      this.workerlist = value;
      this.value = value;
      console.log(this.value);
      this.workerlistname = arguments[1];
    },
    onSearch() {},
    onSelect() {},
    numbername(index) {
      console.log(index);
      this.index = index;
    },
    numbername5(index) {
      console.log(index);
      this.index = index;
    },
    deletproject(index) {
      this.dataList.splice(index, 1);
    },
    addproject(index) {
      // 修改
      this.indexname = index;
      this.ischange = true;
      this.value0 = this.dataList[index].project;
      // this.value0 = this.dataList[index].project;
      // this.value = null;
      // this.index = index;
    },
    filterOption1(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },

    handleChange0(value) {
      this.project = this.data[value].goo_name;
      this.value0 = value;
      this.goo_price = this.data[value].goo_price;
      this.reallyprice = this.data[value].goo_price;
    },
    handleChange1(value) {
      this.project = this.data[value].goo_name;
      this.value0 = value;
    },
    submit3() {
      this.ischange = false;
      this.datalist[this.index].project = this.project2;
    },
    onChange6(value) {
      console.log("changed", value);
      this.discount = value;
      this.reallyprice = this.goo_price * value * 0.01;
    },
    onChange7(value) {
      console.log("changed", value);
      this.reallyprice = value;
      this.discount = Math.ceil((value / this.goo_price) * 100);
    },
  },
  created() {
    setTimeout(() => {
      console.log('1')
    }, 1000);
    if (sessionStorage.getItem("getlist_erp") == null) {
      GetList_Erp({}).then((res) => {
        this.workerselect = res.table;
        sessionStorage.setItem(
          "getlist_erp",
          JSON.stringify(this.workerselect)
        );
        // console.log(res.table);
      });
    } else {
      this.workerselect = JSON.parse(sessionStorage.getItem("getlist_erp"));
      // console.log(this.workerselect);
    }
    var that = this;
    Product_history({ cusid: "146DK::UB+L+&#!A" }).then((res) => {
      console.log(res.table);
      that.Listhistory = res.table;
    });
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
  background-color: #25d07a;
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
  color: red;
}
.addlist2 td {
  color: white;
}
.addhigh {
}
</style>