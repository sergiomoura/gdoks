WebGDoks.factory('GDoksFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GDoksFactory = {};
			var httpOptions = {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}};

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GDoksFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.loadUsuarios = function(){
				return $http.get(API_ROOT+'/usuarios',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarUsuario = function(usuario){
				return $http.put(API_ROOT+'/usuarios/'+usuario.id,usuario,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar novo usuario enviado
			GDoksFactory.adicionarUsuario = function(usuario){
				return $http.post(API_ROOT+'/usuarios',usuario,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplinas = function(){
				return $http.get(API_ROOT+'/disciplinas',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplina = function(id_disciplina){
				return $http.get(API_ROOT+'/disciplinas/'+id_disciplina,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarDisciplina = function(disciplina){
				return $http.put(API_ROOT+'/disciplinas/'+disciplina.id,disciplina,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar nova disciplina
			GDoksFactory.adicionarDisciplina = function(disciplina){
				return $http.post(API_ROOT+'/disciplinas',disciplina,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubdisciplina = function(subdisciplina){
				return $http.put(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,subdisciplina,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubdisciplina = function(subdisciplina){
				return $http.post(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/',subdisciplina,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubdisciplina = function(subdisciplina){
				return $http.delete(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarEspecialistas = function(id_disciplina,ids_especialistas){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/',ids_especialistas,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarValidador = function(id_disciplina,id_usuario,tipo){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',{"idu":id_usuario,"tipo":tipo},httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerValidador = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/'+id_usuario,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarValidadores = function(id_disciplina,ids_validadores){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',ids_validadores,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjetos = function(){
				return $http.get(API_ROOT+'/projetos',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarProjeto = function(projeto){
				return $http.put(API_ROOT+'/projetos/'+projeto.id,projeto,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarProjeto = function(projeto){
				return $http.post(API_ROOT+'/projetos',projeto,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarArea = function(area){
				return $http.post(API_ROOT+'/projetos/'+area.id_projeto+'/areas/',area,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarArea = function(area){
				return $http.put(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,area,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerArea = function(area){
				return $http.delete(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAreas = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubarea = function(subarea){
				return $http.post(API_ROOT+'/subareas/',subarea,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubarea = function(subarea){
				return $http.put(API_ROOT+'/subareas/'+subarea.id,subarea,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubarea = function(subarea){
				return $http.delete(API_ROOT+'/subareas/'+subarea.id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getSubareas = function(id_projeto,id_area){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas/'+id_area+'/subareas',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarDAOs = function(){
				// implementada em ProjetoDAOsControlller
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDAO = function(dao){
				return $http.delete(API_ROOT+'/projetos/'+dao.id_projeto+'/daos/'+dao.id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.alterarDocumento = function(documento){
				return $http.put(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,documento,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarDocumento = function(documento){
				return $http.post(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/',documento,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDocumento = function(documento){
				return $http.delete(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getClientes = function(){
				return $http.get(API_ROOT+'/clientes',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCliente = function(id){
				return $http.get(API_ROOT+'/clientes/'+id,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCliente = function(cliente){
				return $http.put(API_ROOT+'/clientes/'+cliente.id,cliente,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarCliente = function(cliente){
				return $http.post(API_ROOT+'/clientes',cliente,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosParaValidar = function(){
				return $http.get(API_ROOT+'/documentos/paraValidar',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/documentos/',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentos = function(id_projeto){
				return $http.get(API_ROOT+'/documentos',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumento = function(id_documento){
				return $http.get(API_ROOT+'/documentos/'+id_documento,httpOptions);
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
				return $http.post(API_ROOT+'/documentos/'+idDocumento+'/validacaoDeProgresso', progresso,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.lockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/lock',httpOptions);	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.delockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/delock',httpOptions);	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAcoes = function(){
				return $http.get(API_ROOT+'/acoes',httpOptions);		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getLogs = function(q){
				var query = [];
				if(!isNaN(q.uid)){query.push(q.uid)};
				if(!isNaN(q.aid)){query.push(q.aid)};
				query.push(q.de.toJSON().substr(0,10));
				query.push(q.ate.toJSON().substr(0,10));
				return $http.get(API_ROOT+'/logs/'+query.join('/'),httpOptions);		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCargos = function(){
				return $http.get(API_ROOT+'/cargos',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCargo = function(cargo){
				return $http.put(API_ROOT+'/cargos/'+cargo.id,cargo,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.inserirCargo = function(cargo){
				return $http.post(API_ROOT+'/cargos',cargo,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerCargo = function(idCargo){
				return $http.delete(API_ROOT+'/cargos/'+idCargo,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTamanhosDePapel = function(){
				return $http.get(API_ROOT+'/tamanhosDePapel',httpOptions);	
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
				return $http.post(API_ROOT+'/grds', grd,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarGrd = function(grd){
				console.log("atualizando grd");
				console.dir(grd);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getGrd = function(id_grd){
				return $http.get(API_ROOT+'/grds/'+id_grd,httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCodigosEmi = function(){
				return $http.get(API_ROOT+'/emis',httpOptions);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTiposDeDocumento = function(){
				return $http.get(API_ROOT+'/tiposDeDocumento',httpOptions);	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.postGrdDocs = function(grd){
				return $http.post(API_ROOT+'/grds/documentos',grd,httpOptions);		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			return GDoksFactory;
		}
	]
)