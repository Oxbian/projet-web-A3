<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux espèces
 */
class Espece extends Database
{

	/**
	 * Fonction pour récupérer l'ensemble des espèces
	 *
	 * @return Array Array contenant toutes les espèces
	 */
	public function dbGetEspeces()
	{
		$query = 'SELECT * FROM espece';
		return $this->fetchAllRequest($query);
	}
}
