"use strict";

declare namespace window {
  export var lib:Object;
}

export class ShapeGenerator {

  constructor() {
  }

  public generateShape(id:string):createjs.Container {
    let namespaceObj = <any> window["lib"];
    let cls = <any> namespaceObj[id];
    return <createjs.Container> new cls();
  }
}