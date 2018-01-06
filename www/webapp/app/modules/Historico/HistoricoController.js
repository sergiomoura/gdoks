(function(){
	angular.module('Historico',[])
	.controller('HistoricoController',HistoricoController);

	// Defininfo função controller
	function HistoricoController($scope,$cookies){
		$scope.historico = $cookies.getObject('historico');
		console.dir($scope.historico);
	}
})();