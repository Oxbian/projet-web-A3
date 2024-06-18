<?php


require_once('database.php');

class TypePort extends Database
{
    public function dbInfoTypePort()
    {
        $query = 'SELECT * FROM type_port ';
        return $this->fetchRequest($query);
    }
}



?>