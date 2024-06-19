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

	public function dbGetClusters()
	{
		$arbre_data = $this->dbGetArbres();
		$arbre_clustered = [];

		for ($i = 0; $i <= 100; $i++) {
			$arbre_data[$i]['cluster'] = exec("../../.venv/bin/python3 ../../scripts/clusters.py -lon 0 -lat 0");
			array_push($arbre_clustered, $arbre_data[$i]);
		}

		return $arbre_clustered;
	}

	public function dbPredAge($id)
	{
		$arbre_data = $this->dbInfoArbre($id);

		$arbre_data['age_knn'] = exec("../../.venv/bin/python3 ../../scripts/age.py -m knn");
		$arbre_data['age_svm'] = exec("../../.venv/bin/python3 ../../scripts/age.py -m svm");
		$arbre_data['age_rf'] = exec("../../.venv/bin/python3 ../../scripts/age.py -m rf");
		$arbre_data['age_mlp'] = exec("../../.venv/bin/python3 ../../scripts/age.py -m mlp");

		return $arbre_data;
	}

	public function dbPredDeracinnement($id)
	{
		$arbre_data = $this->dbInfoArbre($id);

		$arbre_data['deracinnement_knn'] = exec("../../.venv/bin/python3 ../../scripts/deracinnement.py -m knn");
		$arbre_data['deracinnement_svm'] = exec("../../.venv/bin/python3 ../../scripts/deracinnement.py -m svm");
		$arbre_data['deracinnement_rf'] = exec("../../.venv/bin/python3 ../../scripts/deracinnement.py -m rf");
		$arbre_data['deracinnement_mlp'] = exec("../../.venv/bin/python3 ../../scripts/deracinnement.py -m mlp");

		return $arbre_data;
	}
}
