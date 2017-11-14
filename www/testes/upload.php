<?php
	
	include('vendor/autoload.php');
	use google\appengine\api\cloud_storage\CloudStorageTools;
	$options = ['gs_bucket_name' => 'projeto-gdoks.appspot.com'];
	$upload_url = CloudStorageTools::createUploadUrl('/upload/handler', $options);
	echo($upload_url);
?>