angular.module('Senha',[]).controller('SenhaController',SenhaController)

function SenhaController($scope,$mdToast,GDoksFactory){
	// Inicializando o objeto data;
	$scope.data = {};
	$scope.data.login = '';
	$scope.data.senha1 = '';
	$scope.data.senha2 = '';

	$scope.mudaLoginSenha = function(novoLogin,novaSenha){
		GDoksFactory.mudaLoginSenha(novoLogin,novaSenha)
			.success(
				function(response){
					$mdToast.show(
						$mdToast.simple()
						.textContent('Alterações realizadas com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);
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
		window.location = "WebGDoks.php#/home";
	}
}