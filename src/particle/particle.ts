///<reference path="../../typings/main.d.ts" />

"use strict";

import {ColorData} from "../data/data-color";

/**
 * パーティクルエミッターのバリューオブジェクトのクラスです。
 */
export class Particle {
  /** パーティクルの形状です。 */
  public particleShape:createjs.Container;

  /** パーティクルが生きているかのフラグです。 */
  public isAlive:boolean;
  /** パーティクルの現在の残り生存期間（フレーム数）です。 */
  public currentLife:number;
  /** パーティクルの生存期間（フレーム数）です。 */
  public totalLife:number;


  /** パーティクルの現在のx位置です。 */
  public x:number;
  /** パーティクルの現在のy位置です。 */
  public y:number;

  /** パーティクルが現在向かっている方向ベクトルです。 */
  public vx:number;
  /** パーティクルが方向ベクトルです。 */
  public vy:number;

  /** アルファのイージング関数です。 */
  public easingAlpha:(life:number)=>number;
  /** 開始アルファ値です0〜1.0の間になります。 */
  public startAlpha:number;
  /** 終了時のアルファ値です0〜1.0の間になります。 */
  public finishAlpha:number;

  /** スケールのイージング関数です。 */
  public easingScale:(life:number)=>number;
  /** 開始スケール値です0〜1.0の間になります。 */
  public startScale:number;
  /** 終了時のスケール値です0〜1.0の間になります。 */
  public finishScale:number;

  /** 開始時のカラーです。 */
  public startColor:ColorData;
  /** カラーを設定するCreateJSのグラフィックスコマンドです。*/
  public colorCommand:any;

  alphaCurveType:number;

  constructor() {
    this.particleShape = new createjs.Container;

    this.startColor = new ColorData();
  }
}