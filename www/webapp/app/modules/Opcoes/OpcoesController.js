angular.module('Opcoes',[])
.controller('OpcoesController',function($scope,$cookies,$location){
	$scope.onTrocarSenhaClick  = function(){
		$location.url("/senha");
	}
	$scope.logout = function(){
		$cookies.remove('token');
		$cookies.remove('user',{path:'/'});
		window.location = '/';
	}
})