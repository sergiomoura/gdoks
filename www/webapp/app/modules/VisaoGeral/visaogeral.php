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

	<div class="grds">
		<canvas id="grds_canvas" width="100%" height="100%" ></canvas>
	</div>
</div>
