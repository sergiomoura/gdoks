(function(){
	angular.module('Clientes',[])
	.controller('ClientesController',ClientesController)
	.controller('ClienteController',ClienteController);


	function ClientesController($scope,GDoksFactory,$location){
		// levantando clientes na base de dados local
		$scope.clientes = [];
		indexedDB.open('gdoks').onsuccess = function(evt){
			evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
				$scope.$apply(function(){$scope.clientes = evt.target.result});
			}
		}
		// função que leva para a tela de adicionar disciplina
		$scope.goToAddCliente = function(){
			$location.url('/clientes/0');
		}
	};

	function ClienteController($scope,$routeParams,GDoksFactory,$location,$mdToast){
		// Capturando o id passado na url
		var id = $routeParams.id;

		// se id== 0, adicionar um novo usuário. se não carregar o cliente de id passado
		if(id == 0) {
			// Criando um cliente vazio.
			$scope.cliente = {};
			$scope.cliente.id = 0;
			$scope.cliente.nome = '';
			$scope.cliente.nome_fantasia = '';
			$scope.cliente.tipo = '1';
			$scope.cliente.cnpj = '';
			$scope.cliente.cpf = null;
			$scope.cliente.contato_nome = '';
			$scope.cliente.contato_email = '';
			$scope.cliente.contato_telefone = '';
			$scope.cliente.endereco = '';
			$scope.cliente.ftp_host = '';
			$scope.cliente.ftp_usuario = '';
			$scope.cliente.ftp_senha = '';
			$scope.cliente.login = '';
			$scope.cliente.senha1 = '';
			$scope.cliente.senha2 = '';
		} else {
			// Carregando informações do cliente a partir da base
			GDoksFactory.getCliente(id)
				.success(
					function(response){
						$scope.cliente = response.cliente;
						$scope.cliente.tipo = response.cliente.cpf == null?'1':'2';
					}
				)
				.error(
					function(error){

					}
				);
		}

		// Definindo função que cancela as alterações
		$scope.cancel = function(){
			$location.url("/clientes");
		}

		$scope.salvarCliente = function(){
			
			// Mostra carregando
			$scope.root.carregando = true;

			var cliente = angular.copy($scope.cliente);
			cliente.senha = $scope.cliente.senha1;
			delete cliente.senha1;
			delete cliente.senha2;

			if($scope.cliente.id == 0){

				GDoksFactory.adicionarCliente(cliente)
				.success(
					function(response){
						// Esconde carregando
						$scope.root.carregando = false;
						
						// Atribuindo novo id para o cliente
						$scope.cliente.id = response.newId;

						// salvando cliente na base local
						var cliente = angular.copy($scope.cliente);

						// salvando info sobre o ftp
						cliente.ftp_configurado =	(cliente.ftp_host != '' &&
													cliente.ftp_usuario != '' &&
													cliente.ftp_senha != '' &&
													cliente.ftp_host != undefined &&
													cliente.ftp_usuario != undefined &&
													cliente.ftp_senha != undefined &&
													cliente.ftp_host != null &&
													cliente.ftp_usuario != null &&
													cliente.ftp_senha != null);
						delete cliente.senha1;
						delete cliente.senha2;
						delete cliente.ftp_host;
						delete cliente.ftp_usuario;
						delete cliente.ftp_senha;

						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('clientes','readwrite').objectStore('clientes').add(cliente);
						}
						
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(response.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Voltando para a tela de clientes
						$location.url("/clientes");
					}
				)
				.error(
					function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error.msg);
					}
				);
			} else {
				GDoksFactory.atualizarCliente(cliente)
				.success(
					function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(response.msg)
							.position('bottom left')
							.hideDelay(5000)
						);					

						// atualiznado cliente na base local
						var cliente = angular.copy($scope.cliente);

						// salvando info sobre o ftp
						cliente.ftp_configurado =	(cliente.ftp_host != '' &&
													cliente.ftp_usuario != '' &&
													cliente.ftp_senha != '' &&
													cliente.ftp_host != undefined &&
													cliente.ftp_usuario != undefined &&
													cliente.ftp_senha != undefined &&
													cliente.ftp_host != null &&
													cliente.ftp_usuario != null &&
													cliente.ftp_senha != null);
						
						delete cliente.ftp_host;
						delete cliente.ftp_usuario;
						delete cliente.ftp_senha;
						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('clientes','readwrite').objectStore('clientes').put(cliente);
						}

						// Voltando para a tela de clientes
						$location.url("/clientes");
					}
				)
				.error(
					function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);	

						// Imprimindo erro no console
						console.warn(error.msg);
					}
				);
			}
		}

		$scope.onTipoChange = function(){
			if($scope.cliente.tipo == '1'){
				// Pessoa Jurídica. CPF deve ser nulo!
				$scope.cliente.cpf = null;
			} else {
				// Pessoa Física. CNPJ deve ser nulo!
				$scope.cliente.cnpj = null;
			}
		}
	}
})();