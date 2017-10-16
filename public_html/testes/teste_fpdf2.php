<?php
	require('../../includes/FPDF/fpdf.php');
	set_include_path('../../includes/FPDF/fonts/');
	
	class xPDF extends FPDF {

		var $widths;
		var $aligns;

		function SetWidths($w)
		{
		//Set the array of column widths
		$this->widths=$w;
		}

		function SetAligns($a)
		{
		//Set the array of column alignments
		$this->aligns=$a;
		}

		function Row($data)
		{
		//Calculate the height of the row
		$nb=0;
		for($i=0;$i< count($data);$i++)
		$nb=max($nb,$this->NbLines($this->widths[$i],$data[$i]));
		$h=5*$nb;
		//Issue a page break first if needed
		$this->CheckPageBreak($h);
		//Draw the cells of the row
		for($i=0;$i< count($data);$i++)
		{
		$w=$this->widths[$i];
		$a=isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
		//Save the current position
		$x=$this->GetX();
		$y=$this->GetY();
		//Draw the border
		$this->Rect($x,$y,$w,$h);
		//Print the text
		$this->MultiCell($w,5,$data[$i],0,$a);
		//Put the position to the right of the cell
		$this->SetXY($x+$w,$y);
		}
		//Go to the next line
		$this->Ln($h);
		}

		function CheckPageBreak($h)
		{
		//If the height h would cause an overflow, add a new page immediately
		if($this->GetY()+$h>$this->PageBreakTrigger)
		$this->AddPage($this->CurOrientation);
		}

		function NbLines($w,$txt)
		{
		//Computes the number of lines a MultiCell of width w will take
		$cw=&$this->CurrentFont['cw'];
		if($w==0)
		$w=$this->w-$this->rMargin-$this->x;
		$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
		$s=str_replace("\r",'',$txt);
		$nb=strlen($s);
		if($nb>0 and $s[$nb-1]=="\n")
		$nb--;
		$sep=-1;
		$i=0;
		$j=0;
		$l=0;
		$nl=1;
		while($i<$nb)
		{
		$c=$s[$i];
		if($c=="\n")
		{
		$i++;
		$sep=-1;
		$j=$i;
		$l=0;
		$nl++;
		continue;
		}
		if($c==' ')
		$sep=$i;
		$l+=$cw[$c];
		if($l>$wmax)
		{
		if($sep==-1)
		{
		if($i==$j)
		$i++;
		}
		else
		$i=$sep+1;
		$sep=-1;
		$j=$i;
		$l=0;
		$nl++;
		}
		else
		$i++;
		}
		return $nl;
		}
	}
/*
	$pdf=new xPDF();
	$pdf->AddPage();
	$pdf->SetFont('Arial','',14);
	//Table with 20 rows and 4 columns
	$pdf->SetWidths(array(10,30,20,20));//CADA VALOR DESTE ARRAY SERÁ A LARGURA DE CADA COLUNA
	srand(microtime()*1000000);
	for($i=0;$i<20;$i++){
		$pdf->Row(array(rand(1000,100000000),rand(1000,100000000),rand(1000,100000000),rand(1000,100000000)));
	}
	$pdf->Output();
*/
?>
