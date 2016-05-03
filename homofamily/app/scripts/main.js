'use strict';

let currentMpBoxID = 'scene-mp-intro';
let MP_LIST = [
  {scene: 'scene-mp-intro', key: ''},
  {scene: 'scene-mp-sp', key: 'SP'},
  {scene: 'scene-mp-ps', key: 'PS'},
  {scene: 'scene-mp-nt', key: 'NT'},
  {scene: 'scene-mp-na', key: 'NA'}
];

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
    // $("#shuffle-mp-figure").detach().appendTo('#'+scene+' .mp-figure');
    // shuffle.filter(filterItem);
    currentMpBoxID = scene;
  });
}

// $( document ).ready(function() {
//   let Shuffle = window.shuffle;
//   let element = document.getElementById('shuffle-mp-figure');
//
//   // set min height for the fitst mp-figure
//   $('#first-mp-box').css('min-height', $('#shuffle-mp-figure').height());
//
//   // initiate shufflejs for the mp list
//   let sff = new Shuffle(element, {
//     itemSelector: '.mp-item'
//   });
//   // shufflejs finished moving
//   element.addEventListener(Shuffle.EventType.LAYOUT, function () {
//     $('#'+currentMpBoxID+' .mp-figure').css('min-height', $('#'+currentMpBoxID+' .mp-figure').height());
//   });
//
//   // initiate ScrollMagic
//   let controller = new ScrollMagic.Controller();
//
//
//   // for(let i=0; i<MP_LIST.length; i++){
//   //   setMpFilterAnimation(controller, sff, MP_LIST[i].scene, MP_LIST[i].key);
//   // }
// });
