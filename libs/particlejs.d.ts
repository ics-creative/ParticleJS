declare module particlejs {

  /**
   * バージョンです。
   */
  const VERSION:string;

  /**
   * 現在のバージョンと互換性があるかどうかをチェックします。
   */
  function checkVersion(value: string): boolean;

  /**
   * パーティクルの制御クラスです。
   */
  export class ParticleSystem {

    /**
     * パーティクルが配置されるコンテナーです。
     */
    container:createjs.Container;

    /**
     * パーティクルのアニメーションが再生されているかどうか。
     */
    isPlaying():boolean;

    /**
     * パーティクルの設定データを取り込みます。
     */
    setData(drawingData:DrawingData):void;

    /**
     * パーティクルの設定データをJson形式のオブジェクトで取り込みます。
     */
    importFromJson(jsonObject:any):void;

    /**
     * パーティクルシステムの更新を行います。
     */
    update():void;

    /**
     * パーティクルを全て削除します。
     */
    clear():void;

    /**
     * パーティクルシステムを破棄します。
     */
    dispose():void;

    /**
     * 一時的にパーティクルの再生を停止します。
     */
    pause():void;

    /**
     * pause()で停止したパーティクルの再生を再開します。
     */
    resume():void;

    /**
     * 1秒あたりの発生数です。
     */
    emitFrequency:number;
    /**
     * 発生基準位置 - X座標 (px)です。
     */
    startX:number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     */
    startXVariance:number;
    /**
     * 発生位置 - Y座標 (px)です。
     */
    startY:number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     */
    startYVariance:number;
    /**
     * 初期速度 - 方向 (度)です。
     */
    initialDirection:number;
    /**
     * 初期速度 - 方向のばらつき (度)です。
     */
    initialDirectionVariance:number;
    /**
     * 初期速度 (px)です。
     */
    initialSpeed:number;
    /**
     * 初期速度のばらつきです。
     */
    initialSpeedVariance:number;
    /**
     * 摩擦です。
     */
    friction:number;
    /**
     * 重力です。
     */
    accelerationSpeed:number;
    /**
     * 重力です。
     */
    accelerationDirection:number;
    /**
     * 開始時のスケールです。
     */
    startScale:number;
    /**
     * 開始時のスケールのばらつきです。
     */
    startScaleVariance:number;
    /**
     * 終了時のスケールです。
     */
    finishScale:number;
    /**
     * 終了時のスケールのばらつきです。
     */
    finishScaleVariance:number;
    /**
     * ライフ(フレーム数)です。
     */
    lifeSpan:number;
    /**
     * ライフのばらつき(フレーム数)です。
     */
    lifeSpanVariance:number;
    /**
     * 始時の透明度です。
     */
    /**
     * 始時の透明度です。
     */
    startAlpha:number;
    /**
     * 開始時の透明度のばらつきです。
     */
    startAlphaVariance:number;
    /**
     * 終了時の透明度です。
     */
    finishAlpha:number;
    /**
     * 終了時の透明度のばらつきです。
     * @param value
     */
    finishAlphaVariance:number;
    /**
     * 使用するシェイプID設定です。
     */
    shapeIdList:string[];
    /**
     * 初期カラーの設定です。
     */
    startColor:ColorData;
    /**
     * trueのときシェイプを加算合成します。
     */
    blendMode:boolean;
    /**
     * 透明度の計算式の設定です。
     * 0:通常, 1:ランダム
     */
    alphaCurveType:number;
  }

  export class DrawingData {

    /** 設定された背景の幅です。 */
    width:number;

    /** 設定された背景の高さです。 */
    height:number;

    /** 背景職です。 */
    bgColor:string;

    /** 1秒あたりの発生数です。 */
    emitFrequency:number;
    /** 発生基準位置 - X座標 (px)です。 */
    startX:number;
    /** 発生基準位置 - X座標のばらつき (px)です。 */
    startXVariance:number;
    /** 発生位置 - Y座標 (px)です。 */
    startY:number;
    /** 発生位置 - Y座標のばらつき (px)です。 */
    startYVariance:number;
    /** 初期速度 - 方向 (度)です。 */
    initialDirection:number;
    /** 初期速度 - 方向のばらつき (度)です。 */
    initialDirectionVariance:number;
    /** 初期速度 (px)です。 */
    initialSpeed:number;
    /** 初期速度のばらつきです。 */
    initialSpeedVariance:number;
    /** 摩擦です。 */
    friction:number;
    /** 重力です。 */
    accelerationSpeed:number;
    /** 重力方向 (度)です。 */
    accelerationDirection:number;
    /** 開始時のスケールです。 */
    startScale:number;
    /** 開始時のスケールのばらつきです。 */
    startScaleVariance:number;
    /** 終了時のスケールです。 */
    finishScale:number;
    /** 終了時のスケールのばらつきです。 */
    finishScaleVariance:number;
    /** ライフ(フレーム数)です。 */
    lifeSpan:number;
    /** ライフのばらつき(フレーム数)です。 */
    lifeSpanVariance:number;
    /** 開始時の透明度です。 */
    startAlpha:number;
    /** 開始時の透明度のばらつきです。 */
    startAlphaVariance:number;
    /** 終了時の透明度です。 */
    finishAlpha:number;
    /** 終了時の透明度のばらつきです。 */
    finishAlphaVariance:number;
    /** 使用するシェイプID設定です。 */
    shapeIdList:string[];
    /** 初期カラーの設定です。 */
    startColor:ColorData;
    /** シェイプを加算合成します。 */
    blendMode:boolean;
    /** 透明度の計算式の設定です。 */
    alphaCurveType:number;

    /**
     * パーティクルの設定をJSON形式のオブジェクトから読み込みます。
     * @param json
     */
    importFromJson(json:any):void;

    /**
     * データを取り込みます。
     * @param json
     */
    importData(data:particlejs.DrawingData):void;
  }

  /**
   * 透明度の計算式の種類です。
   */
  export enum AlphaCurveType {
    /**
     * 通常の透明度の計算式です。
     */
    Normal = 0,
    /**
     * ランダムです。
     */
    Random = 1,
  }

  export class ColorData {
    /**
     * 色相を表します(0-360)。
     * @type {number}
     */
    hue:number;
    /**
     * 色相のばらつきを示します。
     * @type {number}
     */
    hueVariance:number;
    /**
     * 彩度です(0-100)。
     * @type {number}
     */
    saturation:number;
    /**
     * 彩度のばらつきです。
     * @type {number}
     */
    saturationVariance:number;
    /**
     * 輝度です(0-100)。
     * @type {number}
     */
    luminance:number;
    /**
     * 輝度のばらつきです。
     * @type {number}
     */
    luminanceVariance:number;
  }

  /**
   * シェイプの種類を定義したクラスです。
   */
  export class ShapeType {
    /**
     * ふわっとした円のシェイプIDです。
     * @type {string}
     */
    static BLUR_CIRCLE:string;
    /**
     * 円のシェイプIDです。
     * @type {string}
     */
    static CIRCLE:string;
    /**
     * 花の形のシェイプIDです。
     * @type {string}
     */
    static FLOWER:string;
    /**
     * ハートの形のシェイプIDです。
     * @type {string}
     */
    static HEART:string;
    /**
     * キラキラ(1)のシェイプIDです。
     * @type {string}
     */
    static KIRAKIRA:string;
    /**
     * キラキラ(2)のシェイプIDです。
     * @type {string}
     */
    static KIRAKIRA2:string;
    /**
     * 中央が繰り抜かれた円のシェイプIDです。
     * @type {string}
     */
    static REVERSE_CIRCLE:string;
    /**
     * 四角形のシェイプIDです。
     * @type {string}
     */
    static SQUARE:string;
    /**
     * 星形のシェイプIDです。
     * @type {string}
     */
    static STAR:string;
    /**
     * 星形(棘が10)のシェイプIDです。
     * @type {string}
     */
    static STAR_10:string;
    /**
     * 三角形のシェイプIDです。
     * @type {string}
     */
    static TRIANGLE:string;
  }

  /** 指定できるシェイプ一覧です。 */
  export class ShapeData {
    /** 指定できるシェイプ一覧です。 */
    assetList:string[];
  }
}