'use strict';

function sendHttpRequest(method, url, data, callback) {
	let xhr = new XMLHttpRequest();

	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	// xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('token'));


	// Définition de la fonction de rappel pour traiter la réponse
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				const response = JSON.parse(xhr.responseText);
				callback(null, response);
			} else {
				callback(xhr.statusText, null);
			}
		}
	};

	// Envoi de la requête
	xhr.send(data);
}

function httpErrors(errorCode) {
	let messages = {
		400: 'Requête incorrecte',
		401: 'Authentifiez vous',
		403: 'Accès refusé',
		404: 'Page non trouvée',
		500: 'Erreur interne du serveur',
		503: 'Service indisponible'
	};

	// Afficher erreur
	if (errorCode in messages) {
		$('#errors').html('<i class="fa fa-exclamation-circle"></i> <strong>' +
			messages[errorCode] + '</strong>');
		$('#errors').show();
	}
}
