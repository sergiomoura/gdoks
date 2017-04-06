angular.module('Clientes',[])
.controller('ClientesController',ClientesController)
.controller('ClienteController',ClienteController);


function ClientesController($scope,GDoksFactory){
	// levantando clientes na base de dados local
	$scope.clientes = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.clientes = evt.target.result});
		}
	}
	// função que leva para a tela de adicionar disciplina
	$scope.goToAddCliente = function(){
		window.location = '#/clientes/0';
	}
};

function ClienteController($scope,$routeParams,GDoksFactory){
	// Capturando o id passado na url
	var id = $routeParams.id;

	// se id== 0, adicionar um novo usuário. se não carregar o cliente de id passado
	if(id == 0) {
		// Criando um usuário vazio.
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
		window.location = "WebGDoks.php#/clientes";
	}

	$scope.salvarCliente = function(){
		if($scope.cliente.id == 0){
			GDoksFactory.adicionarCliente($scope.cliente)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.cliente.id = response.newId;

					// salvando cliente na base local
					var cliente = angular.copy($scope.cliente);
					delete(cliente.contato_telefone);
					delete(cliente.contato_email);
					delete(cliente.contato_nome);
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('clientes','readwrite').objectStore('clientes').add(cliente);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		} else {
			GDoksFactory.atualizarCliente($scope.cliente)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// atualiznado cliente na base local
					var cliente = angular.copy($scope.cliente);
					delete(cliente.contato_telefone);
					delete(cliente.contato_email);
					delete(cliente.contato_nome);
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('clientes','readwrite').objectStore('clientes').put(cliente);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
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