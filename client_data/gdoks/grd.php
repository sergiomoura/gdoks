<?php
	class PDFGrd extends FPDF {
		// Construtor
		function __construct($empresa,$grd,$resp_envio,$codigosEmi,$tiposDeDocumento){
			parent::__construct();
			$this->grd = $grd;
			$this->empresa = $empresa;
			$this->resp_envio = $resp_envio;
			$this->codigosEmi = $codigosEmi;
			$this->tiposDeDocumento = $tiposDeDocumento;
			$this->titles = json_decode('[
				{"titulo":"Item","width":15},
				{"titulo":"Nº Documento","width":50},
				{"titulo":"Tipo","width":8},
				{"titulo":"Qtd. Vias","width":15},
				{"titulo":"Revisão","width":15},
				{"titulo":"Cód. EMI","width":15},
				{"titulo":"Nº Fls","width":15},
				{"titulo":"Título","width":0}
			]');
			$this->addContent();
		}

		// Page header
		function Header(){
		    // Logo
		    $this->Image('../../client_data/'.$this->empresa.'/logo.jpg',10,10,45);

		    // Título
		    $this->SetFont('helvetica','B',16);
		    $this->setXY(60,11);
		    $this->Cell(0,12,'GUIA DE REMESSA DE DOCUMENTOS - GRD',1,0,'C');
		    $this->Ln(20);

		    // Mudando tamanho da font
		    $this->SetFont('Helvetica','B',9);

		    // Escrevendo os Cabeçalho da GRD
		    $this->Cell(95,5,utf8_decode('Cliente: '.$this->grd->cliente_nome),0);
		    $this->Cell(95,5,utf8_decode('GRD Nº: '.$this->grd->codigo),0);
		    $this->Ln(5);
		    $this->Cell(95,5,utf8_decode('Resp. Envio: '.$this->resp_envio),0);
		    $this->Cell(95,5,utf8_decode('Data: '.date('d/M/Y')),0);
		    $this->Ln(5);
		    $this->Cell(95,5,utf8_decode('Projeto: '.$this->grd->projeto_nome),0);
		    $this->Cell(95,5,utf8_decode('Destinatário: '.$this->grd->cliente_contato_nome),0);
		    $this->Ln(5);
		    $this->Cell(0,5,utf8_decode('Endereço: _______________________________________'),0);$this->Ln();
		    $this->Cell(0,5,utf8_decode('Observações: '.$this->grd->obs),0);$this->Ln();
		    $this->Ln(5);

		    // Imprimindo Primeira linha (títulos)
			for ($i=0; $i < sizeof($this->titles); $i++) { 
				 $this->Cell($this->titles[$i]->width,10,utf8_decode($this->titles[$i]->titulo),1,0,'C');
			}
			$this->Ln();
		}

		function addContent(){
			$this->AliasNbPages();
			$this->AddPage();
			$this->SetFont('Helvetica','',8);
			$this->SetAutoPageBreak(true,60);
			$hHeight = 10;

			// Corpo da tabela
			$alturaDaLinha = 5;
			foreach ($this->grd->documentos as $i => $doc) {
				$this->Cell($this->titles[0]->width,$alturaDaLinha,($i+1)			,1,0,'C');
				$this->Cell($this->titles[1]->width,$alturaDaLinha,utf8_decode($doc->doc_codigo	),1,0,'C');
				$this->Cell($this->titles[2]->width,$alturaDaLinha,utf8_decode($doc->tipo		),1,0,'C');
				$this->Cell($this->titles[3]->width,$alturaDaLinha,utf8_decode($doc->nVias 		),1,0,'C');
				$this->Cell($this->titles[4]->width,$alturaDaLinha,utf8_decode($doc->rev_serial	),1,0,'C');
				$this->Cell($this->titles[5]->width,$alturaDaLinha,utf8_decode($doc->codEMI		),1,0,'C');
				$this->Cell($this->titles[6]->width,$alturaDaLinha,utf8_decode($doc->nFolhas 	),1,0,'C');
				$this->Cell($this->titles[7]->width,$alturaDaLinha,utf8_decode($doc->doc_nome	),1,0,'C');
				$this->Ln();
			}
		}

		// Page footer
		function Footer(){
		    // Desenha a borda do rodapé
		    $this->SetXY(10,-58);
		    $this->Cell(0,25,'',1,0,'C');

		    // Define fonte
		    $this->SetFont('Helvetica','',8);

		    // Unindo os vetores para o loop
		    $footerData = array_merge($this->codigosEmi,$this->tiposDeDocumento);

		    // Definindo parâmetros para a tabela do rodape
		    $nColunas = 4;
		    $wColuna = 45;
		    $hColuna = 5;
		    $xMargin = 12;
		    $hLn = 4;

		    // Começa a escrever no rodapé
		    $this->SetXY(12,-56);
		    $this->SetFont('Helvetica','',8);

		    // O loop
		    foreach ($footerData as $i => $data) {
		    	$this->Cell($wColuna,$hColuna,utf8_decode($data->simbolo.'='.$data->nome),0);
		    	if( ($i+1) % $nColunas == 0){
		    		$this->Ln($hLn);
		    		$this->SetX($xMargin);
		    	}
		    }
		    
		    $this->SetXY(10,-20);
		    $this->Cell(0,5,utf8_decode("Recebi os documentos relacionados:  ______________________________________________  Data :____/____/____"),0,0,'C');
		    $this->SetFont('Helvetica','',6);
		    $this->SetXY(-22,-10);
		    $this->Cell(0,5,utf8_decode('Página ').$this->PageNo().'/{nb}',0);
		}
	}
?>