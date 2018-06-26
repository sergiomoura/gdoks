<?php
 
    // Incluindo classe "Tela" para carregar as opções da tela Documentos
    require 'GDoks/Tela.php';

    // Levantando dados do usuário a partir do cookie
    $user = json_decode($_COOKIE['user']);

    // Incluindo constantes
    require_once 'constantes.php';
    require_once 'db.php';

    // Carregando dbkey
    require_once CLIENT_DATA_PATH.$user->empresa.'/dbkey.php';

    // Criando conexão com base de dados
    $db = new DB($dbkey);
    unset($dbkey);

    // Criando o objeto Tela
    try {
    	$tela = Tela::CreateById(13, $user->id, $db);
    } catch (Exception $e) {
    	echo($e->getMessage());
    	exit(1);
    }

?>
<div class="bloco_central_80" id="proposta_container">
	<div layout="row" layout-align="space-between center" class="controles">
		<div class="search">
			<md-input-container>
				<label>Código da Proposta</label>
				<input type="text" placeholder="{{geraCodigosAutomaticamente ? 'Geração automática' : ''}}" ng-model="proposta.codigo" ng-disabled="proposta.id!=0 || geraCodigosAutomaticamente" require focus>
			</md-input-container>
			<md-input-container class="selectContainer">
				<label>Cliente</label>
				<md-select ng-model="proposta.cliente" ng-disabled="proposta.id!=0">
				  <md-option ng-value="c" ng-repeat="c in clientes">{{ c.nome }}</md-option>
				</md-select>
			</md-input-container>
			<md-button
					class="md-raised md-primary"
					ng-if="proposta.id==0"
					ngf-multiple="false"
					ngf-select
					ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
					ngf-model-invalid="errorFiles"
					ng-model="proposta.arquivo"
					aria-label="Selecione arquivo">Selecione Arquivo (Máximo <?php echo(ini_get('upload_max_filesize').'B)'); ?></md-button>
					
			<md-button ng-click="uploadVersaoDeProposta()" ng-disabled="proposta.cliente == null || proposta.arquivo == null" ng-if="proposta.id==0" class="md-raised md-primary" aria-label="Salvar proposta"><md-icon class="material-icons step">save</md-icon>Salvar</md-button>
			<md-button ng-click="deleteProposta()" ng-if="proposta.id!=0 && proposta.versoes.length==0" class="md-raised md-accent" aria-label="Remover proposta"><md-icon class="material-icons step">delete</md-icon>Apagar proposta</md-button>
		</div>
		<md-button
			ngf-multiple="false"
			ngf-select
			ngf-change="uploadVersaoDeProposta()"
			ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
			ngf-model-invalid="errorFiles"
			ng-model="proposta.arquivo"
			ng-disabled="proposta.id==0"
			class="md-raised md-primary"
			aria-label="Nova versão"><md-icon class="material-icons step">add</md-icon>Nova Versão</md-button>
	</div>
	<div ng-if="proposta.arquivo" class="arquivoSelecionado">Arquivo Selecionado: {{proposta.arquivo.name}} </div>
    <table ng-if="proposta.versoes.length > 0">
    	<thead>
    		<tr>
    			<td>Versão</td>
    			<td>Criação</td>
    			<td>Emissão</td>
    			<td>Aprovação</td>
    			<td></td>
    		</tr>
    	</thead>
    	<tbody>
    		<tr ng-repeat="v in proposta.versoes" ng-class="{aprovada:(v.aprovacao != null)}">
    			<td>{{v.serial}}</td>
    			<td>{{v.criacao | date:'dd/MM/yyyy'}}<span>{{v.criacao | date:'à\'s\' hh:mm:ss'}}</span></td>
    			<td>{{v.emissao | date:'dd/MM/yyyy'}}<span>{{v.emissao | date:'à\'s\' hh:mm:ss'}}</span></td>
    			<td>{{v.aprovacao | date:'dd/MM/yyyy'}}<span>{{v.aprovacao | date:'à\'s\' hh:mm:ss'}}</span></td>
    			<td>
    				<md-button ng-click="onDeleteVersaoClick($event,v.serial)" ng-if="$last && (v.emissao==null)" class="md-icon-button" ng-disabled="v.aprovacao != null" aria-label="Emitir versão para cliente">
    					<md-icon class="material-icons step">delete</md-icon>
    					<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
    						Remover versão de proposta
    					</md-tooltip>
    				</md-button>
                    
                    <md-button ng-click="onFazerProjetoClick($event,v.id)" class="md-icon-button md-primary" ng-if="v.aprovacao!= null" aria-label="Fazer Projeto">
                        <md-icon class="material-icons step">group_work</md-icon>
                        <md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
                            Criar projeto a partir desta proposta
                        </md-tooltip>
                    </md-button>

    				<md-button ng-click="openDialogEnviarProposta($event,v)" class="md-icon-button md-primary" ng-disabled="false" aria-label="Emitir versão para cliente">
    					<md-icon class="material-icons step">send</md-icon>
    					<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
    						Emitir versão para cliente
    					</md-tooltip>
    				</md-button>
    				
    				<md-button ng-click="downloadVersaoDeProposta(v.serial)" class="md-icon-button md-primary" ng-disabled="false" aria-label="Download de arquivo">
    					<md-icon class="material-icons step">file_download</md-icon>
    					<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
    						Baixar arquivo
    					</md-tooltip>
    				</md-button>

    				<md-button ng-click="onAprovarVersaoClick($event,v.serial)" class="md-icon-button md-primary" ng-if="v.aprovacao == null" aria-label="Aprovar">
    					<md-icon class="material-icons step">thumb_up_alt</md-icon>
    					<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
    						Aprovar versão de proposta
    					</md-tooltip>
    				</md-button>
                    
                    <md-button ng-click="onReprovarVersaoClick($event,v.serial)" class="md-icon-button" ng-if="v.aprovacao != null" aria-label="Reprovar">
                        <md-icon class="material-icons step">thumb_down_alt</md-icon>
                        <md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
                            Reprovar versão de proposta
                        </md-tooltip>
                    </md-button>
    			</td>
    		</tr>
    	</tbody>
    </table>
</div>