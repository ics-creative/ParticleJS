"use strict";

import {ColorData} from "./data-color";
import {AlphaCurveType} from "../enum/alpha-curve-type";

export class DrawingData {
  bgColor:string = "";
  width:number = 0.0;
  height:number = 0.0;

  /** 1秒あたりの発生数 */
  emitFrequency:number = 0;

  startX:number = 0;
  /** 発生位置 - X座標のばらつき (px) */
  startXVariance:number = 0;

  startY:number = 0;
  /** 発生位置 - Y座標のばらつき (px) */
  startYVariance:number = 0;

  /** 初期速度 - 方向 (度) */
  initialDirection:number = 0;
  /** 初期速度 - 方向のばらつき (度) */
  initialDirectionVariance:number = 0;

  /** 初期速度 (px) */
  initialSpeed:number = 0;
  /** 初期速度のばらつき */
  initialSpeedVariance:number = 0;

  /** 摩擦 */
  friction:number = 0;

  /** 重力 */
  accelerationSpeed:number = 0;
  /** 重力方向 (度) */
  accelerationDirection:number = 0;

  /** 開始時のスケール */
  startScale:number = 0;
  /** 開始時のスケールのばらつき */
  startScaleVariance:number = 0;

  /** 終了時のスケール */
  finishScale:number = 0;
  /** 終了時のスケールのばらつき */
  finishScaleVariance:number = 0;

  /** ライフ(フレーム数) */
  lifeSpan:number = 0;
  /** ライフのばらつき(フレーム数) */
  lifeSpanVariance:number = 0;

  /** 開始時の透明度 */
  startAlpha:number = 0;
  /** 開始時の透明度のばらつき */
  startAlphaVariance:number = 0;

  /** 終了時の透明度 */
  finishAlpha:number = 0;
  /** 終了時の透明度のばらつき */
  finishAlphaVariance:number = 0;

  shapeIdList:string[] = ["kirakira"];

  startColor:ColorData = new ColorData();

  blendMode:boolean = true;
  alphaCurveType:number = AlphaCurveType.Normal;

  constructor() {
  }

  public into(obj:any):void {
    for (let key in obj) {

      // 無視するプロパティー
      if (key == "width" || key == "height" || key == "startX" || key == "startY") {
        continue;
      }

      if (Reflect.has(this, key) == true) {
        let val = <any> obj[key];
        // イマドキなプロパティー反映方法を適用 ICS-Ikeda 2016-01-22
        Reflect.set(this, key, val);
      }
    }
  }
}