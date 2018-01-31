// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/sniff",["dojo/_base/window","dojo/sniff","../kernel"],function(f,a,n){function l(){if(d)return d;d={available:!1,version:0,supportsHighPrecisionFragment:!1};var a=function(a,b){for(var c=["webgl","experimental-webgl","webkit-3d","moz-webgl"],d=null,e=0;e<c.length;++e){try{d=a.getContext(c[e],b)}catch(t){}if(d)break}return d},c;try{if(!e.WebGLRenderingContext)throw 0;c=document.createElement("canvas")}catch(w){return d}var b=a(c,{failIfMajorPerformanceCaveat:!0});
!b&&(b=a(c))&&(d.majorPerformanceCaveat=!0);if(!b)return d;a=b.getParameter(b.VERSION);if(!a)return d;if(a=a.match(/^WebGL\s+([\d.]*)/))d.version=parseFloat(a[1]),d.available=.94<=d.version,a=b.getShaderPrecisionFormat(b.FRAGMENT_SHADER,b.HIGH_FLOAT),d.supportsHighPrecisionFragment=a&&0<a.precision,d.supportsVertexShaderSamplers=0<b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d.supportsElementIndexUint=null!=b.getExtension("OES_element_index_uint");return d}var b=a("ff"),h=a("ie"),p=void 0===h&&
7<=a("trident"),m=a("webkit"),k=a("opera"),q=a("chrome"),r=a("safari"),e=f.global;f=navigator.userAgent;var g;(g=f.match(/(iPhone|iPad|CPU)\s+OS\s+(\d+\_\d+)/i))&&a.add("esri-iphone",parseFloat(g[2].replace("_",".")));(g=f.match(/Android\s+(\d+\.\d+)/i))&&a.add("esri-android",parseFloat(g[1]));(g=f.match(/Fennec\/(\d+\.\d+)/i))&&a.add("esri-fennec",parseFloat(g[1]));0<=f.indexOf("BlackBerry")&&0<=f.indexOf("WebKit")&&a.add("esri-blackberry",1);a.add("esri-touch",a("esri-iphone")||a("esri-android")||
a("esri-blackberry")||6<=a("esri-fennec")||(b||m)&&e.document&&e.document.createTouch?!0:!1);(g=f.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i))&&a.add("esri-mobile",g);a.add("esri-pointer",navigator.pointerEnabled||navigator.msPointerEnabled);n._getDOMAccessor=function(a){var c="";b?c="Moz":m?c="Webkit":h?c="ms":k&&(c="O");return c+a.charAt(0).toUpperCase()+a.substr(1)};a.add("esri-phonegap",!!e.cordova);a.add("esri-cors",a("esri-phonegap")||"XMLHttpRequest"in e&&"withCredentials"in
new XMLHttpRequest);a.add("esri-canvas-svg-support",function(){return!(a("trident")||a("ie"))});a.add("esri-wasm","WebAssembly"in e);if(a("host-webworker"))return a;a.add("esri-workers","Worker"in e);a.add("esri-script-sandbox",function(){return"MessageChannel"in e&&"HTMLIFrameElement"in e&&"sandbox"in HTMLIFrameElement.prototype});a.add("esri-transforms",p||9<=h||3.5<=b||4<=q||3.1<=r||10.5<=k||3.2<=a("esri-iphone")||2.1<=a("esri-android"));a.add("esri-transitions",p||10<=h||4<=b||4<=q||3.1<=r||10.5<=
k||3.2<=a("esri-iphone")||2.1<=a("esri-android"));a.add("esri-transforms3d",p||10<=b||12<=q||4<=r||3.2<=a("esri-iphone")||3<=a("esri-android"));a.add("esri-url-encodes-apostrophe",function(){var a=e.document.createElement("a");a.href="?'";return-1<a.href.indexOf("?%27")});3>a("esri-android")&&(a.add("esri-transforms",!1,!1,!0),a.add("esri-transitions",!1,!1,!0),a.add("esri-transforms3d",!1,!1,!0));n._css=function(d){var c=a("esri-transforms3d");void 0!==d&&null!==d?c=d:c&&(q||r&&!a("esri-iphone"))&&
(c=!1);var e=c?"translate3d(":"translate(",f=c?q?",-1px)":",0px)":")",g=c?"scale3d(":"scale(",l=c?",1)":")",p=c?"rotate3d(0,0,1,":"rotate(",n=c?"matrix3d(":"matrix(",t=c?",0,0,":",",u=c?",0,0,0,0,1,0,":",",v=c?",0,1)":")";return{names:{transition:m&&"-webkit-transition"||b&&"MozTransition"||k&&"OTransition"||h&&"msTransition"||"transition",transform:m&&"-webkit-transform"||b&&"MozTransform"||k&&"OTransform"||h&&"msTransform"||"transform",transformName:m&&"-webkit-transform"||b&&"-moz-transform"||
k&&"-o-transform"||h&&"-ms-transform"||"transform",origin:m&&"-webkit-transform-origin"||b&&"MozTransformOrigin"||k&&"OTransformOrigin"||h&&"msTransformOrigin"||"transformOrigin",endEvent:m&&"webkitTransitionEnd"||b&&"transitionend"||k&&"oTransitionEnd"||h&&"MSTransitionEnd"||"transitionend"},translate:function(a,b){return e+a+"px,"+b+"px"+f},scale:function(a){return g+a+","+a+l},rotate:function(a){return p+a+"deg)"},matrix:function(a){return a.m?(a=a.m,n+a[0].toFixed(10)+","+a[1].toFixed(10)+t+a[2].toFixed(10)+
","+a[3].toFixed(10)+u+a[4].toFixed(10)+(b?"px,":",")+a[5].toFixed(10)+(b?"px":"")+v):n+a.xx.toFixed(10)+","+a.yx.toFixed(10)+t+a.xy.toFixed(10)+","+a.yy.toFixed(10)+u+a.dx.toFixed(10)+(b?"px,":",")+a.dy.toFixed(10)+(b?"px":"")+v},matrix3d:function(a){a=a.m;return"matrix3d("+a[0].toFixed(10)+","+a[1].toFixed(10)+",0,0,"+a[2].toFixed(10)+","+a[3].toFixed(10)+",0,0,0,0,1,0,"+a[4].toFixed(10)+","+a[5].toFixed(10)+",0,1)"},getScaleFromMatrix:function(a){if(!a)return 1;a=a.toLowerCase();var b=-1<a.indexOf("matrix3d")?
"matrix3d(":"matrix(";return Number(a.substring(b.length,a.indexOf(",")))}}};var d;a.add("esri-webgl",function(){return!!l().available});a.add("esri-webgl-high-precision-fragment",function(){return!!l().supportsHighPrecisionFragment});a.add("esri-webgl-vertex-shader-samplers",function(){return!!l().supportsVertexShaderSamplers});a.add("esri-webgl-element-index-uint",function(){return!!l().supportsElementIndexUint});a.add("esri-webgl-major-performance-caveat",function(){return!!l().majorPerformanceCaveat});
return a});