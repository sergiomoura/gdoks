(function(){
	
	var modCargos = angular.module('Cargos',[]);

	var CargosController = function($scope,$mdDialog,GDoksFactory){

		GDoksFactory.getCargos();
		$scope.cargos = [
			{id:1,nome:"Engenheiro Pleno",hh:80},
			{id:2,nome:"Engenheiro Senior",hh:150},
			{id:3,nome:"Engenheiro Júnior",hh:50},
			{id:4,nome:"Técnico Meeiro",hh:50.6},
			{id:5,nome:"Desenhista",hh:50}
		];

		$scope.openDialog = function(ev,idCargo){
			var cargoClicado = $scope.cargos.find(function(c){return c.id == this},idCargo);
			$mdDialog.show(
				{
					controller: function($scope,cargo){
						$scope.cargo = cargo;

						// função que salva o
						$scope.salvar = function(cargo){
							console.log('Salvando Cargo:');
							console.dir(cargo);
							$mdDialog.hide(cargo);
						};

						$scope.cancelar = function(cargo){
							console.log('Cancelando:');
							console.dir(cargo);
							$mdDialog.hide(cargo);
						}
					},
					locals:{cargo:cargoClicado},
					templateUrl: './app/modules/Cargos/cargo-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
				});
		}
	}

	modCargos.controller('CargosController',CargosController);
})();