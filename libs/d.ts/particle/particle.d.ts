/// <reference types="easeljs" />
import { ColorData } from "../data/data-color";
/**
 * パーティクルエミッターのバリューオブジェクトのクラスです。
 */
export declare class Particle {
    /**
     * パーティクルの形状です。
     * @type {createjs.Container}
     */
    particleShape: createjs.Container;
    /** パーティクルが生きているかのフラグです。 */
    isAlive: boolean;
    /** パーティクルの現在の残り生存期間（フレーム数）です。 */
    currentLife: number;
    /** パーティクルの生存期間（フレーム数）です。 */
    totalLife: number;
    /** パーティクルの現在のX位置です。 */
    x: number;
    /** パーティクルの現在のY位置です。 */
    y: number;
    /** パーティクルが現在向かっている方向ベクトルです。 */
    vx: number;
    /** パーティクルが方向ベクトルです。 */
    vy: number;
    /** アルファのイージング関数です。 */
    easingAlpha: (life: number) => number;
    /** 開始アルファ値です0〜1.0の間になります。 */
    startAlpha: number;
    /** 終了時のアルファ値です0〜1.0の間になります。 */
    finishAlpha: number;
    /** スケールのイージング関数です。 */
    easingScale: (life: number) => number;
    /** 開始スケール値です0〜1.0の間になります。 */
    startScale: number;
    /** 終了時のスケール値です0〜1.0の間になります。 */
    finishScale: number;
    /** 開始時のカラーです。 */
    startColor: ColorData;
    /** カラーを設定するCreateJSのグラフィックスコマンドです。*/
    colorCommand: any;
    /** アルファカーブ */
    alphaCurveType: number;
    /**
     * コンストラクターです。
     */
    constructor();
}
