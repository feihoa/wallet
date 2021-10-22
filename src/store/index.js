import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },

  actions: {
    async fetchCurrency() {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum&vs_currencies=usd`
      );
      return await res.json();
    },
    async fetchBTC() {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily`
      );
      const BTC = res.json();
      return await BTC;
    },
    async fetchETH() {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily`
      );
      const ETH = res.json();
      return await ETH;
    },
  },
  getters: {
    error: (s) => s.error,
  },
});
