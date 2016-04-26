'use strict';

let currentMpBoxID = 'scene-mp-intro';

function setMpFilterAnimation(controller, shuffle, scene, filterItem) {
  new ScrollMagic.Scene({
    triggerElement: '#'+scene,
    triggerHook: 'onEnter',
    duration: '100%',
    offset: -30,
    reverse: true
  })
  .addTo(controller)
  .on('end', function () {
    $("#shuffle-mp-figure").detach().appendTo('#'+scene+' .mp-figure');
    shuffle.filter(filterItem);
    currentMpBoxID = scene;
  });
}

$( document ).ready(function() {
  var Shuffle = window.shuffle;
  var element = document.getElementById('shuffle-mp-figure');

  // set min height for the fitst mp-figure
  $('#first-mp-box').css('min-height', $('#shuffle-mp-figure').height());

  // initiate shufflejs for the mp list
  var shuffle = new Shuffle(element, {
    itemSelector: '.mp-item'
  });
  // shufflejs finished moving
  element.addEventListener(Shuffle.EventType.LAYOUT, function () {
    $('#'+currentMpBoxID+' .mp-figure').css('min-height', $('#'+currentMpBoxID+' .mp-figure').height());
  });

  // initiate ScrollMagic
  let controller = new ScrollMagic.Controller();

  // let gMpAll = new ScrollMagic.Scene({
  //   triggerElement: '#scene-mp-intro',
  //   triggerHook: 'onEnter',
  //   duration: '100%',
  //   offset: '20%',
  //   reverse: true
  // })
  // .addTo(controller)
  // .on('start', function () {
  //   console.log("scene-mp-intro");
  //   $("#shuffle-mp-figure").detach().appendTo('#scene-mp-intro .mp-figure');
  //   shuffle.filter('');
  // });
  //
  // let gMpSP = new ScrollMagic.Scene({
  //   triggerElement: '#scene-mp-sp',
  //   triggerHook: 'onEnter',
  //   duration: '100%',
  //   offset: '20%',
  //   reverse: true
  // })
  // .addTo(controller)
  // .on('start', function () {
  //   console.log("scene-mp-sp");
  //   $("#shuffle-mp-figure").detach().appendTo('#scene-mp-sp .mp-figure');
  //   shuffle.filter('SP');
  // });

  setMpFilterAnimation(controller, shuffle, 'scene-mp-intro', '');
  setMpFilterAnimation(controller, shuffle, 'scene-mp-sp', 'SP');
  setMpFilterAnimation(controller, shuffle, 'scene-mp-ps', 'PS');
  setMpFilterAnimation(controller, shuffle, 'scene-mp-nt', 'NT');
  setMpFilterAnimation(controller, shuffle, 'scene-mp-na', 'NA');
});
