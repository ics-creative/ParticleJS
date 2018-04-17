import { Assets } from "../asset-shapes";

/**
 * シェイプをインスタンス化するクラスです。
 * ParticleJSの内部的な利用以外では使用しないことをオススメします。
 */
export class ShapeGenerator {
  constructor() {}

  /**
   * シェイプインスタンスを作成します。
   * @param {string} id
   * @returns {createjs.Container}
   * @see data-shape.ts
   */
  public generateShape(id: string): createjs.Container {
    const cls = <any>Assets[id];
    return <createjs.Container>new cls();
  }
}
