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
	$scope.onHelpClick = function(){
		window.open('/help/help.html','_blank');
	}
	$scope.onSobreClick = function(){
		$location.url("/sobre");
	}
});