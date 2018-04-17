/**
 * アセットを含むオブジェクトです。このクラスは将来変更する可能性が高いので deprecated とします。
 * 利用しないでください。
 * @type {{}}
 */
var Assets = {};
var images = {};
var createjs = window["createjs"];
var ss = {};

(function(lib: any, img, cjs, ss) {
  var p; // shortcut to reference prototypes

  // library properties:
  lib.properties = {
    width: 550,
    height: 400,
    fps: 24,
    color: "#999999",
    manifest: []
  };

  // symbols:

  (lib.triangle = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(-0.7, -27.8)
      .lineTo(32, 27.1)
      .lineTo(-32, 27.8)
      .closePath();
    this.shape.setTransform(0, -7);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -34.8, 64, 55.7);

  (lib.star_10 = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(-4.3, 18.3)
      .lineTo(-19.9, 29.3)
      .lineTo(-14.1, 10.3)
      .lineTo(-32, 10.3)
      .lineTo(-19.7, 0.7)
      .lineTo(-31.2, -8.7)
      .lineTo(-15.2, -8.8)
      .lineTo(-21.7, -26.4)
      .lineTo(-5.4, -16.4)
      .lineTo(-0.2, -31.8)
      .lineTo(4.4, -17.6)
      .lineTo(17.8, -27.4)
      .lineTo(13.1, -8.5)
      .lineTo(30.3, -8.1)
      .lineTo(19.9, 0.1)
      .lineTo(32, 8.4)
      .lineTo(12.8, 9.5)
      .lineTo(18.2, 29.8)
      .lineTo(4.9, 20)
      .lineTo(1.4, 31.8)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -31.7, 64, 63.6);

  (lib.star = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(-0.2, 17.3)
      .lineTo(-20.2, 31.5)
      .lineTo(-13, 7.4)
      .lineTo(-32, -8)
      .lineTo(-7.8, -8.4)
      .lineTo(0.3, -32)
      .lineTo(8, -8.2)
      .lineTo(32, -7.4)
      .lineTo(12.8, 7.5)
      .lineTo(19.4, 32)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -32, 64, 64);

  (lib.square = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill()
      .beginStroke("#FFFFFF")
      .setStrokeStyle(8, 1, 1)
      .moveTo(-32, -32)
      .lineTo(32, -32)
      .lineTo(32, 32)
      .lineTo(-32, 32)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-36, -36, 72, 72);

  (lib.reverse_blur_circle = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill()
      .beginStroke("#FFFFFF")
      .setStrokeStyle(8, 1, 1)
      .moveTo(32, 0)
      .curveTo(32, 13.2, 22.6, 22.6)
      .curveTo(13.3, 32, 0, 32)
      .curveTo(-13.2, 32, -22.7, 22.6)
      .curveTo(-32, 13.2, -32, 0)
      .curveTo(-32, -13.3, -22.7, -22.7)
      .curveTo(-13.2, -32, 0, -32)
      .curveTo(13.3, -32, 22.6, -22.7)
      .curveTo(32, -13.3, 32, 0)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-36, -36, 72, 72);

  (lib.kirakira2 = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(-4, 9.5)
      .curveTo(-7.8, 0, -13.4, -0.1)
      .curveTo(-7.8, -0.2, -4, -9.9)
      .curveTo(-0.1, -19.2, 0, -32)
      .curveTo(0.1, -19.2, 4, -9.9)
      .curveTo(8, -0.2, 13.4, -0.1)
      .curveTo(8, 0, 4, 9.5)
      .curveTo(0.1, 19, 0, 32)
      .curveTo(-0.1, 19, -4, 9.5)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-13.4, -32, 26.8, 64);

  (lib.kirakira = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(-9.6, 9.3)
      .curveTo(-18.9, 0, -32, -0.1)
      .curveTo(-18.9, -0.2, -9.6, -9.6)
      .curveTo(-0.2, -19, -0.1, -32)
      .curveTo(0, -19, 9.4, -9.6)
      .curveTo(18.9, -0.2, 32, -0.1)
      .curveTo(18.9, 0, 9.4, 9.3)
      .curveTo(0, 18.8, -0.1, 32)
      .curveTo(-0.2, 18.8, -9.6, 9.3)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -32, 64, 64);

  (lib.heart = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(-20.2, 10)
      .lineTo(-24.8, 3.5)
      .curveTo(-27, 0.1, -28.5, -3.1)
      .curveTo(-30.1, -6.4, -31.1, -9.5)
      .curveTo(-32, -13, -32, -16)
      .curveTo(-32, -19.7, -30.4, -22.7)
      .curveTo(-29.1, -25.4, -26.6, -27.4)
      .curveTo(-24, -29.1, -21, -30.1)
      .curveTo(-18.1, -31.1, -15, -31.1)
      .curveTo(-11.7, -31.1, -8.8, -29.9)
      .curveTo(-6.4, -29, -4.5, -27.4)
      .curveTo(-3, -25.9, -1.7, -23.9)
      .lineTo(0, -20.8)
      .lineTo(1.7, -23.9)
      .curveTo(3, -25.9, 4.5, -27.4)
      .curveTo(6.6, -29.1, 8.8, -29.9)
      .curveTo(11.7, -31.1, 15.2, -31.1)
      .curveTo(18.4, -31.1, 21.3, -30.1)
      .curveTo(24.2, -29.1, 26.7, -27.2)
      .curveTo(29.1, -25.3, 30.5, -22.6)
      .curveTo(32, -19.7, 32, -16.1)
      .curveTo(32, -13.3, 31, -9.7)
      .curveTo(30.2, -6.5, 28.5, -3.2)
      .curveTo(27.1, 0, 24.9, 3.3)
      .lineTo(20.3, 9.7)
      .curveTo(13.4, 17.7, 9.7, 21.6)
      .lineTo(0, 31)
      .curveTo(-13.6, 18.3, -20.2, 10)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -31, 64, 62.1);

  (lib.flower = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .moveTo(4, 27.3)
      .curveTo(0.5, 23.7, 0.5, 18.9)
      .lineTo(0.5, 15.2)
      .lineTo(-0.5, 15.2)
      .lineTo(-0.7, 18.9)
      .curveTo(-0.9, 24, -4.1, 27.6)
      .curveTo(-7.4, 31.1, -12.1, 31.1)
      .curveTo(-17, 31.1, -20.8, 27.5)
      .curveTo(-24.7, 23.7, -24.7, 19.1)
      .curveTo(-24.7, 15.3, -22.2, 12.1)
      .curveTo(-19.7, 8.8, -16.1, 7.7)
      .lineTo(-12.5, 6.4)
      .lineTo(-12.7, 5.8)
      .lineTo(-13, 5.4)
      .lineTo(-16.5, 6.6)
      .lineTo(-20.2, 7.1)
      .curveTo(-25.3, 7.1, -28.7, 4)
      .curveTo(-32, 0.7, -32, -4.1)
      .curveTo(-32, -9.4, -28.7, -13)
      .curveTo(-25.5, -16.8, -20.6, -16.8)
      .curveTo(-17.8, -16.8, -15, -15.4)
      .curveTo(-12.2, -14, -10.5, -11.6)
      .lineTo(-8.4, -8.7)
      .lineTo(-8, -8.8)
      .lineTo(-7.4, -9.3)
      .lineTo(-9.6, -12.2)
      .curveTo(-10.7, -14, -11.3, -15.8)
      .curveTo(-11.9, -17.9, -12, -19.9)
      .curveTo(-12, -24.7, -8.5, -28)
      .curveTo(-5.3, -31.1, -0.1, -31.1)
      .curveTo(5.2, -31.1, 8.5, -28)
      .curveTo(11.7, -24.7, 11.8, -19.9)
      .curveTo(11.7, -17.7, 11.2, -15.7)
      .curveTo(10.7, -13.8, 9.5, -12.2)
      .lineTo(7.4, -9.3)
      .lineTo(7.8, -9)
      .lineTo(8.2, -8.7)
      .lineTo(10.5, -11.6)
      .curveTo(12.2, -14, 14.8, -15.4)
      .curveTo(17.6, -16.8, 20.4, -16.8)
      .curveTo(25.3, -16.8, 28.5, -13)
      .curveTo(32, -9.4, 32, -4.1)
      .curveTo(32, 0.8, 28.5, 4)
      .curveTo(25.3, 7.1, 20, 7.1)
      .lineTo(16.4, 6.6)
      .lineTo(12.9, 5.5)
      .curveTo(12.8, 5.6, 12.8, 5.6)
      .curveTo(12.7, 5.7, 12.7, 5.7)
      .curveTo(12.7, 5.8, 12.7, 5.8)
      .curveTo(12.7, 5.9, 12.7, 6)
      .lineTo(12.5, 6.4)
      .lineTo(15.9, 7.7)
      .curveTo(19.7, 9.1, 22.1, 12.2)
      .curveTo(24.5, 15.3, 24.5, 19.1)
      .curveTo(24.5, 23.7, 20.8, 27.5)
      .curveTo(16.9, 31.1, 11.9, 31.1)
      .curveTo(7.4, 31.1, 4, 27.3)
      .closePath()
      .moveTo(-7.7, -5.9)
      .curveTo(-10.9, -2.7, -10.9, 1.8)
      .curveTo(-10.9, 6.3, -7.7, 9.4)
      .curveTo(-4.6, 12.5, -0.1, 12.5)
      .curveTo(4.4, 12.5, 7.6, 9.4)
      .curveTo(10.6, 6.3, 10.6, 1.8)
      .curveTo(10.6, -2.7, 7.6, -5.9)
      .curveTo(4.4, -9, -0.1, -9)
      .curveTo(-4.6, -9, -7.7, -5.9)
      .closePath();

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -31, 64, 62.2);

  (lib.circle = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill("#FFFFFF")
      .beginStroke()
      .drawEllipse(-10.8, -10.8, 21.7, 21.7);
    this.shape.setTransform(0, 0, 2.949, 2.949);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32, -32, 64, 64);

  (lib.blur_circle = function() {
    this.initialize();

    // レイヤー 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginRadialGradientFill(
        ["#FFFFFF", "rgba(255,255,255,0)"],
        [0, 1],
        0,
        0,
        0,
        0,
        0,
        11
      )
      .beginStroke()
      .drawEllipse(-10.8, -10.8, 21.7, 21.7);
    this.shape.setTransform(0, 0, 3, 3);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-32.5, -32.5, 65.1, 65.1);

  // stage content:
  (lib.assetshapes = function() {
    this.initialize();

    // triangle
    this.instance = new lib.triangle();
    this.instance.setTransform(323.6, 39.6);

    // square
    this.instance_1 = new lib.square();
    this.instance_1.setTransform(518, 151.5);

    // kirakira2
    this.instance_2 = new lib.kirakira2();
    this.instance_2.setTransform(420.8, 32.6);

    // kirakira
    this.instance_3 = new lib.kirakira();
    this.instance_3.setTransform(32, 151.5);

    // flower
    this.instance_4 = new lib.flower();
    this.instance_4.setTransform(396.5, 151.5);

    // star_10
    this.instance_5 = new lib.star_10();
    this.instance_5.setTransform(518, 32.6);

    // star
    this.instance_6 = new lib.star();
    this.instance_6.setTransform(275, 151.5);

    // circle
    this.instance_7 = new lib.circle();
    this.instance_7.setTransform(226.4, 32.6);

    // reverse_blur_circle
    this.instance_8 = new lib.reverse_blur_circle();
    this.instance_8.setTransform(153.5, 151.5);

    // blur_circle
    this.instance_9 = new lib.blur_circle();
    this.instance_9.setTransform(129.2, 32.6);

    // heart
    this.instance_10 = new lib.heart();
    this.instance_10.setTransform(32, 32.6);

    this.addChild(
      this.instance_10,
      this.instance_9,
      this.instance_8,
      this.instance_7,
      this.instance_6,
      this.instance_5,
      this.instance_4,
      this.instance_3,
      this.instance_2,
      this.instance_1,
      this.instance
    );
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(275, 200, 554, 187.5);
})(
  (Assets = Assets || {}),
  (images = images || {}),
  (createjs = createjs || {}),
  (ss = ss || {})
);

export { Assets };
