<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button
        type="button"
        class="navbar-toggler navbar-toggler-left"
        :class="{ toggled: $sidebar.showSidebar }"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse text-white justify-content-start">
        <ul class="nav navbar-nav mr-auto">
          <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Notificacion 1</a>
            <a class="dropdown-item" href="#">Notificacion 2</a>
            <a class="dropdown-item" href="#">Notificacion 3</a>
            <a class="dropdown-item" href="#">Notificacion 4</a>
            <a class="dropdown-item" href="#">Otra notificacion</a>
          </base-dropdown>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class=" d-lg-block">&nbsp;Buscar</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <base-dropdown title="Accesibidad">
            <a class="dropdown-item" href="#">Accion</a>
            <a class="dropdown-item" href="#">Otra accion</a>
            <a class="dropdown-item" href="#">Algo</a>
            <a class="dropdown-item" href="#">Otra accion</a>
            <a class="dropdown-item" href="#">Algo</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Link apartado</a>
          </base-dropdown>
          <li class="nav-item">
            <a @click="Salir" href="/login" class="nav-link">Salir</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import store from "../store/index";
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      loading: false,
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    async Salir() {
      try {
        await store.dispatch("cerrarSesion");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
