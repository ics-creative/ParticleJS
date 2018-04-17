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
    private animate();
    /**
     * パーティクルが生きているか確認します。
     */
    private lifeCheck();
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
    private emit();
    /**
     * 個々のパーティクルを生成し、パーティクルシステムに登録します。
     * @returns {Particle}
     */
    private emitParticle();
    /**
     * パーティクルを生成し、パラメーターを設定します。
     * @returns {Particle}
     */
    private generateParticle();
    /**
     * パーティクルパラメータの設定を行います。
     * @param particle
     */
    private setParticleParameter(particle);
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
    private calcRandomValueWithRange(minValue, maxValue, value);
    /**
     * ばらつきのある値を計算し取得します。
     * @param value 基準値です。
     * @param variance バラつきの範囲です。
     * @param isInteger 整数であるかを指定します。
     * @returns {number}  数値を返します。
     */
    private calcRandomValueWithVariance(value, variance, isInteger);
    /**
     * 現在の年齢依存の数値を計算します。
     * @param start 開始時の値です。
     * @param end 終了時の値です。
     * @param life 現在の寿命を示します。開始時は1.0で、終了時は0.0の想定です。
     * @returns {number} 現在の値です。
     */
    private calcCurrentValue(start, end, life);
    /**
     * 1秒あたりの発生数です。
     * @returns {number}
     */
    /**
     * 1秒あたりの発生数です。
     * @param value
     */
    emitFrequency: number;
    /**
     * 発生基準位置 - X座標 (px)です。
     * @returns {number}
     */
    /**
     * 発生基準位置 - X座標 (px)です。
     * @param value
     */
    startX: number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @returns {number}
     */
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @param value
     */
    startXVariance: number;
    /**
     * 発生位置 - Y座標 (px)です。
     * @returns {number}
     */
    /**
     * 発生位置 - Y座標 (px)です。
     * @param value
     */
    startY: number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @returns {number}
     */
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @param value
     */
    startYVariance: number;
    /**
     * 初期速度 - 方向 (度)です。
     * @returns {number}
     */
    /**
     * 初期速度 - 方向 (度)です。
     * @param value
     */
    initialDirection: number;
    /**
     * 初期速度 - 方向のばらつき (度)です。
     * @returns {number}
     */
    /**
     * 初期速度 - 方向のばらつき (度)です。
     * @param value
     */
    initialDirectionVariance: number;
    /**
     * 初期速度 (px)です。
     * @returns {number}
     */
    /**
     * 初期速度 (px)です。
     * @param value
     */
    initialSpeed: number;
    /**
     * 初期速度のばらつきです。
     * @returns {number}
     */
    /**
     * 初期速度のばらつきです。
     * @param value
     */
    initialSpeedVariance: number;
    /**
     * 摩擦です。
     * @returns {number}
     */
    /**
     * 摩擦です。
     * @param value
     */
    friction: number;
    /**
     * 重力です。
     * @returns {number}
     */
    /**
     * 重力です。
     * @param value
     */
    accelerationSpeed: number;
    /**
     * 重力です。
     * @returns {number}
     */
    /**
     * 重力方向 (度)です。
     * @param value
     */
    accelerationDirection: number;
    /**
     * 開始時のスケールです。
     * @returns {number}
     */
    /**
     * 開始時のスケールです。
     * @param value
     */
    startScale: number;
    /**
     * 開始時のスケールのばらつきです。
     * @returns {number}
     */
    /**
     * 開始時のスケールのばらつきです。
     * @param value
     */
    startScaleVariance: number;
    /**
     * 終了時のスケールです。
     * @returns {number}
     */
    /**
     * 終了時のスケールです。
     * @param value
     */
    finishScale: number;
    /**
     * 終了時のスケールのばらつきです。
     * @returns {number}
     */
    /**
     * 終了時のスケールのばらつきです。
     * @param value
     */
    finishScaleVariance: number;
    /**
     * ライフ(フレーム数)です。
     * @returns {number}
     */
    /**
     * ライフ(フレーム数)です。
     * @param value
     */
    lifeSpan: number;
    /**
     * ライフのばらつき(フレーム数)です。
     * @returns {number}
     */
    /**
     * ライフのばらつき(フレーム数)です。
     * @param value
     */
    lifeSpanVariance: number;
    /**
     * 始時の透明度です。
     * @returns {number}
     */
    /**
     * 始時の透明度です。
     * @param value
     */
    startAlpha: number;
    /**
     * 開始時の透明度のばらつきです。
     * @returns {number}
     */
    /**
     * 開始時の透明度のばらつきです。
     * @param value
     */
    startAlphaVariance: number;
    /**
     * 終了時の透明度です。
     * @returns {number}
     */
    /**
     * 終了時の透明度です。
     * @param value
     */
    finishAlpha: number;
    /**
     * 終了時の透明度のばらつきです。
     * @returns {number}
     */
    /**
     * 終了時の透明度のばらつきです。
     * @param value
     */
    finishAlphaVariance: number;
    /**
     * 使用するシェイプID設定です。
     * @returns {string[]}
     */
    /**
     * 使用するシェイプID設定です。
     * @param string[]
     */
    shapeIdList: string[];
    /**
     * 初期カラーの設定です。
     * @returns {ColorData}
     */
    /**
     * 初期カラーの設定です。
     * @param value
     */
    startColor: ColorData;
    /**
     * trueのときシェイプを加算合成します。
     * @returns {boolean}
     */
    /**
     * trueのときシェイプを加算合成します。
     * @param value
     */
    blendMode: boolean;
    /**
     * 透明度の計算式の設定です。
     * @returns {number}
     */
    /**
     * 透明度の計算式の設定です。
     * @param value - 0:通常, 1:ランダム
     */
    alphaCurveType: number;
}
