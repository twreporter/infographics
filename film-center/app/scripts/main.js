let lastScrollTop = 0;

let vpWidth = $(window).width();
let vpHeight = $(window).height();

// let canvideo = new CanvasVideo('testCanvas', 2000, 1126);
// canvideo.drawImage('./images/daan.jpg');

let canvideo = new CanvasVideo('testCanvas', 1000, 563);
// canvideo.playClip('./images/myvideo.jpg', 6, 12, 5, false, 0, () => {
//     canvideo.drawImage('./images/endImage.jpg')
// });


// let canvasWidth = 1000;
// let canvasHeight = 563;
let canvasWidth = 600;
let canvasHeight = 338;

let cvProcess1 = new CanvasVideo('process1', canvasWidth, canvasHeight);
cvProcess1.playClip('./images/mobile/process1.jpg', 6, 47, 15, false, null, null);

let cvProcess2 = new CanvasVideo('process2', canvasWidth, canvasHeight);
cvProcess2.playClip('./images/mobile/process2.jpg', 6, 47, 15, false, null, null);

let cvProcess3 = new CanvasVideo('process3', canvasWidth, canvasHeight);
cvProcess3.playClip('./images/mobile/process3.jpg', 6, 47, 15, false, null, null);

let cvProcess4 = new CanvasVideo('process4', canvasWidth, canvasHeight);
cvProcess4.playClip('./images/mobile/process4.jpg', 6, 47, 15, false, null, null);


// let processTops = [];

function getScrollRatio(st, top, height) {
    let ret = (st - top) / height;
    if (ret < 0) return 0;
    if (ret > 1) return 0.9999999;
    return ret;
}

// for (let i = 1; i <= 4; i++) {
//     processTops.push($('#restorationBox' + i).position().top);
// }

let earthTop = $('#g-earth').position().top;
let earthFrameId = 0;
let isReverse = false;

$(window).scroll(function(event) {
    let st = $(this).scrollTop();
    if (st > lastScrollTop) {
        // downscroll code
        isReverse = false;
    } else {
        // upscroll code
        isReverse = true;
    }

    let earthScrollLength = canvasHeight * 6;
    if (st >= earthTop && st < earthTop + earthScrollLength) {
        let curFrame = Math.floor(43 * getScrollRatio(st, earthTop, earthScrollLength))
        if (curFrame !== earthFrameId) {
            // console.log(getScrollRatio(st, earthTop, earthScrollLength), curFrame);
            canvideo.stopVideo();
            canvideo.playFrames('./images/daan_taiwan.jpg', 6, 43, 5, 0, 0, earthFrameId, curFrame, null);
            earthFrameId = curFrame;
        }

        $('#g-earth').addClass('fixed');
    } else {
        $('#g-earth').removeClass('fixed');
    }

    // if (st >= processTops[0] && st < processTops[0] + canvasHeight * 2) {
    //     console.log('st >= processTops[0]', (st - processTops[0]), (st - processTops[0]) / canvasHeight);
    //     $('#restorationBox1').addClass('fixed');
    //     // $('#restorationBox1').css('margin-bottom', getReverseScrollPercentage(st, processTops[0]) + 'vh')
    //     $('#restorationBox2').removeClass('fixed');
    //     $('#restorationBox3').removeClass('fixed');
    //     $('#restorationBox4 ').removeClass('fixed');
    // } else if (st >= processTops[1] && st < processTops[1] + canvasHeight * 2) {
    //     $('#restorationBox2 ').addClass('fixed');
    //     $('#restorationBox1 ').removeClass('fixed');
    //     $('#restorationBox3 ').removeClass('fixed');
    //     $('#restorationBox4 ').removeClass('fixed');
    // } else if (st >= processTops[2] && st < processTops[2] + canvasHeight * 2) {
    //     $('#restorationBox3 ').addClass('fixed');
    //     $('#restorationBox1 ').removeClass('fixed');
    //     $('#restorationBox2 ').removeClass('fixed');
    //     $('#restorationBox4 ').removeClass('fixed');
    // } else if (st >= processTops[3] && st < processTops[3] + canvasHeight * 2) {
    //     $('#restorationBox4 ').addClass('fixed');
    //     $('#restorationBox1 ').removeClass('fixed');
    //     $('#restorationBox2 ').removeClass('fixed');
    //     $('#restorationBox3 ').removeClass('fixed');
    // } else {
    //     $('#restorationBox1 ').removeClass('fixed');
    //     $('#restorationBox2 ').removeClass('fixed');
    //     $('#restorationBox3 ').removeClass('fixed');
    //     $('#restorationBox4 ').removeClass('fixed');
    // }


    lastScrollTop = st;
});




// init controller

var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave',
        duration: '200%'
    }
});


// // google earth
// new ScrollMagic.Scene({
//         triggerElement: '#g-earth',
//         triggerHook: 'onLeave'
//     })
//     .setPin('#g-earth canvas')
//     .reverse(true)
//     .on('start', function() {
//         console.log('on START!!!')
//         let isReverse = (scrollDirection > 0) ? false : true;
//         canvideo.playClip('./images/myvideo.jpg', 6, 12, 5, isReverse, 0, null);
//         // canvideo.playClip('./images/daan_taiwan.jpg', 6, 43, 60, false, 0, () => {
//         //     canvideo.drawImage('./images/taiwan.jpg')
//         // });
//     })
//     .setTween('#g-earth .description', {
//         top: '0%',
//         ease: Linear.easeNone
//     })
//     .addTo(controller);

// build scenes for the restoration process 
for (let i = 1; i <= 4; i++) {
    new ScrollMagic.Scene({
            triggerElement: '#restorationBox' + i,
            duration: '100%'
        })
        .setPin('#restorationBox' + i)
        .setTween('#restorationBox' + i + ' > .description', {
            top: '0%',
            ease: Linear.easeNone
        })
        .addTo(controller);
}


// cvProcess1.playFrames('./images/mobile/process1.jpg', 6, 47, 15, false, 0, 5, 15, null);