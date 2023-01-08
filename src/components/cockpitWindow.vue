<template>
  <div>
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>
    <div id="chart3" class="chart"></div>
    <div id="chart4" class="chart"></div>
    <div id="chart5" class="chart"></div>
    <div id="chart6" class="chart"></div>
    <div id="chart7" class="chart"></div>
    <div id="chart8" class="chart"></div>
    <div id="chart9" class="chart"></div>
    <div id="chart10" class="chart"></div>
    <div id="chart11" class="chart"></div>
    <div id="chart12" class="chart"></div>
    <div id="chart13" class="chart"></div>
    <div id="chart14" class="chart"></div>
    <div id="chart15" class="chart"></div>
  </div>
</template>

<script>
import url from "../assets/config";
export default {
  name: "cockpitWindowVue",
  data() {
    return {
      msg: "",
    };
  },
  mounted() {
    this.drawChart1();
  },
  methods: {
    drawChart1() {
      // 基于刚刚准备好的 DOM 容器，初始化 EChart 实例
      this.$axios.get(url.url+`/product/turnover`).then((res) => {
        console.log("res :>> ", res);
        let myChart = this.$echarts.init(document.getElementById("chart1"));
        // 绘制图表
        myChart.setOption({
          title: { text: "近七日农产品成交量" },
          tooltip: {},
          xAxis: {
            data: [-6,-5,-4,-3,"前天","昨天","今天"]
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "bar",
              data: res.data.data,
            },
          ],
        });
      });
    },
  },
};
</script>

<style>
.chart {
  width: 400px;
  height: 300px;
  border: 1px solid black;
  float: left;
}
</style>