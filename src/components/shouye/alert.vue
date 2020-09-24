<template>
  <div>
 
    <van-cell is-link value="会员管理" :style="{color:'#FFFFFF'}">
      <template #title>
        <van-icon name="friends-o" size="25" />
      </template>
    </van-cell>

    <van-cell is-link value="收银管理" :style="{color:'#FFFFFF'}">
      <template #title>
        <van-icon name="gem" size="25" />
      </template>
    </van-cell>

    <van-cell is-link value="员工管理" :style="{color:'#FFFFFF'}">
      <template #title>
        <van-icon name="manager" size="25" />
      </template>
    </van-cell>

    <van-cell is-link value="考勤管理" :style="{color:'#FFFFFF'}">
      <template #title>
        <van-icon name="calendar-o"  size="25"/>
      </template>
    </van-cell>

    <van-cell is-link value="基础资料" :style="{color:'#FFFFFF'}">
      <template #title>
        <van-icon name="notes-o" size="25"  />
      </template>
    </van-cell>

    <van-cell is-link value="系统管理" :style="{color:'#FFFFFF'}">
      <template #title>
        <van-icon name="setting" size="25"/>
      </template>
    </van-cell>
    <van-image
  width="5rem"
  height="5rem"
  fit="contain"
  :src="gy"
/>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon,Image } from "vant";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      gy:require('../../../static/gy.png')
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Image.name]: Image,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-cell {
  height: 10%;
  background-color: #2a282b;
  border-block-color: #2a282b;
}

.van-cell {
  position: inherit;
}
.van-cell__right-icon {
  margin-left: 4px;
  color: #ffffff;
}
.van-popup--left .van-cell__value {
  color: #ffffff;
}
    .van-image{
      margin-top: 60%;
    }

</style>
