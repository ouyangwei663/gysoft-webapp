<template>
  <div>
    <van-nav-bar
      class="check"
      title="赠送与业绩"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <div class="thirdtop">
      <label class="left" for>赠送项目</label>
      <div
        class="right"
        v-for="(item, index) in newlist"
        :key="index"
        aria-label="员工"
      >
        <a-select
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode || document.body;
            }
          "
          style="width: 60%"
          show-search
          showArrow
          :value="newlist[index].name"
          placeholder="选择项目"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleSearch0"
          @change="handleChange0"
        >
          <a-select-option
            style="width: 20%"
            @click="numbername(index)"
            v-for="(d, index1) in data"
            :key="index1"
            class="banktoselect"
            >{{ d.goo_name }} {{ d.goo_price }}</a-select-option
          > </a-select
        ><a-input
          placeholder="输入次数"
          type="num"
          style="width: 18%"
          default-value=""
          :min="1"
          :max="100"
          v-model="newlist[index].num"
          oninput="if(value<0||value>100)value=1"
          @change="onchangenum"
        />
        <a-button type="dashed" @click="delet(index)">
          <a-icon type="minus-circle-o" />
        </a-button>
      </div>
      <a-button type="dashed" style="width: 60%" @click="add" class="thirdadd">
        <a-icon type="plus" />添加项目 </a-button
      ><br />

      <hr />

      <label class="left" for>员工业绩</label> <br />
      <div
        v-for="(item, index) in worklist"
        :key="index + 1000"
        aria-label="员工"
      >
        <span>{{ worklist[index].workname }}</span>
        <a-select
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode || document.body;
            }
          "
          style="width: 30%"
          show-search
          showArrow
          :value="worklist[index].name"
          placeholder="选择员工"
          :default-active-first-option="false"
          :show-arrow="false"
          option-filter-prop="children"
          :not-found-content="null"
          @change="handleChange1"
        >
          <a-select-option
            style="width: 20%"
            @click="numbername1(index)"
            v-for="(d, index1) in workerselect1"
            :key="index1 + 1000"
            class="banktoselect"
            :value="d.no + ',' + d.workname"
            >{{ d.name }}</a-select-option
          >
        </a-select>
        <a-input
          placeholder="输入业绩"
          type="num"
          style="width: 18%"
          :min="1"
          :max="100"
          v-model="worklist[index].price"
          oninput="if(value<0)value=1"
          required="required"
          @change="onchangenum1"
        />
        <a-button type="dashed" @click="delet1(index)">
          <a-icon type="minus-circle-o" />
        </a-button>
      </div>
      <a-button type="dashed" style="width: 60%" @click="add1" class="thirdadd">
        <a-icon type="plus" />添加员工
      </a-button>

      <div style="margin: 16px">
        <van-button round block type="info" @click="post"> 下一步 </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Goodsno_find } from "@/API/product";
import { GetList_Erp } from "@/API/getlistvalue";
import { Button, NavBar, Icon, Toast } from "vant";
export default {
  props: { show: Boolean },
  data() {
    return {
      newlist: [{}],
      index: "",
      index2: "",
      data: [],
      workerselect: [
        { name: "哈哈3", workname: "工人2", no: "1" },
        { name: "哈哈4", workname: "工人3", no: "2" },
        { name: "哈哈5", workname: "工人4", no: "3" },
        { name: "哈哈6", workname: "工人5", no: "4" },
        { name: "哈哈7", workname: "工人6", no: "5" },
        { name: "哈哈8", workname: "工人7", no: "6" },
      ],
      discount: "",
      workerselect1: "",
      worklist: [{}],
      flag: false,
      flag2: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$emit("changeshow", false);
    },
    handleChange(value) {
      this.newlist[this.index].name = this.workerselect[value].name;
      console.log("选择项目", value);
    },
    handleChange1(value) {
      this.$forceUpdate();
      this.worklist[this.index2].name =
        arguments[1].componentOptions.children[0].text;
      var arr = value.split(",");
      console.log(arr);

      this.worklist[this.index2].emp = arr[0];
      this.worklist[this.index2].workname = arr[1];

      console.log(this.worklist);
    },
    numbername(index) {
      console.log("number", index);
      this.index = index;
    },
    numbername1(index) {
      console.log("number2", index);
      this.index2 = index;
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
    handleChange0(value) {
      console.log(this.data[value].goo_code);
      this.newlist[this.index].name = this.data[value].goo_name;
      this.newlist[this.index].goo_code = this.data[value].goo_code;
      this.$forceUpdate();
    },
    add() {
      this.newlist.push({ num: 1 });
      console.log(this.newlist);
    },
    add1() {
      this.worklist.push({});
      console.log(this.newlist);
    },
    onchangenum(value) {
      console.log("数量", value);
      console.log(this.newlist);
    },
    onchangenum1(value) {
      console.log("业绩", value);
      // console.log(this.newlist);
    },
    delet(index) {
      this.newlist.splice(index, 1);
    },
    delet1(index) {
      this.worklist.splice(index, 1);
    },
    post() {
      for (var i = 0; i < this.newlist.length; i++) {
        if (this.newlist[i].num == "" || this.newlist[i].num == null) {
          this.flag = true;
          break;
        }
      }
      if (this.flag) {
        Toast.fail("请输入次数");
        this.flag = false;
      } else {
        for (var i = 0; i < this.worklist.length; i++) {
          if (this.worklist[i].price == "" || this.worklist[i].price == null) {
            this.flag2 = true;
            break;
          }
        }
        if (this.flag2) {
          Toast.fail("请输入业绩");
          this.flag2 = false;
        } else {
          console.log(this.worklist);
          Toast.success("提交");
        }
      }
    },
  },
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  created() {
    if (sessionStorage.getItem("getlist_erp") == null) {
      GetList_Erp({}).then((res) => {
        this.workerselect1 = res.table;
        sessionStorage.setItem(
          "getlist_erp",
          JSON.stringify(this.workerselect1·)
        );
      });
    } else {
      this.workerselect1 = JSON.parse(sessionStorage.getItem("getlist_erp"));
    }
  },
};
</script>
<style scoped>
.left {
  float: left;
  margin-left: 3vh;
}
.right {
  width: 80%;
  margin-top: 1vh;
  float: right;
}
.thirdadd {
  margin-top: 10px;
}
.thirdtop {
  margin-top: 65px;
}
</style>