angular.module('Projetos',['ngFileUpload','ngTagsInput'])
.controller('ProjetosController',ProjetosController)
.controller('ProjetoController',ProjetoController)

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


function ProjetoController($scope,$routeParams,$timeout,$cookies,Upload,GDoksFactory){

	// Variáveis de controle sobre o conteúdo de clientes e usuários (se info já foi carregada da base);
	var clientesCarregados = false;
	var usuariosCarregados = false;
	var disciplinasCarregadas = false;
	var cargosCarregados = false;

	// Carregando clientes da base local
	$scope.clientes = {};
	$scope.clientes.dados = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("clientes").objectStore("clientes").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.clientes.dados = evt.target.result;
				clientesCarregados = true;
				carregaProjeto();
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
				usuariosCarregados = true;
				carregaProjeto();
			});
		}
	}

	// Carregando disciplinas da base local
	$scope.disciplinas = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("disciplinas").objectStore("disciplinas").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.disciplinas = evt.target.result;
				disciplinasCarregadas = true;
				carregaProjeto();
			});
		}
	}

	// Carregando cargos do servidor
	$scope.cargos = [];
	GDoksFactory.getCargos().success(function(response){
		$scope.cargos = response.cargos;
		cargosCarregados = true;
		carregaProjeto();
	});

	// Função a ser executada depois de carregados clientes e usuários da base
	function carregaProjeto(){
		// Só executa quando clientes e usuários foram carregados.
		if(clientesCarregados && usuariosCarregados && disciplinasCarregadas && cargosCarregados){
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
				$scope.projeto.data_inicio_p = new Date();
				$scope.projeto.data_final_p = new Date();
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

					// parsing dates
					if($scope.projeto.data_inicio_p != null){
						$scope.projeto.data_inicio_p = new Date($scope.projeto.data_inicio_p);
						$scope.projeto.data_inicio_p.setTime($scope.projeto.data_inicio_p.getTime() + (3*60*60*1000)) // ajustando para horário local do Brasil
					}
					if($scope.projeto.data_final_p != null){
						$scope.projeto.data_final_p = new Date($scope.projeto.data_final_p);
						$scope.projeto.data_final_p.setTime($scope.projeto.data_final_p.getTime() + (3*60*60*1000)) // ajustando para horário local do Brasil
					}

					// parsing subareas
					var area;
					for (var i = $scope.projeto.subareas.length - 1; i >= 0; i--) {
						$scope.projeto.subareas[i].area = $scope.projeto.areas.find(function(a){return a.id== this},$scope.projeto.subareas[i].id_area);
						delete $scope.projeto.subareas[i].id_area;
					}

					// parsing dependencias dos documentos
					var doc;
					for (var i = $scope.projeto.documentos.length - 1; i >= 0; i--) {
						doc = $scope.projeto.documentos[i];
						if(doc.data_limite != null){
							doc.data_limite = new Date(doc.data_limite);
							doc.data_limite.setTime(doc.data_limite.getTime() + (3*60*60*1000)); // ajustando para o horário local do brasil!
						}
						for	(var j = doc.dependencias.length - 1; j >= 0; j--) {
							doc.dependencias[j] = $scope.projeto.documentos.find(function(d){return d.id == this},1*doc.dependencias[j]);
						}
					}
				})
				.error(function(error){
				})
			}
			carregaDocumentos();
		}
	}

	function carregaDocumentos(){
		if ($scope.projeto.id != 0) {
			GDoksFactory.getDocumentos($scope.projeto.id)
			.success(function(response){
				var docs = response.documentos;
				var achouSub,j,k;
				for (var i = docs.length - 1; i >= 0; i--) {
					// parsing data_limite
					docs[i].data_limite = new Date(docs[i].data_limite);

					// Corrigindo fuso
					docs[i].data_limite.setMinutes(docs[i].data_limite.getMinutes() + docs[i].data_limite.getTimezoneOffset());
					
					// parsing subarea
					docs[i].subarea = $scope.projeto.subareas.find(function(a){return a.id == this},docs[i].id_subarea);
					delete docs[i].id_subarea;

					// parsing subdisciplinas
					achouSub = false;
					j = 0;
					while(j<$scope.disciplinas.length && !achouSub){
						k = 0;
						while(k<$scope.disciplinas[j].subs.length && !achouSub){
							achouSub = ($scope.disciplinas[j].subs[k].id == docs[i].id_subdisciplina);
							if(achouSub){
								docs[i].subdisciplina = $scope.disciplinas[j].subs[k];
								docs[i].subdisciplina.disciplina = $scope.disciplinas[j];
								delete docs[i].id_subdisciplina;
							}
							k++;
						}
						j++;
					}

					// parsing dependências
					for (var j = docs[i].dependencias.length - 1; j >= 0; j--) {
						docs[i].dependencias[j] = docs.find(function(a){return a.id==this},docs[i].dependencias[j]);
					}

					// Parsing HHs
					for (var j = docs[i].hhs.length - 1; j >= 0; j--) {
						docs[i].hhs[j].cargo = $scope.cargos.find(function(a){return a.id == this},docs[i].hhs[j].id_cargo);
						delete docs[i].hhs[j].id_cargo;
					}
				}
				$scope.projeto.documentos = docs;
			})
			.error(function(err){});
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
						reqAdd.onsuccess = function(evt){}
						reqAdd.onerror = function(evt){}
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

};