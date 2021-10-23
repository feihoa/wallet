<template>
  <div class="bill">
    <div>
      <div class="bill__page-title page-title">
        <h3 style="margin: 0" class="bill__title">Счет</h3>
      <button class="btn waves-effect waves-light btn-small bill__btn-refresh blue lighthen-3" @click="refresh">
          <i class="material-icons">autorenew</i>
      </button>
      </div>
      <Loader v-if="loading" />
      <div v-else class="bill__content">
        <div>
        <div class="bill__amount">
            <h6 class="bill__evaluation">Текущая оценка портфеля (USD)</h6>
            <p class="bill__evaluation-amount">{{totalAmount}} USD</p>
        </div>
            <Chart :data="chartData" :key="chartKey"/>
            </div>
        <div class="bill__card card blue darken-1 bill-card">
        <h3 class="bill__card-title card-title white-text">Средства</h3>
          <div class="bill__card-content card-content white-text">

            <p v-for="cur of currencies" :key="cur" class="currency-line">
              <span>
                <p class="cur-title">{{ base[cur] + " " + cur}} </p>
                <input class="bill__input white-text" type="number" v-model.number='amount[cur]' id="val" placeholder="введите сумму..."/>
                <div class="bill__btns">
                  <a @click="plusSum(cur)" class="bill__btn bill__btn-plus btn-floating btn-large waves-effect waves-light red small">
                    <i style="line-height: 0px; vertical-align: text-top;" class="material-icons">add</i></a>
                  <a @click="minusSum(cur)" class="bill__btn bill__btn-minus btn-floating btn-large waves-effect waves-light red small">
                    <i style="line-height: 0px; vertical-align: text-top;" class="material-icons">remove</i></a>
                </div>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import Chart from "../components/charts/PieChart.vue";

export default {
  name: "bill",
    components:{
    Chart
  },
  data: () => ({
    currencies: ["USD", "BTC", "ETH"],
    loading: true,
    currency: null,
    base:{
      BTC:0,
      ETH:0,
      USD:0
    },
    amount : {
      BTC:1,
      ETH:1,
      USD:1
    },
    chartData:{
      BTC:0,
      ETH:0,
      USD:0,
      totalAmount:1
    },
    totalAmount: 0,
    chartKey:0
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.currency.usd = {
      usd: 1
    }

    this.updateAmount();
    this.loading = false;

  },
  methods: {
    updateAmount(){
      this.totalAmount = Math.floor(this.base.BTC * this.currency.bitcoin.usd + this.base.ETH * this.currency.ethereum.usd + this.base.USD * this.currency.usd.usd);
      this.chartData.BTC = this.base.BTC * this.currency.bitcoin.usd;
      this.chartData.ETH = this.base.ETH * this.currency.ethereum.usd;
      this.chartData.USD = this.base.USD * this.currency.usd.usd;
      this.chartData.totalAmount = this.totalAmount;
      this.chartKey+=1
    },
    
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
          this.currency.usd = {
      usd:1
    }
      this.updateAmount();
      this.loading = false;
    },
    plusSum(cur){
      this.base[cur] = +(this.base[cur] + this.amount[cur]).toFixed(3);
      this.updateAmount();
    },
    minusSum(cur){
      this.base[cur] = +(this.base[cur] - this.amount[cur]).toFixed(3);
      this.updateAmount();
    }
  },
};
</script>

<style lang="scss">
  .bill{
    width: 100%;
    margin-top: 50px;
    &__content{
      width: 100%
    }
    &__btn-refresh{
      margin-left: 10px;
      display: inline-block;
    }
    &__input{
      display: inline;
      width: 100px;
      height: 30px!important;
      margin: 0 auto;
      border-color: black;
      box-sizing: border-box;
    }
    &__btn-plus{
      margin-right:5px;
    }
    &__btn{
      width: 30px!important;
      height: 30px!important;
    }
    &__card-content{
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 20px!important;
    }
    &__card-title{
      margin:0;
      margin-left: 10px;
      padding-top: 10px;
    }
    &__card{
      box-sizing: border-box;
      min-width: 280px;
      margin: 0;
    }
    &__amount{
      margin: 0;
      margin-top:-10px;
      margin-bottom:20px;
      text-align: center;
    }
    &__evaluation{
      margin-top: 50px;
    }
    &__title{
      margin-top: 50px;
    }
    &__evaluation-amount{
      font-weight: bold;
    }
    &__content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: baseline;
      margin-top: -15px;
      margin: auto;
    }
    @media screen and (max-width: 724px) {
      &__content {
        justify-content: center;
      }
    }
    @media screen and (min-width: 1024px) {
      &__content {
        width: 60%;
      }
    }
    &__page-title{
      display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin: 0;
    }
    .currency-line{
      margin: 0;
      padding-bottom: 20px;
    }
    .currency-line:last-of-type{
      padding-bottom: 0px;
    }
    .cur-title{
      margin-top: 10px;
    }
  }
</style>