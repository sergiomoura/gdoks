
(function(){
	// Definição do módulo
	var module = angular.module('Opcoes',[]);

	// Atricbuição de controllers ao módulo
	module.controller('OpcoesController',OpcoesController);

	// Definição da função controller
	function OpcoesController($scope,$cookies,$location){

		// Função que direciona para a página de trocar senha
		$scope.onTrocarSenhaClick  = function(){
			$location.url("/senha");
		}

		// Função que sai
		$scope.logout = function(){
			$scope.die();
		}
	}
})();