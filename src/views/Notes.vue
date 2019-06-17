<template>
  <div class="content">
    <div class="row">
      <!--Notebook list-->
      <div class="col-lg-12 col-md-12" v-if="notebook">
        <div class="card ">
          <div class="card-header">
            <h4 class="card-title">
              Notas
              <button
                class="float-right btn btn-success btn-round"
                v-on:click="notebook = !notebook"
              >
                <i class="tim-icons icon-paper"></i> Nueva nota
              </button>
            </h4>
          </div>
          <div class="card-body">
            <div class="">
              <table class="table tablesorter" id="">
                <thead class=" text-primary">
                  <tr>
                    <th>Nota</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody v-if="notes">
                  <tr v-for="item in notes" :key="item.id">
                    <td>{{ item.note }}</td>
                    <td>
                      {{
                        new Date(
                          item.datetime.seconds * 1000 +
                            item.datetime.nanoseconds / 1000000
                        ).toUTCString()
                      }}
                    </td>
                    <td>
                      <button
                        class="btn btn-warning btn-round"
                        v-on:click="deleteNote(item.id)"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- add note-->
      <div class="col-lg-12 col-md-12" v-if="notebook === false">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              Nuevo nota
              <button
                class="float-right btn btn-danger btn-round"
                v-on:click="notebook = true"
              >
                <i class="tim-icons icon-paper"></i> Cancelar
              </button>
            </h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="addNote({ note, datetime: new Date() })">
              <div class="row">
                <div class="col-md-6 pr-md-1">
                  <div class="form-group">
                    <label>Nota</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Escribe una entrada"
                      v-model="note"
                    />
                  </div>
                </div>
                <div class="col-md-6 pl-md-1">
                  <div class="form-group">
                    <label>Fecha</label>
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="new Date().toUTCString()"
                      readonly="readonly"
                    />
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-fill btn-success float-right"
                >
                  Guardar entrada
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
  name: "notes",
  data() {
    return {
      notebook: true,
      datetime: "",
      note: ""
    };
  },
  methods: {
    ...mapActions(["addNote", "getNotes", "deleteNote"])
  },
  computed: {
    ...mapState(["notes"])
  },
  created() {
    this.getNotes();
  }
};
</script>
