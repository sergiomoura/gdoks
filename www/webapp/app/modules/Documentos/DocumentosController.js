angular.module('Documentos',[])
.controller('DocumentosController',DocumentosController)
.directive('gdoksDoc',function(){
	return {
		templateUrl:'app/modules/Documentos/tmpl-doc.html',
		restrict:'E',
		scope:{
			doc:'=doc'
		},
		controller:['$scope','GDoksFactory','$cookies',function($scope,GDoksFactory,$cookies){

			// Inicializando variáveis;
			$scope.mostrandoHistorico = false;
			$scope.mostrandoFormDeUpload = false;
			$scope.hoje = new Date();

			$scope.downloadFile = function(idArquivo){
				GDoksFactory.downloadArquivo(idArquivo);
			}

			$scope.mostraFormDeUpload = function(){
				$scope.mostrandoFormDeUpload = true;
			}

			$scope.escondeFormDeUpload = function(){
				$scope.mostrandoFormDeUpload = false;
			}

			$scope.downloadFile = function(idArquivo,confirmarTravamento){
				if(confirmarTravamento === true){
					var travarDocumento	= confirm("Deseja bloquear o documento contra alterações de terceiros?");
					if(travarDocumento){
						$scope.lockDoc();
					}
				}
				GDoksFactory.downloadArquivo(idArquivo);
			}

			$scope.lockDoc = function(){
				GDoksFactory.lockDoc($scope.doc.id)
				.success(function(response){
					if(response.error == 0){
						// desbloqueou com sucesso
						$scope.doc.idu_checkout = response.lockInfo.idu_checkout;
						$scope.doc.datahora_checkout = new Date(response.lockInfo.datahora_checkout);
					} else if(response.error == 2){
						// documento já estava bloqueado
						$scope.doc.idu_checkout = response.lockInfo.idu_checkout;
						$scope.doc.datahora_checkout = new Date(response.lockInfo.datahora_checkout);
					}
				})
				.error(function(error){});
			}

			$scope.delockDoc = function(){
				GDoksFactory.delockDoc($scope.doc.id)
				.success(function(response){
					if(response.error == 0){
						// desbloqueou com sucesso
						$scope.doc.idu_checkout = null;
						$scope.doc.datahora_checkout = null;
					} else if(response.error == 3){
						// algo estranho aconteceu....
						$scope.doc.idu_checkout = response.lockInfo.idu_checkout;
						$scope.doc.datahora_checkout = response.lockInfo.datahora_checkout;
					}
				})
				.error(function(error){});
			}

			$scope.upload = function(){
				console.log("Vamos subir arquivo!!!");
				console.dir($scope.docFile);
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

function DocumentosController($scope,GDoksFactory){

	// Definindo vetor de dpvs
	$scope.docs = [];

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
				carregaDocs();
			}
		}
	}

	// definindo funcoes auxiliares
	function dependenciasEstaoOK(){
		return carregouUsuarios;
	}

	function parseDocs(){
		
		// Percorrendo o vetor de docs
		var doc;
		for (var i = $scope.docs.length - 1; i >= 0; i--) {
			// substituindo doc em questão para encurtar codigo
			doc = $scope.docs[i];

			// Transformando string de data da data_limite em objeto js Date
			doc.data_limite = new Date(doc.data_limite);

			// Determinando o valor do percentual a ser validado.
			if(doc.progressos.length == 0){
				doc.progressoAValidar = 0;
				doc.progressoValidado = 0;
			} else {
				if(doc.id_progresso_a_validar == null){
					doc.progressoAValidar = 0;
					doc.progressoValidado = doc.progressos[doc.progressos.length - 1].progresso_total;
				} else {
					if(doc.progressos.length == 1){
						doc.progressoAValidar = doc.progressos[0].progresso_total;	
						doc.progressoValidado = 0;
					} else {
						var lastIndex = doc.progressos.length -1;
						doc.progressoAValidar = doc.progressos[lastIndex].progresso_total - doc.progressos[lastIndex - 1].progresso_total;
						doc.progressoValidado = doc.progressos[lastIndex - 1].progresso_total;
					}
					
				}
			}

			// Percorrendo o vetor de progressos;
			for (var k = doc.progressos.length - 1; k >= 0; k--) {
				doc.progressos[k].data = new Date(doc.progressos[k].data);
				doc.progressos[k].usuario = usuarios.filter(function(u){return u.id == this},doc.progressos[k].idu)[0];
			}
		}
	}

	function carregaDocs(){
		GDoksFactory.getDocumentos()
			.success(function(response){
				$scope.docs = response.documentos;
				parseDocs();
			})
			.error(function(error){
			});
	}
};