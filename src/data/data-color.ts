/**
 * 色の情報を扱うデータ型クラスです。
 */
export class ColorData {
  /**
   * 色相を表します(0-360)。
   * @type {number}
   */
  public hue: number = 0;

  /**
   * 色相のばらつきを示します。
   * @type {number}
   */
  public hueVariance: number = 0;
  /**
   * 彩度です(0-100)。
   * @type {number}
   */
  public saturation: number = 0;
  /**
   * 彩度のばらつきです。
   * @type {number}
   */
  public saturationVariance: number = 0;
  /**
   * 輝度です(0-100)。
   * @type {number}
   */
  public luminance: number = 0;
  /**
   * 輝度のばらつきです。
   * @type {number}
   */
  public luminanceVariance: number = 0;

  constructor() {}
}
