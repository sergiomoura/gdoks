angular.module('Projetos',[])
.controller('ProjetosController',ProjetosController)
.controller('ProjetoController',ProjetoController);


function ProjetosController($scope,GDoksFactory){
	// levantando projetos na base de dados local
	$scope.projetos = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.projetos = evt.target.result});
		}
	}

	// função que leva para a tela de adicionar disciplina
	$scope.goToAddProjeto = function(){
		window.location = '#/projetos/0';
	}
}


function ProjetoController($scope,GDoksFactory,$routeParams,$timeout,$cookies,Upload){

	// Variáveis de controle sobre o conteúdo de clientes e usuários (se info já foi carregada da base);
	var clientesCarregados = false;
	var usuariosCarregados = false;

	// Carregando clientes da base local
	$scope.clientes = {};
	$scope.clientes.dados = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("clientes").objectStore("clientes").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.clientes.dados = evt.target.result;
				$scope.clientes.dados.unshift({'id':0,'nome':'Selecione o cliente...'});
				$scope.clientes.selecionado = $scope.clientes.dados[0];
				clientesCarregados = true;
				mostraProjeto();
			});
		}
	}

	// Carregando usuarios da base local
	$scope.usuarios = {};
	$scope.usuarios.dados = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("usuarios").objectStore("usuarios").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.usuarios.dados = evt.target.result;
				$scope.usuarios.dados.unshift({'id':0,'nome':'Selecione um responsável...'})
				$scope.usuarios.selecionado = $scope.usuarios.dados[0];
				usuariosCarregados = true;
				mostraProjeto();
			});
		}
	}

	// Função a ser executada depois de carregados clientes e usuários da base
	var mostraProjeto = function(){
		// Só executa quando clientes e usuários foram carregados.
		if(clientesCarregados && usuariosCarregados){
			$scope.projeto = {};
			$scope.projeto.id = $routeParams.id;
			
			// Criando o projeto em questão
			if($scope.projeto.id == 0 || $scope.projeto.id == undefined) {
				// Projeto novo
				$scope.projeto.id = 0
				$scope.projeto.nome = '';
				$scope.projeto.codigo = '';
				$scope.projeto.id_cliente = 0;
				$scope.projeto.id_responsavel = 0;
				$scope.projeto.data_inicio_p = undefined;
				$scope.projeto.data_final_p = undefined;
				$scope.projeto.ativo = true;
				$scope.projeto.daos = [];
				$scope.projeto.areas = [];
				$scope.projeto.documentos = [];
				$scope.inicialmenteAtivo = true;
			} else {
				GDoksFactory.getProjeto($scope.projeto.id)
				.success(function(response){
					$scope.projeto = response.projeto;
					$scope.projeto.id_responsavel = ($scope.projeto.id_responsavel==null)?0:$scope.projeto.id_responsavel;
					$scope.projeto.id_cliente = ($scope.projeto.id_cliente==null)?0:$scope.projeto.id_cliente;
					$scope.clientes.selecionado = $scope.clientes.dados.filter(function(a){return a.id==this},$scope.projeto.id_cliente)[0];
					$scope.usuarios.selecionado = $scope.usuarios.dados.filter(function(a){return a.id==this},$scope.projeto.id_responsavel)[0];
					$scope.projeto.ativo = ($scope.projeto.ativo == 1);
					$scope.inicialmenteAtivo = $scope.projeto.ativo;
				})
				.error(function(error){
				})
			}
		}
	}

	// definindo função Cancel
	$scope.cancel = function(){
		window.location = '/webapp/WebGDoks.php#/projetos';
	}

	// Definindo função que salva o projeto
	$scope.salvarProjeto = function(){

		// copiando o objeto projeto
		var projeto = angular.copy($scope.projeto);
		projeto.id_cliente = $scope.clientes.selecionado.id;
		projeto.id_responsavel = $scope.usuarios.selecionado.id;
		
		// removendo campos que não serão enviados
		delete projeto.daos;
		delete projeto.areas;
		delete projeto.documentos;

		if(projeto.id == 0){
			GDoksFactory.adicionarProjeto(projeto)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.projeto.id = response.newId;
					projeto.id = response.newId;

					// Adicionando projeto na base local
					indexedDB.open('gdoks').onsuccess = function(evt){
						// limpando dados para armazenamento.
						delete projeto.id_cliente;
						delete projeto.id_responsavel;
						delete projeto.data_inicio_p;
						delete projeto.data_final_p;

						// armazenando
						var reqAdd = evt.target.result.transaction('projetos','readwrite').objectStore('projetos').add(projeto);
						reqAdd.onsuccess = function(evt){
							console.log('ok!');
							console.dir(evt);
						}
						reqAdd.onerror = function(evt){
							console.log('Deu Erro...');
							console.dir(evt);
						}
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		} else {
			GDoksFactory.atualizarProjeto(projeto)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// Atualizando projeto na base local
					indexedDB.open('gdoks').onsuccess = function(evt){
						// limpando dados para armazenamento.
						delete projeto.id_cliente;
						delete projeto.id_responsavel;
						delete projeto.data_inicio_p;
						delete projeto.data_final_p;

						// armazenando.
						evt.target.result.transaction('projetos','readwrite').objectStore('projetos').put(projeto);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		}
	}

	// Documentos de abertura de operações
	//$scope.daoFiles = [];
	$scope.daoNames = [];
	$scope.errosNoUploadDeDaos = [];
	$scope.mostrarProgressoUploadDaos = false;

	// Definindo função que salva  DAOSs
	$scope.salvarDAOs = function(files){
		if (files && files.length) {
			// criando pacote a enviar
			
			var packToSend = [];
			var fileInfo;
			for (var i = files.length - 1; i >= 0; i--) {
				fileInfo = {};
				fileInfo.file = files[i];
				fileInfo.nome = $scope.daoNames[i];
				packToSend.push(fileInfo);
			};

			Upload.upload(
				{
                	url: API_ROOT+'/projetos/'+$scope.projeto.id+'/daos/',
                	data: {profiles: packToSend},
                	headers: {'Authorization':$cookies.getObject('user').token}
            	}
            ).then(
            	function (response) { // Função que trata upload concluído
                	$timeout(
                		function () {
                    		var result = response.data;
                    		if(result.error == 0){
                    			var tr; // variável da linha da tabela que exibe os campos dos arquivos que vão subir
                    			for (var i = result.sucessos.length - 1; i >= 0; i--) {
                    				$scope.projeto.daos.push(result.sucessos[i]);

                    				// removendo linhas NA TORA.
                    				tr = document.getElementById("tr_"+result.sucessos[i].nome_cliente);
                    				tr.parentNode.removeChild(tr);
                    			};
                    			for (var i = result.erros.length - 1; i >= 0; i--) {
                    				switch(result.erros[i].codigo){
                    					case 3:
                    						$scope.errosNoUploadDeDaos[i] = "Já existe um documento com este nome para este projeto.";
                    					break;
                    					default:
                    						$scope.errosNoUploadDeDaos[i] = result.erros[i].codigo;
                    					break;
                    				}
                    			};
                    			$scope.daoFiles = files;
                    		} else {
                    			$scope.daosUploadErrorMsg = result.msg;
                    		}
                    		$scope.mostrarProgressoUploadDaos = false;
                		}
                	);
            	},
            	function (response) { // Função que trata erro
                	if (response.status > 0) {
						$scope.daosUploadErrorMsg = response.status + ': ' + response.data;
                	}
            	},
            	function (evt) { // Função que trata o progresso
            		$scope.mostrarProgressoUploadDaos = true;
                	$scope.progress = Math.round(100 * evt.loaded / evt.total);
            	}
            );
		}
	}

	//Definindo função que remove dao
	$scope.removerDAO = function(id){
		if(confirm("Tem certeza que deseja documento do projeto? A ação não poderá ser desfeita.")){
			var dao = $scope.projeto.daos.find(function(a){return a.id == this},id);
			dao.id_projeto = $scope.projeto.id;
			GDoksFactory.removerDAO(dao)
				.success(
					function(response){
						$scope.projeto.daos = $scope.projeto.daos.filter(function(a){return a.id!=this},id);
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeSubdisciplina = error.msg;
					}
				);
		}
	}

	// Definindo função que remove linha do arquivo de upload da interface
	$scope.removerDaoFile = function(filename){
		console.log(filename);
		console.dir($scope.daoFiles);
	}

	// Carregando subdisciplinas da base
	$scope.subdisciplinas = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('disciplinas').objectStore('disciplinas').getAll().onsuccess = function(evt){
			var disciplinas = evt.target.result;
			var subs = [];
			var disc;
			var sub;
			for (var i = disciplinas.length - 1; i >= 0; i--) {
				disc = disciplinas[i];
				for (var j = disc.subs.length - 1; j >= 0; j--) {
					sub = disc.subs[j];
					$scope.subdisciplinas.push({'id':sub.id,'nome':sub.nome,'id_disciplina':disc.id,'nome_disciplina':disc.nome});
				}
			}
			$scope.subSelecionada = subs[0];
		}
	}

	// Definindo função que abre campos para edição de documento
	$scope.editarDocumento = function(id){
		if(id != 0){
			// removendo um possível novo documento em edição
			$scope.projeto.documentos = $scope.projeto.documentos.filter(function(a){return a.id!=0});

			// criando o objeto documento editado
			$scope.documentoEditado = angular.copy($scope.projeto.documentos.filter(function(a){return a.id == this},id)[0]);

			// marcando o id do projeto do documento como sendo o id do projeto corrente
			$scope.documentoEditado.id_projeto = $scope.projeto.id;

			setTimeout(function(){document.getElementById("nome_documento_"+id).focus()},10);
		} else {
			$scope.documentoEditado = {};
			$scope.documentoEditado.id = 0;
			$scope.documentoEditado.id_projeto = $scope.projeto.id;
			$scope.documentoEditado.nome = "";
			$scope.documentoEditado.id_subdisciplina = 0;
			$scope.documentoEditado.nome_subdisciplina = "";
			$scope.documentoEditado.id_disciplina = 0;
			$scope.documentoEditado.nome_disciplina = "";

			$scope.projeto.documentos.push($scope.documentoEditado);
			setTimeout(function(){document.getElementById("nome_documento_0").focus()},10);
		}
	}
};