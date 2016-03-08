(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var ShapeGenerator = (function () {
    function ShapeGenerator() {
    }
    ShapeGenerator.prototype.generateShape = function (id) {
        var namespaceObj = (window.particlejs.assets);
        var cls = namespaceObj[id];
        return new cls();
    };
    return ShapeGenerator;
}());
exports.ShapeGenerator = ShapeGenerator;

},{}],2:[function(require,module,exports){
"use strict";
var ColorData = (function () {
    function ColorData() {
        /**
         * 色相を表します(0-360)。
         * @type {number}
         */
        this.hue = 0;
        /**
         * 色相のばらつきを示します。
         * @type {number}
         */
        this.hueVariance = 0;
        /**
         * 彩度です(0-100)。
         * @type {number}
         */
        this.saturation = 0;
        /**
         * 彩度のばらつきです。
         * @type {number}
         */
        this.saturationVariance = 0;
        /**
         * 輝度です(0-100)。
         * @type {number}
         */
        this.luminance = 0;
        /**
         * 輝度のばらつきです。
         * @type {number}
         */
        this.luminanceVariance = 0;
    }
    return ColorData;
}());
exports.ColorData = ColorData;

},{}],3:[function(require,module,exports){
"use strict";
var data_color_1 = require("./data-color");
var alpha_curve_type_1 = require("../enum/alpha-curve-type");
var DrawingData = (function () {
    function DrawingData(json) {
        if (json === void 0) { json = null; }
        this.bgColor = "";
        this.width = 0.0;
        this.height = 0.0;
        /** 1秒あたりの発生数です。 */
        this.emitFrequency = 0;
        /** 発生基準位置 - X座標 (px)です。 */
        this.startX = 0;
        /** 発生基準位置 - X座標のばらつき (px)です。 */
        this.startXVariance = 0;
        /** 発生位置 - Y座標 (px)です。 */
        this.startY = 0;
        /** 発生位置 - Y座標のばらつき (px)です。 */
        this.startYVariance = 0;
        /** 初期速度 - 方向 (度)です。 */
        this.initialDirection = 0;
        /** 初期速度 - 方向のばらつき (度)です。 */
        this.initialDirectionVariance = 0;
        /** 初期速度 (px)です。 */
        this.initialSpeed = 0;
        /** 初期速度のばらつきです。 */
        this.initialSpeedVariance = 0;
        /** 摩擦です。 */
        this.friction = 0;
        /** 重力です。 */
        this.accelerationSpeed = 0;
        /** 重力方向 (度)です。 */
        this.accelerationDirection = 0;
        /** 開始時のスケールです。 */
        this.startScale = 0;
        /** 開始時のスケールのばらつきです。 */
        this.startScaleVariance = 0;
        /** 終了時のスケールです。 */
        this.finishScale = 0;
        /** 終了時のスケールのばらつきです。 */
        this.finishScaleVariance = 0;
        /** ライフ(フレーム数)です。 */
        this.lifeSpan = 0;
        /** ライフのばらつき(フレーム数)です。 */
        this.lifeSpanVariance = 0;
        /** 開始時の透明度です。 */
        this.startAlpha = 0;
        /** 開始時の透明度のばらつきです。 */
        this.startAlphaVariance = 0;
        /** 終了時の透明度です。 */
        this.finishAlpha = 0;
        /** 終了時の透明度のばらつきです。 */
        this.finishAlphaVariance = 0;
        /** 使用するシェイプID設定です。 */
        this.shapeIdList = [""];
        /** 初期カラーの設定です。 */
        this.startColor = new data_color_1.ColorData();
        /** シェイプを加算合成します。 */
        this.blendMode = true;
        /** 透明度の計算式の設定です。 */
        this.alphaCurveType = alpha_curve_type_1.AlphaCurveType.Normal;
        if (json) {
            this.importFromJson(json);
        }
    }
    /**
     * パーティクルの設定をJSON形式のオブジェクトから読み込みます。
     * @param json
     */
    DrawingData.prototype.importFromJson = function (obj) {
        var checkSkipKey = function (key) {
            return key == "width" || key == "height" || key == "bgColor";
        };
        this.setData(obj, checkSkipKey);
    };
    /**
     * パーティクルの設定をDrawingDataオブジェクトから読み込みます
     * @param obj
     */
    DrawingData.prototype.importData = function (obj) {
        var checkSkipKey = function (key) {
            return key == "width" || key == "height" || key == "startX" || key == "startY";
        };
        this.setData(obj, checkSkipKey);
    };
    DrawingData.checkReflectEnable = function () {
        try {
            var result = !!(Reflect && Reflect.has);
            return result;
        }
        catch (e) {
            return false;
        }
    };
    DrawingData.prototype.setData = function (obj, checkSkipKey) {
        if (DrawingData.ENABLE_REFLECT) {
            for (var key in obj) {
                // 無視するプロパティー
                if (checkSkipKey(key)) {
                    continue;
                }
                if (Reflect.has(this, key) == true) {
                    var val = obj[key];
                    // イマドキなプロパティー反映方法を適用 ICS-Ikeda 2016-01-22
                    Reflect.set(this, key, val);
                }
            }
        }
        else {
            var self = this;
            for (var key in obj) {
                // 無視するプロパティー
                if (checkSkipKey(key)) {
                    continue;
                }
                if (this.hasOwnProperty(key)) {
                    self[key] = obj[key];
                }
            }
        }
    };
    DrawingData.ENABLE_REFLECT = DrawingData.checkReflectEnable();
    return DrawingData;
}());
exports.DrawingData = DrawingData;

},{"../enum/alpha-curve-type":5,"./data-color":2}],4:[function(require,module,exports){
"use strict";
/**
 * Created by 「asset-shapes.fla」/「generate-assets.jsfl」 on Wed Jan 20 2016
 * !!!!!このコードはJSFLから自動生成されたコードです。修正する場合はご注意ください。!!!!!
 */
var ShapeData = (function () {
    function ShapeData() {
        this.assetList = ["blur_circle", "circle", "flower", "heart", "kirakira", "kirakira2", "reverse_blur_circle", "square", "star", "star_10", "triangle"];
    }
    return ShapeData;
}());
exports.ShapeData = ShapeData;

},{}],5:[function(require,module,exports){
"use strict";
/**
 * 透明度の計算式の種類です。
 */
(function (AlphaCurveType) {
    /**
     * 通常の透明度の計算式です。
     */
    AlphaCurveType[AlphaCurveType["Normal"] = 0] = "Normal";
    /**
     * ランダムです。
     */
    AlphaCurveType[AlphaCurveType["Random"] = 1] = "Random";
})(exports.AlphaCurveType || (exports.AlphaCurveType = {}));
var AlphaCurveType = exports.AlphaCurveType;

},{}],6:[function(require,module,exports){
"use strict";
/**
 * シェイプの種類を定義したクラスです。
 */
var ShapeType = (function () {
    function ShapeType() {
    }
    /**
     * ふわっとした円のシェイプIDです。
     * @type {string}
     */
    ShapeType.BLUR_CIRCLE = "blur_circle";
    /**
     * 円のシェイプIDです。
     * @type {string}
     */
    ShapeType.CIRCLE = "circle";
    /**
     * 花の形のシェイプIDです。
     * @type {string}
     */
    ShapeType.FLOWER = "flower";
    /**
     * ハートの形のシェイプIDです。
     * @type {string}
     */
    ShapeType.HEART = "heart";
    /**
     * キラキラ(1)のシェイプIDです。
     * @type {string}
     */
    ShapeType.KIRAKIRA = "kirakira";
    /**
     * キラキラ(2)のシェイプIDです。
     * @type {string}
     */
    ShapeType.KIRAKIRA2 = "kirakira2";
    /**
     * 中央が繰り抜かれた円のシェイプIDです。
     * @type {string}
     */
    ShapeType.REVERSE_CIRCLE = "reverse_blur_circle";
    /**
     * 四角形のシェイプIDです。
     * @type {string}
     */
    ShapeType.SQUARE = "square";
    /**
     * 星形のシェイプIDです。
     * @type {string}
     */
    ShapeType.STAR = "star";
    /**
     * 星形(棘が10)のシェイプIDです。
     * @type {string}
     */
    ShapeType.STAR_10 = "star_10";
    /**
     * 三角形のシェイプIDです。
     * @type {string}
     */
    ShapeType.TRIANGLE = "triangle";
    return ShapeType;
}());
exports.ShapeType = ShapeType;

},{}],7:[function(require,module,exports){
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>
/// <reference path="../typings/main.d.ts"/>
"use strict";
var particle_system_1 = require("./particle/particle-system");
var data_drawing_1 = require("./data/data-drawing");
var data_color_1 = require("./data/data-color");
var data_shape_1 = require("./data/data-shape");
var alpha_curve_type_1 = require("./enum/alpha-curve-type");
var shape_type_1 = require("./enum/shape-type");
window.particlejs = window.effects || {};
window.particlejs.ParticleSystem = particle_system_1.ParticleSystem;
window.particlejs.DrawingData = data_drawing_1.DrawingData;
window.particlejs.ColorData = data_color_1.ColorData;
window.particlejs.AlphaCurveType = alpha_curve_type_1.AlphaCurveType;
window.particlejs.ShapeType = shape_type_1.ShapeType;
window.particlejs.ShapeData = data_shape_1.ShapeData;
window.particlejs.VERSION = particle_system_1.particlejs.VERSION;

},{"./data/data-color":2,"./data/data-drawing":3,"./data/data-shape":4,"./enum/alpha-curve-type":5,"./enum/shape-type":6,"./particle/particle-system":8}],8:[function(require,module,exports){
"use strict";
var particle_1 = require("./particle");
var data_drawing_1 = require("../data/data-drawing");
var shape_generator_1 = require("../assets/shape-generator");
var alpha_curve_type_1 = require("../enum/alpha-curve-type");
var particlejs;
(function (particlejs) {
    particlejs.VERSION = "0.1.3";
    /**
     * 現在のバージョンと互換性があるかどうかをチェックします。
     * @param value
     */
    function checkVersion(value) {
        var currentVersion = particlejs.VERSION.split(".");
        //  ここはそもそもこない想定だけれども。
        if (currentVersion.length <= 2) {
            console.log("ERROR! バージョン表記エラーが発生しました。");
            return false;
        }
        //  versionが空の場合
        if (!value) {
            if (currentVersion[0] == "0" && currentVersion[1] == "1") {
                //「0.1.▲」のバージョンのParticleSystemは問題なく動作させる
                return true;
            }
            else {
                //  バージョンが空の場合はエラー
                return false;
            }
        }
        var jsonVersion = value.split(".");
        //  メジャーバージョンのチェック
        if (currentVersion[0] != jsonVersion[0]) {
            return false;
        }
        //  マイナーバージョンのチェック
        if (currentVersion[1] != jsonVersion[1]) {
            return false;
        }
        //  リビジョン番号が同じなら互換性があると行って良い
        return true;
    }
    particlejs.checkVersion = checkVersion;
})(particlejs = exports.particlejs || (exports.particlejs = {}));
/**
 * パーティクルの制御クラスです。
 */
var ParticleSystem = (function () {
    function ParticleSystem() {
        this._frameCount = 0;
        this._drawingData = new data_drawing_1.DrawingData();
        this._particlesPool = [];
        this._activeParticles = [];
        this.container = new createjs.Container();
        // パフォーマンス向上の基本テクニック
        this.container.mouseChildren = false;
        this.container.mouseEnabled = false;
        this._playing = true;
        this.shapeGenerator = new shape_generator_1.ShapeGenerator();
    }
    /**
     * パーティクルのアニメーションが再生されているかどうか。
     */
    ParticleSystem.prototype.isPlaying = function () {
        return this._playing;
    };
    /**
     * パーティクルの設定データを取り込みます。
     */
    ParticleSystem.prototype.setData = function (drawingData) {
        this._drawingData = drawingData;
    };
    /**
     * パーティクルの設定データをJson形式のオブジェクトで取り込みます。
     */
    ParticleSystem.prototype.importFromJson = function (jsonObject) {
        if (!particlejs.checkVersion(jsonObject["VERSION"] || "")) {
            console.log("WARN! 読み込んだJSONファイルとParticleJSのバージョンが違います。 https://github.com/ics-creative/ParticleJS");
        }
        this._drawingData.importFromJson(jsonObject);
    };
    /**
     * パーティクルシステムの更新を行います。
     */
    ParticleSystem.prototype.update = function () {
        if (!this._playing) {
            return;
        }
        this.emit();
        this.animate();
        this.lifeCheck();
    };
    /**
     * パーティクルの動きを更新します。
     */
    ParticleSystem.prototype.animate = function () {
        var rad = createjs.Matrix2D.DEG_TO_RAD * this._drawingData.accelerationDirection;
        var accX = Math.cos(rad) * this._drawingData.accelerationSpeed;
        var accY = Math.sin(rad) * this._drawingData.accelerationSpeed;
        for (var i = 0; i < this._activeParticles.length; i++) {
            var particle = this._activeParticles[i];
            // 加速度計算 (重力)
            particle.vx += accX;
            particle.vy += accY;
            // 摩擦計算
            particle.vx *= (1 - this._drawingData.friction);
            particle.vy *= (1 - this._drawingData.friction);
            // 座標計算
            particle.x += particle.vx;
            particle.y += particle.vy;
            // 座標の適用
            particle.particleShape.x = particle.x;
            particle.particleShape.y = particle.y;
            var lifeParcent = particle.currentLife / particle.totalLife;
            switch (Number(particle.alphaCurveType)) {
                case alpha_curve_type_1.AlphaCurveType.Random:
                    var min = Math.min(particle.finishAlpha, particle.startAlpha);
                    var max = Math.max(particle.finishAlpha, particle.startAlpha);
                    particle.particleShape.alpha = Math.random() * (max - min) + min;
                    break;
                case alpha_curve_type_1.AlphaCurveType.Normal:
                default:
                    var alpha = this.calcCurrentValue(particle.startAlpha, particle.finishAlpha, lifeParcent);
                    particle.particleShape.alpha = alpha;
                    break;
            }
            var scale = this.calcCurrentValue(particle.startScale, particle.finishScale, lifeParcent);
            particle.particleShape.scaleX = particle.particleShape.scaleY = scale;
            //  パーティクルが死んでいたら、オブジェクトプールに移動
            if (particle.currentLife < 0) {
                particle.isAlive = false;
            }
            // 年齢追加
            particle.currentLife--;
        }
    };
    /**
     * パーティクルが生きているか確認します。
     */
    ParticleSystem.prototype.lifeCheck = function () {
        for (var i = 0; i < this._activeParticles.length; i++) {
            // もしも死んでいたら、アクティブリストから外してプールに保存する。
            if (!this._activeParticles[i].isAlive) {
                var particle = this._activeParticles[i];
                this.container.removeChild(particle.particleShape);
                this._activeParticles.splice(i, 1);
                this._particlesPool.push(particle);
                i--;
            }
        }
    };
    /**
     * パーティクルを全て削除します。
     */
    ParticleSystem.prototype.clear = function () {
        for (var i = 0; i < this._activeParticles.length; i++) {
            var particle = this._activeParticles[i];
            particle.isAlive = false;
            this.container.removeChild(particle.particleShape);
            this._activeParticles.splice(i, 1);
            this._particlesPool.push(particle);
            i--;
        }
    };
    /**
     * パーティクルシステムを破棄します。
     */
    ParticleSystem.prototype.dispose = function () {
        for (var i = 0; i < this._activeParticles.length; i++) {
            var particle = this._activeParticles[i];
            particle.isAlive = false;
            this.container.removeChild(particle.particleShape);
        }
        this._activeParticles.splice(0, this._activeParticles.length);
        this._particlesPool.splice(0, this._particlesPool.length);
        this._activeParticles = null;
        this._particlesPool = null;
        this.container = null;
    };
    /**
     * パーティクルの生成を行います。
     */
    ParticleSystem.prototype.emit = function () {
        // インターバルチェック
        var framerate = Math.round(createjs.Ticker.framerate);
        var frameInSec = this._frameCount % framerate;
        var emitPerSec = this._drawingData.emitFrequency;
        var loopInt = Math.floor(emitPerSec / framerate);
        // ① 整数分の実行回数
        for (var i = 0; i < loopInt; i++) {
            this.emitParticle();
        }
        // ② 小数点分の実行回数
        var loopFloat = ((emitPerSec / framerate) - loopInt);
        // フレームレートより少ない場合
        if (frameInSec % Math.floor(1 / loopFloat) == 0) {
            this.emitParticle();
        }
        this._frameCount++;
        if (this._frameCount >= framerate) {
            this._frameCount = 0;
        }
    };
    /**
     * 個々のパーティクルを生成し、パーティクルシステムに登録します。
     * @returns {Particle}
     */
    ParticleSystem.prototype.emitParticle = function () {
        var particle = this.generateParticle();
        this.container.addChild(particle.particleShape);
        this._activeParticles.push(particle);
    };
    /**
     * パーティクルを生成し、パラメーターを設定します。
     * @returns {Particle}
     */
    ParticleSystem.prototype.generateParticle = function () {
        var particle = null;
        if (this._particlesPool.length >= 1) {
            particle = this._particlesPool.shift();
        }
        else {
            particle = new particle_1.Particle();
        }
        this.setParticleParameter(particle);
        return particle;
    };
    /**
     * パーティクルパラメータの設定を行います。
     * @param particle
     */
    ParticleSystem.prototype.setParticleParameter = function (particle) {
        particle.particleShape.removeAllChildren();
        particle.isAlive = true;
        particle.x = this.calcRandomValueWithVariance(this._drawingData.startX, this._drawingData.startXVariance, false);
        particle.y = this.calcRandomValueWithVariance(this._drawingData.startY, this._drawingData.startYVariance, false);
        this.generateShape(particle, this._drawingData.shapeIdList);
        //  生存期間
        particle.totalLife = Math.max(1, this.calcRandomValueWithVariance(this._drawingData.lifeSpan, this._drawingData.lifeSpanVariance, true));
        particle.currentLife = particle.totalLife;
        //  スピード
        var speed = Math.max(0, this.calcRandomValueWithVariance(this._drawingData.initialSpeed, this._drawingData.initialSpeedVariance, false));
        var angle = createjs.Matrix2D.DEG_TO_RAD * (this.calcRandomValueWithVariance(this._drawingData.initialDirection, this._drawingData.initialDirectionVariance, false));
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;
        //  アルファ
        particle.startAlpha = this.calcRandomValueWithRange(0.0, 1.0, this.calcRandomValueWithVariance(this._drawingData.startAlpha, this._drawingData.startAlphaVariance, false));
        particle.finishAlpha = this.calcRandomValueWithRange(0.0, 1.0, this.calcRandomValueWithVariance(this._drawingData.finishAlpha, this._drawingData.finishAlphaVariance, false));
        //  スケール
        particle.startScale = Math.max(0, this.calcRandomValueWithVariance(this._drawingData.startScale, this._drawingData.startScaleVariance, false));
        particle.finishScale = Math.max(0, this.calcRandomValueWithVariance(this._drawingData.finishScale, this._drawingData.finishScaleVariance, false));
        // ブレンドモードを設定
        particle.particleShape.compositeOperation = this._drawingData.blendMode == true ? "lighter" : null;
        particle.alphaCurveType = this._drawingData.alphaCurveType;
    };
    /**
     * パーティクルに使用するシェイプを生成します。
     * @param particle
     * @param shapeIdList
     */
    ParticleSystem.prototype.generateShape = function (particle, shapeIdList) {
        particle.particleShape.removeAllChildren();
        var startColor = this._drawingData.startColor;
        particle.startColor.hue = this.calcRandomValueWithVariance(startColor.hue, startColor.hueVariance, false) % 360;
        particle.startColor.luminance = this.calcRandomValueWithVariance(startColor.luminance, startColor.luminanceVariance, false);
        particle.startColor.saturation = this.calcRandomValueWithVariance(startColor.saturation, startColor.saturationVariance, false);
        var hue = Number(particle.startColor.hue);
        var saturation = Number(particle.startColor.saturation);
        var luminance = Number(particle.startColor.luminance);
        var color = "hsl(" + hue + ", " + saturation + "%, " + luminance + "%)";
        var r = Math.floor(Math.random() * this._drawingData.shapeIdList.length);
        var shapeId = (this._drawingData.shapeIdList.length == 0)
            ? ''
            : this._drawingData.shapeIdList[r];
        particle.colorCommand = null;
        var container = this.shapeGenerator.generateShape(shapeId);
        particle.particleShape.addChild(container);
        var shape = container.getChildAt(0); // こういう作りにする
        if (shape == null) {
            return;
        }
        var instructions = shape.graphics.instructions;
        if (instructions && instructions.length > 0) {
            for (var i = 0; i < instructions.length; i++) {
                var cmd = instructions[i];
                if (cmd instanceof createjs.Graphics.Fill) {
                    // グラデーション塗りだったら
                    if (cmd.style instanceof CanvasGradient) {
                        // 昔のグラデーションを保持
                        var oldStyle = cmd.style;
                        var g = ParticleSystem.HELPER_GRAPHICS;
                        var newStyle = g.beginRadialGradientFill([color, ("hsla(" + hue + ", " + saturation + "%, " + luminance + "%, 0)")], oldStyle.props.ratios, oldStyle.props.x0, oldStyle.props.y0, oldStyle.props.r0, oldStyle.props.x1, oldStyle.props.y1, oldStyle.props.r1).command;
                        instructions[i] = newStyle;
                    }
                    else {
                        cmd.style = color;
                        particle.colorCommand = cmd;
                    }
                }
                else if (cmd instanceof createjs.Graphics.Stroke) {
                    cmd.style = color;
                    particle.colorCommand = cmd;
                }
            }
        }
    };
    /**
     * 一時的にパーティクルの再生を停止します。
     */
    ParticleSystem.prototype.pause = function () {
        this._playing = false;
    };
    /**
     * pause()で停止したパーティクルの再生を再開します。
     */
    ParticleSystem.prototype.resume = function () {
        this._playing = true;
    };
    /**
     * 一定範囲の数値を計算します。
     * @param minValue
     * @param maxValue
     * @param value
     * @returns {number}
     */
    ParticleSystem.prototype.calcRandomValueWithRange = function (minValue, maxValue, value) {
        return Math.min(maxValue, Math.max(minValue, value));
    };
    /**
     * ばらつきのある値を計算し取得します。
     * @param value 基準値です。
     * @param variance バラつきの範囲です。
     * @param isInteger 整数であるかを指定します。
     * @returns {number}  数値を返します。
     */
    ParticleSystem.prototype.calcRandomValueWithVariance = function (value, variance, isInteger) {
        var result = Number(value) + (Math.random() - 0.5) * variance;
        if (isInteger == true) {
            return Math.floor(result);
        }
        return result;
    };
    /**
     * 現在の年齢依存の数値を計算します。
     * @param start 開始時の値です。
     * @param end 終了時の値です。
     * @param life 現在の寿命を示します。開始時は1.0で、終了時は0.0の想定です。
     * @returns {number} 現在の値です。
     */
    ParticleSystem.prototype.calcCurrentValue = function (start, end, life) {
        return Number(start) * life + Number(end) * (1 - life);
    };
    Object.defineProperty(ParticleSystem.prototype, "emitFrequency", {
        /**
         * 1秒あたりの発生数です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.emitFrequency;
        },
        /**
         * 1秒あたりの発生数です。
         * @param value
         */
        set: function (value) {
            this._drawingData.emitFrequency = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startX", {
        /**
         * 発生基準位置 - X座標 (px)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startX;
        },
        /**
         * 発生基準位置 - X座標 (px)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.startX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startXVariance", {
        /**
         * 発生基準位置 - X座標のばらつき (px)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startX;
        },
        /**
         * 発生基準位置 - X座標のばらつき (px)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.startXVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startY", {
        /**
         * 発生位置 - Y座標 (px)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startY;
        },
        /**
         * 発生位置 - Y座標 (px)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.startY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startYVariance", {
        /**
         * 発生基準位置 - X座標のばらつき (px)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startYVariance;
        },
        /**
         * 発生基準位置 - X座標のばらつき (px)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.startYVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "initialDirection", {
        /**
         * 初期速度 - 方向 (度)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.initialDirection;
        },
        /**
         * 初期速度 - 方向 (度)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.initialDirection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "initialDirectionVariance", {
        /**
         * 初期速度 - 方向のばらつき (度)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.initialDirectionVariance;
        },
        /**
         * 初期速度 - 方向のばらつき (度)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.initialDirectionVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "initialSpeed", {
        /**
         * 初期速度 (px)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.initialSpeed;
        },
        /**
         * 初期速度 (px)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.initialSpeed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "initialSpeedVariance", {
        /**
         * 初期速度のばらつきです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.initialSpeedVariance;
        },
        /**
         * 初期速度のばらつきです。
         * @param value
         */
        set: function (value) {
            this._drawingData.initialSpeedVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "friction", {
        /**
         * 摩擦です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.friction;
        },
        /**
         * 摩擦です。
         * @param value
         */
        set: function (value) {
            this._drawingData.friction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "accelerationSpeed", {
        /**
         * 重力です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.accelerationSpeed;
        },
        /**
         * 重力です。
         * @param value
         */
        set: function (value) {
            this._drawingData.accelerationSpeed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "accelerationDirection", {
        /**
         * 重力です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.accelerationDirection;
        },
        /**
         * 重力方向 (度)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.accelerationDirection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startScale", {
        /**
         * 開始時のスケールです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startScale;
        },
        /**
         * 開始時のスケールです。
         * @param value
         */
        set: function (value) {
            this._drawingData.startScale = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startScaleVariance", {
        /**
         * 開始時のスケールのばらつきです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startScaleVariance;
        },
        /**
         * 開始時のスケールのばらつきです。
         * @param value
         */
        set: function (value) {
            this._drawingData.startScaleVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "finishScale", {
        /**
         * 終了時のスケールです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.finishScale;
        },
        /**
         * 終了時のスケールです。
         * @param value
         */
        set: function (value) {
            this._drawingData.finishScale = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "finishScaleVariance", {
        /**
         * 終了時のスケールのばらつきです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.finishScaleVariance;
        },
        /**
         * 終了時のスケールのばらつきです。
         * @param value
         */
        set: function (value) {
            this._drawingData.finishScaleVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "lifeSpan", {
        /**
         * ライフ(フレーム数)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.lifeSpan;
        },
        /**
         * ライフ(フレーム数)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.lifeSpan = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "lifeSpanVariance", {
        /**
         * ライフのばらつき(フレーム数)です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.lifeSpanVariance;
        },
        /**
         * ライフのばらつき(フレーム数)です。
         * @param value
         */
        set: function (value) {
            this._drawingData.lifeSpanVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startAlpha", {
        /**
         * 始時の透明度です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startAlpha;
        },
        /**
         * 始時の透明度です。
         * @param value
         */
        set: function (value) {
            this._drawingData.startAlpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startAlphaVariance", {
        /**
         * 開始時の透明度のばらつきです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.startAlphaVariance;
        },
        /**
         * 開始時の透明度のばらつきです。
         * @param value
         */
        set: function (value) {
            this._drawingData.startAlphaVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "finishAlpha", {
        /**
         * 終了時の透明度です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.finishAlpha;
        },
        /**
         * 終了時の透明度です。
         * @param value
         */
        set: function (value) {
            this._drawingData.finishAlpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "finishAlphaVariance", {
        /**
         * 終了時の透明度のばらつきです。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.finishAlphaVariance;
        },
        /**
         * 終了時の透明度のばらつきです。
         * @param value
         */
        set: function (value) {
            this._drawingData.finishAlphaVariance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "shapeIdList", {
        /**
         * 使用するシェイプID設定です。
         * @returns {string[]}
         */
        get: function () {
            return this._drawingData.shapeIdList;
        },
        /**
         * 使用するシェイプID設定です。
         * @param string[]
         */
        set: function (value) {
            this._drawingData.shapeIdList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "startColor", {
        /**
         * 初期カラーの設定です。
         * @returns {ColorData}
         */
        get: function () {
            return this._drawingData.startColor;
        },
        /**
         * 初期カラーの設定です。
         * @param value
         */
        set: function (value) {
            this._drawingData.startColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "blendMode", {
        /**
         * trueのときシェイプを加算合成します。
         * @returns {boolean}
         */
        get: function () {
            return this._drawingData.blendMode;
        },
        /**
         * trueのときシェイプを加算合成します。
         * @param value
         */
        set: function (value) {
            this._drawingData.blendMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParticleSystem.prototype, "alphaCurveType", {
        /**
         * 透明度の計算式の設定です。
         * @returns {number}
         */
        get: function () {
            return this._drawingData.alphaCurveType;
        },
        /**
         * 透明度の計算式の設定です。
         * @param value - 0:通常, 1:ランダム
         */
        set: function (value) {
            this._drawingData.alphaCurveType = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  グラフィックオブジェクトです。内部計算に使用します。
     */
    ParticleSystem.HELPER_GRAPHICS = new createjs.Graphics();
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;

},{"../assets/shape-generator":1,"../data/data-drawing":3,"../enum/alpha-curve-type":5,"./particle":9}],9:[function(require,module,exports){
"use strict";
var data_color_1 = require("../data/data-color");
/**
 * パーティクルエミッターのバリューオブジェクトのクラスです。
 */
var Particle = (function () {
    function Particle() {
        this.particleShape = new createjs.Container;
        this.startColor = new data_color_1.ColorData();
    }
    return Particle;
}());
exports.Particle = Particle;

},{"../data/data-color":2}]},{},[7]);

(function (lib, img, cjs, ss) {

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
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.7,-27.8).lineTo(32,27.1).lineTo(-32,27.8).closePath();
	this.shape.setTransform(0,-7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-34.8,64,55.7);


(lib.star_10 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4.3,18.3).lineTo(-19.9,29.3).lineTo(-14.1,10.3).lineTo(-32,10.3).lineTo(-19.7,0.7).lineTo(-31.2,-8.7).lineTo(-15.2,-8.8).lineTo(-21.7,-26.4).lineTo(-5.4,-16.4).lineTo(-0.2,-31.8).lineTo(4.4,-17.6).lineTo(17.8,-27.4).lineTo(13.1,-8.5).lineTo(30.3,-8.1).lineTo(19.9,0.1).lineTo(32,8.4).lineTo(12.8,9.5).lineTo(18.2,29.8).lineTo(4.9,20).lineTo(1.4,31.8).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-31.7,64,63.6);


(lib.star = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.2,17.3).lineTo(-20.2,31.5).lineTo(-13,7.4).lineTo(-32,-8).lineTo(-7.8,-8.4).lineTo(0.3,-32).lineTo(8,-8.2).lineTo(32,-7.4).lineTo(12.8,7.5).lineTo(19.4,32).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-32,64,64);


(lib.square = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#FFFFFF").setStrokeStyle(8,1,1).moveTo(-32,-32).lineTo(32,-32).lineTo(32,32).lineTo(-32,32).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-36,72,72);


(lib.reverse_blur_circle = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill().beginStroke("#FFFFFF").setStrokeStyle(8,1,1).moveTo(32,0).curveTo(32,13.2,22.6,22.6).curveTo(13.3,32,0,32).curveTo(-13.2,32,-22.7,22.6).curveTo(-32,13.2,-32,0).curveTo(-32,-13.3,-22.7,-22.7).curveTo(-13.2,-32,0,-32).curveTo(13.3,-32,22.6,-22.7).curveTo(32,-13.3,32,0).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,-36,72,72);


(lib.kirakira2 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-4,9.5).curveTo(-7.8,0,-13.4,-0.1).curveTo(-7.8,-0.2,-4,-9.9).curveTo(-0.1,-19.2,0,-32).curveTo(0.1,-19.2,4,-9.9).curveTo(8,-0.2,13.4,-0.1).curveTo(8,0,4,9.5).curveTo(0.1,19,0,32).curveTo(-0.1,19,-4,9.5).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-13.4,-32,26.8,64);


(lib.kirakira = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-9.6,9.3).curveTo(-18.9,0,-32,-0.1).curveTo(-18.9,-0.2,-9.6,-9.6).curveTo(-0.2,-19,-0.1,-32).curveTo(0,-19,9.4,-9.6).curveTo(18.9,-0.2,32,-0.1).curveTo(18.9,0,9.4,9.3).curveTo(0,18.8,-0.1,32).curveTo(-0.2,18.8,-9.6,9.3).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-32,64,64);


(lib.heart = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-20.2,10).lineTo(-24.8,3.5).curveTo(-27,0.1,-28.5,-3.1).curveTo(-30.1,-6.4,-31.1,-9.5).curveTo(-32,-13,-32,-16).curveTo(-32,-19.7,-30.4,-22.7).curveTo(-29.1,-25.4,-26.6,-27.4).curveTo(-24,-29.1,-21,-30.1).curveTo(-18.1,-31.1,-15,-31.1).curveTo(-11.7,-31.1,-8.8,-29.9).curveTo(-6.4,-29,-4.5,-27.4).curveTo(-3,-25.9,-1.7,-23.9).lineTo(0,-20.8).lineTo(1.7,-23.9).curveTo(3,-25.9,4.5,-27.4).curveTo(6.6,-29.1,8.8,-29.9).curveTo(11.7,-31.1,15.2,-31.1).curveTo(18.4,-31.1,21.3,-30.1).curveTo(24.2,-29.1,26.7,-27.2).curveTo(29.1,-25.3,30.5,-22.6).curveTo(32,-19.7,32,-16.1).curveTo(32,-13.3,31,-9.7).curveTo(30.2,-6.5,28.5,-3.2).curveTo(27.1,0,24.9,3.3).lineTo(20.3,9.7).curveTo(13.4,17.7,9.7,21.6).lineTo(0,31).curveTo(-13.6,18.3,-20.2,10).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-31,64,62.1);


(lib.flower = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(4,27.3).curveTo(0.5,23.7,0.5,18.9).lineTo(0.5,15.2).lineTo(-0.5,15.2).lineTo(-0.7,18.9).curveTo(-0.9,24,-4.1,27.6).curveTo(-7.4,31.1,-12.1,31.1).curveTo(-17,31.1,-20.8,27.5).curveTo(-24.7,23.7,-24.7,19.1).curveTo(-24.7,15.3,-22.2,12.1).curveTo(-19.7,8.8,-16.1,7.7).lineTo(-12.5,6.4).lineTo(-12.7,5.8).lineTo(-13,5.4).lineTo(-16.5,6.6).lineTo(-20.2,7.1).curveTo(-25.3,7.1,-28.7,4).curveTo(-32,0.7,-32,-4.1).curveTo(-32,-9.4,-28.7,-13).curveTo(-25.5,-16.8,-20.6,-16.8).curveTo(-17.8,-16.8,-15,-15.4).curveTo(-12.2,-14,-10.5,-11.6).lineTo(-8.4,-8.7).lineTo(-8,-8.8).lineTo(-7.4,-9.3).lineTo(-9.6,-12.2).curveTo(-10.7,-14,-11.3,-15.8).curveTo(-11.9,-17.9,-12,-19.9).curveTo(-12,-24.7,-8.5,-28).curveTo(-5.3,-31.1,-0.1,-31.1).curveTo(5.2,-31.1,8.5,-28).curveTo(11.7,-24.7,11.8,-19.9).curveTo(11.7,-17.7,11.2,-15.7).curveTo(10.7,-13.8,9.5,-12.2).lineTo(7.4,-9.3).lineTo(7.8,-9).lineTo(8.2,-8.7).lineTo(10.5,-11.6).curveTo(12.2,-14,14.8,-15.4).curveTo(17.6,-16.8,20.4,-16.8).curveTo(25.3,-16.8,28.5,-13).curveTo(32,-9.4,32,-4.1).curveTo(32,0.8,28.5,4).curveTo(25.3,7.1,20,7.1).lineTo(16.4,6.6).lineTo(12.9,5.5).curveTo(12.8,5.6,12.8,5.6).curveTo(12.7,5.7,12.7,5.7).curveTo(12.7,5.8,12.7,5.8).curveTo(12.7,5.9,12.7,6).lineTo(12.5,6.4).lineTo(15.9,7.7).curveTo(19.7,9.1,22.1,12.2).curveTo(24.5,15.3,24.5,19.1).curveTo(24.5,23.7,20.8,27.5).curveTo(16.9,31.1,11.9,31.1).curveTo(7.4,31.1,4,27.3).closePath().moveTo(-7.7,-5.9).curveTo(-10.9,-2.7,-10.9,1.8).curveTo(-10.9,6.3,-7.7,9.4).curveTo(-4.6,12.5,-0.1,12.5).curveTo(4.4,12.5,7.6,9.4).curveTo(10.6,6.3,10.6,1.8).curveTo(10.6,-2.7,7.6,-5.9).curveTo(4.4,-9,-0.1,-9).curveTo(-4.6,-9,-7.7,-5.9).closePath();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-31,64,62.2);


(lib.circle = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().drawEllipse(-10.8,-10.8,21.7,21.7);
	this.shape.setTransform(0,0,2.949,2.949);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32,-32,64,64);


(lib.blur_circle = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginRadialGradientFill(["#FFFFFF","rgba(255,255,255,0)"],[0,1],0,0,0,0,0,11).beginStroke().drawEllipse(-10.8,-10.8,21.7,21.7);
	this.shape.setTransform(0,0,3,3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-32.5,-32.5,65.1,65.1);


// stage content:
(lib.assetshapes = function() {
	this.initialize();

	// triangle
	this.instance = new lib.triangle();
	this.instance.setTransform(323.6,39.6);

	// square
	this.instance_1 = new lib.square();
	this.instance_1.setTransform(518,151.5);

	// kirakira2
	this.instance_2 = new lib.kirakira2();
	this.instance_2.setTransform(420.8,32.6);

	// kirakira
	this.instance_3 = new lib.kirakira();
	this.instance_3.setTransform(32,151.5);

	// flower
	this.instance_4 = new lib.flower();
	this.instance_4.setTransform(396.5,151.5);

	// star_10
	this.instance_5 = new lib.star_10();
	this.instance_5.setTransform(518,32.6);

	// star
	this.instance_6 = new lib.star();
	this.instance_6.setTransform(275,151.5);

	// circle
	this.instance_7 = new lib.circle();
	this.instance_7.setTransform(226.4,32.6);

	// reverse_blur_circle
	this.instance_8 = new lib.reverse_blur_circle();
	this.instance_8.setTransform(153.5,151.5);

	// blur_circle
	this.instance_9 = new lib.blur_circle();
	this.instance_9.setTransform(129.2,32.6);

	// heart
	this.instance_10 = new lib.heart();
	this.instance_10.setTransform(32,32.6);

	this.addChild(this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(275,200,554,187.5);

})( (particlejs = particlejs||{}).assets = particlejs.assets || {} , images = images||{}, createjs = createjs||{}, ss = ss||{});
var particlejs, images, createjs, ss;