// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/webgl/BufferObject",["require","exports"],function(l,m){return function(){function a(b,c,d,e,k){this._glName=this._context=null;this._bufferType=void 0;this._usage=35044;this._size=-1;this._indexType=void 0;this._context=b;this._bufferType=c;this._usage=d;this._id=a._nextId++;this._glName=this._context.gl.createBuffer();e&&this.setData(e,k)}a.createIndex=function(b,c,d,e){return new a(b,34963,c,d,e)};a.createVertex=function(b,c,d){return new a(b,34962,c,d)};Object.defineProperty(a.prototype,
"id",{get:function(){return this._id},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"size",{get:function(){return this._size},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"usage",{get:function(){return this._usage},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"bufferType",{get:function(){return this._bufferType},enumerable:!0,
configurable:!0});Object.defineProperty(a.prototype,"indexType",{get:function(){return this._indexType},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"byteSize",{get:function(){return 34962===this._bufferType?this._size:5125===this._indexType?4*this._size:2*this._size},enumerable:!0,configurable:!0});a.prototype.dispose=function(){this._context&&(this._glName&&(this._context.gl.deleteBuffer(this._glName),this._glName=null),this._context=null)};a.prototype.setData=function(b,c){if(b){if("number"===
typeof b){if(0>b&&console.error("Buffer size cannot be negative!"),34963===this._bufferType&&c)switch(this._indexType=c,this._size=b,c){case 5123:b*=2;break;case 5125:b*=4}}else{var a=b.byteLength;b instanceof Uint16Array&&(a/=2,this._indexType=5123);b instanceof Uint32Array&&(a/=4,this._indexType=5125);this._size=a}a=this._context.getBoundVAO();this._context.bindVAO(null);this._context.bindBuffer(this);this._context.gl.bufferData(this._bufferType,b,this._usage);this._context.bindVAO(a)}};a.prototype.setSubData=
function(b,a,d,e){void 0===a&&(a=0);void 0===d&&(d=0);if(b){(0>a||a>=this._size)&&console.error("offset is out of range!");var c=a,f=d,g=e,h=b.byteLength;b instanceof Uint16Array&&(h/=2,c*=2,f*=2,g*=2);b instanceof Uint32Array&&(h/=4,c*=4,f*=4,g*=4);void 0===e&&(e=h-1);d>=e&&console.error("end must be bigger than start!");a+d-e>this._size&&console.error("An attempt to write beyond the end of the buffer!");a=this._context.getBoundVAO();this._context.bindVAO(null);this._context.bindBuffer(this);this._context.gl.bufferSubData(this._bufferType,
c,(b instanceof ArrayBuffer?b:b.buffer).slice(f,g));this._context.bindVAO(a)}};a._nextId=0;return a}()});