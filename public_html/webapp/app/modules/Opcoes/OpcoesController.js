angular.module('Opcoes',[])
.controller('OpcoesController',function($scope,$cookies,$location){
	$scope.onTrocarSenhaClick  = function(){
		$location.url("/senha");
	}
	$scope.logout = function(){
		$cookies.remove('user',{path:'/'});
		indexedDB.deleteDatabase('gdoks');
		window.location = '/';
	}
})