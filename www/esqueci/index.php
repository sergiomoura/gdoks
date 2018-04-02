<!DOCTYPE html>
<html lang="pt-br" ng-app="GDoksEsqueci">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>GDoks</title>
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="../webapp/css/normalizer.css">
		<link rel="stylesheet" href="../webapp/node_modules/angular-material/angular-material.min.css">
		<link rel="stylesheet" href="../webapp/css/geral.css">
		<link rel="stylesheet" href="../webapp/css/esqueci.css">
	</head>
	<body ng-controller="controller">
		<div class="container" ng-cloak>
			<md-progress-linear md-mode="indeterminate" ng-if="carregando"></md-progress-linear>
			<form name="esqueci" class="login" layout="column" md-whiteframe="1dp">
				<img src="../webapp/img/logo.png" alt="GDoks">
				<div style="text-align:center;">
					Esqueceu sua senha?
				</div>
				<md-input-container>
					<label>Qual a sua empresa?</label>
					<input type="text" ng-model="data.empresa" id="empresa" required="required">
				</md-input-container>
				<md-input-container>
					<label>Digite o seu e-mail cadastrado</label>
					<input type="email" ng-model="data.email" id="email" required="required">
				</md-input-container>
				<md-button ng-click="send()" class="md-raised md-primary" ng-disabled="!esqueci.$valid" aria-label="Entrar em empresa">Enviar link para nova senha</md-button>
				<button type="submit"></button>
			</form>
		</div>
	</body>
	<script src="../webapp/node_modules/angular/angular.min.js"></script>
	<script src="../webapp/node_modules/angular-animate/angular-animate.min.js"></script>
	<script src="../webapp/node_modules/angular-aria/angular-aria.min.js"></script>
	<script src="../webapp/node_modules/angular-cookies/angular-cookies.min.js"></script>
	<script src="../webapp/node_modules/angular-material/angular-material.min.js"></script>
	<script>
		// Definindo módulo
		var mod = angular.module("GDoksEsqueci",['ngAnimate','ngMaterial']);

		// Definindo controller
		mod.controller('controller',
			function($scope,$http,$mdToast){

				// Iniciando parâmetros
				$scope.carregando = false;
				$scope.data = {email: '',empresa:''};

				// Definindo função que submete dados
				$scope.send = function(){
					// Mostrando o carregando
					$scope.carregando = true;

					// Enviando requisição
					$http.post('/ext/esqueci',$scope.data)
					.success(function(response){
						// Esconde Carregando
						$scope.carregando = false;
						
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Siga as instruções enviadas no email para reconfigurar a sua senha.')
							.position('top right')
							.hideDelay(5000)
						);

						// Redirecionando para a tela de login
						setTimeout(function(){window.location = "/webapp/login.php"},6000);

					})
					.error(function(error){
						// Esconde Carregando
						$scope.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(0)
						);
					});
				}
			}
		);

		// Configurando cores
		mod.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('orange',{'default':'800'});
		})
	</script>
</html>