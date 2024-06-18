<?php


require_once('database.php');

class Espece extends Database
{
    public function dbInfoEspece()
    {
        $query = 'SELECT * FROM espece ';
        return $this->fetchRequest($query);
    }
}



?>