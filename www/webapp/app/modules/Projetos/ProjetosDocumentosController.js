angular.module('Projetos').controller('ProjetosDocumentosController',ProjetosDocumentosController);
function ProjetosDocumentosController($scope,GDoksFactory){
	
	// Carregando subdisciplinas da base
	$scope.srcSubdisciplinas = {data:[{'id':0,'nome':'Selecione...','id_disciplina':0,'nome_disciplina':''}],selected:null};
	
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('disciplinas').objectStore('disciplinas').getAll().onsuccess = function(evt){
			var disciplinas = evt.target.result;
			var disc;
			var sub;
			for (var i = disciplinas.length - 1; i >= 0; i--) {
				disc = disciplinas[i];
				for (var j = disc.subs.length - 1; j >= 0; j--) {
					sub = disc.subs[j];
					$scope.srcSubdisciplinas.data.push({'id':sub.id,'nome':sub.nome,'id_disciplina':disc.id,'nome_disciplina':disc.nome});
				}
			}
		}
	}

	// Watch a subdisciplina selecionada. caso elas mudem, muda os valores correspondentes no documentoEditado
	$scope.$watch('srcSubdisciplinas.selected',function(newSub,oldSub){
		if(newSub){
			$scope.documentoEditado.id_subdisciplina = newSub.id;
			$scope.documentoEditado.nome_subdisciplina = newSub.nome;
			$scope.documentoEditado.id_disciplina = newSub.id_disciplina;
			$scope.documentoEditado.nome_disciplina = newSub.nome_disciplina;
		}
	})

	// Watch a area selecionada. caso elas mudem, muda os valores correspondentes no documentoEditado
	$scope.$watch('srcAreas.selected',function(newArea,oldArea){
		if(newArea){
			$scope.documentoEditado.id_area = newArea.id;
			$scope.documentoEditado.nome_area = newArea.nome;
		}
	})

	// declarando variável para lidar com o select de áreas
	$scope.srcAreas = {selected:''}

	// Definindo função que abre campos para edição de documento
	$scope.editarDocumento = function(id){
		if(id != 0){
			// removendo um possível novo documento em edição
			$scope.projeto.documentos = $scope.projeto.documentos.filter(function(a){return a.id!=0});

			// criando o objeto documento editado
			$scope.documentoEditado = angular.copy($scope.projeto.documentos.filter(function(a){return a.id == this},id)[0]);

			// marcando o id do projeto do documento como sendo o id do projeto corrente
			$scope.documentoEditado.id_projeto = $scope.projeto.id;

			// selecionando a subdisciplina do documento editado
			$scope.srcSubdisciplinas.selected = $scope.srcSubdisciplinas.data.filter(function(s){return s.id==this},$scope.documentoEditado.id_subdisciplina)[0];

			// marcando area selecionada
			$scope.srcAreas.selected = $scope.projeto.areas.filter(function(a){return a.id == this},$scope.documentoEditado.id_area)[0];
		} else {
			// Criando objeto documento editado vazio
			$scope.documentoEditado = {
				id:0,
				id_projeto:$scope.projeto.id,
				nome:'',
				id_subdisciplina:0,
				nome_subdisciplina:'',
				id_disciplina:0,
				nome_disciplina:'',
				dependencias:[]
			};

			// adicionando documento vazio a lista de documentos
			$scope.projeto.documentos.push($scope.documentoEditado);

			// marcando subdisciplina selecionada
			$scope.srcSubdisciplinas.selected = $scope.srcSubdisciplinas.data[0];

			// marcando área selecionada
			$scope.srcAreas.selected = '';
		}
	}

	$scope.cancelarEdicaoDeDocumento = function(){
		$scope.documentoEditado = null;
		$scope.projeto.documentos = $scope.projeto.documentos.filter(function(a){return a.id!= 0});
	}

	$scope.salvarDocumento = function(){
		var doc = {
			id:$scope.documentoEditado.id,
			nome:$scope.documentoEditado.nome,
			id_subdisciplina:$scope.srcSubdisciplinas.selected.id,
			id_area:$scope.srcAreas.selected.id,
			id_projeto:$scope.projeto.id,
			dependencias:$scope.documentoEditado.dependencias.map(function(d){return d.id})
		};
		
		if(doc.id != 0){
			GDoksFactory.alterarDocumento(doc)
			.success(
				function(response){
					var docAlterado = $scope.projeto.documentos.filter(function(a){return a.id == this},doc.id)[0];
					docAlterado.nome				= $scope.documentoEditado.nome;
					docAlterado.id_area				= $scope.documentoEditado.id_area;
					docAlterado.nome_area			= $scope.documentoEditado.nome_area;
					docAlterado.id_subdisciplina	= $scope.documentoEditado.id_subdisciplina;
					docAlterado.nome_subdisciplina	= $scope.documentoEditado.nome_subdisciplina;
					docAlterado.id_disciplina		= $scope.documentoEditado.id_disciplina;
					docAlterado.nome_disciplina		= $scope.documentoEditado.nome_disciplina;
					docAlterado.dependencias		= angular.copy($scope.documentoEditado.dependencias);
					$scope.documentoEditado = null;
				}
			)
			.error(
				function(error){

				}
			);
		} else {
			GDoksFactory.adicionarDocumento(doc)
			.success(
				function(response){
					delete $scope.documentoEditado.id_projeto;
					$scope.documentoEditado.id = response.newId;
					$scope.documentoEditado = null;
				}
			)
			.error(
				function(error){

				}
			);
		}
	}

	$scope.removerDocumento = function(doc){
		if(confirm("Tem certeza que deseja remover o documento "+doc.nome+" do projeto "+$scope.projeto.nome+"?\nEssa ação não poderá ser desfieta.")){
		doc.id_projeto = $scope.projeto.id;
			GDoksFactory.removerDocumento(doc)
				.success(
					function(response){
						$scope.projeto.documentos = $scope.projeto.documentos.filter(function(a){ return a.id != this},doc.id);
					}
				)
				.error(
					function(error){

					}
				);
		}
	}

	$scope.getDependenciasPossiveis = function(query,doc){
		var result = $scope.projeto.documentos.filter(
			function(d){
				// calculando condicao de nao ser ancestral
				var naoEAncestral = dependenciasDeDocumento(this[1]).indexOf(d.id) == -1;

				// calculando condicao de evitar documento próprio
				var docDiferente = d.id != this[1].id;

				// calculando condicao do nome do documento conter o trecho digitado pelo usuário
				var contemTrecho = d.nome.toUpperCase().indexOf(this[0].toUpperCase()) != -1
				
				return naoEAncestral && docDiferente && contemTrecho;
			},[query,doc]);
		return result;
	}

	var dependenciasDeDocumento = function(doc){
		if(doc.dependencias.length == 0){
			return [];
		} else {
			var dep = doc.dependencias.map(function(d){return d.id});
			for (var i = doc.dependencias.length - 1; i >= 0; i--) {
				dep = dep.concat(dependenciasDeDocumento(doc.dependencias[i]));
			}
			return dep;
		}
	}
}