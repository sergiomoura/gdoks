angular.module('VisaoGeral',[])
.controller('VisaoGeralController',function($scope,GDoksFactory){

	// Declarando variáveis do scope
	$scope.progresso_geral = null;

	// Carregando dados de visão geral
	GDoksFactory.getVisaoGeral()
	.success(function(response){
		$scope.progresso_geral = Math.round(response.progresso_geral);
		plotaGrafico_progressoGeral();
	})
	.error(function(error){
		// Retornando Toast para o usuário
		$mdToast.show(
			$mdToast.simple()
			.textContent('Falha ao carregar dados: ' + error.msg)
			.position('bottom left')
			.hideDelay(5000)
		);

		// Imprimindo erro no console
		console.warn(error);
	});

	// Definição de Cores
	var corPrimaria = '#2196F3'; // azul
	var cinza = 'rgba(0,0,0,0.12)'; // cinzaClaro;

	// Configurações gerais do chart
	Chart.defaults.global.defaultFontFamily = "Poppins";
	Chart.defaults.global.legend.display = false;
	Chart.defaults.global.title.display = true;


	// Construindo o gráfico de progresso geral
	function plotaGrafico_progressoGeral(){
		var ctx = document.getElementById("progressoGeral_canvas").getContext('2d');
		var chart_ProgressoGeral = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ["Progresso Geral", ""],
				datasets: [{
					data: [$scope.progresso_geral, 100-$scope.progresso_geral],
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
	}
});
