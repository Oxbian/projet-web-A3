'use strict';

function fillTable() {

    // Requête HTTP pour récupérer les données des arbres
    sendHttpRequest('GET', '../php/request.php/arbre', null, function (error, data) {
        if (error) {
            console.error('Erreur lors de la récupération des données:', error);
        } else {
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''; // Vider le tableau existant

            data.forEach(function (arbre) {
                // Créer une nouvelle ligne de tableau
                const newRow = document.createElement('tr');

                // Ajouter les cellules à la ligne

                newRow.appendChild(createHeaderCell(arbre.id));
                newRow.appendChild(createCell(arbre.fk_espece));
                newRow.appendChild(createCell(arbre.haut_tot));
                newRow.appendChild(createCell(arbre.haut_tronc));
                newRow.appendChild(createCell(arbre.tronc_diam));
                newRow.appendChild(createCell(arbre.latitude));
                newRow.appendChild(createCell(arbre.longitude));
                newRow.appendChild(createCell(arbre.fk_etat));
                newRow.appendChild(createCell(arbre.fk_stadedev));
                newRow.appendChild(createCell(arbre.fk_port));
                newRow.appendChild(createCell(arbre.fk_pied));
                newRow.appendChild(createPredictionCell(arbre.id));

                // Ajouter la ligne au corps du tableau
                tableBody.appendChild(newRow);
            });
        }
    });
}

function createCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

function createHeaderCell(text) {
    const cell = document.createElement('th');
    cell.textContent = text;
    cell.setAttribute('scope', 'row');
    return cell;
}

function createPredictionCell(id) {
    const cell = document.createElement('td');
    const radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('id', `pred_${id}`);
    radioInput.setAttribute('name', 'pred');
    radioInput.setAttribute('value', id);

    cell.appendChild(radioInput);
    return cell;
}

function getPrediction(id) {
    const predAgeRequest = new Promise((resolve, reject) => {
        sendHttpRequest('GET', `../php/request.php/arbre/pred-age/${id}`, null, function (error, data) {
            if (error) {
                reject('Erreur lors de la récupération de la prédiction de l\'âge:', error);
            } else {
                console.log(data)
                localStorage.setItem('predictionAge', JSON.stringify(data));
                resolve();
            }
        });
    });

    const predRiskRequest = new Promise((resolve, reject) => {
        sendHttpRequest('GET', `../php/request.php/arbre/pred-deracinnement/${id}`, null, function (error, data) {
            if (error) {
                reject('Erreur lors de la récupération de la prédiction du risque de déracinement:', error);
            } else {
                localStorage.setItem('predictionRisk', JSON.stringify(data));
                resolve();
            }
        });
    });

    Promise.all([predAgeRequest, predRiskRequest])
        .then(() => {
            window.location.href = '../html/fonc5_pred_age.html';
        })
        .catch(error => {
            console.error(error);
        });
}



document.addEventListener('DOMContentLoaded', function () {
    fillTable();
    const btnOne = document.querySelector('.btn-one');

    btnOne.addEventListener('click', function () {
        const selectedRadio = document.querySelector('input[name="pred"]:checked');

        if (selectedRadio) {
            const id = selectedRadio.value;
            getPrediction(id);
        } else {
            alert('Veuillez sélectionner un arbre pour la prédiction.');
        }
    });

});
