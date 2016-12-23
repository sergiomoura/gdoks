<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>GDoks</title>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet" type="text/css" />
	<style type="text/css">
		html, body {
			margin: 0;
			padding: 0;
		}

		body {
			font-family: 'Open Sans', sans-serif;
			background-color: #FCFCFC;
			color: #555;
		}

		.title {
			font-size: 52px;
			margin-bottom: 0;
			display: block;
		}

		.container {
			width: 400px;
			border-radius: 10px;
			left: 50%;
			top: 50px;
			margin-left: -200px;
			position: relative;
			background-color: #F0F0F0;
			text-align: center;
			padding: 20px;
		}


	</style>
</head>
<body>
	<?php
		// Calculando última atualização.
		exec("git log -1 --format=%aI",$ua);
		$ua = str_replace('T', ' ', $ua[0]);
		$ua = str_replace('-03:00', '', $ua);

	?>
	<div class="container">
		<span class="title">GDoks</span>
		<span class="commit">Última Atualização: <?php echo($ua); ?></span>
	</div>
</body>
</html>