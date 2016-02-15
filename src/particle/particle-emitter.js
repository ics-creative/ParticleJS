System.register(["./particle", "../assets/shape-generator", "../enum/alpha-curve-type"], function(exports_1) {
    "use strict";
    var particle_1, shape_generator_1, alpha_curve_type_1;
    var ParticleEmitter;
    return {
        setters:[
            function (particle_1_1) {
                particle_1 = particle_1_1;
            },
            function (shape_generator_1_1) {
                shape_generator_1 = shape_generator_1_1;
            },
            function (alpha_curve_type_1_1) {
                alpha_curve_type_1 = alpha_curve_type_1_1;
            }],
        execute: function() {
            /** パーティクルの発生装置の制御クラスです。 */
            ParticleEmitter = (function () {
                function ParticleEmitter() {
                    this._frameCount = 0;
                    this._particlesPool = [];
                    this._activeParticles = [];
                    this.container = new createjs.Container();
                    // パフォーマンス向上の基本テクニック
                    this.container.mouseChildren = false;
                    this.container.mouseEnabled = false;
                    this.shapeGenerator = new shape_generator_1.ShapeGenerator();
                }
                ParticleEmitter.prototype.update = function (drawingData) {
                    this._drawingData = drawingData;
                    this.emit();
                    this.animate();
                    this.lifeCheck();
                };
                /**
                 * パーティクルの動き。
                 */
                ParticleEmitter.prototype.animate = function () {
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
                 * パーティクルが生きているか確認する。
                 */
                ParticleEmitter.prototype.lifeCheck = function () {
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
                 * パーティクルをいったんすべて削除する
                 */
                ParticleEmitter.prototype.clear = function () {
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
                 * パーティクルシステムを破棄します
                 */
                ParticleEmitter.prototype.dispose = function () {
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
                 * パーティクルの生成（インターバルチェックする）
                 */
                ParticleEmitter.prototype.emit = function () {
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
                ParticleEmitter.prototype.emitParticle = function () {
                    var particle = this.generateParticle();
                    this.container.addChild(particle.particleShape);
                    this._activeParticles.push(particle);
                };
                /**
                 * パーティクルのパラメータを設定します
                 * @returns {null}
                 */
                ParticleEmitter.prototype.generateParticle = function () {
                    var particle = null;
                    if (this._particlesPool.length >= 1) {
                        particle = this._particlesPool.shift();
                    }
                    else {
                        particle = new particle_1.Particle();
                    }
                    this.setParticleParamater(particle);
                    return particle;
                };
                /**
                 * パーティクルパラメータの設定
                 * @param particle
                 */
                ParticleEmitter.prototype.setParticleParamater = function (particle) {
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
                ParticleEmitter.prototype.generateShape = function (particle, shapeIdList) {
                    particle.particleShape.removeAllChildren();
                    var startColor = this._drawingData.startColor;
                    particle.startColor.hue = this.calcRandomValueWithVariance(startColor.hue, startColor.hueVariance, false) % 360;
                    particle.startColor.luminance = this.calcRandomValueWithVariance(startColor.luminance, startColor.luminanceVariance, false);
                    particle.startColor.satuation = this.calcRandomValueWithVariance(startColor.satuation, startColor.satuationVariance, false);
                    var hue = Number(particle.startColor.hue);
                    var satuation = Number(particle.startColor.satuation);
                    var luminance = Number(particle.startColor.luminance);
                    var color = "hsl(" + hue + ", " + satuation + "%, " + luminance + "%)";
                    var r = Math.floor(Math.random() * this._drawingData.shapeIdList.length);
                    var shapeId = (this._drawingData.shapeIdList.length == 0)
                        ? ''
                        : this._drawingData.shapeIdList[r];
                    particle.colorCommand = null;
                    var container = this.shapeGenerator.generateShape(shapeId);
                    var shape = container.getChildAt(0); // こういう作りにする
                    var instructions = shape.graphics.instructions;
                    if (instructions && instructions.length > 0) {
                        for (var i = 0; i < instructions.length; i++) {
                            var cmd = instructions[i];
                            if (cmd instanceof createjs.Graphics.Fill) {
                                // グラデーション塗りだったら
                                if (cmd.style instanceof CanvasGradient) {
                                    // 昔のグラデーションを保持
                                    var oldStyle = cmd.style;
                                    var g = ParticleEmitter.HELPER_GRAPHICS;
                                    var newStyle = g.beginRadialGradientFill([color, ("hsla(" + hue + ", " + satuation + "%, " + luminance + "%, 0)")], oldStyle.props.ratios, oldStyle.props.x0, oldStyle.props.y0, oldStyle.props.r0, oldStyle.props.x1, oldStyle.props.y1, oldStyle.props.r1).command;
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
                    particle.particleShape.addChild(container);
                };
                /**
                 * 一定範囲の数値を計算します。
                 * @param minValue
                 * @param maxValue
                 * @param value
                 * @returns {number}
                 */
                ParticleEmitter.prototype.calcRandomValueWithRange = function (minValue, maxValue, value) {
                    return Math.min(maxValue, Math.max(minValue, value));
                };
                /**
                 * ばらつきのある値を計算し取得します。
                 * @param value 基準値です。
                 * @param variance バラつきの範囲です。
                 * @param isInteger 整数であるかを指定します。
                 * @returns {number}  数値を返します。
                 */
                ParticleEmitter.prototype.calcRandomValueWithVariance = function (value, variance, isInteger) {
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
                ParticleEmitter.prototype.calcCurrentValue = function (start, end, life) {
                    return Number(start) * life + Number(end) * (1 - life);
                };
                /** グラフィックオブジェクトです。内部計算に使用します。 */
                ParticleEmitter.HELPER_GRAPHICS = new createjs.Graphics();
                return ParticleEmitter;
            })();
            exports_1("ParticleEmitter", ParticleEmitter);
        }
    }
});
//# sourceMappingURL=particle-emitter.js.map