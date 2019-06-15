<template>
	<div class="content">
		<div class="row">
		  <div class="col-12">
			<div class="card card-chart">
			  <div class="card-header ">
				<div class="row">
				  <div class="col-sm-6 text-left">
					<h5 class="card-category">Productos empacados</h5>
					<h2 class="card-title">Rendimiento</h2>
				  </div>
				  <div class="col-sm-6">
					<div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
					  <label class="btn btn-sm btn-primary btn-simple active" id="0">
						<input type="radio" name="options" checked>
						<span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">Mensuales</span>
						<span class="d-block d-sm-none">
						  <i class="tim-icons icon-single-02"></i>
						</span>
					  </label>
					  <label class="btn btn-sm btn-primary btn-simple" id="1">
						<input type="radio" class="d-none d-sm-none" name="options">
						<span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">Semanales</span>
						<span class="d-block d-sm-none">
						  <i class="tim-icons icon-gift-2"></i>
						</span>
					  </label>
					  <label class="btn btn-sm btn-primary btn-simple" id="2">
						<input type="radio" class="d-none" name="options">
						<span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">Diarios</span>
						<span class="d-block d-sm-none">
						  <i class="tim-icons icon-tap-02"></i>
						</span>
					  </label>
					</div>
				  </div>
				</div>
			  </div>
			  <div class="card-body">
				<div class="chart-area">
				  <canvas id="chartBig1"></canvas>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div class="row">
		  <div class="col-lg-4">
			<div class="card card-chart">
			  <div class="card-header">
				<h5 class="card-category">Pedidos hechos</h5>
				<h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary"></i> 20</h3>
			  </div>
			  <div class="card-body">
				<div class="chart-area">
				  <canvas id="chartLinePurple"></canvas>
				</div>
			  </div>
			</div>
		  </div>
		  <div class="col-lg-4">
			<div class="card card-chart">
			  <div class="card-header">
				<h5 class="card-category">Ganancias diarias</h5>
				<h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info"></i> $3,500</h3>
			  </div>
			  <div class="card-body">
				<div class="chart-area">
				  <canvas id="CountryChart"></canvas>
				</div>
			  </div>
			</div>
		  </div>
		  <div class="col-lg-4">
			<div class="card card-chart">
			  <div class="card-header">
				<h5 class="card-category">Productos en stock</h5>
				<h3 class="card-title"><i class="tim-icons icon-send text-success"></i> 12,100</h3>
			  </div>
			  <div class="card-body">
				<div class="chart-area">
				  <canvas id="chartLineGreen"></canvas>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div class="row">
		  <div class="col-lg-6 col-md-12">
			<div class="card card-tasks">
			  <div class="card-header ">
				<h6 class="title d-inline">Pendientes(2)</h6>
				<p class="card-category d-inline">today</p>
				<div class="dropdown">
				  <button type="button" class="btn btn-link dropdown-toggle btn-icon" data-toggle="dropdown">
					<i class="tim-icons icon-settings-gear-63"></i>
				  </button>
				  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
					<a class="dropdown-item" href="#pablo">#</a>
					<a class="dropdown-item" href="#pablo">#</a>
					<a class="dropdown-item" href="#pablo">#</a>
				  </div>
				</div>
			  </div>
			  <div class="card-body ">
				<div class="table-full-width">
				  <table class="table">
					<tbody>
					  <tr>
						<td>
						  <div class="form-check">
							<label class="form-check-label">
							  <input class="form-check-input" type="checkbox" value="" checked="">
							  <span class="form-check-sign">
								<span class="check"></span>
							  </span>
							</label>
						  </div>
						</td>
						<td>
						  <p class="title">Nombre de actividad</p>
						  <p class="text-muted">Descripcion de la actividad</p>
						</td>
						<td class="td-actions text-right">
						  <button type="button" rel="tooltip" title="" class="btn btn-link" data-original-title="Edit Task">
							<i class="tim-icons icon-pencil"></i>
						  </button>
						</td>
					  </tr>
					</tbody>
				  </table>
				</div>
			  </div>
			</div>
		  </div>
		  <div class="col-lg-6 col-md-12">
			<div class="card ">
			  <div class="card-header">
				<h4 class="card-title">Nómina (Experimental)</h4>
			  </div>
			  <div class="card-body">
				<div class="">
				  <table class="table tablesorter table-responsive " id="">
					<thead class=" text-primary">
					  <tr>
						<th>
						  Nombre
						</th>
						<th>
						  importe
						</th>
						<th>
						  puntualidad
						</th>
						<th>
						  Asistencia
						</th>
						<th>
						  Seguro
						</th>
						<th>
						  ISR
						</th>
						<th>
						  infonavit
						</th>
						<th>
						  Total
						</th>                                                
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td>
						  { worker.name }
						</td>
						<td>
						  { worker.im }
						</td>
						<td>
						  Oud-Turnhout
						</td>
						<td class="text-center">
						  $36,738
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
	import { mapState } from "vuex";
	export default{
		name: "home",
		computed:{
			...mapState(['user'])
		}
	}
</script>

<style>
.card{
	background: #34495e;
}
.btn-primary.active, .btn-primary.btn-simple.active{
    background-image: linear-gradient(to bottom left,#CDDC39,#8BC34A) !important;
    border-color: #8BC34A !important;
}
.btn-primary.btn-simple.active:hover, .btn-primary.btn-simple.active:focus{
    background-image: linear-gradient(to bottom left,#CDDC39,#8BC34A) !important;
}
.btn-primary.btn-simple, .btn-primary.btn-simple:hover, .btn-primary.btn-simple:active, 
.btn-primary.btn-simple:not(:disabled):not(.disabled):active, .btn-primary.btn-simple:focus{
    color: #8BC34A;
    border-color: #8BC34A;
}
.btn-primary.btn-simple.active:active, .btn-primary.btn-simple.active:not(:disabled):not(.disabled):active, 
.btn-primary:not(:disabled):not(.disabled).active{
    background: #8BC34A !important;
    border-color: #8BC34A !important;
}
.text-danger{
    color: tomato !important;
}
.text-warning{
    color: #fbc531 !important;
}	
</style>
