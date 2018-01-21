define(["require", "exports", "esri/geometry/Extent", "esri/layers/TileInfo", "esri/SpatialReference", "dojo/_base/declare"], function (require, exports, Extent, TileInfo, SpatialReference, declare) {
    "use strict";
    /**----------定义一些常量------ */
    //----------------天地图相关---------------//
    //天地图GCS2000坐标系
    var TDTSR = new SpatialReference({ wkid: 4490 });
    //天地图切片信息
    var TDT_TILEINFO = new TileInfo({
        "dpi": 96,
        "compressionQuality": 0,
        "spatialReference": TDTSR,
        "rows": 256,
        "cols": 256,
        "origin": {
            "x": -180,
            "y": 90
        },
        "lods": [
            { "level": 0, "resolution": 1.40625, "scale": 590995197.14166909755553014475 },
            { "level": 1, "resolution": 0.703125, "scale": 295497598.57083454877776507238 },
            { "level": 2, "resolution": 0.3515625, "scale": 147748799.28541727438888253619 },
            { "level": 3, "resolution": 0.17578125, "scale": 73874399.642708637194441268094 },
            { "level": 4, "resolution": 0.087890625, "scale": 36937199.821354318597220634047 },
            { "level": 5, "resolution": 0.0439453125, "scale": 18468599.910677159298610317023 },
            { "level": 6, "resolution": 0.02197265625, "scale": 9234299.955338579649305158512 },
            { "level": 7, "resolution": 0.010986328125, "scale": 4617149.9776692898246525792559 },
            { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9888346449123262896279 },
            { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.494417322456163144814 },
            { "level": 10, "resolution": 0.001373291015625, "scale": 577143.74720866122808157240698 },
            { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.87360433061404078620349 },
            { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93680216530702039310175 },
            { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.968401082653510196550873 },
            { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.484200541326755098275436 },
            { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.742100270663377549137718 },
            { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.871050135331688774568859 },
            { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9355250676658443872844296 },
            { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677625338329221936422148 },
            { "level": 19, "resolution": 0.000002682209014892578125, "scale": 1127.2338812669164610968211074 },
            { "level": 20, "resolution": 0.0000013411045074462890625, "scale": 563.61694063345823054841055369 }
        ]
    });
    //天地图范围
    var TDT_EXTENT = new Extent(-180.0, -90.0, 180.0, 90.0, TDTSR);
    //天地图服务器地址
    var TDT_SUBDOMAINS = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
    //天地图电子地图模板
    var TDT_URLPATTERN_VEC = "http://${subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
    //天地图卫星影像地图模块
    var TDT_URLPATTERN_IMG = "http://${subDomain}.tianditu.com/img_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
    var TDT_URLPATTERN_CVA = "http://${subDomain}.tianditu.com/cva_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cva&STYLE="
        + "default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
    //天地图电子地图图层组件初始化
    var options = {
        "fullExtent": TDT_EXTENT,
        "initialExtent": TDT_EXTENT,
        "subDomains": TDT_SUBDOMAINS,
        "tileInfo": TDT_TILEINFO
    };
    var tdt_vec_options = {
        "fullExtent": TDT_EXTENT,
        "initialExtent": TDT_EXTENT,
        "subDomains": TDT_SUBDOMAINS,
        "tileInfo": TDT_TILEINFO,
        "id": "vec"
    };
    var tdt_img_options = {
        "fullExtent": TDT_EXTENT,
        "initialExtent": TDT_EXTENT,
        "subDomains": TDT_SUBDOMAINS,
        "tileInfo": TDT_TILEINFO,
        "id": "img"
    };
    var tdt_cva_options = {
        "fullExtent": TDT_EXTENT,
        "initialExtent": TDT_EXTENT,
        "subDomains": TDT_SUBDOMAINS,
        "tileInfo": TDT_TILEINFO,
        "id": "cva"
    };
    //天地图_电子地图
    //var tdt_vec_layer = new WebTiledLayer(TDT_URLPATTERN_VEC, tdt_vec_options);
    //var tdt_img_layer = new WebTiledLayer(TDT_URLPATTERN_IMG, tdt_img_options);
    var TDTOptions = declare("TDTOptions", null, {
        //属性
        //layerType:String,
        vec_pattern: String,
        img_pattern: String,
        cva_pattern: String,
        spatialReference: SpatialReference,
        TileInfo: TileInfo,
        initialExtent: Extent,
        fullExtent: Extent,
        subDomains: [],
        tdt_options: Object,
        constructor: function () {
            this.vec_pattern = TDT_URLPATTERN_VEC;
            this.img_pattern = TDT_URLPATTERN_IMG;
            this.cva_pattern = TDT_URLPATTERN_CVA;
            this.spatialReference = TDTSR;
            this.tileInfo = TDT_TILEINFO;
            this.initialExtent = TDT_EXTENT;
            this.fullExtent = TDT_EXTENT;
            this.subDomains = TDT_SUBDOMAINS;
            this.tdt_options = {
                "fullExtent": this.fullExtent,
                "initialExtent": this.initialExtent,
                "subDomains": this.subDomains,
                "tileInfo": this.tileInfo
            };
            return this.tdt_options;
        }
    });
    return TDTOptions;
});
//# sourceMappingURL=TDTOptions.js.map