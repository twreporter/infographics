'use strict';

function setActiveBars(activeCounts) {
  // controls the progress bar on the top
  $('#progress-nav').show();
  // $('.twr-quick-view').hide();
  // $('.twr-quick-view').velocity('transition.slideLeftout', { stagger: 250, duration: 1000 });

  $( '.progress > .progress-item' ).each(function( index ) {
    console.log( index + ": " + $( this ) );
    if(index < activeCounts) {
      $( this ).addClass('active');
    }else{
      $( this ).removeClass('active');
    }
  });
}

function playSlide0() {
  console.log('playSlide0');
  $('#progress-nav').hide();

  $('#yuan-welcome').velocity(
    {'opacity': [1, 0, 'linear'], 'margin-top': ['0', '100px']},
    { delay: 0, duration: 1000 }
  );

  $('.description-box').velocity(
    {'opacity': [1, 0, 'linear'], 'left': ['50%', '80%']},
    { delay: 0, duration: 1500 }
  );
}

function playSlide1() {
  console.log('playSlide1');
  setActiveBars(1);
}

function playSlide2() {
  console.log('playSlide2');
  setActiveBars(2);
}

function playSlide3() {
  console.log('playSlide3');
  setActiveBars(3);
}

function playSlide4() {
  console.log('playSlide4');
  setActiveBars(4);
}

function showSlide1Dialog(btn, message) {
  $('.twr-quick-view').show();
  console.log(message, $(btn).offset(), $(btn).width());
  var pos = $(btn).offset();
  $('#slide1-quickview').css({
    'top': pos.top, // selected button top value
    'left': pos.left, // selected button left value
    'width': $(btn).width(), // selected image width,
    'visibility': 'visible'
	})
	.velocity({
    'width': '100%',
    'left': 0, // ($(window).width - sliderFinalWidth)/2,
    'top': '6em' // ($(window).height - slider final height)/2,
	}, 600, 'ease', function(){
		//show quick view content
    $('#slide1-quickview .title').html(message);
	}).addClass('is-visible');
}

function scrollToInfoBox() {
  $('.info-box').velocity('scroll', {
    container: $('#slide1-quickview'),
    duration: 300,
    easing: 'easeInOutSine'
  });
}

$( document ).ready(function() {
  var slideTarget = window.location.hash.replace(/#/, '');
  switch (slideTarget) {
    case 'slide1':
      playSlide1();
      break;
    case 'slide2':
      playSlide2();
      break;
    case 'slide3':
      playSlide3();
      break;
    case 'slide4':
      playSlide4();
      break;
    default:
      // welcome screen
      playSlide0();
  }

});
