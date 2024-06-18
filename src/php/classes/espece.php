<?php

require_once('database.php');

class Espece extends Database
{
	public function dbGetEspeces()
	{
		$query = 'SELECT * FROM espece';
		return $this->fetchAllRequest($query);
	}
}
