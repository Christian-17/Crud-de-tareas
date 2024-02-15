<template>
  <ul class="nav nav-mobile-menu">
    <base-dropdown>
      <template slot="title">
        <span class="notification">5 Notificaciones</span>
      </template>
      <a class="dropdown-item" href="#">Notificacion 1</a>
      <a class="dropdown-item" href="#">Notificacion 2</a>
      <a class="dropdown-item" href="#">Notificacion 3</a>
      <a class="dropdown-item" href="#">Notificacion 4</a>
      <a class="dropdown-item" href="#">Otra notificacion</a>
    </base-dropdown>
    <li class="nav-item">
      <a href="#" class="nav-link">
        <i class="nc-icon nc-zoom-split hidden-lg-up"></i>
        <span class="d-lg-none">Buscar</span>
      </a>
    </li>
    <base-dropdown title="Accesibidad">
      <a class="dropdown-item" href="#">Accion</a>
      <a class="dropdown-item" href="#">Otra action</a>
      <a class="dropdown-item" href="#">Algo</a>
      <a class="dropdown-item" href="#">Algo mas aqui</a>
      <hr />
      <a class="dropdown-item" href="#">Link separado</a>
    </base-dropdown>

    <li class="nav-item">
      <a @click="Salir" class="nav-link" href="/login">
        <span class="no-icon">Salir</span>
      </a>
    </li>
  </ul>
</template>
<script>
import store from "../store/index";

export default {
  name: "mobile-menu",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
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
