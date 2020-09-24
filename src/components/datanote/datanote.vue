<template>
  <div>
    <div class="hello">
      <van-nav-bar
        title="日志报表"
        :fixed="true"
        left-text="返回"
        right-text="按钮"
        :left-arrow="true"
        
      >
        <template #left>
          <van-icon name="arrow-left" size="21" color="#FFFFFF" />
        </template>
      </van-nav-bar>

      <van-dropdown-menu>
        <van-dropdown-item title="起止时间" v-model="value1" :options="option1" />
        <van-dropdown-item title="收银员" v-model="value2" :options="option2" />
        <van-dropdown-item title="分店" v-model="value3" :options="option3" />
        <van-dropdown-item title="品牌" v-model="value4" :options="option4" />
      </van-dropdown-menu>

      <van-cell-group>
        <van-cell class="one" title="分店" value="Hair珠海天虹店" />
        <van-cell title="销售日期" value="2020-09-03" />
        <van-cell title="总业绩金额" value="25698.00" />
        <van-cell title="产品金额" value="899984.00" />
        <van-cell title="售卡收入" value="9999879.00" />
        <van-cell title="加收洗发水" value="5984.00" />
        <van-cell title="公司成本" value="89454.00" />
        <van-cell title="外卖" value="89454.00" />
        <van-cell  title="员工自购" value="89454.00" />
         <van-cell class="last"  title=" "  value="合计：987458.00" />
      </van-cell-group>
    </div>
    <div class="hi">

    </div>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  NavBar,
  Icon,
  DropdownMenu,
  DropdownItem,
} from "vant";
export default {
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "aa",
      value4: "00",
      option1: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
      ],
      option2: [
        { text: "路人A", value: "b" },
        { text: "路人B", value: "c" },
      ],
      option3: [
        { text: "路人A", value: "bb" },
        { text: "路人B", value: "cc" },
      ],
      option4: [
        { text: "品牌", value: "00" },
        { text: "路人A", value: "11" },
        { text: "路人B", value: "22" },
      ],
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  border-radius: 200px/10px;
  background-color: #157aff;
  height: 15vh;
}
.hi{
    background-color:#F7F7F7;
  height: 85vh;

}
/deep/ .van-nav-bar {
  background-color: #157aff;
}
.van-dropdown-menu {
  position: absolute;
  width: 100%;
  top: 7%;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
/deep/ .van-dropdown-menu__item {
  background-color: #157aff;
}
/deep/ .van-dropdown-menu__title {
  color: white;
}
.van-cell-group {
  position: absolute;
  top: 12%;
  margin-top: 5%;
  width: 90%;
  margin-left: 5%;
  border: 0px white;
  border-radius: 100px;
}
.one {
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.last {
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  height: 20vh;
}
.van-cell {
  text-align: left;
}
</style>
