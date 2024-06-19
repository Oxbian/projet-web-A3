document.addEventListener('DOMContentLoaded', function () {
	console.log("DOM fully loaded and parsed.");

	const mapContainer = document.getElementById('map');
	if (!mapContainer) {
		console.error("Map container not found!");
		return;
	}

	// Load the CSV data using Plotly's d3.csv
	Plotly.d3.csv('../../assets/Data_Arbre.csv', function (err, rows) {
		if (err) {
			console.error('Error loading CSV file:', err);
			return;
		}

		console.log("CSV file loaded successfully.", rows);

		var classArray = unpack(rows, 'class');
		var classes = [...new Set(classArray)];

		function unpack(rows, key) {
			return rows.map(function (row) {return row[key];});
		}

		var data = classes.map(function (classe) {
			var rowsFiltered = rows.filter(function (row) {
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
	});

	function unpack(rows, key) {
		return rows.map(function (row) {return row[key];});
	}
});
