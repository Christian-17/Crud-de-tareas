import Vue from "vue";
import App from "./App.vue";
import store from './store';

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/js/dist/modal";

import './libs/axios'

// router setup
import router from "./routes/routes";

import "./registerServiceWorker";
Vue.use(LightBootstrap);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
