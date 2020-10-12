
<template>
  <section class="chart-container">
    <div id="chartPie" style="width: 100%; height: 400px"></div>
  </section>
</template>
<script>
import echarts from "echarts";
import {apiVipOpen} from "@/API/api"
export default {
  data() {
    return {
      chartPie: null,
    };
  },
  created(){
    this.getopen()
  },
  methods: {
getopen(){
  apiVipOpen({}).then((res)=>{
    console.log(res)
  })
},
    



    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "洗剪吹（首席设计师）",
            "造型（首席设计师）",
            "加收洗发水",
            "数码烫，陶瓷烫（施华蔻）",
            "基础染发",
          ],
        },
        series: [
          {
            name: "消费所占百分比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 192, name: "洗剪吹（首席设计师）" },
              { value: 52, name: "造型（首席设计师）" },
              { value: 20, name: "加收洗发水" },
              { value: 1200, name: "数码烫，陶瓷烫（施华蔻）" },
              { value: 960, name: "基础染发" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawCharts() {
      this.drawPieChart();
    },
  },

  mounted: function () {
    this.drawCharts();
  },
  // updated: function () {
  //     this.drawCharts()
  // }
};
</script>
 
<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
.el-col {
  padding: 30px 20px;
}
</style>