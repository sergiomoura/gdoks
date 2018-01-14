(function(){

	// Defininfo vetor de dependencias
	var dependencias = [
			'ngRoute',
			'ngCookies',
			'ngAnimate',
			'ngMaterial',
			'Home',
			'Grds',
			'Documentos'
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
			.when(
				'/grds',
				{
					controller: 'GrdsController',
					templateUrl: '../comum/app/modules/Grds/grds.php'
				}
			)
			.when(
				'/documentos',
				{
					controller: 'DocumentosController',
					templateUrl: '../comum/app/modules/Documentos/documentos.php'
				}
			)
			.otherwise({redirectTo:'/home'});
		}
	)

	// Configurando padrão de cores
	module.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('orange',{'default':'800'});
	})

})();