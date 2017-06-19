(function(){
	// Criando o módulo
	var GrdsModule = angular.module('Grds',[]);

	// Criando função controller de Grds
	var GrdsController = function($scope){
		console.log('Módulo Grds carregado...');
	}

	// Criando função controller de Grds
	var GrdController = function($scope,$location){

		// Definindo grd
		$scope.grd = {};
		$scope.projetos = [];
		
		// Carregando clientes
		$scope.clientes = [];
		indexedDB.open('gdoks').onsuccess = function(evt){
			evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
				$scope.clientes = evt.target.result;
			}
		}

		// Define função a ser executada quando o cliente é alterado
		$scope.onClienteChange = function(){
			// Carrega os projetos daquele cliente
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
					$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.cliente.id);
					console.dir($scope.projetos);
				}
			}
			// Anula o projeto do cliente selecionado
			$scope.grd.projeto = null;
		}

		// função qe leva para a busca de grds
		$scope.goToGrds = function(){
			$location.url('/grds');
		}
	}

	// Atribuindo função controller ao módulo
	GrdsModule.controller('GrdsController',GrdsController);
	GrdsModule.controller('GrdController',GrdController);

})()