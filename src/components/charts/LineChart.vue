<template>
  <div class="chart">
    <h6 class="chart__title">Изменение стоимости криптовалюты за последние 14 дней (USD)</h6>
    <line-chart :chart-data="datacollection" :options="chartOptions" class="waves-effect line-chart"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js';
  import dataFilter from "../../filters/date.filter";

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {},
        labels: [],
        BTC: [],
        ETH: [],
        chartOptions: {responsive: true, maintainAspectRatio: false}
      }
    },
    props: ['data'],
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.data.BTC.forEach((el)=>{
            this.labels.push(dataFilter(el[0]))
            this.BTC.push(el[1].toFixed(2))
        })
        this.data.ETH.forEach((el)=>{
            this.ETH.push(el[1].toFixed(2))
        })

        this.datacollection = {
            labels: this.labels,
            datasets: [
                {
                label: 'BTC',
                fill: false,
                borderColor: 'red',
                tension: 0.1,
                data: this.BTC
                }, {
                label: 'ETH',
                ill: false,
                borderColor: 'blue',
                tension: 0.1,
                data: this.ETH
                }
            ]
        }
    },
    }
    }
</script>

<style lang="scss">
    .chart{
        max-width: 320px;
        margin:  0;
        padding: 10px;;
        border:1px solid rgba(0, 0, 0, 0.272);
        margin-top: 20px;

        &__title{
            margin: 0;
            margin-bottom: 8px;
            text-align: center;
        }
        .line-chart{
          height: 300px!important;
          width: 300px!important;
        }
    }
    @media screen and (max-width: 475px) {
        .line-chart{
          height: 300px!important;
          width: 300px!important;
        }
}
</style>