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

function UsuarioController($scope,$routeParams,GDoksFactory){
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
		window.location = "WebGDoks.php#/usuarios";
		$scope.root.itemSelecionadoDoMenu = 0;
	}

	$scope.salvarUsuario = function(){
		if($scope.usuario.id == 0){
			GDoksFactory.adicionarUsuario($scope.usuario)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.usuario.id = response.newId;
					delete($scope.usuario.senha1);
					delete($scope.usuario.senha2);

					// Salvando usuário na base
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var db = evt.target.result;
						db.transaction('usuarios','readwrite').objectStore('usuarios').add($scope.usuario);
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
			GDoksFactory.atualizarUsuario($scope.usuario)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// Atualizando usuário na base
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var db = evt.target.result;
						db.transaction('usuarios','readwrite').objectStore('usuarios').put($scope.usuario);
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
};