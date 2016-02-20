'use strict';

let sParty = null;
let sCommittee = null;
let sPerson = null;
let sProb = 0;

const PARTY = {
  'B': {
    text: '藍'
  },
  'G': {
    text: '綠'
  },
  'Y': {
    text: '黃'
  },
  'O': {
    text: '橘'
  }
};

const COMMITTEE = {
  'FN': {
    text: '財政',
    job: '審查財政部、金管會等機關預算及其掌理事項的相關法案。例如你／妳可以推動財劃法修法，改善地方財政結構。',
    skill: '只要你夠厲害而且找到門路，你可能幫自己或別人向銀行「喬」超貸，若是幫別人喬，順便收一到三成回扣。另外，你也可能從官員那兒獲得股票內線消息，江湖傳言，過去有官員拿內線做人情給立委、因此朝野都吃得開，一路升官當到行政院長呢！'
  },
  'TR': {
    text: '交通',
    job: '審查交通部、NCC等機關預算及其掌理事項的相關法案。例如你／妳可以推動數位匯流相關法案，加速我國電視、電信、網路數位匯流腳步。',
    skill: '你以後搭飛機，若有本事可以凹華航幫你升等；還可以幫朋友要機票、車票做公關。如果你是區域立委，遊說台鐵在你選區多停幾班、讓高鐵多設一站，下次選舉就多幾項政績囉！另外，交通部主管工程多、油水多，如果你有朋友在包工程，可以幫幫他的忙。'
  },
  'IN': {
    text: '內政',
    job: '審查內政部、營建署、陸委會、中選會等機關預算及其掌理事項的相關法案。例如你／妳可以推動兩岸協議監督條例，落實兩岸協議監督機制法制化；也可以推動政黨法、不當黨產處理條例，落實轉型正義；或者推動補正公投法、破除鳥籠公投。',
    skill: '如果你跟你選區的議員、樁腳共謀要搞土地重劃，讓農地變更為商業用地，你可以透過刪除或凍結內政部、營建署預算當作武器，來「督促」內政部通過都市計畫。'
  },
  'EC': {
    text: '經濟',
    job: '審查經濟部、農委會、國發會、國營事業等機關預算及其掌理事項的相關法案。例如你／妳可以推動電業法修法，推動電業改革，切割台電發電、輸電、配售電業務。',
    skill: '你掌管國營事業預算，辦活動可以找台電贊助，除了有台電總部每年編定的敦睦基金能申請；如果你是區域立委，你選區內的電廠還有自行彈性運用、不受監督的回饋金，以後要服務選民，都不用花自己的錢呢！'
  },
  'ED': {
    text: '教育及文化',
    job: '審查教育部、文化部等機關預算及其掌理事項的相關法案。例如你／妳可以監督教育部未遵循程序正義推出的黑箱課綱，要求暫緩上路。',
    skill: '以後你再也不愁拿不到金馬獎、金鐘獎的門票囉！其他立委只能等你們拿完了，再看看有沒有剩。'
  },
  'WL': {
    text: '社會福利及衛生環境',
    job: '審查衛福部、環保署、勞動部等機關預算及其掌理事項的相關法案。例如你／妳可以推動長照保險法立法，推動長期照顧；也可以推動勞保年金改革。',
    skill: '勞動部掌管總數上兆的各項勞動基金、衛福部也掌管上千億的健保基金，環保署則有包括空汙、水汙染防治基金等，都提供很多補助的機會，你／妳可以幫各行各業朋友、選民申請補助，他們就會成為你未來選舉時的金主或票源！'
  },
  'DF': {
    text: '外交及國防',
    job: '審查外交部、國防部、僑委會、退輔會等機關預算及其掌理事項的相關法案。例如你／妳可以協助推動募兵制相關法案，解決我國募不到兵的問題。',
    skill: '你一年有好幾次出國交（ㄌㄩˇ）流（一ㄡˊ）的機會，到世界各地進行參訪、國會外交；在國內也有很多機會看到最新、最炫的國軍武器，還可以搭飛機到太平島考察、慰勞國軍喔！'
  },
  'LW': {
    text: '司法及法制',
    job: '審查司法院、監察院、考試院、總統府、法務部等機關預算及其掌理事項的相關法案。例如你／妳可以推動年金改革、司法改革相關法案、婚姻平權法案。',
    skill: '如果你犯過罪、有案在身，你會發現一進到這裡，你的案子就像是卷宗自動消失一樣，都判不下來了！不過等你卸任，就會突然又找到卷宗……。'
  }
};

function setActiveBars(activeCounts) {
  // controls the progress bar on the top
  $('#progress-nav').show();
  $('.twr-quick-view').hide();

  $( '.progress > .progress-item' ).each(function( index ) {
    if(index < activeCounts) {
      $( this ).addClass('active');
    }else{
      $( this ).removeClass('active');
    }
  });
}

function playSlide0() {
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

function getProbability() {
  let prob = 0;
  if(sParty !== 'B' && sCommittee === 'FN' || sCommittee === 'TR' || sCommittee === 'EC'){
    prob = 10;
  } else if (sCommittee === 'IN' || sCommittee === 'ED' || sCommittee === 'WL') {
    prob = 10;
  } else if (sCommittee === 'DF' || sCommittee === 'LW') {
    prob = 100;
  }
  sProb = prob;
  return prob;
}

function getResults() {
  console.log('sProb', sProb);
  if(sProb === 100){
    return true;
  } else if (sProb === 10){
    let num = Math.floor((Math.random() * 10) + 1);  // rand between 1~10
    console.log(num);
    if(num === 10){
      return true;
    }
  }
  return false;
}

function playSlide1() {
  $('.slide').hide();
  $('#slide1').show();
  location.hash = '#slide1';
  setActiveBars(1);
}

function playSlide2() {
  $('.slide').hide();
  $('#slide2').show();
  location.hash = '#slide2';
  setActiveBars(2);
}

function playSlide3() {
  let proText = '極低';
  if(getProbability() === 10) {
    proText = '只有一半';
  } else if (getProbability() === 100) {
    proText = '極高';
  }
  $('#slide3 .s-committee').text(COMMITTEE[sCommittee].text);
  $('#slide3 .s-job').text(COMMITTEE[sCommittee].job);
  $('#slide3 .s-skill').text(COMMITTEE[sCommittee].skill);
  $('#slide3 .s-party').text(PARTY[sParty].text);
  $('#slide3 .s-prob').text(proText);
  $('#slide3 .top-committee-icon').attr('src', 'images/committee-' + sCommittee + '.svg');
  $('.slide').hide();
  $('#slide3').show();
  location.hash = '#slide3';
  setActiveBars(3);
}

function playSlide4() {
  $('.slide').hide();
  $('#slide4').show();
  location.hash = '#slide4';
  setActiveBars(4);
}

function playSlide5() {
  $('.slide').hide();
  $('#slide5').show();
  location.hash = '#slide5';
  setActiveBars(5);
}

function playSlide6() {
  $('.slide').hide();
  $('#slide6').show();
  location.hash = '#slide6';
  setActiveBars(6);
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

function voteSlide1(btn, party) {
  sParty = party;
  playSlide2();
}

function voteSlide2(btn, committee) {
  sCommittee = committee;
  playSlide3();
}

function voteSlide3(){
  let res = getResults();
  if (res){
    playSlide6();
  } else {
    playSlide4();
  }
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
    case 'slide5':
      playSlide5();
      break;
    case 'slide6':
      playSlide6();
      break;
    default:
      // welcome screen
      playSlide0();
  }

});
