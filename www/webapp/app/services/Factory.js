WebGDoks.factory('GDoksFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GDoksFactory = {};

			// Função auxiliar que retorna headers baseada no cooke user = = = = = = = = = = = = = = = = = = = = = = = = =
			var buildHeaders = function(){
				return {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}};
			}

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GDoksFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.loadUsuarios = function(){
				return $http.get(API_ROOT+'/usuarios',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarUsuario = function(usuario){
				return $http.put(API_ROOT+'/usuarios/'+usuario.id,usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar novo usuario enviado
			GDoksFactory.adicionarUsuario = function(usuario){
				return $http.post(API_ROOT+'/usuarios',usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplinas = function(){
				return $http.get(API_ROOT+'/disciplinas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplina = function(id_disciplina){
				return $http.get(API_ROOT+'/disciplinas/'+id_disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarDisciplina = function(disciplina){
				return $http.put(API_ROOT+'/disciplinas/'+disciplina.id,disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar nova disciplina
			GDoksFactory.adicionarDisciplina = function(disciplina){
				return $http.post(API_ROOT+'/disciplinas',disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubdisciplina = function(subdisciplina){
				return $http.put(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,subdisciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubdisciplina = function(subdisciplina){
				return $http.post(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/',subdisciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubdisciplina = function(subdisciplina){
				return $http.delete(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarEspecialistas = function(id_disciplina,ids_especialistas){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/',ids_especialistas,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarValidador = function(id_disciplina,id_usuario,tipo){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',{"idu":id_usuario,"tipo":tipo},buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerValidador = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/'+id_usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarValidadores = function(id_disciplina,ids_validadores){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',ids_validadores,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjetos = function(){
				return $http.get(API_ROOT+'/projetos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarProjeto = function(projeto){
				return $http.put(API_ROOT+'/projetos/'+projeto.id,projeto,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarProjeto = function(projeto){
				return $http.post(API_ROOT+'/projetos',projeto,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarArea = function(area){
				return $http.post(API_ROOT+'/projetos/'+area.id_projeto+'/areas/',area,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarArea = function(area){
				return $http.put(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,area,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerArea = function(area){
				return $http.delete(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAreas = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubarea = function(subarea){
				return $http.post(API_ROOT+'/subareas/',subarea,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubarea = function(subarea){
				return $http.put(API_ROOT+'/subareas/'+subarea.id,subarea,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubarea = function(subarea){
				return $http.delete(API_ROOT+'/subareas/'+subarea.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getSubareas = function(id_projeto,id_area){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas/'+id_area+'/subareas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarDAOs = function(){
				// implementada em ProjetoDAOsControlller
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDAO = function(dao){
				return $http.delete(API_ROOT+'/projetos/'+dao.id_projeto+'/daos/'+dao.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.alterarDocumento = function(documento){
				return $http.put(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarDocumento = function(documento){
				return $http.post(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/',documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDocumento = function(documento){
				return $http.delete(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getClientes = function(){
				return $http.get(API_ROOT+'/clientes',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCliente = function(id){
				return $http.get(API_ROOT+'/clientes/'+id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCliente = function(cliente){
				return $http.put(API_ROOT+'/clientes/'+cliente.id,cliente,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarCliente = function(cliente){
				return $http.post(API_ROOT+'/clientes',cliente,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosParaValidar = function(){
				return $http.get(API_ROOT+'/documentos/paraValidar',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/documentos/',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentos = function(id_projeto){
				return $http.get(API_ROOT+'/documentos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumento = function(id_documento){
				return $http.get(API_ROOT+'/documentos/'+id_documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.downloadArquivo = function(idArquivo){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/arquivos/'+idArquivo);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// criando o campo para o token
				var input = document.createElement('input');
				input.setAttribute('name','token');
				input.setAttribute('value',$cookies.getObject('user').token);

				// adicionando input ao form
				form.appendChild(input);

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.validarProgresso = function(idDocumento,progresso){
				return $http.post(API_ROOT+'/documentos/'+idDocumento+'/validacaoDeProgresso', progresso,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.lockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/lock',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.delockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/delock',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAcoes = function(){
				return $http.get(API_ROOT+'/acoes',buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getLogs = function(q){
				var query = [];
				if(!isNaN(q.uid)){query.push(q.uid)};
				if(!isNaN(q.aid)){query.push(q.aid)};
				query.push(q.de.toJSON().substr(0,10));
				query.push(q.ate.toJSON().substr(0,10));
				return $http.get(API_ROOT+'/logs/'+query.join('/'),buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCargos = function(){
				return $http.get(API_ROOT+'/cargos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCargo = function(cargo){
				return $http.put(API_ROOT+'/cargos/'+cargo.id,cargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.inserirCargo = function(cargo){
				return $http.post(API_ROOT+'/cargos',cargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerCargo = function(idCargo){
				return $http.delete(API_ROOT+'/cargos/'+idCargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTamanhosDePapel = function(){
				return $http.get(API_ROOT+'/tamanhosDePapel',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.baixarPDA = function(id_pda){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/pdas/'+id_pda);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.baixarPDAParaRevisao = function(id_pda){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/pdas/checkout/'+id_pda);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarGrd = function(grd){
				return $http.post(API_ROOT+'/grds', grd,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarGrd = function(grd){
				console.log("atualizando grd");
				console.dir(grd);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getGrd = function(id_grd){
				return $http.get(API_ROOT+'/grds/'+id_grd,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCodigosEmi = function(){
				return $http.get(API_ROOT+'/emis',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTiposDeDocumento = function(){
				return $http.get(API_ROOT+'/tiposDeDocumento',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.postGrdDocs = function(grd){
				return $http.post(API_ROOT+'/grds/documentos',grd,buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.viewGRD = function(id_grd){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/grds/' + id_grd + '?view=pdf');
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');
				form.setAttribute('target','_blank');

				// adicionando campo
				var input = document.createElement('input');
				input.setAttribute('name','view');
				input.setAttribute('value','pdf');


				// adicionando form a dom
				document.body.appendChild(form);
				form.appendChild(input);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.buscarGrd = function(query){
				
				// Montando a query string com base no objeto query
				var queryString = '';
				for(var i in query){

					// Verificando se é do tipo Date
					if(query[i] instanceof Date){
						
						// Propriedade é do tipo data. Transformando em string
						queryString += i+'='+(query[i].toJSON().substr(0,10))+'&';
					
					} else {

						// Propriedade não é Date. emendando na string
						queryString += i+'='+query[i]+'&';
					}
					
				}

				// removendo o derradeiro &;
				queryString = queryString.substr(0,queryString.length-1);

				// Retornando promise da requisição de busca
				return $http.get(API_ROOT+'/grds/search/?'+queryString,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			return GDoksFactory;
		}
	]
)