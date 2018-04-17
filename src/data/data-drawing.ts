import { ColorData } from "./data-color";
import { AlphaCurveType } from "../enum/alpha-curve-type";

/**
 * パーティクルの描画情報を扱うデータ型クラスです。
 */
export class DrawingData {
  /**
   * 背景色です。
   * @type {string}
   */
  bgColor: string = "";
  /**
   * 幅です。
   * @type {number}
   */
  width: number = 0.0;
  /**
   * 高さです。
   * @type {number}
   */
  height: number = 0.0;

  /**
   * 1秒あたりの発生数です。
   * @type {number}
   */
  emitFrequency: number = 0;

  /**
   *  発生基準位置 - X座標 (px)です。
   * @type {number}
   */
  startX: number = 0;
  /**
   * 発生基準位置 - X座標のばらつき (px)です。
   * @type {number}
   */
  startXVariance: number = 0;

  /**
   * 発生位置 - Y座標 (px)です。
   * @type {number}
   */
  startY: number = 0;
  /**
   * 発生位置 - Y座標のばらつき (px)です。
   * @type {number}
   */
  startYVariance: number = 0;

  /**
   * 初期速度 - 方向 (度)です。
   * @type {number}
   */
  initialDirection: number = 0;
  /**
   * 初期速度 - 方向のばらつき (度)です。
   * @type {number}
   */
  initialDirectionVariance: number = 0;

  /** 初期速度 (px)です。
   * @type {number}
   */
  initialSpeed: number = 0;
  /** 初期速度のばらつきです。
   * @type {number}
   */
  initialSpeedVariance: number = 0;

  /** 摩擦です。
   * @type {number}
   */
  friction: number = 0;

  /** 重力です。
   * @type {number}
   */
  accelerationSpeed: number = 0;
  /** 重力方向 (度)です。
   * @type {number}
   */
  accelerationDirection: number = 0;

  /** 開始時のスケールです。
   * @type {number}
   */
  startScale: number = 0;
  /** 開始時のスケールのばらつきです。 */
  startScaleVariance: number = 0;

  /** 終了時のスケールです。
   * @type {number}
   */
  finishScale: number = 0;
  /** 終了時のスケールのばらつきです。
   * @type {number}
   */
  finishScaleVariance: number = 0;

  /**
   * ライフ(フレーム数)です。
   * @type {number}
   */
  lifeSpan: number = 0; /**
   * ライフのばらつき(フレーム数)です。
   * @type {number}
   */
  /**  */ lifeSpanVariance: number = 0;

  /**
   *  開始時の透明度です。
   * @type {number}
   */
  startAlpha: number = 0;

  /**
   * 開始時の透明度のばらつきです。
   * @type {number}
   */
  startAlphaVariance: number = 0;

  /**
   * 終了時の透明度です。
   * @type {number}
   */
  finishAlpha: number = 0;

  /**
   * 終了時の透明度のばらつきです。
   * @type {number}
   */
  finishAlphaVariance: number = 0;

  /**
   * 使用するシェイプID設定です。
   * @type {string[]}
   */
  shapeIdList: string[] = [""];

  /**
   * 初期カラーの設定です。
   * @type {ColorData}
   */
  startColor: ColorData = new ColorData();

  /**
   * シェイプを加算合成します。
   * @type {boolean}
   */
  blendMode: boolean = true;

  /**
   * 透明度の計算式の設定です。
   * @type {AlphaCurveType.Normal}
   */
  alphaCurveType: number = AlphaCurveType.Normal;

  /**
   * コンストラクターです。
   * @param json
   */
  constructor(json: any = null) {
    if (json) {
      this.importFromJson(json);
    }
  }

  static ENABLE_REFLECT: boolean = DrawingData.checkReflectEnable();

  /**
   * パーティクルの設定をJSON形式のオブジェクトから読み込みます。
   * @param json
   */
  public importFromJson(json: any): void {
    const checkSkipKey = (key: string) => {
      return key == "width" || key == "height" || key == "bgColor";
    };

    this.setData(json, checkSkipKey);
  }

  /**
   * パーティクルの設定をDrawingDataオブジェクトから読み込みます
   * @param {DrawingData} obj
   */
  public importData(obj: DrawingData) {
    const checkSkipKey = (key: string) => {
      return (
        key == "width" || key == "height" || key == "startX" || key == "startY"
      );
    };

    this.setData(obj, checkSkipKey);
  }

  static checkReflectEnable(): boolean {
    try {
      const result = !!(Reflect && Reflect.has);
      return result;
    } catch (e) {
      return false;
    }
  }

  private setData(obj: any, checkSkipKey: (key: string) => boolean): void {
    if (DrawingData.ENABLE_REFLECT) {
      for (let key in obj) {
        // 無視するプロパティー
        if (checkSkipKey(key)) {
          continue;
        }
        if (Reflect.has(this, key) == true) {
          let val = <any>obj[key];
          // イマドキなプロパティー反映方法を適用 ICS-Ikeda 2016-01-22
          Reflect.set(this, key, val);
        }
      }
    } else {
      const self = <any>this;
      for (let key in obj) {
        // 無視するプロパティー
        if (checkSkipKey(key)) {
          continue;
        }
        if (this.hasOwnProperty(key)) {
          self[key] = obj[key];
        }
      }
    }
  }
}
