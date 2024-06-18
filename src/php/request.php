<?php

require_once('inc/debug.php');
require_once('inc/data-encode.php');
require_once('inc/utilities.php');

// TODO: importer les classes pour les requêtes

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);

$login = null;

// Vérification de l'utilisateur
if ($requestRessource == '/user/login') {
	$db = new User();
	$username = $_SERVER['PHP_AUTH_USER'];
	$password = $_SERVER['PHP_AUTH_PW'];

	// Vérification des données envoyées
	if (!checkInput(isset($username) && isset($password), 400))
		return;

	// Vérification de l'existence de l'utilisateur
	if ($db->dbCheckUser($username, $password)) {
		// Création du token + ajout dans la BDD
		$token = base64_encode(openssl_random_pseudo_bytes(20));
		$db->dbAddToken($username, $token);
		header('Content-Type: application/json; charset=utf-8');
		header('Cache-control: no-store, no-cache, must-revalidate');
		header('Pragma: no-cache');
		echo ($token);
	} else
		sendError(401);
} else {
	// Vérification de l'utilisateur
	$db = new User(); // Création de l'objet User qui contient les fonctions pour gérer les utilisateurs
	$headers = getallheaders();
	$token = $headers['Authorization'];
	if (preg_match('/Bearer (.*)/', $token, $tab))
		$token = $tab[1];

	if ($token != null) {
		$login = $db->dbVerifyToken($token);
		// Vérification que l'utilisateur existe
		if (!$login)
			$login = null;
	}
}

// Gestion des requêtes utilisateur
if ($requestRessource == "user") {
	$db = new User();
	switch ($requestMethod) {
		case 'GET':
			// Vérífication que l'utilisateur est bien connecté
			if (!checkVariable($login, 401))
				break;

			if (array_shift($request) == 'logout') {
				$data = $db->dbDisconnectUser($login);
				sendJsonData($data, 200);
				break;
			}

		case 'PUT':
			// Vérífication que l'utilisateur est bien connecté
			if (!checkVariable($login, 401))
				break;

			// Récupération des données envoyées
			parse_str(file_get_contents('php://input'), $_PUT);
			if (!checkInput(isset($_PUT['password']), 400))
				break;

			$data = $db->dbUpdatePassword($login, $_PUT['password']);
			sendJsonData($data, 204);
		case 'DELETE':
			// Vérífication que l'utilisateur est bien connecté
			if (!checkVariable($login, 401))
				break;

			// Suppression de l'utilisateur
			$data = $db->dbDeleteUser($login);
			sendJsonData($data, 204);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes arbre
if ($requestRessource == "arbre") {
	$db = new Arbre();
	switch ($requestMethod) {
		case 'GET':
			// Récupération de l'id
			$path = array_shift($request);

			// Vérification des infos à récupérer
			if ($path == 'cluster') {
				// Prédire les clusters
			} elseif ($path == 'pred-age') {
				// Prédire l'âge de l'arbre
			} elseif ($path == 'pred-deracinnement') {
				// Prédire le déracinnement de l'arbre
			} elseif ($path != null && $path != '') {
				$id = $path;
				$data = $db->dbInfoArbre($id);
			} else
				$data = $db->dbGetArbres();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		case 'POST':
			// Vérification qu'on est bien connecté
			if (!checkVariable($login, 401))
				break;

			if (
				isset($_POST['longitude']) && isset($_POST['latitude']) && isset($_POST['haut_tot'])
				&& isset($_POST['haut_tronc']) && isset($_POST['tronc_diam']) && isset($_POST['prec_estim'])
				&& isset($_POST['nbr_diag']) && isset($_POST['remarquable']) && isset($_POST['fk_espece'])
				&& isset($_POST['fk_port']) && isset($_POST['fk_pied']) && isset($_POST['fk_secteur'])
				&& isset($_POST['fk_etat']) && isset($_POST['fk_stadedev']) && isset($_POST['username'])
			) {
				// Vérificatin si l'arbre existe déjà
				if ($db->dbCheckArbre($_POST['longitude'], $_POST['latitude'], $_POST['haut_tot'], $_POST['haut_tronc'], $_POST['tronc_diam'], $_POST['prec_estim'], $_POST['nbr_diag'], $_POST['remarquable'], $_POST['fk_espece'], $_POST['fk_port'], $_POST['fk_pied'], $_POST['fk_secteur'], $_POST['fk_etat'], $_POST['fk_stadedev'], $_POST['username'])) {
					sendError(409);
					break;
				}

				$data = $db->dbAddArbre($_POST['longitude'], $_POST['latitude'], $_POST['haut_tot'], $_POST['haut_tronc'], $_POST['tronc_diam'], $_POST['prec_estim'], $_POST['nbr_diag'], $_POST['remarquable'], $_POST['fk_espece'], $_POST['fk_port'], $_POST['fk_pied'], $_POST['fk_secteur'], $_POST['fk_etat'], $_POST['fk_stadedev'], $_POST['username']);
				sendJsonData($data, 201);
			} else
				sendError(400);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes stade de développement
if ($requestRessource == "stadedev") {
	$db = new Stadedev();
	switch ($requestMethod) {
		case 'GET':
			// Vérification des infos à récupérer
			$data = $db->dbGetStadedevs();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes états de l'arbre
if ($requestRessource == "etat") {
	$db = new Etat();
	switch ($requestMethod) {
		case 'GET':
			// Vérification des infos à récupérer
			$data = $db->dbGetEtats();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes secteurs
if ($requestRessource == "secteur") {
	$db = new Secteur();
	switch ($requestMethod) {
		case 'GET':
			// Vérification des infos à récupérer
			$data = $db->dbGetSecteurs();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes type_pied
if ($requestRessource == "pied") {
	$db = new TypePied();
	switch ($requestMethod) {
		case 'GET':
			// Vérification des infos à récupérer
			$data = $db->dbGettypePieds();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes type_port
if ($requestRessource == "port") {
	$db = new TypePort();
	switch ($requestMethod) {
		case 'GET':
			// Vérification des infos à récupérer
			$data = $db->dbGetTypePorts();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}

// Gestion des requêtes espèces
if ($requestRessource == "espece") {
	$db = new Espece();
	switch ($requestMethod) {
		case 'GET':
			// Vérification des infos à récupérer
			$data = $db->dbGetEspeces();

			// Vérification des infos
			checkData($data, 200, 404);
			break;

		default:
			// Requête non implémentée
			sendError(501);
			break;
	}
}
