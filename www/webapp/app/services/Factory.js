WebGDoks.factory('GDoksFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GDoksFactory = {};
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GDoksFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh', {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.loadUsuarios = function(){
				return $http.get(API_ROOT+'/usuarios', {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarUsuario = function(usuario){
				return $http.put(API_ROOT+'/usuarios/'+usuario.id,usuario,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar novo usuario enviado
			GDoksFactory.adicionarUsuario = function(usuario){
				return $http.post(API_ROOT+'/usuarios',usuario,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplinas = function(){
				return $http.get(API_ROOT+'/disciplinas', {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplina = function(id_disciplina){
				return $http.get(API_ROOT+'/disciplinas/'+id_disciplina, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarDisciplina = function(disciplina){
				return $http.put(API_ROOT+'/disciplinas/'+disciplina.id,disciplina,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar nova disciplina
			GDoksFactory.adicionarDisciplina = function(disciplina){
				return $http.post(API_ROOT+'/disciplinas',disciplina,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubdisciplina = function(subdisciplina){
				return $http.put(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,subdisciplina,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubdisciplina = function(subdisciplina){
				return $http.post(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/',subdisciplina,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubdisciplina = function(subdisciplina){
				return $http.delete(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarEspecialistas = function(id_disciplina,ids_especialistas){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/',ids_especialistas,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarValidador = function(id_disciplina,id_usuario,tipo){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',{"idu":id_usuario,"tipo":tipo},{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerValidador = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/'+id_usuario,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarValidadores = function(id_disciplina,ids_validadores){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',ids_validadores,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjetos = function(){
				return $http.get(API_ROOT+'/projetos', {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarProjeto = function(projeto){
				return $http.put(API_ROOT+'/projetos/'+projeto.id,projeto, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarProjeto = function(projeto){
				return $http.post(API_ROOT+'/projetos',projeto, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarArea = function(area){
				return $http.post(API_ROOT+'/projetos/'+area.id_projeto+'/areas/',area,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarArea = function(area){
				return $http.put(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,area,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerArea = function(area){
				return $http.delete(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAreas = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubarea = function(subarea){
				return $http.post(API_ROOT+'/subareas/',subarea,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubarea = function(subarea){
				return $http.put(API_ROOT+'/subareas/'+subarea.id,subarea,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubarea = function(subarea){
				return $http.delete(API_ROOT+'/subareas/'+subarea.id,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getSubareas = function(id_projeto,id_area){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas/'+id_area+'/subareas',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarDAOs = function(){
				// implementada em ProjetoDAOsControlller
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDAO = function(dao){
				return $http.delete(API_ROOT+'/projetos/'+dao.id_projeto+'/daos/'+dao.id,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.alterarDocumento = function(documento){
				return $http.put(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,documento,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarDocumento = function(documento){
				return $http.post(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/',documento,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDocumento = function(documento){
				return $http.delete(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getClientes = function(){
				return $http.get(API_ROOT+'/clientes', {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCliente = function(id){
				return $http.get(API_ROOT+'/clientes/'+id, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCliente = function(cliente){
				return $http.put(API_ROOT+'/clientes/'+cliente.id,cliente, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarCliente = function(cliente){
				return $http.post(API_ROOT+'/clientes',cliente, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosParaValidar = function(){
				return $http.get(API_ROOT+'/documentos/paraValidar',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/documentos/',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentos = function(id_projeto){
				return $http.get(API_ROOT+'/documentos',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumento = function(id_documento){
				return $http.get(API_ROOT+'/documentos/'+id_documento,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
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
				return $http.post(API_ROOT+'/documentos/'+idDocumento+'/validacaoDeProgresso', progresso, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.lockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/lock',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.delockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/delock',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAcoes = function(){
				return $http.get(API_ROOT+'/acoes',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getLogs = function(q){
				var query = [];
				if(!isNaN(q.uid)){query.push(q.uid)};
				if(!isNaN(q.aid)){query.push(q.aid)};
				query.push(q.de.toJSON().substr(0,10));
				query.push(q.ate.toJSON().substr(0,10));
				return $http.get(API_ROOT+'/logs/'+query.join('/'),{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCargos = function(){
				return $http.get(API_ROOT+'/cargos',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCargo = function(cargo){
				return $http.put(API_ROOT+'/cargos/'+cargo.id,cargo, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.inserirCargo = function(cargo){
				return $http.post(API_ROOT+'/cargos',cargo, {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerCargo = function(idCargo){
				return $http.delete(API_ROOT+'/cargos/'+idCargo,{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTamanhosDePapel = function(){
				return $http.get(API_ROOT+'/tamanhosDePapel',{headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}});	
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
			return GDoksFactory;
		}
	]
)