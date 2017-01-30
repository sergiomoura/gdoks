var controllers = {};

controllers.RootController = function($scope,$interval,$cookies,GDoksFactory){
	// definindo o objeto root.
	$scope.root = {};

	// Definindo valores padrão para a interface
	$scope.root.itemSelecionadoDoMenu = 4;

	// Defininfo valor inicial do item do submenu de projetos.
	$scope.root.itemSelecionadoDoPrjMenu = "prj_documentos";

	// definindo valor inicial para mostrandoMenu
	$scope.root.mostrandoMenu = false;

	// definindo o objeto que guarda as info do usuário logado.
	$scope.root.user = $cookies.getObject('user');

	// Definindo o vetor que guarda as informações públicas dos usuários do cliente
	$scope.root.usarios = [];

	// Definindo vetor que manterá os projetos que são visíveis pelo usuário.
	$scope.root.projetos = [];

	// Definindo objeto que representa o projeto selecionado
	// $scope.root.projetoSelecionado = null;

	// Definindo vetor que guarda as disciplinas;
	$scope.root.disciplinas = [];

	// Definindo funções que renovam o token
	var refreshToken = function(){
		GDoksFactory.refreshToken()
		.success(
			function(response){
				$scope.root.user.token = response.token;
				$cookies.putObject('user',$scope.root.user);
			}
		)
		.error(
			function(error){
				window.location="/";
			}
		);
	}

	// Acionando timer que renova o token de tempo em tempo
	$interval(refreshToken,TOKEN_REFRESH_IN);

	// renovando o token agora.
	refreshToken();
}

controllers.TopoController = function($scope){
	$scope.toggleSideMenu = function(){
		$scope.root.mostrandoMenu = !$scope.root.mostrandoMenu;
		if($scope.root.mostrandoMenu){
			// aumentando menu lateral esquerdo e diminuindo o view_container;
			document.getElementById("menu").style.width = "186px";
			document.getElementById("view_container").style.width = "calc(100% - 186px)";
			document.getElementById("view_container").style.minWidth = "614px";
			document.getElementById("view_container").style.left = "186px";

			// movendo o submenu de projetos caso ele esteja carregado.
			var menu = document.getElementById("prj_menu");
			if(menu){menu.style.marginLeft = "141px"};

		} else {
			document.getElementById("menu").style.width = "45px";
			document.getElementById("view_container").style.width = "calc(100% - 45px)"
			document.getElementById("view_container").style.left = "45px";
			document.getElementById("view_container").style.minWidth = "755px"

			// movendo o submenu de projetos caso ele esteja carregado.
			var menu = document.getElementById("prj_menu");
			if(menu){menu.style.marginLeft = "31px"};
		}
	}

	$scope.toggleOpcoesMenu = function(){
		$scope.mostrandoOpcoes = !$scope.mostrandoOpcoes;
		if($scope.mostrandoOpcoes){
			document.getElementById("opcoes").style.top = "36px";
		} else {
			document.getElementById("opcoes").style.top = "-85px";
		}	
	}
}

controllers.OpcoesController = function($scope,$cookies){
	$scope.onTrocarSenhaClick  = function(){
		$scope.root.itemSelecionadoDoMenu = null;
	}
	$scope.logout = function(){
		$cookies.put('token',null);
		window.location = '/';
	}
}

controllers.SenhaController = function($scope,$rootScope,GDoksFactory){
	// Inicializando o objeto data;
	$scope.data = {};
	$scope.data.login = '';
	$scope.data.senha1 = '';
	$scope.data.senha2 = '';
	$scope.obteve_resposta = false;
	$scope.ok = false;
	$scope.msg = '';

	$scope.mudaLoginSenha = function(novoLogin,novaSenha){
		GDoksFactory.mudaLoginSenha(novoLogin,novaSenha)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = true;
					$scope.msg = 'Alterações realizadas com sucesso!';
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = false;
					$scope.msg = error.msg;
				}
			);
	}

	$scope.cancel = function(){
		window.location = "WebGDoks.php#/home"
		$scope.root.itemSelecionadoDoMenu = 0;
	}
}

controllers.NavController = function($scope){
	// Função que altera o item do menu selecionado
	$scope.itemClicked = function(index){
		$scope.root.itemSelecionadoDoMenu = index;
	}
};

controllers.HomeController = function($scope){}

controllers.UsuariosController = function($scope,GDoksFactory){
	// Carregando os usuários do servidor
	GDoksFactory.loadUsuarios()
		.success(
			function(response){
				$scope.root.usuarios = response.usuarios;
				for (var i = $scope.root.usuarios.length - 1; i >= 0; i--) {
					$scope.root.usuarios[i].ativo = ($scope.root.usuarios[i].ativo==1);
				};
			}
		)
		.error(
			function(error){
			}
		);

	// função que leva para a tela de adicionar usuário
	$scope.goToAddUsuario = function(){
		window.location = '#/usuarios/0';
	}
};

controllers.UsuarioController = function($scope,$routeParams,GDoksFactory){
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
		// Buscando o usuário que tem como id o id passado
		$scope.usuario = angular.copy($scope.root.usuarios.filter(function(u){return u.id==this},$routeParams.id)[0]);

		// guardando estado inicial do atributo "ativo"
		$scope.inicialmenteAtivo = ($scope.usuario.ativo == true);	
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
					$scope.root.usuarios.push($scope.usuario);
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

					// atualizando usuário alterado no root
					$scope.root.usuarios.filter(function(u){return u.id==this},$scope.usuario.id)[0] = $scope.usuario;
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

controllers.ProjetosController = function($scope,$location,GDoksFactory){
	$scope.onPrjMenuClick = function(anchor){
		$location.hash(anchor);
		var scroll = $('#'+anchor).position().top - 40;
		$("#container_horizontal").animate({scrollTop: scroll}, "slow",function(){});
		$scope.root.itemSelecionadoDoPrjMenu = anchor;
	}

	// Fazendo com que página se mostre o ponto correto.
	$scope.onPrjMenuClick($location.hash());

	// posicionando o menu de projeto corretamente, de acordo com o $scope.root.mostrandoMenu
	if($scope.root.mostrandoMenu){
		document.getElementById("prj_menu").style.marginLeft = "141px"
	} else {
		document.getElementById("prj_menu").style.marginLeft = "31px"
	}

	// Carregando os projetos do servidor
	GDoksFactory.getProjetos()
		.success(
			function(response){
				$scope.root.projetos = response.projetos;
				for (var i = $scope.root.projetos.length - 1; i >= 0; i--) {
					$scope.root.projetos[i].ativo = ($scope.root.projetos[i].ativo==1);
				};

				// Criando um projeto 'vazio'
				var prjVazio = {
					'id_projeto':0,
					'nome_projeto':'Adicionar novo projeto...',
					'ativo':true,
					'permissao':3
				};

				// Configurando as opções do menu de projeto
				$scope.opcoesDeProjeto = angular.copy($scope.root.projetos);
				$scope.opcoesDeProjeto.unshift(prjVazio);

				// Definindo o projeto que vai aparecer inicialmente selecionado
				$scope.opcaoSelecionada = ($scope.root.projetos.length > 0)?$scope.root.projetos[0]:prjVazio;
				
			}
		)
		.error(
			function(error){
			}
		);

};

controllers.DocumentosController = function($scope){};

controllers.DisciplinasController = function($scope,GDoksFactory){
	GDoksFactory.getDisciplinas()
		.success(
			function(response){
				$scope.root.disciplinas = response.disciplinas;
				for (var i = $scope.root.disciplinas.length - 1; i >= 0; i--) {
					$scope.root.disciplinas[i].ativa = ($scope.root.disciplinas[i].ativa==1);
				};
			}
		)
		.error(
			function(error){
			}
		);

	// função que leva para a tela de adicionar disciplina
	$scope.goToAddDisciplina = function(){
		window.location = '#/disciplinas/0';
	}
};

controllers.DisciplinaController = function($scope,$routeParams,GDoksFactory){
	// Capturando o id passado na url
	var id = $routeParams.id;
	$scope.subdisciplinaEditada = null;
	$scope.erroEmOperacaoDeSubdisciplina = null;


	// se id== 0, adicionar uma nova disciplina. se não carregar o disciplinas de id passado
	if(id == 0) {
		// Criando uma disciplina vazia.
		$scope.disciplina = {};
		$scope.disciplina.id = 0;
		$scope.disciplina.nome = '';
		$scope.disciplina.ativa = true;
		$scope.inicialmenteAtiva = true;
		$scope.disciplina.subs = [];
		$scope.disciplina.especialistas = [];
		$scope.disciplina.validadores = [];
	} else {
		// Carregando dados da disciplina no servidor
		GDoksFactory.getDisciplina(id)
			.success(
				function(response){
					$scope.disciplina = response.disciplina;
					$scope.disciplina.ativa = ($scope.disciplina.ativa==1);
					for (var i = $scope.disciplina.subs.length - 1; i >= 0; i--) {
						$scope.disciplina.subs[i].ativa = ($scope.disciplina.subs[i].ativa==1);
					};
					$scope.disciplinaRef = angular.copy(response.disciplina);
					$scope.root.disciplinas.filter(function(a){return a.id == this},id)[0] = $scope.disciplinaRef;
					$scope.inicialmenteAtiva = $scope.disciplina.ativa;
				}
			)
			.error(
				function(error){
					
				}
			);
	}

	$scope.salvarDisciplina = function(){
		if($scope.disciplina.id == 0){
			GDoksFactory.adicionarDisciplina($scope.disciplina)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.disciplina.id = response.newId;
					$scope.root.disciplinas.push($scope.disciplina);
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
			GDoksFactory.atualizarDisciplina($scope.disciplina)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// atualizando usuário alterado no root
					$scope.root.disciplinas.filter(function(d){return d.id==this},$scope.disciplina.id)[0] = $scope.disciplina;
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

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		window.location = "WebGDoks.php#/disciplinas";
		$scope.root.itemSelecionadoDoMenu = 0;
	}

	// definindo função que remove subdisciplina
	$scope.removerSubdisciplina = function(id){
		if(confirm("Tem certeza que deseja excluir a subdisciplina? A ação não poderá ser desfeita.")){
			var sub = $scope.disciplina.subs.find(function(a){return a.id == this},id);
			sub.id_disciplina = $scope.disciplina.id;
			GDoksFactory.removerSubdisciplina(sub)
				.success(
					function(response){
						$scope.disciplina.subs = $scope.disciplina.subs.filter(function(a){return a.id!=this},id);
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeSubdisciplina = error.msg;
					}
				);
		}
	}

	// definindo função que edita subdisciplina
	$scope.editarSubdisciplina = function(id){
		if(id != 0){
			$scope.subdisciplinaEditada = angular.copy($scope.disciplina.subs.filter(function(a){return a.id == this},id)[0]);
			$scope.subdisciplinaEditada.id_disciplina = $scope.disciplina.id;
			setTimeout(function(){document.getElementById("nome_"+id).focus()},10);
		} else {
			$scope.subdisciplinaEditada = {};
			$scope.subdisciplinaEditada.id = 0;
			$scope.subdisciplinaEditada.id_disciplina = $scope.disciplina.id;
			$scope.subdisciplinaEditada.nome = "";
			$scope.subdisciplinaEditada.sigla = "";
			$scope.subdisciplinaEditada.ativa = true;
			$scope.disciplina.subs.push($scope.subdisciplinaEditada);
			setTimeout(function(){document.getElementById("nome_0").focus()},10);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmSubdisciplina = function(){
		if($scope.subdisciplinaEditada.id == 0){
			$scope.disciplina.subs = $scope.disciplina.subs.filter(function(a){return a.id!=0});
		}
		$scope.subdisciplinaEditada = null;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarSubdisciplina = function(){
		if($scope.subdisciplinaEditada != null){
			if($scope.subdisciplinaEditada.id != 0){
				GDoksFactory.atualizarSubdisciplina($scope.subdisciplinaEditada)
					.success(
						function(response){
							var sub = $scope.disciplina.subs.find(function(a){return a.id == this},$scope.subdisciplinaEditada.id);
							sub.nome = $scope.subdisciplinaEditada.nome;
							sub.sigla = $scope.subdisciplinaEditada.sigla;
							sub.ativa = $scope.subdisciplinaEditada.ativa;
							$scope.subdisciplinaEditada = null;
							$scope.erroEmOperacaoDeSubdisciplina = null;
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeSubdisciplina = error.msg;
						}
					);
			} else {
				GDoksFactory.adicionarSubdisciplina($scope.subdisciplinaEditada)
					.success(
						function(response){
							$scope.subdisciplinaEditada.id = response.newId;
							$scope.subdisciplinaEditada = null;
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeSubdisciplina = error.msg;
						}
					);
			}
		}
	}

};

controllers.AFazerController = function($scope){};

controllers.ConfiguracoesController = function($scope){};

WebGDoks.controller(controllers);