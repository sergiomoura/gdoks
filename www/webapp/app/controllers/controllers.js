var controllers = {};

controllers.RootController = function($scope,$interval,$cookies,GDoksFactory){
	// definindo o objeto root.
	$scope.root = {};

	// Definindo valores padrão para a interface
	$scope.root.itemSelecionadoDoMenu = 0;
	$scope.root.user = $cookies.getObject('user');

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
				console.dir(error);
				// window.location="/";
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
		$scope.mostrandoMenu = !$scope.mostrandoMenu;
		if($scope.mostrandoMenu){
			document.getElementById("menu").style.width = "186px";
			document.getElementById("view_container").style.width = "calc(100% - 186px)";
			document.getElementById("view_container").style.minWidth = "614px";
			document.getElementById("view_container").style.left = "186px";
		} else {
			document.getElementById("menu").style.width = "45px";
			document.getElementById("view_container").style.width = "calc(100% - 45px)"
			document.getElementById("view_container").style.left = "45px";
			document.getElementById("view_container").style.minWidth = "755px"
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
	}
}

controllers.NavController = function($scope){
	// Função que altera o item do menu selecionado
	$scope.itemClicked = function(index){
		$scope.root.itemSelecionadoDoMenu = index;
	}
};

controllers.HomeController = function($scope){}

controllers.UsuariosController = function($scope){};

controllers.ProjetosController = function($scope){};

controllers.DocumentosController = function($scope){};

controllers.DisciplinasController = function($scope){};

controllers.AFazerController = function($scope){};

controllers.ConfiguracoesController = function($scope){};

WebGDoks.controller(controllers);