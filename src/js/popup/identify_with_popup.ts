///<reference path="../../typings/typings.d.ts"/>

import Map = require("esri/map");
import InfoTemplate = require("esri/InfoTemplate");
import ArcGISDynamicMapServiceLayer = require("esri/layers/ArcGISDynamicMapServiceLayer");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import IdentifyTask = require("esri/tasks/IdentifyTask");
import IdentifyParameters = require("esri/tasks/IdentifyParameters");
import Popup = require("esri/dijit/Popup");
import Array = require("dojo/_base/array");
import Color = require("esri/Color");
import domConstruct = require("dojo/dom-construct");


let identifyTask: IdentifyTask;
let identifyParameters: IdentifyParameters;


//定义popup窗体的填充样式，创建dom节点
let popup: Popup = new Popup({
    fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2),
        new Color([255, 255, 0, 0.25])
    )

}, domConstruct.create("div"));

//定义地图
let map: Map = new Map("map", {
    basemap: "satellite",
    center: [-83.275, 42.573],
    zoom: 18,
    infoWindow: popup
});
map.on("load", mapReady);
var parcelsURL = "https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer";
map.addLayer(new ArcGISDynamicMapServiceLayer(parcelsURL,
    { opacity: 0.55 }));

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
            let feature = result.feature;
            let layerName = result.layerName;

            feature.attributes.layerName = layerName;
            if (layerName == 'Tax Parcels') {
                let taxParcelTemplate = new InfoTemplate("",
                    "${Postal Address} <br/> Owner of record: ${First Owner Name}");
                feature.setInfoTemplate(taxParcelTemplate);
            }
            else if (layerName === 'Building Footprints') {
                console.log(feature.attributes.PARCELID);
                let buildingFootprintTemplate = new InfoTemplate("",
                    "Parcel ID: ${PARCELID}");
                feature.setInfoTemplate(buildingFootprintTemplate);
            }
            return feature;
        });
    });
    map.infoWindow.setFeatures([deferred]);
    map.infoWindow.show(event.mapPoint);
}



