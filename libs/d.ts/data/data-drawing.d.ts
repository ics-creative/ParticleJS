import { ColorData } from "./data-color";
export declare class DrawingData {
    bgColor: string;
    width: number;
    height: number;
    /** 1秒あたりの発生数です。 */
    emitFrequency: number;
    /** 発生基準位置 - X座標 (px)です。 */
    startX: number;
    /** 発生基準位置 - X座標のばらつき (px)です。 */
    startXVariance: number;
    /** 発生位置 - Y座標 (px)です。 */
    startY: number;
    /** 発生位置 - Y座標のばらつき (px)です。 */
    startYVariance: number;
    /** 初期速度 - 方向 (度)です。 */
    initialDirection: number;
    /** 初期速度 - 方向のばらつき (度)です。 */
    initialDirectionVariance: number;
    /** 初期速度 (px)です。 */
    initialSpeed: number;
    /** 初期速度のばらつきです。 */
    initialSpeedVariance: number;
    /** 摩擦です。 */
    friction: number;
    /** 重力です。 */
    accelerationSpeed: number;
    /** 重力方向 (度)です。 */
    accelerationDirection: number;
    /** 開始時のスケールです。 */
    startScale: number;
    /** 開始時のスケールのばらつきです。 */
    startScaleVariance: number;
    /** 終了時のスケールです。 */
    finishScale: number;
    /** 終了時のスケールのばらつきです。 */
    finishScaleVariance: number;
    /** ライフ(フレーム数)です。 */
    lifeSpan: number;
    /** ライフのばらつき(フレーム数)です。 */
    lifeSpanVariance: number;
    /** 開始時の透明度です。 */
    startAlpha: number;
    /** 開始時の透明度のばらつきです。 */
    startAlphaVariance: number;
    /** 終了時の透明度です。 */
    finishAlpha: number;
    /** 終了時の透明度のばらつきです。 */
    finishAlphaVariance: number;
    /** 使用するシェイプID設定です。 */
    shapeIdList: string[];
    /** 初期カラーの設定です。 */
    startColor: ColorData;
    /** シェイプを加算合成します。 */
    blendMode: boolean;
    /** 透明度の計算式の設定です。 */
    alphaCurveType: number;
    constructor(json?: any);
    static ENABLE_REFLECT: boolean;
    /**
     * パーティクルの設定をJSON形式のオブジェクトから読み込みます。
     * @param json
     */
    importFromJson(json: any): void;
    /**
     * パーティクルの設定をDrawingDataオブジェクトから読み込みます
     * @param obj
     */
    importData(obj: DrawingData): void;
    static checkReflectEnable(): boolean;
    private setData(obj, checkSkipKey);
}
