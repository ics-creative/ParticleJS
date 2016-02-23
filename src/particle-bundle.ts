/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>
/// <reference path="../typings/main.d.ts"/>

import {ParticleEmitter} from "./particle/particle-emitter";

(<any>window).effects = (<any>window).effects || {};
(<any>window).effects.ParticleEmitter = ParticleEmitter;