import Vue from "vue";
import Vuex from "vuex";

// Modules
import auth from "./auth";
import paperBin from "./paperBin";
import tasks from "./tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    paperBin,
    tasks

  },
});
