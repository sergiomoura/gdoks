var controllers = {};

controllers.TopoController = function($scope){
	$scope.toggleSideMenu = function(){
		$scope.mostrandoMenu = !$scope.mostrandoMenu;
		if($scope.mostrandoMenu){
			document.getElementById("menu").style.width = "186px";
		} else {
			document.getElementById("menu").style.width = "45px";
		}
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