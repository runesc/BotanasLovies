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
import Firebase from 'firebase'


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
.main-panel{
    background: linear-gradient(#2c3e50, #1e1e24);
    border-top: 2px solid #CDDC39;
}
</style>
