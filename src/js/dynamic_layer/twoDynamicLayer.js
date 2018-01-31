define(["require", "exports", "esri/map", "dojo/dom-construct", "esri/Color", "esri/dijit/Geocoder", "esri/dijit/Popup", "esri/InfoTemplate", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleFillSymbol"], function (require, exports, Map, domConstruct, Color, Geocoder, Popup, InfoTemplate, ArcGISDynamicMapServiceLayer, SimpleFillSymbol, SimpleLineSymbol) {
    "use strict";
    ///<reference path="../../typings/typings.d.ts"/>
    /**
     * @description:present two dynamic layer
     * @author:yxf
     * @DateTime:2018-01-17 18:41
     */
    console.log("two dynamic layer test!");
    var map;
    //定义符号 参数：style color width,其中，style是预定义的字符串；也可以用json创建线符号
    var sls = new SimpleLineSymbol("solid", new Color("#444444"), 3); //线符号
    var sfs = new SimpleFillSymbol("solid", sls, new Color([68, 68, 68, 0.25])); //填充面符号
    //定义弹窗
    var popup = new Popup({
        fillSymbol: sfs,
        lineSymbol: null,
        markerSymbol: null
    }, domConstruct.create("div")); //创建一个html元素放置弹窗
    //定义地图对象
    map = new Map("ui-esri-map", {
        basemap: "topo",
        center: [-94.75290067627297, 39.034671990514816],
        zoom: 12,
        sliderStyle: "small",
        infoWindow: popup //信息窗口对象
    });
    //地理编码 组件
    var geocoder = new Geocoder({
        arcgisGeocoder: {
            placeholder: "Search"
        },
        map: map //引用的地图对象
    }, "ui-esri-dijit-geocoder"); //引用的html元素节点
    var _countyCensusInfoTemplate = new InfoTemplate(); //创建infowindow
    _countyCensusInfoTemplate.setTitle("<b>Census Information</b>"); //设置infowindow的标题
    var _blockGroupInfoTemplate = new InfoTemplate();
    _blockGroupInfoTemplate.setTitle("<b>Census Information</b>");
    var _censusInfoContent = "<div class=\"demographicInfoContent\">" +
        "<div class='demographicNumericPadding'>${AGE_5_17:formatNumber}</div><div class=\"demographicInnerSpacing\"></div>people ages 5 - 17<br>" +
        "<div class='demographicNumericPadding'>${AGE_40_49:formatNumber}</div><div class=\"demographicInnerSpacing\"></div>people ages 40 - 49<br>" +
        "<div class='demographicNumericPadding'>${AGE_65_UP:formatNumber}</div><div class=\"demographicInnerSpacing\"></div>people ages 65 and older" +
        "</div>";
    //设置infowindow内容，使用${}代表值
    _countyCensusInfoTemplate.setContent("Demographics for:<br>${NAME} ${STATE_NAME:getCounty}, ${STATE_NAME}<br>" + _censusInfoContent);
    _blockGroupInfoTemplate.setContent("Demographics for:<br>Tract: ${TRACT:formatNumber} Blockgroup: ${BLKGRP}<br>" + _censusInfoContent);
    var _oilAndGasInfoTemplate = new InfoTemplate();
    _oilAndGasInfoTemplate.setTitle("<b>Oil and Gas data</b>");
    var _oilAndGasInfoContent = "<div class=\"demographicInfoContent\">" +
        "Gas production: ${PROD_GAS}<br>Oil production: ${PROD_OIL:formatNumber}" +
        "</div>";
    _oilAndGasInfoTemplate.setContent("${FIELD_NAME} production field<br>" + _oilAndGasInfoContent);
    //定义地图服务地址
    var demographicsLayerURL = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer";
    //定义地图服务配置项
    var demographicsLayerOptions = {
        "id": "demographicsLayer",
        "opacity": 0.8,
        "showAttribution": false
    };
    //创建地图服务
    var demographicsLayer = new ArcGISDynamicMapServiceLayer(demographicsLayerURL, demographicsLayerOptions);
    //设置服务的弹 窗
    demographicsLayer.setInfoTemplates({
        1: { infoTemplate: _blockGroupInfoTemplate },
        2: { infoTemplate: _countyCensusInfoTemplate }
    });
    demographicsLayer.setVisibleLayers([1, 2]); //设置图层的可见属性
    map.addLayer(demographicsLayer); //将地图动态图层服务添加到地图对象中
    var oilAndGasLayer = new ArcGISDynamicMapServiceLayer("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Petroleum/KGS_OilGasFields_Kansas/MapServer", {
        "id": "oilAndGasLayer",
        "opacity": 0.75
    });
    oilAndGasLayer.setInfoTemplates({
        0: { infoTemplate: _oilAndGasInfoTemplate }
    });
    map.addLayer(oilAndGasLayer);
    //启动编码组件
    geocoder.startup();
    //转换数据格式
    var formatNumber = function (value, key, data) {
        var searchText = "" + value;
        var formattedString = searchText.replace(/(\d)(?=(\d\d\d)+(?!\d))/gm, "$1,");
        return formattedString;
    };
    var getCounty = function (value, key, data) {
        if (value.toUpperCase() !== "LOUISIANA") {
            return "County";
        }
        else {
            return "Parish";
        }
    };
});
//# sourceMappingURL=twoDynamicLayer.js.map