System.register([], function(exports_1) {
    "use strict";
    var ColorData;
    return {
        setters:[],
        execute: function() {
            ColorData = (function () {
                function ColorData() {
                    this.hue = 0;
                    this.hueVariance = 0;
                    this.saturation = 0;
                    this.saturationVariance = 0;
                    this.luminance = 0;
                    this.luminanceVariance = 0;
                }
                return ColorData;
            })();
            exports_1("ColorData", ColorData);
        }
    }
});
//# sourceMappingURL=data-color.js.map