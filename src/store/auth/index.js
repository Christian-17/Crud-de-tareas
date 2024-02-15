import axios from "@/libs/axios";
import router from "../../routes/routes";
export default {
  state: {
    token: "",
    usuario: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    authLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("api/login", payload)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("expiresIn", response.data.expiresIn);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.usuario)
            );
            axios.defaults.headers.common["Authorization"] =
              response.data.token;
              router.push({ name: "ListaTareas" });
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    cerrarSesion({ commit }) {
      commit("setToken", "");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("expiresIn");
      router.push({ name: "login" });
    },
  },
  getters: {},
};
