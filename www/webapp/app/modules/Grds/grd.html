<div class="container_80" id="grd_container" layout="column">
	<div class="controle_principal" layout="row" layout-align="start center">
		<div layout="row" flex="none">
			<md-button class="md-raised md-primary" aria-label="Buscar GRD" ng-click="goToGrds()">
				<md-icon class="material-icons step" aria-label="Buscar GRD">search</md-icon>
				Buscar GRD
			</md-button>
		</div>
		<div flex layout="row" layout-align="end center">
			<md-button ng-disabled="grd.docs.length == 0 || grd.docs==undefined" class="md-raised md-primary" aria-label="Baixar GRD em ZIP" ng-click="onVisualizarGrdClick()">
				<md-icon class="material-icons step" aria-label="Baixar GRD em ZIP">remove_red_eye</md-icon>
				Visualizar GRD
			</md-button>
			<md-button ng-disabled="grd.docs.length == 0 || grd.docs==undefined" class="md-raised md-primary" aria-label="Baixar GRD em ZIP" ng-click="onBaixarGrdEmZipClick()">
				<md-icon class="material-icons step" aria-label="Baixar GRD em ZIP">archive</md-icon>
				Baixar GRD em ZIP
			</md-button>
			<div class="sendActions">
				<md-button class="md-fab md-mini" ng-click="confirmPublicarController($event)" ng-disabled="grd.docs.length == 0 || grd.docs==undefined || grd.projeto_ativo==0">
					<md-icon class="material-icons step" aria-label="Publicar na área do cliente">public</md-icon>
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Publicar na área do cliente
					</md-tooltip>
				</md-button>
				<md-button class="md-fab md-mini" ng-click="openDialogDeEnviarLinkPorEmail($event)" ng-disabled="grd.docs.length == 0 || grd.docs==undefined || grd.projeto_ativo==0">
					<md-icon class="material-icons step" aria-label="Enviar link por email">email</md-icon>
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Enviar LINK por email
					</md-tooltip>
				</md-button>
				<md-button class="md-fab md-mini" ng-disabled="grd.docs.length == 0 || grd.docs==undefined || !grd.cliente.ftp_configurado || grd.projeto_ativo==0" ng-click="confirmFtpUploadController($event)">
					<md-icon class="material-icons step" aria-label="Fazer upload para FTP">unarchive</md-icon>
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Enviar para FTP do cliente
					</md-tooltip>
				</md-button>
			</div>
		</div>
	</div>
	<md-tabs md-selected="0" md-dynamic-height md-border-bottom md-whiteframe="1dp">
		<md-tab label="Dados da GRD">
			<md-content class="md-padding dados">
				<form name="formDados" ng-submit="salvar()">
					<div layout="row" layout-align="space-between start">
						<md-input-container flex="25">
							<label>Cliente</label>
							<md-select ng-model="grd.cliente" ng-change="onClienteChange()" ng-disabled="grd.datahora_enviada!=null || grd.projeto_ativo==0" required>
							  <md-select-label>Selecione um Cliente</md-select-label>
							  <md-option ng-value="cliente" ng-repeat="cliente in clientes|orderBy:'nome'">{{ cliente.nome }}</md-option>
							</md-select>
						</md-input-container>
						<md-input-container flex="25">
							<label>Nome do Contato</label>
							<input type="text" disabled="disabled" ng-model="grd.cliente.contato_nome">
						</md-input-container>
						<md-input-container flex="25">
							<label>Telefone do Contato</label>
							<input type="text" disabled="disabled" ng-model="grd.cliente.contato_telefone">
						</md-input-container flex="25">
						<md-input-container>
							<label>Email do Contato</label>
							<input type="text" disabled="disabled" ng-model="grd.cliente.contato_email">
						</md-input-container>
					</div>
					
					<div layout="row" layout-align="space-between start">
						<md-input-container flex="25">
							<label>Projeto</label>
							<md-select ng-model="grd.projeto" ng-change="onProjetoChange()" ng-disabled="grd.datahora_enviada!=null || grd.projeto_ativo==0" required>
							  <md-select-label>Selecione um Projeto do Cliente</md-select-label>
							  <md-option ng-value="projeto" ng-repeat="projeto in projetos|orderBy:'nome'">{{ projeto.nome }}</md-option>
							</md-select>
						</md-input-container>
						<md-input-container flex="25">
							<label>Código da GRD</label>
							<input type="text" ng-model="grd.codigo" disabled="disabled" placeholder="Automático após salvamento">
						</md-input-container>
						<md-input-container flex="50">
							<label>Observações</label>
							<input type="text" ng-model="grd.obs">
						</md-input-container>
					</div>
					<div class="documentos" layout="column" ng-if="grd.projeto!=undefined">
						<div layout="row" layout-align="start center" class="controles_documentos">
							<md-button class="md-icon-button md-mini" ng-click="selecionarTodos()" ng-disabled="grd.datahora_enviada!=null">
								<md-icon class="material-icons step" aria-label="description">done_all</md-icon>
								<md-tooltip md-direction="bottom">Selecionar Todos</md-tooltip>
							</md-button>
							<md-icon class="material-icons step" aria-label="description">search</md-icon>
							<input flex="40" type="text" ng-model="qEsq.nome" placeholder="Filtrar documentos pelo nome...">
							<md-select flex="25" ng-model="qEsq.id_disciplina">
								<md-option ng-value="undefined">Todas as Disciplinas</md-option>
								<md-option ng-repeat="d in disciplinas|orderBy:'nome'" ng-value="d.id">{{d.nome}}</md-option>
							</md-select>
							<md-select flex="25" ng-model="qEsq.id_area">
								<md-option ng-value="undefined">Todas as Áreas</md-option>
								<md-option ng-repeat="a in areas|orderBy:'codigo'" ng-value="a.id">{{a.codigo}} - {{a.nome}}</md-option>
							</md-select>
						</div>
						<div layout="row" layout-align="end center">
							<md-button
								ng-disabled="formDados.$pristine || formDados.$invalid || !grd.alterada || grd.projeto_ativo==0"
								ng-click="salvar()"
								class="md-raised md-primary"
								aria-label="Salvar GRD">
									{{grd.datahora_enviada!=null?'Esta GRD foi já enviada para o cliente. Ela não pode mais ser alterada.':'Salvar GRD'}}
							</md-button>
						</div>

						<div class="doc" layout="row" layout-align="start center" ng-repeat="doc in documentos|filter:qEsq|orderBy:'-progresso'" ng-class="{selecionado_dir:doc.chk_dir}">
							<div flex>
								<md-checkbox
									ng-model="doc.added"
									ng-disabled="!((doc.progresso==100 || (!somenteConcluidosPodemSerAdd && doc.progresso>0)) && grd.datahora_enviada==null && grd.projeto_ativo!=0)"
									ng-click="grd.alterada=true"
									class="md-primary doc-checkbox"
									flex aria-label="{{doc.nome}}"><span>{{doc.codigo}}</span><span>{{doc.nome}}</span>
								</md-checkbox>
							</div>
							<span class="controles_de_doc" flex="none">
								
								<span class="ptot" ng-class="{clickable:(grd.datahora_enviada==null && grd.projeto_ativo==1)}" ng-if="doc.added" ng-click="openOpcoesDeDocumentoDialog($event,doc)">
									{{doc.nVias}} Via{{doc.nVias!=1?'s':''}}
								</span>
								<span class="ptot" ng-class="{clickable:(grd.datahora_enviada==null && grd.projeto_ativo==1)}" ng-if="doc.added" ng-click="openOpcoesDeDocumentoDialog($event,doc)">
									{{doc.nFolhas}} Fls
								</span>
								<span class="ptot" ng-class="{clickable:(grd.datahora_enviada==null && grd.projeto_ativo==1)}" ng-if="doc.added" ng-click="openOpcoesDeDocumentoDialog($event,doc)">
									{{doc.tipo.simbolo}}
									<md-tooltip md-direction="bottom">Tipo</md-tooltip>
								</span>
								<span class="ptot" ng-class="{clickable:(grd.datahora_enviada==null && grd.projeto_ativo==1)}" ng-if="doc.added" ng-click="openOpcoesDeDocumentoDialog($event,doc)">
									{{doc.codEMI.simbolo}}
									<md-tooltip md-direction="bottom">Código EMI</md-tooltip>
								</span>
								<span class="ptot clickable" ng-click="openEndFisicoDialog($event,doc)">
									End Físico {{doc.end_fisico==null?'vazio':'ok'}}
									<md-tooltip md-visible="false" md-direction="bottom" md-autohide="true" ng-if="doc.end_fisico!=null">
										{{doc.end_fisico}}
									</md-tooltip>
								</span>
								<span class="ptot">
									Rev {{doc.rev_serial}}
								</span>
								<span class="ptot">
									{{doc.progresso}}%
								</span>

								<md-button
									class="md-icon-button"
									aria-label="Ir para documento">
									<md-icon
										class="material-icons step"
										aria-label="Ir para documento"
										ng-click="goToDoc(doc.id)">open_in_new</md-icon>
										<md-tooltip md-direction="bottom">Ir para Página do Documento</md-tooltip>
								</md-button>

								<md-button
									class="md-icon-button"
									aria-label="Download"
									ng-click="baixarRevisaoAtualizada(doc.rev_id)">
									<md-icon
										class="material-icons step"
										aria-label="Download">file_download</md-icon>
										<md-tooltip md-direction="bottom">Baixar Revisão Atualizada</md-tooltip>
								</md-button>
							</span>
						</div>
					</div>
					<button type="submit" style="display: none"></button>
				</form>

				<div layout="row" layout-align="end center" class="bottom_controls">
					<md-button ng-disabled="formDados.$pristine || formDados.$invalid || !grd.alterada" ng-click="salvar()" class="md-raised md-primary" aria-label="Salvar GRD">{{grd.datahora_enviada!=null?'Esta GRD foi já enviada para o cliente. Ela não pode mais ser alterada':'Salvar GRD'}}</md-button>
				</div>
			</md-content>
		</md-tab>
		
		<md-tab label="Retorno de GRD"  ng-disabled="grd.datahora_enviada==null">
			<md-content class="md-padding retorno" ng-if="grd.observacoes.length == 0">
				<md-button class="md-raised md-primary" ng_click="openObservacaoDeGRD($event)"><md-icon class="material-icons step">note_add</md-icon>Inserir nova observação</md-button>
			</md-content>
			<md-content class="md-padding retorno" ng-if="grd.observacoes.length>0">
				<div class="obs" ng-repeat="obs in grd.observacoes">
					<div layout="row" layout-align="space-between center">
						<md-input-container>
							<label>Codigo</label>
							<input type="text" value="{{obs.doc.codigo}}" disabled="disabled">
						</md-input-container>
						<md-input-container>
							<label>Título</label>
							<input type="text" value="{{obs.doc.nome}}" disabled="disabled">
						</md-input-container>
						<md-input-container>
							<label>Data</label>
							<input type="text" value="{{obs.data_recebida|date:'dd/MM/yyyy'}}" disabled="disabled">
						</md-input-container>
						<md-input-container>
							<label>Registrada em</label>
							<input type="text" value="{{obs.datahora_registrada|date:'dd/MM/yyyy à\'s\' HH:mm:ss'}}" disabled="disabled">
						</md-input-container>
						<md-input-container>
							<label>Registrada por</label>
							<input type="text" value="{{obs.nome_usuario}}" disabled="disabled">
						</md-input-container>
					</div>
					<div layout="row" layout-align="space-between start">
						<div layout="column" flex="70">
							<md-input-container>
								<label>Observação</label>
								<textarea disabled="disabled">{{obs.obs}}</textarea>
							</md-input-container>
							<md-input-container>
								<label>Comentário do Cliente</label>
								<textarea disabled="disabled">{{obs.cc}}</textarea>
							</md-input-container>
						</div>
						<div layout="column" flex="25">
							<span class="title">Arquivos:</span>
							<a href="#" ng-click="downloadObsFile(a.id)" ng-repeat="a in obs.arquivos">{{a.nome_cliente}}</a>
						</div>
					</div>
					<div layout="row" layout-align="end start" class="controles">
						<md-button class="md-fab md-mini md-primary" ng_click="openObservacaoDeGRD($event)" aria-label="Adicionar Observação">
							<md-icon class="material-icons step">note_add</md-icon>
							<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
								Adicionar Observação
							</md-tooltip>
						</md-button>
						<md-button class="md-fab md-mini md-primary" ng_click="openObservacaoDeGRD($event,obs)" aria-label="Alterar">
							<md-icon class="material-icons step" >edit_mode</md-icon>
							<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
								Alterar Observação
							</md-tooltip>
						</md-button>
						<md-button class="md-fab md-mini md-accent" aria-label="Remover">
							<md-icon class="material-icons step">delete</md-icon>
							<md-tooltip md-delay="400" md-direction="bottom" md-autohide="true">
								Remover Observação
							</md-tooltip>
						</md-button>
					</div>
				</div>
			</md-content>
		</md-tab>
	</md-tabs>
</div>