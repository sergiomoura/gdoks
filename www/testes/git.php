<?php 
require_once('../../includes/Git/Git.php');
$repo = Git::open('C:\Users\sergiomoura\Workspace\gdoks');
echo($repo->log());

?>