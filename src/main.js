import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Configurar e iniciar Firebase
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyAILrCEtjEfUkHx6QkYADHsWgMW9Jt2zSc",
  authDomain: "botanas-lovies.firebaseapp.com",
  databaseURL: "https://botanas-lovies.firebaseio.com",
  projectId: "botanas-lovies",
  storageBucket: "botanas-lovies.appspot.com",
  messagingSenderId: "371229668393"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("checkUser", { email: user.email, uid: user.uid });
  } else {
    store.dispatch("checkUser", null);
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
