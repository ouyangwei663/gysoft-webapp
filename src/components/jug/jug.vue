<template>
  <div class="hello">
    <van-nav-bar
      class="check"
      title="权限职务管理"
      :fixed="true"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>

    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="标题1" name="1">
        <van-cell-group>
          <van-cell title="单元格"  >
              <template #value>
            
              </template>
          </van-cell>
       
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="标题1" name="2">
        <van-cell-group>
          <van-cell title="单元格" value="内容" />
          <van-cell title="单元格" value="内容" />
          <van-cell title="单元格" value="内容" />
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Icon,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
} from "vant";

export default {
  data() {
    return {
      activeName: "0",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  created() {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-cell {
  /* width: 90%; */
  background-color: #fafafa;
  /* margin-left: 5%; */
  border-radius: 8px;
  margin-top: 2%;
}
/deep/ .van-nav-bar {
  background-color: #157aff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-field {
  width: 90%;
  background-color: #fafafa;
  margin-left: 5%;
  border-radius: 8px;
  margin-bottom: 2vh;
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ .van-field__control--custom {
  margin-left: 6%;
}
</style>
