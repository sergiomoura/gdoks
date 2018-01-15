(function(){

	// Defininfo vetor de dependencias
	var dependencias = [
			'ngRoute',
			'ngCookies',
			'ngAnimate',
			'ngMaterial',
			'Home',
			'Grds',
			'Documentos',
			'Opcoes',
			'Senha'
		];
	
	// Definição  do módulo Area do Cliente
	var module = angular.module('AreaDoCliente',dependencias);
	
	// Atribuição do controller
	module.controller('AreaDoClienteController',AreaDoClienteController);

	// Definição do controller
	function AreaDoClienteController($scope,$cookies,$interval,ClientesFactory){
		// Definindo funções que renovam o token
		$scope.refreshToken = function(){
			ClientesFactory.refreshToken()
			.success(
				function(response){
					$cookies.put('token',response.newToken,{path:'/'});
				}
			)
			.error(
				function(error){
					console.warn('Token não foi renovado!');
					console.warn(error);
					window.location="/";
				}
			);
		}

		$scope.die = function(){
			// Se erro for de token expirado, limpa os cookies de cliente e token e redireciona para login
			var empresa = $cookies.getObject('cliente').nome_empresa.toLowerCase();
			$cookies.remove('cliente',{path:'/'});
			$cookies.remove('token',{path:'/'});
			window.location = '/clientes/'+empresa;
		}

		// Acionando timer que renova o token de tempo em tempo
		$interval($scope.refreshToken,TOKEN_REFRESH_IN);
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
				'/senha',
				{
					controller: 'SenhaController',
					templateUrl: '../comum/app/modules/Senha/senha.php'
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