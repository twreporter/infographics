console.log('\'Allo \'Allo!');


var stage = new createjs.Stage('myCanvas');
var shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 1000, 563);
stage.addChild(shape);
stage.update();

var ss = new createjs.SpriteSheet({
    frames: {
        width: 1000,
        height: 563,
        numFrames: 12
    },
    animations: {
        run: [0, 50],
        jump: [12, 0, 'run']
    },
    images: ['./images/myvideo.jpg']
});

var sprite = new createjs.Sprite(ss);
sprite.scaleY = sprite.scaleX = 0.2;
stage.addChild(sprite);
sprite.gotoAndPlay('run');

sprite.on('click', function() {
    sprite.gotoAndPlay('run');
});

createjs.Ticker.on('tick', stage);