<div class="ua_container">
	<h3>Últimas Atualizações</h3>
<pre>
<?php
	$output = str_ireplace('locaweb', 'X', str_replace(' -0200','',shell_exec('git log --date=iso8601 -n 100 --pretty=format:"[%h] %ci - %s" 2>&1')));
	$ua = explode("\n", $output);
	
	foreach ($ua as $a) {
		if(strpos($a, "NOVO:")>-1 || strpos($a, "BUGFIX:")>-1){
			echo($a."\n");
		}
	}
?>
</pre>
</div>
