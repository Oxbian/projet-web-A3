<?php


require_once('database.php');

class Etat extends Database
{
    public function dbInfoEtat()
    {
        $query = 'SELECT * FROM etat ';
        return $this->fetchRequest($query);
    }
}



?>