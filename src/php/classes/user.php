<?php

require_once('database.php');

class User extends Database
{

    public function dbCheckUser($username , $_password) 
    {
        $password = hash('sha256', $_password);
        $query = 'SELECT * FROM user WHERE username = :username AND password = :password';
        $params = array(
                        'username' => $username,
                        'password' => $password
                        );
    return $this->fetchRequest($query, $params);
    }


    public function dbCreateUser($username, $_password)
    {
      $password = hash('sha256', $_password);
      $query = 'INSERT INTO user (username, password) VALUES (:username,:password)';
      $params = array(
        'username' => $username,
        'password' => $password
      );
      return $this->fetchRequest($query, $params);
    }
  

    public function dbDeleteUser($username)
    {
      $query = 'DELETE FROM user WHERE username = :username';
      $params = array(
        'username' => $username
      );
      return $this->fetchRequest($query, $params);
    }

    public function dbUpdateUser($username, $_password)
    {
      $password = hash('sha256', $_password);
      $query = 'UPDATE user SET username = :username , password = :password WHERE username = :username';
      $params = array(
        'username' => $username,
        'password' => $password
      );
      return $this->fetchRequest($query, $params);
    }


 public function dbInfoUser($username)
  {
    $query = 'SELECT * FROM user WHERE username = :username';
    $params = array(
      'username' => $username
    );
    return $this->fetchRequest($query, $params);
  }

  
  public function dbAddToken($username, $token)
  {
    $query = 'UPDATE user SET token = :token WHERE username = :username';
    $params = array(
      'username' => $username,
      'token' => $token
    );
    return $this->fetchRequest($query, $params);
  }

  
  public function dbVerifyToken($token)
  {
    $query = 'SELECT * FROM user WHERE token = :token';
    $params = array(
      'token' => $token
    );
    $result = $this->fetchRequest($query, $params);
    if (!$result) {
      return false;
    }
    return $result['username'];
  }
}


?>