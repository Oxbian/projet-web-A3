<?php

require_once('database.php');


class Arbre extends Database
{
    public function dbInfoArbre($id)
    {
        $query = 'SELECT * FROM arbre WHERE id = :id ';
        $params = array(
            'id' => $id
        );
        return $this->fetchRequest($query, $params);
    }

    public function dbGetArbres()
    {
        $query = 'SELECT * FROM arbre ';
        return $this->fetchRequest($query);
    }

    public function dbAddArbre($longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $prec_estim, $nbr_diag, $remarquable, $fk_espece, $fk_port, $fk_pied, $fk_secteur, $fk_etat, $fk_stadedev, $username)
    {
        $query = '  INSERT INTO arbre (longitude, latitude, haut_tot, haut_tronc, tronc_diam, prec_estim, nbr_diag, remarquable, date_ajout, fk_espece, fk_port, fk_pied, fk_secteur, fk_etat, fk_stadedev, username) VALUES (:longitude, :latitude, :haut_tot, :haut_tronc, :tronc_diam, :prec_estim, :nbr_diag, :remarquable, NOW(),:fk_espece, :fk_port, :fk_pied, :fk_secteur, :fk_etat, :fk_stadedev, :username)';
     $params = array(
            'longitude' => $longitude,
            'latitude'=> $latitude,
            'haut_tot'=> $haut_tot,
            'haut_tronc'=>$haut_tronc,
            'tronc_diam'=>$tronc_diam,
            'prec_estim'=>$prec_estim,
            'nbr_estim'=>$nbr_diag,
            'remarquable'=> $remarquable,
            'fk_espece'=> $fk_espece,
            'fk_port'=> $fk_port, 
            'fk_pied'=>$fk_pied,
            'fk_secteur'=> $fk_secteur,
            'fk_etat'=> $fk_etat,
            'fk_stadedev'=> $fk_stadedev,
            'username'=> $username
        );  
        return $this->fetchRequest($query, $params);

    }


}



#dbinfo arbre -  id
#dbgetarbres -> tout les arbres
#dbaddarbre -> ajouter un arbre
#db check arbre envoie tout les paramètre et verifie qu'il est pas double 
?>