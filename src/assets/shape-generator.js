"use strict";
var ShapeGenerator = (function () {
    function ShapeGenerator() {
    }
    ShapeGenerator.prototype.generateShape = function (id) {
        var namespaceObj = window["lib"];
        var cls = namespaceObj[id];
        return new cls();
    };
    return ShapeGenerator;
})();
exports.ShapeGenerator = ShapeGenerator;
//# sourceMappingURL=shape-generator.js.map