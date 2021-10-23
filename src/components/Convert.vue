<template>
  <div class="convert convert_block_item">
    <input
      type="number"
      v-model.number="amount"
      id="val"
      placeholder="введите сумму..."
    />
    <span class="select__label">Конвертировать из</span>
    <select
      v-model="convertfrom"
      id="cur1"
      multiple
      class="browser-default select"
    >
      <option
        v-for="(a, index) in currencyfrom"
        v-bind:value="a.name"
        v-bind:key="index"
      >
        {{ a.desc }}
      </option>
    </select>
    <hr />
    <span class="select__label">Конвертировать в</span>
    <select
      v-model="convertto"
      id="cur2"
      multiple
      class="browser-default select"
    >
      <option
        v-for="(a, index) in currencyfrom"
        v-bind:value="a.name"
        v-bind:key="index"
      >
        {{ a.desc }}
      </option>
    </select>
    <hr />
    <span class="blue-text text-darken-3">
      {{ amount.toFixed(5) }} {{ convertfrom[0] }} = {{ finalAmount }}
      {{ convertto[0] }}</span
    >
    <br />
  </div>
</template>

<script>
export default {
  name: "convert",
  props: ["currency"],
  data: () => ({
    currencyfrom: [
      { name: "USD", desc: "US Dollar" },
      { name: "BTC", desc: "Bitcoin" },
      { name: "ETH", desc: "Ethereum" },
    ],
    convertfrom: ["USD"],
    convertto: ["USD"],
    amount: 1,
  }),
  computed: {
    finalAmount: function () {
      let to = this.convertto[0];
      let from = this.convertfrom[0];
      let final;
      switch (from) {
        case "USD":
          if (to == "USD") {
            final = this.amount * 1;
          }
          if (to == "BTC") {
            final = (this.amount * 1) / this.currency["BTC"][13][1];
          }
          if (to == "ETH") {
            final = (this.amount * 1) / this.currency["ETH"][13][1];
          }
          break;
        case "BTC":
          if (to == "USD") {
            final = this.amount * this.currency["BTC"][13][1];
          }
          if (to == "BTC") {
            final = this.amount;
          }
          if (to == "ETH") {
            final =
              (this.amount * this.currency["BTC"][13][1] * 1) /
              this.currency["ETH"][13][1];
          }
          break;
        case "ETH":
          if (to == "USD") {
            final = this.amount * this.currency["ETH"][13][1];
          }
          if (to == "BTC") {
            final =
              (this.amount * this.currency["ETH"][13][1] * 1) /
              this.currency["BTC"][13][1];
          }
          if (to == "ETH") {
            final = this.amount;
          }
          break;
      }
      return final.toFixed(5);
    },
  },
};
</script>

<style lang="scss">
.select {
  height: fit-content;

  &__label {
    line-height: 24px;
  }
}
.convert {
  max-width: 400px;
  min-width: 200px;
  border: 1px solid rgba(0, 0, 0, 0.265);
  padding: 10px;
  margin-top: 20px;
}
</style>