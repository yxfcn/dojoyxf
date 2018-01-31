// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/templateJsonUtils/query/TemplateJsonQueryUtil",["./_SectionJsonCollector"],function(g){var b={},d={process:function(a,c,e,b,f){var h=b;b=function(a,c,e){a&&h.apply(this,arguments)};f={processLevel:c,objJson:e,processFunc:b,ignoreComparisonCalculators:f&&f.ignoreComparisonCalculators};a===c?b(e):"document"===a?d._processTemplateJson(e,f):"section"===a?d._processSectionJson(e,f):"table"===a?d._processTableJson(e,f):"tableRow"===a&&d._processTableDataObj(e,
f)},_processTemplateJson:function(a,c){g.collectSectionJsons(a,{saveParentInfo:!1,processFieldInfoFunc:function(a){"field"===c.processLevel&&c.processFunc(a)}}).forEach(function(a){d._processSectionJson(a,c)})},_processSectionJson:function(a,c){"section"===c.processLevel?c.processFunc(a):a.stack.forEach(function(a){"sectionElement"===c.processLevel?c.processFunc(a):"table"===a.id&&("table"===c.processLevel?c.processFunc(a):d._processTableJson(a,c))})},_processTableJson:function(a,c,e){a.data.data.forEach(function(a){"tableRow"===
c.processLevel&&c.processFunc(a,e);d._processTableDataObj(a,c,e)});a.backgroundSectionJson&&d._processSectionJson(a.backgroundSectionJson,c);a.foregroundSectionJson&&d._processSectionJson(a.foregroundSectionJson,c);a.floatingTablesSectionJson&&d._processSectionJson(a.floatingTablesSectionJson,c)},_processTableDataObj:function(a,c,e){if(a.fieldInfos)for(var b in a.fieldInfos)d._processFieldInfo(a.fieldInfos[b],c,e)},_processFieldInfo:function(a,c,b){function e(a,b){"field"===c.processLevel&&c.processFunc(a,
b)}if(a){e(a,b);a&&a.triggerJson&&a.triggerJson.fieldInfo&&a.templateName!==a.triggerJson.fieldInfo.templateName&&e(a.triggerJson.fieldInfo,a);a.linkFieldInfo&&e(a.linkFieldInfo,a);a.isInfographic&&a.infographicJson.header&&d._processTableJson(a.infographicJson.header,c,a);a.isInfographic&&a.infographicJson.variableTables&&a.infographicJson.variableTables.forEach(function(b){b.variable&&d._processFieldInfo(b.variable.fieldInfo,c,a);b.description&&b.description.fieldInfo&&d._processFieldInfo(b.description.fieldInfo,
c,a)});if(a.isInfographic&&a.infographicJson&&a.infographicJson.dataDrilling)for(var f in a.infographicJson.dataDrilling)(b=a.infographicJson.dataDrilling[f])&&b.sectionJson&&d._processSectionJson(b.sectionJson,c);a.isRichText&&(a.richTextJson.fieldInfos.forEach(function(b){d._processFieldInfo(b,c,a)}),a.richTextJson.specialFieldInfos.forEach(function(b){d._processFieldInfo(b,c,a)}));a.isChart&&(f=a.chartJson.visualProperties,f.chartIcons&&f.chartIcons.forEach(function(b){d._processFieldInfo(b,c,
a)}),f.floatingIcons&&f.floatingIcons.forEach(function(b){d._processTableJson(b,c,a)}),f.floatingTexts&&f.floatingTexts.forEach(function(b){d._processTableJson(b,c,a)}),a.chartJson.seriesItems.forEach(function(b){b.points.forEach(function(b){c.ignoreComparisonCalculators&&a.chartJson.comparisonInfo||d._processFieldInfo(b.fieldInfo,c,a);b.iconFieldInfo&&d._processFieldInfo(b.iconFieldInfo,c,a);b.captionFieldInfo&&d._processFieldInfo(b.captionFieldInfo,c,a)})}));a.isReportSection&&a.sectionJson&&d._processSectionJson(a.sectionJson,
c)}}};b.DOCUMENT="document";b.SECTION="section";b.TABLE="table";b.SECTION_ELEMENT="sectionElement";b.TABLE_ROW="tableRow";b.FIELD="field";b.process=d.process;b.processTemplateFieldInfos=function(a,b,e){d.process("document","field",a,b,e)};b.processSectionFieldInfos=function(a,b,e){d.process("section","field",a,b,e)};b.processSectionElements=function(a,b){d.process("document","sectionElement",a,b)};b.processTableFieldInfos=function(a,b,e){d.process("table","field",a,b,e)};b.hasDynamicColumns=function(a){return b._checkTableAttributes(a,
function(a){return 0<a.dynamicColumns})};b.hasDynamicRows=function(a){return b._checkTableAttributes(a,function(a){return 0<a.dynamicRows})};b._checkTableAttributes=function(a,b){return g.collectSectionJsons(a).some(function(a){return a.stack.some(function(a){if("table"===a.id&&a.attributes&&b(a.attributes))return!0})})};b.hasMultiFeatureChart=function(a){var c=!1;b.processSectionFieldInfos(a,function(a){c=c||a.isChart&&a.chartJson&&!!a.chartJson.isMultiFeatureChart});return c};b.isGraphicReport=
function(a){return!!a.sectionsTables};b.collectSectionJsons=g.collectSectionJsons;b.getParentBox=g.getParentBox;b.getParentStyle=g.getParentStyle;return b});