/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>
/// <reference path="../typings/main.d.ts"/>

import {ParticleEmitter} from "./particle/particle-emitter";
import {DrawingData} from "./data/data-drawing";
import {ColorData} from "./data/data-color";
import {ShapeData} from "./data/data-shape";
import {AlphaCurveType} from "./enum/alpha-curve-type";
import {ShapeType} from "./enum/shape-type";

(<any>window).effects = (<any>window).effects || {};
(<any>window).effects.ParticleEmitter = ParticleEmitter;
(<any>window).effects.DrawingData = DrawingData;
(<any>window).effects.ColorData = ColorData;
(<any>window).effects.AlphaCurveType = AlphaCurveType;
(<any>window).effects.ShapeType = ShapeType;
(<any>window).effects.ShapeData = ShapeData;