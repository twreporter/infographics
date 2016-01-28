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
