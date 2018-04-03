<?php

	// Inclusões
	include('constantes.php');

	// Verificando se GET[id] está configurado
	if(!array_key_exists('uid', $_GET) || !array_key_exists('e', $_GET) || !array_key_exists('email', $_GET)){die();}

	// Lendo dados no $_GET
	$uid = $_GET['uid'];
	$email = $_GET['email'];
	$empresa = $_GET['e'];

	// Definindo o nome do arquivo temporário
	$file = TMP_PATH.$empresa.'/'.$email.'_'.$uid;
	

	// Verificando existência do arquivo
	if(!file_exists($file)){die();}

	// Determinando a idade do arquivo em minutos
	$idade = (time() - filemtime($file))/60;
	if($idade > VALIDADE_DO_PEDIDO_RECONFPWS){
		die('Seu pedido para reconfigurar seu login/senha tem mais de '. VALIDADE_DO_PEDIDO_RECONFPWS.' minutos. Tente novamente.');
	}

?>


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
				<md-input-container>
					<label>Novo Login</label>
					<input type="text" ng-model="data.login" id="login" required="required">
				</md-input-container>
				<md-input-container>
					<label>Nova Senha</label>
					<input type="password" ng-model="data.pass1" id="pass1" required="required">
				</md-input-container>
				<md-input-container>
					<label>Confirme Nova Senha</label>
					<input type="password" ng-model="data.pass2" id="pass2" required="required">
				</md-input-container>
				<md-button ng-click="send()" class="md-raised md-primary" ng-disabled="!esqueci.$valid || data.pass1!=data.pass2" aria-label="Entrar em empresa">{{data.pass1!=data.pass2?'Confirme sua nova senha corretamente':'Alterar informações de login'}}</md-button>
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
			function($scope,$http,$location,$mdToast){

				// Iniciando parâmetros
				$scope.carregando = false;
				$scope.data = {email: '',empresa:''};

				// Definindo função que submete dados
				$scope.send = function(){
					// Mostrando o carregando
					$scope.carregando = true;
					var search = $location.search();

					$scope.data.email = search.email;
					$scope.data.empresa = search.e;
					$scope.data.uid = search.uid;

					// Enviando requisição
					$http.post('/ext/reconfpws',$scope.data)
					.success(function(response){
						// Esconde Carregando
						$scope.carregando = false;
						
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Logni/senha reconfigurado com sucesso!.')
							.position('top right')
							.hideDelay(5000)
						);

						setTimeout(function(){window.location = '/webapp/login.php'},5000);
					})
					.error(function(error){
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(0)
						);
					})
				}
			}
		);

		// Configurando cores
		mod.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('orange',{'default':'800'});
		})

		mod.config(['$locationProvider', function($locationProvider) {
			$locationProvider.html5Mode({'enabled': true,'requireBase':false});
		}]);
	</script>

</html>