WebGDoks.factory('GDoksFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GDoksFactory = {};
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GDoksFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},{headers: {'Authorization': $cookies.get('token')}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCaixas = function(){
				return $http.get(API_ROOT+'/caixas',{headers: {'Authorization': $cookies.get('token')}});
			};

			GDoksFactory.getCaixa = function(id){
				return $http.get(API_ROOT+'/caixas/'+id,{headers: {'Authorization': $cookies.get('token')}});
			};

			GDoksFactory.insertCaixa = function(caixa){
				return $http.post(API_ROOT+'/caixas',caixa, {headers: {'Authorization': $cookies.get('token')}});	
			};

			GDoksFactory.updateCaixa = function(caixa){
				return $http.put(API_ROOT+'/caixas/'+caixa.id,caixa, {headers: {'Authorization': $cookies.get('token')}});	
			};

			GDoksFactory.deleteCaixa = function(id){
				return $http.delete(API_ROOT+'/caixas/'+id, {headers: {'Authorization': $cookies.get('token')}});		
			};
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getClasses = function(){
				return $http.get(API_ROOT+'/classes',{headers: {'Authorization': $cookies.get('token')}});
			};

			GDoksFactory.getClasse = function(id){
				return $http.get(API_ROOT+'/classes/'+id,{headers: {'Authorization': $cookies.get('token')}});
			};

			GDoksFactory.insertClasse = function(classe){
				return $http.post(API_ROOT+'/classes',classe, {headers: {'Authorization': $cookies.get('token')}});	
			};

			GDoksFactory.updateClasse = function(classe){
				return $http.put(API_ROOT+'/classes/'+classe.id,classe, {headers: {'Authorization': $cookies.get('token')}});	
			};

			GDoksFactory.deleteClasse = function(id){
				return $http.delete(API_ROOT+'/classes/'+id, {headers: {'Authorization': $cookies.get('token')}});		
			};

			GDoksFactory.getClassesConciliatorias = function(){
				return $http.get(API_ROOT+'/classes_conciliatorias',{headers: {'Authorization': $cookies.get('token')}});
			};

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

			GDoksFactory.insertMovimentos = function(movimentos){
				return $http.post(API_ROOT+'/movimentos',movimentos, {headers: {'Authorization': $cookies.get('token')}});
			};

			GDoksFactory.getMovimentos = function(){
				return $http.get(API_ROOT+'/movimentos', {headers: {'Authorization': $cookies.get('token')}});
			};

			GDoksFactory.removerMovimento = function(id){
				return $http.delete(API_ROOT+'/movimentos/'+id, {headers: {'Authorization': $cookies.get('token')}});	
			}

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

			GDoksFactory.salvarMEC = function(mec){
				return $http.post(API_ROOT+'/movimentos/entrecaixas',mec, {headers: {'Authorization': $cookies.get('token')}});
			};

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

			GDoksFactory.insertConcicliacao = function(movimentos){
				return $http.post(API_ROOT+'/conciliacoes',movimentos, {headers: {'Authorization': $cookies.get('token')}});
			}

			GDoksFactory.getUltimaConciliacao = function(){
				return $http.get(API_ROOT+'/conciliacoes', {headers: {'Authorization': $cookies.get('token')}});
			}

			GDoksFactory.deleteUltimaConciliacao = function(){
				return $http.delete(API_ROOT+'/conciliacoes', {headers: {'Authorization': $cookies.get('token')}});
			}

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh', {headers: {'Authorization': $cookies.get('token')}});
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			return GDoksFactory;
		}
	]
)