<template>
  <div class="app">
    <div class="wrapper">
      <SidebarComponent></SidebarComponent>
      <div class="main-panel ps">
        <AppNavigation></AppNavigation>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import AppNavigation from "@/components/AppNavigation.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";

export default {
  name: "home",
  components: {
    AppNavigation,
    SidebarComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-panel {
  background: linear-gradient(#2c3e50, #1e1e24);
  border-top: 2px solid #cddc39;
}
.btn-primary.active,
.btn-primary.btn-simple.active {
  background-image: linear-gradient(
    to bottom left,
    #cddc39,
    #8bc34a
  ) !important;
  border-color: #8bc34a !important;
}
.btn-primary.btn-simple.active:hover,
.btn-primary.btn-simple.active:focus {
  background-image: linear-gradient(
    to bottom left,
    #cddc39,
    #8bc34a
  ) !important;
}
.btn-primary.btn-simple,
.btn-primary.btn-simple:hover,
.btn-primary.btn-simple:active,
.btn-primary.btn-simple:not(:disabled):not(.disabled):active,
.btn-primary.btn-simple:focus {
  color: #8bc34a;
  border-color: #8bc34a;
}
.btn-primary.btn-simple.active:active,
.btn-primary.btn-simple.active:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active {
  background: #8bc34a !important;
  border-color: #8bc34a !important;
}
.text-danger {
  color: tomato !important;
}
.text-warning {
  color: #fbc531 !important;
}
</style>
