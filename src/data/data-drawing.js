System.register(["./data-color", "../enum/alpha-curve-type"], function(exports_1) {
    "use strict";
    var data_color_1, alpha_curve_type_1;
    var DrawingData;
    return {
        setters:[
            function (data_color_1_1) {
                data_color_1 = data_color_1_1;
            },
            function (alpha_curve_type_1_1) {
                alpha_curve_type_1 = alpha_curve_type_1_1;
            }],
        execute: function() {
            DrawingData = (function () {
                function DrawingData() {
                    this.bgColor = "";
                    this.width = 0.0;
                    this.height = 0.0;
                    /** 1秒あたりの発生数 */
                    this.emitFrequency = 0;
                    this.startX = 0;
                    /** 発生位置 - X座標のばらつき (px) */
                    this.startXVariance = 0;
                    this.startY = 0;
                    /** 発生位置 - Y座標のばらつき (px) */
                    this.startYVariance = 0;
                    /** 初期速度 - 方向 (度) */
                    this.initialDirection = 0;
                    /** 初期速度 - 方向のばらつき (度) */
                    this.initialDirectionVariance = 0;
                    /** 初期速度 (px) */
                    this.initialSpeed = 0;
                    /** 初期速度のばらつき */
                    this.initialSpeedVariance = 0;
                    /** 摩擦 */
                    this.friction = 0;
                    /** 重力 */
                    this.accelerationSpeed = 0;
                    /** 重力方向 (度) */
                    this.accelerationDirection = 0;
                    /** 開始時のスケール */
                    this.startScale = 0;
                    /** 開始時のスケールのばらつき */
                    this.startScaleVariance = 0;
                    /** 終了時のスケール */
                    this.finishScale = 0;
                    /** 終了時のスケールのばらつき */
                    this.finishScaleVariance = 0;
                    /** ライフ(フレーム数) */
                    this.lifeSpan = 0;
                    /** ライフのばらつき(フレーム数) */
                    this.lifeSpanVariance = 0;
                    /** 開始時の透明度 */
                    this.startAlpha = 0;
                    /** 開始時の透明度のばらつき */
                    this.startAlphaVariance = 0;
                    /** 終了時の透明度 */
                    this.finishAlpha = 0;
                    /** 終了時の透明度のばらつき */
                    this.finishAlphaVariance = 0;
                    this.shapeIdList = ["kirakira"];
                    this.startColor = new data_color_1.ColorData();
                    this.blendMode = true;
                    this.alphaCurveType = alpha_curve_type_1.AlphaCurveType.Normal;
                }
                DrawingData.prototype.into = function (obj) {
                    for (var key in obj) {
                        // 無視するプロパティー
                        if (key == "width" || key == "height" || key == "startX" || key == "startY") {
                            continue;
                        }
                        if (Reflect.has(this, key) == true) {
                            var val = obj[key];
                            // イマドキなプロパティー反映方法を適用 ICS-Ikeda 2016-01-22
                            Reflect.set(this, key, val);
                        }
                    }
                };
                return DrawingData;
            })();
            exports_1("DrawingData", DrawingData);
        }
    }
});
//# sourceMappingURL=data-drawing.js.map