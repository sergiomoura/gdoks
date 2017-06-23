<!DOCTYPE html>
<html lang="pt-br" ng-app="WebGDoks">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>GDoks</title>
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="css/normalizer.css">
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/login.css">
	</head>
	<body ng-controller="LoginController">
		<div class="container" ng-cloak>
			<img src="img/logo.png" alt="GDoks">
			<md-progress-linear md-mode="indeterminate" ng-if="carregando"></md-progress-linear>
			<form ng-submit="getToken()" class="login" layout="column" md-whiteframe="1dp">
				<md-input-container>
					<label>Empresa</label>
					<input type="text" ng-model="loginData.empresa" id="empresa">
				</md-input-container>
				<md-input-container>
					<label>Login</label>
					<input type="text" ng-model="loginData.login" id="login" >
				</md-input-container>
				<md-input-container>
					<label>Senha</label>
					<input type="password" ng-model="loginData.senha" id="senha" >
				</md-input-container>
				<md-button ng-click="getToken()" class="md-raised md-primary" ng-disabled="empresa=='' || login=='' || senha==''" aria-label="Entrar em empresa">Entrar</md-button>
				<button type="submit"></button>
			</form>
			<div ng-if="loginFail" class="loginFail">Login/Senha inválidos.</div>
			<div ng-if="getIddbFail" class="loginFail">Empresa Inexistente.</div>
		</div>
	</body>
	<script src="js/angular/angular.min.js"></script>
	<script src="js/angular/angular-cookies.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-animate.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-aria.min.js"></script>
	<script src="app/services/constants.js"></script>
	<script>
		// Definindo o módulo
		var WebGDoks = angular.module('WebGDoks',['ngCookies','ngAnimate','ngMaterial']);

		// Definindo Controladores do módulo.
		WebGDoks.controller(
			'LoginController',
			function($scope,$http,$cookies){
				// Limpando variáveis do scope. (anula auto complete)
				$scope.loginData = {};
				$scope.loginData.login = '';
				$scope.loginData.senha = '';
				$scope.loginData.empresa = '';

				// dando foco nos campos na tora.
				// focus directive não funciona com o ng-cloak e para funcionar o posicionamento dos labels
				setTimeout(function(){
					document.getElementById("senha").focus();
					document.getElementById("login").focus();
					document.getElementById("empresa").focus();
				},100);

				// Determinando valores inciais
				$scope.loginFail = false;
				$scope.carregando = false;

				// Definindo função que tenta obter o token
				$scope.getToken = function(){
					
					// Iniciando animação de carregando
					$scope.carregando = true;

					// Escondendo mensagem de login falho
					$scope.loginFail = false;

					// fazendo post
					$http.post(API_ROOT+'/login',$scope.loginData,{headers:{Authorization:$scope.loginData.empresa + '-0'}})
					.then(function(response) {
						// Parando animação de carregando
						$scope.carregando = false;
						
						if(response.data.error === 0){

							// Guardando os dados do usuário nos cookies
							$cookies.putObject('user',response.data.user,{path:'/'});
							
							// Limpando base de dados.
							var deleteRequest = indexedDB.deleteDatabase("gdoks");
							deleteRequest.onsuccess = function(evt){
								// indo para a página principal do aplicativo
								window.location = "WebGDoks.php";
							}
							
							deleteRequest.onerror = function(evt){
								console.log("Erro ao tentar zerar base de dados.");
								console.dir(evt);
							}
						}
					}, function(response) {
						$scope.carregando = false;
						$scope.loginFail = true;
					});
				}
			}
		);

		// Configurando cores
		WebGDoks.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('orange',{'default':'800'});
		})

	</script>
	<script src="app/directives/directives.js"></script>
</html>