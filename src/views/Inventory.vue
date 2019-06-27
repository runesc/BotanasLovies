<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12 col-md-12" v-if="list">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">
              Inventario
              <button
                class="float-right btn btn-danger btn-round"
                v-if="adminExists && edit"
                v-on:click="
                  editView = !editView;
                  list = false;
                "
              >
                <i class="tim-icons icon-pencil"></i> Editar
              </button>
              <button
                class="float-right btn btn-success btn-round"
                v-if="adminExists"
                v-on:click="list = !list"
              >
                <i class="tim-icons icon-paper"></i> Añadir producto
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
                      ${{ item.price }}
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
      <!--Add new product-->
      <div
        class="col-lg-12 col-md-12"
        v-if="list == false && editView == false"
      >
        <div class="alert alert-success" role="alert" v-if="message">
          {{ message }}
        </div>
        <div class="card">
          <div class="card-header">
            <h5 class="title">Nuevo producto</h5>
          </div>
          <div class="card-body">
            <form id="myForm" 
              @submit.prevent="
                addNewProduct({
                  name,
                  code,
                  id: '',
                  description,
                  stock: inStock,
                  category,
                  price
                });
              "
            >
              <div class="row">
                <div class="col-md-6 pr-md-1">
                  <div class="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="Nombre del producto"
                      v-model="name"
                    />
                  </div>
                </div>
                <div class="col-md-6 pl-md-1">
                  <div class="form-group">
                    <label>codigo</label>
                    <input
                      type="number"
                      class="form-control"
                      name="code"
                      placeholder="Codigo del producto"
                      v-model="code"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pr-md-1">
                  <div class="form-group">
                    <label>Descripción</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombre de usuario"
                      v-model="description"
                    />
                  </div>
                </div>
                <div class="col-md-3 px-md-1">
                  <div class="form-group">
                    <label>En stock</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Ingresa una cantidad"
                      v-model="inStock"
                    />
                  </div>
                </div>
                <div class="col-md-3 pl-md-1">
                  <label for="exampleFormControlSelect1">Categoría</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    v-model="category"
                  >
                    <option>x</option>
                    <option>y</option>
                    <option>z</option>
                    <option>a</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 pr-md-1">
                  <div class="form group">
                    <label>Precio</label>
                   <input
                      type="text"
                      class="form-control"
                      placeholder="Precio del producto"
                      v-model="price"
                    />
                  </div>
                </div>
              </div>              
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-fill btn-success float-right"
                >
                  Agregar

                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!--Edit a product-->
      <div class="col-lg-12 col-md-12" v-if="editView">
        <div class="alert alert-success" role="alert" v-if="message">
          {{ message }}
          <div class="float-right">
            <button
              class="btn btn-fill btn-success"
              v-on:click="editView = !editView; list = true"
            >
              Volver
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5 class="title">Editar producto</h5>
          </div>
          <div class="card-body">
            <form
              @submit.prevent="
                storeUD({
                  name,
                  code,
                  description,
                  stock: inStock,
                  add,
                  remove,
                  id: productStock.id,
                  price
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
                      :placeholder="productStock.name"
                      v-model="name"
                    />
                  </div>
                </div>
                <div class="col-md-6 pl-md-1">
                  <div class="form-group">
                    <label>codigo</label>
                    <input
                      type="number"
                      class="form-control"
                      :placeholder="productStock.code"
                      v-model="code"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pr-md-1">
                  <div class="form-group">
                    <label>Descripción</label>
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="productStock.description"
                      v-model="description"
                    />
                  </div>
                </div>
                <div class="col-md-3 px-md-1">
                  <div class="form-group">
                    <label>En stock</label>
                    <input
                      type="number"
                      class="form-control"
                      :placeholder="productStock.stock"
                      v-model="inStock"
                    />
                    <input type="hidden" v-model="add" />
                    <input type="hidden" v-model="remove" />
                    <input type="hidden" v-model="productStock.id" />
                  </div>
                </div>
                <div class="col-md-3 px-md-1">
                  <div class="form-group">
                    <label>precio</label>
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="productStock.price"
                      v-model="price"
                    />
                  </div>
                </div>                
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-fill btn-success float-right"
                  v-on:click="add = true"
                >
                  Agregar
                </button>
                <button
                  type="submit"
                  class="btn btn-fill btn-danger float-right"
                  v-on:click="remove = true"
                >
                  Eliminar
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
  name: "inventory",
  data() {
    return {
      list: true,
      edit: false,
      editView: false,
      productStock: "",
      add: false,
      remove: false,
      // Nuevo producto
      name: "",
      code: "",
      description: "",
      inStock: "",
      category: ""
    };
  },
  methods: {
    ...mapActions(["getStock", "addNewProduct", "storeUD"])
  },
  computed: {
    ...mapState(["stock", "error", "message"]),
    ...mapGetters(["adminExists"])
  },
  created() {
    this.getStock();
  }
};
</script>
