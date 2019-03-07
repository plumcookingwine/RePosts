import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routers from "./router/index";
import axios from "axios";

Vue.use(VueRouter);
Vue.prototype.$axios = axios;

const router = new VueRouter({
  routes: routers
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
