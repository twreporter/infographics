'use strict';

function setActiveBars(activeCounts) {
  // controls the progress bar on the top
  $('#progress-nav').show();
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

// function showSlide1Dialog(message) {
//   $('.twr-quick-view').css({
// 	    "top": topSelected, // this is the selected image top value
// 	    "left": leftSelected, // this is the selected image left value
// 	    "width": widthSelected, // this is the selected image width
// 	}).velocity({
// 		//animate the quick view: animate its width and center it in the viewport
// 		//during this animation, only the slider image is visible
// 	    'width': sliderFinalWidth+'px',
// 	    'left': finalLeft+'px', // ($(window).width - sliderFinalWidth)/2,
// 	    'top': finalTop+ 'px', // ($(window).height - slider final height)/2,
// 	}, 1000, [ 400, 20 ])
// 	.velocity({
// 		'width': quickViewWidth+'px', // 80% of the viewport
// 		'left': quickViewLeft+'px', // 10% of the viewport
// 	}, 300, 'ease', function(){
// 		//show quick view content
// 		$('.twr-quick-view').addClass('add-content');
// 	}).addClass('is-visible');
// }

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
