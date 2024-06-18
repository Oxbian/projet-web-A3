<?php


require_once('database.php');

class Secteur extends Database
{
    public function dbInfoSecteur()
    {
        $query = 'SELECT * FROM secteur ';
        return $this->fetchRequest($query);
    }
}



?>