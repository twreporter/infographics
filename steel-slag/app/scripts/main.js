$(function() {
  // enable Bootstrap Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // initiate ScrollMagic
  let controller = new ScrollMagic.Controller();

  let scene1 = new ScrollMagic.Scene({
    triggerElement: '#scene-1',
    triggerHook: 'onLeave',
    offset: 20
  })
  .setVelocity("#scene-1 .blurred-image", {opacity: 1}, {duration: 500, easing: "linear"})
  .addTo(controller);

  let scene2 = new ScrollMagic.Scene({
    triggerElement: '#scene-2',
    triggerHook: 'onLeave',
  })
  .setPin("#scene-2")
  .addTo(controller);

  // middle chapter
  let scene3 = new ScrollMagic.Scene({
    triggerElement: '#scene-3',
    triggerHook: 'onLeave',
    offset: '50%'
  })
  // .setPin("#scene-3")
  .setVelocity("#scene-3 .blurred-image", {opacity: 1}, {duration: 500, easing: "linear"})
  .addTo(controller);

  let scene4 = new ScrollMagic.Scene({
    triggerElement: '#scene-4',
    triggerHook: 'onLeave',
    offset: '20%'
  })
  .setPin("#scene-4")
  .addTo(controller);


  let sceneMap = new ScrollMagic.Scene({
    triggerElement: '#scene-google-map',
    triggerHook: 'onLeave',
    offset: '50%'
  })
  .setPin("#scene-google-map")
  .addTo(controller);

});
