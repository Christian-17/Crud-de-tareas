<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-7 d-none d-md-flex bg-image"></div>

      <!-- The content half -->
      <div class="col-md-5 contenedor">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container">
            <div class="col-lg-10 col-xl-7 mx-auto">
              <!-- <h3 class="display-4 text-center mb-4">Iniciar Seccion</h3> -->
              <form @submit.prevent="authLogin">
                <div class="form-group mb-2">
                  <label class="mb-2 ms-2">Usuario</label>
                  <input
                    v-model="username"
                    type="text"
                    placeholder="User"
                    required=""
                    autofocus=""
                    class="form-control rounded-pill border-0 shadow-sm px-4"
                  />
                </div>
                <div class="form-group mb-4">
                  <label class="mb-2 ms-2">Contraseña</label>
                  <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required=""
                    class="form-control rounded-pill border-0 shadow-sm px-4 text-info"
                  />
                </div>
                <button
                  :disabled="loading"
                  type="submit"
                  class="col-12 btn btn-info btn-block mb-2 rounded-pill shadow-sm"
                >
                  <span
                    v-if="loading"
                    class="spinner-grow spinner-grow-sm text-info"
                  ></span>
                  <span v-if="!loading" class="text-nowrap">Ingresar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- End -->
      </div>
    </div>
    <!-- End -->
  </div>
</template>

<script>
import store from "../store/index";

export default {
  data() {
    return {
      loading: false,
      username: "Christian",
      password: "12345678",
      err_msg: "",
    };
  },
  methods: {
    async authLogin() {
      try {
        this.loading = true;

        const loginData = {
          username: this.username,
          password: this.password,
        };
        const res = await store.dispatch("authLogin", loginData);

        if (res.status === 200) {
          this.$notifications.notify({
            message: `Bienvenido: ${this.username}`,
            icon: "bi bi-check-square-fill",
          });
        }
      } catch (error) {
        this.err_msg = error.response.data.msg;
        if (error.response.status === 400 || error.response.status === 401) {
          this.$notifications.notify({
            message: this.err_msg,
            icon: "bi bi-x-circle-fill",
          });
        } else {
          this.$notifications.notify({
            message: "hay un error con la conexcion",
            icon: "bi bi-exclamation-triangle-fill",
          });
        }
      }
      finally{
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.contenedor {
  background: rgba(235, 235, 235, 0.998);
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url("https://bootstrapious.com/i/snippets/sn-page-split/bg.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
