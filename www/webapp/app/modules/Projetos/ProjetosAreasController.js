angular.module('Projetos').controller('ProjetosAreasController',ProjetosAreasController);
function ProjetosAreasController($scope,GDoksFactory){
	// Definindo função que remove área
	$scope.removerArea = function(id){
		if(confirm("Tem certeza que deseja excluir a área? A ação não poderá ser desfeita.")){
			var area = $scope.projeto.areas.find(function(a){return a.id == this},id);
			area.id_projeto = $scope.projeto.id;
			GDoksFactory.removerArea(area)
				.success(
					function(response){
						$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!=this},id);
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeSubdisciplina = error.msg;
					}
				);
		}
	}

	// definindo função que edita area
	$scope.editarArea = function(id){
		if(id != 0){
			$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!=0});
			$scope.areaEditada = angular.copy($scope.projeto.areas.filter(function(a){return a.id == this},id)[0]);
			$scope.areaEditada.id_projeto = $scope.projeto.id;
			setTimeout(function(){document.getElementById("codigo_area_"+id).focus()},10);
		} else {
			$scope.areaEditada = {};
			$scope.areaEditada.id = 0;
			$scope.areaEditada.id_projeto = $scope.projeto.id;
			$scope.areaEditada.nome = "";
			$scope.areaEditada.codigo = "";
			$scope.projeto.areas.push($scope.areaEditada);
			setTimeout(function(){document.getElementById("codigo_area_0").focus()},10);
		}
	}

	// definindo função que cancela alterações em area
	$scope.cancelarAlteracoesEmArea = function(){
		if($scope.areaEditada.id == 0){
			$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!=0});
		}
		$scope.areaEditada = null;
	}

	// definindo função que salva alterações em area
	$scope.salvarArea = function(){
		if($scope.areaEditada != null){
			if($scope.areaEditada.id != 0){
				GDoksFactory.atualizarArea($scope.areaEditada)
					.success(
						function(response){
							
							var area = $scope.projeto.areas.find(function(a){return a.id == this},$scope.areaEditada.id);
							area.nome = $scope.areaEditada.nome;
							area.codigo = $scope.areaEditada.codigo;
							
							$scope.areaEditada = null;
							$scope.erroEmOperacaoDeArea = null;
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeArea = error.msg;
						}
					);
			} else {
				GDoksFactory.adicionarArea($scope.areaEditada)
					.success(
						function(response){
							$scope.areaEditada.id = response.newId;
							$scope.areaEditada = null;
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeArea = error.msg;
						}
					);
			}
		}
	}
}