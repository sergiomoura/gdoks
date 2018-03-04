<?php
	// includes
	include_once('constantes.php');
	include_once('db.php');
	require_once('vendor/autoload.php');

	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

	class ModeloLDP{
		
		// Declarando propriedades privadas
		private $_disciplinas;
		private $_subdisciplinas;
		private $_areas;
		private $_subareas;
		private $_idProjeto;

		public function __construct($codEmpresa, $id_projeto){
			// Definindo o nome do arquivo dbkey
			$FILE_DBKEY = CLIENT_DATA_PATH.$codEmpresa.'/dbkey.php';

			// Verificando se o dbkey da empresa existe
			if(!file_exists($FILE_DBKEY)){
				throw new Exception("Empresa inexistente", 1);
				exit(1);
			}

			// incluindo o arquivo dbkey para conexão
			include($FILE_DBKEY);

			// Criando conexão com a base
			$db = new DB($dbkey);
			unset($dbkey);

			// Levantando disciplinas
			$sql = 'SELECT id,nome,sigla FROM gdoks_disciplinas ORDER BY sigla';
			$this->_disciplinas = array_map(function($a){return (object)$a;}, $db->query($sql));
			
			// Levantando subdisciplinas
			$sql = 'SELECT id,nome,sigla,id_disciplina FROM gdoks_subdisciplinas ORDER BY id_disciplina,sigla';
			$this->_subdisciplinas = array_map(function($a){return (object)$a;}, $db->query($sql));

			// levantando áreas do projeto
			$sql = 'SELECT id,nome,codigo FROM gdoks_areas WHERE id_projeto=? ORDER BY codigo';
			$this->_areas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

			// Levantando subareas
			$sql = 'SELECT a.id,
					       a.nome,
					       a.codigo,
					       a.id_area
					FROM gdoks_subareas a
					INNER JOIN gdoks_areas b ON a.id_area=b.id
					WHERE b.id_projeto=?
					ORDER BY a.id_area,a.codigo';
			$this->_subareas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

			// Destruindo conexão com banco de dados
			unset($db);

			// Guardando o id do projeto
			$this->_idProjeto = $id_projeto;
		}

		private function gerarXlsx(){

			// Criando planilha
			$spreadsheet = new Spreadsheet();
			$sheet = $spreadsheet->getActiveSheet();
			$sheet->setCellValue('A1', 'Hello World!');

			// Criando o Writer
			$writer = new Xlsx($spreadsheet);
			$writer->save('modelo_projeto_'.$this->_idProjeto.'.xlsx');
		}

		public function enviarXlsx(){

		}
	}