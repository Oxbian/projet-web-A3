<?php

require_once('database.php');

class Etat extends Database
{
	public function dbGetEtats()
	{
		$query = 'SELECT * FROM etat';
		return $this->fetchAllRequest($query);
	}
}
