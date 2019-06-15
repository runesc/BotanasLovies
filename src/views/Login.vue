<template>
  <div class="content">
    <div class="container" v-if="adminExists == false">
      <div class="col-lg-4 col-md-6 ml-auto mr-auto login">
        <div class="card card-lock card-white text-center">
          <div class="card-header">
            <img src="http://lorempixel.com/400/400/" alt="" />
          </div>
          <div class="alert alert-danger login-alert" role="alert" v-if="error">
            {{ error }}
          </div>
          <div class="card-body">
            <form @submit.prevent="userLogin({ email, password })">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  v-model="password"
                />
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-round btn-primary btn-lg">
                  Iniciar sesión
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
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["userLogin"])
  },
  computed: {
    ...mapState(["error"]),
    ...mapGetters(["userExists", "adminExists"])
  }
};
</script>

<style scoped>
.main-panel > .content {
  padding: 0 !important;
}
.card-lock .card-header img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: -60px;
  -webkit-box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
}
.login {
  position: relative;
  top: 50%;
  transform: translateY(50%);
}
.login-alert {
  margin-top: 1em;
}
</style>
