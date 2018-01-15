(function(){
	// Definição de módulo
	var module = angular.module('Senha',[]);


	// Atribuindo controller ao módulo
	module.controller('SenhaController',SenhaController)


	// Definindo a função controller
	function SenhaController($scope,$mdToast,ClientesFactory,$location){
		// Inicializando o objeto data;
		$scope.senha1 = '';
		$scope.senha2 = '';

		$scope.mudarSenha = function(novaSenha){
			ClientesFactory.mudarSenha(novaSenha)
				.success(
					function(response){
						$mdToast.show(
							$mdToast.simple()
							.textContent('Alterações realizadas com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);
						$location.url('/home');
					}
				)
				.error(
					function(error){
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				);
		}

		$scope.cancel = function(){
			$location.url('/home');
		}
	}
})()