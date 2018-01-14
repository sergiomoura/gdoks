(function(){

	// Defininfo vetor de dependencias
	var dependencias = [
			'ngRoute',
			'ngCookies',
			'ngAnimate',
			'ngMaterial',
			'Home',
		];
	
	// Definição  do módulo Area do Cliente
	var module = angular.module('AreaDoCliente',dependencias);
	
	// Atribuição do controller
	module.controller('AreaDoClienteController',AreaDoClienteController);

	// Definição do controller
	function AreaDoClienteController($scope){
		$scope.x = 1;
	}

	// Definindo Rotas
	module.config(
		function ($routeProvider){
			$routeProvider
			.when(
				'/home',
				{
					controller: 'HomeController',
					templateUrl: '../comum/app/modules/Home/home.php'
				}
			)
			.otherwise({redirectTo:'/home'});
		}
	)


	// Configurando padrão de cores
	module.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
		.primaryPalette('light-blue',{'default':'700'})
		.accentPalette('orange',{'default':'800'});
	})

})();