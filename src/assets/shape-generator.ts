import { libs } from "../asset-shapes.js";

export class ShapeGenerator {
  constructor() {}

  public generateShape(id: string): createjs.Container {
    const namespaceObj = libs.assets;
    const cls = <any>namespaceObj[id];
    return <createjs.Container>new cls();
  }
}
