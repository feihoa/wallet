<template>
  <div class="chart">
    <div class="chart-container">
      <h6 class="chart__title">Текущее распределение валют, %</h6>
      <p v-if="noMoney" style="font-weight:bold">Нет средств на счету</p>
      <pie-chart v-else :chart-data="datacollection" :options="chartOptions" class="waves-effect pie-chart"></pie-chart>
    </div>
  </div>
</template>

<script>
  import PieChart from './PieChart.js';

  export default {
    components: {
      PieChart
    },
    props: ['data'],
    data () {
      return {
        datacollection: {},
        labels: ["USD", "BTC", "ETH"],
        noMoney: false,
        chartOptions: {responsive: true, maintainAspectRatio: false}
      }
    },
    mounted () {
      this.fillData();
    },
    methods: {
      fillData () {
        this.data.totalAmount = this.data.totalAmount ? this.data.totalAmount : 1
        if(!this.data.ETH && !this.data.BTC && !this.data.USD){
          this.noMoney = true;
        }
        this.datacollection = {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
               backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            data: [(this.data.USD/this.data.totalAmount*100).toFixed(2), (this.data.BTC/this.data.totalAmount*100).toFixed(2), (this.data.ETH/this.data.totalAmount*100).toFixed(2)]
          }
        ]
      }
    },
    }
    }
</script>

<style lang="scss" scoped>
    .chart{
        position: relative;
        margin:  0;
        padding:0;
        border:1px solid rgba(0, 0, 0, 0.272);
        margin-top: 20px;
        border:none;
        min-width: 270px;
        margin-bottom: 20px;

        &__title{
            margin: 0;
            margin-bottom: 8px;
        }
    }
    .chart-container{
      margin: 0;
      text-align: center;
    }
    .pie-chart{
     height: 215px;
      width: 315px;
}
</style>