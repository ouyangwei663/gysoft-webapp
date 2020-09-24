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
import Left from "./Left"

export default {
  name: "shouye",
  data() {
    return {

    };
  },
  components: {
    Nav,
    Gird,
    Left
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
