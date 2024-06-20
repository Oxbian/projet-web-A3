'use strict';

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed.");

	sendHttpRequest('GET', '../php/request.php/etat', null, function (error, data) {
		if (error) {
			httpErrors(error);
		} else {
			let etatSelect = document.getElementById("etat");
			data.forEach(etat => {
				const option = document.createElement('option');
				option.value = etat.fk_etat;
				option.text = etat.fk_etat;
				etatSelect.appendChild(option);
			});
		}
	});
	
	sendHttpRequest('GET', '../php/request.php/espece', null, function (error, data) {
		if (error) {
			httpErrors(error);
		} else {
			let etatSelect = document.getElementById("espece");
			data.forEach(etat => {
				const option = document.createElement('option');
				option.value = etat.fk_espece;
				option.text = etat.fk_espece;
				etatSelect.appendChild(option);
			});
		}
	});
	
	sendHttpRequest('GET', '../php/request.php/stadedev', null, function (error, data) {
		if (error) {
			httpErrors(error);
		} else {
			let etatSelect = document.getElementById("stade");
			data.forEach(etat => {
				const option = document.createElement('option');
				option.value = etat.fk_stadedev;
				option.text = etat.fk_stadedev;
				etatSelect.appendChild(option);
			});
		}
	});	

    // Variables globales pour les données et la carte
    let rowsData = []; // Pour stocker les données CSV chargées
    let plotlyInitialized = false; // Pour suivre l'initialisation de Plotly

    // Fonction pour charger les données CSV
    Plotly.d3.csv('../../assets/Data_Arbre.csv', function (err, rows) {
        if (err) {
            console.error('Error loading CSV file:', err);
            return;
        }

        console.log("CSV file loaded successfully.", rows);
        rowsData = rows; // Stockage des données dans la variable globale

        // Initialiser la carte une fois que les données sont chargées
        if (!plotlyInitialized) {
            updateMap(); // Appel initial à updateMap()
            plotlyInitialized = true; // Marquer Plotly comme initialisé
        }
    });

    // Fonction pour mettre à jour la carte en fonction des filtres sélectionnés
	function updateMap() {
		var speciesFilter = document.getElementById('espece').value; // Get selected species filter
		var stateFilter = document.getElementById('etat').value; // Get selected state filter
		var stageFilter = document.getElementById('stade').value; // Get selected stage filter

		console.log(rowsData)
	
		var filteredRows = rowsData.filter(function (row) {
			return (speciesFilter === 'Filtrer selon l\'espèce' || row.fk_nomtech === speciesFilter) &&
				   (stateFilter === 'Filtrer selon l\'état' || row.fk_arb_etat === stateFilter) &&
				   (stageFilter === 'Filtrer selon le stade de développement' || row.fk_stadedev === stageFilter);
		});
	
		console.log("Filtered rows:", filteredRows); // Log filtered data for debugging
	
		// Proceed with plotting logic using filteredRows
		// Example plotting logic (adapt as per your Plotly setup)
		if (filteredRows.length > 0) {
			var classArray = unpack(filteredRows, 'class');
			var classes = [...new Set(classArray)];
	
			var data = classes.map(function (classe) {
				var rowsFiltered = filteredRows.filter(function (row) {
					return (row.class === classe);
				});
	
				var latitudes = unpack(rowsFiltered, 'latitude');
				var longitudes = unpack(rowsFiltered, 'longitude');
				var quartiers = unpack(rowsFiltered, 'clc_quartier');
				var noms = unpack(rowsFiltered, 'fk_nomtech');
				var etat_arbres = unpack(rowsFiltered, 'fk_arb_etat');
	
				var texts = quartiers.map((quartier, index) =>
					`Lat: ${latitudes[index]}<br> Lon: ${longitudes[index]}<br>Nom: ${noms[index]}<br>Quartier: ${quartier}<br>Etat: ${etat_arbres[index]}`
				);
	
				return {
					type: 'scattermapbox',
					name: classe,
					lat: latitudes,
					lon: longitudes,
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
	
			Plotly.newPlot('map', data, layout);
		} else {
			console.warn("Aucune donnée trouvée pour les filtres sélectionnés.");
			// Implement fallback or error handling here
		}
	}
	

    // Helper function to unpack data from rows
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    // Event listeners for filter changes
    document.querySelector('[aria-label="espece"]').addEventListener('change', updateMap);
    document.querySelector('[aria-label="etat"]').addEventListener('change', updateMap);
    document.querySelector('[aria-label="stade"]').addEventListener('change', updateMap);
});
