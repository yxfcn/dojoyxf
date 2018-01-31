define(["require", "exports", "./gaodelayer", "esri/map"], function (require, exports, gaodelayer, Map) {
    "use strict";
    var map = new Map("map", {
        center: [116, 28],
        zoom: 5
    });
    var baselayer = new gaodelayer();
    map.addLayer(baselayer);
});
//# sourceMappingURL=main.js.map