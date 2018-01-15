(function(){
	// Definição de módulo
	var module = angular.module('Home',[]);

	// Atricuição de controllers a módulo
	module.controller('HomeController',HomeController);
	
	// Definição da função controller
	function HomeController($scope,$cookies,ClientesFactory){
		
		// Definindo as grds do scope
		$scope.grds = [];

		// Carregando as grds
		ClientesFactory.getUltimasGrds()
		.success(function(response){
			for (var i = response.grds.length - 1; i >= 0; i--) {
				response.grds[i].datahora_enviada = new Date(response.grds[i].datahora_enviada);
				response.grds[i].datahora_registro = new Date(response.grds[i].datahora_registro);
			}
			$scope.grds = response.grds;
		})
		.error(function(error){
			if(error.error == 100){
				$scope.die();
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent(error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}

		});

		// Definindo as funções do scope
		$scope.downloadGrd = function(id){
			ClientesFactory.downloadGrd(id);
		}
	}
})()