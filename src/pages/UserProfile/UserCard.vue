<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
    <div class="author">
      <a href="#">
        <img class="avatar border-gray" src="../../../documentation/img/Christian-Perfil.png" alt="Foto Perfil"/>

        <h4 class="title">Christian Perez<br />
          <small>Christian17</small>
        </h4>
      </a>
    </div>
    <p class="description text-center">Quiero un cel nuevo</p>
    <div slot="footer" class="text-center d-flex justify-content-center">
      <a href="https://www.facebook.com/" class="btn btn-simple" target="_blank"><i class="bi bi-facebook"></i></a>
      <a href="https://www.youtube.com/" class="btn btn-simple" target="_blank"><i class="bi bi-youtube"></i></a>
      <a href="https://www.instagram.com/" class="btn btn-simple" target="_blank"><i class="bi bi-instagram"></i></a>
    </div>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      Card
    },
    data () {
      return {
      }
    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      }
    }
  }

</script>
<style>

</style>
