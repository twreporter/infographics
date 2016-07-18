let vpWidth = $(window).width();
let vpHeight = $(window).height();

let tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// creates an <iframe> (and YouTube player) after the API code downloads
let ytPlayer;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('player', {
        videoId: 'zmtTBCqGNpw',
        width: vpWidth,
        height: 0.85 * vpHeight
    });
}


$(document).ready(function() {
    let lastScrollTop = 0;
    let videoIsPlayed = false;
    let isMobile = false;

    vpWidth = $(window).width();
    vpHeight = $(window).height();

    let canvasWidth = 600;
    let canvasHeight = 338;

    let gEarthHeight = vpHeight * 5;
    $('#g-earth').css('height', gEarthHeight);

    $('#img-slider').css('height', $('#img-slider').width() * 0.92);

    let earthBgImage = './images/earth-desktop.jpg';

    if (vpWidth <= 768) {
        // mobile device
        canvasWidth = 500;
        canvasHeight = 282;
        earthBgImage = './images/earth-mobile.jpg';
        isMobile = true;
    }

    let canvideo = new CanvasVideo('gEarthCanvas', canvasWidth, canvasHeight);
    canvideo.playFrames(earthBgImage, 6, 54, 5, 0, 0, 0, 0, null);

    let cvProcess = [];

    for (let i = 1; i <= 4; i++) {
        cvProcess[i] = initProcessVideo(i);
    }

    function initProcessVideo(index) {
        let cVar = new CanvasVideo('process' + index, canvasWidth, canvasHeight);
        if (isMobile) {
            // don't play progress video background on mobile
            cVar.playFrames('./images/process/process' + index + '.jpg', 6, 47, 15, false, 0, 1, 1, null);
        } else {
            cVar.playClip('./images/process/process' + index + '.jpg', 6, 47, 15, false, null, null);
        }
        return cVar;
    }

    function getScrollRatio(st, top, height) {
        let ret = (st - top) / height;
        if (ret < 0) return 0;
        if (ret > 1) return 0.9999999;
        return ret;
    }

    let earthTop = $('#g-earth').position().top;
    let earthEnd = $('#pre-process').position().top;
    let earthFrameId = 0;
    let isReverse = false;

    function getNormalizedValue(begin, end, base, number) {
        return Math.abs((number - base) / (end - begin));
    }

    // photo slider
    $('#photo-slick').slick({
        lazyLoad: 'ondemand',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true
    });

    $(window).scroll(function(event) {
        let st = $(this).scrollTop();
        if (st > lastScrollTop) {
            // downscroll code
            isReverse = false;
        } else {
            // upscroll code
            isReverse = true;
        }

        let earthScrollLength = gEarthHeight;
        if (st >= earthTop && st < earthEnd) {
            let ratio = getScrollRatio(st, earthTop, earthScrollLength);
            let curFrame = Math.floor(43 * ratio);
            let fadeRatio = 0.2;
            if (curFrame !== earthFrameId) {
                // console.log(getScrollRatio(st, earthTop, earthScrollLength), curFrame);
                canvideo.stopVideo();
                canvideo.playFrames(earthBgImage, 6, 54, 5, 0, 0, earthFrameId, curFrame, null);
                earthFrameId = curFrame;
            }

            $('#g-earth').addClass('fixed');
            $('.description-box').addClass('fixed');

            if (0 < ratio && ratio < fadeRatio) {
                $('#earth-desc-1').css('opacity', getNormalizedValue(0, fadeRatio, 0, ratio));
                $('#earth-desc-2').css('opacity', 0);
                $('#g-earth-box').css('top', 0);
            } else if (ratio >= fadeRatio && ratio < 0.5 - fadeRatio / 2) {
                $('#earth-desc-1').css('opacity', 1);
                $('#earth-desc-2').css('opacity', 0);
                $('#g-earth-box').css('top', 0);
            } else if (ratio >= 0.5 - fadeRatio / 2 && ratio < 0.5) {
                $('#earth-desc-1').css('opacity', getNormalizedValue(0.5 - fadeRatio / 2, 0.5, ratio, 0.5));
            } else if (ratio >= 0.5 && ratio < 0.5 + fadeRatio / 2) {
                $('#earth-desc-2').css({
                    'opacity': getNormalizedValue(0.5, 0.5 + fadeRatio / 2, 0.5, ratio),
                    'top': '50%'
                });
                $('#g-earth-box').css('top', 0);
            } else if (ratio >= 0.5 + fadeRatio && ratio < 1 - fadeRatio) {
                $('#earth-desc-1').css('opacity', 0);
                $('#earth-desc-2').css({
                    'opacity': 1,
                    'top': '50%'
                });
                $('#g-earth-box').css('top', 0);
            } else if (ratio >= 1 - fadeRatio && ratio < 1) {
                let cPer = getNormalizedValue(1 - fadeRatio, 1, ratio, 1);
                let cTop = Math.floor(100 * (cPer - 1));
                $('#earth-desc-1').css('opacity', 0);
                $('#earth-desc-2').css({
                    'opacity': cPer,
                    'top': (50 + cTop) + '%'
                });
                $('#g-earth-box').css('top', cTop + '%');
            }
        } else {
            $('#g-earth').removeClass('fixed');
            $('.description-box').removeClass('fixed');
            $('#earth-desc-1').css('opacity', 0);
            $('#earth-desc-2').css('opacity', 0);
        }

        lastScrollTop = st;
    });


    // init ScrollMagic controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: '200%'
        }
    });


    // full screen opening video
    new ScrollMagic.Scene({
            triggerElement: '#subtitle',
            duration: '50%'
        })
        .on('start', function() {
            // autoplay video
            if (!videoIsPlayed && ytPlayer) {
                // $('#header')[0].src += '&autoplay=1';
                videoIsPlayed = true;
                // play Youtube
                ytPlayer.playVideo();

            }
        })
        .addTo(controller);


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

});