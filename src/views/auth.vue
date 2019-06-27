<template>
    <div class="">
        {{registerNewAssistence($route.params.uid)}}
    </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  var firebase = require("firebase/app");
  import db from "../main.js";
  export default {
    name:"auth",
    data(){
      return{

      }
    },
    methods:{
      registerNewAssistence(uid){
        //connect to firebase and insert new data into assistenceList
        firebase.auth().currentUser;
        var datetime = new Date();
        var hours = datetime.getHours();
        var minutes = datetime.getMinutes();
        // Revisar si los trabajadores llegaron temprano
        if(hours <= 8 && minutes <= 0){
          db.collection("assistance").doc().set({id: uid, date: datetime, status: "A tiempo"})
        }else{db.collection("assistance").doc().set({id: uid, date: datetime, status: "Tarde"})}
      }
    }
  }
</script>
<style>
.sidebar, .navbar {
 display: none;
}
</style>