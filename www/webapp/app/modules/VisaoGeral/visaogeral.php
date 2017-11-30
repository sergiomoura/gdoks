<div class="visaogeral_container">
	<h3>Últimas Atualizações</h3>
<pre>
<?php
	echo(str_ireplace('locaweb', 'X', str_replace(' -0200','',shell_exec('git log --date=iso8601 -n 100 --pretty=format:"[%h] %ci - %s" 2>&1')))); ?>
</pre>
</div>
