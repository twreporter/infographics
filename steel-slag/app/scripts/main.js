const ANIMATION = {
  fadeInUp: { opacity: [1, 0], translateY: [0, '100%']}
};

$( document ).ready(function() {
  // enable Bootstrap Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // initiate ScrollMagic
  let controller = new ScrollMagic.Controller();

  let scene1 = new ScrollMagic.Scene({
    triggerElement: '#scene-1',
    triggerHook: 'onLeave',
    offset: 20
  })
  // .setPin("#scene-1")
  .setVelocity("#scene-1 .blurred-image", {opacity: 1}, {duration: 500, easing: "linear"})
  .addTo(controller);

  let scene2 = new ScrollMagic.Scene({
    triggerElement: '#scene-2',
    triggerHook: 'onLeave',
  })
  // .setPin("#scene-2")
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
    offset: 10
  })
  // .setPin("#scene-4")
  .addTo(controller);

  let gSoil = new ScrollMagic.Scene({
    triggerElement: '#g-soil',
    triggerHook: 'onEnter',
    offset: 50
  })
  // .setPin("#scene-1")
  // .setVelocity(".soil-bottom", "fadeIn", {duration: 500, easing: "linear", delay: 500})
  .setVelocity("#g-soil", { translateX: 0 }, {duration: 0, complete: function() {
    console.log("complete", this);
    $(".soil-bottom").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 100});
    $(".soil-middle").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 300});
    $(".soil-top").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 600});
    $(".soil-tree").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 800});
  }})
  .addTo(controller);


  let sceneMap = new ScrollMagic.Scene({
    triggerElement: '#scene-google-map',
    triggerHook: 'onLeave',
    offset: '50%'
  })
  .setPin("#scene-google-map")
  .addTo(controller);


  // enable carousel
  $('.carousel').carousel({
    interval: 2000
  });
  // enable mobile sliding
  $('.carousel').bcSwipe({ threshold: 50 });
  $('#environment-slider').on('slid.bs.carousel', checkSlider);

  function checkSlider() {
    // check if it is the begin/end of the slider
    var $slider = $('#environment-slider');
    if ($('.carousel-inner .item:first').hasClass('active')) {
      // begin of the slider
      $slider.find('.left-btn').attr('src', "images/left_btn.svg");
      $slider.find('.right-btn').attr('src', "images/right_btn_active.svg");
    } else if ($('.carousel-inner .item:last').hasClass('active')) {
      // end of the slider
      $slider.find('.left-btn').attr('src', "images/left_btn_active.svg");
      $slider.find('.right-btn').attr('src', "images/right_btn.svg");
    } else {
      $slider.find('.left-btn').attr('src', "images/left_btn_active.svg");
      $slider.find('.right-btn').attr('src', "images/right_btn_active.svg");
    }
  }

});
