(function(){
	angular.module('Historico',[])
	.controller('HistoricoController',HistoricoController);

	// Defininfo função controller
	function HistoricoController($scope,$cookies,$location){
		$scope.goToDoc = function(idDoc){
			$location.url('/documentos/'+idDoc);
		}
	}
})();