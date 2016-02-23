"use strict";

declare namespace window {
  export var effects:any;
}

export class ShapeGenerator {

  constructor() {
  }

  public generateShape(id:string):createjs.Container {
    let namespaceObj = <any>( window.effects.assets );
    let cls = <any> namespaceObj[id];
    return <createjs.Container> new cls();
  }
}