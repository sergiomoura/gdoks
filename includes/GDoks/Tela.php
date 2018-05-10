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

				// retornando instancia
				return $instance;
			} else {
				throw new Exception("Usuário não tem acesso a tela", 1);
			}
		}

		public static function CreateByUrl(string $url_tela,int $id_usuario, mysqli $db){

			// Tratando url de tela para testar na query
			$url_tela = str_replace('/www','', $url_tela);

			// Verificando se existe uma tela com a url passada
			$sql = 'SELECT
						a.id,
						a.titulo,
						a.descricao,
						a.icone,
						a.endereco,
						a.href
					FROM gdoks_telas a
					WHERE a.endereco=?';
			$rs = $db->query($sql,'s',$url_tela);
			if(sizeof($rs) == 0){
				throw new Exception("Erro: Tela inexistente", 1);
				exit();
			}

			// Verificando se usuário tem acesso a tela
			$sql = 'SELECT
						count(*) as n
					FROM
						gdoks_usuarios_x_telas b
					WHERE
						b.id_tela=?	AND b.id_usuario=?';
			$rs_aux = $db->query($sql,'ii',$rs[0]['id'],$id_usuario);
			if($rs_aux[0]['n'] == 0){
				throw new Exception("Erro: Usuário não tem acesso a esta tela.", 1);
				exit();
			}
			
			// Usuário tem acesso a tela
			// populando atributos locais
			$instance = new self($db);
			$instance->_id = $rs[0]['id'];
			$instance->_titulo = $rs[0]['titulo'];
			$instance->_descricao = $rs[0]['descricao'];
			$instance->_icone = $rs[0]['icone'];
			$instance->_endereco = $rs[0]['endereco'];
			$instance->_href = $rs[0]['href'];
			$instance->_id_usuario = $id_usuario;

			// retornando instancia
			return $instance;
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

		public function getOpcoes(){
			$sql = 'SELECT abreviacao,
					       ifnull(valor,0) as valor
					FROM
					  (SELECT id,
					          abreviacao
					   FROM gdoks_opcoes_de_telas
					   WHERE id_tela=?) X
					LEFT JOIN
					  (SELECT id_opcao,
					          valor
					   FROM gdoks_usuarios_x_opcoes_de_tela
					   WHERE id_usuario=?) Y ON X.id=Y.id_opcao';
			$rs = $this->db->query($sql,'ii',$this->_id,$this->_id_usuario);
			$result = Array();
			foreach ($rs as $opcao) {
				$result[$opcao['abreviacao']]=$opcao['valor'];
			}
			return $result;
		}
	}