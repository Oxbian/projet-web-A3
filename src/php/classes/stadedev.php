<?php


require_once('database.php');

class StadeDev extends Database
{
    public function dbInfoStadeDev()
    {
        $query = 'SELECT * FROM stadedev ';
        return $this->fetchRequest($query);
    }
}



?>