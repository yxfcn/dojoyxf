// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/_CommandSupport","dojo/_base/declare dojo/_base/lang dojo/when ./commands/CreateHTMLCommand ./commands/CreatePDFCommand ./commands/CreateImageCommand ./commands/PrintReportCommand ./commands/CreatePlayerCommand ./commands/supportClasses/PlayerCommands ./supportClasses/GEUtil".split(" "),function(f,g,e,h,k,l,m,n,d,p){var c={};c[d.HTML]=h;c[d.PDF]=k;c[d.IMAGE]=l;c[d.PRINT]=m;c[d.DYNAMIC_HTML]=n;return f(null,{_commands:null,_commandIndex:0,
constructor:function(){this._commands={}},registerCommand:function(a,d,b){b=b||new c[a];if(!b.isBrowserSupported||b.isBrowserSupported())this._commands[a]||(this._commands[a]={index:this._commandIndex++,id:a,label:d||b.label,command:b})},getCommands:function(){var a=[],c=this._commands[d.PDF],b;for(b in this._commands)a.push(this._commands[b]);a.sort(function(a,b){return a.index-b.index});return(b=this._getCurrentContext())&&b.geoenrichmentUrl&&c?e(p.hasCapability(b.geoenrichmentUrl,"FormatInfographics"),
function(b){b||(a=a.filter(function(a){return a!==c}));return a}):e(a)},getCommandById:function(a){return this._commands[a]&&this._commands[a].command},executeCommand:function(a,c,b,d){b=g.mixin({printMapTaskUrl:this.printMapTaskUrl},b);return this._commands[a]&&this._commands[a].command&&this._commands[a].command.execute(c,b||{},d)}})});