"use strict";

"use strict";

// Initialize the MapLibre map
const map = new maplibregl.Map({
    container: 'map', // Container ID
    style: 'https://demotiles.maplibre.org/style.json', // Style URL
    center: [3.2876843, 49.8465253], // Initial map center in [lon, lat]
    zoom: 12 // Initial zoom level
});

// Load the CSV data using D3
d3.csv('http://etu0123.projets.isen-ouest.fr/myProject/projet-web-A3/assets/Data_Arbre.csv').then(function(rows) {
    console.log("CSV file loaded successfully", rows);

    // Convert the rows into GeoJSON features
    const features = rows.map(function(row) {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(row.reclong), parseFloat(row.reclat)]
            },
            properties: {
                class: row.class
            }
        };
    });

    const geojson = {
        type: 'FeatureCollection',
        features: features
    };

    // Add the GeoJSON data as a source
    map.on('load', function() {
        map.addSource('trees', {
            type: 'geojson',
            data: geojson
        });

        // Add a layer to display the points
        map.addLayer({
            id: 'trees',
            type: 'circle',
            source: 'trees',
            paint: {
                'circle-radius': 5,
                'circle-color': '#FF0000' // Red color
            }
        });
    });
}).catch(function(error) {
    console.error('Error loading CSV file:', error);
});




/*
Plotly.d3.csv('http://etu0123.projets.isen-ouest.fr/myProject/projet-web-A3/assets/Data_Arbre.csv', function (err, rows) {

    if (err) {
        console.error('Error loading CSV file:', err);
        return;
    }

    console.log("tout est good")

    var classArray = unpack(rows, 'class');
    var classes = [...new Set(classArray)];

    function unpack(rows, key) {
        console.log("tout est good x20")
        return rows.map(function (row) { return row[key]; });
    }

    var data = classes.map(function (classes) {
        var rowsFiltered = rows.filter(function (row) {
            return (row.class === classes);
        });
        return {
            type: 'scattermapbox',
            name: classes,
            lat: unpack(rowsFiltered, 'latitude'),
            lon: unpack(rowsFiltered, 'longitude')
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
            zoom: 1
        },
        margin: {
            r: 10,
            t: 10,
            b: 10,
            l: 10,
            pad: 0
        },
        paper_bgcolor: 'paper',
        plot_bgcolor: 'paper',
        showlegend: true,
    };

    Plotly.setPlotConfig({
        mapboxAccessToken: "hEKrgaascDk1ueaDz1py"
      });

    Plotly.newPlot('map', data, layout);
});
*/