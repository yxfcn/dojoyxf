// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/parsers/ChartConverterPtoE","dojo/_base/lang esri/dijit/geoenrichment/utils/ImageUtil esri/dijit/geoenrichment/utils/JsonXmlConverter ../../../charts/chartUtils/ChartJsonUtil ../../ConversionUtil esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/ChartTypes ./_FieldInfoBuilder".split(" "),function(A,D,k,B,c,v,C){function E(b,c,g){return k.queryJson(b,"series").filter(function(b){return b.tags&&b.tags[0]&&"point"===
b.tags[0].name}).map(function(m){if(!m.tags)return null;m.attributes=m.attributes||{};return{label:m.attributes.Text||"",color:x(m.attributes.color),thickness:m.attributes.thickness,points:m.tags.map(function(a,m){a.attributes=a.attributes||{};var l=b.attributes.type===v.GAUGE&&1===m,h=a.tags&&a.tags[0];if((h=(h=h&&h.attributes&&h.attributes.f)&&C.getCalculatorOrScriptFieldInfo(h,c,null,g&&g.calculatorName))||l){var l=(l=a.attributes.CaptionField)&&C.getCalculatorOrScriptFieldInfo(l,c,null,g&&g.calculatorName),
n=k.queryJson(a,"pointIcon")[0],n=n&&c.parsers.getParser("field").parseField(n.tags[0],n,null,c);return B.createChartPoint(h,a.attributes.Text,x(a.attributes.color),n,l)}}).filter(function(a){return!!a})}}).filter(function(b){return b&&b.points&&!!b.points.length})}function F(b){return(b=k.queryJson(b,"BackImage")[0])&&b.tags&&"#text"===b.tags[0].name?D.base64DataToDataURL(b.tags[0].text):null}function G(b){if("string"!==typeof b)return 0;b=b.replace("%","");return"0"===b?0:b.replace("0.","").length}
function x(b){return"string"===typeof b&&6===b.length&&-1===b.indexOf("#")?"#"+b:b}return{portalToEditor:function(b,w,g){function m(a,b){return void 0===a?b:Number(a)||b}var a=k.queryJson(b,"comparisonInfo")[0],p;if(a){var l=a.attributes.name,h=g.templateJson.metadata.comparisonCalculatorsHash[l];h&&(p={calculatorName:l,chartType:a.attributes.chartType,color:a.attributes.color,levels:h.levels})}var n=E(b,g,p);if(!n.length)return null;var a=b.attributes,r=k.queryJson(b,"chartTitle")[0],q=k.queryJson(b,
"legend")[0],e=k.queryJson(b,"xAxis")[0],f=k.queryJson(b,"yAxis")[0],l=k.queryJson(b,"chartIcon"),l=k.queryJson(b,"chartIcon"),h=k.queryJson(b,"floatingIcon"),y=k.queryJson(b,"floatingText"),z=k.queryJson(b,"trigger");r.attributes=r.attributes||{};q.attributes=q.attributes||{};e.attributes=e.attributes||{};f.attributes=f.attributes||{};n.forEach(function(a){a.thickness=Number(a.thickness)});var d;v.isColumnBarLike(a.type)&&(d=1<n[0].thickness?"Large":1>n[0].thickness?"Small":"Medium");var t=e.tags&&
e.tags[0].attributes&&e.tags[0].attributes,u=f.tags&&f.tags[0].attributes&&f.tags[0].attributes;b=F(b);d={isChart:!0,type:a._type||a.type,seriesItems:n,visualProperties:{width:c.ptToPx(a.width),height:c.ptToPx(a.height),backgroundColor:x(a.backColor),barBorders:a.barBorders,dataLabels:a.dataLabels,view3D:!!a.view3D,origin:Number(a.origin)||0,lineThickness:a.type===v.LINE&&n[0].thickness||void 0,columnThickness:d,backgroundImageData:b,dataLabelsDecimals:G(a.CustomPercentFormat||a.CustomValueFormat),
title:{text:r.attributes.text,align:r.attributes.align&&r.attributes.align.toLowerCase(),style:c.ptToPxObj(c.parseStyleString(r.attributes.style))},xAxis:{show:"None"!==e.attributes.placement,showTicks:e.attributes.ticks,style:c.ptToPxObj(c.parseStyleString(e.attributes.style)),title:t&&t.text,gridLines:e.attributes.gridlines,gridLinesCentered:e.attributes.gridlinesCentered,titleStyle:t&&c.ptToPxObj(c.parseStyleString(t.style)),placement:"OtherSide"===e.attributes.placement?"OtherSide":void 0,labelsAngle:Number(e.attributes.labelsAngle)||
0,showLine:e.attributes.line,lineColor:e.attributes.lineColor,ticksInside:e.attributes.ticksInside,gridLinesOpacity:m(e.attributes.gridlinesOpacity,1)},yAxis:{show:"None"!==f.attributes.placement,showTicks:f.attributes.ticks,style:c.ptToPxObj(c.parseStyleString(f.attributes.style)),title:u&&u.text,gridLines:f.attributes.gridlines,gridLinesCentered:f.attributes.gridlinesCentered,titleStyle:u&&c.ptToPxObj(c.parseStyleString(u.style)),placement:"OtherSide"===f.attributes.placement?"OtherSide":void 0,
labelsAngle:Number(f.attributes.labelsAngle)||0,showLine:f.attributes.line,lineColor:f.attributes.lineColor,ticksInside:f.attributes.ticksInside,gridLinesOpacity:m(f.attributes.gridlinesOpacity,1)},legend:{hasBorder:q.attributes.hasBorder,labelParts:q.attributes.labelParts,placement:q.attributes.placement,placementOffset:Number(q.attributes.placementOffset)||0,style:c.ptToPxObj(c.parseStyleString(q.attributes.style))},dataLabelsStyle:c.ptToPxObj(c.parseStyleString(a.dataLabelsStyle))}};d.isMultiFeatureChart=
!!a.isMultiFeatureChart;A.mixin(d.visualProperties,{isStacked:a.isStacked,showColumnBarBackground:a.showColumnBarBackground,columnBarBackgroundColor:a.columnBarBackgroundColor,fillLineArea:a.fillLineArea,donutHolePercent:Number(a.donutHolePercent)||void 0,donutGap:Number(a.donutGap)||void 0,donutArcPercent:Number(a.donutArcPercent)||void 0,gaugeHolePercent:Number(a.gaugeHolePercent)||void 0,gaugeGap:Number(a.gaugeGap)||void 0,gaugeStartAngle:Number(a.gaugeStartAngle)||void 0,gaugeArcPercent:Number(a.gaugeArcPercent)||
void 0,gaugeLabelStyle:c.ptToPxObj(c.parseStyleString(a.gaugeLabelStyle))||void 0,gaugeLabelPlacement:a.gaugeLabelPlacement||void 0,gaugeShowArrow:a.gaugeShowArrow||void 0,gaugeArrowLineColor:a.gaugeArrowLineColor||void 0,gaugeArrowFillColor:a.gaugeArrowFillColor||void 0,ringBackgroundColor:a.ringBackgroundColor,showWholePictures:a.showWholePictures,dataLabelsInside:a.dataLabelsInside,dataLabelsStackedInColumns:a.dataLabelsStackedInColumns,dataLabelsHorizontalAlign:a.dataLabelsHorizontalAlign,showAxisIcons:a.showAxisIcons,
showChartIcons:a.showChartIcons,sorting:a.sorting});1.2>g.revisionVersion&&(void 0!==d.visualProperties.donutGap&&(d.visualProperties.donutGap/=2*Math.PI),void 0!==d.visualProperties.gaugeGap&&(d.visualProperties.gaugeGap/=2*Math.PI));l&&l.length&&(d.visualProperties.chartIcons=l.map(function(a){return a.tags&&a.tags[0]?g.parsers.getParser("field").parseField(a.tags[0],a,null,g):null}));h&&h.length&&(d.visualProperties.floatingIcons=h.map(function(a){return g.parsers.getParser("section").parseTable(a.tags[0],
g)}));y&&y.length&&(d.visualProperties.floatingTexts=y.map(function(a){return g.parsers.getParser("section").parseTable(a.tags[0],g)}));z&&z.length&&(d.visualProperties.conditionalStyling=g.parsers.getParser("field").parseFieldTrigger(z[0]));d.comparisonInfo=p;p={};w.attributes&&w.attributes.style&&A.mixin(p,c.parseStyleString(w.attributes.style));c.ptToPxObj(p);B.provideDefaultValueForMissing(d,{font:p});return d}}});