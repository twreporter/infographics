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
    offset: 0
  })
  .setVelocity("#g-soil", { translateX: 0 }, {duration: 0, complete: function() {
    $(".soil-bottom").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 300});
    $(".soil-middle").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 600});
    $(".soil-top").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 1000});
    $(".soil-tree").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 1200});

  }})
  .addTo(controller);

  // let gSoilExit = new ScrollMagic.Scene({
  //   triggerElement: '#g-soil',
  //   triggerHook: 'onLeave',
  //   offset: 50
  // })
  // .removeVelocity(true)
  // .addTo(controller);


  let sceneMap = new ScrollMagic.Scene({
    triggerElement: '#scene-google-map',
    triggerHook: 'onLeave',
    offset: '50%'
  })
  .setPin("#scene-google-map")
  .addTo(controller);

  // define movement of panels
	let wipeAnimation = new TimelineMax()
    .to("#1st-birdview .birdview-description", 0, {top: "100%"})
    .to("#1st-birdview .birdview-description", 1, {top: 0})
    .to("#2nd-birdview", 1, {opacity: 1})

    .to("#2nd-birdview .birdview-description", 0, {top: "100%"})
    .to("#2nd-birdview .birdview-description", 1, {top: 0})
    .to("#3rd-birdview", 1, {opacity: 1})

    .to("#3rd-birdview .birdview-description", 0, {top: "100%"})
    .to("#3rd-birdview .birdview-description", 1, {top: 0})
    .to("#4th-birdview", 1, {opacity: 1})

    .to("#4th-birdview .birdview-description", 0, {top: "100%"})
    .to("#4th-birdview .birdview-description", 1, {top: 0})

    ;

		// // animate to 2nd panel
		// .to(".birdview-container", 0.5, {z: -150})		// move back in 3D space
    // // .to(".birdview-text", 0.5, {opacity: 1})
    // // .to(".birdview-text", 1, {opacity: 0.5})
		// .to(".birdview-container", 1,   {x: "-25%"})	// move in to first panel
		// .to(".birdview-container", 0.5, {z: 0})				// move back to origin in 3D space
    //
    // // animate to 3rd panel
		// .to(".birdview-container", 0.5, {z: -150})		// move back in 3D space
    // // .to(".birdview-text", 0.5, {opacity: 1})
    // // .to(".birdview-text", 1, {opacity: 0.5})
		// .to(".birdview-container", 1,   {x: "-50%"})	// move in to first panel
		// .to(".birdview-container", 0.5, {z: 0})				// move back to origin in 3D space
    //
    // // animate to 4th panel
		// .to(".birdview-container", 0.5, {z: -150})		// move back in 3D space
    // // .to(".birdview-text", 0.5, {opacity: 1})
    // // .to(".birdview-text", 1, {opacity: 0.5})
		// .to(".birdview-container", 1,   {x: "-75%"})	// move in to first panel
		// .to(".birdview-container", 0.5, {z: 0})				// move back to origin in 3D space
    // ;

  let sceneBirdview = new ScrollMagic.Scene({
    triggerElement: '#scene-birdview',
    triggerHook: 'onLeave',
    duration: "200%"
  })
  .setPin("#scene-birdview")
  .setTween(wipeAnimation)
  // .addIndicators() // add indicators (plugin)
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
