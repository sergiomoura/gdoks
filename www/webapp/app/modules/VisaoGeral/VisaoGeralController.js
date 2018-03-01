(function(){
	// Definindo o módulo;
	var module = angular.module('VisaoGeral',[]);

	// Definindo a função controller da visão geral
	function VisaoGeralController($scope,GDoksFactory,$mdToast){
		// Declarando variáveis do scope
		$scope.progresso_geral = null;

		// Carregando dados de visão geral
		GDoksFactory.getVisaoGeral()
		.success(function(response){
			$scope.progresso_geral = Math.round(response.progresso_geral);
			$scope.n_docs = response.n_docs;
			$scope.n_docs_concluidos = response.n_docs_concluidos;
			$scope.n_docs_em_revisao = response.n_docs_em_revisao;
			$scope.n_docs_parados = response.n_docs_parados;
			$scope.n_grds = response.n_grds;

			plotaGrafico_progressoGeral();
			plotaGrafico_documentos();
			plotaGrafico_grds();
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
		var corPrimaria = 'rgba(33, 150, 243, 0.5)'; // azul
		var corBordaPrimaria = 'rgba(33, 150, 243, 1)';
		var corVazio = 'rgba(0,0,0,0.05)'; // cinzaClaro;
		var corBordaVazio = 'rgba(0,0,0,0)'; // transp;

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
							corVazio,
						],
						borderColor: [
							corBordaPrimaria,
							corBordaVazio,
						],
						borderWidth: 1,
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

		// Construindo o gráfico de status de documentos
		function plotaGrafico_documentos(){
			var ctx = document.getElementById("documentos_canvas");
			var myChart = new Chart(ctx, {
				type: 'horizontalBar',
				data: {
					labels: ["Concluídos", "Em Revisão", "Aguardando"],
					datasets: [{
						data: [$scope.n_docs_concluidos, $scope.n_docs_em_revisao, $scope.n_docs_parados],
						backgroundColor: [
							corPrimaria,
							'rgba(109, 217, 0, 0.5)',
							'rgba(255, 206, 86, 0.5)',
						],
						borderColor: [
							corBordaPrimaria,
							'rgba(109,217,0,1)',
							'rgba(255, 206, 86, 1)',
						],
						borderWidth: 1
					}]
				},
				options: {
					maintainAspectRatio: false,
					title:{
						text:"Situação dos Documentos",
						fontSize:18,
					},

					layout: {
						padding:20
					},

					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});
		}

		// Construindo Gráficos de grds
		function plotaGrafico_grds(){
			
			// Determinando o vetor de dados e ;
			var dados = [];
			var rotulos = [];
			var cores = [];
			var bordas = [];

			for (var i = 0; i < $scope.n_grds.length; i++) {
				dados.push($scope.n_grds[i].n);
				cores.push(corPrimaria);
				bordas.push(corBordaPrimaria);

				// Parsing rótulos
				var aux = $scope.n_grds[i].i.split('-');
				rotulos.push(aux[2]+'/'+aux[1]+'/'+aux[0]);
			}

			var ctx = document.getElementById("grds_canvas");
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: rotulos,
					datasets: [{
						data: dados,
						backgroundColor: cores,
						borderColor: bordas,
						borderWidth: 1
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						text:"GRD's Emitidas nas Últimas "+$scope.n_grds.length+" Semanas",
						fontSize:18,
					},
					layout: {
						padding:20
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true,
								userCallback: function(label, index, labels) {
									// when the floored value is the same as the value we have a whole number
									if (Math.floor(label) === label) {
										return label;
									}
								}
							}
						}]
					}
				}
			});
		}
	}

	// Definindo controller de docsParaValidar
	function DocsParaValidarController($scope,GDoksFactory,$mdToast,$location){
		// Declarando docsParaValidar
		$scope.docsParaValidar = [];
		$scope.maxDocsExibidos = 5;

		// Carrtegando documentos para validar
		(function(){
			GDoksFactory.getDocumentosParaValidar()
			.success(function(response){
				$scope.docsParaValidar = response.documentos.map(function(d){
					d.validar=true;
					return d;
				});
			})
			.error(function(response){
				if(response.error == 1){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Token expirou. Faça o login novamente.')
						.position('bottom left')
						.hideDelay(5000)
					);
				} else {
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Um erro ocorreu. Não foi possível levantar documentos.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(response);
				}
			});
		})()

		// Funções Auxiliares
		$scope.goToDoc = function(idDoc){
			$location.url('/documentos/'+idDoc);
		}

		$scope.baixarPDA = function(idPDA){
			GDoksFactory.baixarPDA(idPDA);
		}

		$scope.verTodos = function(){
			$location.url('/validacao');
		}

	}

	// Atribuindo controllers
	module.controller('VisaoGeralController',VisaoGeralController);
	module.controller('DocsParaValidarController',DocsParaValidarController);
})()