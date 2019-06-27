<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12 col-md-12" v-if="mainView">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">
              Vendedores
              <button
                class="float-right btn btn-success"
                v-if="seller"
                v-on:click="mainView = !mainView; newOrderView = true"
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
                        mainView = !mainView;
                        ordersBySellerAndDate = true;
                        newOrderView = false
                        seller = item;
                        getOrdersBySellerAndDate(seller);
                      "
                    >
                      <button class="btn btn-warning">Ver pedidos</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--Nuevo pedido-->
      <div class="col-lg-12 col-md-12" v-if="mainView === false && newOrderView === true">
        <!-- Formulario para añadir stock -->
        <div class="card">
          <div class="card-header">
            <h4 class="title">
              Nuevo pedido
              <button
                class="float-right btn btn-danger"
                v-on:click="mainView = !mainView"
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
                    <td class="text-center">${{ item.price }}</td>
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
              <button
                v-on:click="uploadChanges"
                class="btn btn-success float-right"
              >
                Guadar pedido
              </button>
              <button class="btn btn-danger float-right"v-on:click="refresh">Terminar y volver</button>
            </div>
          </div>
        </div>
      </div>
      <!--Pedidos realizados por el vendedor por fecha-->
      {{ processData(toFilter) }}
      <div class="col-lg-12 co-md-12" v-if="mainView === false && ordersBySellerAndDate === true">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">
              Pedidos de {{ seller.name }}
              <button
                class="float-right btn btn-danger"
                v-if="adminExists"
                v-on:click="
                  mainView = !mainView;
                  ordersBySellerAndDate = false;
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
                    <th>Numero de pedido</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in processedData" :key="item.id">
                    <td v-on:click="ordersBySellerAndDate = false; orderByDay = true; getOrderBySeller(seller, item.orderID, item.datetime);
                    ">
                      {{ item.orderID }}
                    </td>
                    <td v-on:click="ordersBySellerAndDate = false; orderByDay = true; getOrderBySeller(seller, item.orderID, item.datetime);
                    ">
                      {{
                        new Date(
                          item.datetime.seconds * 1000 +
                            item.datetime.nanoseconds / 1000000
                        ).toLocaleString("es-MX", {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric"
                        }) +
                          " a las: " +
                          new Date(
                            item.datetime.seconds * 1000 +
                              item.datetime.nanoseconds / 1000000
                          ).toLocaleString("es-MX", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                          })
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--Pedido realizado por el usuario X el día Y a la hora Z-->
      <div class="col-lg-12 col-md-12" v-if="mainView === false && orderByDay === true">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">          
              Orden de {{seller.name}} del día {{orderDatetime}}
              <button
                class="float-right btn btn-danger" v-on:click="ordersBySellerAndDate = true; orderByDay = false">
                <i class="tim-icons icon-minimal-left"></i> Volver
              </button>
            </h4>
          </div>
          <div class="card-body">
            <div class="">
              <table class="table tablesorter" id="">
                <thead class=" text-primary">
                  <tr>
                    <th>Nombre del producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="item in itemsInOrderByDay" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.itemQuantity }}</td>
                  </tr>
                <tr>
                  <td><h3>Total: ${{getTotal()}}</h3></td>
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
      mainView: true, // enable main view
      newOrderView: false,
      ordersBySellerAndDate: false,
      orderByDay: false,
      x: 0, // enable new order
      seller: "", // seller info here
      stock: [], // here are all products
      inOrder: [], // save here all orders
      formActualizar: true, // enable edit form
      idActualizar: -1, // id del item seleccionado
      updateQuantity: "", // save items quantity
      total: 0, // order total
      orderID: Math.random()
        .toString(26)
        .substring(2), // order id
      toFilter: [],
      processedData: [],
      orderDatetime: '',
      itemsInOrderByDay: [],
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
      db.collection("products").orderBy("pos", "asc")
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
      // Update quantity and push it in inOrder
      this.formActualizar = false;
      this.stock[identifier].quantity = this.updateQuantity;
      this.inOrder.push(this.stock[identifier]); // sa
    },
    // check if values are repeated and if so, update every one of them and finaly load the data into firebase
    uploadChanges() {
      var sellerID = this.seller.id;
      var orderID = this.orderID;
      var grades = {};
      this.inOrder.forEach(function(item) {
        var grade = (grades[item.id] = grades[item.id] || {});
        grade["name"] = item.name;
        grade["itemID"] = item.id;
        grade["price"] = item.price;
        grade["itemQuantity"] = item.quantity;
        grade["seller"] = sellerID;
        grade["datetime"] = new Date();
        grade["orderID"] = orderID;
      });

      // Iterate grades and upload to firebase
      for (var x in grades) {
        db.collection("orders")
          .doc()
          .set(grades[x]);
      }
    },
    // Get all sells from firebase (for X seller)
    getOrdersBySellerAndDate(sellerInfo) {
      firebase.auth().currentUser;
      let orders = [];
      db.collection("orders")
        .where("seller", "==", sellerInfo.id).orderBy("datetime", "desc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            orders.push(item);
          });
        });
      this.toFilter = orders;
    },
    processData(data_) {
      var processedData = [];
      var grades = {};
      data_.forEach(function(item) {
        var grade = (grades[item.orderID] = grades[item.orderID] || {});
        grade["orderID"] = item.orderID;
        grade["datetime"] = item.datetime;
      });

      // Iterate grades and upload to firebase
      for (var x in grades) {
        processedData.push(grades[x]);
      }
      this.processedData = processedData;
    },
    getOrderBySeller(seller, orderID, datetime){
      let itemInOrder = [];
      this.orderDatetime = new Date(datetime.seconds * 1000 + datetime.nanoseconds / 1000000).toLocaleString("es-MX", {month: "numeric",day: "numeric",year: "numeric"})
      db.collection("orders").where("orderID", "==", orderID)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            itemInOrder.push(item)
          });
        });
        this.itemsInOrderByDay = itemInOrder;
    },
    getTotal(){
      var total = 0;
      for (var x in this.itemsInOrderByDay){
      total += parseFloat(parseFloat(this.itemsInOrderByDay[x].price * parseInt(this.itemsInOrderByDay[x].itemQuantity)).toFixed(2))
     }
     return parseFloat(total).toFixed(2);
    },
    refresh(){
      window.location.reload()
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
