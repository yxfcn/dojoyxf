define(["require", "exports", "dojo/parser", "esri/geometry/Extent", "esri/SpatialReference", "esri/map", "dojo/on", "dojo/dom", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/WebTiledLayer", "dojo/dom-construct", "esri/Color", "esri/dijit/Popup", "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleFillSymbol", "esri/layers/FeatureLayer", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "dojo/_base/array", "./TDTOptions"], function (require, exports, parser, Extent, SpatialReference, Map, on, dom, ArcGISDynamicMapServiceLayer, WebTiledLayer, domConstruct, Color, Popup, InfoTemplate, SimpleFillSymbol, SimpleLineSymbol, FeatureLayer, IdentifyTask, IdentifyParameters, Array, TDTOptions) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("Come in");
    parser.parse();
    /**----------定义一些常量------ */
    //----------------天地图相关---------------//
    //天地图GCS2000坐标系
    var TDTSR = new SpatialReference({ wkid: 4490 });
    //天地图切片信息
    //临海初始化范围
    var LH_EXTENT = new Extent({
        xmin: 120.82287337300001,
        ymin: 28.666733309,
        xmax: 121.71025052300001,
        ymax: 29.068217945,
        spatialReference: TDTSR
    });
    /**----------定义一些变量------ */
    var river_url = "http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_RIVER_TOWN/MapServer";
    var map; //地图
    /* let tdt_basemap_vec: Basemap;//底图组件
    let tdt_basemap_img: Basemap;//底图组件
    let tdt_basemaplayer_vec: BasemapLayer;//天地图电子地图图层组件
    let tdt_basemaplayer_img: BasemapLayer;//天地图卫星影像地图图层组件 */
    var identifyTask;
    var identifyParameters;
    //定义popup窗体的填充样式，创建dom节点
    var popup = new Popup({
        fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
    }, domConstruct.create("div"));
    map = new Map("map", {
        extent: LH_EXTENT,
        zoom: 11,
        logo: false,
        infoWindow: popup
    });
    map.on("load", mapReady);
    //天地图_电子地图
    var tdt_options = new TDTOptions();
    var tdt_vec_layer = new WebTiledLayer(tdt_options.vec_pattern, tdt_options);
    var tdt_img_layer = new WebTiledLayer(tdt_options.img_pattern, tdt_options);
    var tdt_cva_layer = new WebTiledLayer(tdt_options.cva_pattern, tdt_options);
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
    function executeIdentifyTask(event) {
        console.log("进入查询函数");
        //在点击时设置查询参数
        identifyParameters.width = map.width;
        identifyParameters.height = map.height;
        identifyParameters.geometry = event.mapPoint;
        identifyParameters.mapExtent = map.extent;
        var deferred = identifyTask.execute(identifyParameters).addCallback(function (response) {
            return Array.map(response, function (result) {
                var feature = result.feature; //要素
                var layerName = result.layerName; //图层名
                console.log("图层名：" + result.layerName);
                feature.attributes.layerName = layerName; //要素属性值为layername
                if (layerName == '临海市镇级及以上河流') {
                    console.log("确认是要查询的图层");
                    var riverTemplate = new InfoTemplate("", "河流编码：${RVCD} <br/>河流名称：${RVNM} <br/> 河流等级: ${等级}");
                    feature.setInfoTemplate(riverTemplate);
                }
                else {
                    var buildingFootprintTemplate = new InfoTemplate("", "没有查询到河流信息");
                    feature.setInfoTemplate(buildingFootprintTemplate);
                }
                return feature;
            });
        });
        map.infoWindow.setFeatures([deferred]);
        map.infoWindow.show(event.mapPoint);
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
        var pixelWidth = map.extent.getWidth() / map.width; //计算当前一个像素对应的实际长度
        var toleranceInMapCoords = toleranceInPixel * pixelWidth; //实际容差
        return new Extent(point.x - toleranceInMapCoords, //最小X
        point.y - toleranceInMapCoords, //最小Y
        point.x + toleranceInMapCoords, point.y + toleranceInMapCoords, map.spatialReference);
    }
    /**-------------事件-------------- */
    var imgBtn = dom.byId("img_basemap");
    var vecBtn = dom.byId("vec_basemap");
    on(imgBtn, "click", function () {
        console.log("imgbutn clicked!");
        map.removeLayer(tdt_vec_layer);
        map.addLayer(tdt_img_layer, 0);
    });
    on(vecBtn, "click", function () {
        console.log("vecbutn clicked!");
        map.removeLayer(tdt_img_layer);
        map.addLayer(tdt_vec_layer, 0);
    });
});
//# sourceMappingURL=LHTDT.js.map