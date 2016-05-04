$(function () { // wait for document ready
		// init
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

		// get all slides
		var slides = document.querySelectorAll("section.scroll-panel");
		var excludedSlides = [3, 6, 9];  // index of the excluded slides

		// create scene for every slide except for the first one, last two, and the excludedSlides
		for (var i=1; i<slides.length-2; i++) {

			(function(index) {
				var curIndex = index + 1;
				$('#slide' + (index+1) + ' .content-container').addClass('stay-fixed');

				if(excludedSlides.indexOf(curIndex) === -1){
					var sAnimation = new TimelineMax()
							 .fromTo("#slide" + curIndex + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
							 .fromTo("#slide" + (curIndex-1) + " .content-container", 2,  {opacity:0.25, scale: 0.5}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
							 	.to("#slide" + curIndex + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
								.to("#slide" + curIndex + " .content-container", 2,  {css:{opacity:0.25, scale: 0.5}, ease:Quad.easeInOut});

					new ScrollMagic.Scene({
							triggerElement: "#slide" + curIndex,
							duration: '260%',
							triggerHook: 'onLeave'
						})
						.setPin("#slide" + curIndex)
						.setTween(sAnimation)
						.on('start', function () {
							// $('#slide' + (index+1) + ' .content-container').removeClass('stay-fixed');
							$('#slide' + curIndex + ' .content-container').addClass('content-show');
					  })
						.addTo(controller);
				}

			}(i));
		}

		for (var i=0; i<excludedSlides.length; i++) {
			(function(index) {
				var curIndex = excludedSlides[index];
				console.log('curIndex', curIndex);

				var sAnimation = new TimelineMax()
						 .fromTo("#slide" + curIndex + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
						 .fromTo("#slide" + (curIndex-1) + " .content-container", 2,  {opacity:0.25, scale: 1}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
							.to("#slide" + curIndex + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
							.to("#slide" + curIndex + " .content-container .sub-group", 2,  {css:{y:"-10%", scale: 1.2}, ease:Quad.easeInOut})
							.to("#slide" + curIndex + " .content-container", 1,  {css:{opacity:0.25, scale: 1}, ease:Quad.easeInOut});

				new ScrollMagic.Scene({
						triggerElement: "#slide" + curIndex,
						duration: '260%',
						triggerHook: 'onLeave'
					})
					.setPin("#slide" + curIndex)
					.setTween(sAnimation)
					.on('start', function () {
						// $('#slide' + (index+1) + ' .content-container').removeClass('stay-fixed');
						$('#slide' + curIndex + ' .content-container').addClass('content-show');
					})
					.addTo(controller);

			}(i));
		}

		// control the ending slide
		$('#slide14 .content-container').addClass('stay-fixed');
		var endAnimation = new TimelineMax()
				 .fromTo("#slide14" + " .content-container", 2,  {opacity:0, scale: 0.8}, {opacity:1, scale: 1, ease:Sine.easeIn},  0)
				 .fromTo("#slide13" + " .content-container", 2,  {opacity:0.25, scale: 0.5}, {opacity:0, scale: 0.5, ease:Power4.easeOut},  0)
					.to("#slide14" + " .content-container", 3,  {css:{opacity:1, scale:1}, ease:Quad.easeInOut})
					.to("#slide14" + " .content-container .main-img-overlay", 2,  {css:{y: '50%', scale: 1.2}, ease:Quad.easeInOut})
					.to("#slide14" + " .content-container", 1,  {css:{opacity:0}, ease:Quad.easeInOut});

		new ScrollMagic.Scene({
				triggerElement: "#slide14",
				duration: '260%',
				triggerHook: 'onLeave'
			})
			.setPin("#slide-end")
			.setTween(endAnimation)
			.on('start', function () {
				$('#slide14' + ' .content-container').addClass('content-show');
			})
			.addTo(controller);




	});
