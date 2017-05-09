(function(){
	
	var modCargos = angular.module('Cargos',[]);

	var CargosController = function($scope){
		$scope.teste = "Blabla bla!";
	}

	modCargos.controller('CargosController',CargosController);
})();