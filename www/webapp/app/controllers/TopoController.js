angular.module('Topo',[])
.controller('TopoController',function($scope){
	$scope.toggleOpcoesMenu = function(){
		$scope.mostrandoOpcoes = !$scope.mostrandoOpcoes;
		if($scope.mostrandoOpcoes){
			document.getElementById("opcoes").style.top = "36px";
		} else {
			document.getElementById("opcoes").style.top = "-85px";
		}	
	}
});