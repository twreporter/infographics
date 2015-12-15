$(function () { // wait for document ready

	/*
	 *  Variables
	 */
	var windowHeight = $(window).innerHeight();
	var defaultDuration = 1.8 * windowHeight;

 	var path = $('#animated_path path')[0];
 	var length = path.getTotalLength();

	path.style.transition = path.style.WebkitTransition = 'none';
	path.style.strokeDasharray = length + ' ' + length;
	path.style.strokeDashoffset = length;

	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave'
		}
	});

	// change behaviour of controller to animate scroll instead of jump
	controller.scrollTo(function (newpos) {
		TweenLite.to(window, 1, {scrollTo: {y: newpos}});
	});

	/*
	 *  bind scroll to anchor links
	 */
	$(document).on("click", "a[href^='#']", function (e) {
		var id = $(this).attr("href");
		if ($(id).length > 0) {
			e.preventDefault();

			// trigger scroll
			controller.scrollTo(id);

				// if supported by the browser we can even update the URL.
			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id);
			}
		}
	});

	var sectionName, sceneHeight, boxName;

	/*
	 * Page 2
	 */
	 	sectionName = '#p-2';
		sceneHeight = $(sectionName).innerHeight();
		boxName = '#box1';
	 	TweenLite.to(boxName, 1, {y: windowHeight, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1.25*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 2, {y: -1.5*windowHeight, transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		// move out
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 1*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		//.addIndicators({name:"scene p-6"})
		.addTo(controller);

	/*
	 * Page 3
	 */
	 	sectionName = '#p-3';
		sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({triggerElement: sectionName, duration: 2*windowHeight, offset: 0})
		.setTween(
			new TimelineLite()
			.insert(TweenLite.to(sectionName+'-map', 1, {css:{scale: 1.1}}),0)
			.insert(TweenLite.to(sectionName+'-route', 1, {css:{scale: 1.1}}),0)
			.insert(TweenLite.to(sectionName+'-label-small', 1, {css:{scale: 1.15}}),0)
			.insert(TweenLite.to(sectionName+'-label-large', 1, {css:{scale: 1.2}}),0)
		)
		.addTo(controller);

		boxName = '#box2';
	 	TweenLite.to(boxName, 1,  {opacity: 0} ); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 0.5*windowHeight, offset: 0.25*windowHeight})
		.setTween(TweenLite.to(boxName, 1, {autoAlpha: 1} ))
		.addTo(controller);

		// move out
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 2*windowHeight-1
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);

	/*
	 * Page 4
	 */
	 	sectionName = '#p-4';
	 	sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: windowHeight-1
		})
		.setPin("#p-4")
		.on("enter", function () {
			$('#bgvid')[0].play();
			$('#bgvid')[0].volume = 0;
			$('#bgvid')[0].muted = true;
		})
		.on("leave", function () {
			$('#bgvid')[0].pause();
		})
		.addTo(controller);

	/*
	 * Page 5 - 6
	 */

		new ScrollMagic.Scene({
			triggerElement: "#p-5", duration: 200, offset: -200
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: length}}, {css:{strokeDashoffset: 1760}}))
	 	)
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-5", duration: 200, offset: 300
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		.addTo(controller);

	/*
	 * Page 6
	 */
	 	sectionName = '#p-6';
		sceneHeight = $(sectionName).innerHeight();

		boxName = '#box3';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1.25*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 2, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		// move out
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.5*sceneHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		//.addIndicators({name:"scene p-6"})
		.addTo(controller);

	/*
	 * Page 7
	 */
		sectionName = '#p-7';
		sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 1760}}, {css:{strokeDashoffset: 1490}}))
	 	)
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.25*windowHeight, offset: 0
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		.addTo(controller);

	/*
	 * Page 8
	 */
	 	sectionName = '#p-8';
		sceneHeight = $(sectionName).innerHeight();

		// move out
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 3*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-8-1', 1, {autoAlpha: 0}))
	    //.addindicators({name:"#p-8-1 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-9', 1, {autoAlpha: 0}))
	    //.addindicators({name:"#p9 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 2.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-10-1', 1, {autoAlpha: 0}))
	    //.addindicators({name:"#p-10-1 fade"})
	    .addTo(controller)

	    boxName = '#box4';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		boxName = '#box5';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: windowHeight})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	/*
	 * Page 11
	 */
	 	sectionName = '#p-11';
		sceneHeight = $(sectionName).innerHeight();

		boxName = '#box6';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1.25*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 2, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		// move out
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.5*sceneHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		//.addIndicators({name:"scene p-11"})
		.addTo(controller);

	/*
	 * Page 12-13
	 */
	 	sectionName = '#p-12';
		sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.5*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 2, {css:{strokeDashoffset: 1490}}, {css:{strokeDashoffset: 1300}}))
	 	)
		.addTo(controller);

		sectionName = '#p-13';
		sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.25*windowHeight, offset: 0
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		.addTo(controller);

	/*
	 * Page 14
	 */
	 	sectionName = '#p-14';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 6*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-14-1', 1, {autoAlpha: 0}))
	    //.addindicators({name:"#p-14-1 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 3.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-14-2', 1, {autoAlpha: 0}))
	    //.addindicators({name:"#p-14-2 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 5.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-15-1', 1, {autoAlpha: 0}))
	    //.addindicators({name:"#p-15-1 fade"})
	    .addTo(controller)

	   	boxName = '#box7';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 2*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 2, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		boxName = '#box8';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 2*windowHeight, offset: 4*windowHeight})
		.setTween(TweenLite.to(boxName, 2, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	/*
	 * Page 16
	 */
	 	sectionName = '#p-16';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);


		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-16-1', 1, {autoAlpha: 0}))
	    .addTo(controller)

	/*
	 * Page 17
	 */
		new ScrollMagic.Scene({
			triggerElement: "#p-17", duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 1300}}, {css:{strokeDashoffset: 1170}}))
	 	)
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-17-2", duration: 0.25*windowHeight, offset: 0
		})
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 1170}}, {css:{strokeDashoffset: 1100}}))
	 	)
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-18", duration: 0.25*windowHeight, offset: -windowHeight
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		.addTo(controller);

	/*
	 * Page 18
	 */
	 	sectionName = '#p-18';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 3*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);


		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-18-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-18-1 fade"})
	    .addTo(controller)

	    boxName = '#box9';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		boxName = '#box10';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 2*windowHeight})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	/*
	 * Page 20
	 */

	 	sectionName = '#p-20';
		sceneHeight = $(sectionName).innerHeight();

	    boxName = '#box11';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 2*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);


		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-20-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-20-1 fade"})
	    .addTo(controller);


	/*
	 * Page 21
	 */
	 	sectionName = '#p-21';
	 	sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({
			triggerElement: "#p-21", duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 1100}}, {css:{strokeDashoffset: 1030}}))
	 	)
		//.addIndicators({name:"#trigger"})
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-22", duration: 0.25*windowHeight, offset: -0.75*windowHeight
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		//.addIndicators({name:"#map"})
		.addTo(controller);

	/*
	 * Page 22
	 */
	 	sectionName = '#p-22';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 3*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-22-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-22-1 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-23-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-23-1 fade"})
	    .addTo(controller)

	    boxName = '#box12';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		boxName = '#box13';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: windowHeight})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	/*
	 * Page 25
	 */
		new ScrollMagic.Scene({
			triggerElement: "#p-25", duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 1030}}, {css:{strokeDashoffset: 800}}))
	 	)
		//.addIndicators({name:"#trigger"})
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-25", duration: 0.25*windowHeight, offset: 0.25*windowHeight
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		//.addIndicators({name:"#map"})
		.addTo(controller);

	/*
	 * Page 26
	 */
	 	sectionName = '#p-26';
		sceneHeight = $(sectionName).innerHeight();

	    boxName = '#box14';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 2*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);


		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-26-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-26-1 fade"})
	    .addTo(controller);
	/*
	 * Page 28
	 */
		new ScrollMagic.Scene({
			triggerElement: "#p-28", duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 800}}, {css:{strokeDashoffset: 670}}))
	 	)
		//.addIndicators({name:"#trigger"})
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-28", duration: 0.5*windowHeight, offset: 0.25*windowHeight
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		//.addIndicators({name:"#map"})
		.addTo(controller);

	/*
	 * Page 29
	 */
	 	sectionName = '#p-29';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 4*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);


		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-29-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-29-1 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-29-2', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-29-2 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 2.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-30-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-30-1 fade"})
	    .addTo(controller)

	    boxName = '#box15';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: windowHeight})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	    boxName = '#box16';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 3*windowHeight})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	/*
	 * Page 31
	 */
	 	sectionName = '#p-31';
	 	sceneHeight = $(sectionName).innerHeight();

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 1} ))
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: sceneHeight
		})
		.on('enter', function() {
			$('audio')[0].play();
		})
		.on('leave', function() {
			$('audio')[0].pause();
		})
		.addTo(controller);

	/*
	 * Page 32
	 */
		new ScrollMagic.Scene({
			triggerElement: "#p-32", duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 670}}, {css:{strokeDashoffset: 610}}))
	 	)
		//.addIndicators({name:"#trigger"})
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-32", duration: 0.5*windowHeight, offset: 0.25*windowHeight
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		//.addIndicators({name:"#map"})
		.addTo(controller);

	/*
	 * Page 33
	 */
	 	sectionName = '#p-33';
		sceneHeight = $(sectionName).innerHeight();
		// move out
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: sceneHeight*0.5
		})
		.setPin(sectionName, {pushFollowers: false})
		//.addIndicators({name:"scene p-6"})
		.addTo(controller);

	/*
	 * Page 35
	 */
	 	sectionName = '#p-35';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 3*windowHeight
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);


		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-35-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-35-1 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-36-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-36-1 fade"})
	    .addTo(controller)

	    boxName = '#box17';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	    boxName = '#box18';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: windowHeight})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

	/*
	 * Page 38
	 */
		new ScrollMagic.Scene({
			triggerElement: "#p-38", duration: 0.25*windowHeight, offset: -0.25*windowHeight
		})
		.setPin("#map")
		.setTween(
			new TimelineLite()
	 		.add(TweenLite.to("#map", 1, {autoAlpha: 1} ))
	 		.add(TweenLite.fromTo("#animated_path path", 1, {css:{strokeDashoffset: 610}}, {css:{strokeDashoffset: 0}}))
	 	)
		//.addIndicators({name:"#trigger"})
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#p-38", duration: 0.5*windowHeight, offset: 0.25*windowHeight
		})
		.setTween(TweenLite.to("#map", 1, {autoAlpha: 0} ))
		//.addIndicators({name:"#map"})
		.addTo(controller);

	/*
	 * Page 39
	 */
	 	sectionName = '#p-39';
		sceneHeight = $(sectionName).innerHeight();

		// scene used to pin the container
		new ScrollMagic.Scene({
			triggerElement: sectionName, duration: 2*windowHeight, offset: 0
		})
		.setPin(sectionName, {pushFollowers: false})
		.addTo(controller);

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 0.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-39-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-39-1 fade"})
	    .addTo(controller)

		new ScrollMagic.Scene({
		    triggerHook: 0,
		    triggerElement: sectionName,
		    offset: 1.5*windowHeight,
		    duration: 0.5*windowHeight
		})
	    .setTween(TweenLite.to('#p-40-1', 1, {autoAlpha: 0}))
	    //.addIndicators({name:"#p-40-1 fade"})
	    .addTo(controller)

	   	boxName = '#box19';
	 	TweenLite.to(boxName, 1, {y: 0, transformOrigin:"0% 100%"}); 
		new ScrollMagic.Scene({triggerElement: sectionName, duration: 1*windowHeight, offset: 0})
		.setTween(TweenLite.to(boxName, 1, {y: -(windowHeight+$(boxName).innerHeight()), transformOrigin:"0% 100%"} ))
		//.addIndicators({name:boxName}) // add indicators (requires plugin)
		.addTo(controller);

});