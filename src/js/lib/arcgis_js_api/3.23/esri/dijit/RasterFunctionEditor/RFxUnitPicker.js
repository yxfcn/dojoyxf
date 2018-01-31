// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/RasterFunctionEditor/templates/RFxUnitPicker.html":'\x3cdiv class\x3d"esriRFxBandCombinationEditor"\x3e\r\n  \x3ctable class\x3d"esriRFxArgsEditor__table"\x3e\r\n    \x3ctr class\x3d"esriRFxArgsEditor__tr--arg-name"\x3e\r\n      \x3ctd\x3e${_fromUnitName}\x3c/td\x3e\r\n    \x3c/tr\x3e\r\n    \x3ctr class\x3d"esriRFxArgsEditor__tr--arg-widget" \x3e\r\n      \x3ctd\x3e\r\n        \x3cdiv data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"fromUnitSelect" data-dojo-attach-event\x3d"onChange: onFromUnitChange"\r\n          data-dojo-attach-props\x3d"labelAttr: \'label\'"\x3e\x3c/div\x3e\r\n      \x3c/td\x3e\r\n    \x3c/tr\x3e\r\n    \x3ctr class\x3d"esriRFxArgsEditor__tr--arg-name"\x3e\r\n      \x3ctd\x3e${_toUnitName}\x3c/td\x3e\r\n    \x3c/tr\x3e\r\n    \x3ctr class\x3d"esriRFxArgsEditor__tr--arg-widget"\x3e\r\n      \x3ctd\x3e\r\n        \x3cdiv data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"toUnitSelect"\r\n          data-dojo-attach-props\x3d"labelAttr: \'label\'" data-dojo-attach-event\x3d"onChange: onToUnitChange"\x3e\x3c/div\x3e\r\n      \x3c/td\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/RasterFunctionEditor/RFxUnitPicker","dojo/_base/declare dojo/_base/lang dojo/has dojo/_base/array dojo/store/Memory dojo/data/ObjectStore dijit/form/Select dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin ../../kernel dojo/text!./templates/RFxUnitPicker.html dojo/i18n!../../nls/jsapi".split(" "),function(b,c,g,d,e,f,p,h,k,l,m,n,q){b=b("RFxUnitPicker",[h,k,l],{baseClass:"esriRFxUnitPicker",templateString:n,schemaArgDefinitions:{},inputArgs:{},rasterArgs:{},rasterFunctionSchema:null,
rasterFunctionEnums:null,distanceUnits:[],speedUnits:[],temperatureUnits:[],unitTypes:{speed:[100,101,102,103,104],temperature:[200,201,202],distance:[1,3,4,5,6,7,8,9,10,12]},constructor:function(a){this.inherited(arguments);c.mixin(this,a);this._readArgs()},postCreate:function(){this.inherited(arguments);this._setupFromUnitSelect();this._setupValues()},onFromUnitChange:function(a){var b,c;a=+a;d.some(Object.keys(this.unitTypes),function(c){if(0<=d.indexOf(this.unitTypes[c],a))return b=c,!0},this);
b&&(c=d.filter(this.unitsEnum,function(a){if(0<=d.indexOf(this.unitTypes[b],+a.key))return!0},this),this.toUnitSelect.set("store",new f(new e({data:c,idProperty:"key"}))));this.fromUnitArg&&(this.fromUnitArg.value=a)},onToUnitChange:function(a){this.toUnitArg&&(this.toUnitArg.value=+a)},_setupFromUnitSelect:function(){this.rasterFunctionEnums&&this.rasterFunctionEnums.esriUnitConversionFxUnitTypes&&(this.unitsEnum=this.rasterFunctionEnums.esriUnitConversionFxUnitTypes.map(function(a){return{key:String(a.key),
label:a.label}}),this.fromUnitSelect.set("store",new f(new e({data:this.unitsEnum,idProperty:"key"}))))},_readArgs:function(){if(this.inputArgs){var a=this.inputArgs;this.fromUnitArg=a&&a.FromUnit;this.toUnitArg=a&&a.ToUnit;this._fromUnitName=this.fromUnitArg&&this.fromUnitArg.name;this._toUnitName=this.toUnitArg&&this.toUnitArg.name}},_setupValues:function(){this.fromUnitArg&&this.fromUnitArg.value&&this.fromUnitSelect.set("value",String(this.fromUnitArg.value));this.toUnitArg&&this.toUnitArg.value&&
this.toUnitSelect.set("value",String(this.toUnitArg.value))}});g("extend-esri")&&c.setObject("dijit.RasterFunctionEditor.RFxUnitPicker",b,m);return b});