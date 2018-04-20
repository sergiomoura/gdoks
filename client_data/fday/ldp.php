<?php 

	// includes
	include_once('constantes.php');
	include_once('db.php');
	require_once('vendor/autoload.php');

	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	
	class ldp {

		private $documentos;
		private $projeto;
		private $xlsx;
		private $db;
		
		/**
		* Construtor: Recebe id de projeto como parâmetro ou um vetor cujos
		* elementos são dados de documentos.
		*/
		public function __construct($parametro){

			// Carregando a dbkey
			include(dirname(__FILE__).'/dbkey.php');
			
			// Criando conexão
			$this->db = new DB($dbkey);
			unset($dbkey);

			// Testando se o parâmetro é um inteiro (id de projeto)
			if(is_int($parametro)){
				
				// Carregando dados do projeto
				$this->loadDadosDoProjeto($parametro);

				// Carregando documentos do projeto
				$this->loadDocumentosDoProjeto($parametro);

			} elseif (is_array($parametro)) {
				// Parâmetro já é de documentos
				$this->documentos = $parametro;
			}
		}

		private function loadDocumentosDoProjeto($id_projeto){
			// Carregando documentos
			$sql = 'SELECT a.codigo,
					       a.nome,
					       a.codigo_alternativo,
					       b.nome AS subarea_nome,
					       c.nome AS area_nome,
					       d.nome AS subdisciplina_nome,
					       e.nome AS disciplina_nome,
					       R.serial AS serial
					FROM gdoks_documentos a
					INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
					INNER JOIN gdoks_areas c ON b.id_area=c.id
					INNER JOIN gdoks_subdisciplinas d ON a.id_subdisciplina=d.id
					INNER JOIN gdoks_disciplinas e ON d.id_disciplina=e.id
					LEFT JOIN
					  (SELECT
							a.id_documento,
						    max(a.serial) as serial
						FROM gdoks_revisoes a
						INNER JOIN gdoks_documentos b on a.id_documento=b.id
						INNER JOIN gdoks_subareas c on b.id_subarea=c.id
						INNER JOIN gdoks_areas d on c.id_area=d.id
						WHERE d.id_projeto=?
						group by a.id_documento
						order by a.id DESC) R ON R.id_documento=a.id
					WHERE c.id_projeto=?';

			$this->documentos = array_map(function($a){return (object)$a;}, $this->db->query($sql,'ii',$id_projeto,$id_projeto));
		}

		private function loadDadosDoProjeto($id_projeto){

			// Carregando dados do projeto
			$sql = 'SELECT
						a.id,
						a.nome,
						a.codigo,
						a.data_inicio_p,
						a.data_final_p,
						c.nome as nome_responsavel,
						c.email as email_responsavel,
						b.nome as nome_cliente,
						b.contato_nome,
						b.contato_email,
						b.contato_telefone
					FROM gdoks_projetos a
					INNER JOIN gdoks_clientes b ON (a.id_cliente=b.id
					                                AND a.id=?)
					INNER JOIN gdoks_usuarios c ON a.id_responsavel=c.id';
			$this->projeto = (object)($db->query($sql,'i',$id_projeto)[0]);
		}

		private function criaXlsx(){
			
			// Abrindo o documento modelo da empresa
			$modelo = dirname(__FILE__).'/ldp.xlsx';

			// Verificando existência de modelo
			if(!file_exists($modelo)) {
				throw new Exception("Modelo de LDP inexistente para a empresa.", 1);
			}

			// Abrindo arquivo para escrita
			$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($modelo);

			// Pegando a planilha ativa para escrever nela
			$sheet = $spreadsheet->getActiveSheet();

			// Escrevendo informações de cabeçalho
			$sheet->setCellValue('G2','Projeto: '.$this->projeto->nome);
			$sheet->setCellValue('A5','Data de Início (previsto): '.$this->projeto->data_inicio_p);
			$sheet->setCellValue('A6','Data Final (previsto): '.$this->projeto->data_final_p);
			$sheet->setCellValue('A7','Responsável: '.$this->projeto->nome_responsavel.' ('.$this->projeto->email_responsavel.')');
			$sheet->setCellValue('G5','Cliente: '.$this->projeto->nome_cliente);
			$sheet->setCellValue('G6','Contato: '.$this->projeto->contato_nome);
			$sheet->setCellValue('G7','Telefone: '.$this->projeto->contato_telefone);

			// Fixando limites para escrita de dados de documento
			$linhaInicial = 10;
			$colunaInicial = 'A';
			$colunaFinal = 'G';

			// Estabelecendo vetor de estilos
			$styleArray = [
			    'borders' => [
			        'top' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ],
			        'bottom' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ],
			        'left' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ],
			        'right' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ]
			    ]
			];

			// Loop dos documentos
			for ($i=0; $i < sizeof($this->documentos); $i++) { 

				// Fizando o valor da linha para evitar recalculo
				$linha = $linhaInicial+$i;

				// Escrevendo linha
				$sheet->setCellValue('A'.$linha,$this->documentos[$i]->codigo);
				$sheet->setCellValue('B'.$linha,$this->documentos[$i]->nome);
				$sheet->setCellValue('C'.$linha,$this->documentos[$i]->area_nome);
				$sheet->setCellValue('D'.$linha,$this->documentos[$i]->subarea_nome);
				$sheet->setCellValue('E'.$linha,$this->documentos[$i]->disciplina_nome);
				$sheet->setCellValue('F'.$linha,$this->documentos[$i]->subdisciplina_nome);
				$sheet->setCellValue('G'.$linha,'rev' . $this->documentos[$i]->serial);

				// Alterando altura da linha
				$sheet->getRowDimension($linha)->setRowHeight(20);

				// Formatando linha
				$sheet->getStyle('A'.$linha)->applyFromArray($styleArray);
				$sheet->getStyle('B'.$linha)->applyFromArray($styleArray);
				$sheet->getStyle('C'.$linha)->applyFromArray($styleArray);
				$sheet->getStyle('D'.$linha)->applyFromArray($styleArray);
				$sheet->getStyle('E'.$linha)->applyFromArray($styleArray);
				$sheet->getStyle('F'.$linha)->applyFromArray($styleArray);
				$sheet->getStyle('G'.$linha)->applyFromArray($styleArray);
			}

			// Salvando o xlsx;
			$this->xlsx = $spreadsheet;
		}

		public function enviarXlsx(){

			// Criando
			$this->criaXlsx();

			// Mandando os headers
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			header('Content-Disposition: attachment;filename="ldp_'.$this->projeto->id.'.xlsx"');
			header('Cache-Control: max-age=0');
			
			// Criando o Writer
			$writer = new Xlsx($this->xlsx);

			// Escrevendo o arquivo na saída php
			$writer->save('php://output');
		}
	}