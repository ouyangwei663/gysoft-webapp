<template>
  <div>
    <van-nav-bar
      title="员工资料"
      :fixed="true"
      left-text="返回"
      :left-arrow="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="21" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-sticky :offset-top="46">
      <div style="width: 100%; background: white">
        <van-pagination
          @change="pagechange"
          v-model="currentPage"
          :page-count="totalpage"
          mode="simple"
          style="width: 80%; margin-left: 10%; margin-bottom: 3vh"
        />
      </div>
    </van-sticky>

    <div class="bb" v-for="(item, index) in List" :key="index">
      <van-card
        :class="index % 2 == 0 ? 'detailedcard' : 'detailedcard2'"
        @click="showoperate(item)"
      >
        <template #title>
          <div class="name">
            {{ item.empName }}{{ "   "
            }}{{ item.sex == "女" ? "(女士)" : "(男士)" }}
          </div>
        </template>
        <template #desc>
          <table class="vipinfo">
            <tr>
              <td>姓名：{{ item.englishname }}</td>
              <td>手机号：{{ item.phone }}</td>
            </tr>
            <tr>
              <td colspan="2">
                入职时间：{{
                  item.enterDate === null ? "暂无记录" : item.enterDate
                }}
              </td>
            </tr>
            <tr>
              <td>备注：{{ item.memo === null ? "暂无记录" : item.memo }}</td>

              <td>
                <van-button
                  type="primary"
                  size="mini"
                  @click.stop="clickperson(item)"
                  >详细资料</van-button
                >
              </td>
            </tr>
          </table>
        </template>
      </van-card>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Icon,
  Card,
  Tag,
  Button,
  ActionSheet,
  Cell,
  CellGroup,
  Pagination,
  Sticky,
} from "vant";
import "@/assets/icon/iconfont.css";
import { work_find } from "@/API/work";
import "@/assets/icon2/iconfont.css";
export default {
  name: "Detailed",
  data() {
    return {
      money: "100",
      phone: 13653035648,
      show: false,
      List: [],
      params: {},
      vipname: [],
      currentPage: 1,
      totalpage: "",
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Pagination.name]: Pagination,
    [Sticky.name]: Sticky,
  },
  created() {
    this.getdate();
  },

  methods: {
    onClickLeft() {
      //   this.$sotre.commit('changesata')
      this.$router.go(-1);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },

    getdate() {
      var that = this;
      work_find(this.$route.params).then((res) => {
        that.totalpage = res.extended.totalpage;
        console.log(res);
        that.List = res.table;
      });
    },
    showoperate(item) {
      this.show = true;
      this.params = item;
    },
    tocrash() {
      var params = this.params;
      this.$router.push({
        name: "crash",
        params,
      });
    },
    pagechange() {
      this.$route.params.pageindex = this.currentPage;
      console.log(this.$route.params);
      this.getdate();
    },
    tomoney() {
      var params = this.params;
      this.$router.push({
        name: "money",
        params,
      });
    },
    tocontscard(item) {
      var params = this.params;
      console.log(params);
      this.$router.push({
        name: "contscard",
        params,
      });
    },
    clickperson(item) {
      var params = item;
      

      this.$router.push({
        name: "worker_push",
        params,
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/worker_push") {
      // 这是路由path

      this.$store.commit("setKeepAlive", "Info"); //这是此页面的name属性名字
    } else {
      this.$store.commit("deletKeepAlive", "Info");
    }
    next();
  },
};
</script>
<style scope>
.van-nav-bar {
  background-color: #157aff;
}
.van-nav-bar__title {
  color: #ffffff;
}
.van-tag {
  margin-left: 5vw;
}
.bb {
  margin-left: 5vw;
  margin-bottom: 3vh;
  width: 90vw;
}
.box {
  margin-left: 5vw;
  width: 90vw;
  font-size: 1rem;
  overflow-x: auto;
}
.detailedcard {
  margin-left: 5%;
  width: 90%;
}
.detailedcard2 {
  margin-left: 5%;
  width: 90%;
}
.detailedcard {
  background-color: #3c5276;
  color: white;
  border-radius: 0.4rem;
}
.detailedcard2 {
  background-color: #445e89;
  color: white;
  border-radius: 0.4rem;
}
.van-card__content {
  text-align: left;
}
.van-card__title {
  font-size: 1rem;
}
.name {
  font-size: 1rem;
}
.vipinfo td {
  width: 50%;
}

.van-action-sheet__name {
  /* color: black; */
}
/* .van-cell__title span {
  color: black;
} */
.fl {
  text-align: left;
  width: 90%;
  margin-left: 5%;
}
</style>