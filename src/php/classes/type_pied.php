<?php


require_once('database.php');

class TypePied extends Database
{
    public function dbInfoTypePied()
    {
        $query = 'SELECT * FROM type_pied ';
        return $this->fetchRequest($query);
    }
}



?>