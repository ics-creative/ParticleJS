///<reference path="../../typings/main.d.ts" />
"use strict";
var data_color_1 = require("../data/data-color");
/**
 * パーティクルエミッターのバリューオブジェクトのクラスです。
 */
var Particle = (function () {
    function Particle() {
        this.particleShape = new createjs.Container;
        this.startColor = new data_color_1.ColorData();
    }
    return Particle;
})();
exports.Particle = Particle;
//# sourceMappingURL=particle.js.map