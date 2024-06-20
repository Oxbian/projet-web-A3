'use strict';

console.log('kk')


sendHttpRequest('GET', '../php/request.php/arbre/', id, function (error, data) {
    if (error) {
        console.error('Erreur lors de la récupération des données:', error);
    } else {
        const tableBody = document.getElementById('table-body-pred');

        // Créer une nouvelle ligne de tableau
        const newRow = document.createElement('tr');

        // Ajouter les cellules à la ligne

        newRow.appendChild(createHeaderCell(data.id));
        newRow.appendChild(createCell(data.fk_espece));
        newRow.appendChild(createCell(data.haut_tot));
        newRow.appendChild(createCell(data.haut_tronc));
        newRow.appendChild(createCell(data.tronc_diam));
        newRow.appendChild(createCell(data.latitude));
        newRow.appendChild(createCell(data.longitude));
        newRow.appendChild(createCell(data.fk_etat));
        newRow.appendChild(createCell(data.fk_stadedev));
        newRow.appendChild(createCell(data.fk_port));
        newRow.appendChild(createCell(data.fk_pied));

        // Ajouter la ligne au corps du tableau
        tableBody.appendChild(newRow);
    }
});


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

    const predictionAge = JSON.parse(localStorage.getItem('predictionAge'));
    const predictionRisk = JSON.parse(localStorage.getItem('predictionRisk'));

    console.log(predictionAge)
    console.log(predictionRisk)


    const btnOne = document.querySelector('.btn-one-pred');
    const btnTwo = document.querySelector('.btn-two-pred');

    btnOne.addEventListener('click', function () {
        if (predictionAge) {
            displayPrediction(predictionAge);
        }
    });

    btnTwo.addEventListener('click', function () {
        if (predictionRisk) {
            displayPrediction(predictionRisk);
        }
    });

});

function displayPrediction(data) {
    
}

/*

var data = [{
    type:'scattermapbox',
    lat:['45.5017'],
    lon:['-73.5673'],
    mode:'markers',
    marker: {
      size:14
    },
    text:['Montreal']
  }]
  
  var layout = {
    autosize: true,
    hovermode:'closest',
    mapbox: {
      bearing:0,
      center: {
        lat:45,
        lon:-73
      },
      pitch:0,
      zoom:5
    },
  }
  
  Plotly.setPlotConfig({
    mapboxAccessToken: "your access token"
  })
  
  Plotly.newPlot('myDiv', data, layout)
  */