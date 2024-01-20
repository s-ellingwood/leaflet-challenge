// Get the data endpoint
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data)

    //////////////////////////////////////////////////////
    // Using Leaflet, create a map that plots all the earthquakes from your dataset baesd on their longitude and latitude.
    //    Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color.
    //    Higher magnitudes should appear larger, and greater depth should appear darker in color.
    
    // Create our initial map object.
    // Set the longitude, latitude, and starting zoom level.
    let myMap = L.map("map").setView([39.8283, -98.5795], 3.5);

    // Add a tile layer (the background map image) to our map.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Loop through the earthquakes and create one marker for each earthquake object.
    for (let i = 0; i < data.features.length; i++) {
        // Conditionals for color
        let color = "";
        if (data.features[i].geometry.coordinates[2] < 10) {
        color = "#0DDC29";
        }
        else if (data.features[i].geometry.coordinates[2] < 30) {
        color = "#BEF80E";
        }
        else if (data.features[i].geometry.coordinates[2] < 50) {
        color = "#F9EE0F";
        }
        else if (data.features[i].geometry.coordinates[2] < 70) {
        color = "#FBC108";
        }
        else if (data.features[i].geometry.coordinates[2] < 90) {
            color = "#FD9003";
        }
        else {
            color = "#FC1704";
        }

        // Add circles to the map.
        L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "black",
        weight: 1,
        fillColor: color,
        radius: (data.features[i].properties.mag)*25000
        // Include popups that provide additional information about the earthquake when it's associated marker is clicked.
        }).bindPopup(`<h3>${data.features[i].properties.place}</h3> <hr> <h4>Magnitude: ${data.features[i].properties.mag}</h4> <h4>Depth: ${data.features[i].geometry.coordinates[2]}</h4>`).addTo(myMap);
        }
    
    // Create a legend that will provide context for your map data.
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Depth</h4>";
      div.innerHTML += '<i style="background: #0DDC29"></i><span>-10-9</span><br>';
      div.innerHTML += '<i style="background: #BEF80E"></i><span>10-29</span><br>';
      div.innerHTML += '<i style="background: #F9EE0F"></i><span>30-49</span><br>';
      div.innerHTML += '<i style="background: #FBC108"></i><span>50-69</span><br>';
      div.innerHTML += '<i style="background: #FD9003"></i><span>70-89</span><br>';
      div.innerHTML += '<i style="background: #FC1704"></i><span>90+</span><br>';    
      return div;
    };
    
    legend.addTo(myMap);

});