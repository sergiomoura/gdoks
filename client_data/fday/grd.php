<?php
	class PDFGrd extends xPDF {
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
				{"titulo":"Tipo","width":10},
				{"titulo":"Qtd. Vias","width":15},
				{"titulo":"Revisão","width":15},
				{"titulo":"Cód. EMI","width":15},
				{"titulo":"Nº Fls","width":15},
				{"titulo":"Título","width":55}
			]');
			$this->addContent();
		}

		// Page header
		function Header(){
		    // Logo
		    $this->Image(CLIENT_DATA_PATH.$this->empresa.'/logo.jpg',10,10,45);

		    // Título
		    $this->SetFont('helvetica','B',16);
		    $this->setXY(60,11);
		    $this->Cell(0,12,'GUIA DE REMESSA DE DOCUMENTOS - GRD',1,0,'C');
		    $this->Ln(20);

		    // Mudando tamanho da font
		    $this->SetFont('Helvetica','B',9);

		    // Escrevendo os Cabeçalho da GRD
		    $this->Cell(125,5,utf8_decode('Cliente: '.$this->grd->cliente_nome),0);
		    $this->Cell(65,5,utf8_decode('GRD Nº: '.$this->grd->codigo),0);
		    $this->Ln(5);
		    $this->Cell(125,5,utf8_decode('Resp. Envio: '.$this->resp_envio),0);

		    // Determinando a string de datahora do envio
		    $dh_registro = new DateTime($this->grd->datahora_registro);

		    $this->Cell(65,5,utf8_decode('Registrada em: '.$dh_registro->format('d/m/Y à\s h:i')),0);
		    $this->Ln(5);
		    $this->Cell(125,5,utf8_decode('Projeto: '.$this->grd->projeto_nome),0);
		    $this->Cell(65,5,utf8_decode('Destinatário: '.$this->grd->cliente_contato_nome),0);
		    $this->Ln(5);
		    if($this->grd->cliente_endereco != '' && !is_null($this->grd->cliente_endereco)){
		    	$this->Cell(0,5,utf8_decode('Endereço: ' . $this->grd->cliente_endereco),0);$this->Ln();
			}
			if($this->grd->obs != '' && !is_null($this->grd->obs)){
		    	$this->Cell(0,5,utf8_decode('Observações: '.$this->grd->obs),0);$this->Ln();
			}
		    
		    $this->Ln(5);

		    // Imprimindo Primeira linha (títulos)
			for ($i=0; $i < sizeof($this->titles); $i++) { 
				 $this->Cell($this->titles[$i]->width,10,utf8_decode($this->titles[$i]->titulo),1,0,'C');
			}
			$this->Ln();
		}

		function addContent(){
			$this->AddPage();
			$this->SetFont('Helvetica','',8);
			$this->SetAutoPageBreak(true,60);

			$this->SetWidths(Array(
				$this->titles[0]->width,
				$this->titles[1]->width,
				$this->titles[2]->width,
				$this->titles[3]->width,
				$this->titles[4]->width,
				$this->titles[5]->width,
				$this->titles[6]->width,
				$this->titles[7]->width
			));

			$this->SetAligns(Array('C','L','C','C','C','C','C','L'));

			for ($i=0; $i < sizeof($this->grd->documentos); $i++) { 
			 	$doc = 	$this->grd->documentos[$i];
				$data = Array(
					($i+1),
					utf8_decode($doc->doc_codigo),
					utf8_decode($doc->tipo		),
					utf8_decode($doc->nVias 	),
					utf8_decode($doc->rev_serial),
					utf8_decode($doc->codEMI	),
					utf8_decode($doc->nFolhas 	),
					utf8_decode($doc->doc_nome	)
				);
				$this->row($data);
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