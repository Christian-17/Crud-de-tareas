import axios from "@/libs/axios";
export default {
  state: {
    tasks: {
      tasks: [],
    },
  },
  mutations: {
    GET_TASKS(state, payload) {
      state.tasks = payload;
    },
  },
  actions: {
    getTasksPaperBin({ commit }, params) {
      return new Promise((resolve, reject) => {
        return axios
          .get("api/papelera")
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => reject(error));
      });
    },
    putTasksPaperBin({ commit }, payload) {
        return new Promise((resolve, reject) => {
          axios
            .put(`api/papelera/${payload.id}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      },
      deleteTasksPaperBin({ commit }, payload) {
        return new Promise((resolve, reject) => {
          axios
            .delete(`api/papelera/${payload.id}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      },
      emptyPaperBin({ commit }, params) {
        return new Promise((resolve, reject) => {
          return axios
            .delete("api/papelera")
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => reject(error));
        });
      },
  },
  modules: {},
};
