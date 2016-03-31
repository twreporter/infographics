// Create an array of styles.
const styles = [{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#444444"
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f2f2f2"
  }]
}, {
  "featureType": "poi",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
    "saturation": -100
  }, {
    "lightness": 45
  }]
}, {
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [{
    "visibility": "simplified"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "color": "#46bcec"
  }, {
    "visibility": "on"
  }]
}];

let map;
let agricultureOverlay, specificOverlay, mountainOverlay, contourOverlay;
let agricultureOn = true, specificOn = true, mountainOn = true, contourOn = true;

function initMap() {
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  let styledMap = new google.maps.StyledMapType(styles, {
    name: "Styled Map"
  });

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  let mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(22.8702492, 120.4703258),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  map.setOptions({
    styles: styles,
    mapTypeControl: false
  });


  let bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(23.0069, 120.2682),
    new google.maps.LatLng(22.7646, 120.6699));

  let agricultureImage = 'images/layer_agriculture.svg';
  let specificImage = 'images/layer_specific_agriculture.svg';
  let mountainImage = 'images/layer_mountain.svg';
  let contourImage = 'images/layer_contour.svg';

  let imageBounds = {
    north: 23.0069,
    south: 22.7646,
    east: 120.6699,
    west: 120.2682
  };

  let overlayOpts = {
    opacity: 0.7
  };

  agricultureOverlay = new google.maps.GroundOverlay(agricultureImage,
    imageBounds, overlayOpts);
  agricultureOverlay.setMap(map);

  specificOverlay = new google.maps.GroundOverlay(specificImage,
    imageBounds, overlayOpts);
  specificOverlay.setMap(map);

  mountainOverlay = new google.maps.GroundOverlay(mountainImage,
    imageBounds, overlayOpts);
  mountainOverlay.setMap(map);

  contourOverlay = new google.maps.GroundOverlay(contourImage,
    imageBounds, overlayOpts);
  contourOverlay.setMap(map);

  var ctaLayer = new google.maps.KmlLayer({
    url:  'images/TWQPROT.kml'
  });
  ctaLayer.setMap(map);

}

function setToggle (isOn, overlay) {
  if(!isOn) {
    overlay.setMap(null);
  } else {
    overlay.setMap(map);
  }
}

function setAgricultureToggle () {
  agricultureOn = !agricultureOn;
  setToggle(agricultureOn, agricultureOverlay);
}

function setSpecificToggle () {
  specificOn = !specificOn;
  setToggle(specificOn, specificOverlay);
}

function setMountainToggle () {
  mountainOn = !mountainOn;
  setToggle(mountainOn, mountainOverlay);
}
