// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/DefaultStyles",["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil"],function(g,h,k){return g(null,{_styles:null,_stylesArray:null,constructor:function(a){this._styles={Default:{color:"#4C4C4C",backgroundColor:"#FFFFFF"}};h.mixin(this._styles,a);this._stylesArray=[];for(var b in this._styles)this._stylesArray.push(b)},getStyle:function(a){return this._styles[a]},getStylesArray:function(){return this._stylesArray},
tryApplyStyle:function(a,b,e){if(b=this.getStyle(b))for(var c in b)e&&void 0!==a[c]||(a[c]=b[c])},findDefaultStyle:function(a){var b,e=this;this.getStylesArray().some(function(c){var f=e.getStyle(c),d;for(d in f)if(!a[d]||!k.compareColors(a[d],f[d]))return!1;b=c;return!0});return b}})});