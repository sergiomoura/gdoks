<?php 

	require '../../includes/vendor/autoload.php';
	
	/* MAILGUN TEST *
	use Mailgun\Mailgun;	
	// First, instantiate the SDK with your API credentials
	$mg = Mailgun::create('key-07bd64f71c14bf52a76c3e5e6d20d6da');

	# Now, compose and send your message.
	$mg->messages()->send('gdoks.com.br', [
		'from'    => 'GDoks <postmaster@gdoks.com.br>', 
		'to'      => 'Sérgio <smouracalmon@gmail.com>, Moura <sergio.moura@twtec.com.br>', 
		'subject' => 'The PHP SDK is awesome!', 
		'text'    => 'It is so simple to send a message.'
	]);
	*/

	/* SEND GRID TEST */
	$sendgrid = new SendGrid(getenv('SENDGRID_USERNAME'), getenv('SENDGRID_PASSWORD'));
	$email    = new SendGrid\Email();

	$email->addTo("Sérgio <smouracalmon@gmail.com>")
	->setFrom("GDóks <postmaster@gdoks.com.br>")
	->setSubject("Sending with SendGrid is Fun")
	->setHtml("and easy to do anywhere, even with PHP");

	$sendgrid->send($email);
 ?>