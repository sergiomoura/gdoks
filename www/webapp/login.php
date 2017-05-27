<!DOCTYPE html>
<html lang="pt-br" ng-app="WebGDoks">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>GDoks</title>
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="css/normalizer.css">
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/login.css">
		<script src="js/angular/angular.min.js"></script>
		<script src="js/angular/angular-cookies.min.js"></script>
	</head>
	<body ng-controller="LoginController">
		<div class="container">
			<img src="img/logo.png" alt="GDoks">
			<form class="bloco_conteudo" ng-submit="getToken()">
				<div>
					<label for="cliente">Empresas</label>
					<input type="text" name="empresa" id="empresa" value="" ng-model="empresa" focus />
				</div>
				<div>
					<label for="login">Login</label>
					<input type="text" name="login" id="login" value="" ng-model="login" />
				</div>
				<div>
					<label for="Senha">Senha</label>
					<input type="password" name="senha" id="senha" value="" ng-model="senha">
				</div>
				<button type="submit" class="bt_azul">Entrar</button>
			</form>
			<div ng-if="loginFail" class="loginFail">Login/Senha inválidos.</div>
		</div>
	</body>
	<script src="app/services/constants.js"></script>
	<script>
		// Definindo o módulo
		var WebGDoks = angular.module('WebGDoks',['ngCookies']);

		// Definindo Controladores do módulo.
		WebGDoks.controller(
			'LoginController',
			function($scope,$http,$cookies){

				// Determinando valores inciais
				$scope.loginFail = false;

				// Defininfo função que tenta fazer o login e recuperar um token para acesso
				$scope.getToken = function(){
					var data = {}
					data.login = $scope.login;
					data.senha = $scope.senha;
					data.empresa = $scope.empresa;
					$http.post(API_ROOT+'/login',data).
					then(function(response) {
						$scope.loginFail = false;
						if(response.data.error === 0){

							// Guardando os dados do usuário nos cookies
							$cookies.putObject('user',response.data.user);

							// Limpando base de dados.
							var deleteRequest = indexedDB.deleteDatabase("gdoks");
							deleteRequest.onsuccess = function(evt){
								console.log("lá vamos nós");
								// indo para a página principal do aplicativo
								window.location = "WebGDoks.php";
							}

							deleteRequest.onerror = function(evt){
								console.log("Erro ao tentar zerar base de dados.");
								console.dir(evt);
							}
						}
					}, function(response) {
						$scope.loginFail = true;
					});
				}
			}
		);
	</script>
	<script src="app/directives/directives.js"></script>
</html>