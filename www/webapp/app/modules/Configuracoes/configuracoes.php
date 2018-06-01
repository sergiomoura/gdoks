<?php
	// Incluindo o blocker de tela.
	include('blocker_tela.php');

	// Carregando configurações da empresa
	try {
		$configuracoes = GDoks::getConf($user->empresa);
	} catch (Exception $e) {
		echo($e->getMessage());
		exit(1);
	}

?>
<div id="configuracoes_container"  class="bloco_conteudo bloco_central_80" md-whiteframe="1dp">
	<h1>Configurações</h1>
	<div layout="row">
		<div layout="column" flex="66">
			<?php
				foreach ($configuracoes as $key =>  $conf) {
					$tipo = explode('[', $conf->tipo)[0];
					switch ($tipo) {
						case 'string':
							// determinando o tamanho máximo e o mínimo da string
							$vetor = json_decode(str_replace($tipo, '', $conf->tipo));
							$min = min($vetor);
							$max = max($vetor);
							 echo('<md-input-container>');
							 echo('	<label>'.$conf->label.'</label>');
							 echo('	<input type="text" placeholder="" ng-maxlength="'.$max.'" maxlength="'.$max.'" ng-model="config.'.$key.'.valor">');
							 echo('</md-input-container>');
							break;

						case 'html':
							 echo('<div class="input-container">');	
							 echo('	<label>'.$conf->label.'</label>');
							 echo('<trix-editor angular-trix ng-model="config.'.$key.'.valor"></trix-editor>');
							 echo('</div>');
							
							break;
						
						case 'int':
							// determinando o tamanho máximo e o mínimo da string
							$vetor = json_decode(str_replace($tipo, '', $conf->tipo));
							$min = min($vetor);
							$max = max($vetor);
							 echo('<md-input-container>');
							 echo('	<label>'.$conf->label.'</label>');
							 echo('	<input type="number" min="'.$min.'" max="'.$max.'" ng-min="'.$min.'" ng-max="'.$max.'"  placeholder="0" ng-model="config.'.$key.'.valor">');
							 echo('</md-input-container>');
							break;

						case 'bool':
							 echo('<md-switch class="md-primary" ng-model="config.'.$key.'.valor" aria-label="'.$conf->label.'">');
							 echo($conf->label);
							 echo('</md-switch>');
							break;
					}
				}
			 ?>
			 <div layout="row" layout-align="space-between center">
			 	<md-button class="md-raised md-accent" aria-label="Cancelar Alterações" ng-click="cancelar()">Cancelar</md-button>
			 	<md-button class="md-raised md-primary" aria-label="Salvar Configurações" ng-click="salvar()">Salvar Configurações</md-button>			 	
			 </div>
		</div>
		<div flex class="codSubstituicao">
			<h2>Códigos de Substituição</h2>
			<div><span>$empresa_nome</span>: Nome da empresa</div>
			<div><span>$projeto_nome</span>: Nome do projeto</div>
			<div><span>$usuario_nome</span>: Nome do usuário</div>
			<div><span>$usuario_email</span>: E-mail do usuário</div>
			<div><span>$grd_codigo</span>: Código da GRD</div>
			<div><span>$grd_url</span>: URL da GRD</div>
			<div><span>$grd_link(texto)</span>: Link para GRD</div>
			<div><span>$proposta_codigo</span>: Código da proposta</div>
			<div><span>$proposta_versao</span>: Versão da proposta</div>
			<div><span>$ano</span>: Ano corrente</div>
			<div><span>$i(n)</span>: Sequencial com n caractreres</div>
		</div>
	</div>
</div>