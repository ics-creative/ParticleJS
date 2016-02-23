System.register([], function(exports_1) {
    "use strict";
    var ShapeGenerator;
    return {
        setters:[],
        execute: function() {
            ShapeGenerator = (function () {
                function ShapeGenerator() {
                }
                ShapeGenerator.prototype.generateShape = function (id) {
                    var namespaceObj = window["effects"]["assets"];
                    var cls = namespaceObj[id];
                    return new cls();
                };
                return ShapeGenerator;
            })();
            exports_1("ShapeGenerator", ShapeGenerator);
        }
    }
});
//# sourceMappingURL=shape-generator.js.map