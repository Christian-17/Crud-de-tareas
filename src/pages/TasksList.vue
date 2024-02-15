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
                  Tareas
                  <p class="card-category">
                    Estas son las tareas que has creado!📝🚀
                  </p>
                </h4>
                <button
                  type="button"
                  class="btn bg-info border-0 btn-fill"
                  data-bs-toggle="modal"
                  @click="OpenModal = true"
                >
                  <i class="bi bi-plus-circle"></i>
                  Nueva tarea
                </button>
              </div>
            </template>
            <div class="table-responsive">
              <div v-if="TareasLista.length > 0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Decripcion</th>
                      <th class="justify-content-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr v-for="tarea in TareasLista" :key="tarea._id">
                      <td>{{ tarea._id }}</td>
                      <td>{{ tarea.nombre }}</td>
                      <td>{{ tarea.descripcion }}</td>
                      <td class="justify-content-end">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn bg-info border-0 btn-fill btn-sm"
                            @click="editTask(tarea)"
                          >
                            <i class="bi bi-pencil-square"></i>
                          </button>

                          <button
                            type="button"
                            class="btn bg-danger border-0 btn-fill btn-sm"
                            @click="deleteTasks(tarea)"
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
                  NO HAY TAREAS
                </p>
              </div>
            </div>

            <div class="" v-if="OpenModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      {{ isEdit ? "Editar tarea" : "Nueva tarea" }}
                    </h5>
                    <button
                      type="button"
                      class="bg-info border-0 rounded-pill"
                      @click="OpenModal = false"
                    >
                      <i class="bi bi-x-lg text-white"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="Tasks">
                      <div class="form-group">
                        <label class="mb-2 ms-2">Nombre</label>
                        <input
                          v-model="dataTasks.nombre"
                          type="text"
                          placeholder="Name"
                          required=""
                          class="form-control px-3"
                        />
                      </div>
                      <div class="form-group">
                        <label class="mb-2 ms-2">Descripcion</label>
                        <input
                          v-model="dataTasks.descripcion"
                          type="text"
                          placeholder="Description"
                          required=""
                          class="form-control px-3"
                        />
                      </div>
                      <div class="ml-1 pt-3">
                        <button
                          :disabled="loadingData"
                          class="btn bg-info border-0 btn-fill float-right"
                        >
                          <span
                            v-if="loadingData"
                            class="spinner-grow spinner-grow-sm text-white"
                          ></span>
                          <i
                            v-if="!loadingData"
                            class="bi bi-plus-circle mr-1"
                          ></i>
                          <span v-if="!loadingData">{{
                            isEdit ? "Actualizar" : "Crear"
                          }}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
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
      loadingData: false,
      isEdit: false,
      OpenModal: false,
      TareasLista: null,
      dataTasks: {
        nombre: "",
        descripcion: "",
      },
    };
  },
  methods: {
    async getTasks() {
      try {
        const res = await store.dispatch("getTasks");
        this.TareasLista = res.tarea;
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
    async Tasks() {
      try {
        this.loadingData = true;
        const data = {
          id: this.dataTasks._id,
          nombre: this.dataTasks.nombre,
          descripcion: this.dataTasks.descripcion,
        };
        let res = null;
        if (this.isEdit) {
          res = await store.dispatch("putTasks", data);
        } else {
          res = await store.dispatch("postTasks", data);
        }

        if (res.status === 200) {
          if (this.isEdit) {
            this.$notifications.notify({
              message: `Tarea: "${data.nombre}" actualizada con exito`,
              icon: "bi bi-check-square-fill",
            });
          } else {
            this.$notifications.notify({
              message: `Tarea: "${data.nombre}" creada con exito`,
              icon: "bi bi-check-square-fill",
            });
          }
          this.isEdit = false;
          this.OpenModal = false;
          this.getTasks();
        }
      } catch (error) {
        if (error) {
          this.$notifications.notify({
            message: "Hubo un problema",
            icon: "bi bi-exclamation-triangle-fill",
          });
        }
      } finally {
        this.loadingData = false;
      }
    },
    async deleteTasks(task) {
      try {
        this.dataTasks = task;
        const data = {
          id: this.dataTasks._id,
          nombre: this.dataTasks.nombre,
        };
        const res = await store.dispatch("deleteTasks", data);
        if (res.status === 200) {
          this.$notifications.notify({
            message: `Tarea: "${data.nombre}" eliminada`,
            icon: "bi bi-check-square-fill",
          });
        }
        this.getTasks();
      } catch (error) {
        if (error) {
          this.$notifications.notify({
            message: "Error al eliminar la tarea",
            icon: "bi bi-x-circle-fill",
          });
        }
      }
    },
    editTask(task) {
      this.dataTasks = task;
      this.isEdit = true;
      this.OpenModal = true;
    },
  },
  mounted() {
    this.getTasks();
  },
};
</script>
