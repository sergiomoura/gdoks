(function(){
	// Definição do módulo 'Configurações' e seu Controller
	angular.module('Configuracoes',[]).controller('ConfiguracoesController',ConfiguracoesController);

	// Definição da ConfigurcoesController
	function ConfiguracoesController($scope,GDoksFactory,$mdToast,$window){
				
		GDoksFactory.getConfiguracoes()
		.success(function(response){
			$scope.config = response.config;
		})
		.error(function(error){
			// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao acarregar configurações')
					.position('bottom left')
					.hideDelay(5000)
				);	
		});

		$scope.salvar = function(){
			GDoksFactory.putConfiguracoes($scope.config)
			.success(function(response){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Configurações alteradas com sucesso')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Voltando para tela anterior
				$window.history.back();
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent(error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			})

		}

		$scope.cancelar = function(){
			$window.history.back();
		}
		
	};
})();
