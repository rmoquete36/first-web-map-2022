

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

    map.addLayer({
    'id': 'nta-map-fill',
    'type': 'fill',
    'source': 'nta-map',
    'paint': {
      'fill-opacity': .5,
      'fill-outline-color': '#1f1d1d',
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

});
