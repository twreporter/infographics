console.log('\'Allo \'Allo!');

// let canvideo = new CanvasVideo('testCanvas', 44, 40);
// canvideo.playClip('./images/coin-sprite-animation-sprite-sheet.png', 10, 10, 5, false, null, null);

let canvideo = new CanvasVideo('testCanvas', 1000, 563);
canvideo.playClip('./images/myvideo.jpg', 6, 12, 5, false, 0, () => {
    canvideo.drawImage('./images/endImage.jpg')
});

let cvProcess1 = new CanvasVideo('process1', 1000, 563);
cvProcess1.playClip('./images/process1.jpg', 6, 47, 15, false, null, null);


let cvProcess2 = new CanvasVideo('process2', 1000, 563);
cvProcess2.playClip('./images/process2.jpg', 6, 47, 15, false, null, null);

let cvProcess3 = new CanvasVideo('process3', 1000, 563);
cvProcess3.playClip('./images/process3.jpg', 6, 47, 15, false, null, null);

let cvProcess4 = new CanvasVideo('process4', 1000, 563);
cvProcess4.playClip('./images/process4.jpg', 6, 47, 15, false, null, null);

// var stage = new createjs.Stage('myCanvas');
// var shape = new createjs.Shape();
// shape.graphics.beginFill('red').drawRect(0, 0, 1000, 563);
// stage.addChild(shape);
// stage.update();
// var ss = new createjs.SpriteSheet({
//     frames: {
//         width: 1000,
//         height: 563,
//         numFrames: 12
//     },
//     animations: {
//         run: [0, 50],
//         jump: [12, 0, 'run']
//     },
//     images: ['./images/myvideo.jpg']
// });
//
// var sprite = new createjs.Sprite(ss);
// sprite.scaleY = sprite.scaleX = 0.2;
// stage.addChild(sprite);
// sprite.gotoAndPlay('run');
//
// sprite.on('click', function() {
//     sprite.gotoAndPlay('run');
// });
//
// createjs.Ticker.on('tick', stage);