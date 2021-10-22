import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main"},
    component: () => import("../views/Currency.vue"),
  },
  {
    path: "/bill",
    name: "bill",
    meta: { layout: "main"},
    component: () => import("../views/Bill.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
