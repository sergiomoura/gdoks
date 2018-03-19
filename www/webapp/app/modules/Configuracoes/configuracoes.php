<?php
	// Incluindo o blocker de tela.
	include('blocker_tela.php');

	// Carregando configurações da empresa
	$configuracoes = GDoks::getConf($user->empresa);

?>
<div id="configuracoes_container"  class="bloco_conteudo bloco_central_50" md-whiteframe="1dp">
	<h1>Configurações</h1>
	<div layout="column">
	<?php
		foreach ($configuracoes as $key =>  $conf) {
			$tipo = explode('[', $conf->tipo)[0];
			switch ($tipo) {
				case 'string':
					 echo('<md-input-container>');
					 echo('	<label>'.$conf->label.'</label>');
					 echo('	<input type="text" placeholder="monomonomononomonomonom" ng-model="config.'.$key.'">');
					 echo('</md-input-container>');
					break;

				case 'html':
					echo('<textarea ui-tinymce ng-model="tinymceModel"></textarea>');
					break;
				
				case 'int':
					 echo('<md-input-container>');
					 echo('	<label>'.$conf->label.'</label>');
					 echo('	<input type="number"  placeholder="5" ng-model="config.'.$key.'">');
					 echo('</md-input-container>');
					break;

				case 'bool':
					 echo('<md-switch ng-model="config.'.$key.'" aria-label="'.$conf->label.'">');
					 echo($conf->label);
					 echo('</md-switch>');
					break;
			}
		}
	 ?>
	</div>
</div>