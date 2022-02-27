
  mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

  // lngLat to show entire NYC on load
  var mapCenter = [-73.993219, 40.713746]


  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: mapCenter, // starting position as [lng, lat]
    zoom: 10,
  });

  map.on('load', function() {
    map.addSource('nta-map', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: './data/nta-map.geojson'
    });

    map.addSource('robberymap', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: './data/robberymap.geojson'
    });

    map.addLayer({
    'id': 'nta-map-fill',
    'type': 'fill',
    'source': 'nta-map',
    'paint': {
      'fill-opacity': .5,
      'fill-outline-color': '#1f1d1d',
    }
    });

    map.addLayer({
    'id': 'nta-map-line',
    'type': 'line',
    'source': 'nta-map',
    'paint': {
      'line-color': '#1f1d1d'
    }
    });

    map.setPaintProperty('nta-map-fill', 'fill-color', [
      'match',
      ['get', 'boroname'],
      'Bronx', '#97a1f0',
      'Brooklyn', '#dba29a',
      'Manhattan', '#b2edc2',
      'Queens', '#deb2ed',
      'Staten Island', '#f2efd0',
      '#ede3e1'
    ]);

    // When a click event occurs on a feature in the nta-map-fill,
    // open a popup at the location of the click, with nta name
    // HTML from the click event's properties.
    map.on('click', 'nta-map-fill', function(e) {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.ntaname)
    .addTo(map);
  });

    // Change the cursor to a pointer when
    // the mouse is over the nta-map-fill.
    map.on('mouseenter', 'nta-map-fill', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

    // Change the cursor back to a pointer
    // when it leaves the nta-map-fill.
    map.on('mouseleave', 'nta-map-fill', function() {
    map.getCanvas().style.cursor = '';
  });

    map.addLayer({
    'id': 'robberymap-circle',
    'type': 'circle',
    'source': 'robberymap',
    'paint': {
      'circle-color': '#f2d0d5',
      'circle-radius': 2,
      'circle-opacity': 0.5
    }
    });

    // Create a popup.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mouseenter', 'robberymap-circle', function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const robType = e.features[0].properties.PD_DESC;
      const precinct = e.features[0].properties.ADDR_PCT_CD;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

    // Populate the popup and set its coordinates
    // based on the feature found.
        popup.setLngLat(coordinates).setHTML(`${precinct}`).addTo(map);
    });

        map.on('mouseleave', 'robberymap-circle', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

});
