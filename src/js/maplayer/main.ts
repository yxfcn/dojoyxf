///<reference path="../../typings/typings.d.ts"/>
import parser=require("dojo/parser");
import gaodelayer=require("./gaodelayer");
import Extent=require("esri/geometry/Extent");
import TileInfo = require("esri/layers/TileInfo");
import SpatialReference = require("esri/SpatialReference");
import WebTiledLayer = require("esri/layers/WebTiledLayer");
//import WMTSLayer = require("esri/layers/WMTSLayer");
import Map = require("esri/map");
import on=require("dojo/on");
import dom=require("dojo/dom");


var map = new Map("map", {
    center: [116, 28],
    zoom: 5
});
var baselayer=new gaodelayer();
map.addLayer(baselayer);