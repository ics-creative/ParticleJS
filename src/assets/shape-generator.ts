declare namespace window {
  export var particlejs: any;
}

export class ShapeGenerator {
  constructor() {}

  public generateShape(id: string): createjs.Container {
    const namespaceObj = <any>window.particlejs.assets;
    const cls = <any>namespaceObj[id];
    return <createjs.Container>new cls();
  }
}
