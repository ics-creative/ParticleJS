/**
 * 色の情報を扱うデータ型クラスです。
 */
export declare class ColorData {
    /**
     * 色相を表します(0-360)。
     * @type {number}
     */
    hue: number;
    /**
     * 色相のばらつきを示します。
     * @type {number}
     */
    hueVariance: number;
    /**
     * 彩度です(0-100)。
     * @type {number}
     */
    saturation: number;
    /**
     * 彩度のばらつきです。
     * @type {number}
     */
    saturationVariance: number;
    /**
     * 輝度です(0-100)。
     * @type {number}
     */
    luminance: number;
    /**
     * 輝度のばらつきです。
     * @type {number}
     */
    luminanceVariance: number;
    constructor();
}
