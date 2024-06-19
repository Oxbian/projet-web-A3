'use strict';

function sendHttpRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    
    if (method === 'POST' || method === 'PUT') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    }
    
    // Définition de la fonction de rappel pour traiter la réponse
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = JSON.parse(xhr.responseText);
                callback(null, response);
            } else {
                callback(xhr.statusText, null); //#TODO responses ?
            }
        }
    };
    
    // Envoi de la requête
    /*if (method === 'POST' || method === 'PUT') {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }*/
        xhr.send(JSON.stringify(data));
}

function httpErrors(errorCode){
  let messages ={
    400: 'Requête incorrecte',
    401: 'Authentifiez vous',
    403: 'Accès refusé',
    404: 'Page non trouvée',
    500: 'Erreur interne du serveur',
    503: 'Service indisponible'
  };

  // Afficher erreur
  if (errorCode in messages){
    $('#errors').html('<i class="fa fa-exclamation-circle"></i> <strong>' +
      messages[errorCode] + '</strong>');
    $('#errors').show();
  }
}
