<?php

require_once('database.php');

class TypePort extends Database
{
	public function dbGetTypePorts()
	{
		$query = 'SELECT * FROM type_port';
		return $this->fetchAllRequest($query);
	}
}
