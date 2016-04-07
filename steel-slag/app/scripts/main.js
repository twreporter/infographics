const ANIMATION = {
  fadeInUp: { opacity: [1, 0], translateY: [0, '100%']}
};

$( document ).ready(function() {
  // enable Bootstrap Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // initiate ScrollMagic
  let controller = new ScrollMagic.Controller();

  // // cover video
  // let scene1 = new ScrollMagic.Scene({
  //   triggerElement: '#scene-1',
  //   triggerHook: 'onLeave',
  //   offset: 20
  // })
  // // .setPin("#scene-1")
  // // .setVelocity("#scene-1 .blurred-image", {opacity: 1}, {duration: 500, easing: "linear"})
  // .setTween(TweenMax.to('#cover-video', 0.5, {
  //   filter: blur(5px) brightness(0.7)
  // }))
  // .addTo(controller);

  let scene2 = new ScrollMagic.Scene({
    triggerElement: '#scene-2',
    triggerHook: 'onLeave',
    duration: '100%'
  })
  // .setPin("#scene-2")
  .setClassToggle("#btn-banana", "active")
  .addTo(controller);

  // middle chapter
  let chapterMiddle = new ScrollMagic.Scene({
    triggerElement: '#chapter-middle',
    triggerHook: 'onEnter',
    offset: 100,
    duration: '100%'
  })
  // .setPin("#scene-3")
  .setClassToggle("#btn-satellitemap", "active")
  .setVelocity("#chapter-middle .blurred-image", {opacity: 1}, {duration: 500, easing: "linear"})
  .addTo(controller);

  // bottom chapter
  let chapterTruck = new ScrollMagic.Scene({
    triggerElement: '#chapter-truck',
    triggerHook: 'onEnter',
    offset: 100,
    duration: '100%'
  })
  .setClassToggle("#btn-truck", "active")
  .addTo(controller);

  let chapterBottom = new ScrollMagic.Scene({
    triggerElement: '#chapter-bottom',
    triggerHook: 'onLeave',
    offset: '50%'
  })
  .setVelocity("#chapter-bottom .blurred-image", {opacity: 1}, {duration: 500, easing: "linear"})
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


  let sceneMap = new ScrollMagic.Scene({
    triggerElement: '#scene-google-map',
    triggerHook: 'onLeave',
    offset: '50%'
  })
  // .setPin("#scene-google-map")
  .addTo(controller);

  // define movement of panels
	let wipeAnimation = new TimelineMax()
    .to("#scene-birdview", 0.5, {height: "100%", backgroundColor : "#000"})

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

  // sidebar navigation controls
  $('.nav-icon').mouseover(function() {
    let btnId = this.id;
    $('.nav-description').velocity(
      {top: $(this).position().top,
      opacity: 1},
      {easing: 'easeInSine',
      duration: 300});

    switch(btnId) {
      case 'btn-banana':
        $('#nav-hover-id').text('1');
        $('#nav-title').text('旗山香蕉樹旁的爐碴');
        break;
      case 'btn-satellitemap':
        $('#nav-hover-id').text('2');
        $('#nav-title').text('農地淪陷事件簿');
        break;
      case 'btn-truck':
        $('#nav-hover-id').text('3');
        $('#nav-title').text('清走怎麼這麼難？');
        break;
      case 'btn-government':
        $('#nav-hover-id').text('4');
        $('#nav-title').text('中央出來面對！');
        break;
      case 'btn-rocks':
        $('#nav-hover-id').text('5');
        $('#nav-title').text('爐碴家族圖鑑');
        break;
      case 'btn-protester':
        $('#nav-hover-id').text('6');
        $('#nav-title').text('大家都驚死，只有她往前衝');
        break;
    }
  });

  $('.nav-icon').mouseout(function() {
    $('.nav-description').velocity("stop", true);
    $('.nav-description').velocity(
      {opacity: 0},
      {easing: 'easeInSine',
      duration: 50});
  });

});
