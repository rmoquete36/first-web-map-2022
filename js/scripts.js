//
// var boronameLookup = (code) => {
//   switch (code) {
//     case 'Bronx':
//       return {
//         color: '#eac7f2',
//         description: '1 & 2 Family',
//       };
//     case 2:
//       return {
//         color: '#f7d496',
//         description: 'Multifamily Walk-up',
//       };
//     case 3:
//       return {
//         color: '#FF9900',
//         description: 'Multifamily Elevator',
//       };
//     case 4:
//       return {
//         color: '#f7cabf',
//         description: 'Mixed Res. & Commercial',
//       };
//     case 5:
//       return {
//         color: '#ea6661',
//         description: 'Commercial & Office',
//       };

  mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

  // lngLat for the fountain in Washington Square Park
  var wspCenter = [-73.997456, 40.730831]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: wspCenter, // starting position as [lng, lat]
    zoom: 11,
    // minZoom: 9,
    // maxZoom: 14
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
    });

    map.setPaintProperty('nta-map-fill', 'fill-color', [
      'match'
      ['get', "boroname"],
      "Bronx", '#97a1f0',
      "Brooklyn", '#eddc8e',
      "Manhattan", '#b2edc2',
      "Queens", '#deb2ed',
      "Staten Island", '#edbab2',
      '#ccc'
    ])

});
