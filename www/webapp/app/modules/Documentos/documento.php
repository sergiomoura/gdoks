<md-content id="documento_container" class="container_80" layout="column" layout-padding>
	<div ng-if="documento.projeto_ativo==0" class="aviso">
		<h3>Documento de Projeto Inativo</h3>
		<p>Este documento faz parte de um projeto que está inativo. Ele não pode ser alterado. Se deseja alterar este documento vá até o cadastro do projeto {{documento.nome_projeto}} e ative-o.</p>
	</div>
	<div layout="row" layout-align="space-between center">
		<h3>{{documento.codigo}}</h3>
		<div layout="row" layout-align="end center">
			<md-button
				class="md-raised md-primary"
				ng-click="avancarRevisao($event)"
				ng-disabled="documento.projeto_ativo == 0"
				aria-label="Avançar Revisão">
					<md-icon
						class="material-icons step"
						aria-label="Avançar revisão">skip_next</md-icon>Avançar Revisão
			</md-button>

			<md-button
				class="md-raised md-primary"
				ng-click="bloquearParaRevisao()"
				ng-if="documento.ehEspecialista && !(documento.status=='checkout' && documento.idu_checkout==usuario.id)"
				ng-disabled="documento.projeto_ativo==0 || !(documento.status=='validado' || documento.status=='virgem')"
				aria-label="Bloquear documento para revisão">
					<md-icon ng-if="documento.status=='validado' || documento.status=='virgem'" class="material-icons step" aria-label="Baixar para revisão">lock_open</md-icon>
					<md-icon ng-if="!(documento.status=='validado' || documento.status=='virgem')" class="material-icons step" aria-label="Baixar para revisão">lock_outline</md-icon>
					
					<!-- Determinando o texto do botão -->
					<span ng-if="documento.status=='validado' || documento.status=='virgem'">Bloquear</span>
					<span ng-if="documento.status=='checkout'">Bloqueado por {{documento.sigla_checkout}} em {{documento.datahora_do_checkout|date:"dd/MM/yyyy à's' hh:mm:ss"}}</span>
					<span ng-if="documento.status=='paravalidacao'">Aguardando validação</span>
					<span ng-if="documento.status=='concluido'">Concluído</span>
					<!--/ Determinando o texto do botão -->

					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Bloquear documento para revisão
					</md-tooltip>
			</md-button>

			<md-button
				ng-if="documento.status=='checkout' && documento.idu_checkout==usuario.id"
				class="md-raised md-primary"
				ng-click="desbloquear()"
				aria-label="Desbloquear">
					<md-icon class="material-icons step" aria-label="Desbloquear">lock_ouline</md-icon>Desbloquear
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Desbloquear documento sem altera-lo
					</md-tooltip>
			</md-button>

			<md-button
				class="md-raised md-primary"
				ng-click="baixar()"
				ng-disabled="documento.revisoes[0].pdas==undefined"
				aria-label="Baixar">
					<md-icon class="material-icons step" aria-label="Baixar">file_download</md-icon>Baixar
			</md-button>

			<md-button
				class="md-raised md-primary"
				ng-click="openValidarProgressoDialog($event)"
				ng-disabled="!(documento.status == 'paravalidacao' && documento.ehValidador)"
				aria-label="Validar Progresso">
					<md-icon class="material-icons step" aria-label="Validar Progresso">done</md-icon>Validar Progresso
			</md-button>
		</div>
	</div>
	
	<table class="header_table">
		<tr>
			<td colspan="3">
				<label>Título</label> {{documento.nome}}
			</td>
			<td rowspan="7">
				<img src="img/status-{{documento.status}}.svg" alt="Status do documento: {{documento.status}}" width="120" height="195">
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<label>Projeto</label> {{documento.nome_projeto}}
			</td>
		</tr>
		<tr>
			<td>
				<label>Área</label> {{documento.nome_area}}
			</td>
			<td>
				<label>Sub-área</label> {{documento.cod_subarea}}
			</td>
			<td>
				<label>Revisão Atual</label> {{documento.revisoes[0].serial}}
			</td>
			<td>
				
			</td>
		</tr>
		<tr>
			<td>
				<label>Disciplina</label> {{documento.nome_disciplina}}
			</td>
			<td>
				<label>Subdisciplina</label> {{documento.nome_subdisciplina}}
			</td>
			<td>
				<label>Trabalho Estimado</label> {{documento.trabalho_estimado}} hh
			</td>
		</tr>
		<tr>
			<td>
				<label>Última Atualização</label> {{documento.revisoes[0].ua|date:"dd/MM/yyyy à's' hh:mm"}}
			</td>
			<td>
				<label>Data Limite</label> {{documento.revisoes[0].data_limite|date:"dd/MM/yyyy"}} ({{documento.revisoes[0].data_limite|daysFromNow}})
			</td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3">
				<label>GRDs contendo este documento</label>
				<span ng-if="documento.grds.length==0">Nenhuma</span>
				<span ng-repeat="grd in documento.grds"><a href="#/grds/{{grd.id}}">{{grd.codigo}} (rev {{grd.serial_rev}})</a></span>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<label style="display: inline-block; width: 75px;">Progresso</label>
				<progresso
					progress="[documento.revisoes[0].progresso_validado,documento.revisoes[0].progresso_a_validar]"
					colors="['#2196F3','#6DD900']"
					fcolors="['#FFF','#FFF']"
					width="780"
					height="20"></progresso>
			</td>
		</tr>
	</table>
	<md-tabs md-selected="0" md-dynamic-height md-border-bottom md-whiteframe="1dp">
		
		<md-tab
			label="Atualizar Revisão"
			ng-disabled="documento.projeto_ativo==0 || (documento.status == 'checkout' && documento.idu_checkout!=usuario.id) || (documento.status != 'checkout')">
			<md-content class="md-padding" layout="column">
				<form name="form_atualizarRevisao">
					<h3>Atualizar Revisão</h3>
					<div layout="row" layout-align="space-between center">
						<md-button
							class="md-raised md-primary"
							ng-disabled="false"
							aria-label="Selecionar Arquivos"
							ng-model="updateFiles"
							ngf-select
							ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
							ngf-multiple="true"
							ngf-change="onFilesChange()">
								<md-icon class="material-icons step" aria-label="Selecionar Arquivos">folder</md-icon>
								Selecionar Arquivos (Máximo <?php echo(ini_get('upload_max_filesize')); ?>B)
						</md-button>
					</div>
					
					<div layout="row" layout-align="space-between start" style="margin-top: 40px;">
						<md-input-container ng-if="formUploadItems.length>0" flex="45">
							<label>Progresso Total</label>
							<input required type="number" name="progresso_total" ng-model="update.progressoTotal" placeholder="Entre com um valor para o progresso total" ng-value="documento.revisoes[0].progresso_validado" ng-min="documento.revisoes[0].progresso_validado+1" min="{{documento.revisoes[0].progresso_validado+1}}" max="100">
							<div ng-messages="form_atualizarRevisao.progresso_total.$error">
								 <div ng-message="min">O progresso total deve ser no mínimo {{documento.revisoes[0].progresso_validado+1}} %</div>
							</div>
						</md-input-container>
						
						<md-input-container ng-if="formUploadItems.length>0" flex="45">
							<label>Observações<span ng-if="agora>documento.revisoes[0].data_limite"> (Obrigatória por atraso)</span></label>
							<input ng-required="agora>documento.revisoes[0].data_limite" type="text" placeholder="Escreva observações sobre esta atualização" ng-model="update.observacoes">
						</md-input-container>
					</div>
					<table ng-if="formUploadItems.length>0" class="files_table">
						<thead>
							<tr>
								<td>Nome</td>
								<td></td>
								<td>Nº de Páginas</td>
								<td>Tam. do Papel</td>
								<td>Tipo</td>
								<td>Ação</td>
							</tr>
						</thead>
						<tr ng-repeat="item in formUploadItems|orderBy:'nome'">
							<td>{{item.nome}}</td>
							<td><md-button ng-click="onDeleteClick(item.nome)" class="md-icon-button md-primary" ng-disabled="item.tipo=='antigoNaoAtualizar'" aria-label="Excluir"><md-icon class="material-icons step" aria-label="Excluir">delete</md-icon></md-button></td>
							<td>
								<input type="number" aria-label="Número de Páginas" min="1" ng-model="item.nPaginas">
							</td>
							<td>
								<md-select md-selected-text="dic_tamanhosDePapel[item.tamanhoDoPapel]" ng-model="item.tamanhoDoPapel" aria-label="Tamanho do Papel" class="md-no-underline">
									<md-option ng-value="opt.id" ng-repeat="opt in tamanhosDePapel">{{ opt.nome }} ({{opt.a}}mm x {{opt.l}}mm)</md-option>
								</md-select>
							</td>
							<td>
								{{item.tipo=='novo'?'Novo':''}}
								{{item.tipo=='antigoParaAtualizar'?'Preexistente para Atualizar':''}}
								{{item.tipo=='antigoNaoAtualizar'?'Preexistente':''}}
							</td>
							<td>
								<md-select ng-model="item.acao" class="md-no-underline" ng-if="item.tipo=='antigoNaoAtualizar'" aria-label="Ação">
								  <md-option ng-value="1">Manter</md-option>
								  <md-option ng-value="0">Excluir</md-option>
								</md-select>
								<span ng-if="item.tipo!='antigoNaoAtualizar'">Enviar</span>
							</td>
						</tr>
					</table>
					
					<div layout="row" layout-align="end center"class="afterControls">
						<md-button
							class="md-raised md-primary"
							ng-disabled="!form_atualizarRevisao.$valid"
							aria-label="Enviar Arquivos"
							ng-if="formUploadItems.length>0"
							ng-click="enviarArquivos()"
							>
								<md-icon class="material-icons step" aria-label="Enviar Arquivos">cloud_upload</md-icon>
								<span ng-if="agora<=documento.revisoes[0].data_limite || (update.observacoes!=undefined && update.observacoes!='')">Enviar Atualização</span>
								<span ng-if="agora>documento.revisoes[0].data_limite && (update.observacoes==undefined || update.observacoes=='')">Atualização atrasada. Preencha o campo de observação.</span>
						</md-button>
					</div>
				</form>	
			</md-content>
		</md-tab>
		
		<md-tab label="Histórico">
			<md-content layout-padding layout-wrap>
			<h3>Histórico de Revisões</h3>
			<div ng-if="documento.revisoes.length==0">Esse documento não teve nenhuma revisão registrada.</div>
				<md-expansion-panel-group md-component-id="panelGroup" ng-if="documento.revisoes.length>0">
					<md-expansion-panel  ng-repeat="rev in documento.revisoes|orderBy:'-serial'" md-component-id="{{'histPanel_'+$index}}">
						<md-expansion-panel-collapsed layout="column" class="md-padding">
							<div layout="row" layout-align="space-between start">
								<div>Revisão: {{rev.serial}}</div>
								<div>Data Limite: {{rev.data_limite|date:"dd/MM/yyyy"}}</div>	
							</div>
							<progresso
								progress="[rev.progresso_validado,rev.progresso_a_validar]"
								colors="['#2196F3','#6DD900']"
								fcolors="['#FFF','#FFF']"
								width="1000"
								height="20"></progresso>
						</md-expansion-panel-collapsed>
						<md-expansion-panel-expanded>
							<md-expansion-panel-content layout="column">
								<div layout="row" layout-align="space-between start">
									<div>Revisão: {{rev.serial}}</div>
									<div>Data Limite: {{rev.data_limite|date:"dd/MM/yyyy"}}</div>	
								</div>
								<progresso
									progress="[rev.progresso_validado,rev.progresso_a_validar]"
									colors="['#2196F3','#6DD900']"
									fcolors="['#FFF','#FFF']"
									width="780"
									height="20"></progresso>
								<div ng-if="rev.pdas.length==0">Nenhum progresso anterior registrado.</div>
								<div ng-if="rev.pdas.length>0">Progresso</div>
								<div ng-repeat="pda in rev.pdas">
									
									<div class="hbar short">
										<!-- se for o primeiro pda -->
										<div ng-if="$first && rev.progresso_validado>0"
											class="prgValidado"
											style="width: calc({{rev.progresso_validado}}% - 2px)">
											{{rev.progresso_validado}}%
										</div
										><div ng-if="$first && rev.progresso_a_validar>0"
											class="prgAValidar"
											style="width: calc({{rev.progresso_a_validar}}% - 2px)">
											{{rev.progresso_a_validar}}%
										</div>
										<!-- se NÃO for o primeiro pda -->
										<div ng-if="!$first && pda.progresso_total>0"
											class="prgValidado"
											style="width: calc({{pda.progresso_total}}% - 2px)">
											{{pda.progresso_total}}%
										</div>
									</div>
									<span class="pda_data" ng-if="pda.idu_validador!=null">
										{{pda.validador.sigla}} em {{pda.datahora_validacao|date:"dd/MM/yyyy à's' hh:mm:ss"}}
									</span>
									<span class="pda_data" ng-if="pda.idu_validador==null && rev.progresso_a_validar==0">
										Validação Dispensada.
									</span>
									<span class="pda_data" ng-if="pda.idu_validador==null && rev.progresso_a_validar>0">
										Aguardando Validação
									</span>
								</div>
								<div layout="row" layout-align="center center">
									<md-button ng-click="collapseHistPanel($index)" class="md-icon-button" aria-label="Colapsar"><md-icon class="material-icons step" aria-label="Colapsar">keyboard_arrow_up</md-icon></md-button>
								</div>
							</md-expansion-panel-content>
						</md-expansion-panel-expanded>
					</md-expansion-panel>
				</md-expansion-panel-group>
			</md-content>
		</md-tab>

	</md-tabs>
</md-content>