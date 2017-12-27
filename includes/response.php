<?php
	class response {
		public $error;
		public $msg;
		public function __construct($error,$msg){
			$this->error = $error;
			$this->msg = $msg;
		}

		public function flush(){
			echo(json_encode($this));
		}
	}