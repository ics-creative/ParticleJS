/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>
/// <reference path="../typings/main.d.ts"/>
System.register(["./particle/particle-emitter"], function(exports_1) {
    var particle_emitter_1;
    return {
        setters:[
            function (particle_emitter_1_1) {
                particle_emitter_1 = particle_emitter_1_1;
            }],
        execute: function() {
            window.ParticleEmitter = particle_emitter_1.ParticleEmitter;
        }
    }
});
//# sourceMappingURL=particle-bundle.js.map