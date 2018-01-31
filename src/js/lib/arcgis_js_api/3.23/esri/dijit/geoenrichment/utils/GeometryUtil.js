// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/GeometryUtil","dojo/_base/lang dojo/Deferred dojo/promise/all require esri/geometry/Polygon ./PolygonUtil ./GeometryUtil_base".split(" "),function(p,q,w,r,t,u,v){var e=p.mixin({},v);e.calculateMaxAllowableOffset=function(a,b){void 0===b&&(b=1);return a.extent.getWidth()/a.width*b};e.getNumberOfPoints=u.getNumberOfPoints;e.needGeneralizeGeometry=function(a,b,d,k){if(!a||!b)return!1;k=k||(d?d/10:1E3);d=d||1E4;Array.isArray(a)||(a=[a]);var f=0>b,h=0,l=Math.abs(b)/
100,g=0,m=0,n;a.forEach(function(c){c=c.geometry||c;if(!c.rings||!c.getExtent)return!1;var a=c.getExtent();if(a=a.getWidth()*a.getHeight())a=Math.sqrt(a),c=e.getNumberOfPoints(c),g+=c,m=Math.max(m,c),f&&(h=Math.max(h,a*l)),n||(n=f?g>d:c*b>4*a)});return n&&m>k?h||b:0};e.generalizeGeometry=function(a,b,d,k){if(!a||!b||0>b)return!1;d=d||1E3;Array.isArray(a)||(a=[a]);var f=[],h=[];a.map(function(a){var b=a.geometry||a;if(b!=a&&b.rings){a.geometry=new t;a.geometry.setSpatialReference(b.spatialReference);
var c=a.geometry.rings}c&&b.rings.forEach(function(a){c.push(a.slice())});e.getNumberOfPoints(b)>d&&(a=c||b.rings,f=f.concat(a),h.push({source:a,count:a.length}))});if(k&&window.Worker){var l=new q;a=r.toUrl("./GeometryUtil_worker.js");var g=new Worker(a);g.addEventListener("message",function(a){var b=a.data.rings;h.forEach(function(a){for(var c=a.source.length=0;c<a.count;c++)a.source.push(b.shift())});l.resolve();g.terminate()},!1);g.addEventListener("error",function(a){console.log(a);l.reject()},
!1);g.postMessage({rings:f,maxAllowableOffset:b});return l.promise}f.forEach(function(a){(new e.RingInfo(a)).generalize(b,.8)})};return e});