

$.getJSON('/data/pizzarows.json', function(pizzaRows) {
  console.log(pizzaRows)

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

  // var popup = new mapboxgl.Popup({
  //   offset: 40,
  // })
  //   .setHTML('<h3>Washington Square Park</h3>');
  //
  //
  // // add a marker for the WSP fountain
  // var marker = new mapboxgl.Marker()
  //   .setLngLat(wspCenter)
  //   .setPopup(popup)
  //   .addTo(map);
  //
  //
  // var pointsOfInterest = [
  //   {
  //     lngLat: [-73.996675,40.702154],
  //     popupHtml: 'Brooklyn Bridge Park',
  //     subText: 'I got married here'
  //   },
  //   {
  //     lngLat: [-74.001619,40.705662],
  //     popupHtml: 'South Street Seaport',
  //     subText: 'This is new, they tore the old one down'
  //   },
  //   {
  //     lngLat: [-74.044491,40.689300],
  //     popupHtml: 'Statue of Liberty',
  //     subText: 'July 4, 1776'
  //   }
  // ]
  //
  // pointsOfInterest.forEach(function(pointOfInterest) {
  //   var popup = new mapboxgl.Popup({ offset: 40 })
  //     .setHTML(`
  //       <h3>${pointOfInterest.popupHtml}</h3>
  //       <p>${pointOfInterest.subText}</p>
  //     `);
  //
  //   new mapboxgl.Marker()
  //     .setLngLat(pointOfInterest.lngLat)
  //     .setPopup(popup)
  //     .addTo(map);
  // })


  // now add markers for our favorite pizza shops
  pizzaRows.forEach(function(pizzaRow) {
    var popup = new mapboxgl.Popup({ offset: 40 })
      .setHTML(`
        <p><strong>${pizzaRow.firstname}</strong> loves the pizza at <strong>${pizzaRow.pizzashop}</strong></p>
      `);

    // default is purple for Wagner
    var color = 'purple'

    if (pizzaRow.school === 'Tandon') {
      color = 'orange'
    }

    if (pizzaRow.school === 'instructor') {
      color = 'steelblue'
    }

    if (pizzaRow.school === 'CUSP') {
      color = 'green'
    }

    if (pizzaRow.school === 'GSAS') {
      color = 'pink'
    }



    new mapboxgl.Marker({
      color: color
    })
      .setLngLat([pizzaRow.longitude, pizzaRow.latitude])
      .setPopup(popup)
      .addTo(map);
  })
})
