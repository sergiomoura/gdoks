angular.module('Opcoes',[])
.controller('OpcoesController',function($scope,$cookies,$location){
	$scope.onTrocarSenhaClick  = function(){
		$location.path("/senha");
	}
	$scope.logout = function(){
		$cookies.put('token',null);
		window.location = '/';
	}
})