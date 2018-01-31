// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/content/templates/ImageDecsription.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'ImgDesc\',minOccurs:0,showHeader:false,label:\'${i18nArcGIS.contInfo.ImgDesc.caption}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n\r\n      \x3c!-- description --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n        data-dojo-props\x3d"showHeader:false,label:\'${i18nArcGIS.contInfo.ImgDesc.section.description}\'"\x3e\r\n        \r\n        \x3c!-- attribute description --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'attDesc\',minOccurs:1,label:\'${i18nArcGIS.contInfo.attDesc}\'"\x3e\r\n        \x3c/div\x3e\r\n    \r\n        \x3c!-- content type --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'contentTyp\',minOccurs:1,label:\'${i18nArcGIS.codelist.MD_CoverageContentTypeCode}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/content/ContentTypCd"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- illumination elevation angle --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'illElevAng\',minOccurs:0,label:\'${i18nArcGIS.contInfo.ImgDesc.illElevAng}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" \r\n            data-dojo-props\x3d"minValue:-90.0,maxValue:90.0,hint:\'${i18nArcGIS.hints.number90To90}\'"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- illumination azimuth angle --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'illAziAng\',minOccurs:0,label:\'${i18nArcGIS.contInfo.ImgDesc.illAziAng}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" \r\n            data-dojo-props\x3d"minValue:0.0,maxValue:360.0,hint:\'${i18nArcGIS.hints.number0To360}\'"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- imaging condition --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'imagCond\',minOccurs:0,label:\'${i18nArcGIS.codelist.MD_ImagingConditionCode}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'ImgCondCd\',minOccurs:0,showHeader:false"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n              data-dojo-props\x3d"target:\'value\',minOccurs:0,showHeader:false"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputSelectCode"\r\n                data-dojo-props\x3d"codelistType:\'MD_ImagingConditionCode\'"\x3e\r\n              \x3c/div\x3e              \r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- cloud cover --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'cloudCovPer\',minOccurs:0,label:\'${i18nArcGIS.contInfo.ImgDesc.cloudCovPer}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" \r\n            data-dojo-props\x3d"minValue:0.0,maxValue:100.0,hint:\'${i18nArcGIS.hints.number0To100}\'"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- compression quality --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'cmpGenQuan\',minOccurs:0,label:\'${i18nArcGIS.contInfo.ImgDesc.cmpGenQuan}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" \r\n            data-dojo-props\x3d"integerOnly:true"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \r\n        \x3c!-- Triangulation Indicator --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'trianInd\',minOccurs:0,showHeader:false"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputCheckBox"\r\n            data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.ImgDesc.trianInd}\'"\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- Radiometric Calibration Data Availabilityr --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'radCalDatAv\',minOccurs:0,showHeader:false"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputCheckBox"\r\n            data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.ImgDesc.radCalDatAv}\'"\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- Camera Calibration Information Availability --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'camCalInAv\',minOccurs:0,showHeader:false"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputCheckBox"\r\n            data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.ImgDesc.camCalInAv}\'"\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- Film Distoration Information Availability --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'filmDistInAv\',minOccurs:0,showHeader:false"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputCheckBox"\r\n            data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.ImgDesc.filmDistInAv}\'"\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- Lens Distoration Information Availability --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'lensDistInAv\',minOccurs:0,showHeader:false"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputCheckBox"\r\n            data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.ImgDesc.lensDistInAv}\'"\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- Quality Code --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'imagQuCode\',minOccurs:0,label:\'${i18nArcGIS.contInfo.ImgDesc.imagQuCode}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'identCode\',minOccurs:1,label:\'${i18nArcGIS.codeRef.identCode}\'"\x3e\r\n          \x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'identAuth\',minOccurs:0,label:\'${i18nArcGIS.codeRef.identAuth}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/citation/CitationElements"\x3e\x3c/div\x3e    \r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \r\n        \x3c!-- Processing Level Code --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'prcTypCde\',minOccurs:0,label:\'${i18nArcGIS.contInfo.ImgDesc.prcTypCde}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'identCode\',minOccurs:1,label:\'${i18nArcGIS.codeRef.identCode}\'"\x3e\r\n          \x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'identAuth\',minOccurs:0,label:\'${i18nArcGIS.codeRef.identAuth}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/citation/CitationElements"\x3e\x3c/div\x3e    \r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- range/band --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section"\r\n        data-dojo-props\x3d"showHeader:false,label:\'${i18nArcGIS.contInfo.ImgDesc.section.rangesAndBands}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'covDim\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.contInfo.covDim.caption}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/ElementChoice"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/content/RangeDimension"\r\n              data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.RangeDim.caption}\'"\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/content/Band"\r\n              data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.Band.caption}\'"\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e    \r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/content/ImageDecsription","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/ImageDecsription.html ./ContentTypCd ./Band ./RangeDimension ../citation/CitationElements".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.content.ImageDecsription",a,d);return a});