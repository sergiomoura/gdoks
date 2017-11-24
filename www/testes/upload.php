<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<pre>
	<?php
		
		include('vendor/autoload.php');
		use google\appengine\api\cloud_storage\CloudStorageTools;
		//echo(CloudStorageTools::getPublicUrl('gs://gdoks-bucket/uploads/GDoks.mwb', true));
		
		
		$options = ['gs_bucket_name' => 'gdoks-bucket'];
		$upload_url = CloudStorageTools::createUploadUrl('/index.php', $options);
		die($upload_url);


		/*
		use Google\Cloud\Storage\StorageClient;

		$config = [
			'projectId' => 'projeto-gdoks',      
			'keyFilePath' => '/credentials/credentials.json'
		];

		$storage = new StorageClient($config);
		$bucket = $storage->bucket('projeto-gdoks.appspot.com');
		if ($bucket->exists()) {
			echo 'Bucket exists!';
		}
		*/	
	?>
	</pre>

	<form action="<?php echo($upload_url) ?>" enctype="multipart/form-data" method="post">
		Files to upload: <br>
		<input type="file" name="uploaded_files" size="40">
		<input type="submit" value="Send">
	</form>
</body>
</html>