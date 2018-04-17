/// <reference types="easeljs" />
/**
 * シェイプをインスタンス化するクラスです。
 * ParticleJSの内部的な利用以外では使用しないことをオススメします。
 */
export declare class ShapeGenerator {
    constructor();
    /**
     * シェイプインスタンスを作成します。
     * @param {string} id
     * @returns {createjs.Container}
     * @see data-shape.ts
     */
    generateShape(id: string): createjs.Container;
}
