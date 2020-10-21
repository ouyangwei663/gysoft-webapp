<template>
  <div>
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
            >
              {{ d.goo_name }} 价格：{{ d.goo_price }}
            </a-select-option>
          </a-select>
        </template>
      </van-field>
      <label class="left" for="">员工</label>
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
            placeholder="Select a person"
            option-filter-prop="children"
            style="width: 50%"
            @change="handleChange"
          >
            <a-select-option
              v-for="(d, index1) in workerselect"
              :key="index1"
              :value="d.no"
              @click="number(index)"
            >
              {{ d.name }}( {{ d.workname }})
            </a-select-option>
          </a-select>
          <a-select style="width: 30%" @change="handleChange5">
            <a-select-option value="Y"> 指名 </a-select-option>
            <a-select-option value="N"> 轮牌 </a-select-option>
            >
          </a-select>
        </div>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit2">
          {{ ischange ? "修改" : "保存" }}
        </van-button>
      </div>
    </van-form>
    <button @click="add">添加</button>
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
      <tr v-for="(item, index) in Listhistory" :key="index">
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
      <tr v-for="(item, index) in dataList" :key="index">
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
import { Form, Field, Button, Icon, Cell, Toast } from "vant";
import { Product_history, Goodsno_find } from "@/API/product";
export default {
  data() {
    return {
      newlist: [{}],
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
      index: "",
    };
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
  },
  methods: {
    add() {
      this.newlist.push({});
    },
    onSubmit2() {
      if (this.ischange == false) {
        var that = this;
        var pam = {};
        if (this.project == "") {
          Toast.fail("请添加项目");
        } else {
          pam.project = this.project;

          var a = this.workerlistname.join(",");
          pam.work = a;
          that.dataList.push(pam);

          this.project = "";
          this.value0 = "";
        }
      } else {
        var that = this;
        var pam = {};
        if (this.project == "") {
          Toast.fail("请添加项目");
        } else {
          this.dataList[this.index].project = this.project;

          var a = this.workerlistname.join(",");
          this.dataList[this.index].work = a;
          this.value0 = "";
          this.project = "";
          this.ischange = false;
        }
      }
    },
    handleChange() {
      console.log();
      console.log(arguments[0]);
      console.log(arguments[1].componentOptions.children[0].text);
    },
    handleChange5() {
      console.log(arguments[0]);
      console.log(arguments[1].componentOptions.children[0].text);
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
    number(index){
      console.log(index)
    },
    deletproject(index) {
      this.dataList.splice(index, 1);
    },
    addproject(index) {
      this.ischange = true;
      this.project = this.dataList[index].project;
      this.value0 = this.dataList[index].project;
      this.value = null;
      this.index = index;
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
        console.log(res.table);
      });
    } else {
      this.workerselect = JSON.parse(sessionStorage.getItem("getlist_erp"));
      console.log(this.workerselect);
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
</style>