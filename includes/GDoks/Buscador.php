<?php 
	/**
	*  Classe que realiza buscas de documentos na base de dados a partir dos
	*  atributos de $q
	*/
	class Buscador {
		
		private $db;
		private $restrictions;
		private $order = 'data_limite';
		private $colunas = 'a.id,
							a.codigo,
							a.codigo_cliente,
							a.codigo_alternativo,
							a.nome,
							a.idu_checkout,
							a.datahora_do_checkout,
							b.codigo AS subarea_codigo,
							b.id AS subarea_id,
							b.nome AS subarea_nome,
							c.id AS area_id,
							c.codigo AS area_codigo,
							c.nome AS area_nome,
							d.id AS projeto_id,
							d.nome AS projeto_nome,
							e.id AS cliente_id,
							e.nome_fantasia AS cliente_nome,
							f.id AS subdisciplina_id,
							f.nome AS subdisciplina_nome,
							g.id AS disciplina_id,
							g.nome AS disciplina_nome';

		private $tabelas = ' gdoks_documentos a
						   INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
						   INNER JOIN gdoks_areas c ON b.id_area=c.id
						   INNER JOIN gdoks_projetos d ON c.id_projeto=d.id
						   INNER JOIN gdoks_clientes e ON d.id_cliente=e.id
						   INNER JOIN gdoks_subdisciplinas f ON a.id_subdisciplina=f.id
						   INNER JOIN gdoks_disciplinas g ON f.id_disciplina=g.id';

		public function __construct($db){
			$this->db = $db;
		}

		public function busca($q) {
			$sql = $this->buildSqlQuery($q);
			return $this->query($sql);
		}

		public function buscaPaginado($q,$npp) {
			$sql = $this->buildSqlQuery_paginado($q,$npp);
			return $this->query($sql);
		}

		public function nResultados($q){
			$this->buildRestrictions($q);
			$sql = 'SELECT count(*) as n
						FROM
						  (SELECT '.$this->colunas.'
						   FROM '.$this->tabelas.'
						   WHERE
						   		'.$this->restrictions->subarea.'
						   		AND '.$this->restrictions->area.'
						   		AND '.$this->restrictions->subdisciplina.'
						   		AND '.$this->restrictions->disciplina.'
						   		AND '.$this->restrictions->projeto.'
						   		AND '.$this->restrictions->cliente.'
						   		AND ('.$this->restrictions->nome.')
						   ) X
						LEFT JOIN
						  (SELECT DISTINCT
					  		   a.id_revisao,
							   b.id_documento,
							   b.serial,
							   b.data_limite,
							   b.ua,
							   b.progresso_validado,
							   b.progresso_a_validar,
						       !isnull(c.id_grd) as rev_emitida
						FROM
						  (SELECT id_documento,
								  max(id) AS id_revisao
						   FROM gdoks_revisoes
						   GROUP BY id_documento) a
						INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id
						LEFT JOIN gdoks_grds_x_revisoes c on c.id_revisao=a.id_revisao) Y
						   ON X.id=Y.id_documento
						WHERE
							'.$this->restrictions->completude.' AND
							'.$this->restrictions->validacao.' AND
							'.$this->restrictions->emitido;
			return $this->db->query($sql)[0]['n'];
		}

		private function buildSqlQuery($q) {

			// Construindo restrições
			$this->buildRestrictions($q);

			// Construinfo ordem
			$this->buildOrder($q);

			// Montando sql
			$sql = 'SELECT *
					FROM
					  (SELECT '.$this->colunas.'
					   FROM '.$this->tabelas.'
					   WHERE
					   		'.$this->restrictions->subarea.'
					   		AND '.$this->restrictions->area.'
					   		AND '.$this->restrictions->subdisciplina.'
					   		AND '.$this->restrictions->disciplina.'
					   		AND '.$this->restrictions->projeto.'
					   		AND '.$this->restrictions->cliente.'
					   		AND ('.$this->restrictions->nome.')
					   ) X
					LEFT JOIN
					  (SELECT DISTINCT
					  		   a.id_revisao,
							   b.id_documento,
							   b.serial,
							   b.data_limite,
							   b.ua,
							   b.progresso_validado,
							   b.progresso_a_validar,
						       !isnull(c.id_grd) as rev_emitida
						FROM
						  (SELECT id_documento,
								  max(id) AS id_revisao
						   FROM gdoks_revisoes
						   GROUP BY id_documento) a
						INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id
						LEFT JOIN gdoks_grds_x_revisoes c on c.id_revisao=a.id_revisao
						) Y ON X.id=Y.id_documento
					WHERE
						'.$this->restrictions->completude.' AND
						'.$this->restrictions->validacao.' AND
						'.$this->restrictions->emitido.'
					ORDER BY '.$this->order;
			return $sql;
		}

		private function buildSqlQuery_paginado($q,$npp){
			// Determinando a paginação
			$pos_inicial  = ($q->pagAtual-1)*$npp;
			return $this->buildSqlQuery($q).' LIMIT '.$pos_inicial.','.$npp;
		}

		private function buildRestrictions($q){

			// Tratando objeto $q
			$q->nome				= (property_exists($q,'nome')				 && $q->nome			 != 'undefined') ? $q->nome				:null;
			$q->ordem				= (property_exists($q,'ordem')				 && $q->ordem			 != 'undefined') ? $q->ordem			:null;
			$q->id_cliente			= (property_exists($q,'id_cliente')			 && $q->id_cliente		 != 'undefined') ? $q->id_cliente		:null;
			$q->id_projeto			= (property_exists($q,'id_projeto')			 && $q->id_projeto		 != 'undefined') ? $q->id_projeto		:null;
			$q->id_area				= (property_exists($q,'id_area')			 && $q->id_area			 != 'undefined') ? $q->id_area			:null;
			$q->id_subarea			= (property_exists($q,'id_subarea')			 && $q->id_subarea		 != 'undefined') ? $q->id_subarea		:null;
			$q->id_disciplina		= (property_exists($q,'id_disciplina')		 && $q->id_disciplina	 != 'undefined') ? $q->id_disciplina	:null;
			$q->id_subdisciplina	= (property_exists($q,'id_subdisciplina')	 && $q->id_subdisciplina != 'undefined') ? $q->id_subdisciplina	:null;
			$q->validacao			= (property_exists($q,'validacao')			 && $q->validacao		 != 'undefined') ? $q->validacao		:null;
			$q->completude			= (property_exists($q,'completude')			 && $q->completude		 != 'undefined') ? $q->completude		:null;
			$q->pagAtual			= (property_exists($q,'pagAtual')			 && $q->pagAtual		 != 'undefined') ? $q->pagAtual			:null;
			$q->emitido				= (property_exists($q,'emitido')			 && $q->emitido			 != 'undefined') ? $q->emitido			:null;

			// monstando as restricoes no obj restrict
			$restrict = new stdClass();

			// Montando restições sobre se o documento foi emitido ou não
			if ($q->emitido == 0) {
				$restrict->emitido = 'rev_emitida=0';
			} elseif($q->emitido == 1) {
				$restrict->emitido = 'rev_emitida=1';
			} else {
				$restrict->emitido = 'TRUE';
			}

			// Montando restições sobre o documento - - - - - - - - - - -
			if($q->nome == ''){
				$restrict->nome = 'TRUE';
			} else {
				$restrict->nome = 'a.nome like "'.$q->nome.'" OR a.codigo like "'.$q->nome.'" OR codigo_alternativo like "'.$q->nome.'" OR codigo_cliente like "'.$q->nome.'"';
			}
			
			// Restrição de subarea,area,projeto,cliente
			if(!is_null($q->id_subarea)){
				$restrict->cliente  = 'TRUE';
				$restrict->projeto  = 'TRUE';
				$restrict->area 	= 'TRUE';
				$restrict->subarea  = 'b.id='.$q->id_subarea;
			} else {
				if(!is_null($q->id_area)){
					$restrict->cliente = 'TRUE';
					$restrict->projeto = 'TRUE';
					$restrict->area    = 'c.id='.$q->id_area;
					$restrict->subarea = 'TRUE';
				} else { 
					if(!is_null($q->id_projeto)){
						$restrict->cliente = 'TRUE';
						$restrict->projeto = 'd.id='.$q->id_projeto;
						$restrict->area    = 'TRUE';
						$restrict->subarea = 'TRUE';
					} else {
						if(!is_null($q->id_cliente)){
							$restrict->cliente = 'e.id='.$q->id_cliente;
							$restrict->projeto = 'TRUE';
							$restrict->area    = 'TRUE';
							$restrict->subarea = 'TRUE';
						} else {
							$restrict->cliente = 'TRUE';
							$restrict->projeto = 'TRUE';
							$restrict->area    = 'TRUE';
							$restrict->subarea = 'TRUE';
						}		
					}
				}
			}

			// restricao de subdisciplina e disciplina
			if(!is_null($q->id_subdisciplina)){
				$restrict->disciplina    = 'TRUE';
				$restrict->subdisciplina = 'f.id='.$q->id_subdisciplina;
			} else {
				if(!is_null($q->id_disciplina)){
					$restrict->disciplina    = 'g.id='.$q->id_disciplina;
					$restrict->subdisciplina = 'TRUE';
				} else {
					$restrict->disciplina    = 'TRUE';
					$restrict->subdisciplina = 'TRUE';
				}
			}

			// Montando restrições sobre a completude
			if($q->completude == '1'){
				$restrict->completude = 'progresso_validado<100';
			} elseif($q->completude == '2'){
				$restrict->completude = 'progresso_validado=100';
			} else {
				$restrict->completude = 'TRUE';
			}

			// Montando restrições sobre a validacao
			if($q->validacao == '1'){
				$restrict->validacao = 'progresso_a_validar>0';
			} elseif($q->validacao == '2'){
				$restrict->validacao = 'progresso_a_validar=0 AND progresso_validado>0';
			} else {
				$restrict->validacao = 'true';
			}

			// Salvando a restrição no atributo restrictions
			$this->restrictions = $restrict;
		}

		private function buildOrder($q){
			if($q->ordem == 'nome'){
				$this->order = 'nome';
			} else {
				$this->order = 'data_limite';
			}
		}

		private function query($sql){
			$rs = $this->db->query($sql);
			return array_map(function($a){return (object)$a;}, $rs);
		}
	}