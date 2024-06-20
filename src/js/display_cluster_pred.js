'use strict';

sendHttpRequest('GET', '../php/request.php/arbre/cluster', null, function (error, arbres) {
    if (error) {
        console.log('Error fetching cluster predictions', error);
    } else {
        const mapContainer = document.getElementById('map-clusters');
        if (!mapContainer) {
            console.error("Map container not found!");
            return;
        }

        // Define unpack function (unchanged)
        function unpack(arbres, key) {
            return arbres.map(function (row) { return row[key]; });
        }

        // Extract unique clusters
        var classArray = unpack(arbres, 'cluster');
        var clusters = [...new Set(classArray)];
        clusters.sort((a, b) => a - b);

        // Assigning colors based on clusters
        var colors = ["#6A645A", "#E3CD8B", "#5D7052", "#C18845", "#F0BE86"];

        // Create an array to hold all traces
        var data = [];

        // Loop through each unique cluster
        clusters.forEach(function (cluster, index) {
            // Filter data for the current cluster
            var rowsFiltered = arbres.filter(function (row) {
                return (row.cluster === cluster);
            });

            var latitudes = unpack(rowsFiltered, 'latitude');
            var longitudes = unpack(rowsFiltered, 'longitude');
            var quartiers = unpack(rowsFiltered, 'fk_secteur');
            var noms = unpack(rowsFiltered, 'fk_espece');
            var etat_arbres = unpack(rowsFiltered, 'fk_etat');

            var texts = quartiers.map((quartier, index) =>
                `Lat: ${latitudes[index]}<br> Lon: ${longitudes[index]}<br>Nom: ${noms[index]}<br>Quartier: ${quartier}<br>Etat: ${etat_arbres[index]}<br>Cluster: ${cluster}`
            );

            // Ensure we have a color for this cluster (handling more clusters than colors)
            var clusterColor = colors[index % colors.length];

            // Create a trace object for the current cluster
            var trace = {
                type: 'scattermapbox',
                name: `Cluster ${cluster}`, // Unique name for the legend
                lat: latitudes,
                lon: longitudes,
                mode: 'markers',
                marker: {
                    size: 8,
                    color: clusterColor,
                },
                text: texts,
                hoverinfo: 'text',
                hoverlabel: {
                    bgcolor: 'black',
                    bordercolor: 'black',
                    font: {
                        color: 'white'
                    }
                }
            };

            // Push the trace to the data array
            data.push(trace);
        });

        // Layout configuration (unchanged)
        var layout = {
            title: 'Répartition des clusters des arbres à Saint-Quentin',
            font: {
                color: 'white'
            },
            dragmode: 'zoom',
            mapbox: {
                center: {
                    lat: 49.8465253,
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
            legend: {
                orientation: 'h',
                x: 0.5,
                xanchor: 'center',
                y: -0.1,
                yanchor: 'top',
                font: {
                    color: 'white'
                }
            },
            showlegend: true
        };

        // Set Plotly configuration (unchanged)
        Plotly.setPlotConfig({
            mapboxAccessToken: "pk.eyJ1IjoiamVhbi1kZS1jdWxhc3NlIiwiYSI6ImNseGo2Y2VoazFwOHoyanMzdzY5amZmejgifQ.U_ZQY7Mk0VuT-p0YpLGbLA"
        });

        // Create the plot with Plotly
        Plotly.newPlot('map-clusters', data, layout);
    }
});
