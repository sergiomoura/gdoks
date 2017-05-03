angular.module('DocumentosParaValidacao',[])
.controller('DocumentosParaValidacaoController',DocumentosParaValidacaoController)
.directive('gdoksDpv',function(){
	return {
		templateUrl:'app/modules/DocumentosParaValidacao/tmpl-dpv.html',
		restrict:'E',
		scope:{
			dpv:'=dpv'
		},
		controller:['$scope','GDoksFactory',function($scope,GDoksFactory){
			// Inicializando variáveis;
			$scope.mostrandoHistorico = false;
			$scope.progresso = $scope.dpv.progressoAValidar;
			$scope.mostrandoFormDeValidacao = false;

			$scope.downloadFile = function(idArquivo){
				GDoksFactory.downloadArquivo(idArquivo);
			}

			$scope.escondeFormDeValidacao = function(){
				$scope.mostrandoFormDeValidacao = false;
			}

			$scope.mostraFormDeValidacao = function(){
				$scope.mostrandoFormDeValidacao = true;
				$scope.progresso = $scope.dpv.progressoAValidar;
			}

			$scope.validarProgresso = function(){
				GDoksFactory.validarProgresso($scope.dpv.id, $scope.dpv.progressoValidado + $scope.progresso)
				.success(function(response){
					if(response.error == 0){
						$scope.escondeFormDeValidacao();
						$scope.dpv.progressoValidado += $scope.progresso;
						$scope.dpv.progressoAValidar = 0;
					}
				})
				.error(function(error){
					
				})
			}
		}]
	}
})
.filter('daysFromNow',function(){
	return function(futureDate){
		var diff = Math.ceil((futureDate - (new Date()))/86400000);
		if(diff == 1){
			return ('1 dia restante');
		} else if(diff > 1){
			return (diff + ' dias restantes');
		} else if(diff == 0) {
			return 'Hoje';
		} else if(diff == -1 ) {
			return ('1 dia atrás');
		} else {
			return ((-diff) + ' dias atrás');
		}
	}
})

function DocumentosParaValidacaoController($scope,GDoksFactory){

	// Definindo vetor de dpvs
	$scope.dpvs = [];

	// definindo variáveis de controle de carregamento de dependencias
	var carregouUsuarios = false;

	// Definindo qual o campo padrão para se ordenar os documentos
	$scope.ordem = 'nome';

	// Levantando usuarios da base local
	var usuarios = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
			usuarios = evt.target.result;
			carregouUsuarios = true;
			if(dependenciasEstaoOK()){
				carregaDpvs();
			}
		}
	}

	// definindo funcoes auxiliares
	function dependenciasEstaoOK(){
		return carregouUsuarios;
	}

	function parseDpvs(){

		// Percorrendo o vetor de dpvs
		var dpv;
		for (var i = $scope.dpvs.length - 1; i >= 0; i--) {
			// substituindo dpv em questão para encurtar codigo
			dpv = $scope.dpvs[i];

			// Transformando string de data da data_limite em objeto js Date
			dpv.data_limite = new Date(dpv.data_limite);

			// Determinando o valor do percentual a ser validado.
			if(dpv.progressos.length == 1){

				// Caso só haja um arquivo/progresso, o progresso a validar é o progresso que este carrega
				dpv.progressoAValidar = dpv.progressos[0].progresso_total;
				dpv.progressoValidado = 0;

			} else if(dpv.progressos.length > 1){

				// Caso haja mais de um arquivo progresso, o progresso a validar é a diferença entre os dois últimos progressos totais
				dpv.progressoAValidar = dpv.progressos[dpv.progressos.length - 1].progresso_total - dpv.progressos[dpv.progressos.length - 2].progresso_total;
				dpv.progressoValidado = dpv.progressos[dpv.progressos.length - 2].progresso_total;

			} else {
				// Só entra neste bloco de código quando o vetor de progressos estiver vazio, o que não deve ocorrer nunca para esta tela.
			}

			// Percorrendo o vetor de progressos;
			for (var k = dpv.progressos.length - 1; k >= 0; k--) {
				dpv.progressos[k].data = new Date(dpv.progressos[k].data);
				dpv.progressos[k].usuario = usuarios.filter(function(u){return u.id == this},dpv.progressos[k].idu)[0];
			}
		}
	}

	function carregaDpvs(){
		GDoksFactory.getDocumentosParaValidar()
			.success(function(response){
				$scope.dpvs = response.documentos;
				parseDpvs();
			})
			.error(function(error){
			});
	}
};