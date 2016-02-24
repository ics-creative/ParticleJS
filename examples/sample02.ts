/// <reference path="../libs/effects-particle-system.d.ts" />

var emitter:effects.ParticleEmitter = null;
var stage:createjs.Stage = null;

window.addEventListener("load", function () {

  emitter = new effects.ParticleEmitter();
  stage = new createjs.Stage("myCanvas");

  stage.addChild(emitter.container);
  createjs.Ticker.framerate = 60;
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", handleTick);

  var data:effects.DrawingData = new effects.DrawingData();
  data.importFromJson({
    "bgColor": "#00000",
    "width": 611.3333333333334,
    "height": 624.6666666666666,
    "emitFrequency": 300,
    "lifeSpan": "40",
    "lifeSpanVariance": "0",
    "initialDirection": "209.5",
    "initialDirectionVariance": "155",
    "initialSpeed": "2.6",
    "initialSpeedVariance": "3.8",
    "friction": "0.0085",
    "accelerationSpeed": "0.835",
    "accelerationDirection": "233.2",
    "startScale": "1",
    "startScaleVariance": "0.52",
    "finishScale": "0",
    "finishScaleVariance": "0",
    "startAlpha": "1",
    "startAlphaVariance": "0",
    "finishAlpha": "1",
    "finishAlphaVariance": "0",
    "startX": 320,
    "startXVariance": "0",
    "startY": 349,
    "startYVariance": "0",
    "shapeIdList": [effects.ShapeType.KIRAKIRA],
    "startColor": {
      "hue": "17",
      "hueVariance": "32",
      "saturation": "100",
      "saturationVariance": "45",
      "luminance": "56",
      "luminanceVariance": "19"
    },
    "blendMode": true,
    "alphaCurveType": "0"
  });

  emitter.setData(data);

});

function handleTick() {
  emitter.update();
  stage.update();

}