///<reference path="../../typings/typings.d.ts"/>
define(["require", "exports", "esri/map", "esri/InfoTemplate", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "esri/dijit/Popup", "dojo/_base/array", "esri/Color", "dojo/dom-construct"], function (require, exports, Map, InfoTemplate, ArcGISDynamicMapServiceLayer, SimpleFillSymbol, SimpleLineSymbol, IdentifyTask, IdentifyParameters, Popup, Array, Color, domConstruct) {
    "use strict";
    var identifyTask;
    var identifyParameters;
    //定义popup窗体的填充样式，创建dom节点
    var popup = new Popup({
        fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
    }, domConstruct.create("div"));
    //定义地图
    var map = new Map("map", {
        basemap: "satellite",
        center: [-83.275, 42.573],
        zoom: 18,
        infoWindow: popup
    });
    map.on("load", mapReady);
    var parcelsURL = "https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer";
    map.addLayer(new ArcGISDynamicMapServiceLayer(parcelsURL, { opacity: 0.55 }));
    function mapReady() {
        map.on("click", executeIdentifyTask);
        identifyTask = new IdentifyTask(parcelsURL);
        identifyParameters = new IdentifyParameters();
        identifyParameters.tolerance = 3;
        identifyParameters.returnGeometry = true;
        identifyParameters.layerIds = [0, 2];
        identifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
        identifyParameters.width = map.width;
        identifyParameters.height = map.height;
    }
    function executeIdentifyTask(event) {
        identifyParameters.geometry = event.mapPoint;
        identifyParameters.mapExtent = map.extent;
        var deferred = identifyTask.execute(identifyParameters).addCallback(function (response) {
            return Array.map(response, function (result) {
                var feature = result.feature;
                var layerName = result.layerName;
                feature.attributes.layerName = layerName;
                if (layerName == 'Tax Parcels') {
                    var taxParcelTemplate = new InfoTemplate("", "${Postal Address} <br/> Owner of record: ${First Owner Name}");
                    feature.setInfoTemplate(taxParcelTemplate);
                }
                else if (layerName === 'Building Footprints') {
                    console.log(feature.attributes.PARCELID);
                    var buildingFootprintTemplate = new InfoTemplate("", "Parcel ID: ${PARCELID}");
                    feature.setInfoTemplate(buildingFootprintTemplate);
                }
                return feature;
            });
        });
        map.infoWindow.setFeatures([deferred]);
        map.infoWindow.show(event.mapPoint);
    }
});
//# sourceMappingURL=identify_with_popup.js.map