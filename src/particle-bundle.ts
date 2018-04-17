/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>

import {particlejs, ParticleSystem} from "./particle/particle-system";
import {DrawingData} from "./data/data-drawing";
import {ColorData} from "./data/data-color";
import {ShapeData} from "./data/data-shape";
import {AlphaCurveType} from "./enum/alpha-curve-type";
import {ShapeType} from "./enum/shape-type";

(<any>window).particlejs = (<any>window).effects || {};
(<any>window).particlejs.ParticleSystem = ParticleSystem;
(<any>window).particlejs.DrawingData = DrawingData;
(<any>window).particlejs.ColorData = ColorData;
(<any>window).particlejs.AlphaCurveType = AlphaCurveType;
(<any>window).particlejs.ShapeType = ShapeType;
(<any>window).particlejs.ShapeData = ShapeData;
(<any>window).particlejs.VERSION = particlejs.VERSION;