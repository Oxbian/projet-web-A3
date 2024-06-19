<?php

require_once('database.php');

class TypePied extends Database
{
	public function dbGetTypePieds()
	{
		$query = 'SELECT * FROM type_pied';
		return $this->fetchAllRequest($query);
	}
}
