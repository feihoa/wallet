<template>
  <div class="currency">
    <div class="currency__title page-title">
      <h3 style="margin: 0">Курс валют</h3>
      <button
        class="
          btn
          waves-effect waves-light
          btn-small
          currency__btn-refresh
          blue
          darken-3
        "
        @click="refresh"
      >
        <i class="material-icons">autorenew</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div v-else class="currency__content">
      <div class="currency__card card light-blue darken-3 bill-card">
        <div class="card-content currency__card-content white-text">
          <div class="currency__card-header card-header">
            <span class="currency__card-title card-title"
              >Обменный курс (USD)</span
            >
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
                <td>{{ currency[cur][13][1].toFixed(2) }}</td>
                <td>{{ currency[cur][13][0] | date("date") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Convert :currency="currency" />
      </div>
      <Chart :data="currency" />
    </div>
    <br />
    <hr />
  </div>
</template>

<script>
import Chart from "../components/charts/LineChart.vue";
import Convert from "../components/Convert.vue";

export default {
  name: "currency",
  components: {
    Chart,
    Convert,
  },
  data: () => ({
    currencies: ["BTC", "ETH"],
    loading: true,
    currency: {},
    BTC: null,
    ETH: null,
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
};
</script>

<style lang="scss">
.currency {
  width: 100%;
  margin-bottom: 0px;
  margin-top: 50px;
  position: relative;
  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 0px;
  }
  &__btn-refresh {
    margin-left: 10px;
    display: inline-block;
  }
  &__card-content {
    width: 100%;
  }
  &__card-title {
    display: inline;
  }
  &__card-header {
    display: flex;
    justify-content: space-between;
  }
  &__card {
    max-width: 400px;
    margin: 0;
    height: fit-content;
    margin-top: 20px;
  }
  &__title {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin: 0;
  }
}
</style>