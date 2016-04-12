"use strict";

const ANIMATION = {
  fadeInUp: { opacity: [1, 0], translateY: [0, '100%']}
};

const SLIDE_POSITION = [0, 26, 40, 51, 62, 83, 99];
const TICK_POSITION = [100, 74, 60, 49, 38, 17, 1];
let birdviewSlider;

function enbaleSmoothScroll() {
  $('a[href*="#chapter"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });
}

function getClosest(number, array) {
  var cIndex = 0;
  var difference = Math.abs(number - array[0]);
  var index = array.length;
  while (index--) {
      var newDifference = Math.abs(number - array[index]);
      if (newDifference < difference) {
          difference = newDifference;
          cIndex = index;
      }
  }
  return cIndex;
}

function playBirdviewSlide(cIndex) {
  if(birdviewSlider) {
    for(let i=0; i<SLIDE_POSITION.length; i++){
      if(i !== cIndex) {
        $('#'+i+'-birdview').fadeTo('fast', 0);
      }
    }
    $('#'+cIndex+'-birdview').css('opacity', '1');

    // toggle slider to the closet position
    birdviewSlider.slider('setValue', 100-SLIDE_POSITION[cIndex]);
  }
}

function checkSlider(sid) {
  // check if it is the begin/end of the slider
  let $slider = $(sid);
  if ($slider.find('.item:first').hasClass('active')) {
    // begin of the slider
    $slider.find('.left-btn').attr('src', "images/left_btn.svg");
    $slider.find('.right-btn').attr('src', "images/right_btn_active.svg");
  } else if ($slider.find('.item:last').hasClass('active')) {
    // end of the slider
    $slider.find('.left-btn').attr('src', "images/left_btn_active.svg");
    $slider.find('.right-btn').attr('src', "images/right_btn.svg");
  } else {
    $slider.find('.left-btn').attr('src', "images/left_btn_active.svg");
    $slider.find('.right-btn').attr('src', "images/right_btn_active.svg");
  }
}

function enableBlurBackground(cid, controller) {
  new ScrollMagic.Scene({
    triggerElement: cid,
    triggerHook: 'onLeave',
    offset: '50%'
  })
  .setVelocity(cid+' .blurred-image', {opacity: 1}, {duration: 500, easing: 'linear'})
  .addTo(controller);
}

function setChapterActiveColor(cid, controller) {
  new ScrollMagic.Scene({
    triggerElement: '#chapter-0'+cid,
    triggerHook: 'onLeave',
    duration: '100%'
  })
  .setClassToggle("#btn-0"+cid, "active")
  .addTo(controller);
}


$( document ).ready(function() {
  let isBurgerOpen = false;

  // enable Bootstrap Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  $('.burger-icon').click(function() {
    isBurgerOpen = !isBurgerOpen;
    if(isBurgerOpen){
      $('.nav-container').show();
      $('.burger-icon').addClass('open');
    }else{
      $('.nav-container').hide();
      $('.burger-icon').removeClass('open');
    }
  });

  // set navlinks' height equal to width
  let navlinkWidth = $('.nav-icon').width();
  $('.nav-icon').css({'min-height': navlinkWidth+'px'});

  // initiate ScrollMagic
  let controller = new ScrollMagic.Controller();

  // enable smooth scrolling for the page
  enbaleSmoothScroll();

  let sceneIntro = new ScrollMagic.Scene({
    triggerElement: '#chapter-intro',
    triggerHook: 'onLeave',
    duration: '50%',
    offset: 10
  })
  .setPin('.article-location')
  .addTo(controller);

  // enable the blur effect for each chapter's cover
  for(let i=1; i<7; i++) {
    enableBlurBackground('#cover-0'+i, controller);
  }

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



  // enable carousel
  $('.carousel').carousel({
    interval: 2000
  });
  // enable mobile sliding
  $('.carousel').bcSwipe({ threshold: 50 });
  $('#environment-slider').on('slid.bs.carousel', function() {
    // check if it is the begin/end of the slider
    checkSlider('#environment-slider .carousel-inner');
  });
  $('#slag-slider').on('slid.bs.carousel', function() {
    // check if it is the begin/end of the slider
    checkSlider('#slag-slider .carousel-inner');
  });


  // sidebar navigation controls
  $('.nav-icon').mouseover(function() {
    let btnId = this.id;
    $('.nav-description').velocity(
      {top: $(this).position().top,
      opacity: 1},
      {easing: 'easeInSine',
      duration: 300});

    switch(btnId) {
      case 'btn-01':
        $('#nav-hover-id').text('1');
        $('#nav-title').text('香蕉樹旁埋爐碴？');
        break;
      case 'btn-02':
        $('#nav-hover-id').text('2');
        $('#nav-title').text('案發現場');
        break;
      case 'btn-03':
        $('#nav-hover-id').text('3');
        $('#nav-title').text('疑點重重');
        break;
      case 'btn-04':
        $('#nav-hover-id').text('4');
        $('#nav-title').text('碴不只一種');
        break;
      case 'btn-05':
        $('#nav-hover-id').text('5');
        $('#nav-title').text('中央出來面對！');
        break;
      case 'btn-06':
        $('#nav-hover-id').text('6');
        $('#nav-title').text('大家都驚死，只有她往前衝');
        break;
    }
  });

  // set active color for the navigation button
  for(let i=1; i<7; i++) {
    setChapterActiveColor(i, controller);
  }

  $('.nav-icon').mouseout(function() {
    $('.nav-description').velocity("stop", true);
    $('.nav-description').velocity(
      {opacity: 0},
      {easing: 'easeInSine',
      duration: 50});
  });

  // bird view
  let bvHeight = $(window).width()*65/110;
  $(".birdview-slider").css({'height': bvHeight*0.9,
                             'transform': 'translate(0,' + bvHeight*0.05+'px)'
  });

  birdviewSlider = $("#bvSlider").slider({
  	reversed : true,
    ticks: TICK_POSITION
  });


  // set slider to the nearest position
  $( "#bvSlider" ).on('slideStop', function() {
    let cValue = birdviewSlider.slider('getValue');
    let cIndex = getClosest(100-cValue, SLIDE_POSITION);
    console.log("birdviewSlider", cValue, cIndex);
    playBirdviewSlide(cIndex);

  });

  // END - bird view


});
