angular.module('VisaoGeral',[])
.controller('VisaoGeralController',function($scope){

	// Definição de Cores
	var corPrimaria = '#2196F3'; // azul
	var cinza = 'rgba(0,0,0,0.12)'; // cinzaClaro;

	// Configurações gerais do chart
	Chart.defaults.global.defaultFontFamily = "Poppins";
	Chart.defaults.global.legend.display = false;
	Chart.defaults.global.title.display = true;


	// Construindo o gráfico de progresso geral
		var ctx = document.getElementById("progressoGeral_canvas").getContext('2d');
		var chart_ProgressoGeral = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ["Progresso Geral", ""],
				datasets: [{
					data: [80, 20],
					backgroundColor: [
						corPrimaria,
						cinza,
					],
					borderWidth: 0,
				}]
			},
			options: {
				title: {
					text:"Progresso Geral",
					fontSize:18,
				},
				responsive: true,
				maintainAspectRatio: true,
				animation : {
					animateRotate : true,
				},
				layout: {
					padding:20
				},
				tooltips:{
					enabled: false
				}
			}
	});
});
