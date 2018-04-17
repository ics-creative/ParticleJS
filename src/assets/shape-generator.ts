import { Assets } from "../asset-shapes";

export class ShapeGenerator {
  constructor() {}

  public generateShape(id: string): createjs.Container {
    const cls = <any>Assets[id];
    return <createjs.Container>new cls();
  }
}
