(function(){

	// Definindo o módulo
	var usuarioModulo = angular.module('Usuarios',[]);

	// Atribuindo controllers para o módulo
	usuarioModulo.controller('UsuariosController',UsuariosController);
	usuarioModulo.controller('UsuarioController',UsuarioController);
	usuarioModulo.controller('PermissoesController',PermissoesController);

	// Definindo controller para os usuários
	function UsuariosController($scope,GDoksFactory,$location){

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
			$location.url('/usuarios/0');
		}
	};

	// Definindo controller para usuário
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
			$scope.usuario.sigla = '';
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
							.action('FECHAR')
							.textContent('Usuário criado com sucesso. Agora, adicione permissões!')
							.position('bottom left')
							.hideDelay(0)
							.highlightAction(true)
      						.highlightClass('md-accent')
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

						// mudando a url para que se fique de acordo
						$location.url('/usuarios/'+$scope.usuario.id);

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

	// Definindo controller para permissões
	function PermissoesController($scope,$cookies,GDoksFactory,$mdToast,$routeParams){
		// Lendo id do usuário na url
		var id_usuario = $routeParams.id;

		// Definindo variaveis de controle de interfase
		$scope.restaurarDisponivel = false;

		// Definindo flags de carregamento
		var telasDoUsuarioCarregadas = false;
		var telasCarregadas = false;

		// Definindo vetor de telas
		$scope.telas = [];
		loadTelas();
		
		// Carregando as telas atualmente disponíveis para o usuário
		telasDoUsuario = [];
		if(id_usuario != 0){
			loadTelasDoUsuario();
		} else {
			telasDoUsuarioCarregadas = true;
		}


		// Definindo variável de controle para uma tela selecionada na interface
		$scope.telaSelecionada = null;
		
		// FUNÇÕES ON = = = = = = = = = = = = = = = = = = = = = = = = = = = =

		// Executada quando clica em um checkbox - - - - - - - - - -
		$scope.onTelaCheckChange = function(evt,tela){
			if(tela.autorizada){
				$scope.telaSelecionada = tela;
			} else {
				$scope.telaSelecionada = null;
			}

			// Habilita o restaurar
			$scope.restaurarDisponivel = true;
		}

		$scope.onOpcoesClick = function(evt,tela){
			$scope.telaSelecionada = tela;
		}

		$scope.onRestaurarClick = function(){
			marcarTelasAutorizadas();
		}

		$scope.onSalvarClick = function(){
			salvar();
		}
		$scope.onOpcoesChange = function(){
			$scope.restaurarDisponivel = true;
		}

		// FUNÇÕES AUXILIARES = = = = = = = = = = = = = = = = = = = = = = = =
		function marcarTelasAutorizadas(){
			// definindo algumas variáveis antes dos loops
			var opcoes;
			var opcoesDeUsuario;
			var telaDeUsuario;
			var opcao;

			// Parsing telas. Marcando como autorizadas ou não, de acordo com as permissoes do usuário
			for (var i = $scope.telas.length - 1; i >= 0; i--) {
				telaDeUsuario = telasDoUsuario.find(function(a){
					return a.id==this;
				},$scope.telas[i].id);
				$scope.telas[i].autorizada = (telaDeUsuario != undefined);
				if($scope.telas[i].autorizada){
					opcoes = $scope.telas[i].opcoes;
					for (var j = opcoes.length - 1; j >= 0; j--) {
						opcao = telaDeUsuario.opcoes.find(function(a){return a.id==this;},opcoes[j].id);
						opcoes[j].autorizada = (opcao!=undefined && opcao.valor==1);
					}
				}
			}
		}

		function salvar(){
			// Selecionando somente telas salvas
			var telas = $scope.telas.filter(function(a){return a.autorizada});

			// Mapeando vetor de telas com uma função que remove informações desnecessárias
			telas = telas.map(function(tela){
				var b = {};
				b.id = tela.id;
				b.opcoes = tela.opcoes.filter(function(o){return o.autorizada});
				b.opcoes = b.opcoes.map(function(o){return {id:o.id,valor:1};});
				return b;
			})

			// Mostra carregando
			$scope.root.carregando = true;

			// Enviando para o servidor
			GDoksFactory.salvarTelasDeUsuario(id_usuario,telas)
			.success(function(response){
				// Esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Permissões de usuário salvas com sucesso!')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Alterando valor local
				telasDoUsuario = telas;

				// Desabilita o restaurar
				$scope.restaurarDisponivel = false;
			})
			.error(function(error){
				// Esconde carregando
				$scope.root.carregando = false;
				
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar alterar permissões de usuário.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = =
		function loadTelas(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				var db = evt.target.result;
				db.transaction('telas').objectStore('telas').getAll().onsuccess = function(evt){

					// Colocando telas no scope
					$scope.telas = evt.target.result;
					telasCarregadas = true;
					marcarTelasAutorizadas();			
				}
			}
		}

		function loadTelasDoUsuario(){
			// Mostra carregando
			$scope.root.carregando = true;

			// Fazendo requisição ao servidor
			GDoksFactory.getTelasDeUsuario(id_usuario)
			.success(function(response){

				// Esconde carregando
				$scope.root.carregando = false;

				telasDoUsuario = response.telas;
				telasDoUsuarioCarregadas = true;
				marcarTelasAutorizadas();
			})
			.error(function(error){
				// esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao carregar telas do usuário.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// imprimindo erro no console
				console.warn(error);
			});
		}
	}

})();
