(function(){
	// Criando o módulo "Documentos"
	var module = angular.module('Documentos',['ngFileUpload']);

	// Atribuindo Controller Documentos Controller
	module.controller('DocumentosController',DocumentosController);
	
	// Atribuindo filtros do módulo
	module.filter('daysFromNow',daysFromNow);
	
	// Definindo função controller
	function DocumentosController($scope,GDoksFactory,$mdToast,$location){

		// Definindo valores iniciais para filtros
		$scope.busca = {
			id_projeto:undefined,
			id_area:undefined,
			id_subarea:undefined,
			id_disciplina:undefined,
			id_subdisciplina:undefined,
			mostrarPorValidar:'0', // ['0' | '01']
			mostrarConcluidos:'01' // ['0' | '01']
		};

		// Definindo 'agora'
		$scope.agora = new Date();

		// Definindo valor inicial para ordem
		$scope.ordem = 'data_limite';

		// Definindo se mostra busca avançada
		$scope.mostraBuscaAvancada = false;

		// Definindo o valor inicial para o vetor de areas
		$scope.areas = [];

		// Definindo o valor inicial para o vetor de subareas
		$scope.subareas = [];

		// Carregando projetos
		$scope.projetos = [];
		carregaProjetos();

		// Carregando documentos
		$scope.documentos = [];
		carregaDocumentos();

		// Carregando disciplinas
		$scope.disciplinas = [];
		carregaDisciplinas();

		// Função que carrega projetos
		function carregaProjetos(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("projetos").objectStore("projetos").getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.projetos = evt.target.result;
					})
				}
			}
		}

		// Função que carrega documentos
		function carregaDocumentos(){
			GDoksFactory.getDocumentos()
			.success(function(response){
				$scope.documentos = response.documentos;

				// Parsing Data Limite, ua, progressos e criando ganchos para filtro
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.documentos[i].data_limite = ($scope.documentos[i].data_limite==null ? null : new Date($scope.documentos[i].data_limite + 'T00:00:00') );
					$scope.documentos[i].ua = ($scope.documentos[i].ua==null ? null : new Date($scope.documentos[i].ua) );
					$scope.documentos[i].progresso_a_validar = ($scope.documentos[i].progresso_a_validar==null? 0 : $scope.documentos[i].progresso_a_validar);
					$scope.documentos[i].progresso_validado = ($scope.documentos[i].progresso_validado==null? 0 : $scope.documentos[i].progresso_validado);

					// Criando ganchos para filtro mostrarPorValidar
					$scope.documentos[i].mostrarPorValidar = ($scope.documentos[i].progresso_a_validar>0 ? '01' :'0');

					// Criando gancho para filtro mostrarConcluidos
					$scope.documentos[i].mostrarConcluidos = ($scope.documentos[i].progresso_validado == 100 ? '0' : '01');
				}
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar documentos.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Escrevendo erro no console
				console.warn(error);
			});
		}

		// função que carrega áreas de um projeto
		function carregaAreas(id_projeto){
			GDoksFactory.getAreas(id_projeto)
			.success(function(response){
				$scope.areas = response.areas;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar áreas do projeto selecionado: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// escrevendo erro no console
				console.warn(error);
			})
		}

		// função que carrega subáreas de uma area
		function carregaSubareas(id_projeto,id_area){
			GDoksFactory.getSubareas(id_projeto,id_area)
			.success(function(response){
				$scope.subareas = response.subareas;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar sub-áreas da área selecionada: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// escrevendo erro no console
				console.warn(error);
			})
		}

		// Função que carrega as disciplinas e subdisciplinas (base do cliente)
		function carregaDisciplinas(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("disciplinas").objectStore("disciplinas").getAll().onsuccess = function(evt){
					$scope.disciplinas = evt.target.result;
				}
			}
		}

		// HANDLERS : : : : : : : : : : :
		$scope.onProjetoChange = function(){
			carregaAreas($scope.busca.id_projeto);
			$scope.busca.id_area=undefined;
			$scope.busca.id_subarea=undefined;
		}

		$scope.onAreaChange = function(){
			carregaSubareas($scope.busca.id_projeto,$scope.busca.id_area);
			$scope.busca.id_subarea=undefined;
		}

		$scope.onDisciplinaChange = function(){
			$scope.subdisciplinas = $scope.disciplinas.find(function(a){
																return a.id==this;
															},$scope.busca.id_disciplina).subs;
			$scope.busca.id_subdisciplina = undefined;
		}

		$scope.onOpenClick = function(id){
			$location.path('/documentos/'+id);
		}
	}

	// Definindo função filter
	function daysFromNow(){
		return function(futureDate){
			if(futureDate == null){
				return '';
			} else {
				var diff = Math.ceil((futureDate - (new Date()))/86400000);
				if(diff == 1){
					return ('1 dia restante');
				} else if(diff > 1){
					return (diff + ' dias restantes');
				} else if(diff == 0) {
					return 'Hoje';
				} else if(diff == -1 ) {
					return ('1 dia atrás');
				} else {
					return ((-diff) + ' dias atrás');
				}
			}
		}
	}

})()