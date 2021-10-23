import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Loader from "@/components/app/Loader";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.component("Loader", Loader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

