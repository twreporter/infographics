"use strict";

const ANIMATION = {
  fadeInUp: { opacity: [1, 0], translateY: [0, '100%']}
};

const SLIDE_POSITION = [3, 26, 40, 51, 62, 83, 96];
const TICK_POSITION = [97, 74, 60, 49, 38, 17, 4];
let birdviewSlider;

let birdviewTimeouts = [];

function setBirdViewAnimation() {
  for(let i = 0; i <= 6; i++) {
    (function(index) {
        let timer = window.setTimeout(function() {
          playBirdviewSlide(index);
        }, i * 2000);
        birdviewTimeouts.push(timer);
    })(i);
  }

}
function clearBirdViewAnimation() {
  for(let i = 0; i <= 7; i++) {
    window.clearTimeout(birdviewTimeouts[i]);
  }
  birdviewTimeouts = [];
}

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
  number = number - 5;
  if (number < 0) {
    number = 0;
  }

  var difference = 10000;
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
  $('.birdview-box').css('z-index', 0);
  if(birdviewSlider) {
    for(let i=0; i<SLIDE_POSITION.length; i++){
      if(i !== cIndex) {
        $('#'+i+'-birdview').fadeTo('fast', 0);
      }
    }
    $('#'+cIndex+'-birdview').css('opacity', '1');
    $('#'+cIndex+'-birdview').css('z-index', 5);

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
    triggerHook: 'onEnter',
    offset: 120,
    duration: $('#chapter-0'+cid).height()+130
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

  // enable the blur effect for each chapter's cover
  for(let i=1; i<7; i++) {
    enableBlurBackground('#cover-0'+i, controller);
  }

  let gSoil = new ScrollMagic.Scene({
    triggerElement: '#g-soil',
    triggerHook: 'onEnter',
    offset: 0
  })
  .on('start', function () {
    $(".soil-bottom").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 300});
    $(".soil-middle").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 600});
    $(".soil-top").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 1000});
    $(".soil-tree").velocity(ANIMATION.fadeInUp, {delay: 100, duration: 1200});
  })
  .addTo(controller);

  let gBirdview = new ScrollMagic.Scene({
    triggerElement: '#scene-birdview',
    triggerHook: 'onEnter',
    offset: 0
  })
  .on('start', function () {
    clearBirdViewAnimation();
    setBirdViewAnimation();
  })
  .addTo(controller);


  // enable carousel
  $('.carousel').carousel({interval: false});
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
        $('#nav-hover-id').text('1-1');
        $('#nav-title').text('香蕉樹旁埋爐碴？');
        break;
      case 'btn-02':
        $('#nav-hover-id').text('1-2');
        $('#nav-title').text('案發現場');
        break;
      case 'btn-03':
        $('#nav-hover-id').text('1-3');
        $('#nav-title').text('疑點重重');
        break;
      case 'btn-04':
        $('#nav-hover-id').text('2-1');
        $('#nav-title').text('碴不只一種');
        break;
      case 'btn-05':
        $('#nav-hover-id').text('2-2');
        $('#nav-title').text('中央出來面對！');
        break;
      case 'btn-06':
        $('#nav-hover-id').text('人物');
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

  // bird view
  $('#scene-birdview').css('min-height', $('#6-birdview').height());

  let bvHeight = $('#1-birdview .birdview-img-box').height();
  $(".birdview-slider").css({'height': bvHeight*0.8,
                             'transform': 'translate(0,' + bvHeight*0.1+'px)'
  });

  birdviewSlider = $("#bvSlider").slider({
  	reversed : true,
    ticks: TICK_POSITION
  });

  // set slider to the nearest position
  $( "#bvSlider" ).on('slideStop', function() {
    let cValue = birdviewSlider.slider('getValue');
    let cIndex = getClosest(100-cValue, SLIDE_POSITION);
    playBirdviewSlide(cIndex);

  });
  // END - bird view

  // set active color for the navigation button
  for(let i=1; i<7; i++) {
    setChapterActiveColor(i, controller);
  }

});
