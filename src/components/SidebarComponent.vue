<template>
	<!--Sidebar-->
	<div class="sidebar" v-if="userExists">

	  <div class="sidebar-wrapper">
		<div class="logo">
		  <a href="javascript:void(0)" class="simple-text logo-mini">
			{ User.initials }
		  </a>
		  <a href="javascript:void(0)" class="simple-text logo-normal">
			{{userInfo.name}}
		  </a>
		</div>
		<ul class="nav">
		  <li class="active">
			<a>
				<router-link :to="{ path: 'home' }">
			  	<i class="tim-icons icon-chart-pie-36"></i>
			  	<p>Dashboard</p>
				</router-link>
			</a>
		  </li>
		  <li>
			<a>
				<router-link :to="{ name: 'inventory' }">
			  	<i class="tim-icons icon-book-bookmark"></i>
			  	<p>Inventario</p>
				</router-link>			
			</a>
		  </li>
		  <li>
			<a>
				<router-link :to="{ name: 'order' }">
			  	<i class="tim-icons icon-notes"></i>
			  	<p>Pedidos</p>
				</router-link>			
			</a>
		  </li>
		  <li>
			<a>
				<router-link :to="{ name: 'rawMaterial' }">
			  	<i class="tim-icons icon-alert-circle-exc"></i>
			  	<p>Materia prima</p>
				</router-link>			
			</a>
		  </li>           
		  <li>
			<a>
				<router-link :to="{ name: 'productMade' }">
			  	<i class="tim-icons icon-app"></i>
			  	<p>Producto hecho</p>
				</router-link>			
			</a>
		  </li>
		  <li>
			<a>
				<router-link :to="{ name: 'pendingCharges' }">
			  	<i class="tim-icons icon-money-coins"></i>
			  	<p>Cobros pendientes</p>
				</router-link>			
			</a>
		  </li> 
		  <li>
			<a>
				<router-link :to="{ name: 'newUser' }" v-if="adminExists">
			  	<i class="tim-icons icon-single-02"></i>
			  	<p>Añadir usuario</p>
				</router-link>			
			</a>
		  </li>   		            
		  <li>
			<a>
				<router-link :to="{ name: 'notes' }">
			  	<i class="tim-icons icon-paper"></i>
			  	<p>Entradas del día</p>
				</router-link>			
			</a>
		  </li>   			  
		</ul>
	  </div>
	</div>
	<!--End Sidebar-->
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
	name: "AppNavigation",
	computed:{
		...mapState(["user", "userInfo"]),
		...mapGetters(["userExists", "adminExists"])
	},
	methods:{
		...mapActions(["getUserInfo"])
	},
	created(){
		this.getUserInfo()
	}
};
</script>

<style scoped>
.sidebar{
    background: linear-gradient(0deg, #CDDC39 0%,#8BC34A 100%);
}
</style>