
// Function to fetch JSON data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// #TODO map function to use in 3 files 
function createMap(data) {
    const latitude = data.map(d => d.latitude);
    const longitude = data.map(d => d.longitude);
    const text = data.map(d => d.espece);

    const trace = {
        type: 'scattermapbox',
        lat: latitude,
        lon: longitude,
        mode: 'markers',
        marker: { size: 14 },
        text: text,
    };

    const layout = {
        mapbox: {
            style: 'open-street-map',
            center: { lat: 48.8566, lon: 2.3522 },
            zoom: 5,
        },
        margin: { r: 0, t: 0, b: 0, l: 0 },
    };

    Plotly.newPlot('map', [trace], layout, { mapboxAccessToken: 'YOUR_MAPBOX_ACCESS_TOKEN' });
}

// Fetch data and create map
fetchData('').then(data => createMap(data)); //#TODO lien des données envoyées par le script python
