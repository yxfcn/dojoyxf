// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/StreamTrackManager","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../graphic ../geometry/Polyline ./TrackManager".split(" "),function(p,q,l,r,t,u,v,w){p=p([w],{declaredClass:"esri.layers._StreamTrackManager",constructor:function(a){this.inherited(arguments)},initialize:function(a){this.inherited(arguments)},addFeatures:function(a,e){function f(b,d){var a,f,c,k;g[b]||(g[b]=[]);a=g[b];0<h&&(d.length>h&&d.splice(0,d.length-h),c=d.length+a.length,c>h&&(f=
a.splice(0,c-h)));c=d.length;for(k=0;k<c;k+=1)a.push(d[k]);return{deletes:f,adds:d}}var g,b,k,h,c={},d={},n;if(e)return this.inherited(arguments),c;g=this.trackMap;b=this.layer;k=b._trackIdField;h=b.maximumTrackPoints||0;l.forEach(a,function(b){var a=b.attributes[k];b.visible&&(d[a]||(d[a]=[]),d[a].push(b))});for(n in d)d.hasOwnProperty(n)&&(b=f(n,d[n]),c[n]=b);return c},removeFeatures:function(a){var e=[],f=this.layer.objectIdField,g=this.layer._trackIdField;a&&(l.forEach(a,function(b){var a,h,c,
d;h=b.attributes[g];a=b.attributes[f];if(c=this.trackMap[h])for(b=0;b<c.length;b+=1)if(d=c[b],d.attributes[f]===a){this.trackMap[h].splice(b,1);-1===l.indexOf(h)&&e.push(h);break}},this),0<a.length&&this.refreshTracks(e))},drawTracks:function(a){function e(a){var c=b[a],d=c&&1<c.length,e,l,m;(m=f.trackLineMap[a])&&!d&&(g.remove(m),delete f.trackLineMap[a],m=null);if(!d)return!1;d=[];for(e=c.length-1;0<=e;--e)(l=c[e].geometry)&&d.push([l.x,l.y]);c={};c[h]=a;1<d.length&&(m?(a=m.geometry,a.removePath(0),
a.addPath(d),m.setGeometry(a)):(m=new u(new v({paths:[d],spatialReference:k}),null,c),g.add(m),f.trackLineMap[a]=m))}var f=this,g=this.container,b,k,h,c;if(g)if(b=this.trackMap,k=this.map.spatialReference,h=this.layer._trackIdField,a)l.forEach(a,function(a){e(a)});else for(c in b)b.hasOwnProperty(c)&&e(c)},refreshTracks:function(a){function e(a){var b,c;a=f[a]||[];b=a.length;for(c=0;c<b;c++)g._repaint(a[c],null,!0)}var f=this.trackMap,g=this.layer;g._getRenderer();var b;this.drawTracks(a);if(a)l.forEach(a,
function(a){e(a)});else for(b in f)f.hasOwnProperty(b)&&e(b)},getLatestObservations:function(){var a,e,f=this.trackMap,g=[];for(a in f)f.hasOwnProperty(a)&&(e=f[a],g.push(e[e.length-1]));return g},destroy:function(){this.inherited(arguments);this.trackLineMap=null}});r("extend-esri")&&q.setObject("layers._StreamTrackManager",p,t);return p});