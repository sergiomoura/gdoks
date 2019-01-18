<div layout="column" id="nova_proposta_container" class="bloco_conteudo bloco_central_50" md-whiteframe="1dp">
    <md-input-container class="selectContainer">
        <label>Cliente</label>
        <md-select ng-model="proposta.cliente">
            <md-option ng-value="c" ng-repeat="c in clientes">{{ c.nome }}</md-option>
        </md-select>
    </md-input-container>
    <md-input-container>
        <label>Código da Proposta</label>
        <input type="text" placeholder="{{geraCodigosAutomaticamente ? 'Geração automática' : ''}}" ng-model="proposta.codigo" ng-disabled="proposta.id!=0 || geraCodigosAutomaticamente" require focus>
    </md-input-container>
    <md-input-container>
        <label>Título</label>
        <input type="text" ng-model="proposta.titulo" md-maxlength="45" maxlength="45" require>
    </md-input-container>
    <md-input-container>
        <label>Valor</label>
        <input type="number" step="0.01" ng-model="proposta.valor" require>
    </md-input-container>
    <div layout="row" layout-align="space-between center">
        <md-button
                class="md-raised md-primary"
                ngf-multiple="false"
                ngf-select
                ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
                ngf-model-invalid="errorFiles"
                ng-model="proposta.arquivo"
                aria-label="Selecione arquivo">Selecione Arquivo (Máximo <?php echo(ini_get('upload_max_filesize').'B)'); ?></md-button>
        
            <div ng-if="proposta.arquivo" class="arquivoSelecionado">Arquivo Selecionado: {{proposta.arquivo.name}} </div>
    </div>
    
    <div layout="row" layout-align="space-between start" class="controles">
        <md-button ng-click="onCancelarClick()" class="md-accent md-raised" aria-label="Cancelar">Cancelar</md-button>
        <md-button ng-click="createVersaoDeProposta()" ng-disabled="proposta.cliente == null || proposta.arquivo == null" class="md-raised md-primary" aria-label="Salvar proposta">Salvar</md-button>
    </div>
    
</div>