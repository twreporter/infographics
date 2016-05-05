'use strict';

function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

$(window).on('beforeunload', function(){
	// scroll to top of the page
  $(window).scrollTop(0);
});

$(document).ready(function(){

		// init
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

		// get all slides
		var slides = document.querySelectorAll("section.scroll-panel");
		var excludedSlides = [3, 6, 9];  // index of the excluded slides

		var sDuration = 140;
		if(isMobile()){
			sDuration = 170;
		}

		// create scene for every slide except for the first one, last two, and the excludedSlides
		for (var i=1; i<slides.length-2; i++) {

			(function(index) {
				var curIndex = index + 1;
				$('#slide' + (index+1) + ' .content-container').addClass('stay-fixed');

				if(excludedSlides.indexOf(curIndex) === -1){
					var sAnimation = new TimelineMax()
							 .fromTo("#slide" + curIndex + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
							 .fromTo("#slide" + (curIndex-1) + " .content-container", 3,  {opacity:0.8, scale: 0.75}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
							 	.to("#slide" + curIndex + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
								.to("#slide" + curIndex + " .content-container", 3,  {css:{opacity:0.8, scale: 0.75}, ease:Quad.easeInOut})
								.to("#slide" + curIndex + " .content-container .down-element", 2,  {css:{y: '90%', scale: 1.2, opacity:0}, ease:Quad.easeInOut});

					new ScrollMagic.Scene({
							triggerElement: "#slide" + curIndex,
							duration: sDuration+'%',
							triggerHook: 'onEnter'
						})
						.setPin('#slide' + curIndex)
						.setTween(sAnimation)
						.on('start', function () {
							// console.log('#slide' + curIndex );
							ga('send', 'event', 'interactive', 'scroll', '#slide' + curIndex);
							$('#slide' + curIndex + ' .content-container').addClass('content-show');
					  })
						.addTo(controller);
				}

			}(i));
		}

		for (var i=0; i<excludedSlides.length; i++) {
			(function(index) {
				var curIndex = excludedSlides[index];

				var sAnimation = new TimelineMax()
						 .fromTo("#slide" + curIndex + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
						 .fromTo("#slide" + (curIndex-1) + " .content-container", 3,  {opacity:0.8, scale: 0.6}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
							.to("#slide" + curIndex + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
							.to("#slide" + curIndex + " .content-container .sub-group, " +"#slide" + curIndex + " h2", 2,  {css:{y:"-20%", scale: 0.9}, ease:Quad.easeInOut})
							.to("#slide" + curIndex + " .content-container", 2,  {css:{opacity:0.8, scale: 1}, ease:Quad.easeInOut});

				new ScrollMagic.Scene({
						triggerElement: "#slide" + curIndex,
						duration: sDuration+'%',
						triggerHook: 'onEnter'
					})
					.setPin("#slide" + curIndex)
					.setTween(sAnimation)
					.on('start', function () {
						// console.log('#slide' + curIndex );
						ga('send', 'event', 'interactive', 'scroll', '#slide' + curIndex);
						$('#slide' + curIndex + ' .content-container').addClass('content-show');
					})
					.addTo(controller);

			}(i));
		}

		// control the ending slide
		$('#slide14 .content-container').addClass('stay-fixed');
		var endAnimation = new TimelineMax()
				 .fromTo("#slide14" + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, background:'#FFC543', ease:Sine.easeIn},  0)
				 .fromTo("#slide13" + " .content-container", 2,  {opacity:0.25, scale: 0.5}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
					.to("#slide14" + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
					.to("#slide14" + " .content-container .main-img-overlay", 2,  {css:{y: '50%', scale: 1.3, opacity: 0.6}, ease:Quad.easeInOut})
					.to("#slide14" + " .content-container", 1,  {css:{opacity:0, background:'white'}, ease:Quad.easeInOut});

		new ScrollMagic.Scene({
				triggerElement: "#slide14",
				duration: '280%',
				triggerHook: 'onLeave'
			})
			.setPin("#slide-end")
			.setTween(endAnimation)
			.on('start', function () {
				ga('send', 'event', 'interactive', 'scroll', '#slide14');
				$('#slide14' + ' .content-container').addClass('content-show');
			})
			.addTo(controller);




	});
