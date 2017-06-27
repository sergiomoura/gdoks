<?php 
	require 'vendor/autoload.php';
	use Mailgun\Mailgun;

	// First, instantiate the SDK with your API credentials
	$mg = Mailgun::create('key-07bd64f71c14bf52a76c3e5e6d20d6da');

	# Now, compose and send your message.
	$mg->messages()->send('gdoks.com.br', [
		'from'    => 'postmaster@gdoks.com.br', 
		'to'      => 'smouracalmon@gmail.com', 
		'subject' => 'The PHP SDK is awesome!', 
		'text'    => 'It is so simple to send a message.'
	]);
 ?>