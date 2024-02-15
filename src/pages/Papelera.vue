<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <!-- <span v-show="loading" class="spinner-grow bg-info"></span> -->
            <template slot="header">
              <div class="btn-toolbar justify-content-between mb-2">
                <h4 class="card-title">
                  Papelera
                  <p class="card-category">
                    Estas son las tareas que has eliminado!📝🚀
                  </p>
                </h4>
                <button
                  :disabled="loading"
                  type="button"
                  class="btn bg-danger border-0 btn-fill"
                  @click="EmptyPaperBin()"
                >
                <span
                  v-if="loading"
                  class="spinner-grow spinner-grow-sm text-white"
                ></span>
                  <i v-if="!loading" class="bi bi-x-circle mr-1"></i>
                  <span v-if="!loading">Vaciar</span>
                </button>
              </div>
            </template>
            <div class="table-responsive">
              <div v-if="TareasListaPapelera.length > 0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Decripcion</th>
                      <th class="justify-content-end">Aciones</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr v-for="tarea in TareasListaPapelera" :key="tarea._id">
                      <td>{{ tarea._id }}</td>
                      <td>{{ tarea.nombre }}</td>
                      <td>{{ tarea.descripcion }}</td>
                      <td class="justify-content-end">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn bg-info border-0 btn-fill btn-sm"
                            @click="putTasksPaperBin(tarea)"
                          >
                            <i class="bi bi-reply"></i>
                          </button>

                          <button
                            type="button"
                            class="btn bg-danger border-0 btn-fill btn-sm"
                            @click="deleteTasksPaperBin(tarea)"
                          >
                            <i class="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <p class="text-center text-secondary mt-5 mb-5">
                  NO HAY TAREAS ELIMINADAS
                </p>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import store from "@/store";
import router from "../routes/routes";
export default {
  components: {
    Card,
  },
  data() {
    return {
      loading: false,
      TareasListaPapelera: null,
    };
  },
  methods: {
    async getTasksPaperBin() {
      try {
        const res = await store.dispatch("getTasksPaperBin");
        this.TareasListaPapelera = res.tarea;
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          this.$notifications.notify({
            message: "Hubo un problema",
            icon: "bi bi-exclamation-triangle-fill",
          });
        }
      }
    },
    async putTasksPaperBin(task) {
      try {
        this.TareasListaPapelera = task;
        const data = {
          id: this.TareasListaPapelera._id,
          nombre: this.TareasListaPapelera.nombre,
        };
        const res = await store.dispatch("putTasksPaperBin", data);
        if (res.status === 200) {
          this.$notifications.notify({
            message: `Tarea: "${data.nombre}" restuarada`,
            icon: "bi bi-check-square-fill",
          });
        }
      } catch (error) {
        if (error) {
          this.$notifications.notify({
            message: "Error al restaurar la tarea",
            icon: "bi bi-x-circle-fill",
          });
        }
      }
      this.getTasksPaperBin();
    },
    async deleteTasksPaperBin(task) {
      try {
        this.TareasListaPapelera = task;
        const data = {
          id: this.TareasListaPapelera._id,
          nombre: this.TareasListaPapelera.nombre,
        };
        const res = await store.dispatch("deleteTasksPaperBin", data);
        if (res.status === 200) {
          this.$notifications.notify({
            message: `Tarea: "${data.nombre}" elminada`,
            icon: "bi bi-check-square-fill",
          });
        }
      } catch (error) {
        if (error) {
          this.$notifications.notify({
            message: "Error al elminar la tarea",
            icon: "bi bi-x-circle-fill",
          });
        }
      }
      this.getTasksPaperBin();
    },
    async EmptyPaperBin() {
      try {
        const res = await store.dispatch("emptyPaperBin");
        this.TareasListaPapelera = res.tarea;    
        if (res.tarea.acknowledged = true) {
          this.$notifications.notify({
            message: `Papelera vacia`,
            icon: "bi bi-check-square-fill",
          });
        }
      } catch (error) {
        if (error) {
          this.$notifications.notify({
            message: "Hubo un problema",
            icon: "bi bi-exclamation-triangle-fill",
          });
        }
      }
    },
  },
  mounted() {
    this.getTasksPaperBin();
  },
};
</script>
