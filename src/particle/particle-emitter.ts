"use strict";

import {Particle} from "./particle";
import {DrawingData} from "../data/data-drawing";
import {ShapeGenerator} from "../assets/shape-generator";
import {ColorData} from "../data/data-color";
import {AlphaCurveType} from "../enum/alpha-curve-type";

/** パーティクルの発生装置の制御クラスです。 */
export class ParticleEmitter {

  /** グラフィックオブジェクトです。内部計算に使用します。 */
  static HELPER_GRAPHICS:createjs.Graphics = new createjs.Graphics();

  public container:createjs.Container;
  private _particlesPool:Particle[];
  private _activeParticles:Particle[];
  private _drawingData:DrawingData;
  private _frameCount:number = 0;

  constructor() {
    this._particlesPool = [];
    this._activeParticles = [];

    this.container = new createjs.Container();

    // パフォーマンス向上の基本テクニック
    this.container.mouseChildren = false;
    this.container.mouseEnabled = false;

    this.shapeGenerator = new ShapeGenerator();
  }

  private shapeGenerator:ShapeGenerator;

  public update(drawingData:DrawingData) {
    this._drawingData = drawingData;

    this.emit();
    this.animate();
    this.lifeCheck();
  }

  /**
   * パーティクルの動き。
   */
  private animate() {

    let rad = createjs.Matrix2D.DEG_TO_RAD * this._drawingData.accelerationDirection;
    let accX = Math.cos(rad) * this._drawingData.accelerationSpeed;
    let accY = Math.sin(rad) * this._drawingData.accelerationSpeed;

    for (let i = 0; i < this._activeParticles.length; i++) {

      let particle:Particle = this._activeParticles[i];

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

      let lifeParcent = particle.currentLife / particle.totalLife;

      switch (Number(particle.alphaCurveType)) {
        case AlphaCurveType.Random:
          let min = Math.min(particle.finishAlpha, particle.startAlpha);
          let max = Math.max(particle.finishAlpha, particle.startAlpha);
          particle.particleShape.alpha = Math.random() * (max - min) + min;
          break;
        case AlphaCurveType.Normal:
        default:
          let alpha = this.calcCurrentValue(particle.startAlpha, particle.finishAlpha, lifeParcent);
          particle.particleShape.alpha = alpha;
          break;
      }

      let scale = this.calcCurrentValue(particle.startScale, particle.finishScale, lifeParcent);
      particle.particleShape.scaleX = particle.particleShape.scaleY = scale;

      //  パーティクルが死んでいたら、オブジェクトプールに移動
      if (particle.currentLife < 0) {
        particle.isAlive = false;
      }

      // 年齢追加
      particle.currentLife--;
    }
  }

  /**
   * パーティクルが生きているか確認する。
   */
  private lifeCheck() {
    for (let i = 0; i < this._activeParticles.length; i++) {
      // もしも死んでいたら、アクティブリストから外してプールに保存する。
      if (!this._activeParticles[i].isAlive) {
        let particle = this._activeParticles[i];
        this.container.removeChild(particle.particleShape);
        this._activeParticles.splice(i, 1);
        this._particlesPool.push(particle);
        i--;
      }
    }
  }

  /**
   * パーティクルを全て削除します。
   */
  public clear() {
    for (let i = 0; i < this._activeParticles.length; i++) {
      let particle = this._activeParticles[i];
      particle.isAlive = false;
      this.container.removeChild(particle.particleShape);
      this._activeParticles.splice(i, 1);
      this._particlesPool.push(particle);
      i--;
    }
  }

  /**
   * パーティクルシステムを破棄します。
   */
  public dispose() {
    for (let i = 0; i < this._activeParticles.length; i++) {
      let particle = this._activeParticles[i];
      particle.isAlive = false;
      this.container.removeChild(particle.particleShape);
    }

    this._activeParticles.splice(0, this._activeParticles.length);
    this._particlesPool.splice(0, this._particlesPool.length);

    this._activeParticles = null;
    this._particlesPool = null;

    this.container = null;
  }

  /**
   * パーティクルの生成（インターバルチェックする）
   */
  private emit() {

    const framerate = Math.round(createjs.Ticker.framerate);
    const frameInSec = this._frameCount % framerate;
    const emitPerSec = this._drawingData.emitFrequency;
    const loopInt = Math.floor(emitPerSec / framerate);


    // ① 整数分の実行回数
    for (let i = 0; i < loopInt; i++) {
      this.emitParticle();
    }

    // ② 小数点分の実行回数
    const loopFloat = ((emitPerSec / framerate) - loopInt);
    // フレームレートより少ない場合
    if (frameInSec % Math.floor(1 / loopFloat) == 0) {
      this.emitParticle();
    }

    this._frameCount++;
    if (this._frameCount >= framerate) {
      this._frameCount = 0;
    }

  }

  private emitParticle():void {
    let particle = this.generateParticle();
    this.container.addChild(particle.particleShape);
    this._activeParticles.push(particle);
  }

  /**
   * パーティクルのパラメータを設定します
   * @returns {null}
   */
  private generateParticle():Particle {

    let particle:Particle = null;
    if (this._particlesPool.length >= 1) {
      particle = this._particlesPool.shift();
    } else {
      particle = new Particle();
    }

    this.setParticleParamater(particle);

    return particle;
  }

  /**
   * パーティクルパラメータの設定
   * @param particle
   */
  private setParticleParamater(particle:Particle):void {

    particle.particleShape.removeAllChildren();

    particle.isAlive = true;
    particle.x = this.calcRandomValueWithVariance(this._drawingData.startX, this._drawingData.startXVariance, false);
    particle.y = this.calcRandomValueWithVariance(this._drawingData.startY, this._drawingData.startYVariance, false);


    this.generateShape(particle, this._drawingData.shapeIdList);

    //  生存期間
    particle.totalLife = Math.max(1, this.calcRandomValueWithVariance(this._drawingData.lifeSpan, this._drawingData.lifeSpanVariance, true));
    particle.currentLife = particle.totalLife;

    //  スピード
    let speed:number = Math.max(0, this.calcRandomValueWithVariance(this._drawingData.initialSpeed, this._drawingData.initialSpeedVariance, false));
    let angle = createjs.Matrix2D.DEG_TO_RAD * ( this.calcRandomValueWithVariance(this._drawingData.initialDirection, this._drawingData.initialDirectionVariance, false));
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
  }


  public generateShape(particle:Particle, shapeIdList:string[]) {

    particle.particleShape.removeAllChildren();

    let startColor:ColorData = this._drawingData.startColor;

    particle.startColor.hue = this.calcRandomValueWithVariance(startColor.hue, startColor.hueVariance, false) % 360;
    particle.startColor.luminance = this.calcRandomValueWithVariance(startColor.luminance, startColor.luminanceVariance, false);
    particle.startColor.satuation = this.calcRandomValueWithVariance(startColor.satuation, startColor.satuationVariance, false);

    let hue = Number(particle.startColor.hue);
    let satuation = Number(particle.startColor.satuation);
    let luminance = Number(particle.startColor.luminance);

    let color = `hsl(${hue}, ${satuation}%, ${luminance}%)`;

    let r = Math.floor(Math.random() * this._drawingData.shapeIdList.length);
    let shapeId = ( this._drawingData.shapeIdList.length == 0 )
      ? ''
      : this._drawingData.shapeIdList[r]

    particle.colorCommand = null;

    let container = <createjs.Container> this.shapeGenerator.generateShape(shapeId);
    let shape = <createjs.Shape> container.getChildAt(0); // こういう作りにする

    let instructions = shape.graphics.instructions;
    if (instructions && instructions.length > 0) {
      for (let i = 0; i < instructions.length; i++) {
        let cmd = instructions[i];
        if (cmd instanceof createjs.Graphics.Fill) { // 塗りのとき
          // グラデーション塗りだったら
          if (cmd.style instanceof CanvasGradient) {
            // 昔のグラデーションを保持
            let oldStyle = <any> cmd.style;
            let g = ParticleEmitter.HELPER_GRAPHICS;
            let newStyle = g.beginRadialGradientFill([color, `hsla(${hue}, ${satuation}%, ${luminance}%, 0)`],
              oldStyle.props.ratios,
              oldStyle.props.x0,
              oldStyle.props.y0,
              oldStyle.props.r0,
              oldStyle.props.x1,
              oldStyle.props.y1,
              oldStyle.props.r1).command;
            instructions[i] = newStyle;
          } else { // 単色塗りなら
            cmd.style = color;
            particle.colorCommand = cmd;
          }
        } else if (cmd instanceof createjs.Graphics.Stroke) { // 線のとき
          cmd.style = color;
          particle.colorCommand = cmd;
        }
      }
    }
    particle.particleShape.addChild(container);
  }

  /**
   * 一定範囲の数値を計算します。
   * @param minValue
   * @param maxValue
   * @param value
   * @returns {number}
   */
  private calcRandomValueWithRange(minValue:number, maxValue:number, value:number):number {
    return Math.min(maxValue, Math.max(minValue, value));
  }

  /**
   * ばらつきのある値を計算し取得します。
   * @param value 基準値です。
   * @param variance バラつきの範囲です。
   * @param isInteger 整数であるかを指定します。
   * @returns {number}  数値を返します。
   */
  private calcRandomValueWithVariance(value:number, variance:number, isInteger:boolean):number {
    let result = Number(value) + ( Math.random() - 0.5 ) * variance;

    if (isInteger == true) {
      return Math.floor(result);
    }

    return result;
  }

  /**
   * 現在の年齢依存の数値を計算します。
   * @param start 開始時の値です。
   * @param end 終了時の値です。
   * @param life 現在の寿命を示します。開始時は1.0で、終了時は0.0の想定です。
   * @returns {number} 現在の値です。
   */
  private calcCurrentValue(start:number, end:number, life:number):number {
    return Number(start) * life + Number(end) * (1 - life);
  }
}