'use strict';

document.addEventListener('DOMContentLoaded', function() {
    sendHttpRequest('GET', '../php/request.php/arbre', null, function(error, data) {
        if (error) {
            //#TODO responses 
            console.error('Erreur:', error);
        } else {
            const tbody = document.querySelector('table tbody');
            tbody.innerHTML = ''; // Virer les lignes déjà présentes
            data.forEach(arbre => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${arbre.espece}</td>
                    <td>${arbre.hauteur_totale}</td>
                    <td>${arbre.hauteur_tronc}</td>
                    <td>${arbre.diametre_tronc}</td>
                    <td>${arbre.latitude}</td>
                    <td>${arbre.longitude}</td>
                    <td>${arbre.etat}</td>
                    <td>${arbre.stadedev}</td>
                    <td>${arbre.type_port}</td>
                    <td>${arbre.type_pied}</td>
                `;
                tbody.appendChild(row);
            });
        }
    });
});

