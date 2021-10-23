<template>
  <div class="currency">
      <div class="currency__title page-title">
        <h3 style="margin: 0">Курс валют</h3>
        <button class="btn waves-effect waves-light btn-small currency__btn-refresh blue darken-3" @click="refresh">
          <i class="material-icons">autorenew</i>
        </button>
      </div>

      <Loader v-if="loading" />
      <div v-else class="currency__content">
        <div class="currency__card card light-blue darken-3 bill-card">
          <div class="card-content currency__card-content white-text">
            <div class="currency__card-header card-header">
              <span class="currency__card-title card-title">Обменный курс (USD)</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Валюта</th>
                  <th>Курс</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cur in currencies" :key="cur">
                  <td>{{ cur }}</td>
                  <td> {{ currency[cur][13][1].toFixed(2) }} </td>
                  <td>{{ currency[cur][13][0] | date("date")}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <div>
      <div class="convert convert_block_item ">
        <input type="number" v-model.number="amount" id="val" placeholder="введите сумму..."/>
        <span class="select__label">Конвертировать из</span>
        <select v-model="convertfrom" id="cur1" multiple class="browser-default select">
          <option v-for="(a, index) in currencyfrom" v-bind:value="a.name" v-bind:key="index">{{a.desc}}</option>
        </select>
        <hr>
        <span class="select__label">Конвертировать в</span>
        <select v-model="convertto" id="cur2" multiple class="browser-default select">
          <option v-for="(a, index) in currencyfrom" v-bind:value="a.name" v-bind:key="index">{{a.desc}}</option>
        </select>
          <hr>
          <span class="blue-text  text-darken-3"> {{amount.toFixed(5)}} {{convertfrom[0]}} = {{finalAmount}} {{convertto[0]}}</span>
          <br>
        </div>    
      </div>
      <Chart :data="currency"/>
    </div>
    <br>
    <hr>
  </div>
</template>

<script>

import Chart from "../components/charts/LineChart.vue";

export default {
  name: "currency",
  components:{
    Chart
  },
  data: () => ({
    currencies: ["BTC", "ETH"],
    loading: true,
    currency: {},
    BTC: null,
    ETH: null,
    currencyfrom : [
      {name:"USD", desc:"US Dollar"},
      {name:"BTC", desc:"Bitcoin"},
      {name:"ETH", desc:"Ethereum"},
    ],
    convertfrom: ["USD"],
    convertto:["USD"],
    amount : 1
  }),
  async mounted() {
    this.BTC = await this.$store.dispatch("fetchBTC");
    this.ETH = await this.$store.dispatch("fetchETH");
    this.currency.BTC = this.BTC.prices;
    this.currency.ETH = this.ETH.prices;
    this.loading = false;
  },
    methods: {
    async refresh() {
      this.loading = true;
    this.BTC = await this.$store.dispatch("fetchBTC");
    this.ETH = await this.$store.dispatch("fetchETH");
    this.currency.BTC = this.BTC.prices;
    this.currency.ETH = this.ETH.prices;
      this.loading = false;
    },
  },
  computed :{
    finalAmount:function() {
      let to = this.convertto[0];
      let from = this.convertfrom[0];
      let final;
        switch(from) {
        case "USD":
        if (to == "USD") {
        final = this.amount * 1;
        }
        if (to == "BTC") {
          final = this.amount * 1/this.currency['BTC'][13][1];
        }
        if (to == "ETH") {
          final = this.amount * 1/this.currency['ETH'][13][1];
        }
        break;
        case "BTC":
        if (to == "USD") {
          final = this.amount * this.currency['BTC'][13][1];
        }
        if (to == "BTC") {
          final = this.amount;
        }
        if (to == "ETH") {
          final = this.amount * this.currency['BTC'][13][1] * 1/this.currency['ETH'][13][1];
        }
        break;
        case "ETH":
        if (to == "USD") {
          final = this.amount * this.currency['ETH'][13][1];
        }
        if (to == "BTC") {
          final = this.amount * this.currency['ETH'][13][1] * 1/this.currency['BTC'][13][1];
        }
        if (to == "ETH") {
          final = this.amount;
        }
        break
        }
        return final.toFixed(5);
        }
      }
    };
  </script>

<style lang="scss">
.currency{
  width: 100%;
  margin-bottom: 0px;
  margin-top: 50px;
  position: relative;
  &__content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items:center;
    margin-top: 0px;
  }
  &__btn-refresh{
    margin-left: 10px;
    display: inline-block;
  }
  &__card-content{
    width: 100%;
  }
  &__card-title{
    display: inline;
  }
  &__card-header{
    display: flex;
    justify-content:space-between;    
  }
  &__card{
    max-width: 400px;
    margin: 0;
    height: fit-content;
    margin-top: 20px;
  }
  &__title{
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin: 0;
  }
}
.select{
  height: fit-content;

  &__label{
    line-height: 24px;
  }
}
.convert{

  max-width: 400px;
  min-width: 200px;
  border:1px solid rgba(0, 0, 0, 0.265);
  padding: 10px;
  margin-top: 20px;
}

</style>