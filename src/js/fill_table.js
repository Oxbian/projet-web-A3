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

document.addEventListener('DOMContentLoaded', function () {
    fillTable();
});
