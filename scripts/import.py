#!/usr/bin/python

import mysql.connector
import sys

def executeRequest(request, value):
    """Fonction pour executer une requête SQL"""
    try:
        if type(value) is list:
            cursor.executemany(request, value)
        else:
            cursor.execute(request, value)
    except mysql.connector.Error as e:
        print(f"Erreur: {e}")

# Connexion a la BDD
try:
  conn = mysql.connector.connect(
    user="",
    password="projetweb",
    host="localhost",
    port=3306,
    database="projet_web"
  )
except mysql.connector.Error as e:
    print(f"Erreur lors de la connexion à MariaDB: {e}")
    sys.exit(1)

# Ajout d'elements dans la BDD
cursor = conn.cursor()

