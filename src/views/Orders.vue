<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12 col-md-12" v-if="seen">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">
              Vendedores
              <button
                class="float-right btn btn-danger btn-round"
                v-on:click="edit = !edit"
                v-if="adminExists"
              >
                <i class="tim-icons icon-pencil"></i> Editar
              </button>
              <button
                class="float-right btn btn-success btn-round"
                v-if="seller"
                v-on:click="seen = !seen"
              >
                <i class="tim-icons icon-paper"></i> Nuevo pedido
              </button>
            </h4>
          </div>
          <div class="card-body">
            <div class="">
              <table class="table tablesorter" id="">
                <thead class=" text-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>UID</th>
                    <th v-if="adminExists">Pedidos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in sellers" :key="item.id">
                    <td v-on:click="seller = item">{{ item.name }}</td>
                    <td v-on:click="seller = item">{{ item.id }}</td>
                    <td
                      v-if="adminExists"
                      v-on:click="
                        x = true;
                        seen = false;
                        seller = item;
                      "
                    >
                      (Ver pedidos)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--Nuevo pedido-->
      <div class="col-lg-12 col-md-12" v-if="seen === false && x === false">
        <!-- Formulario para añadir stock -->
        <div class="card">
          <div class="card-header">
            <h4 class="title">
              Nuevo pedido
              <button
                class="float-right btn btn-danger"
                v-on:click="seen = !seen"
              >
                Cancelar
              </button>
            </h4>
          </div>
          <div class="card-body">
            <div class="">
              <table class="table tablesorter" id="">
                <thead class=" text-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Descripcion</th>
                    <th class="text-center">Precio</th>
                    <th class="text-center">Cantidad</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in stock" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.description }}</td>
                    <td class="text-center">{{ item.price }}</td>
                    <td class="text-center">
                      <span v-if="formActualizar && idActualizar == index">
                        <!-- Formulario para actualizar -->
                        <input
                          v-model="updateQuantity"
                          type="number"
                          class="form-control"
                        />
                      </span>
                      <span v-else>{{ item.quantity }}</span>
                    </td>
                    <td class="text-center">
                      <!-- Botón para guardar la información actualizada -->
                      <span v-if="formActualizar && idActualizar == index">
                        <button
                          v-on:click="saveUpdate(index)"
                          class="btn btn-success"
                        >
                          Guardar
                        </button>
                      </span>
                      <span v-else>
                        <!-- Botón para mostrar el formulario de actualizar -->
                        <button
                          v-on:click="seeFormUpdate(index)"
                          class="btn btn-warning"
                        >
                          Actualizar
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h3>Total: ${{ total }}</h3>
              <button
                v-on:click="uploadChanges"
                class="btn btn-success float-right"
              >
                Guadar pedido
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--Pedidos realizados por vendedor-->
      <div class="col-lg-12 co-md-12" v-if="x">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">
              Pedidos de {{ seller.name }}
              <button
                class="float-right btn btn-danger btn-round"
                v-if="adminExists"
                v-on:click="
                  seen = true;
                  x = false;
                "
              >
                <i class="tim-icons icon-minimal-left"></i> Volver
              </button>
            </h4>
          </div>
          <div class="card-body">
            <div class="">
              <table class="table tablesorter" id="">
                <thead class=" text-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Codigo</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th class="text-center">Precio</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in stock" :key="item.id">
                    <td
                      v-on:click="
                        productStock = item;
                        edit = true;
                      "
                    >
                      {{ item.name }}
                    </td>
                    <td
                      v-on:click="
                        productStock = item;
                        edit = true;
                      "
                    >
                      {{ item.code }}
                    </td>
                    <td
                      v-on:click="
                        productStock = item;
                        edit = true;
                      "
                    >
                      {{ item.description }}
                    </td>
                    <td
                      v-on:click="
                        productStock = item;
                        edit = true;
                      "
                    >
                      {{ item.stock }}
                    </td>
                    <td
                      class="text-center"
                      v-on:click="
                        productStock = item;
                        edit = true;
                      "
                    >
                      {{ item.price }}
                    </td>
                    <td
                      v-on:click="
                        productStock = item;
                        edit = true;
                      "
                    >
                      {{ item.category }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
var firebase = require("firebase/app");
import db from "../main.js";
export default {
  name: "orders",
  data() {
    return {
      seen: true,
      edit: false,
      modal: false,
      x: false,
      seller: "",
      stock: [], // here are all products
      inOrder: [], // save here all orders
      formActualizar: true,
      idActualizar: -1,
      updateQuantity: "",
      total: 0
    };
  },
  computed: {
    ...mapState(["user", "sellers"]),
    ...mapGetters(["userExists", "adminExists"])
  },
  methods: {
    ...mapActions(["getSellers"]),
    // Get all products in stock
    getElementsInStock() {
      let elements = [];
      firebase.auth().currentUser;
      db.collection("products")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let element = doc.data();
            element.id = doc.id;
            elements.push(element);
          });
        });
      this.stock = elements;
    },
    // Open update form
    seeFormUpdate(id) {
      this.idActualizar = id;
      this.updateQuantity = this.stock[id].quantity;
      this.formActualizar = true;
    },
    // if click save button remember data
    saveUpdate(identifier) {
      this.formActualizar = false;
      this.stock[identifier].quantity = this.updateQuantity;
      //this.total += Number(this.stock[identifier]["price"] *  this.updateQuantity)
      // Save changes on inOrder
      this.inOrder.push({
        name: this.stock[identifier]["name"],
        itemID: this.stock[identifier]["id"],
        price: this.stock[identifier]["price"],
        itemQuantity: this.stock[identifier]["quantity"],
        sellerID: this.seller["id"],
        sellerName: this.seller["name"],
        datetime: new Date()
      });
    },
    // Upload data to firebase
    uploadChanges() {
      firebase.auth().currentUser;
      const seller = this.seller["id"];
      let randomID = Math.random()
        .toString(26)
        .substring(2);
      // Get each item and check for equal items
      this.inOrder.forEach(function(element) {
        // TEST -> ID del vendedor -> ID pedido (cosnt random) > Lista de items (Random) > datos
        db.collection("orders")
          .doc(seller)
          .collection(randomID)
          .doc(element.itemID)
          .set(element)
          .then(function() {
            location.reload();
          });
      });
    }
  },
  // On init run these methods
  created() {
    this.getSellers();
    this.getElementsInStock();
  }
};
</script>
<style scoped>
hr {
  background: hsla(0, 0%, 100%, 0.1);
}
h3 {
  margin: 0;
  position: absolute;
  margin-top: 0.3em;
}
</style>
