import { ColorData } from "./data-color";
/**
 * パーティクルの描画情報を扱うデータ型クラスです。
 */
export declare class DrawingData {
    /**
     * 背景色です。
     * @type {string}
     */
    bgColor: string;
    /**
     * 幅です。
     * @type {number}
     */
    width: number;
    /**
     * 高さです。
     * @type {number}
     */
    height: number;
    /**
     * 1秒あたりの発生数です。
     * @type {number}
     */
    emitFrequency: number;
    /**
     *  発生基準位置 - X座標 (px)です。
     * @type {number}
     */
    startX: number;
    /**
     * 発生基準位置 - X座標のばらつき (px)です。
     * @type {number}
     */
    startXVariance: number;
    /**
     * 発生位置 - Y座標 (px)です。
     * @type {number}
     */
    startY: number;
    /**
     * 発生位置 - Y座標のばらつき (px)です。
     * @type {number}
     */
    startYVariance: number;
    /**
     * 初期速度 - 方向 (度)です。
     * @type {number}
     */
    initialDirection: number;
    /**
     * 初期速度 - 方向のばらつき (度)です。
     * @type {number}
     */
    initialDirectionVariance: number;
    /**
     * 初期速度 (px)です。
     * @type {number}
     */
    initialSpeed: number;
    /**
     * 初期速度のばらつきです。
     * @type {number}
     */
    initialSpeedVariance: number;
    /**
     * 摩擦です。
     * @type {number}
     */
    friction: number;
    /** 重力です。
     * @type {number}
     */
    accelerationSpeed: number;
    /**
     * 重力方向 (度)です。
     * @type {number}
     */
    accelerationDirection: number;
    /**
     * 開始時のスケールです。
     * @type {number}
     */
    startScale: number;
    /**
     * 開始時のスケールのばらつきです。
     * @type {number}
     */
    startScaleVariance: number;
    /**
     * 終了時のスケールです。
     * @type {number}
     */
    finishScale: number;
    /**
     * 終了時のスケールのばらつきです。
     * @type {number}
     */
    finishScaleVariance: number;
    /**
     * ライフ(フレーム数)です。
     * @type {number}
     */
    lifeSpan: number;
    /**
     * ライフのばらつき(フレーム数)です。
     * @type {number}
     */
    /**  */ lifeSpanVariance: number;
    /**
     *  開始時の透明度です。
     * @type {number}
     */
    startAlpha: number;
    /**
     * 開始時の透明度のばらつきです。
     * @type {number}
     */
    startAlphaVariance: number;
    /**
     * 終了時の透明度です。
     * @type {number}
     */
    finishAlpha: number;
    /**
     * 終了時の透明度のばらつきです。
     * @type {number}
     */
    finishAlphaVariance: number;
    /**
     * 使用するシェイプID設定です。
     * @type {string[]}
     */
    shapeIdList: string[];
    /**
     * 初期カラーの設定です。
     * @type {ColorData}
     */
    startColor: ColorData;
    /**
     * シェイプを加算合成します。
     * @type {boolean}
     */
    blendMode: boolean;
    /**
     * 透明度の計算式の設定です。
     * @type {AlphaCurveType.Normal}
     */
    alphaCurveType: number;
    /**
     * コンストラクターです。
     * @param json
     */
    constructor(json?: any);
    static ENABLE_REFLECT: boolean;
    /**
     * パーティクルの設定をJSON形式のオブジェクトから読み込みます。
     * @param json
     */
    importFromJson(json: any): void;
    /**
     * パーティクルの設定をDrawingDataオブジェクトから読み込みます
     * @param {DrawingData} obj
     */
    importData(obj: DrawingData): void;
    static checkReflectEnable(): boolean;
    private setData;
}
