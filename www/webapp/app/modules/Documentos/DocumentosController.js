(function(){
	// Criando o módulo "Documentos"
	var module = angular.module('Documentos',['ngFileUpload']);

	// Atribuindo Controller Documentos Controller
	module.controller('DocumentosController',DocumentosController);
	
	// Atribuindo filtros do módulo
	module.filter('daysFromNow',daysFromNow);
	
	// Definindo função controller
	function DocumentosController($scope,GDoksFactory,$mdToast){

		// Definindo valores iniciais para filtros
		$scope.busca = {
			id_projeto:undefined,
			id_area:undefined,
			id_subarea:undefined,
			id_disciplina:undefined,
			id_subdisciplina:undefined,
		}

		// Definindo se mostra busca avançada
		$scope.mostraBuscaAvancada = false;

		// Definindo valor inicial para ordem
		$scope.ordem = 'nome';

		// Definindo valor inicial para mostraConcluidos
		$scope.mostraConcluidos = false;

		// definindo valor inicial para mostraPorValidar
		$scope.mostraPorValidar = true;

		// Definindo o valor inicial para o vetor de areas
		$scope.areas = [];

		// Carregando projetos
		$scope.projetos = [];
		carregaProjetos();

		// Carregando documentos
		$scope.documentos = [];
		carregaDocumentos();

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

				// Parsing Data Limite e ua
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.documentos[i].data_limite = ($scope.documentos[i].data_limite==null ? null : new Date($scope.documentos[i].data_limite + 'T00:00:00') );
					$scope.documentos[i].ua = ($scope.documentos[i].ua==null ? null : new Date($scope.documentos[i].ua) );
					$scope.documentos[i].progresso_a_validar = ($scope.documentos[i].progresso_a_validar==null? 0 : $scope.documentos[i].progresso_a_validar);
					$scope.documentos[i].progresso_validado = ($scope.documentos[i].progresso_validado==null? 0 : $scope.documentos[i].progresso_validado);
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

		// HANDLERS : : : : : : : : : : :
		$scope.onProjetoChange = function(){
			carregaAreas($scope.busca.id_projeto);
			$scope.busca.id_area=undefined;
		}
	}

	// Defininfo função filter
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
					return ((diff) + ' dias atrás');
				}
			}
		}
	}

})()