<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12 col-md-12 ">
        <!-- Error message here (if exist) -->
        <div class="alert alert-danger" role="alert" v-if="error">
          {{ error }}
        </div>
        <!-- Message here (if exist) -->
        <div class="alert alert-success" role="alert" v-if="message">
          {{ message }}
        </div>
        <div class="card">
          <div class="card-header">
            <h5 class="title">Añadir trabajador</h5>
          </div>
          <div class="card-body">
            <form
              @submit.prevent="
                crearUsuario({
                  nombre: nombre,
                  lastname: lastname,
                  username: username,
                  email: email,
                  password: password,
                  role: role
                })
              "
            >
              <div class="row">
                <div class="col-md-6 pr-md-1">
                  <div class="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombre"
                      v-model="nombre"
                    />
                  </div>
                </div>
                <div class="col-md-6 pl-md-1">
                  <div class="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Apellido"
                      v-model="lastname"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 pr-md-1">
                  <div class="form-group">
                    <label>Nombre de usuario</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombre de usuario"
                      v-model="username"
                    />
                  </div>
                </div>
                <div class="col-md-4 px-md-1">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="email@email.com"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="col-md-5 pl-md-1">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 pr-md-1">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1"
                      >Rol de usuario</label
                    >
                    <select
                      class="form-control"
                      id="exampleFormControlSelect1"
                      v-model="role"
                    >
                      <option>admin</option>
                      <option>worker</option>
                      <option>seller</option>
                      <option>invited</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-fill btn-primary float-right"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "newUser",
  data() {
    return {
      nombre: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      role: ""
    };
  },
  methods: {
    ...mapActions(["crearUsuario"])
  },
  computed: {
    ...mapState(["error", "message"])
  }
};
</script>
