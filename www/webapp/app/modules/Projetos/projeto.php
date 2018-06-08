<?php 
	// Incluindo classe "Tela" para carregar as opções da tela Documentos
	include('GDoks/Tela.php');

	// Levantando dados do usuário a partir do cookie
	$user = json_decode($_COOKIE['user']);

	// Incluindo constantes
	include_once('constantes.php');
	include_once('db.php');

	// Carregando dbkey
	include_once(CLIENT_DATA_PATH.$user->empresa.'/dbkey.php');

	// Criando conexão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	$tela = Tela::CreateById(1,$user->id, $db);
	$permissoes = $tela->getOpcoes();

 ?>
<div class="bloco_conteudo bloco_central_80" md-whiteframe="1dp">
	<md-tabs md-dynamic-height md-border-bottom>
		<md-tab label="Dados">
			<md-content id="addprojeto_dados_container" class="md-padding">
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
								<input ng-disabled="geraCodigosAutomaticamente" ng-required="!geraCodigosAutomaticamente" type="text" placeholder="{{geraCodigosAutomaticamente?'Será gerado automaticamente':'Digite um código identificador para o projeto'}}" ng-model="projeto.codigo">
							</md-input-container>

							<md-input-container flex="30">
								<label>Cliente</label>
								<md-select ng-model="clientes.selecionado" ng-change="onClienteChange()" required> <!--md-on-close: expression; multiple:boolean; placeholder: string;-->
								  <md-select-label>Selecione um cliente</md-select-label>
								  <md-option ng-value="option" ng-repeat="option in clientes|orderBy:'nome'">{{ option.nome }}</md-option>
								</md-select>
							</md-input-container>
						</div>
						<div layout="row"  layout-align="space-between start" class="md-inline-form">
							<md-input-container flex="30">
								<label>Responsável</label>
								<md-select ng-model="usuarios.selecionado" required>
								  <md-select-label>Selecione um responsável</md-select-label>
								  <md-option ng-value="option" ng-repeat="option in usuarios|orderBy:'nome'">{{ option.nome }}</md-option>
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
												ng-model="projeto.data_final_p"></md-datepicker>
							</md-input-container>
						</div>
						<div layout="row" layout-align="space-between start">
							<div flex="60" ng-if="clientes.selecionado!=undefined && propostas.length==0">
								Não existe uma proposta realizada para este cliente.<br>
								Clique <a ng-click="gotoNovaProposta()">aqui</a> para criar uma e depois associa-la a um projeto.
							</div>
							<md-input-container flex="30" ng-if="clientes.selecionado==undefined || propostas.length>0">
								<label>Proposta</label>
								<md-select
									ng-model="propostas.selecionada"
									ng-change="onPropostaChange()"
									>
								  <md-select-label>Selecione uma proposta</md-select-label>
								  <md-option ng-value="option" ng-repeat="option in propostas">{{ option.codigo }}</md-option>
								</md-select>
							</md-input-container>
							<md-input-container flex="30" ng-if="clientes.selecionado==undefined || propostas.length>0">
								<label>Versão</label>
								<md-select ng-model="propostas.selecionada.versoes.selecionada" ng-required="propostas.selecionada">
								  <md-select-label>Selecione uma versão da proposta</md-select-label>
								  <md-option ng-value="option" ng-repeat="option in propostas.selecionada.versoes">Versão {{ option.serial }}</md-option>
								</md-select>
							</md-input-container>
							<md-input-container flex="30">
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
			<md-content id="addprojeto_documentos_container" class="md-padding" ng-controller="ProjetosDocumentosController">
				<h1 class="md-display-2">Documentos</h1>
				<div layout="row" layout-align="space-between center">
					<form id="form_import" name="form_import">
						<md-button
							class="md-raised md-primary"
							aria-label="Novo Documento"
							ng-click="openDocumentoDialog($event,0)">
								<md-icon class="material-icons step" aria-label="Criar um novo documento">add</md-icon>Novo Documento
						</md-button>
						<md-button
							class="md-raised md-primary"
							aria-label="Baixar Modelo de LDP"
							ng-click="baixarModeloParaImportacao()">
								<md-icon class="material-icons step" aria-label="Baixar modelo para importação">file_download</md-icon>Baixar Modelo para Importação
								<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
									Baixar modelo para importação (modelo.xlsx)
								</md-tooltip>
						</md-button>
						<md-button
							class="md-raised md-primary"
							aria-label="Enviar arquivo para importação"
							ngf-select="UploadXlsx($files, $invalidFiles)"
							ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
							ngf-multiple="false"
							ngf-pattern="'.xlsx'">
								<md-icon class="material-icons step" aria-label="Enviar arquivo para importação">unarchive</md-icon>Importar
								<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
									Enviar arquivo para importação (xlsx)
								</md-tooltip>
						</md-button>
					</form>
					<md-input-container>
						<label>Buscar por Documento</label>
						<md-icon class="material-icons step" aria-label="Buscar documento">search</md-icon>
						<input type="text" ng-model="q.nome" placeholder="Digite">
					</md-input-container>
				</div>

				<div class="criticas" ng-if="criticas.length > 0">
					<div>
						Algumas linhas do arquivo não foram consideradas por conterem erros.<br>
						Corrija os erros e tente novamente
					</div>
					<ul>
						<li ng-repeat="critica in criticas">
							Linha {{critica.linha}}
							<ul>
								<li ng-repeat="obs in critica.observacoes">{{obs}}</li>
							</ul>
						</li>
					</ul>
				</div>

				<table class="lista_de_docs">
					<thead>
						<tr>
							<td>Nome</td>
							<td>Disciplina</td>
							<td>Área</td>
							<td>Data Limite</td>
							<td></td>
						</tr>
					</thead>
					<tbody ng-repeat="doc in projeto.documentos | filter:q as result">
						<tr class="impar">
							<td>
								<span class="codigo">{{doc.codigo}}</span>
								<span class="nome">{{doc.nome}}</span>
							</td>
							<td>
								<span class="subdisciplina">{{doc.subdisciplina.nome}}</span>
								<span class="disciplina">{{doc.subdisciplina.disciplina.sigla}}</span>
							</td>
							<td>
								<span class="area">{{doc.subarea.area.nome}}</span>
								<span class="subarea">{{doc.subarea.nome}}</span>
							</td>
							<td class="data_limite">{{doc.data_limite|date:'dd/MM/yyyy'}}</td>
							<td>
								<md-button class="md-fab md-mini md-primary" ng-click="openDocumentoDialog($event,doc.id,true)">
									<md-icon class="material-icons step" aria-label="Duplicar Documento">content_copy</md-icon>
									<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
										Duplicar documento
									</md-tooltip>
								</md-button>

								<md-button class="md-fab md-mini md-primary" ng-click="openDocumentoDialog($event,doc.id)">
									<md-icon class="material-icons step" aria-label="Alterar cadastro do documento">mode_edit</md-icon>
									<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
										Editar / Alterar
									</md-tooltip>
								</md-button>

								<span>
									<md-button
										class="md-fab md-mini md-accent"
										aria-label="Remover"
										ng-click="openRemoverConfirm($event,doc)"
										ng-disabled="doc.ultimo_pda!=null">
											<md-icon class="material-icons step" aria-label="Alterar cadastro do documento">delete</md-icon>
											<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
												Apagar Cadastro do Documento
											</md-tooltip>
									</md-button>
									<md-tooltip ng-if="doc.ultimo_pda!=null" md-delay="0" md-direction="bottom" md-autohide="true">
										Impossível remover documento que já foi atualizado/alterado.
									</md-tooltip>
								</span>
							</td>
						</tr>
						<tr class="par">
							<td>
								<div class="label">Trabalho (Homem x Hora)</div>
								<div class="value" ng-repeat="hh in doc.hhs" ng-if="doc.hhs.length > 0">
									{{hh.cargo.nome}}: {{hh.hh}} hh
								</div>
								<div ng-if="doc.hhs.length == 0"> - </div>
							</td>
							<td colspan="4">
								<div class="md-expansion-panel-item" flex>
									<div class="label">Dependências</div>
									<div class="value" ng-if="doc.dependencias.length>0">
										<span ng-repeat="dp in doc.dependencias">
											{{dp.codigo}}
										</span>
									</div>
									<div ng-if="doc.dependencias.length==0"> - </div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</md-content>
		</md-tab>
		
		<?php if(
			$permissoes['AlterarFCProjeto'] ||
			$permissoes['VerFCProjeto'] ||
			$permissoes['AlterarValorProjeto'] ||
			$permissoes['VerValorProjeto']): ?>
			<md-tab label="Financeiro" ng-disabled="projeto.id==0">
				<md-content id="addprojeto_financeiro_container" class="md-padding" ng-controller="ProjetosFinanceiroController">
					<h1 class="md-display-2">Financeiro</h1>
					<form name="form_projFin" id="form_projFin" layout="column">
						<?php if($permissoes['VerFCProjeto']): ?>
							<md-input-container>
								<label>Forma de Cobrança</label>
								<md-select ng-model="dadosFinanceiros.forma_de_cobranca" ng-disabled="<?php echo($permissoes['AlterarFCProjeto']?'false':'true'); ?>">
								  <md-option ng-value="opt" ng-repeat="opt in opcoesDeFormaDeCobranca">{{ opt.nome }}</md-option>
								</md-select>
							</md-input-container>
						<?php endif; ?>

						<?php if($permissoes['VerValorProjeto']): ?>
							<md-input-container ng-if="dadosFinanceiros.forma_de_cobranca.id == opcoesDeFormaDeCobranca[0].id">
								<label>Valor do Projeto (R$)</label>
								<input
									type="number"
									step="0.01"
									ng-model="dadosFinanceiros.valor"
									min="0"
									max="1000000000000"
									ng-max="1000000000000"
									ng-min="0"
									ng-disabled="<?php echo($permissoes['AlterarValorProjeto']?'false':'true'); ?>">
							</md-input-container>
						<?php endif; ?>
					</form>
					<div class="controles" layout="row" layout-align="end center">
						<md-button class="md-raised md-accent" aria-label="Cancelar alterações">Cancelar</md-button>
						<md-button ng-click="salvar()" class="md-raised md-primary" ng-disabled="form_projFin.$pristine" aria-label="Salvar alterações">Salvar Alterações Financeiras do Projeto</md-button>
					</div>
				</md-content>
			</md-tab>
		<?php endif; ?>

	</md-tabs>
</div>