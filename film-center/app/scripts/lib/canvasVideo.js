'use strict'

class CanvasVideo {
    constructor(canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cVideo = {
            width: width,
            height: height,
            src: null,
            isPlaying: false,
            image: null,
            curFrame: 0,
            spriteWidth: 100,
            spriteHeight: 100
        };
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.classList.add('canvasVideo');
    }

    drawImage(src) {
        this.cVideo.isPlaying = false;
        this.playClip(src, 1, 1, 1, false, 0, null);
    }

    stopVideo() {
        this.cVideo.isPlaying = false;
    }

    stopAndGetFrame() {
        this.stopVideo();
        return this.cVideo.curFrame;
    }

    isPlaying() {
        return this.cVideo.isPlaying;
    }

    playClip(src, cols, frames, fps = 15, isReverse = false, loops, onEnd) {
        this.playFrames(src, cols, frames, fps, isReverse, loops, 0, frames - 1, onEnd);
    }

    playFrames(src, cols, frames, fps = 15, isReverse = false, loops, startFrame, endFrame, onEnd) {
        if (this.isPlaying()) {
            return;
        }

        let ctx = this.ctx;
        let framesCnt = Math.abs(endFrame - startFrame) + 1;
        let delay = 60;
        let wait = 0;
        let loopCnt = 0;
        let cVideo = this.cVideo;
        cVideo.curFrame = (isReverse ? framesCnt - 1 : startFrame);

        let requestAnimationFrame = requestAnimFrame();

        if (src && cols && frames > 0) {
            delay = 60 / fps;

            if (cVideo.src === src) {
                cVideo.isPlaying = true;
                requestAnimationFrame(updateFrame);
            } else {
                this.loadImage(src, function(err, image) {
                    if (err) return console.warn('Error while loading the sprite image', err);
                    cVideo.src = src;
                    cVideo.isPlaying = true;
                    cVideo.spriteWidth = image.width / cols;
                    cVideo.spriteHeight = image.height / Math.ceil(frames / cols);
                    cVideo.image = image;

                    requestAnimationFrame(updateFrame);

                })
            }



        }

        function updateFrame() {
            if (wait === 0) {
                draw(cVideo.curFrame);

                cVideo.curFrame = (cVideo.curFrame + (isReverse ? -1 : 1));

                if (cVideo.curFrame < startFrame) {
                    cVideo.curFrame += framesCnt;
                    loopCnt += (isReverse ? 1 : 0);
                } else if (cVideo.curFrame >= framesCnt) {
                    cVideo.curFrame = startFrame;
                    loopCnt += (isReverse ? 0 : 1);
                }

                if (loops != null && loopCnt > loops) {
                    cVideo.isPlaying = false;
                    if (isFunction(onEnd)) onEnd();
                }

            }

            wait = (wait + 1) % delay;

            let requestAnimationFrame = requestAnimFrame();
            if (cVideo.isPlaying) {
                requestAnimationFrame(updateFrame);
            }

        }

        function isFunction(obj) {
            return typeof obj === 'function';
        }

        function draw(fIndex) {
            const fx = Math.floor(fIndex % cols) * cVideo.spriteWidth;
            const fy = Math.floor(fIndex / cols) * cVideo.spriteHeight;

            ctx.clearRect(0, 0, cVideo.width, cVideo.height); // clear frame
            ctx.drawImage(cVideo.image, fx, fy, cVideo.spriteWidth, cVideo.spriteHeight, 0, 0, cVideo.width, cVideo.height);
        }

        function requestAnimFrame() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }

    }

    loadImage(src, callback) {
        let img = new Image();
        img.onload = () => {
            callback(null, img)
        };
        img.onerror = callback;
        // load the image from source
        img.src = src;
    }


}