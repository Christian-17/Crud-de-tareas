<template>
  <card>
    <h4 slot="header" class="card-title">Editar Perfil</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Compañia"
                    placeholder="Light dashboard"
                    v-model="user.company">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="text"
                    label="Usuario"
                    placeholder="Username"
                    v-model="user.username">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Correo"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="Primer Nombre"
                    placeholder="First Name"
                    v-model="user.firstName">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="Segundo Nombre"
                    placeholder="Last Name"
                    v-model="user.lastName">
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <base-input type="text"
                    label="Ciudad"
                    placeholder="City"
                    v-model="user.city">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="Pais"
                    placeholder="Country"
                    v-model="user.country">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Acerca de mí</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="Here can be your description"
                      v-model="user.aboutMe">
              </textarea>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          :disabled="loading" 
          @click="updateProfile()"
          class="btn btn-info btn-fill float-right text-nowrap">
          <span v-if="loading" class="spinner-grow spinner-grow-sm text-white"></span>
          <i v-if="!loading" class="bi bi-arrow-repeat mr-1"></i>
          <span v-if="!loading" class="text-nowrap">Actulizar</span>
        </button>
      </div>
    </form>
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
        loading: false,
        user: {
          company: 'No tengo',
          username: 'Christian17',
          email: '',
          firstName: 'Christian',
          lastName: 'Eduardo',
          city: 'Caracas',
          country: 'Venezuela',
          aboutMe: `Innovando con proyectos`
        }
      }
    },
    methods: {
      updateProfile() {
        this.loading = true
        setTimeout (() => {
          this.loading = false
          // alert('Your data: ' + JSON.stringify(this.user))
        }, 3000)

        }
      }
    }
  

</script>
<style>

</style>
