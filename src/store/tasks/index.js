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
    getTasks({ commit }, params) {
      return new Promise((resolve, reject) => {
        return axios
          .get("api/tareas")
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => reject(error));
      });
    },
    postTasks({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("api/tareas", payload)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    putTasks({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(`api/tareas/${payload.id}`, payload)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    deleteTasks({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`api/tareas/${payload.id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
  modules: {},
};
