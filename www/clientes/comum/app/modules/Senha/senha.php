<div id="senha_container" class="bloco_conteudo bloco_central_50" md-whiteframe="1dp">
	<p>
		<h3>Trocar Senha</h3>
	</p>
	<form name="form">
		<div layout="column">
			<md-input-container>
				<label>Senha</label>
				<input type="password" name="senha1" ng-model="senha1" placeholder="Digite nova senha para altera-la" required="required">
			</md-input-container>
			<md-input-container>
				<label>Confirmação de Senha</label>
				<input type="password" name="senha1" ng-model="senha2" placeholder="Confirme a senha digitada no campo anterior" required="required">
			</md-input-container>
		</div>
		<div layout="row">
			<md-button class="md-raised md-accent" aria-label="Cancelar" ng-click="cancel()">Cancelar</md-button>
			<span flex></span>
			<md-button
				class="md-raised  md-primary"
				aria-label="Salvar" 
				ng-disabled="form.$invalid || senha1!=senha2"
				ng-click="mudarSenha(senha1)">
				{{senha1!=senha2?"Confirme a senha corretamente":"Salvar"}}
			</md-button>
		</div>
	</form>
</div>
