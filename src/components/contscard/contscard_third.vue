<template>
  <div>
    <label class="left" for>项目</label>
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
        style="width: 70%"
        show-search
        showArrow
        :value="newlist[index].name"
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
          @click="numbername(index)"
          v-for="(d, index1) in data"
          :key="index1"
          class="banktoselect"
          >{{ d.goo_name }} {{ d.goo_price }}</a-select-option
        > </a-select
      ><a-input
        type="num"
        style="width: 18%"
        :default-value="100"
        :min="1"
        :max="100"
        v-model="newlist[index].num"
        oninput="if(value<0||value>100)value=1"
        @change="onchangenum"
      />
    </div>
    <a-button type="dashed" style="width: 60%" @click="add">
      <a-icon type="plus" />添加项目
    </a-button>
  </div>
</template>

<script>
import { Goodsno_find } from "@/API/product";
export default {
  data() {
    return {
      newlist: [{}],
      index: "",
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
    };
  },
  methods: {
    handleChange(value) {
      this.newlist[this.index].name = this.workerselect[value].name;
      console.log("选择项目", value);
    },
    numbername(index) {
      console.log("number", index);
      this.index = index;
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
      this.newlist.push({});
      console.log(this.newlist);
    },
    onchangenum(value){
      
    }
  },
  components: {},
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
</style>