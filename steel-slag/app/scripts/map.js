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
let agricultureOverlay, specificOverlay, mountainOverlay, contourOverlay, tapWaterLayer, groundwaterLayer;
let agricultureOn = true, specificOn = true, mountainOn = true, contourOn = true,
    tapWaterOn, groundwaterOn;

function initMap() {
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  let styledMap = new google.maps.StyledMapType(styles, {
    name: "Styled Map"
  });

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  let scrW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let isDraggable = scrW > 480 ? true : false;
  let mapOptions = {
    zoom: 12,
    draggable: isDraggable,         // avoid scrolling problem on mobile devices
    scrollwheel: false,      // avoid scrolling problem on mobile devices
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

  let agricultureImage = 'images/layer_agriculture.svg';
  let specificImage = 'images/layer_specific_agriculture.svg';
  let mountainImage = 'images/layer_mountain.svg';
  let contourImage = 'images/layer_contour.svg';
  // let contourImage = 'images/test-outer.png';

  let imageBounds = {
    north: 23.0079,
    south: 22.7462,
    east: 120.6790,
    west: 120.2666
  };

  let overlayOpts = {
    opacity: 0.9
  };

  //  自來水水質水量保護區圖
  tapWaterLayer = new google.maps.Data();
  tapWaterLayer.loadGeoJson('assets/TWQPROT.json');
  tapWaterLayer.setStyle({
    fillColor: '#c7997d',
    strokeWeight: 0,
    opacity: 0.25
  });
  tapWaterLayer.setMap(map);


  // 地下水分區範圍圖
  groundwaterLayer = new google.maps.Data();
  groundwaterLayer.loadGeoJson('assets/GWREGION.json');
  groundwaterLayer.setStyle({
    fillColor: '#9cb5bc',
    strokeWeight: 0,
    opacity: 0.25
  });
  groundwaterLayer.setMap(map);

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

  // set marker for the polluted point
  let marker = new google.maps.Marker({
      position: new google.maps.LatLng(22.949986, 120.516294),
      title: '旗山污染場址',
      icon: 'images/map-icon.png',
      animation: google.maps.Animation.DROP,
  });
  marker.setMap(map);

  // var ctaLayer = new google.maps.KmlLayer({
  //   url:  'assets/TWQPROT.kml'
  // });
  // ctaLayer.setMap(map);

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

function setTapWaterToggle () {
  tapWaterOn = !tapWaterOn;
  setToggle(tapWaterOn, tapWaterLayer);
}

function setGroundWaterToggle () {
  groundwaterOn = !groundwaterOn;
  setToggle(groundwaterOn, groundwaterLayer);
}
