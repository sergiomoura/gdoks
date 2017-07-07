<?php
	class Crypter {
		
		// Constantes internas
		private const CIPHER = 'aes-256-cbc';
		private const KEY = 'f51f87c023808d12413b037333543866d853aa55f76c779b7330eabab15b8b4c';

		public static function crypt($data){
			// Definindo vetor de inicialização
			$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length(Crypter::CIPHER));

			// Criptografando dados
			$encrypted = openssl_encrypt($data, Crypter::CIPHER, hex2bin(Crypter::KEY), 0, $iv);

			// Pondo o veto de inicialização na rabeira do resultado
			$encrypted = $encrypted . ':' . base64_encode($iv);

			// Retornando...
			return $encrypted;
		}

		public static function decrypt($encrypted){
			// recuperando a parte encriptada e o iv
			$parts = explode(':',$encrypted);
			if(sizeof($parts)!=2){
				return false;
			} else {
				return @openssl_decrypt($parts[0], Crypter::CIPHER, hex2bin(Crypter::KEY), 0, base64_decode($parts[1]));
			}
		}
	}
?>