<div class="bloco_conteudo bloco_central_80" md-whiteframe="1dp">
	<md-tabs md-dynamic-height md-border-bottom>
		<md-tab label="Dados">
			<md-content class="md-padding">
				<h1 class="md-display-2">Dados do Projeto</h1>
				<form name="form_projetoInfo" novalidate>
					<div layout="column">
						<div layout="row" layout-align="space-between start" class="md-inline-form">
							<md-input-container flex="30">
								<label>Nome</label>
								<input type="text" placeholder="Dê um nome para o projeto" ng-model="projeto.nome" required>
							</md-input-container>
							
							<md-input-container flex="30">
								<label>Código</label>
								<input type="text" placeholder="Digite um código identificador para o projeto" ng-model="projeto.codigo" required>
							</md-input-container>

							<md-input-container flex="30">
								<label>Cliente</label>
								<md-select ng-model="clientes.selecionado" required> <!--md-on-close: expression; multiple:boolean; placeholder: string;-->
								  <md-select-label>Selecione um cliente</md-select-label>
								  <md-option ng-value="option" ng-repeat="option in clientes.dados|orderBy:'nome'">{{ option.nome }}</md-option>
								</md-select>
							</md-input-container>
						</div>
						<div layout="row"  layout-align="space-between start" class="md-inline-form">
							<md-input-container flex="30">
								<label>Responsável</label>
								<md-select ng-model="usuarios.selecionado" required>
								  <md-select-label>Selecione um responsável</md-select-label>
								  <md-option ng-value="option" ng-repeat="option in usuarios.dados|orderBy:'nome'">{{ option.nome }}</md-option>
								</md-select>
							</md-input-container>
							<md-input-container flex="30">
								<label>Início (previsto)</label>
								<md-datepicker
												md-open-on-focus
												md-hide-icons="calendar"
												ng-model="projeto.data_inicio_p"
												></md-datepicker>
							</md-input-container>
							<md-input-container flex="30">
								<label>Final (previsto)</label>
								<md-datepicker
												md-open-on-focus
												md-hide-icons="calendar"
												ng-model="projeto.data_final_p"
												></md-datepicker></td>
							</md-input-container>
						</div>
						<div layout="row">
							<md-input-container flex="45">
								<md-checkbox name="ativo" ng-model="projeto.ativo" class="md-primary">
									Ativo
								</md-checkbox>
							</md-input-container>
						</div>
					</div>
					<div layout="row" layout-align="end start">
						<md-button class="md-raised md-accent" ng-click="cancel()">Cancelar</md-button>
						<md-button class="md-raised md-primary" ng-click="salvarProjeto()" ng-disabled="form_projetoInfo.$pristine || clientes.selecionado.id==0 || usuarios.selecionado.id==0 || !form_projetoInfo.$valid">Salvar</md-button>
					</div>
				</form>
			</md-content>
		</md-tab>

		<md-tab label="Áreas" ng-disabled="projeto.id==0">
			<md-content class="md-padding" ng-controller="ProjetosAreasController">
				<h1 class="md-display-2">Áreas do Projeto</h1>
				<div layout="row" layout-align="space-between center">
					<md-button class="md-raised md-primary" aria-label="Nova Área" ng-click="openAreaDialog($event,0)">Nova Área</md-button>
					<md-input-container>
						<label>Buscar por Área</label>
						<md-icon class="material-icons step" aria-label="Buscar Área">search</md-icon>
						<input type="text" ng-model="qArea" placeholder="Digite">
					</md-input-container>
				</div>
				<table>
					<thead>
						<tr>
							<td>Cód. da Área</td>
							<td>Nome da Área</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="area in projeto.areas|filter:qArea">
							<td>{{area.codigo}}</td>
							<td>{{area.nome}}</td>
							<td>
								<md-button class="md-icon-button" aria-label="Remover Área" ng-click="openConfirm($event,area.id)">
									<md-icon class="material-icons step" aria-label="Remover Área">delete</md-icon>
								</md-button>
								<md-button class="md-icon-button" aria-label="Alterar Área" ng-click="openAreaDialog($event,area.id)">
									<md-icon class="material-icons step" aria-label="Alterar Área">mode_edit</md-icon>
								</md-button>
							</td>
						</tr>
					</tbody>
				</table>
			</md-content>
			
			<md-divider></md-divider>
			
			<md-content class="md-padding" ng-controller="ProjetosSubareasController">
				<h1 class="md-display-2">Sub-áreas do Projeto</h1>
				<div layout="row" layout-align="space-between center">
					<md-button class="md-raised md-primary" aria-label="Nova Sub-área" ng-click="openDialog($event,0)">Nova Sub-área</md-button>
					<md-input-container>
						<label>Buscar por Sub-área</label>
						<md-icon class="material-icons step" aria-label="Buscar Sub-área">search</md-icon>
						<input type="text" ng-model="qSubarea" placeholder="Digite">
					</md-input-container>
				</div>
				<table>
					<thead>
						<tr>
							<td>Cód. da Sub-área</td>
							<td>Nome da Sub-área</td>
							<td>Área</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="subarea in projeto.subareas|filter:qSubarea">
							<td>{{subarea.codigo}}</td>
							<td>{{subarea.nome}}</td>
							<td>{{subarea.area.nome}}</td>
							<td>
								<md-button class="md-icon-button" aria-label="Remover Sub-área" ng-click="openConfirm($event,subarea.id)">
									<md-icon class="material-icons step" aria-label="Remover Sub-área">delete</md-icon>
								</md-button>
								<md-button class="md-icon-button" aria-label="Alterar Sub-área" ng-click="openDialog($event,subarea.id)">
									<md-icon class="material-icons step" aria-label="Alterar Sub-área">mode_edit</md-icon>
								</md-button>
							</td>
						</tr>
					</tbody>
				</table>
			</md-content>
		</md-tab>

		<md-tab label="Documentos de Abertura de Operações" ng-disabled="projeto.id==0">
			<md-content id="addprojeto_dao_container" class="md-padding" ng-controller="ProjetosDAOsController">
				<h1 class="md-display-2">Documentos de Abertura de Operações</h1>
				<form id="form_daos" name="form_daos">
					<div layout="row" layout-align="space-between center">
						<md-button
							class="md-raised md-primary"
							ngf-multiple="true"
							ngf-select
							ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
							ngf-model-invalid="errorFiles"
							ng-model="daoFiles"
							ng-disabled="daoFiles.length>0"
							aria-label="Selecione">Selecione (Máximo <?php echo(ini_get('upload_max_filesize').'B)'); ?></md-button>
						<md-input-container>
							<label>Busca</label>
							<input type="text" ng-model="qDao.nome">
						</md-input-container>
					</div>
					<div ng-if="errorFiles.length" class="alertaDeTamanho">
						Foram selecionados arquivos com tamanho superior a {{errorFiles[0].$errorParam}}.<br>
						Estes arquivos não serão enviados.
					</div>
					<table ng-if="daoFiles.length>0">
						<thead>
							<tr>
								<td>Nome do Documento</td>
								<td>Arquivo</td>
								<td></td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="file in daoFiles" id="tr_{{file.name}}">
								<td><input type="text" name="daoName_{{$index}}" ng-model="daoNames[$index]" required></td>
								<td>{{file.name}}</td>
								<td>{{errosNoUploadDeDaos[file.name]}}</td>
								<td>
									<md-button class="md-raised md-accent" aria-label="Remover" ng-click="removerDaoFile($index)">Remover</md-button>
								</td>
							</tr>
						</tbody>
					</table>
					
					<div layout="row" layout-align="end center">
						<md-progress-circular ng-if="mostrarProgressoUploadDaos" md-mode="determinate" value="{{progress}}" md-diameter="20"></md-progress-circular>
						<md-button class="md-raised md-primary" ng-click="uploadDaoFiles(daoFiles)" ng-if="daoFiles.length>0"  ng-disabled="daoFiles.length==0 || !form_daos.$valid" aria-label="Salvar Documentos de Abertura de Operações">Salvar Documentos de Abertura de Operações</md-button>
					</div>
				</form>
				<div layout="row" class="sub_bloco" id="daosRegistradas_container" ng-if="projeto.daos.length>0">
					<h3 flex="15">Já registrados</h3>
					<table flex="85">
						<thead>
							<tr>
								<td>Nome</td>
								<td>Arquivo</td>
								<td>Tipo</td>
								<td>Tamanho</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="dao in projeto.daos|filter:qDao">
								<td>{{dao.nome}}</td>
								<td>{{dao.nome_cliente}}</td>
								<td>{{dao.tipo}}</td>
								<td>{{dao.tamanho}}</td>
								<td>
									<md-button ng-click="download(dao.id)" class="md-icon-button md-primary" aria-label="Baixar"><md-icon class="material-icons step" aria-label="Baixar">file_download</md-icon></md-button>
									<md-button ng-click="openConfirmRemoveDAO(ev,dao.id)" class="md-icon-button md-primary" aria-label="Remover"><md-icon class="material-icons step" aria-label="Remover">delete</md-icon></md-button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</md-content>
		</md-tab>

		<md-tab label="Documentos" ng-disabled="projeto.id==0">
			<md-content class="md-padding" ng-controller="ProjetosDocumentosController">
				<h1 class="md-display-2">Documentos</h1>
				<div layout="row" layout-align="space-between center">
					<md-button class="md-raised md-primary" aria-label="Novo Documento" ng-click="openDocumentoDialog($event,0)">Novo Documento</md-button>
					<md-input-container>
						<label>Buscar por Documento</label>
						<md-icon class="material-icons step" aria-label="Buscar documento">search</md-icon>
						<input type="text" ng-model="q.nome" placeholder="Digite">
					</md-input-container>
				</div>
				
				<md-expansion-panel-group md-component-id="panelGroup">
					<md-expansion-panel  ng-repeat="doc in projeto.documentos | filter:q as result" md-component-id="{{'panel_'+$index}}">
						<md-expansion-panel-collapsed layout="row" layout-align="start start">
							<div class="md-expansion-panel-item" style="width: 150px">
								<div class="label">Código</div>
								<div class="value">{{doc.codigo}}</div>
							</div>
							<div class="md-expansion-panel-item" style="width: 150px">
								<div class="label">Título</div>
								<div class="value">{{doc.nome}}</div>
							</div>
							<div class="md-expansion-panel-item" flex>
								<div class="label">Subdisciplina</div>
								<div class="value">{{doc.subdisciplina.codigo}} - {{doc.subdisciplina.nome}}</div>
							</div>
							<div class="md-expansion-panel-item"  style="width: 200px">
								<div class="label">Sub-área</div>
								<div class="value">{{doc.subarea.codigo}}</div>
							</div>
							<div class="md-expansion-panel-item"  style="width: 85px">
								<div class="label">Data Limite</div>
								<div class="value">{{doc.data_limite|date:'dd/MM/yyyy'}}</div>
							</div>
						</md-expansion-panel-collapsed>
						<md-expansion-panel-expanded>
							<md-expansion-panel-content layout="column">
								<div>
									<div class="md-expansion-panel-item">
										<div class="label">ID</div>
										<div class="value">{{doc.id}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Código</div>
										<div class="value">{{doc.codigo}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Título</div>
										<div class="value">{{doc.nome}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Subdisciplina</div>
										<div class="value">{{doc.subdisciplina.nome}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Disciplina</div>
										<div class="value">{{doc.subdisciplina.disciplina.nome}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Área</div>
										<div class="value">{{doc.subarea.area.nome}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Sub-área</div>
										<div class="value">{{doc.subarea.nome}}</div>
									</div>
									<div class="md-expansion-panel-item">
										<div class="label">Data Limite</div>
										<div class="value">{{doc.data_limite|date:'dd/MM/yyyy'}}</div>
									</div>
								</div>
								<div layout="row">
									<div class="md-expansion-panel-item" flex layout="column">
										<div class="label">Trabalho (Homem x Hora)</div>
										<div class="value" ng-repeat="hh in doc.hhs">
											{{hh.cargo.nome}}: {{hh.hh}} hh
										</div>
									</div>
									<div class="md-expansion-panel-item" flex>
										<div class="label">Dependências</div>
										<div class="value">
											<span ng-repeat="dp in doc.dependencias">
												{{dp.codigo}}
											</span>
										</div>
									</div>
								</div>								
								<div layout="row" layout-align="space-between center">
									<span>
										<md-button
											class="md-raised md-accent"
											aria-label="Remover"
											ng-click="openRemoverConfirm($event,doc)"
											ng-disabled="doc.ultimo_pda!=null">Remover
										</md-button>
										<md-tooltip ng-if="doc.ultimo_pda!=null" md-delay="0" md-direction="bottom" md-autohide="true">
											Impossível remover documento que já foi atualizado/alterado.
										</md-tooltip>
									</span>
									<md-button class="md-raised md-primary" aria-label="Editar"  ng-click="openDocumentoDialog($event,doc.id)">Editar</md-button>
								</div>
								<div layout="row" layout-align="center center">
									<md-button ng-click="collapsePanel($index)" class="md-mini" aria-label="Menos Informações do Documento"><md-icon class="material-icons step" aria-label="Menos">expand_less</md-icon></md-button>
								</div>
							</md-expansion-panel-content>
						</md-expansion-panel-expanded>
					</md-expansion-panel>
				</md-expansion-panel-group>
			</md-content>
		</md-tab>
	</md-tabs>
</div>