// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/supportClasses/tasks/parsers/AttrUtil",[],function(){var a={},b="ID OBJECTID AREA_ID HasData aggregationMethod sourceCountry radiusIndex".split(" ");a.cleanUpAttrs=function(a){a&&b.forEach(function(b){delete a[b]})};return a});