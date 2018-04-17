declare namespace window {
  export var particlejs: any;
}

export class ShapeGenerator {
  constructor() {}

  public generateShape(id: string): createjs.Container {
    let namespaceObj = <any>window.particlejs.assets;
    let cls = <any>namespaceObj[id];
    return <createjs.Container>new cls();
  }
}
