WebGDoks.factory('GDoksFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GDoksFactory = {};
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GDoksFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh', {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.loadUsuarios = function(){
				return $http.get(API_ROOT+'/usuarios', {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarUsuario = function(usuario){
				return $http.put(API_ROOT+'/usuarios/'+usuario.id,usuario,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar novo usuario enviado
			GDoksFactory.adicionarUsuario = function(usuario){
				return $http.post(API_ROOT+'/usuarios',usuario,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplinas = function(){
				return $http.get(API_ROOT+'/disciplinas', {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplina = function(id_disciplina){
				return $http.get(API_ROOT+'/disciplinas/'+id_disciplina, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarDisciplina = function(disciplina){
				return $http.put(API_ROOT+'/disciplinas/'+disciplina.id,disciplina,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar nova disciplina
			GDoksFactory.adicionarDisciplina = function(disciplina){
				return $http.post(API_ROOT+'/disciplinas',disciplina,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubdisciplina = function(subdisciplina){
				return $http.put(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,subdisciplina,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubdisciplina = function(subdisciplina){
				return $http.post(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/',subdisciplina,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubdisciplina = function(subdisciplina){
				return $http.delete(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarEspecialista = function(id_disciplina,id_usuario){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/',id_usuario,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerEspecialista = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/'+id_usuario,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarValidador = function(id_disciplina,id_usuario,tipo){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',{"idu":id_usuario,"tipo":tipo},{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerValidador = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/'+id_usuario,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjetos = function(){
				return $http.get(API_ROOT+'/projetos', {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarProjeto = function(projeto){
				return $http.put(API_ROOT+'/projetos/'+projeto.id,projeto, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarProjeto = function(projeto){
				return $http.post(API_ROOT+'/projetos',projeto, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarArea = function(area){
				return $http.post(API_ROOT+'/projetos/'+area.id_projeto+'/areas/',area,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarArea = function(area){
				return $http.put(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,area,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerArea = function(area){
				return $http.delete(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,{headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getClientes = function(){
				return $http.get(API_ROOT+'/clientes', {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCliente = function(id){
				return $http.get(API_ROOT+'/clientes/'+id, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCliente = function(cliente){
				return $http.put(API_ROOT+'/clientes/'+cliente.id,cliente, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarCliente = function(cliente){
				return $http.post(API_ROOT+'/clientes',cliente, {headers: {'Authorization': $cookies.getObject('user').token}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			return GDoksFactory;
		}
	]
)