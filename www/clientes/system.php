<?php
	if(array_key_exists('login',$_POST) && array_key_exists('senha',$_POST)):
		# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		# POST DE LOGIN ENVIADO. FAZENDO LOGIN :::::::::::::::::::::::::::::
		# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

		// Includes
		include('constantes.php');
		include(CLIENT_DATA_PATH.CODIGO_EMPRESA.'/dbkey.php');
		include('db.php');

		// Conectando a base de dados
		$db = new DB($dbkey);

		// Testando login
		$sql = 'SELECT id
				FROM gdoks_clientes
				WHERE login=?
				  AND cast(aes_decrypt(senha,unhex(sha2("'.AES_KEY.'",512))) AS char(50)) = ?';
		$rs = $db->query($sql,'ss',$_POST['login'],$_POST['senha']);
		if(sizeof($rs) == 0){
			# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			# TELA LIMPA DE LOGIN COM ERRO 1. ::::::::::::::::::::::::::::::::::
			# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			$err = 1;
			include('comum/login.php');
		} else {
			# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			# LOGIN COM SUCESSO! :::::::::::::::::::::::::::::::::::::::::::::::
			# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			// Criando o token
			$token = uniqid('',true);

			// Gravando o token na base
			$sql = 'UPDATE gdoks_clientes set token=?,validade_do_token="'.Date('Y-m-d H:i:s',time()+TOKEN_DURARION).'" where id=?';
			$db->query($sql,'si',$token,$rs[0]['id']);

			// Levantando dados do cliente e da empresa 
			$sql = 'SELECT a.id,
					       a.cpf,
					       a.cnpj,
					       a.nome,
					       a.nome_fantasia,
					       b.nome AS nome_empresa,
					       b.codigo AS codigo_empresa
					FROM gdoks_clientes a
					INNER JOIN gdoks_empresas b ON a.id_empresa=b.id
					WHERE a.token=?';
			$cliente = (object)(($db->query($sql,'s',$token))[0]);
			
			// Mandando o cookie do token e do cliente
			setcookie('token',$token,0,'/');
			setcookie('cliente',json_encode($cliente),0,'/');

			// Mandando o browser recarregar a página
			header("Refresh:0");
		}
	elseif(array_key_exists('token', $_COOKIE)):
		# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		# LOGIN EFETUADO COM SUCESSO! ::::::::::::::::::::::::::::::::::::::
		# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		include('comum/AreaDoCliente.php');
		die();
	else:
		# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		# TELA LIMPA DE LOGIN SEM ERRO. ::::::::::::::::::::::::::::::::::::
		# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		// Tela de login limpa sem erro
		$err = 0;
		include('comum/login.php');
	endif;