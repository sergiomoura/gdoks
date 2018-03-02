<?php
	class Grd {

		// Declarando atributos privados
		private
				$_id,
				$_codigo,
				$_projeto_id,
				$_projeto_nome,
				$_cliente_id,
				$_cliente_nome,
				$_cliente_endereco,
				$_cliente_contato_nome,
				$_cliente_contato_email,
				$_obs,
				$_datahora_registro,
				$_datahora_enviada,
				$_unique_link,
				$_id_empresa,
				$_codigo_empresa,
				$_documentos,
				$_id_remetente,
				$_nome_remetente,
				$db;

		// Construtor privado... sim.
		private function __construct(mysqli $db){
			$this->db = $db;
		}

		// Função estática que retorna insância de Grd a partir de id e db
		public static function CreateById(int $id, $codigo_empresa){
			
			// verificando se o arquivo de constantes foi incluido
			$constantes_incluidas = in_array('constantes.php', array_map(function($f){return basename($f);}, get_included_files()));
			if(!$constantes_incluidas){
				include_once('constantes.php');
			}

			// Incluindo dbkey da empresa
			include(CLIENT_DATA_PATH.$codigo_empresa.'/dbkey.php');

			// Estabelecendo conexão com banco e apagando dbkey
			$db = new DB($dbkey);
			unset($dbkey);

			// Levantando dados de GRD
			$sql = 'SELECT c.id AS cliente_id,
						   c.nome AS cliente_nome,
						   c.endereco AS cliente_endereco,
						   b.id AS projeto_id,
					       b.nome AS projeto_nome,
					       a.obs AS obs,
					       c.contato_nome,
					       c.contato_email,
					       now() AS DATA,
					       a.codigo,
					       a.unique_link,
					       c.id_empresa,
					       a.datahora_enviada,
					       a.datahora_registro,
					       a.idu_remetente as id_remetente,
					       d.nome as nome_remetente
					FROM gdoks_grds a
					INNER JOIN gdoks_projetos b ON a.id_projeto = b.id
					INNER JOIN gdoks_clientes c ON b.id_cliente = c.id
					LEFT JOIN gdoks_usuarios d ON a.idu_remetente = d.id
					WHERE a.id=?';
			$rs = $db->query($sql,'i',$id)['0'];

			// Criando instância
			$instance = new self($db);

			// Preenchendo campos de instância
			$instance->_id						= $id;
			$instance->_codigo					= $rs['codigo'];
			$instance->_projeto_id				= $rs['projeto_id'];
			$instance->_projeto_nome			= $rs['projeto_nome'];
			$instance->_cliente_id				= $rs['cliente_id'];
			$instance->_cliente_nome			= $rs['cliente_nome'];
			$instance->_cliente_endereco		= $rs['cliente_endereco'];
			$instance->_cliente_contato_nome	= $rs['contato_nome'];
			$instance->_cliente_contato_email	= $rs['contato_email'];
			$instance->_obs						= $rs['obs'];
			$instance->_datahora_registro		= $rs['datahora_registro'];
			$instance->_datahora_enviada		= $rs['datahora_enviada'];
			$instance->_unique_link				= $rs['unique_link'];
			$instance->_id_empresa 				= $rs['id_empresa'];
			$instance->_id_remetente 			= $rs['id_remetente'];
			$instance->_nome_remetente 			= $rs['nome_remetente'];
			$instance->_codigo_empresa 			= $codigo_empresa;

			// Levantando dados dos documentos desta grd
			$sql = 'SELECT c.codigo AS doc_codigo,
					       d.simbolo AS tipo,
					       b.serial AS rev_serial,
					       e.simbolo AS codEMI,
					       a.nFolhas,
					       a.nVias,
					       c.nome AS doc_nome
					FROM gdoks_grds_x_revisoes a
					INNER JOIN gdoks_revisoes b ON b.id=a.id_revisao
					INNER JOIN gdoks_documentos c ON c.id=b.id_documento
					INNER JOIN gdoks_tipos_de_doc d ON d.id=a.id_tipo
					INNER JOIN gdoks_codigos_emi e ON e.id=a.id_codEMI
					WHERE a.id_grd=?';
			$instance->documentos = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id));

			// Retornando resultado
			return $instance;
		}

		// Função estática que retorna insância de Grd a partir de codigo e db
		public static function CreateByUniqueLink(string $unique_link, string $codigo_empresa){
			// Incluindo dbkey da empresa
			include('../../client_data/'.$codigo_empresa.'/dbkey.php');

			// Estabelecendo conexão com banco e apagando dbkey
			$db = new DB($dbkey);
			unset($dbkey);

			// Levantando dados de GRD
			$sql = 'SELECT a.id,
						   c.id AS cliente_id,
						   c.nome AS cliente_nome,
						   c.endereco AS cliente_endereco,
						   b.id AS projeto_id,
					       b.nome AS projeto_nome,
					       a.obs AS obs,
					       c.contato_nome,
					       c.contato_email,
					       now() AS DATA,
					       a.codigo,
					       a.unique_link,
					       c.id_empresa,
					       a.datahora_enviada,
					       a.datahora_registro
					FROM gdoks_grds a
					INNER JOIN gdoks_projetos b ON a.id_projeto=b.id
					INNER JOIN gdoks_clientes c ON b.id_cliente = c.id
					WHERE a.unique_link=?';

			$rs = $db->query($sql,'s',$unique_link);

			if(sizeof($rs) == 0){
				die('GRD inexistente.');
			}

			// Criando instância
			$instance = new self($db);

			// Preenchendo campos de instância
			$instance->_id						= $rs[0]['id'];
			$instance->_codigo					= $rs[0]['codigo'];
			$instance->_projeto_id				= $rs[0]['projeto_id'];
			$instance->_projeto_nome			= $rs[0]['projeto_nome'];
			$instance->_cliente_id				= $rs[0]['cliente_id'];
			$instance->_cliente_nome			= $rs[0]['cliente_nome'];
			$instance->_cliente_endereco		= $rs[0]['cliente_endereco'];
			$instance->_cliente_contato_nome	= $rs[0]['contato_nome'];
			$instance->_cliente_contato_email	= $rs[0]['contato_email'];
			$instance->_obs						= $rs[0]['obs'];
			$instance->_datahora_registro		= $rs[0]['datahora_registro'];
			$instance->_datahora_enviada		= $rs[0]['datahora_enviada'];
			$instance->_unique_link				= $rs[0]['unique_link'];
			$instance->_id_empresa 				= $rs[0]['id_empresa'];
			$instance->_codigo_empresa 			= $codigo_empresa;

			// Levantando dados dos documentos desta grd
			$sql = 'SELECT c.codigo AS doc_codigo,
					       d.simbolo AS tipo,
					       b.serial AS rev_serial,
					       e.simbolo AS codEMI,
					       a.nFolhas,
					       a.nVias,
					       c.nome AS doc_nome
					FROM gdoks_grds_x_revisoes a
					INNER JOIN gdoks_revisoes b ON b.id=a.id_revisao
					INNER JOIN gdoks_documentos c ON c.id=b.id_documento
					INNER JOIN gdoks_tipos_de_doc d ON d.id=a.id_tipo
					INNER JOIN gdoks_codigos_emi e ON e.id=a.id_codEMI
					WHERE a.id_grd=?';
			$instance->documentos = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$instance->_id));

			// Retornando resultado
			return $instance;
		}

		// Função que retorna o objeto pdf da Grd
		public function pdf($nome_do_emissor){
			// verificando se o arquivo de constantes foi incluido
			$constantes_incluidas = in_array('constantes.php', array_map(function($f){return basename($f);}, get_included_files()));
			if(!$constantes_incluidas){
				include_once('constantes.php');
			}

			// Levantando códigos EMI para compor o rodapé da GRD
			$sql = 'SELECT simbolo,nome FROM gdoks_codigos_emi WHERE id_empresa=?';
			$codigosEmi = array_map(function($a){return (object)($a);}, $this->db->query($sql,'i',$this->_id_empresa));

			// Levantando tipos de documento para compor o rodapé da GRD
			$sql = 'SELECT simbolo,nome FROM gdoks_tipos_de_doc WHERE id_empresa=?';
			$tiposDeDocumento = array_map(function($a){return (object)($a);}, $this->db->query($sql,'i',$this->_id_empresa));
		
			// Levantando o codigo da empresa para carregar o modelo de PDF
			$sql = 'SELECT codigo FROM gdoks_empresas WHERE id=?';
			$codigo_empresa = $this->db->query($sql,'i',$this->_id_empresa)[0]['codigo'];

			// Incluindo classe FPdf
			include('FPDF/fpdf.php');
			include('FPDF/xfpdf.php');

			set_include_path(get_include_path() . PATH_SEPARATOR . FPDF_FONT_PATH);

			// Incluindo arquivo que seta a classe PDFGrd para a empresa
			include(CLIENT_DATA_PATH.$codigo_empresa.'/grd.php');

			// Instanciation of inherited class
			$pdf = new PDFGrd($codigo_empresa,$this,$nome_do_emissor,$codigosEmi,$tiposDeDocumento);

			// retornando o objeto pdf;
			return $pdf;
		}

		// Função que envia pdf da grd para o cliente
		public function sendPdf($nome_do_emissor){
			// Gerando o pdf
			$pdf = $this->pdf($nome_do_emissor);

			// Enviando headers
			header('HTTP/1.0 200 OK');
			header('Cache-Control: public, must-revalidate, max-age=0');
			header('Pragma: no-cache');
			header('Content-type: application/pdf');
			header('Content-Disposition: inline; filename="'.$this->_codigo.'.pdf"');
			header('Accept-Ranges: bytes');
			header("Content-Transfer-Encoding: binary");

			// output the file first clean mem
			ob_clean();
			$pdf->Output('I',$this->_codigo.'.pdf');
			exit();
		}

		// getter...
		public function __get($string){
			$vars = get_object_vars($this);
			if(array_key_exists('_'.$string,$vars)) {
				return $vars['_'.$string];
			} else {
				trigger_error('Undefined property: '.$string);
				echo('<pre>');
				debug_print_backtrace();
				echo('</pre>');
			}
		}

		// Função que lista arquivos da GRD
		public function listarArquivos(){
			// listando arquivos mais recentes da grd
			$sql = 'SELECT O.caminho,
			       O.nome_cliente,
			       M.nome_subdisciplina,
			       M.codigo_documento
			FROM
			  (SELECT R.id,
			          R.nome_subdisciplina,
			          R.codigo_documento,
			          max(S.id) AS id_pda
			   FROM
			     (SELECT x.id_revisao AS id,
			             nome_subdisciplina,
			             codigo_documento
			      FROM
			        (SELECT a.id AS id_documento,
			                a.codigo AS codigo_documento,
			                c.nome AS nome_subdisciplina,
			                max(b.id) AS id_revisao
			         FROM gdoks_documentos a
			         INNER JOIN gdoks_revisoes b ON a.id=b.id_documento
			         INNER JOIN gdoks_subdisciplinas c ON a.id_subdisciplina=c.id
			         GROUP BY a.id,
			                  c.nome) x
			      INNER JOIN gdoks_grds_x_revisoes y ON x.id_revisao=y.id_revisao
			      WHERE y.id_grd=?) R
			   INNER JOIN gdoks_pdas S ON R.id=S.id_revisao
			   GROUP BY R.id) M
			INNER JOIN gdoks_pdas_x_arquivos N ON M.id_pda=N.id_pda
			INNER JOIN gdoks_arquivos O ON N.id_arquivo=O.id';
			return array_map(function($a){return (object)$a;}, $this->db->query($sql,'i',$this->_id));
		}

		// Função que cria o zip com a grd e os arquivos que ela contem
		public function gerarZip($nome_do_emissor,$sem_compressao=false){
			$tic = microtime(true);

			// Gerando pdf da grd
			$pdf = $this->pdf($nome_do_emissor);

			// criando a pata temp da empresa caso ela não exista
			if(!is_dir(TMP_PATH.$this->_codigo_empresa)) {
				mkdir(TMP_PATH.$this->_codigo_empresa);
			}

			// salvando pdf na pasta temp da empresa
			$caminhoPdf = TMP_PATH.$this->_codigo_empresa.'/'.$this->_codigo.'.pdf';
			
			$pdf->Output('F',$caminhoPdf);

			// Gerando lista de arquivos
			$arquivos = $this->listarArquivos();
			
			// Parsing arquivos para determinar quais de doc compostos e quais são de doc simples
			$documentos = Array();
			foreach ($arquivos as $arquivo) {
				if(array_key_exists($arquivo->codigo_documento, $documentos)){
					$documentos[$arquivo->codigo_documento]++;
				} else {
					$documentos[$arquivo->codigo_documento] = 1;
				}
			}

			foreach ($arquivos as $arquivo) {
				if($documentos[$arquivo->codigo_documento] == 1){
					$arquivo->docSimples = true;
				} else {
					$arquivo->docSimples = false;
				}
			}

			// Definindo nome do arquivo zip
			$caminhoZip = TMP_PATH.$this->_codigo_empresa.'/'.$this->_codigo.'.zip';

			// Removendo arquivo zip caso ele exista
			if(file_exists($caminhoZip)){unlink($caminhoZip);}

			// Criando o arquivo zip na pasta raíz da empresa
			$zip = new ZipArchive();
			if(!$zip->open($caminhoZip,ZipArchive::CREATE)){
				throw new Exception('Falha ao criar o zip.', 1);
				return;
			}

			// Adicionando o pdf ao zip;
			try {
				$zip->addFile($caminhoPdf,$this->_codigo.'.pdf');
			} catch (Exception $e) {
				throw $e;
				return;
			}


			// Adicionando os arquivos da GRD ao zip
			$erros = Array();
			$j = 1;
			for ($i=0; $i < sizeof($arquivos); $i++) { 
				
				// Lendo o arquivo
				$f = $arquivos[$i];

				// Substituindo espaços no nome da subdisciplina para nomear a subpasta
				$pasta = str_replace(' ', '_', $f->nome_subdisciplina);
				$subpasta = str_replace(' ', '_', $f->codigo_documento);

				// Adicionando arquivo
				if($f->docSimples){
					if(!$zip->addFile($f->caminho,$pasta.'/'.$f->nome_cliente)){

						throw new Exception('Erro ao tentar adicionar '.$f->caminho.' ao zip', 1);
						return;

					} elseif ($sem_compressao) {
						// setando compressão para zip_entry_open(zip, zip_entry)
						$zip->setCompressionIndex($i, ZipArchive::CM_STORE);
					}
				} else {
					if(!$zip->addFile($f->caminho,$pasta.'/'.$subpasta.'/'.$f->nome_cliente)){

						throw new Exception('Erro ao tentar adicionar '.$f->caminho.' ao zip', 1);
						return;

					} elseif ($sem_compressao) {
						// setando compressão para zip_entry_open(zip, zip_entry)
						$zip->setCompressionIndex($i, ZipArchive::CM_STORE);
					}
				}

				// fechando e abrindo o zip para não estourar o número de arquivos abertos
				if($j == 100){
					$zip->close();
					$zip->open($caminhoZip,ZipArchive::CREATE);
					$j=0;
				}
				$j++;
			}

			// Fechando o zip
			try {
				$zip->close();
			} catch (Exception $e) {
				// Evitando o erro por que o arquivo já está fechado...
			}

			// apagando o pdf
			unlink($caminhoPdf);

			return $caminhoZip;
		}

		// Função que lê arquivos aos pedaços
		private function readfile_chunked($filename,$retbytes=true) { 
			$chunksize = 1*(1024*1024); // how many bytes per chunk 
			$buffer = ''; 
			$cnt =0; 
			
			$handle = fopen($filename, 'rb');
			if ($handle === false) {
				return false;
			}
			while (!feof($handle)) {
				$buffer = fread($handle, $chunksize);
				echo $buffer;
				ob_flush();
				flush();
				if ($retbytes) {
					$cnt += strlen($buffer);
				}
			}
			$status = fclose($handle); 
			if ($retbytes && $status) { 
				return $cnt; // return num. bytes delivered like readfile() does. 
			} 
			return $status; 
		}

		// Função que envia o zip para o cliente
		public function sendZip($nome_do_emissor,$sem_compressao=false){
			// Gerando o zip
			try {
				$caminhoDoZip = $this->gerarZip($nome_do_emissor,$sem_compressao);
			} catch (Exception $e) {
				throw $e;
				return;
			}

			// Enviando headers
			header('HTTP/1.0 200 OK');
			header('Cache-Control: public, must-revalidate, max-age=0');
			header('Pragma: no-cache');
			header('Content-type: application/octet-stream');
			header("Content-length: ".filesize($caminhoDoZip));
			header('Content-Disposition: attachment; filename="'.$this->_codigo.'.zip"');
			header('Accept-Ranges: bytes');
			header("Content-Transfer-Encoding: binary");

			// output the file first clean mem
			ob_end_clean();
			$this->readfile_chunked($caminhoDoZip);
			
			// apagando o zip
			unlink($caminhoDoZip);
		}

		public function gerarPdf($nome_do_emissor){
			// Gerando o pdf
			$pdf = $this->pdf($nome_do_emissor);

			// criando a pata temp da empresa caso ela não exista
			if(!is_dir(TMP_PATH.$this->_codigo_empresa)) {
				mkdir(TMP_PATH.$this->_codigo_empresa);
			}

			// Definindo o caminho para o pdf
			$caminhoPdf = TMP_PATH.$this->_codigo_empresa.'/'.$this->_codigo.'.pdf';
			
			// salvando pdf na pasta temp da empresa
			$pdf->Output('F',$caminhoPdf);

			// Retornando o caminho do pdf
			return $caminhoPdf;
		}
	}