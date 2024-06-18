<?php

require_once('database.php');

class StadeDev extends Database
{
	public function dbGetStadeDevs()
	{
		$query = 'SELECT * FROM stadedev';
		return $this->fetchAllRequest($query);
	}
}
