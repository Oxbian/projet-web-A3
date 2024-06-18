<?php

require_once('database.php');

class Secteur extends Database
{
	public function dbGetSecteurs()
	{
		$query = 'SELECT * FROM secteur';
		return $this->fetchAllRequest($query);
	}
}
