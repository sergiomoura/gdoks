(function(){
	// Carregando o módulo
	var module = angular.module('AreaDoCliente');

	// Definindo Factory
	module.factory('ClientesFactory',
		[
			'$http','$cookies',
			function($http,$cookies){
				var factory = {};

				// Função auxiliar que retorna headers baseada no cooke user = = = = = = = = = = = = = = = = = = = = = = = = =
				var buildHeaders = function(){
					return {headers: {'Authorization': $cookies.getObject('cliente').codigo_empresa + '-' + $cookies.get('token')}};
				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				// Faz requisição para carregar últimas grds
				factory.refreshToken = function(){
					return $http.get(API_CLIENTE_ROOT+'refresh',buildHeaders());
				}
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				// Faz requisição para carregar últimas grds
				factory.getUltimasGrds = function(){
					return $http.get(API_CLIENTE_ROOT+'grds/ultimas',buildHeaders());
				}
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				return factory;
			}
		]
	);
})();