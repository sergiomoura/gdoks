(function(){
	
	var modCargos = angular.module('Cargos',[]);

	var CargosController = function($scope,$mdDialog,GDoksFactory){

		$scope.cargos = [];

		GDoksFactory.getCargos().success(function(response){
			for (var i = response.cargos.length - 1; i >= 0; i--) {
				response.cargos[i].hh *= 1;
			}
			$scope.cargos = response.cargos;	
		});
		
		$scope.openDialog = function(ev,idCargo){
			// Declarando o objeto cargo clicado
			var cargoClicado;

			// Definindo o objeto cargo clicado
			if(idCargo == 0) {
				cargoClicado = {id:0,nome:null,hh:null};
			} else {
				cargoClicado = $scope.cargos.find(function(c){return c.id == this},idCargo);
			}

			$mdDialog.show(
				{
					controller: function($scope,cargo,parentCargo){
						$scope.cargo = cargo;

						$scope.salvar = function(cargo){
							if(cargo.id == 0){
								GDoksFactory.inserirCargo(cargo);
							} else {
								GDoksFactory.atualizarCargo(cargo)
								.success(function(response){
									parentCargo.hh = cargo.hh;
									parentCargo.nome = cargo.nome;
								})
								.error(function(err){
									console.dir(err);
								});
							}

							// Escondendo o cargo.
							$mdDialog.hide(cargo);
						};

						$scope.cancelar = function(cargo){
							console.log('Cancelando:');
							console.dir(cargo);
							$mdDialog.hide(cargo);
						}
					},
					locals:{
						cargo:angular.copy(cargoClicado),
						parentCargo:cargoClicado
					},
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