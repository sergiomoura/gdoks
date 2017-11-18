<?php
	include('constantes.php');
	include('vendor/autoload.php');
	function sendEmail($subject, $to, $message, $cc) {
		$from = new SendGrid\Email(SENDGRID_DEFAULT_FROM_NAME, SENDGRID_DEFAULT_FROM);
		$subject = $subject;

		$to = new SendGrid\Email(null, $to);
		$content = new SendGrid\Content("text/html", $message);
		$mail = new SendGrid\Mail($from, $subject, $to, $content);

		foreach ($cc as $value) {
		    $to = new SendGrid\Email(null, $value);
		    $mail->personalization[0]->addCC($to);
		}

		$sg = new \SendGrid(SENDGRID_KEY);

		$response = $sg->client->mail()->send()->post($mail);
		echo $response->statusCode();
	}

	$msg = "Teste de envio de email do gdoks.\n Caracteres especiais: ÁÇÃOÉÓÜ";
	sendEmail('Teste Açunto','smouracalmon@gmail.com',$msg,Array('mariri@gmail.com'));
?>