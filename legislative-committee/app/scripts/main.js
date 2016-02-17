'use strict';

let sParty = null;
let sPerson = null;

function setActiveBars(activeCounts) {
  // controls the progress bar on the top
  $('#progress-nav').show();
  $('.twr-quick-view').hide();
  // $('.twr-quick-view').velocity('transition.slideLeftout', { stagger: 250, duration: 1000 });

  $( '.progress > .progress-item' ).each(function( index ) {
    if(index < activeCounts) {
      $( this ).addClass('active');
    }else{
      $( this ).removeClass('active');
    }
  });
}

function playSlide0() {
  // console.log('playSlide0');
  $('.slide').hide();
  $('#slide0').show();
  $('#progress-nav').hide();

  $('#yuan-welcome').velocity(
    {'opacity': [1, 0, 'linear'], 'margin-top': ['0', '100px']},
    { delay: 0, duration: 1000 }
  );

  $('.description-box').velocity(
    {'opacity': [1, 0, 'linear']
    // ,'left': ['50%', '80%']
    },
    { delay: 0, duration: 1500 }
  );
}

function playSlide1() {
  // console.log('playSlide1');
  $('.slide').hide();
  $('#slide1').show();
  setActiveBars(1);
}

function playSlide2() {
  // console.log('playSlide2');
  $('.slide').hide();
  $('#slide2').show();
  setActiveBars(2);
}

function playSlide3() {
  // console.log('playSlide3');
  $('.slide').hide();
  $('#slide3').show();
  setActiveBars(3);
}

function playSlide4() {
  // console.log('playSlide4');
  $('.slide').hide();
  $('#slide4').show();
  setActiveBars(4);
}

function showDialogAnimation(dialog, btn, callback) {
  dialog.show();
  dialog.animate({ scrollTop: 0 }, 'fast');
  var pos = $(btn).offset();
  dialog.css({
    'top': pos.top, // selected button top value
    'left': pos.left, // selected button left value
    'width': $(btn).width(), // selected image width,
    'visibility': 'visible'
	})
	.velocity({
    'width': '100%',
    'left': 0, // ($(window).width - sliderFinalWidth)/2,
    'top': '5.5em' // ($(window).height - slider final height)/2,
	}, 800, 'ease', callback).addClass('is-visible');
}

function showSlide1Dialog(btn, message) {
  $('#slide1-quickview .title').html(message);
  showDialogAnimation($('#slide1-quickview'), btn, function(){
		//show quick view content
	});
}

function showSlide2Dialog(btn, party) {
  switch(party) {
    case 'B':
      $('#slide2-quickview .title').html('<p>所有藍黨立委已經在上週開過黨團會議，會中決議支持藍黨的賴小葆為立法院長。</p>');
      $('#slide2-quickview .middle-pic').attr({src: 'images/decision-blue.svg'});
      sParty = 'B';
      break;
    case 'Y':
      $('#slide2-quickview .title').html('<p>所有黃黨立委已經在上週開過黨團會議，由於黃黨無人表達角逐院長意願，會中決議一致支持綠黨的蘇小全為立法院長。</p>');
      $('#slide2-quickview .middle-pic').attr({src: 'images/decision-green.svg'});
      // sParty = 'Y';
      sParty = 'G'; // deal with yellow party -> they should vote for the green
      break;
    case 'G':
      $('#slide2-quickview .title').html('<p>所有綠黨立委已經在上週開過黨團會議，會中決議支持綠黨的蘇小全為立法院長。</p>');
      $('#slide2-quickview .middle-pic').attr({src: 'images/decision-green.svg'});
      sParty = 'G';
      break;
    case 'O':
      $('#slide2-quickview .title').html('<p>所有橘黨立委已經在上週開過黨團會議，由於橘黨無人表達角逐院長意願，會中決議開放黨籍立委自主投票。</p>');
      $('#slide2-quickview .middle-pic').attr({src: 'images/decision-orange.svg'});
      sParty = 'O';
      break;
  }
  showDialogAnimation($('#slide2-quickview'), btn, function(){
		//show quick view content
	});
}

function showSlide3Dialog(btn) {
  showDialogAnimation($('#slide3-quickview'), btn, function(){
		//show quick view content
	});
}

function voteSlide3(person) {
  sPerson = person;
  if(sParty === 'O') {
    // orange party
    playSlide4();
    location.hash = '#slide4';
    // $('#success-btn').trigger('click');
    showSlide4Dialog($('#success-btn'), 'S');
    console.log("orange")
  } else {
    playSlide4();
  }
  location.hash = '#slide4';
}

function showSlide4Dialog(btn, choice) {
  let success = false;
  console.log(choice, sParty, sPerson);
  if(choice === 'S' && (sParty === 'O' || sPerson === sParty) && sParty != null && sPerson != null) {
    success = true;
  }

  if(success){
    $('#result-success').show();
    $('#result-fail').hide();
  }else{
    $('#result-success').hide();
    $('#result-fail').show();
  }
  showDialogAnimation($('#slide4-quickview'), btn, function(){
		//show quick view content
	});
}

function scrollToInfoBox(_c) {
  $(_c).find('.info-box').velocity('scroll', {
    container: $(_c),
    duration: 300,
    easing: 'easeInOutSine'
  });
}

function replayGame() {
  window.location.href = '';
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
