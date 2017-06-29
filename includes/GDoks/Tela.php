<?php 
	class Tela {
		private $_id,
				$_titulo,
				$_descricao,
				$_icone,
				$_href,
				$_id_usuario,
				$db;

		public function __construct($db){
			$this->db = $db;
		}

		public static function CreateById(int $id_tela,int $id_usuario, mysqli $db){

			// verificando se usuário tem acesso a tela
			$sql = 'SELECT count(*) AS ok
					FROM gdoks_usuarios_x_telas
					WHERE id_usuario=?
					  AND id_tela=?';
			$ok = $db->query($sql,'ii',$id_usuario,$id_tela)[0]['ok']==1;

			if($ok){
				// Usuário tem acesso a tela
				// Carregando dados da tela
				$sql = 'SELECT id,titulo,descricao,endereco,href,icone FROM gdoks_telas WHERE id=?';
				$rs = $db->query($sql,'i',$id_tela)[0];

				// populando atributos locais
				$instance = new self($db);
				$instance->_id = $rs['id'];
				$instance->_titulo = $rs['titulo'];
				$instance->_descricao = $rs['descricao'];
				$instance->_icone = $rs['icone'];
				$instance->_endereco = $rs['endereco'];
				$instance->_href = $rs['href'];
				$instance->_id_usuario = $id_usuario;
				$instance->_id = $rs['id'];

				// retornando instancia
				return $instance;
			}
		}

		public function getId(){
			return $this->_id;
		}

		public function getTitulo(){
			return $this->_titulo;
		}

		public function getDescricao(){
			return $this->_descricao;
		}

		public function getIcone(){
			return $this->_icone;
		}

		public function getHref(){
			return $this->_href;
		}
	}