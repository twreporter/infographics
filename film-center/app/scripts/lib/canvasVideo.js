'use strict'

class CanvasVideo {
    constructor(canvasId, width, height) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.cVideo = {
        width: width,
        height: height,
        isPlaying: false
      };
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.classList.add('canvasVideo');
    }

    drawImage(src) {
      this.cVideo.isPlaying = false;
      this.playClip(src, 1, 1, 1, false, 0, null);
    }

    playClip(src, cols, frames, fps=15, isReverse=false, loops, onEnd){
      let ctx = this.ctx;
      let spriteWidth = 100;
      let spriteHeight = 100;
      let curFrame = (isReverse ?  frames-1: 0);
      let delay = 60;
      let wait = 0;
      let loopCnt = 0;
      let cVideo = this.cVideo;
      let img = null;

      let requestAnimationFrame = requestAnimFrame();

      if(src && cols && frames>0) {
        delay = 60 / fps;

        this.loadImage(src, function(err, image) {
          if (err) return console.warn('Error while loading the sprite image', err);
          cVideo.isPlaying = true;
          spriteWidth = image.width / cols;
          spriteHeight = image.height / Math.ceil(frames / cols);
          img = image;

          requestAnimationFrame(updateFrame);

        })

      }

      function updateFrame() {
        if(wait === 0) {
          draw(curFrame);

          curFrame = (curFrame + (isReverse ? -1 : 1));

          if (curFrame < 0) {
            curFrame += frames;
            loopCnt += (isReverse ? 1 : 0);
          } else if (curFrame >= frames) {
            curFrame = 0;
            loopCnt += (isReverse ? 0 : 1);
          }

          if(loops!=null && loopCnt > loops){
            cVideo.isPlaying = false;
            if(isFunction(onEnd)) onEnd();
          }

        }

        wait = (wait + 1) % delay;

        let requestAnimationFrame = requestAnimFrame();
        if(cVideo.isPlaying){
          requestAnimationFrame(updateFrame);
        }

      }

      function isFunction(obj) {
        return typeof obj === 'function';
      }

      function draw(fIndex) {
        const fx = Math.floor(fIndex % cols) * spriteWidth;
        const fy = Math.floor(fIndex / cols) * spriteHeight;

        ctx.clearRect(0, 0, cVideo.width, cVideo.height);    // clear frame
        ctx.drawImage(img, fx, fy, spriteWidth, spriteHeight, 0, 0, cVideo.width, cVideo.height);
      }

      function requestAnimFrame() {
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      }

    }

    loadImage(src, callback) {
      let img = new Image();
      img.onload = ()=>{
        callback(null, img)
      };
      img.onerror = callback;
      // load the image from source
      img.src = src;
    }


}
