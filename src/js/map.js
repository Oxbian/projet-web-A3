document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed.");

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error("Map container not found!");
        return;
    }

    // Load the CSV data using Plotly's d3.csv
    Plotly.d3.csv('http://etu0123.projets.isen-ouest.fr/myProject/projet-web-A3/assets/Data_Arbre.csv', function (err, rows) {
        if (err) {
            console.error('Error loading CSV file:', err);
            return;
        }

        console.log("CSV file loaded successfully.", rows);

        var classArray = unpack(rows, 'class');
        var classes = [...new Set(classArray)];

        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }

        var data = classes.map(function (classe) {
            var rowsFiltered = rows.filter(function (row) {
                return (row.class === classe);
            });
            return {
                type: 'scattermapbox',
                name: classe,
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
                zoom: 8
            },
            margin: {
                r: 10,
                t: 10,
                b: 10,
                l: 10,
                pad: 0
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black',
            showlegend: true,
        };

        Plotly.setPlotConfig({
            mapboxAccessToken: "pk.eyJ1IjoiamVhbi1kZS1jdWxhc3NlIiwiYSI6ImNseGo2Y2VoazFwOHoyanMzdzY5amZmejgifQ.U_ZQY7Mk0VuT-p0YpLGbLA"
        });

        Plotly.newPlot('map', data, layout);
    });

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
});




/*document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");
// Initialize the MapLibre map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [-98.5795, 39.8283], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

// Function to add data points to the map
function addDataPoints(data) {
    // Parse CSV data into GeoJSON format
    const geojson = {
        type: 'FeatureCollection',
        features: data.map(row => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)]
            },
            properties: {
                title: row.title
            }
        }))
    };

    // Add GeoJSON data source
    map.addSource('csvData', {
        type: 'geojson',
        data: geojson
    });

    // Add a layer to display the points
    map.addLayer({
        id: 'csvDataPoints',
        type: 'circle',
        source: 'csvData',
        paint: {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });

    // Add a popup on click
    map.on('click', 'csvDataPoints', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;

        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<h3>${title}</h3>`)
            .addTo(map);
    });
}

// Fetch and parse the CSV file
fetch('http://etu0123.projets.isen-ouest.fr/myProject/projet-web-A3/assets/Data_Arbre.csv')
    .then(response => response.text())
    .then(csv => {
        Papa.parse(csv, {
            header: true,
            complete: function(results) {
                addDataPoints(results.data);
            }
        });
    });



/*
    // Initialize the MapLibre map
    const map = new maplibregl.Map({
        container: 'map', // Container ID
        style: 'https://demotiles.maplibre.org/style.json', // Style URL
        center: [3.2876843, 49.8465253], // Initial map center in [lon, lat]
        zoom: 8 // Initial zoom level
    });

    // Load the CSV data using D3
    d3.csv('../assets/Data_Arbre.csv').then(function (rows) {
        console.log("CSV file loaded successfully", rows);

        // Convert the rows into GeoJSON features
        const features = rows.map(function (row) {
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
        map.on('load', function () {
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
    }).catch(function (error) {
        console.error('Error loading CSV file:', error);
    });
})
*/