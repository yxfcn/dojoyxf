// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/conditionalStyling/ConditionalStyleUtil",["esri/dijit/geoenrichment/utils/PageUnitsConverter"],function(k){var d={},f={FontSize:"fontSize",FontColor:"fontColor",FontFamily:"fontFamily",ForeColor:"color",BackColor:"backgroundColor"},l={},h;for(h in f)l[f[h]]=h;d.getConditionalStyle=function(b,c){var a=d.getMatchedCase(b,c);return a?d.styleFromSetters(a.setters):null};d.getMatchedCase=function(b,c){if(null!==b&&""!==b&&(b=Number(b),c&&
!isNaN(b))){var a;c.cases.some(function(c){if(d._checkValueMatchesCase(b,c))return a=c,!0});return a}};d._checkValueMatchesCase=function(b,c){function a(a,c,b){switch(c){case "\x3d":return a===b;case "\x3c":return a<b;case "\x3e":return a>b;case "\x3c\x3d":return a<=b;case "\x3e\x3d":return a>=b}return!1}return c.compareInfos.length&&c.compareInfos.every(function(c){return a(b,c.operator,Number(c.value))})};d.styleFromSetters=function(b){if(!b)return null;var c={};b.forEach(function(a){f[a.property]&&
(c[f[a.property]]=a.value);"IsBold"===a.property&&(c.fontWeight="True"===a.value?"bold":"normal");"IsItalic"===a.property&&(c.fontStyle="True"===a.value?"italic":"normal");"IsUnderlined"===a.property&&(c.textDecoration="True"===a.value?"underline":"none")});k.ptToPxObj(c);return c};d.settersFromStyle=function(b){var c=[];b=k.pxToPtObj(b,!0);for(var a in b){var d=l[a],e=b[a];!d||"string"!==typeof e&&isNaN(e)||c.push({property:d,value:e});"fontWeight"===a?c.push({property:"IsBold",value:"bold"===e?
"True":"False"}):"fontStyle"===a?c.push({property:"IsItalic",value:"italic"===e?"True":"False"}):"textDecoration"===a&&c.push({property:"IsUnderlined",value:"underline"===e?"True":"False"})}return c};d.processImageJsonForTrigger=function(b,c,a){var g=d.getMatchedCase(c,a);g||a.cases.some(function(a){if("default"===a.compareInfos[0].value)return g=a,!0});g&&(b.fileName=g.setters[0].value)};d.getStatistics=function(b){var c=Infinity,a=-Infinity,d;b&&b.cases.some(function(b){b.compareInfos&&b.compareInfos.forEach(function(b){b=
Number(b.value);isNaN(b)||(c=Math.min(c,b),a=Math.max(a,b),d=!0)})});return d&&-1E12<c&&1E12>c&&-1E12<a&&1E12>a?{min:c,max:a}:null};return d});