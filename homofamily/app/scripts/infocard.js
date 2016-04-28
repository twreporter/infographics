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
		for (var i=0; i<slides.length; i++) {
			new ScrollMagic.Scene({
					triggerElement: slides[i],
					duration: '160%'
				})
				.setPin(slides[i])
				.addTo(controller);
		}
	});
