define(["require", "exports", "dojo/parser", "esri/geometry/Extent", "esri/layers/TileInfo", "esri/SpatialReference", "esri/map", "dojo/on", "dojo/dom", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/WebTiledLayer", "dojo/dom-construct", "esri/Color", "esri/dijit/Popup", "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleFillSymbol", "esri/layers/FeatureLayer", "esri/dijit/Basemap", "esri/dijit/BasemapLayer", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "dojo/_base/array", "./TDTOptions"], function (require, exports, parser, Extent, TileInfo, SpatialReference, Map, on, dom, ArcGISDynamicMapServiceLayer, WebTiledLayer, domConstruct, Color, Popup, InfoTemplate, SimpleFillSymbol, SimpleLineSymbol, FeatureLayer, Basemap, BasemapLayer, IdentifyTask, IdentifyParameters, Array, TDTOptions) {
    "use strict";
    console.log("Come in");
    parser.parse();
    /**----------定义一些常量------ */
    //----------------天地图相关---------------//
    //天地图GCS2000坐标系
    var TDTSR = new SpatialReference({ wkid: 4490 });
    //天地图切片信息
    var TDT_TILEINFO = new TileInfo({
        "dpi": 96,
        "compressionQuality": 0,
        "spatialReference": TDTSR,
        "rows": 256,
        "cols": 256,
        "origin": {
            "x": -180,
            "y": 90
        },
        "lods": [
            { "level": 0, "resolution": 1.40625, "scale": 590995197.14166909755553014475 },
            { "level": 1, "resolution": 0.703125, "scale": 295497598.57083454877776507238 },
            { "level": 2, "resolution": 0.3515625, "scale": 147748799.28541727438888253619 },
            { "level": 3, "resolution": 0.17578125, "scale": 73874399.642708637194441268094 },
            { "level": 4, "resolution": 0.087890625, "scale": 36937199.821354318597220634047 },
            { "level": 5, "resolution": 0.0439453125, "scale": 18468599.910677159298610317023 },
            { "level": 6, "resolution": 0.02197265625, "scale": 9234299.955338579649305158512 },
            { "level": 7, "resolution": 0.010986328125, "scale": 4617149.9776692898246525792559 },
            { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9888346449123262896279 },
            { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.494417322456163144814 },
            { "level": 10, "resolution": 0.001373291015625, "scale": 577143.74720866122808157240698 },
            { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.87360433061404078620349 },
            { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93680216530702039310175 },
            { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.968401082653510196550873 },
            { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.484200541326755098275436 },
            { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.742100270663377549137718 },
            { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.871050135331688774568859 },
            { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9355250676658443872844296 },
            { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677625338329221936422148 },
            { "level": 19, "resolution": 0.000002682209014892578125, "scale": 1127.2338812669164610968211074 },
            { "level": 20, "resolution": 0.0000013411045074462890625, "scale": 563.61694063345823054841055369 }
        ]
    });
    //天地图范围
    var TDT_EXTENT = new Extent(-180.0, -90.0, 180.0, 90.0, TDTSR);
    //天地图服务器地址
    var TDT_SUBDOMAINS = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
    //天地图电子地图模板
    var TDT_URLPATTERN_VEC = "http://${subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
    //天地图卫星影像地图模块
    var TDT_URLPATTERN_IMG = "http://${subDomain}.tianditu.com/img_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
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
    var tdt_basemap_vec; //底图组件
    var tdt_basemap_img; //底图组件
    var tdt_basemaplayer_vec; //天地图电子地图图层组件
    var tdt_basemaplayer_img; //天地图卫星影像地图图层组件
    var identifyTask;
    var identifyParameters;
    //定义popup窗体的填充样式，创建dom节点
    var popup = new Popup({
        fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
    }, domConstruct.create("div"));
    //天地图电子地图图层组件初始化
    tdt_basemaplayer_vec = new BasemapLayer({
        fullExtent: TDT_EXTENT,
        initialExtent: TDT_EXTENT,
        subDomains: TDT_SUBDOMAINS,
        tileInfo: TDT_TILEINFO,
        templateUrl: TDT_URLPATTERN_VEC,
        type: "WebTiledLayer"
    });
    tdt_basemaplayer_img = new BasemapLayer({
        fullExtent: TDT_EXTENT,
        initialExtent: TDT_EXTENT,
        subDomains: TDT_SUBDOMAINS,
        tileInfo: TDT_TILEINFO,
        templateUrl: TDT_URLPATTERN_IMG,
        type: "WebTiledLayer"
    });
    tdt_basemap_vec = new Basemap({
        layers: [tdt_basemaplayer_vec],
        title: "天地图-电子地图",
        thumbnailUrl: "../assets/images/tdt/tdt_vec.jpg"
    });
    tdt_basemap_img = new Basemap({
        layers: [tdt_basemaplayer_img],
        title: "天地图-卫星影像",
        thumbnailUrl: "../assets/images/tdt/tdt_img.jpg"
    });
    map = new Map("map", {
        //center: [121, 28.8],
        extent: LH_EXTENT,
        zoom: 11,
        logo: false,
        infoWindow: popup
    });
    map.on("load", mapReady);
    var tdt_vec_options = {
        "fullExtent": TDT_EXTENT,
        "initialExtent": TDT_EXTENT,
        "subDomains": TDT_SUBDOMAINS,
        "tileInfo": TDT_TILEINFO,
        "id": "vec"
    };
    var tdt_img_options = {
        "fullExtent": TDT_EXTENT,
        "initialExtent": TDT_EXTENT,
        "subDomains": TDT_SUBDOMAINS,
        "tileInfo": TDT_TILEINFO,
        "id": "img"
    };
    //天地图_电子地图
    var tdt_options = new TDTOptions();
    //var tdt_vec_layer = new WebTiledLayer(TDT_URLPATTERN_VEC, tdt_vec_options);
    var tdt_vec_layer = new WebTiledLayer(TDT_URLPATTERN_VEC, tdt_options);
    //var tdt_vec_layer=new TDT("vec");
    //var tdt_img_layer = new WebTiledLayer(TDT_URLPATTERN_IMG, tdt_img_options);
    var tdt_img_layer = new WebTiledLayer(TDT_URLPATTERN_IMG, tdt_options);
    //var tdt_img_layer = new TDT("img");
    var addv_town = new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");
    var addv_river = new ArcGISDynamicMapServiceLayer(river_url);
    var river_town_featurelayer = new FeatureLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_RIVER_TOWN/MapServer/0");
    //tdt_img_layer.visible = false;
    map.addLayer(tdt_vec_layer, 1);
    //map.addLayer(tdt_img_layer, 2);
    map.addLayer(addv_river, 3);
    map.addLayer(addv_town, 4);
    //console.log(map.getLayer("img").visible);
    /** ----------INFOWINDOW-------------- */
    //定义符号 参数：style color width,其中，style是预定义的字符串；也可以用json创建线符号
    /* var sls = new SimpleLineSymbol("solid", new Color("#444444"), 3); //线符号
    var sfs = new SimpleFillSymbol("solid", sls, new Color([68, 68, 68, 0.25]));//填充面符号 */
    //定义弹窗
    /* var popup = new Popup({
        fillSymbol: sfs, //填充样式
        lineSymbol: null,
        markerSymbol: null
    }, domConstruct.create("div"));//创建一个html元素放置弹窗 */
    //domClass.add(popup.domNode, "myTheme");      //?????
    /**
     * @description:地图加载完成时执行的方法
     */
    function mapReady() {
        map.on("click", executeIdentifyTask);
        identifyTask = new IdentifyTask(river_url);
        identifyParameters = new IdentifyParameters();
        identifyParameters.tolerance = 3;
        identifyParameters.returnGeometry = true;
        identifyParameters.layerIds = [0];
        identifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
        identifyParameters.width = map.width;
        identifyParameters.height = map.height;
    }
    function executeIdentifyTask(event) {
        console.log("进入查询函数");
        //在点击时设置查询参数
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
    /* var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: false,
        map: map
    }, "basemapGallery");
    basemapGallery.basemaps.push(tdt_basemap_vec);
    basemapGallery.basemaps.push(tdt_basemap_img);
    basemapGallery.startup();
     */
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
    /* basemapGallery.on("error", function (msg) {
        console.log("basemap gallery error:  ", msg);
    }); */
    var imgBtn = dom.byId("img_basemap");
    var vecBtn = dom.byId("vec_basemap");
    /* on(vecBtn, "click", function () {
        if (tdt_vec_layer.visible) {
            tdt_vec_layer.visible = false;
            tdt_img_layer.visible=true;
        }
    
    }) */
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
//# sourceMappingURL=TDTLH_BK.js.map