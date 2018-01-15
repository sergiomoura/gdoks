(function(){
	// Carregando o módulo
	var module = angular.module('AreaDoCliente');

	// Definindo Factory
	module.factory('ClientesFactory',
		[
			'$http','$cookies',
			function($http,$cookies){
				var ClientesFactory = {};

				// Função auxiliar que retorna headers baseada no cooke user = = = = = = = = = = = = = = = = = = = = = = = = =
				var buildHeaders = function(){
					return {headers: {'Authorization': $cookies.getObject('cliente').codigo_empresa + '-' + $cookies.get('token')}};
				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				ClientesFactory.refreshToken = function(){
					return $http.get(API_CLIENTE_ROOT+'refresh',buildHeaders());
				}
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				ClientesFactory.getUltimasGrds = function(){
					return $http.get(API_CLIENTE_ROOT+'grds/ultimas',buildHeaders());
				}
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				ClientesFactory.downloadGrd = function(id_grd){
					// Criando um formulário para enviar a requisição pelo arquivo
					var form = document.createElement("form");
					form.setAttribute('action',API_CLIENTE_ROOT+'grds/'+id_grd+'/download');
					form.setAttribute('method','GET');
					form.setAttribute('style','display:none');

					// adicionando form a dom
					document.body.appendChild(form);

					// submetendo o form
					form.submit();

					// removendo o form da dom
					form.parentNode.removeChild(form);
				}
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				ClientesFactory.mudarSenha = function(novaSenha){
					return $http.post(API_CLIENTE_ROOT+'mudarSenha',{'novaSenha':novaSenha},buildHeaders());
				}
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				return ClientesFactory;
			}
		]
	);
})();