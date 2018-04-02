<?php 
	// Levantando dados do último commit
	$commit = shell_exec("git log -n 1 --date=iso8601 --pretty=format:\"%cd\"");
	$date = (new DateTime(substr($commit,0,19)))->format('d/m/Y à\s H:i:s');
 ?>
<div class="container_80" id="sobre_container">
	<img src="img/logo.png" alt="GDoks" class="logo">
	
	<a href="#/ua" class="ua">
		<span>Última Atualização:</span>
		<span><?php echo($date) ?></span>
	</a>
	<div class="roadmap">
		<h1>Roadmap*</h1>
		<table>
			<thead>
				<tr>
					<td>Data Prevista</td>
					<td>Funcionalidade</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>06/04/2018</td>
					<td>
						Melhorar a tela de atualização de documento.
						<ul>
							<li>Exibir Cliente</li>
							<li>Incorporar histórico de progresso à barra "Progresso"</li>
							<li>Mostrar arquivos que estão compondo o documento</li>
						</ul>
					</td>
				</tr>
				<tr>
					<td>13/04/2018</td>
					<td>
						Boletim de Medição de Projeto
						<ul>
							<li>Configura projeto para valor ser setado por documento ou pelo projeto inteiro.</li>
							<li>Registrar o valor de venda do documento de acordo com configuuração do projeto (visão sob permissão)</li>
							<li>Registrar o valor do projeto de acordo com configuração do projeto</li>
							<li>Registrar pagamentos efetuados pelo cliente</li>
							<li>Registrar pagamentos feito a especialistas tercerizados</li>
						</ul>
					</td>
				</tr>
				<tr>
					<td>20/04/2018</td>
					<td>Gerenciamento de Propostas</td>
				</tr>
				<tr>
					<td>27/10/2018</td>
					<td>Gerenciamento dos documentos de Fornecedor (GDF)</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="obs">* As datas e funcionalidades descritas aqui não estabelecem um compromisso com o cliente e podem ser alteradas sem aviso.</div>

</div>