<?php 
	
	class A {
		private $id,$url;
		public function __construct() {
		}

		public static function getByURL($url){
			$instance = new self();
			$instance->setURL($url);
			return $instance;
		}

		public static function getByID($id){
			$instance = new self();
			$instance->setID($id);
			return $instance;
		}

		private function setID($id){
			$this->id=$id;
		}

		private function setURL($url){
			$this->url=$url;
		}

		public function print(){
			echo('<pre>');
			echo("id: $this->id\n");
			echo("url: $this->url\n");
			echo('</pre>');
		}
	}

	$a = A::getByURL("lkjlakdjsalsjdk");
	$b = A::getByID(1);

	$a->print();
	$b->print();
?>