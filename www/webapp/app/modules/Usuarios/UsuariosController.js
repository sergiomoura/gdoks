angular.module('Usuarios',[])
.controller('UsuariosController',UsuariosController)
.controller('UsuarioController',UsuarioController);

function UsuariosController($scope,GDoksFactory){

	// Declarando vetor de usuários
	$scope.usuarios = [];

	// Carregando usuarios da base local
	var openReq = indexedDB.open("gdoks");
	openReq.onsuccess = function(){
		var db = openReq.result;
		db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.usuarios = evt.target.result;});
		}
	}

	// função que leva para a tela de adicionar usuário
	$scope.goToAddUsuario = function(){
		window.location = '#/usuarios/0';
	}
};

function UsuarioController($scope,$routeParams,GDoksFactory,$mdToast,$location){
	// Capturando o id passado na url
	var id = $routeParams.id;

	// se id== 0, adicionar um novo usuário. se não carregar o usuario de id passado
	if(id == 0) {
		// Criando um usuário vazio.
		$scope.usuario = {};
		$scope.usuario.id = 0;
		$scope.usuario.nome = '';
		$scope.usuario.email = '';
		$scope.usuario.login = '';
		$scope.usuario.ativo = true;
		$scope.inicialmenteAtivo = true;
	} else {
		// Carregando usuário da base
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = openReq.result;
			db.transaction('usuarios').objectStore('usuarios').get(id*1).onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.usuario = evt.target.result;
					$scope.inicialmenteAtivo = ($scope.usuario.ativo == true);
				});
			}
		}
	}
	

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		$location.url("/usuarios");
	}

	$scope.salvarUsuario = function(){

		// Mostra Carregando
		$scope.root.carregando =true;
		
		if($scope.usuario.id == 0){
			GDoksFactory.adicionarUsuario($scope.usuario)
			.success(
				function(response){

					// Esconde Carregando
					$scope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Usuário criado com sucesso')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Aribuindo nova id para usuário recém criado
					$scope.usuario.id = response.newId;

					// Removendo informações que não serão gravadas na BD
					delete($scope.usuario.senha1);
					delete($scope.usuario.senha2);

					// Salvando usuário na base
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var db = evt.target.result;
						db.transaction('usuarios','readwrite').objectStore('usuarios').add($scope.usuario);
					}

					// Voltando para a tela de usuários depois de  4s
					$location.url("/usuarios");

				}
			)
			.error(
				function(error){
					// Esconde Carregando
					$scope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível adicionar usuário: ' + error.msg)
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no log
					console.warn('Não foi possível alterar usuário: ' + response.msg);
				}
			);
		} else {
			GDoksFactory.atualizarUsuario($scope.usuario)
			.success(
				function(response){
					// Esconde Carregando
					$scope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Dados do usuário alterados com sucesso')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Removendo informações que não serão gravadas na BD
					delete($scope.usuario.senha1);
					delete($scope.usuario.senha2);
					
					// Atualizando usuário na base
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var db = evt.target.result;
						db.transaction('usuarios','readwrite').objectStore('usuarios').put($scope.usuario);
					}

					// Voltando para a tela de usuários depois de  4s
					$location.url("/usuarios");
				}
			)
			.error(
				function(error){
					// Esconde Carregando
					$scope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível alterar dados do usuário.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo erro detalhado no console
					console.warn('' + error.msg);
					
					$scope.msg = error.msg;
				}
			);
		}
	}
};