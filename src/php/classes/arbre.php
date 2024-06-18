<?php

require_once('database.php');


class Arbre extends Database
{
	public function dbInfoArbre($id)
	{
		$query = 'SELECT * FROM arbre WHERE id = :id';
		$params = array(
			'id' => $id
		);
		return $this->fetchRequest($query, $params);
	}

	public function dbGetArbres()
	{
		$query = 'SELECT * FROM arbre';
		return $this->fetchAllRequest($query);
	}

	public function dbAddArbre($longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $prec_estim, $nbr_diag, $remarquable, $fk_espece, $fk_port, $fk_pied, $fk_secteur, $fk_etat, $fk_stadedev, $username)
	{
		$query = 'INSERT INTO arbre (longitude, latitude, haut_tot, haut_tronc, tronc_diam, prec_estim, nbr_diag, remarquable, date_ajout, fk_espece, fk_port, fk_pied, fk_secteur, fk_etat, fk_stadedev, username) VALUES (:longitude, :latitude, :haut_tot, :haut_tronc, :tronc_diam, :prec_estim, :nbr_diag, :remarquable, NOW(), :fk_espece, :fk_port, :fk_pied, :fk_secteur, :fk_etat, :fk_stadedev, :username)';
		$params = array(
			'longitude' => $longitude,
			'latitude' => $latitude,
			'haut_tot' => $haut_tot,
			'haut_tronc' => $haut_tronc,
			'tronc_diam' => $tronc_diam,
			'prec_estim' => $prec_estim,
			'nbr_estim' => $nbr_diag,
			'remarquable' => $remarquable,
			'fk_espece' => $fk_espece,
			'fk_port' => $fk_port,
			'fk_pied' => $fk_pied,
			'fk_secteur' => $fk_secteur,
			'fk_etat' => $fk_etat,
			'fk_stadedev' => $fk_stadedev,
			'username' => $username
		);
		return $this->fetchRequest($query, $params);
	}

	public function dbCheckArbre($longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $prec_estim, $nbr_diag, $remarquable, $fk_espece, $fk_port, $fk_pied, $fk_secteur, $fk_etat, $fk_stadedev, $username)
	{
		if (strtoupper($remarquable) == "OUI")
			$remarquable = 1;
		else
			$remarquable = 0;

		$query = 'SELECT * FROM arbre WHERE longitude = :longitude, latitude = :latitude, haut_tot = :haut_tot, haut_tronc = :haut_tronc, tronc_diam = :tronc_diam, prec_estim = :prec_estim, nbr_diag = :nbr_diag, remarquable = :remarquable, fk_espece = :fk_espece, fk_port = :fk_port, fk_pied = :fk_pied, fk_secteur = :fk_secteur, fk_etat = :fk_etat, fk_stadedev = :fk_stadedev, username = :username)';
		$params = array(
			'longitude' => $longitude,
			'latitude' => $latitude,
			'haut_tot' => $haut_tot,
			'haut_tronc' => $haut_tronc,
			'tronc_diam' => $tronc_diam,
			'prec_estim' => $prec_estim,
			'nbr_estim' => $nbr_diag,
			'remarquable' => $remarquable,
			'fk_espece' => $fk_espece,
			'fk_port' => $fk_port,
			'fk_pied' => $fk_pied,
			'fk_secteur' => $fk_secteur,
			'fk_etat' => $fk_etat,
			'fk_stadedev' => $fk_stadedev,
			'username' => $username
		);
		return $this->fetchRequest($query, $params);
	}
}