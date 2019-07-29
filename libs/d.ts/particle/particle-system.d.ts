/// <reference types="easeljs" />
import { ColorData } from "../data/data-color";
import { DrawingData } from "../data/data-drawing";
import { Particle } from "./particle";
/**
 * ParticleJSのバージョン情報を示します。
 * @type {string}
 */
export declare const VERSION = "1.0.0";
/**
 * 現在のバージョンと互換性があるかどうかをチェックします。
 * @param value
 */
export declare function checkVersion(value: string): boolean;
/**
 * パーティクルの制御クラスです。
 */
export declare class ParticleSystem {
    /**
     *  グラフィックオブジェクトです。内部計算に使用します。
     */
    private static HELPER_GRAPHICS;
    /**
     * パーティクルが配置されるコンテナーです。
     */
    container: createjs.Container;
    /** @private  */
    private _particlesPool;
    /** @private  */
    private _activeParticles;
    /** @private  */
    private _drawingData;
    /** @private  */
    private _frameCount;
    /** @private  */
    private _playing;
    /** @private  */
    private shapeGenerator;
    /**
     * パーティクルのアニメーションが再生されているかどうかを示します。
     * @returns {boolean}
     */
    isPlaying(): boolean;
    constructor();
    /**
     * パーティクルの設定データを取り込みます。
     */
    setData(drawingData: DrawingData): void;
    /**
     * パーティクルの設定データをJson形式のオブジェクトで取り込みます。
     */
    importFromJson(jsonObject: any): void;
    /**
     * パーティクルシステムの更新を行います。
     */
    update(): void;
    /**
     * パーティクルの動きを更新します。
     */
    private animate;
    /**
     * パーティクルが生きているか確認します。
     */
    private lifeCheck;
    /**
     * パーティクルを全て削除します。
     */
    clear(): void;
    /**
     * パーティクルシステムを破棄します。
     */
    dispose(): void;
    /**
     * パーティクルの生成を行います。
     */
    private emit;
    /**
     * 個々のパーティクルを生成し、パーティクルシステムに登録します。
     * @returns {Particle}
     */
    private emitParticle;
    /**
     * パーティクルを生成し、パラメーターを設定します。
     * @returns {Particle}
     */
    private generateParticle;
    /**
     * パーティクルパラメータの設定を行います。
     * @param particle
     */
    private setParticleParameter;
    /**
     * パーティクルに使用するシェイプを生成します。
     * @param particle
     * @param shapeIdList
     */
    generateShape(particle: Particle, shapeIdList: string[]): void;
    /**
     * 一時的にパーティクルの再生を停止します。
     */
    pause(): void;
    /**
     * pause()で停止したパーティクルの再生を再開します。
     */
    resume(): void;
    /**
     * 一定範囲の数値を計算します。
     * @param minValue
     * @param maxValue
     * @param value
     * @returns {number}
     */
    private calcRandomValueWithRange;
    /**
     * ばらつきのある値を計算し取得します。
     * @param value 基準値です。
     * @param variance バラつきの範囲です。
     * @param isInteger 整数であるかを指定します。
     * @returns {number}  数値を返します。
     */
    private calcRandomValueWithVariance;
    /**
     * 現在の年齢依存の数値を計算します。
     * @param start 開始時の値です。
     * @param end 終了時の値です。
     * @param life 現在の寿命を示します。開始時は1.0で、終了時は0.0の想定です。
     * @returns {number} 現在の値です。
     */
    private calcCurrentValue;
    /**
     * 1秒あたりの発生数です。
     * @param value
     */
    /**
    * 1秒あたりの発生数です。
    * @returns {number}
    */
    emitFrequency: number;
    /**
     * 発生基準位置 - X座標 (px)です。
     * @param value
     */
    /**
    * 発生基準位置 - X座標 (px)です。
    * @returns {number}
    */
    startX: number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @param value
     */
    /**
    * 発生基準位置 - X座標のばらつき (px)です。
    * @returns {number}
    */
    startXVariance: number;
    /**
     * 発生位置 - Y座標 (px)です。
     * @param value
     */
    /**
    * 発生位置 - Y座標 (px)です。
    * @returns {number}
    */
    startY: number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @param value
     */
    /**
    * 発生基準位置 - X座標のばらつき (px)です。
    * @returns {number}
    */
    startYVariance: number;
    /**
     * 初期速度 - 方向 (度)です。
     * @param value
     */
    /**
    * 初期速度 - 方向 (度)です。
    * @returns {number}
    */
    initialDirection: number;
    /**
     * 初期速度 - 方向のばらつき (度)です。
     * @param value
     */
    /**
    * 初期速度 - 方向のばらつき (度)です。
    * @returns {number}
    */
    initialDirectionVariance: number;
    /**
     * 初期速度 (px)です。
     * @param value
     */
    /**
    * 初期速度 (px)です。
    * @returns {number}
    */
    initialSpeed: number;
    /**
     * 初期速度のばらつきです。
     * @param value
     */
    /**
    * 初期速度のばらつきです。
    * @returns {number}
    */
    initialSpeedVariance: number;
    /**
     * 摩擦です。
     * @param value
     */
    /**
    * 摩擦です。
    * @returns {number}
    */
    friction: number;
    /**
     * 重力です。
     * @param value
     */
    /**
    * 重力です。
    * @returns {number}
    */
    accelerationSpeed: number;
    /**
     * 重力方向 (度)です。
     * @param value
     */
    /**
    * 重力です。
    * @returns {number}
    */
    accelerationDirection: number;
    /**
     * 開始時のスケールです。
     * @param value
     */
    /**
    * 開始時のスケールです。
    * @returns {number}
    */
    startScale: number;
    /**
     * 開始時のスケールのばらつきです。
     * @param value
     */
    /**
    * 開始時のスケールのばらつきです。
    * @returns {number}
    */
    startScaleVariance: number;
    /**
     * 終了時のスケールです。
     * @param value
     */
    /**
    * 終了時のスケールです。
    * @returns {number}
    */
    finishScale: number;
    /**
     * 終了時のスケールのばらつきです。
     * @param value
     */
    /**
    * 終了時のスケールのばらつきです。
    * @returns {number}
    */
    finishScaleVariance: number;
    /**
     * ライフ(フレーム数)です。
     * @param value
     */
    /**
    * ライフ(フレーム数)です。
    * @returns {number}
    */
    lifeSpan: number;
    /**
     * ライフのばらつき(フレーム数)です。
     * @param value
     */
    /**
    * ライフのばらつき(フレーム数)です。
    * @returns {number}
    */
    lifeSpanVariance: number;
    /**
     * 始時の透明度です。
     * @param value
     */
    /**
    * 始時の透明度です。
    * @returns {number}
    */
    startAlpha: number;
    /**
     * 開始時の透明度のばらつきです。
     * @param value
     */
    /**
    * 開始時の透明度のばらつきです。
    * @returns {number}
    */
    startAlphaVariance: number;
    /**
     * 終了時の透明度です。
     * @param value
     */
    /**
    * 終了時の透明度です。
    * @returns {number}
    */
    finishAlpha: number;
    /**
     * 終了時の透明度のばらつきです。
     * @param value
     */
    /**
    * 終了時の透明度のばらつきです。
    * @returns {number}
    */
    finishAlphaVariance: number;
    /**
     * 使用するシェイプID設定です。
     * @param string[]
     */
    /**
    * 使用するシェイプID設定です。
    * @returns {string[]}
    */
    shapeIdList: string[];
    /**
     * 初期カラーの設定です。
     * @param value
     */
    /**
    * 初期カラーの設定です。
    * @returns {ColorData}
    */
    startColor: ColorData;
    /**
     * trueのときシェイプを加算合成します。
     * @param value
     */
    /**
    * trueのときシェイプを加算合成します。
    * @returns {boolean}
    */
    blendMode: boolean;
    /**
     * 透明度の計算式の設定です。
     * @param value - 0:通常, 1:ランダム
     */
    /**
    * 透明度の計算式の設定です。
    * @returns {number}
    */
    alphaCurveType: number;
}
