<template>
  <div class="bill">
    <div>
      <div class="bill__page-title page-title">
        <h3>Счет</h3>
      <button class="btn waves-effect waves-light btn-small currency__btn-refresh blue  lighthen-3" @click="refresh">
          <i class="material-icons">autorenew</i>
      </button>
      </div>
      <Loader v-if="loading" />
      <div v-else class="bill__content">
        <div class="bill__amount">
            <h5>Текущая оценка портфеля (USD)</h5>
            <p>{{totalAmount}} USD</p>
          </div>
        <div class="bill__card card blue darken-4 bill-card">
        <h3 class="bill__card-title card-title white-text">Средства</h3>
          <div class="bill__card-content card-content white-text">

            <p v-for="cur of currencies" :key="cur" class="currency-line">
              <span>
                {{ base[cur] + " " + cur}} 
                <br>
                <input class="bill__input white-text" type="number" v-model.number='amount[cur]' id="val" placeholder="введите сумму..."/>
                <div class="bill__btns">
                  <a @click="plusSum(cur)" class="bill__btn-plus btn-floating btn-large waves-effect waves-light red small"><i class="material-icons">add</i></a>
                  <a @click="minusSum(cur)" class="bill__btn-minus btn-floating btn-large waves-effect waves-light red small"><i class="material-icons">remove</i></a>
                </div>
              </span>
            </p>
          </div>
      </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bill",
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
    totalAmount: 0
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
      this.base[cur] += this.amount[cur];
      this.updateAmount();
    },
    minusSum(cur){
      this.base[cur] -= this.amount[cur];
      this.updateAmount();
    }
  },
};
</script>

<style lang="scss">
  .bill{
    width: 100%;
    margin-bottom: 50px;
    margin-top: 50px;
    &__content{
      width: 100%
    }
    &__input{
      display: inline;
      width: 100px;
      margin: 10px auto;
      border-color: black;
      box-sizing: border-box;
    }
    &__btn-plus{
      margin-right:5px;
    }
    &____btns{
      display: flex;
      flex-direction: column;
       margin: 10px auto;
    }
    &__card-content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    }
    &__card-title{
      padding-top: 10px;
      margin-left: 10px;
    }
  }
</style>