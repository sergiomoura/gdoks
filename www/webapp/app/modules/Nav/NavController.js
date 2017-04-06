angular.module('Nav',[]).controller('NavController',NavController);

function NavController($scope){
	// Função que altera o item do menu selecionado
	$scope.itemClicked = function(index){
		$scope.root.itemSelecionadoDoMenu = index;
	}
}