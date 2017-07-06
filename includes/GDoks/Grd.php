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
				$_cliente_contato_nome,
				$_cliente_contato_email,
				$_obs,
				$_datahora_registro,
				$_datahora_enviada,
				$_unique_link,
				$_id_empresa,
				$_codigo_empresa,
				$_documentos,
				$db;

		// Construtor privado... sim.
		private function __construct(mysqli $db){
			$this->db = $db;
		}

		// Função estática que retorna insância de Grd a partir de id e db
		public static function CreateById(int $id, $codigo_empresa){
			// Incluindo dbkey da empresa
			include('../../client_data/'.$codigo_empresa.'/dbkey.php');

			// Estabelecendo conexão com banco e apagando dbkey
			$db = new DB($dbkey);
			unset($dbkey);

			// Levantando dados de GRD
			$sql = 'SELECT c.id AS cliente_id,
						   c.nome AS cliente_nome,
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
			$instance->_cliente_contato_nome	= $rs['contato_nome'];
			$instance->_cliente_contato_email	= $rs['contato_email'];
			$instance->_obs						= $rs['obs'];
			$instance->_datahora_registro		= $rs['datahora_registro'];
			$instance->_datahora_enviada		= $rs['datahora_enviada'];
			$instance->_unique_link				= $rs['unique_link'];
			$instance->_id_empresa 				= $rs['id_empresa'];
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
		public static function CreateByCodigo(int $codigo_grd,mysql $db){
		}

		// Função que retorna o objeto pdf da Grd
		public function pdf($nome_do_emissor){
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
			include('../../includes/FPDF/fpdf.php');
			set_include_path('../../includes/FPDF/fonts/');

			// Incluindo arquivo que seta a classe PDFGrd para a empresa
			include('../../client_data/'.$codigo_empresa.'/grd.php');

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
			if(isset($vars['_'.$string])){
				return $vars['_'.$string];
			} else {
				trigger_error('Undefined property: '.$string);
				echo('<pre>');
				debug_print_backtrace();
				echo('</pre>');
			}
		}

		// Função que cria o zip com a grd e os arquivos que ela contem
		public function gerarZip($nome_do_emissor){
			// Gerando pdf da grd
			$pdf = $this->pdf($nome_do_emissor);
			
			// salvando pdf na pasta da empresa
			$caminhoPdf = UPLOAD_PATH.$this->_id_empresa.'/'.$this->_codigo.'.pdf';
			$pdf->Output('F',$caminhoPdf);

			// listando arquivos mais recentes da grd
			$sql = 'SELECT caminho,
					       nome_cliente
					FROM gdoks_pdas_x_arquivos a
					INNER JOIN gdoks_arquivos b ON a.id_arquivo=b.id
					INNER JOIN
					  (SELECT max(pdas.id) AS id_pda
					   FROM
					     (SELECT max(id_revisao) AS id
					      FROM gdoks_grds_x_revisoes
					      WHERE id_grd=?) R
					   INNER JOIN gdoks_pdas pdas ON pdas.id_revisao=R.id) c ON c.id_pda=a.id_pda';
			$arquivos = array_map(function($a){return (object)$a;}, $this->db->query($sql,'i',$this->_id));
			print_r($arquivos);
			flush();
			// Criando o arquivo zip na pasta raíz da empresa
			$zip = new ZipArchive();
			$caminhoZip = UPLOAD_PATH.$this->_id_empresa.'/'.$this->_codigo.'.zip';
			$zip->open($caminhoZip,ZipArchive::CREATE);

			// Adicionando o pdf ao zip;
			try {
				$zip->addFile($caminhoPdf,$this->_codigo.'.pdf');
			} catch (Exception $e) {
				echo($e->getMessage());
				die();
			}

			// Criando pasta para por os arquivos da GRD
			$pastaDeArquivos = 'arquivos';
			$zip->addEmptyDir($pastaDeArquivos);
			
			// Adicionando os arquivos da GRD
			foreach ($arquivos as $f) {
				if(file_exists(UPLOAD_PATH.$f->caminho)){
					echo('Arquivo '.UPLOAD_PATH.$f->caminho.' existe<br>');
				} else {
					echo('Arquivo '.UPLOAD_PATH.$f->caminho.' NÃO existe<br>');
				}
				flush();
				$zip->addFile(UPLOAD_PATH.$f->caminho,$pastaDeArquivos.'/'.$f->nome_cliente);
			}

			// Fechando o zip
			$zip->close();

			// apagando o pdf
			unlink($caminhoPdf);

			return $caminhoZip;
		}

		// Função que envia o zip para o cliente
		public function sendZip($nome_do_emissor){
			// Gerando o zip
			$caminhoDoZip = $this->gerarZip($nome_do_emissor);

			// Enviando headers
			header('HTTP/1.0 200 OK');
			header('Cache-Control: public, must-revalidate, max-age=0');
			header('Pragma: no-cache');
			header('Content-type: application/octet-stream');
			header('Content-Disposition: attachment; filename="'.$this->_codigo.'.zip"');
			header('Accept-Ranges: bytes');
			header("Content-Transfer-Encoding: binary");

			// output the file first clean mem
			ob_clean();
			readfile($caminhoDoZip);

			// apagando o zip
			unlink($caminhoDoZip);
		}
	}
?>