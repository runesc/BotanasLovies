<template>
  <div class="noclass" v-if="userExists">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
      <div class="container-fluid">
        <div class="navbar-wrapper">
          <div class="navbar-toggle d-inline">
            <button type="button" class="navbar-toggler">
              <span class="navbar-toggler-bar bar1"></span>
              <span class="navbar-toggler-bar bar2"></span>
              <span class="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <a class="navbar-brand" href="javascript:void(0)">
            <router-link :to="{ path: '/home' }">
              <p>Botanas lovie´s</p>
            </router-link>
          </a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
        <div class="collapse navbar-collapse" id="navigation">
          <ul class="navbar-nav ml-auto">
            <li class="search-bar input-group">
              <button
                class="btn btn-link"
                id="search-button"
                data-toggle="modal"
                data-target="#searchModal"
              >
                <i class="tim-icons icon-zoom-split"></i>
                <span class="d-lg-none d-md-block">Buscar</span>
              </button>
            </li>
            <li class="dropdown nav-item">
              <a
                href="javascript:void(0)"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-bell-55"></i>
                <p class="d-lg-none">
                  Notificaciones
                </p>
              </a>
              <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
                <!--Repeat this li item -->
                <li class="nav-link">
                  <a href="#" class="nav-item dropdown-item"
                    >lorem impsum dolor sit amet</a
                  >
                </li>
              </ul>
            </li>
            <li class="dropdown nav-item">
              <a class="dropdown-toggle nav-link" data-toggle="dropdown">
                <div class="photo">
                  <img
                    src="https://demos.creative-tim.com/black-dashboard/assets/img/anime3.png"
                    alt="Profile Photo"
                  />
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">
                  Cerrar sesión
                </p>
              </a>
              <ul class="dropdown-menu dropdown-navbar">
                <li class="nav-link">
                  <a
                    href="javascript:void(0)"
                    class="nav-item dropdown-item"
                    @click="signOut"
                    >Cerrar sesión</a
                  >
                </li>
              </ul>
            </li>
            <li class="separator d-lg-none"></li>
          </ul>
        </div>
      </div>
    </nav>
    <div
      class="modal modal-search fade"
      id="searchModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="searchModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Buscar"
            />
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Navbar -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "AppNavigation",
  methods: {
    ...mapActions(["getUserInfo", "signOut"])
  },
  computed: {
    ...mapState(["user", "userInfo"]),
    ...mapGetters(["userExists"])
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style scoped></style>
