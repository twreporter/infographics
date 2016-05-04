$(function () { // wait for document ready
		// init
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

		// get all slides
		var slides = document.querySelectorAll("section.scroll-panel");

		// create scene for every slide
		for (var i=1; i<slides.length-2; i++) {

			(function(index) {
				$('#slide' + (index+1) + ' .content-container').addClass('stay-fixed');

				var sAnimation = new TimelineMax()
						 .fromTo("#slide" + (index+1) + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
						 .fromTo("#slide" + (index) + " .content-container", 2,  {opacity:0.25, scale: 0.5}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
						 	.to("#slide" + (index+1) + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
							.to("#slide" + (index+1) + " .content-container", 2,  {css:{opacity:0.25, scale: 0.5}, ease:Quad.easeInOut});

				new ScrollMagic.Scene({
						triggerElement: "#slide" + (index+1),
						duration: '260%',
						triggerHook: 'onLeave'
					})
					.setPin("#slide" + (index+1))
					.setTween(sAnimation)
					.on('start', function () {
						// $('#slide' + (index+1) + ' .content-container').removeClass('stay-fixed');
						$('#slide' + (index+1) + ' .content-container').addClass('content-show');
				  })
					.addTo(controller);
			}(i));


		}

		$('#slide14 .content-container').addClass('stay-fixed');
		var sAnimation = new TimelineMax()
				 .fromTo("#slide14" + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
				 .fromTo("#slide13" + " .content-container", 2,  {opacity:0.25, scale: 0.5}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
					.to("#slide14" + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
					.to("#slide14" + " .content-container .main-img-overlay", 2,  {css:{y: '50%', scale: 1.1}, ease:Quad.easeInOut})
					.to("#slide14" + " .content-container", 1,  {css:{opacity:0}, ease:Quad.easeInOut});

		new ScrollMagic.Scene({
				triggerElement: "#slide14",
				duration: '260%',
				triggerHook: 'onLeave'
			})
			.setPin("#slide-end")
			.setTween(sAnimation)
			.on('start', function () {
				$('#slide14' + ' .content-container').addClass('content-show');
			})
			.addTo(controller);

		// for (var i=0; i<slides.length-1; i++) {
		// 	new ScrollMagic.Scene({
		// 			triggerElement: "#slide" + (i+1),
		// 			duration: '150%',
		// 			triggerHook: 'onLeave',
		// 			// offset: '50%'
		// 		})
		// 		// .setPin("#slide" + (i+1) + " .content-container")
		// 	  .setPin("#slide" + (i+1))
		// 		.addTo(controller);
		// }

	// 	var sAnimation1 = new TimelineMax()
  //        .to("#slide1 > img", 0.5,  {css:{scale:0.05, opacity:0, rotation: 180}, ease:Quad.easeInOut});
	//
	// 	new ScrollMagic.Scene({
	// 			triggerElement: "#slide1",
	// 			triggerHook: 'onEnter'
	// 		})
	// 		.setPin("#slide1")
	// 		.setTween(sAnimation1)
	// 		.setClassToggle("#slide1 .content-container", "stay-fixed")
	// 		.addTo(controller);


	});
