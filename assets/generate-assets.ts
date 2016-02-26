declare class fl{
  public static trace(str:string) : void;
  public static getDocumentDOM() : any;
}
declare class FLfile{
  public static write(path:string,value:string):void;
}

/**
 * Created by nyamogera on 2016/01/20.
 */
function exportAssets(){
  var pathArr = fl.getDocumentDOM().pathURI.split("/");
  let flaName =  pathArr.pop();
  pathArr.pop();

  var exportClassPath = pathArr.join("/");
  let exportShapeClassPath = exportClassPath +  "/core/app/assets/";
  let exportShapeDataClassPath = exportClassPath +  "/core/app/data/";

  var exportPNGPath = pathArr.join("/");

  exportPNGPath = exportPNGPath + "/core/images/shape/";
  fl.trace(exportPNGPath);

  let assetList:string[] = new Array();
  let assetHash:string = "";
  var lib = fl.getDocumentDOM().library;
  var i=0;
  for(var i=0; i<lib.items.length; i++){
    let o = lib.items[i];
    let name =  o.name.replace("assets/","");
    if(o.itemType == "movie clip"){
      var pngPath =  exportPNGPath + name + ".png";
      o.exportToPNGSequence( pngPath );

      assetHash += `    this.shapeObjects["${name}"] = lib.${name}
`;
      assetList.push( `"${name}"` );
    }
  }
  let date = new Date().toDateString();
  let assetArrayString = "[" + assetList.join(",") + "]";

  let generatingClass = `/**
 * Created by 「${flaName}」/「generate-assets.jsfl」 on ${date}
 * !!!!!このコードはJSFLから自動生成されたコードです。修正する場合はご注意ください。!!!!!
 */

export class ShapeGenerator {
  shapeObjects:Object;

  constructor () {
    this.shapeObjects = new Object();
${assetHash}
  }

  generateShape(id:string) {
    return new this.shapeObjects[id]();
  }
}`


  FLfile.write(exportShapeClassPath +  "shape-generator.ts", generatingClass );

  let generatingDataClass = `/**
 * Created by 「${flaName}」/「generate-assets.jsfl」 on ${date}
 * !!!!!このコードはJSFLから自動生成されたコードです。修正する場合はご注意ください。!!!!!
 */

export class ShapeData {
  public assetList:string[];

  constructor () {
    this.assetList = ${assetArrayString};
  }
}`

  FLfile.write(exportShapeDataClassPath +  "data-shape.ts", generatingDataClass );
}

exportAssets();


