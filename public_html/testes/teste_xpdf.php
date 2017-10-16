<?php 
	// Incluindo classe FPdf
	include('../../includes/FPDF/fpdf.php');
	include('../../includes/FPDF/xfpdf.php');
	set_include_path('../../includes/FPDF/fonts/');

	$pdf = new xPDF();
	$pdf->AddPage();
	$pdf->SetFont('helvetica','B',10);
	$pdf->setXY(10,10);

	// Definindo dados a serem impressos;
	$linha1 = Array('Teste de uma linha longa', 'Teste de uma linha muito mais longa que a primeira', 'cutinha');
	$linha2 = Array('Teste de uma linha muito mais longa que a primeira', 'Teste de uma linha longa', 'cutinha');
	$linha3 = Array('cutinha', 'Teste de uma linha longa', 'Teste de uma linha muito mais longa que a primeira');

	$pdf->setWidths(Array(20,30,20,30,60));

	$pdf->Row($linha1);
	$pdf->Row($linha2);
	$pdf->Row($linha3);


	// Enviando headers
header('HTTP/1.0 200 OK');
header('Cache-Control: public, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Content-type: application/pdf');
header('Content-Disposition: attachment; filename="teste.pdf"');
header('Accept-Ranges: bytes');
header("Content-Transfer-Encoding: binary");
///// output the file first clean mem
ob_clean();
$pdf->Output('I','teste.pdf');
exit();
?>