'use strict';

console.log(localStorage)

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
    /*
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error("Map container not found!");
        return;
    }

    var latitude = predictionAge.latitude;
    var longitude = predictionAge.longitude;
    var quartier = predictionAge.clc_quartier;
    var nom = predictionAge.fk_nomtech;
    var etat_arbre = predictionAge.fk_arb_etat;

    var data = (function () {
        var texts = quartiers.map((quartier, index) =>
            `Lat: ${latitude}<br> Lon: ${longitude}<br>Nom: ${nom}<br>Quartier: ${quartier}<br>Etat: ${etat_arbre}`
        );

        return {
            type: 'scattermapbox',
            name: classe,
            lat: latitude,
            lon: longitude,
            mode: 'markers',
            marker: {
                size: 8,
                color: 'green'
            },
            text: texts,
            hoverinfo: 'text'
        };
    });

    var layout = {
        title: 'Carte de la répartition des arbres de la ville de Saint-Quentin',
        font: {
            color: 'white'
        },
        dragmode: 'zoom',
        mapbox: {
            center: {
                lat: 49.8465253,  //Coordonnées du centre de Saint-Quentin
                lon: 3.2876843
            },
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            style: 'dark',
            zoom: 13
        },
        margin: {
            r: 0,
            t: 60,
            b: 0,
            l: 0,
            pad: 0
        },
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        showlegend: false,
    };

    Plotly.setPlotConfig({
        mapboxAccessToken: "pk.eyJ1IjoiamVhbi1kZS1jdWxhc3NlIiwiYSI6ImNseGo2Y2VoazFwOHoyanMzdzY5amZmejgifQ.U_ZQY7Mk0VuT-p0YpLGbLA"
    });

    Plotly.newPlot('map-pred-age', data, layout);


    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }*/

});

function displayPrediction(data) {
    const tableBody = document.getElementById('table-body-pred-tech');

    // Créer une nouvelle ligne de tableau
    const newRow = document.createElement('tr');

    // Ajouter les cellules à la ligne

    newRow.appendChild(createHeaderCell(data.age_knn));
    newRow.appendChild(createCell(data.age_svm));
    newRow.appendChild(createCell(data.age_rf));
    newRow.appendChild(createCell(data.age_mlp));

    // Ajouter la ligne au corps du tableau
    tableBody.appendChild(newRow);
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