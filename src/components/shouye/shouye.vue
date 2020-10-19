<template>
  <div class="hello">
    <Nav></Nav>
    <div>
      <Left></Left>
      <Gird></Gird>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav";
import Gird from "./Gird";
import Left from "./Left";
import{GetList_Shop} from "@/API/getlistvalue.js"

export default {
  name: "shouye",
  created() {
    this.getshop();
  },

  data() {
    return { shop: [] };
  },
  components: {
    Nav,
    Gird,
    Left,
  },
  methods: {
    getshop() {
      var that = this;
      GetList_Shop({}).then((res) => {
        that.shop = res.table;
        window.localStorage.setItem("shop", JSON.stringify(that.shop));
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
