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
		private $_codEmpresa;
		private $_xlsx;

		private $linhaCabecalho = 1;
		private $linhaInicialDeDados = 2;
		private $linhaFinalDeDados = 1000;
		private $maxlengh_codigoDocumento = 45;
		private $maxlengh_codigoAlternativo = 45;
		private $maxlengh_nomeArea = 45;
		private $maxlengh_nomeSubarea = 45;
		private $maxlengh_titulo = 100;

		public function __construct($codEmpresa){
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

			// Destruindo conexão com banco de dados
			unset($db);

			// Guardando o código da empresa
			$this->_codEmpresa = $codEmpresa;

			// Gerando o Xlsx
			$this->gerarXlsx();
		}

		private function gerarXlsx(){

			// Criando spread
			$spreadsheet = new Spreadsheet();

			// Criando planilha de disciplinas
			$sheet_disciplinas = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($spreadsheet, 'Disciplinas');

			// Anexando planilha de disciplinas a spread
			$spreadsheet->addSheet($sheet_disciplinas);

			// Preenchendo planilha de Disciplinas
			foreach ($this->_disciplinas as $i => $d) {
				$sheet_disciplinas->setCellValue('A'.($i+1),$d->sigla.' - '.$d->nome);
			}

			// Escondendo planilha de disciplinas
			$sheet_disciplinas->setSheetState(\PhpOffice\PhpSpreadsheet\Worksheet\Worksheet::SHEETSTATE_HIDDEN);

			// Criando planilha de subdisciplinas
			$sheet_subs = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($spreadsheet, 'Subdisciplinas');

			// Anexando planilha de disciplinas a spread
			$spreadsheet->addSheet($sheet_subs);

			// Preenchendo planilha de Disciplinas
			foreach ($this->_subdisciplinas as $i => $s) {
				$sheet_subs->setCellValue('A'.($i+1),$s->sigla.' - '.$s->nome);
			}

			// Escondendo planilha de disciplinas
			$sheet_subs->setSheetState(\PhpOffice\PhpSpreadsheet\Worksheet\Worksheet::SHEETSTATE_HIDDEN);

			// Criando planilha de documentos
			$sheet = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($spreadsheet, 'Documentos');

			// Anexando planilha de disciplinas a spread
			$spreadsheet->addSheet($sheet);

			// Determinando a altura da primeira linha na planilha documentos
			// $sheet->getColumnDimension('A')->setWidth(15);
			$sheet->getDefaultColumnDimension()->setWidth(15);
			$sheet->getRowDimension('1')->setRowHeight(20);

			// Formatando o cabeçalho
			$estilo = $sheet->getStyle('A'.$this->linhaCabecalho.':H'.$this->linhaCabecalho);
			$estilo->getFill()
    			->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    			->getStartColor()->setARGB('FF2196F3');
			$estilo->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$estilo->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
			$estilo->getFont()->getColor()->setARGB(\PhpOffice\PhpSpreadsheet\Style\Color::COLOR_WHITE);

			// Escrevendo head da tabela
			$sheet->setCellValue('A'.$this->linhaCabecalho, 'Código');
			$sheet->setCellValue('B'.$this->linhaCabecalho, 'Cód Alternativo');
			$sheet->setCellValue('C'.$this->linhaCabecalho, 'Título');
			$sheet->setCellValue('D'.$this->linhaCabecalho, 'Disciplina');
			$sheet->setCellValue('E'.$this->linhaCabecalho, 'Subdisciplina');
			$sheet->setCellValue('F'.$this->linhaCabecalho, 'Área');
			$sheet->setCellValue('G'.$this->linhaCabecalho, 'Subárea');
			$sheet->setCellValue('H'.$this->linhaCabecalho, 'Data Limite');


			// Escrevendo Validação de dados para coluna A (Código)
			$validation = $sheet->getCell('A'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_TEXTLENGTH );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setErrorTitle('Código de documento inválido');
			$validation->setError('O código do documento deve conter entre 1 e '.$this->maxlengh_codigoDocumento.' caracteres.');
			$validation->setFormula1(1);
			$validation->setFormula2($this->maxlengh_codigoDocumento);
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
				$spreadsheet->getActiveSheet()->getCell('A'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna B (Código alternativo)
			$validation = $sheet->getCell('B'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_TEXTLENGTH );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setErrorTitle('Código de alternativo inválido');
			$validation->setError('O código do alternativo deve conter entre 1 e '.$this->maxlengh_codigoAlternativo.' caracteres.');
			$validation->setFormula1(1);
			$validation->setFormula2($this->maxlengh_codigoAlternativo);
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
				$spreadsheet->getActiveSheet()->getCell('B'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna C (Título)
			$validation = $sheet->getCell('C'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_TEXTLENGTH );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setErrorTitle('Título de documento inválido');
			$validation->setError('O Título do documento deve conter entre 1 e '.$this->maxlengh_titulo.' caracteres.');
			$validation->setFormula1(1);
			$validation->setFormula2($this->maxlengh_titulo);
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
				$spreadsheet->getActiveSheet()->getCell('C'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna D (Disciplina)
			$validation = $sheet->getCell('D'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_LIST );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setShowDropDown(true);
			$validation->setErrorTitle('Disciplina inválida');
			$validation->setError('Selecione uma disciplina da lista.');
			$validation->setFormula1('Disciplinas!$A$1:$A$'.sizeof($this->_disciplinas));
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
			 	$sheet->getCell('D'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna E (Subdisciplina)
			$validation = $sheet->getCell('E'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_LIST );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setShowDropDown(true);
			$validation->setErrorTitle('Subdisciplina inválida');
			$validation->setError('Selecione uma subdisciplina da lista.');
			$validation->setFormula1('Subdisciplinas!$A$1:$A$'.sizeof($this->_subdisciplinas));
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
			 	$sheet->getCell('E'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna F (Área)
			$validation = $sheet->getCell('F'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_TEXTLENGTH );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setErrorTitle('Nome de área inválido');
			$validation->setError('O nome de uma área deve conter entre 1 e '.$this->maxlengh_nomeArea.' caracteres.');
			$validation->setFormula1(1);
			$validation->setFormula2($this->maxlengh_nomeArea);
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
				$sheet->getCell('F'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna G (Subarea)
			$validation = $sheet->getCell('G'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_TEXTLENGTH );
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setErrorTitle('Nome de subárea inválido');
			$validation->setError('O nome de uma subárea deve conter entre 1 e '.$this->maxlengh_nomeSubarea.' caracteres.');
			$validation->setFormula1(1);
			$validation->setFormula2($this->maxlengh_nomeSubarea);
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
				$sheet->getCell('G'.$i)->setDataValidation(clone $validation);
			}

			// Escrevendo validação de dados para a coluna H (Datalimite)
			$validation = $sheet->getCell('H'.$this->linhaInicialDeDados)->getDataValidation();
			$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_DATE);
			$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
			$validation->setAllowBlank(false);
			$validation->setShowInputMessage(true);
			$validation->setShowErrorMessage(true);
			$validation->setErrorTitle('Data limite inválida');
			$validation->setError('Somente datas válidas são aceitas.');
			$validation->setFormula1('1');
			$validation->setFormula2('402133');
			
			for ($i = ($this->linhaInicialDeDados+1); $i <= $this->linhaFinalDeDados; $i++) { 
				$sheet->getCell('H'.$i)->setDataValidation(clone $validation);
			}

			// Removendo a planilha inicialmente existente
			$spreadsheet->removeSheetByIndex(0);
			
			// Tornando a planilha de documentos ativa
			$spreadsheet->setActiveSheetIndexByName('Documentos');

			// Salvando spreadsheet como propriedade do objeto
			$this->_xlsx = $spreadsheet;
		}

		public function enviarXlsx(){

			// Mandando os headers
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			header('Content-Disposition: attachment;filename="modelo_importacao.xlsx"');
			header('Cache-Control: max-age=0');
			
			// Criando o Writer
			$writer = new Xlsx($this->_xlsx);

			// Escrevendo o arquivo na saída php
			$writer->save('php://output');
		}
		
	}