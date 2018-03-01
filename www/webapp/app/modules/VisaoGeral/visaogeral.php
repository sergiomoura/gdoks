<?php 
	// Incluindo o blocker de tela.
	include('blocker_tela.php');
?>
<div class="visaogeral_container">
	<div class="progressoGeral">
		<canvas id="progressoGeral_canvas" width="100%" height="100%" ></canvas>
		<div class="numero" ng-if="progresso_geral!=null">{{progresso_geral}}%</div>
	</div>

	<div class="documentos">
		<canvas id="documentos_canvas" width="100%" height="100%" ></canvas>
	</div>

	<div class="docsParaValidar" ng-controller="DocsParaValidarController">
		<span ng-if="docsParaValidar.length>0">Você possui <strong>{{docsParaValidar.length}}</strong> documento{{docsParaValidar.length!=1?'s':''}} para validar.</span>
		<span ng-if="docsParaValidar.length==0">Você não possui nenhum documento para validar.</span>		
		<table ng-if="docsParaValidar.length>0">
			<tbody>
				<tr ng-repeat="doc in docsParaValidar">
					<td>{{doc.codigo}}</td>
					<td>
						<md-button
							class="md-icon-button"
							aria-label="Ir para documento">
							<md-icon
								class="material-icons step"
								aria-label="Ir para documento"
								ng-click="goToDoc(doc.id)">open_in_new</md-icon>
							<md-tooltip md-direction="bottom">Ir para página do documento</md-tooltip>
						</md-button>
						
						<md-button
							class="md-icon-button"
							aria-label="Download"
							ng-click="baixarPDA(doc.id_pda)">
							<md-icon
								class="material-icons step"
								aria-label="Download">file_download</md-icon>
							<md-tooltip md-direction="bottom">Baixar Última Versão</md-tooltip>
						</md-button>
					</td>
				</tr>
			</tbody>
		</table>
		<a href="" ng-click="verTodos()" ng-if="docsParaValidar.length>0">Ver Todos</a>
	</div>

	<div class="grds">
		<canvas id="grds_canvas" width="100%" height="100%" ></canvas>
	</div>

</div>
