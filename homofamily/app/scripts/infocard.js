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
		for (var i=1; i<slides.length-1; i++) {
			var sAnimation = new TimelineMax()
					//  .from("#slide" + (i+1) + " .content-container", 1,  {css:{opacity:0, scale: 0.5}, ease:Quad.easeInOut})
	         .fromTo("#slide" + (i+1) + " .content-container", 1,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Quad.easeOut},  0)
					//  .to("#slide" + (i+1) + " .content-container", 1,  {css:{opacity:0.5, scale: 0.8}, ease:Quad.easeInOut});

			new ScrollMagic.Scene({
					triggerElement: "#slide" + (i+1),
					// duration: '200%',
					triggerHook: 'onLeave',
					offset: '50%'
				})
				.setPin("#slide" + (i+1))
				.setClassToggle("#slide" + (i+1) + " .content-container", "stay-fixed")
				.setTween(sAnimation)
				.addTo(controller);
		}

		// for (var i=0; i<slides.length-1; i++) {
		// 	new ScrollMagic.Scene({
		// 			triggerElement: "#slide" + (i+1) + " .content-container",
		// 			// duration: '120%',
		// 			triggerHook: 'onLeave',
		// 			offset: '50%'
		// 		})
		// 		// .setPin("#slide" + (i+1) + " .content-container")
		// 	  .setClassToggle("#slide" + (i+1) + " .content-container", "stayFixed")
		// 		.addTo(controller);
		// }

		var sAnimation1 = new TimelineMax()
         .to("#slide1 > img", 0.5,  {css:{scale:0.05, opacity:0, rotation: 180}, ease:Quad.easeInOut});

		new ScrollMagic.Scene({
				triggerElement: "#slide1",
				triggerHook: 'onEnter'
			})
			.setPin("#slide1")
			.setTween(sAnimation1)
			.setClassToggle("#slide1 .content-container", "stay-fixed")
			.addTo(controller);
	});
