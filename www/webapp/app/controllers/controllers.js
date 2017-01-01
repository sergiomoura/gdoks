var controllers = {};

controllers.TopoController = function($scope){
	$scope.toggleSideMenu = function(){
		$scope.mostrandoMenu = !$scope.mostrandoMenu;
		if($scope.mostrandoMenu){
			document.getElementById("menu").style.width = "186px";
			document.getElementById("view_container").style.width = "calc(100% - 186px)"
			document.getElementById("view_container").style.minWidth = "614px"
		} else {
			document.getElementById("menu").style.width = "45px";
			document.getElementById("view_container").style.width = "calc(100% - 45px)"
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
	$scope.logout = function(){
		$cookies.put('token',null);
		window.location = '/';
	}
}

controllers.SenhaController = function($scope,GDoksFactory){
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

controllers.NavController = function($scope,$interval,$cookies,GDoksFactory){
	// Item 0 do menu, por padrão, vem selecionado.
	$scope.selectedIndex = 0;

	var refreshToken = function(){
		GDoksFactory.refreshToken()
		.success(
			function(response){
				$cookies.put('token',response.token);
			}
		)
		.error(
			function(error){
				window.location="/";
			}
		);
	}

	$scope.itemClicked = function(index){
		$scope.selectedIndex = index;
	}
	$interval(refreshToken,TOKEN_REFRESH_IN);
	refreshToken();
};

controllers.HomeController = function($scope){}

controllers.UsuariosController = function($scope){};

controllers.ProjetosController = function($scope){};

controllers.DocumentosController = function($scope){};

controllers.DisciplinasController = function($scope){};

controllers.AFazerController = function($scope){};

controllers.ConfiguracoesController = function($scope){};

WebGDoks.controller(controllers);