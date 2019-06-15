import Vue from "vue";
import Vuex from "vuex";
// Configurar e iniciar Firebase
var firebase = require("firebase/app");
import router from "./router";

import db from "./main.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    error: "",
    message: "",
    userInfo: "",
    sellers: [],
    stock: [],
    notes: []
  },
  mutations: {
    setUsuario(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setMessage(state, payload) {
      state.message = payload;
    },
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    setSellers(state, sellers) {
      state.sellers = sellers;
    },
    setStock(state, stock) {
      state.stock = stock;
    },
    setNotes(state, note) {
      state.notes = note;
    }
  },
  actions: {
    crearUsuario({ commit }, payload) {
      //console.log(payload) here is all data sended by form ||| res.user.uid = access to uid
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });

          // Crear datos en firestore
          if (payload.role === "seller") {
            db.collection("sellers")
              .doc(res.user.uid)
              .set({ name: payload.nombre + " " + payload.lastname })
              .then(function() {
                commit("setMessage", "Vendedor agregado exitosamente");
              });
          } else {
            db.collection("users")
              .doc(res.user.uid)
              .set({
                name: payload.nombre,
                lastname: payload.lastname,
                username: payload.username,
                role: payload.role
              })
              .then(function() {
                commit("setMessage", "Usuario agregado exitosamente");
              });
          }
        })
        .catch(err => {
          commit("setError", err.message);
        });
    },
    // Try sign in to app and if connection is success then redirect to /home
    userLogin({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUsuario", { email: res.user.email, uid: res.user.uid });
          router.push({ name: "home" });
        })
        .catch(err => {
          commit("setError", err.message);
        });
    },
    // Detect if user is auth
    checkUser({ commit }, payload) {
      if (payload != null) {
        commit("setUsuario", { email: payload.email, uid: payload.uid });
      } else commit("setUsuario", null);
    },
    // Exit session
    signOut({ commit }) {
      firebase.auth().signOut();
      commit("setUsuario", null);
      router.push({ name: "login" });
    },
    // Get User info
    getUserInfo({ commit }) {
      var usr = firebase.auth().currentUser;
      db.collection("users")
        .doc(usr.uid)
        .onSnapshot(function(doc) {
          commit("setUserInfo", doc.data());
        });
    },
    // Get sellers info
    getSellers({ commit }) {
      firebase.auth().currentUser;
      var sellers = [];
      db.collection("sellers")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let tarea = doc.data();
            tarea.id = doc.id;
            sellers.push(tarea);
          });
        });

      commit("setSellers", sellers);
    },
    // get products in stock
    getStock({ commit }) {
      firebase.auth().currentUser;
      var stock = [];
      db.collection("products")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let product = doc.data();
            product.id = doc.id;
            stock.push(product);
          });
        });
      commit("setStock", stock);
    },
    // Add new product to stock
    addNewProduct({ commit }, payload) {
      firebase.auth().currentUser;
      db.collection("products")
        .add(payload)
        .then(function(docRef) {
          commit(
            "setMessage",
            "Se ha guardado un nuevo producto con el ID: " + docRef.id
          );
        });
    },
    // Update or delete product in stock
    storeUD({ commit }, payload) {
      firebase.auth().currentUser;
      // Check if product should be updated or deleted
      if (payload.remove === true) {
        db.collection("products")
          .doc(payload.id)
          .delete()
          .then(function() {
            commit("setMessage", "Producto eliminado correctamente");
          });
      } else if (payload.add === true) {
        var dataForm = payload;
        // Get data from Firebase and save
        db.collection("products")
          .doc(payload.id)
          .get()
          .then(snapshot => {
            delete dataForm["add"];
            delete dataForm["remove"];
            if (dataForm["name"] != snapshot.data().name) {
              dataForm["name"] = snapshot.data().name;
            }
            if (dataForm["code"] != snapshot.data().code) {
              dataForm["code"] = snapshot.data().code;
            }
            if (dataForm["description"] != snapshot.data().description) {
              dataForm["description"] = snapshot.data().description;
            }
            if (dataForm["stock"] != snapshot.data().stock) {
              dataForm["stock"] = snapshot.data().stock;
            }

            // Update
            db.collection("products")
              .doc(payload.id)
              .update(dataForm)
              .then(function() {
                commit("setMessage", "Producto actualizado correctamente");
              });
          });
      }
    },
    addNote(payload) {
      firebase.auth().currentUser;
      db.collection("notes").add({
        note: payload.note,
        datetime: payload.datetime
      });
      location.reload();
    },
    getNotes({ commit }) {
      firebase.auth().currentUser;
      var notes = [];
      db.collection("notes")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let nota = doc.data();
            nota.id = doc.id;
            notes.push(nota);
          });
        });
      commit("setNotes", notes);
    },
    deleteNote(identifier) {
      firebase.auth().currentUser;
      db.collection("notes")
        .doc(identifier)
        .delete();
    }
  },
  getters: {
    userExists(state) {
      if (
        state.user === null ||
        state.user === "" ||
        state.user === undefined
      ) {
        return false;
      } else {
        return true;
      }
    },
    adminExists(state) {
      if (state.userInfo.role === "admin") {
        return true;
      } else {
        return false;
      }
    }
  }
});
