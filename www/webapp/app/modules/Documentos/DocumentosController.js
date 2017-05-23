(function(){
	var module = angular.module('Documentos',['ngFileUpload']);
	module.controller('DocumentosController',DocumentosController);
	
	function DocumentosController($scope,GDoksFactory,$mdToast){

		// Definindo valores iniciais para filtros
		$scope.filtro = {
			projeto:0,
			area:0,
			subarea:0,
			disciplina:0,
			subdisciplina:0,
		}

		// Definindo se mostra busca avançada
		$scope.mostraBuscaAvancada = false;

		// Definindo valor inicial para ordem
		$scope.ordem = 'nome';

		// Definindo valor inicial para mostraConcluidos
		$scope.mostraConcluidos = false;

		// definindo valor inicial para mostraPorValidar
		$scope.mostraPorValidar = true;

		// Carregando projetos
		$scope.projetos = [];
		carregaProjetos();

		// Carregando documentos
		$scope.documentos = [];
		carregaDocumentos();

		// Função que carrega projetos
		function carregaProjetos(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("projetos").objectStore("projetos").getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.projetos = evt.target.result;
					})
				}
			}
		}

		function carregaDocumentos(){
			GDoksFactory.getDocumentos()
			.success(function(response){
				$scope.documentos = response.documentos;

				// Parsing Data Limite e ua
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.documentos[i].data_limite = ($scope.documentos[i].data_limite==null ? null : new Date($scope.documentos[i].data_limite + 'T00:00:00') );
					$scope.documentos[i].ua = ($scope.documentos[i].ua==null ? null : new Date($scope.documentos[i].ua) );
					$scope.documentos[i].progresso_a_validar = ($scope.documentos[i].progresso_a_validar==null? 0 : $scope.documentos[i].progresso_a_validar);
					$scope.documentos[i].progresso_validado = ($scope.documentos[i].progresso_validado==null? 0 : $scope.documentos[i].progresso_validado);
				}
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar documentos.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Escrevendo erro no console
				console.warn(error);
			});
		}
	}
})()



/* Old
	angular.module('Documentos',['ngFileUpload'])
	.controller('DocumentosController',['$scope','GDoksFactory',DocumentosController])
	.directive('gdoksDoc',function(){
		return {
			templateUrl:'app/modules/Documentos/tmpl-doc.html',
			restrict:'E',
			scope:{
				doc:'=doc'
			},
			controller:['$scope','GDoksFactory','$cookies','Upload',function($scope,GDoksFactory,$cookies,Upload){

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
					$scope.docFile.upload = Upload.upload(
						{
							url:API_ROOT+'/documentos/'+$scope.doc.id+'/arquivos/',
							data: {
								progresso: $scope.novoProgresso,
								observacao: $scope.obs,
								file:$scope.docFile
							},
	                		headers: {'Authorization':$cookies.getObject('user').token}
						});

					$scope.docFile.upload.then(
						function(response){
							if(response.status == 200){
								$scope.doc.progressoAValidar = $scope.novoProgresso - $scope.doc.progressoValidado;
								$scope.docFile = undefined;
								$scope.novoProgresso = undefined;
								$scope.obs = '';
								$scope.escondeFormDeUpload();

								// tratando do progresso que veio como resposta
								var progresso = response.data.progresso;
								progresso.data = new Date(progresso.data);
								
								indexedDB.open('gdoks').onsuccess = function(evt){
									evt.target.result.transaction('usuarios').objectStore('usuarios').get(progresso.idu).onsuccess = function(evt){
										progresso.usuario = evt.target.result;
										$scope.$apply();
									}
								}

								$scope.doc.progressos.push(progresso);
								$scope.doc.id_progresso_a_validar = $scope.doc.progressos[$scope.doc.progressos.length - 1].id;

							} else {
								console.dir(response);
							}
						}
					)
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

	function DocumentosController($scope,GDoksFactory,Upload){

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
*/