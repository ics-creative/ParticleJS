import { ShapeGenerator } from "../assets/shape-generator";
import { ColorData } from "../data/data-color";
import { DrawingData } from "../data/data-drawing";
import { AlphaCurveType } from "../enum/alpha-curve-type";
import { Particle } from "./particle";

/**
 * ParticleJSのバージョン情報を示します。
 * @type {string}
 */
export const VERSION = "1.0.0";

/**
 * 現在のバージョンと互換性があるかどうかをチェックします。
 * @param value
 */
export function checkVersion(value: string) {
  const currentVersion = VERSION.split(".");

  //  ここはそもそもこない想定だけれども。
  if (currentVersion.length <= 2) {
    console.log("バージョン表記エラーが発生しました。");
    return false;
  }

  //  versionが空の場合
  if (!value) {
    if (currentVersion[0] == "0" && currentVersion[1] == "1") {
      //「0.1.▲」のバージョンのParticleSystemは問題なく動作させる
      return true;
    } else {
      //  バージョンが空の場合はエラー
      return false;
    }
  }

  const jsonVersion = value.split(".");

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

/**
 * パーティクルの制御クラスです。
 */
export class ParticleSystem {
  /**
   *  グラフィックオブジェクトです。内部計算に使用します。
   */
  private static HELPER_GRAPHICS: createjs.Graphics = new createjs.Graphics();

  /**
   * パーティクルが配置されるコンテナーです。
   */
  public container: createjs.Container;

  /** @private  */
  private _particlesPool: Particle[];
  /** @private  */
  private _activeParticles: Particle[];
  /** @private  */
  private _drawingData: DrawingData;
  /** @private  */
  private _frameCount: number = 0;
  /** @private  */
  private _playing: boolean;
  /** @private  */
  private shapeGenerator: ShapeGenerator;
  /**
   * パーティクルのアニメーションが再生されているかどうかを示します。
   * @returns {boolean}
   */
  public isPlaying(): boolean {
    return this._playing;
  }

  constructor() {
    this._drawingData = new DrawingData();
    this._particlesPool = [];
    this._activeParticles = [];

    this.container = new createjs.Container();

    // パフォーマンス向上の基本テクニック
    this.container.mouseChildren = false;
    this.container.mouseEnabled = false;

    this._playing = true;

    this.shapeGenerator = new ShapeGenerator();
  }

  /**
   * パーティクルの設定データを取り込みます。
   */
  public setData(drawingData: DrawingData) {
    this._drawingData = drawingData;
  }

  /**
   * パーティクルの設定データをJson形式のオブジェクトで取り込みます。
   */
  public importFromJson(jsonObject: any) {
    if (!checkVersion(jsonObject["VERSION"] || "")) {
      console.warn(
        "読み込んだJSONファイルとParticleJSのバージョンが異なります。\n" +
          "https://github.com/ics-creative/ParticleJS"
      );
    }

    this._drawingData.importFromJson(jsonObject);
  }

  /**
   * パーティクルシステムの更新を行います。
   */
  public update() {
    if (!this._playing) {
      return;
    }

    this.emit();
    this.animate();
    this.lifeCheck();
  }

  /**
   * パーティクルの動きを更新します。
   */
  private animate() {
    const rad =
      createjs.Matrix2D.DEG_TO_RAD * this._drawingData.accelerationDirection;
    const accX = Math.cos(rad) * this._drawingData.accelerationSpeed;
    const accY = Math.sin(rad) * this._drawingData.accelerationSpeed;

    for (let i = 0; i < this._activeParticles.length; i++) {
      const particle: Particle = this._activeParticles[i];

      // 加速度計算 (重力)
      particle.vx += accX;
      particle.vy += accY;

      // 摩擦計算
      particle.vx *= 1 - this._drawingData.friction;
      particle.vy *= 1 - this._drawingData.friction;

      // 座標計算
      particle.x += particle.vx;
      particle.y += particle.vy;

      // 座標の適用
      particle.particleShape.x = particle.x;
      particle.particleShape.y = particle.y;

      const lifeParcent = particle.currentLife / particle.totalLife;

      switch (Number(particle.alphaCurveType)) {
        case AlphaCurveType.Random:
          const min = Math.min(particle.finishAlpha, particle.startAlpha);
          const max = Math.max(particle.finishAlpha, particle.startAlpha);
          particle.particleShape.alpha = Math.random() * (max - min) + min;
          break;
        case AlphaCurveType.Normal:
        default:
          const alpha = this.calcCurrentValue(
            particle.startAlpha,
            particle.finishAlpha,
            lifeParcent
          );
          particle.particleShape.alpha = alpha;
          break;
      }

      const scale = this.calcCurrentValue(
        particle.startScale,
        particle.finishScale,
        lifeParcent
      );
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
   * パーティクルが生きているか確認します。
   */
  private lifeCheck(): void {
    for (let i = 0; i < this._activeParticles.length; i++) {
      // もしも死んでいたら、アクティブリストから外してプールに保存する。
      if (!this._activeParticles[i].isAlive) {
        const particle = this._activeParticles[i];
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
  public clear(): void {
    for (let i = 0; i < this._activeParticles.length; i++) {
      const particle = this._activeParticles[i];
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
  public dispose(): void {
    for (let i = 0; i < this._activeParticles.length; i++) {
      const particle = this._activeParticles[i];
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
   * パーティクルの生成を行います。
   */
  private emit(): void {
    // インターバルチェック
    const framerate = Math.round(createjs.Ticker.framerate);
    const frameInSec = this._frameCount % framerate;
    const emitPerSec = this._drawingData.emitFrequency;
    const loopInt = emitPerSec == 0 ? 0 : Math.floor(emitPerSec / framerate);

    // ① 整数分の実行回数
    for (let i = 0; i < loopInt; i++) {
      this.emitParticle();
    }

    // ② 小数点分の実行回数
    const loopFloat = emitPerSec / framerate - loopInt;
    // フレームレートより少ない場合、かつ、生成persecが0ではないとき
    if (emitPerSec != 0 && frameInSec % Math.floor(1 / loopFloat) == 0) {
      this.emitParticle();
    }

    this._frameCount++;
    if (this._frameCount >= framerate) {
      this._frameCount = 0;
    }
  }

  /**
   * 個々のパーティクルを生成し、パーティクルシステムに登録します。
   * @returns {Particle}
   */
  private emitParticle(): void {
    const particle = this.generateParticle();
    this.container.addChild(particle.particleShape);
    this._activeParticles.push(particle);
  }

  /**
   * パーティクルを生成し、パラメーターを設定します。
   * @returns {Particle}
   */
  private generateParticle(): Particle {
    let particle: Particle = null;
    if (this._particlesPool.length >= 1) {
      particle = this._particlesPool.shift();
    } else {
      particle = new Particle();
    }

    this.setParticleParameter(particle);

    return particle;
  }

  /**
   * パーティクルパラメータの設定を行います。
   * @param particle
   */
  private setParticleParameter(particle: Particle): void {
    particle.particleShape.removeAllChildren();

    particle.isAlive = true;
    particle.x = this.calcRandomValueWithVariance(
      this._drawingData.startX,
      this._drawingData.startXVariance,
      false
    );
    particle.y = this.calcRandomValueWithVariance(
      this._drawingData.startY,
      this._drawingData.startYVariance,
      false
    );

    this.generateShape(particle, this._drawingData.shapeIdList);

    //  生存期間
    particle.totalLife = Math.max(
      1,
      this.calcRandomValueWithVariance(
        this._drawingData.lifeSpan,
        this._drawingData.lifeSpanVariance,
        true
      )
    );
    particle.currentLife = particle.totalLife;

    //  スピード
    const speed: number = Math.max(
      0,
      this.calcRandomValueWithVariance(
        this._drawingData.initialSpeed,
        this._drawingData.initialSpeedVariance,
        false
      )
    );
    const angle =
      createjs.Matrix2D.DEG_TO_RAD *
      this.calcRandomValueWithVariance(
        this._drawingData.initialDirection,
        this._drawingData.initialDirectionVariance,
        false
      );
    particle.vx = Math.cos(angle) * speed;
    particle.vy = Math.sin(angle) * speed;

    //  アルファ
    particle.startAlpha = this.calcRandomValueWithRange(
      0.0,
      1.0,
      this.calcRandomValueWithVariance(
        this._drawingData.startAlpha,
        this._drawingData.startAlphaVariance,
        false
      )
    );
    particle.finishAlpha = this.calcRandomValueWithRange(
      0.0,
      1.0,
      this.calcRandomValueWithVariance(
        this._drawingData.finishAlpha,
        this._drawingData.finishAlphaVariance,
        false
      )
    );

    //  スケール
    particle.startScale = Math.max(
      0,
      this.calcRandomValueWithVariance(
        this._drawingData.startScale,
        this._drawingData.startScaleVariance,
        false
      )
    );
    particle.finishScale = Math.max(
      0,
      this.calcRandomValueWithVariance(
        this._drawingData.finishScale,
        this._drawingData.finishScaleVariance,
        false
      )
    );

    // ブレンドモードを設定
    particle.particleShape.compositeOperation =
      this._drawingData.blendMode == true ? "lighter" : null;

    particle.alphaCurveType = this._drawingData.alphaCurveType;
  }

  /**
   * パーティクルに使用するシェイプを生成します。
   * @param particle
   * @param shapeIdList
   */
  public generateShape(particle: Particle, shapeIdList: string[]) {
    particle.particleShape.removeAllChildren();

    const startColor: ColorData = this._drawingData.startColor;

    particle.startColor.hue =
      this.calcRandomValueWithVariance(
        startColor.hue,
        startColor.hueVariance,
        false
      ) % 360;
    particle.startColor.luminance = this.calcRandomValueWithVariance(
      startColor.luminance,
      startColor.luminanceVariance,
      false
    );
    particle.startColor.saturation = this.calcRandomValueWithVariance(
      startColor.saturation,
      startColor.saturationVariance,
      false
    );

    const hue = Number(particle.startColor.hue);
    const saturation = Number(particle.startColor.saturation);
    const luminance = Number(particle.startColor.luminance);

    const color = `hsl(${hue}, ${saturation}%, ${luminance}%)`;

    const r = Math.floor(Math.random() * this._drawingData.shapeIdList.length);
    const shapeId =
      this._drawingData.shapeIdList.length == 0
        ? ""
        : this._drawingData.shapeIdList[r];

    particle.colorCommand = null;

    const container = <createjs.Container>this.shapeGenerator.generateShape(
      shapeId
    );
    particle.particleShape.addChild(container);

    const shape = <createjs.Shape>container.getChildAt(0); // こういう作りにする

    if (shape == null) {
      return;
    }

    const instructions = shape.graphics.instructions;
    if (instructions && instructions.length > 0) {
      for (let i = 0; i < instructions.length; i++) {
        const cmd = instructions[i];
        if (cmd instanceof createjs.Graphics.Fill) {
          // 塗りのとき
          // グラデーション塗りだったら
          if (cmd.style instanceof CanvasGradient) {
            // 昔のグラデーションを保持
            const oldStyle = <any>cmd.style;
            const g = ParticleSystem.HELPER_GRAPHICS;
            const newStyle = g.beginRadialGradientFill(
              [color, `hsla(${hue}, ${saturation}%, ${luminance}%, 0)`],
              oldStyle.props.ratios,
              oldStyle.props.x0,
              oldStyle.props.y0,
              oldStyle.props.r0,
              oldStyle.props.x1,
              oldStyle.props.y1,
              oldStyle.props.r1
            ).command;
            instructions[i] = newStyle;
          } else {
            // 単色塗りなら
            cmd.style = color;
            particle.colorCommand = cmd;
          }
        } else if (cmd instanceof createjs.Graphics.Stroke) {
          // 線のとき
          cmd.style = color;
          particle.colorCommand = cmd;
        }
      }
    }
  }

  /**
   * 一時的にパーティクルの再生を停止します。
   */
  public pause(): void {
    this._playing = false;
  }

  /**
   * pause()で停止したパーティクルの再生を再開します。
   */
  public resume(): void {
    this._playing = true;
  }

  /**
   * 一定範囲の数値を計算します。
   * @param minValue
   * @param maxValue
   * @param value
   * @returns {number}
   */
  private calcRandomValueWithRange(
    minValue: number,
    maxValue: number,
    value: number
  ): number {
    return Math.min(maxValue, Math.max(minValue, value));
  }

  /**
   * ばらつきのある値を計算し取得します。
   * @param value 基準値です。
   * @param variance バラつきの範囲です。
   * @param isInteger 整数であるかを指定します。
   * @returns {number}  数値を返します。
   */
  private calcRandomValueWithVariance(
    value: number,
    variance: number,
    isInteger: boolean
  ): number {
    const result = Number(value) + (Math.random() - 0.5) * variance;

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
  private calcCurrentValue(start: number, end: number, life: number): number {
    return Number(start) * life + Number(end) * (1 - life);
  }

  /**
   * 1秒あたりの発生数です。
   * @param value
   */
  public set emitFrequency(value: number) {
    this._drawingData.emitFrequency = value;
  }

  /**
   * 1秒あたりの発生数です。
   * @returns {number}
   */
  public get emitFrequency(): number {
    return this._drawingData.emitFrequency;
  }

  /**
   * 発生基準位置 - X座標 (px)です。
   * @param value
   */
  public set startX(value: number) {
    this._drawingData.startX = value;
  }

  /**
   * 発生基準位置 - X座標 (px)です。
   * @returns {number}
   */
  public get startX(): number {
    return this._drawingData.startX;
  }

  /**
   * 発生基準位置 - X座標のばらつき (px)です。
   * @param value
   */
  public set startXVariance(value: number) {
    this._drawingData.startXVariance = value;
  }

  /**
   * 発生基準位置 - X座標のばらつき (px)です。
   * @returns {number}
   */
  public get startXVariance(): number {
    return this._drawingData.startX;
  }

  /**
   * 発生位置 - Y座標 (px)です。
   * @param value
   */
  public set startY(value: number) {
    this._drawingData.startY = value;
  }

  /**
   * 発生位置 - Y座標 (px)です。
   * @returns {number}
   */
  public get startY(): number {
    return this._drawingData.startY;
  }

  /**
   * 発生基準位置 - X座標のばらつき (px)です。
   * @param value
   */
  public set startYVariance(value: number) {
    this._drawingData.startYVariance = value;
  }

  /**
   * 発生基準位置 - X座標のばらつき (px)です。
   * @returns {number}
   */
  public get startYVariance(): number {
    return this._drawingData.startYVariance;
  }

  /**
   * 初期速度 - 方向 (度)です。
   * @param value
   */
  public set initialDirection(value: number) {
    this._drawingData.initialDirection = value;
  }

  /**
   * 初期速度 - 方向 (度)です。
   * @returns {number}
   */
  public get initialDirection(): number {
    return this._drawingData.initialDirection;
  }

  /**
   * 初期速度 - 方向のばらつき (度)です。
   * @param value
   */
  public set initialDirectionVariance(value: number) {
    this._drawingData.initialDirectionVariance = value;
  }

  /**
   * 初期速度 - 方向のばらつき (度)です。
   * @returns {number}
   */
  public get initialDirectionVariance(): number {
    return this._drawingData.initialDirectionVariance;
  }

  /**
   * 初期速度 (px)です。
   * @param value
   */
  public set initialSpeed(value: number) {
    this._drawingData.initialSpeed = value;
  }

  /**
   * 初期速度 (px)です。
   * @returns {number}
   */
  public get initialSpeed(): number {
    return this._drawingData.initialSpeed;
  }

  /**
   * 初期速度のばらつきです。
   * @param value
   */
  public set initialSpeedVariance(value: number) {
    this._drawingData.initialSpeedVariance = value;
  }

  /**
   * 初期速度のばらつきです。
   * @returns {number}
   */
  public get initialSpeedVariance(): number {
    return this._drawingData.initialSpeedVariance;
  }

  /**
   * 摩擦です。
   * @param value
   */
  public set friction(value: number) {
    this._drawingData.friction = value;
  }

  /**
   * 摩擦です。
   * @returns {number}
   */
  public get friction(): number {
    return this._drawingData.friction;
  }

  /**
   * 重力です。
   * @param value
   */
  public set accelerationSpeed(value: number) {
    this._drawingData.accelerationSpeed = value;
  }

  /**
   * 重力です。
   * @returns {number}
   */
  public get accelerationSpeed(): number {
    return this._drawingData.accelerationSpeed;
  }

  /**
   * 重力方向 (度)です。
   * @param value
   */
  public set accelerationDirection(value: number) {
    this._drawingData.accelerationDirection = value;
  }

  /**
   * 重力です。
   * @returns {number}
   */
  public get accelerationDirection(): number {
    return this._drawingData.accelerationDirection;
  }

  /**
   * 開始時のスケールです。
   * @param value
   */
  public set startScale(value: number) {
    this._drawingData.startScale = value;
  }

  /**
   * 開始時のスケールです。
   * @returns {number}
   */
  public get startScale(): number {
    return this._drawingData.startScale;
  }

  /**
   * 開始時のスケールのばらつきです。
   * @param value
   */
  public set startScaleVariance(value: number) {
    this._drawingData.startScaleVariance = value;
  }

  /**
   * 開始時のスケールのばらつきです。
   * @returns {number}
   */
  public get startScaleVariance(): number {
    return this._drawingData.startScaleVariance;
  }

  /**
   * 終了時のスケールです。
   * @param value
   */
  public set finishScale(value: number) {
    this._drawingData.finishScale = value;
  }

  /**
   * 終了時のスケールです。
   * @returns {number}
   */
  public get finishScale(): number {
    return this._drawingData.finishScale;
  }

  /**
   * 終了時のスケールのばらつきです。
   * @param value
   */
  public set finishScaleVariance(value: number) {
    this._drawingData.finishScaleVariance = value;
  }

  /**
   * 終了時のスケールのばらつきです。
   * @returns {number}
   */
  public get finishScaleVariance(): number {
    return this._drawingData.finishScaleVariance;
  }

  /**
   * ライフ(フレーム数)です。
   * @param value
   */
  public set lifeSpan(value: number) {
    this._drawingData.lifeSpan = value;
  }

  /**
   * ライフ(フレーム数)です。
   * @returns {number}
   */
  public get lifeSpan(): number {
    return this._drawingData.lifeSpan;
  }

  /**
   * ライフのばらつき(フレーム数)です。
   * @param value
   */
  public set lifeSpanVariance(value: number) {
    this._drawingData.lifeSpanVariance = value;
  }

  /**
   * ライフのばらつき(フレーム数)です。
   * @returns {number}
   */
  public get lifeSpanVariance(): number {
    return this._drawingData.lifeSpanVariance;
  }

  /**
   * 始時の透明度です。
   * @param value
   */
  public set startAlpha(value: number) {
    this._drawingData.startAlpha = value;
  }

  /**
   * 始時の透明度です。
   * @returns {number}
   */
  public get startAlpha(): number {
    return this._drawingData.startAlpha;
  }

  /**
   * 開始時の透明度のばらつきです。
   * @param value
   */
  public set startAlphaVariance(value: number) {
    this._drawingData.startAlphaVariance = value;
  }

  /**
   * 開始時の透明度のばらつきです。
   * @returns {number}
   */
  public get startAlphaVariance(): number {
    return this._drawingData.startAlphaVariance;
  }

  /**
   * 終了時の透明度です。
   * @param value
   */
  public set finishAlpha(value: number) {
    this._drawingData.finishAlpha = value;
  }

  /**
   * 終了時の透明度です。
   * @returns {number}
   */
  public get finishAlpha(): number {
    return this._drawingData.finishAlpha;
  }

  /**
   * 終了時の透明度のばらつきです。
   * @param value
   */
  public set finishAlphaVariance(value: number) {
    this._drawingData.finishAlphaVariance = value;
  }

  /**
   * 終了時の透明度のばらつきです。
   * @returns {number}
   */
  public get finishAlphaVariance(): number {
    return this._drawingData.finishAlphaVariance;
  }

  /**
   * 使用するシェイプID設定です。
   * @param string[]
   */
  public set shapeIdList(value: string[]) {
    this._drawingData.shapeIdList = value;
  }

  /**
   * 使用するシェイプID設定です。
   * @returns {string[]}
   */
  public get shapeIdList(): string[] {
    return this._drawingData.shapeIdList;
  }

  /**
   * 初期カラーの設定です。
   * @param value
   */
  public set startColor(value: ColorData) {
    this._drawingData.startColor = value;
  }

  /**
   * 初期カラーの設定です。
   * @returns {ColorData}
   */
  public get startColor(): ColorData {
    return this._drawingData.startColor;
  }

  /**
   * trueのときシェイプを加算合成します。
   * @param value
   */
  public set blendMode(value: boolean) {
    this._drawingData.blendMode = value;
  }

  /**
   * trueのときシェイプを加算合成します。
   * @returns {boolean}
   */
  public get blendMode(): boolean {
    return this._drawingData.blendMode;
  }

  /**
   * 透明度の計算式の設定です。
   * @param value - 0:通常, 1:ランダム
   */
  public set alphaCurveType(value: number) {
    this._drawingData.alphaCurveType = value;
  }

  /**
   * 透明度の計算式の設定です。
   * @returns {number}
   */
  public get alphaCurveType(): number {
    return this._drawingData.alphaCurveType;
  }
}
