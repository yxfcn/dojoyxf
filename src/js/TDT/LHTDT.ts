///<reference path="../../typings/typings.d.ts"/>
import parser = require("dojo/parser");
import Extent = require("esri/geometry/Extent");
import SpatialReference = require("esri/SpatialReference");
import Map = require("esri/map");
import on = require("dojo/on");
import dom = require("dojo/dom");
import ArcGISDynamicMapServiceLayer = require("esri/layers/ArcGISDynamicMapServiceLayer");
import WebTiledLayer = require("esri/layers/WebTiledLayer");
import EsriPoint = require("esri/geometry/Point");
import domConstruct = require("dojo/dom-construct");
import Color = require("esri/Color");
import Popup = require("esri/dijit/Popup");
import InfoTemplate = require("esri/InfoTemplate");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import SimpleLineSymbol = require("esri/symbols/SimpleFillSymbol");
import PopupTemplate = require("esri/dijit/PopupTemplate");
import Query = require("esri/tasks/query");
import domClass = require("dojo/dom-class");
import FeatureLayer = require("esri/layers/FeatureLayer");
import ArcGISTiledMapServiceLayer = require("esri/layers/ArcGISTiledMapServiceLayer");
import IdentifyTask = require("esri/tasks/IdentifyTask");
import IdentifyParameters = require("esri/tasks/IdentifyParameters");
import Array=require("dojo/_base/array");
import TDTOptions=require("./TDTOptions");
import IdentifyResult=require("esri/tasks/IdentifyResult");
console.log("Come in");
parser.parse();

/**----------定义一些常量------ */

//----------------天地图相关---------------//
//天地图GCS2000坐标系
const TDTSR: SpatialReference = new SpatialReference({ wkid: 4490 });
//天地图切片信息


//临海初始化范围
const LH_EXTENT: Extent = new Extent({
    xmin: 120.82287337300001,
    ymin: 28.666733309,
    xmax: 121.71025052300001,
    ymax: 29.068217945,
    spatialReference: TDTSR
});

/**----------定义一些变量------ */
const river_url:string="http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_RIVER_TOWN/MapServer";
let map: Map;//地图
/* let tdt_basemap_vec: Basemap;//底图组件
let tdt_basemap_img: Basemap;//底图组件
let tdt_basemaplayer_vec: BasemapLayer;//天地图电子地图图层组件
let tdt_basemaplayer_img: BasemapLayer;//天地图卫星影像地图图层组件 */

let identifyTask: IdentifyTask;
let identifyParameters: IdentifyParameters;

//定义popup窗体的填充样式，创建dom节点
let popup: Popup = new Popup({
    fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2),
        new Color([255, 255, 0, 0.25])
    )

}, domConstruct.create("div"));


map = new Map("map", {
    extent: LH_EXTENT,
    zoom: 11,
    logo: false,
    infoWindow: popup
});
map.on("load", mapReady);





//天地图_电子地图
var tdt_options=new TDTOptions();
var tdt_vec_layer = new WebTiledLayer(tdt_options.vec_pattern, tdt_options);
var tdt_img_layer = new WebTiledLayer(tdt_options.img_pattern, tdt_options);
var tdt_cva_layer=new WebTiledLayer(tdt_options.cva_pattern,tdt_options);

var addv_town = new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");
var addv_river = new ArcGISDynamicMapServiceLayer(river_url);
var river_town_featurelayer = new FeatureLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_RIVER_TOWN/MapServer/0");



map.addLayer(tdt_vec_layer, 1);
map.addLayer(addv_river, 3);
map.addLayer(addv_town, 4);
map.addLayer(tdt_cva_layer);

/**
 * @description:地图加载完成时执行的方法
 */
function mapReady() {
    identifyTask = new IdentifyTask(river_url);
    identifyParameters = new IdentifyParameters();
    identifyParameters.tolerance = 3;
    identifyParameters.returnGeometry = true;
    identifyParameters.layerIds = [0];
    identifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
    
    map.on("click", executeIdentifyTask);

    
}

function executeIdentifyTask(event){
    console.log("进入查询函数");
    //在点击时设置查询参数
    identifyParameters.width = map.width;
    identifyParameters.height = map.height;
    identifyParameters.geometry = event.mapPoint;
    identifyParameters.mapExtent = map.extent;

    var deferred = identifyTask.execute(identifyParameters).addCallback(function (response:IdentifyResult[]) {
        return Array.map(response, function (result) {
            let feature = result.feature;//要素
            let layerName = result.layerName;//图层名
            console.log("图层名："+result.layerName);

            feature.attributes.layerName = layerName;//要素属性值为layername
            if (layerName == '临海市镇级及以上河流') {
                console.log("确认是要查询的图层");
                let riverTemplate = new InfoTemplate("",
                    "河流编码：${RVCD} <br/>河流名称：${RVNM} <br/> 河流等级: ${等级}");
                feature.setInfoTemplate(riverTemplate);
            }
            else {
                
                let buildingFootprintTemplate = new InfoTemplate("",
                    "没有查询到河流信息");
                feature.setInfoTemplate(buildingFootprintTemplate);
            }
            return feature;
        });
    });
    popup.setFeatures([deferred]);
    popup.show(event.mapPoint);
}

/**-------------地图组件-------------- */

/**-------------方法-------------- */
/**
 * 
 * @param map 地图对象
 * @param point 鼠标点击点
 * @param toleranceInPixel 容差（像素）
 */
function pointToExtent(map, point, toleranceInPixel) {
    var pixelWidth = map.extent.getWidth() / map.width;   //计算当前一个像素对应的实际长度
    var toleranceInMapCoords = toleranceInPixel * pixelWidth; //实际容差
    return new Extent(point.x - toleranceInMapCoords, //最小X
        point.y - toleranceInMapCoords,   //最小Y
        point.x + toleranceInMapCoords,
        point.y + toleranceInMapCoords,
        map.spatialReference);
}
/**-------------事件-------------- */


var imgBtn = dom.byId("img_basemap");
var vecBtn = dom.byId("vec_basemap");


on(imgBtn, "click", function () {
    console.log("imgbutn clicked!");
    map.removeLayer(tdt_vec_layer);
    map.addLayer(tdt_img_layer,0); 
   
})
on(vecBtn, "click", function () {
    console.log("vecbutn clicked!");
    map.removeLayer(tdt_img_layer);
    map.addLayer(tdt_vec_layer,0); 
   
})

