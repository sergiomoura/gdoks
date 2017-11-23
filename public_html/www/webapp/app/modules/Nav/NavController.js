angular.module('Nav',[]).controller('NavController',NavController);

function NavController($scope){
	// variável que controla o estado de Nav (se deve ser expanded ou não)
	$scope.menuExpanded = false;

	// Função que altera o item do menu selecionado
	$scope.itemClicked = function(index){
		$scope.root.itemSelecionadoDoMenu = index;
		$scope.menuExpanded = false;
	}


	$scope.expandMenu = function(){
		$scope.menuExpanded = true;
	}

	$scope.contractMenu = function(){
		$scope.menuExpanded = false;
	}
}