System.register(["../data/data-color"], function(exports_1) {
    "use strict";
    var data_color_1;
    var Particle;
    return {
        setters:[
            function (data_color_1_1) {
                data_color_1 = data_color_1_1;
            }],
        execute: function() {
            /**
             * パーティクルエミッターのバリューオブジェクトのクラスです。
             */
            Particle = (function () {
                function Particle() {
                    this.particleShape = new createjs.Container;
                    this.startColor = new data_color_1.ColorData();
                }
                return Particle;
            })();
            exports_1("Particle", Particle);
        }
    }
});
//# sourceMappingURL=particle.js.map