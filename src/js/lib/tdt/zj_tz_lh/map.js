/**
 *   version: openlayers2.13
 */
function ZJCHMap(config) {
    var arglength = arguments.length;
    for (var i = 0; i < arglength; i++) {
        var args = arguments[i];
        for (var arg in args) {
            if (this[arg] != null && this[arg] != undefined) {
                this[arg] = args[arg];
            }
        }
    }
    this.createMap(this.mapdiv);
    //电子地图图层
    this.emapLayers = [];
    //电子地图注记图层
    this.emapAnnoLayers = [];
//电子影像地图图层
    this.imgmapLayers = [];
//电子影像地图注记图层
    this.imgmapAnnoLayers = [];
//电子地图晕渲图层
    this.imgmapYXLayers = [];
// 电子地图无注记图层
    this.imgmapWZJLayers = [];
    this.maptype = '矢量';
    this.gray=false;
    this.isLoadCountryLayers=false;


}
ZJCHMap.prototype.hdmap = "false";
ZJCHMap.prototype.map = null;
ZJCHMap.prototype.baseLayersIndex = 0;
ZJCHMap.prototype.mapdiv = '';
ZJCHMap.prototype.isPanZoomBar = true;
ZJCHMap.prototype.isNavigation = true;
ZJCHMap.prototype.isMousePosition = true;

ZJCHMap.prototype.markerVector = null;
ZJCHMap.prototype.pointMarkerVector = null;

ZJCHMap.prototype.CircleLayer = null;

ZJCHMap.prototype.popupFeatureId = 'marker_feature';

//路径规划图层
ZJCHMap.prototype.routeLayer = null;

// 境界线
ZJCHMap.prototype.boundary = null;


ZJCHMap.prototype.startEndPoint = null;
ZJCHMap.prototype.thisPopupPoint = null;

// 测量距离
ZJCHMap.prototype.distanceTool = null;
ZJCHMap.prototype.distanceButton = false;
// 测量面积
ZJCHMap.prototype.areaTool = null;
ZJCHMap.prototype.areaButton = false;
ZJCHMap.prototype.projCoordinate=
    {'SRID': 4490,
        'X': {'lb': -180,'ub': 180,'tol': 0.0000005},
        'Y': {'lb': -90,'ub': 90,'tol': 0.0000005},
        'units':'degrees',
        'center':{'lon':120.51673103747,'lat':29.177827299576,'level':7},
        'maxLevels':12,
        'numZoomLevels':21,
        'maxResolution':1.40625,
        'topLeftCorner':{lon:-180,lat:90},
        'mapType':'矢量',
        initBounds:{
            left:116.28774491829,
            bottom:26.763620659367,
            right:124.74571715665,
            top:31.592033939785
        }
    };
ZJCHMap.prototype.mapScales = [590995197.14166915, 295497598.57083458, 147748799.28541729, 73874399.642708644, 36937199.821354322, 18468599.910677161, 9234299.9553385805, 4617149.9776692903, 2308574.9888346451, 1154287.4944173226, 577143.74720866128, 288571.87360433064, 144285.93680216532, 72142.96840108266, 36071.48420054133, 18035.742100270665, 9017.8710501353326, 4508.9355250676663, 2254.4677625338331, 1128.4994333441377, 564.2497166720689];
ZJCHMap.prototype.mapResolutions = [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625, 0.000010728836059570312, 0.000005364418029785156, 0.000002682209014892578, 0.000001341104507446289];
ZJCHMap.prototype.chinaLayers = [
    //天地图电子地图图层
    {
        "url": ["http://t0.tianditu.cn/vec_c/wmts", "http://t1.tianditu.cn/vec_c/wmts", "http://t2.tianditu.cn/vec_c/wmts", "http://t3.tianditu.cn/vec_c/wmts",
            "http://t4.tianditu.cn/vec_c/wmts", "http://t5.tianditu.cn/vec_c/wmts", "http://t6.tianditu.cn/vec_c/wmts", "http://t7.tianditu.cn/vec_c/wmts"],
        "layer": "vec", "matrixSet": "c", "left": -180, "bottom": -90, "right": 180, "top": 90, "style": "default", "format": "tiles",
        "transitionEffect": "null", "baseLayer": true,
        "minLevel": 2, "maxLevel": 18,//国家电子地图和影像地图都到18级
        uncoverzones: [
            [118.937994311, 28.0104675812, 121.98890735, 30.2602971665],
            [121.988907057, 29.6766692709, 122.988914436, 30.8233178357],
            [119.494661299, 30.2602971665, 121.150913435, 30.7515053914],
            [121.98890735, 28.6766763632, 122.488899403, 29.6766692709],
            [118.937994311, 27.7129276876, 121.491297014, 28.0104675812],
            [118.492382728, 28.3957687107, 118.937994311, 29.5114269545],
            [121.150913435, 30.2602971665, 121.988907109, 30.6737723837],
            [119.715612984, 27.4562562723, 121.491297014, 27.7129276876],
            [119.584561488, 30.7515053914, 120.339056706, 30.9195613664],
            [119.642907716, 30.9195613664, 119.961596036, 31.0652671972],
            [120.718664089, 30.7515053914, 120.974236139, 30.9548936528],
            [120.563696945, 30.7515053914, 120.718664089, 30.8281668691]


        ],
        minUncoverlevel: 6,
        maxUncoverlevel: 17,
        isuncoverenable: true,
        "isAnnoLayer": false
    } ,
    //天地图电子地图注记图层
    {
        "url": ["http://t0.tianditu.cn/cva_c/wmts", "http://t1.tianditu.cn/cva_c/wmts", "http://t2.tianditu.cn/cva_c/wmts", "http://t3.tianditu.cn/cva_c/wmts",
            "http://t4.tianditu.cn/cva_c/wmts", "http://t5.tianditu.cn/cva_c/wmts", "http://t6.tianditu.cn/cva_c/wmts", "http://t7.tianditu.cn/cva_c/wmts"],
        "layer": "cva", "matrixSet": "c", "left": -180, "bottom": -90, "right": 180, "top": 90, "style": "default", "format": "tiles",
        "transitionEffect": "null", "baseLayer": false,
        "minLevel": 2, "maxLevel": 18,
        uncoverzones: [
            [118.937994311, 28.0104675812, 121.98890735, 30.2602971665],
            [121.988907057, 29.6766692709, 122.988914436, 30.8233178357],
            [119.494661299, 30.2602971665, 121.150913435, 30.7515053914],
            [121.98890735, 28.6766763632, 122.488899403, 29.6766692709],
            [118.937994311, 27.7129276876, 121.491297014, 28.0104675812],
            [118.492382728, 28.3957687107, 118.937994311, 29.5114269545],
            [121.150913435, 30.2602971665, 121.988907109, 30.6737723837],
            [119.715612984, 27.4562562723, 121.491297014, 27.7129276876],
            [119.584561488, 30.7515053914, 120.339056706, 30.9195613664],
            [119.642907716, 30.9195613664, 119.961596036, 31.0652671972],
            [120.718664089, 30.7515053914, 120.974236139, 30.9548936528],
            [120.563696945, 30.7515053914, 120.718664089, 30.8281668691]


        ],
        minUncoverlevel: 6,
        maxUncoverlevel: 17,
        isuncoverenable: true,
        "isAnnoLayer": true

    }
];
ZJCHMap.prototype.chinaimgLayers = [
    {"url": ["http://t0.tianditu.cn/img_c/wmts", "http://t1.tianditu.cn/img_c/wmts", "http://t2.tianditu.cn/img_c/wmts", "http://t3.tianditu.cn/img_c/wmts",
        "http://t4.tianditu.cn/img_c/wmts", "http://t5.tianditu.cn/img_c/wmts", "http://t6.tianditu.cn/img_c/wmts", "http://t7.tianditu.cn/img_c/wmts"],
        "layer": "img", "matrixSet": "c", "left": -180, "bottom": -90, "right": 180, "top": 90, "style": "default", "format": "tiles",
        "transitionEffect": "null", "baseLayer": true,
        "minLevel": 2, "maxLevel": 18,
        uncoverzones: [
            [118.937994311, 28.0104675812, 121.98890735, 30.2602971665],
            [121.988907057, 29.6766692709, 122.988914436, 30.8233178357],
            [119.494661299, 30.2602971665, 121.150913435, 30.7515053914],
            [121.98890735, 28.6766763632, 122.488899403, 29.6766692709],
            [118.937994311, 27.7129276876, 121.491297014, 28.0104675812],
            [118.492382728, 28.3957687107, 118.937994311, 29.5114269545],
            [121.150913435, 30.2602971665, 121.988907109, 30.6737723837],
            [119.715612984, 27.4562562723, 121.491297014, 27.7129276876],
            [119.584561488, 30.7515053914, 120.339056706, 30.9195613664],
            [119.642907716, 30.9195613664, 119.961596036, 31.0652671972],
            [120.718664089, 30.7515053914, 120.974236139, 30.9548936528],
            [120.563696945, 30.7515053914, 120.718664089, 30.8281668691]


        ],
        minUncoverlevel: 6,
        maxUncoverlevel: 18,
        isuncoverenable: true,
        "isAnnoLayer": false
    },
    {"url": ["http://t0.tianditu.cn/cia_c/wmts", "http://t1.tianditu.cn/cia_c/wmts", "http://t2.tianditu.cn/cia_c/wmts", "http://t3.tianditu.cn/cia_c/wmts",
        "http://t4.tianditu.cn/cia_c/wmts", "http://t5.tianditu.cn/cia_c/wmts", "http://t6.tianditu.cn/cia_c/wmts", "http://t7.tianditu.cn/cia_c/wmts"],
        "layer": "cia", "matrixSet": "c", "left": -180, "bottom": -90, "right": 180, "top": 90, "style": "default", "format": "tiles",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 2, "maxLevel": 18,
        uncoverzones: [
            [118.937994311, 28.0104675812, 121.98890735, 30.2602971665],
            [121.988907057, 29.6766692709, 122.988914436, 30.8233178357],
            [119.494661299, 30.2602971665, 121.150913435, 30.7515053914],
            [121.98890735, 28.6766763632, 122.488899403, 29.6766692709],
            [118.937994311, 27.7129276876, 121.491297014, 28.0104675812],
            [118.492382728, 28.3957687107, 118.937994311, 29.5114269545],
            [121.150913435, 30.2602971665, 121.988907109, 30.6737723837],
            [119.715612984, 27.4562562723, 121.491297014, 27.7129276876],
            [119.584561488, 30.7515053914, 120.339056706, 30.9195613664],
            [119.642907716, 30.9195613664, 119.961596036, 31.0652671972],
            [120.718664089, 30.7515053914, 120.974236139, 30.9548936528],
            [120.563696945, 30.7515053914, 120.718664089, 30.8281668691]


        ],
        minUncoverlevel: 6,
        maxUncoverlevel: 18,
        isuncoverenable: true,
        "isAnnoLayer": true
    }
];

ZJCHMap.prototype.zjLayers = [       //  省平台地图地址
    {
        "url":($.getUrlParam("hdmap") == "true" )?["http://42.121.35.57:8084/services/wmts/zjemap_gq"]:
            ["http://ditu.zj.cn/services/wmts/zjemap"],
        "layer": "UNTMZJEMAP", "matrixSet": "nativeTileMatrixSet", "left": 118.011423101, "bottom": 26.9898544658, "right": 123.26242799, "top": 31.1926840974, "style": "default", "format": "image/png",
        "transitionEffect": "null", "baseLayer": false,
        "minLevel": 8, "maxLevel": 18,
        "isAnnoLayer": false
    }
];


ZJCHMap.prototype.zjimgLayers = [       // 省平台影像地址
    {
        "url": ["http://ditu.zj.cn/services/wmts/imgmap"], // 影像地图无注记
        "layer": "ZJSZF_IMG", "matrixSet": "nativeTileMatrixSet", "left": 118.011423101, "bottom": 26.9898544658, "right": 123.26242799, "top": 31.1926840974, "style": "default", "format": "image/png",
        "transitionEffect": "null", "baseLayer": false,
        "minLevel": 8, "maxLevel": 18,
        "isAnnoLayer": false
    },
    {
        "url": ["http://ditu.zj.cn/services/wmts/imgmap_lab"], // 包含注记
        "layer": "ZJSZF_IMGZT", "matrixSet": "nativeTileMatrixSet", "left": 118.011423101, "bottom": 26.9898544658, "right": 123.26242799, "top": 31.1926840974, "style": "default", "format": "image/png",
        "transitionEffect": "null", "baseLayer": false,
        "minLevel": 8, "maxLevel": 18,
        "isAnnoLayer": true
    }
];

ZJCHMap.prototype.zjimgLayers_ZJSZF_IMG = [       // 省平台影像地址 无注记
    {
        "url": ["http://ditu.zj.cn:8088/zjditu/rest/services/ZJSZF_IMG/Mapserver/WMTS"],
        "layer": "ZJSZF_IMG", "matrixSet": "nativeTileMatrixSet", "left": 118.011423101, "bottom": 26.9898544658, "right": 123.26242799, "top": 31.1926840974, "style": "default", "format": "image/png",
        "transitionEffect": "null", "baseLayer": false,
        "minLevel": 8, "maxLevel": 18,
        "isAnnoLayer": false
    }
];

/**
 * Created by zkx on 2016/10/11.
 */

ZJCHMap.prototype.countyLayers = [
    //杭州
    {
        "url":"http://www.hangzhoumap.gov.cn/Tile/WMTS/hztdtvector.gis",
        "layer":"zjemap","matrixSet":"hztdtvector","left":119.907,"bottom":30.147,"right":120.398,"top":30.449,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hangzhoumap.gov.cn/Tile/WMTS/hztdtmark.gis",
        "layer":"zjemap","matrixSet":"hztdtmark","left":119.907,"bottom":30.147,"right":120.398,"top":30.449,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //余姚
    {
        "url":"http://www.nbmap.gov.cn/wmts/yuyaomap","layer":"0","matrixSet":"jsvector","left":120.8785242,"bottom":29.66298688,"right":121.42030634,"top":30.3238531,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.nbmap.gov.cn/wmts/yuyaomapanno","layer":"0","matrixSet":"jsvector","left":120.8785242,"bottom":29.66298688,"right":121.42030634,"top":30.3238531,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //宁波
    {
        "url":"http://60.190.2.120/wmts/nbmapall","layer":"宁波电子地图","matrixSet":"nbmap","left":120.88037781,"bottom":28.85637165,"right":122.27490212,"top":30.36922722,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    //温州
    {
        "url":"http://www.go577.com/iserver/services/wzmap/wmts","layer":"wzmap","matrixSet":"custom_wzmap","left":120.446,"bottom":27.300,"right":121.121,"top":28.346,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.go577.com/iserver/services/poi/wmts","layer":"poi","matrixSet":"custom_poi","left":120.446,"bottom":27.300,"right":121.121,"top":28.346,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //嘉兴
    {
        "url":"http://220.191.220.71/JXEMAP/service/wmts",
        "layer":"JXEMAP","matrixSet":"TileMatrixSet0","left":120.560,"bottom":30.559,"right":120.987,"top":30.847,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://220.191.220.90/JXEMAPANNO/service/wmts","layer":"JXEMAPANNO","matrixSet":"TileMatrixSet0","left":120.560,"bottom":30.559,"right":120.987,"top":30.847,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //平湖
    {
        "url":"http://map.pinghu.gov.cn/geoservices/PHEMAP/service/wmts","layer":"phemap","matrixSet":"TileMatrixSet0","left":120.94613864,"bottom":30.49445271,"right":121.33567304,"top":30.85894075,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.pinghu.gov.cn/geoservices/PHEMAPANNO/service/wmts","layer":"phemapanno","matrixSet":"TileMatrixSet0","left":120.94613864,"bottom":30.49445271,"right":121.33567304,"top":30.85894075,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    }
    ,
    //嘉善
    {
        "url":"http://map.jiashan.gov.cn/jsemap/service/wmts","layer":"jsemap","matrixSet":"TileMatrixSet0","left":120.74140764,"bottom":30.76121486,"right":121.03377233,"top":31.03235917,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.jiashan.gov.cn/jsemapanno/service/wmts","layer":"jsemapanno","matrixSet":"TileMatrixSet0","left":120.74140764,"bottom":30.76121486,"right":121.03377233,"top":31.03235917,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //湖州
    {
        "url":"http://www.zjditu.cn:88/HUZEMAP/wmts.asmx/wmts","layer":"HUZEMAP","matrixSet":"TileMatrixSet0","left":119.636,"bottom":30.729,"right":120.287,"top":30.952,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/HUZEMAPANNO/wmts.asmx/wmts","layer":"HUZEMAPANNO","matrixSet":"TileMatrixSet0","left":119.636,"bottom":30.729,"right":120.287,"top":30.952,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //长兴
    {
        "url":"http://www.hzmaps.com/ogcservice/CXEMAP/service/wmts","layer":"CXEMAP","matrixSet":"TileMatrixSet0","left":119.54800554,"bottom":30.72063245,"right":120.10148442,"top":31.18247145,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hzmaps.com/ogcservice/CXEMAPANNO/service/wmts","layer":"CXEMAPANNO","matrixSet":"TileMatrixSet0","left":119.54800554,"bottom":30.72063245,"right":120.10148442,"top":31.18247145,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //绍兴
    {
        "url":"http://srv.tianditusx.cn/SXEMAP_1/wmts.asmx/WMTS","layer":"SXEMAP","matrixSet":"TileMatrixSet0","left":120.282,"bottom":29.833,"right":120.934,"top":30.284,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/SXEMAPANNO_1/wmts.asmx/WMTS","layer":"SXEMAPANNO","matrixSet":"TileMatrixSet0","left":120.282,"bottom":29.833,"right":120.934,"top":30.284,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //诸暨
    {
        "url":"http://srv.tianditusx.cn/ZHUJEMAP/wmts.asmx/wmts","layer":"ZHUJEMAP","matrixSet":"TileMatrixSet0","left":119.88406281,"bottom":29.35723593,"right":120.53636056,"top":29.98482175,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/ZHUJEMAPANNO/wmts.asmx/wmts","layer":"ZHUJEMAPANNO","matrixSet":"TileMatrixSet0","left":119.88406281,"bottom":29.35723593,"right":120.53636056,"top":29.98482175,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //嵊州
    {
        "url":"http://srv.tianditusx.cn/SZEMAP/wmts.asmx/wmts","layer":"SZEMAP","matrixSet":"TileMatrixSet0","left":120.46380062,"bottom":29.32490184,"right":121.11600389,"top":29.83225084,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/SZEMAPANNO/wmts.asmx/wmts","layer":"SZEMAPANNO","matrixSet":"TileMatrixSet0","left":120.46380062,"bottom":29.32490184,"right":121.11600389,"top":29.83225084,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //衢州
    {
        "url":"http://www.qz-map.com/geoservices/qzemap_1/service/wmts","layer":"QZEMAP","matrixSet":"TileMatrixSet0","left":118.375,"bottom":28.781,"right":119.235,"top":29.196,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/qzemapanno_1/service/wmts","layer":"QZEMAPANNO","matrixSet":"TileMatrixSet0","left":118.375,"bottom":28.781,"right":119.235,"top":29.196,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //常山
    {
        "url":"http://www.qz-map.com/geoservices/CSEMAP/service/wmts","layer":"CSEMAP","matrixSet":"TileMatrixSet0","left":118.25190476,"bottom":28.76944207,"right":118.75880822,"top":29.21653911,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/CSEMAPANNO/service/wmts","layer":"CSEMAPANNO","matrixSet":"TileMatrixSet0","left":118.25190476,"bottom":28.76944207,"right":118.75880822,"top":29.21653911,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //开化
    {
        "url":"http://www.qz-map.com/geoservices/KHEMAP/service/wmts","layer":"KHEMAP","matrixSet":"TileMatrixSet0","left":118.02252465,"bottom":28.90508445,"right":118.63205651,"top":29.50025031,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/KHEMAPANNO/service/wmts","layer":"KHEMAPANNO","matrixSet":"TileMatrixSet0","left":118.02252465,"bottom":28.90508445,"right":118.63205651,"top":29.50025031,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //龙游
    {
        "url":"http://www.qz-map.com/geoservices/LYEMAP/service/wmts","layer":"LYEMAP","matrixSet":"TileMatrixSet0","left":119.0295241,"bottom":28.73624287,"right":119.34189545,"top":29.29785673,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/LYEMAPANNO/service/wmts","layer":"LYEMAPANNO","matrixSet":"TileMatrixSet0","left":119.0295241,"bottom":28.73624287,"right":119.34189545,"top":29.29785673,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //舟山
    {
        "url":"http://www.zsch.gov.cn/ogcservice/zsemap_201501/service/wmts","layer":"zsemap","matrixSet":"TileMatrixSet0","left":121.912,"bottom":29.899,"right":122.618,"top":30.360,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zsch.gov.cn/ogcservice/zsemapanno_201501/service/wmts","layer":"zsemapanno","matrixSet":"TileMatrixSet0","left":121.912,"bottom":29.899,"right":122.618,"top":30.360,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //台州
    {
        "url":"http://tmap.tzsjs.gov.cn/services/wmts/chinaemap","layer":"chinaemap","matrixSet":"esritilematirx","left":121.014,"bottom":28.236,"right":122.000,"top":29.167,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    //三门
    {
        "url":"http://tdt.sanmen.gov.cn/services/wmts/smemap","layer":"smemap","matrixSet":"esritilematirx","left":121.20179764,"bottom":28.83843207,"right":121.80453192,"top":29.20310078,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://tdt.sanmen.gov.cn/services/wmts/smemapanno","layer":"smemapanno","matrixSet":"esritilematirx","left":121.20179764,"bottom":28.83843207,"right":121.80453192,"top":29.20310078,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //临海
    {
        "url":"http://tmap.linhai.gov.cn/services/wmts/lhemap","layer":"lhemap","matrixSet":"esritilematirx","left":120.822,"bottom":28.688,"right":121.935,"top":29.067,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://tmap.linhai.gov.cn/services/wmts/lhemapanno","layer":"lhemapanno","matrixSet":"esritilematirx","left":120.822,"bottom":28.688,"right":121.935,"top":29.067,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //丽水
    {
        "url":"http://www.zjditu.cn:88/LSEMAP/wmts.asmx/WMTS","layer":"LSEMAP","matrixSet":"TileMatrixSet0","left":119.798,"bottom":28.000,"right":120.303,"top":29.648,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/LSEMAPANNO/wmts.asmx/WMTS","layer":"LSEMAPANNO","matrixSet":"TileMatrixSet0","left":119.798,"bottom":28.000,"right":120.303,"top":29.648,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //德清
    {
        "url":"http://www.zjditu.cn:88/DQEMAP/wmts.asmx/wmts","layer":"DQEMAP","matrixSet":"TileMatrixSet0","left":119.811,"bottom":30.473,"right":120.290,"top":30.614,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/DQEMAPANNO/wmts.asmx/wmts","layer":"DQEMAPANNO","matrixSet":"TileMatrixSet0","left":119.811,"bottom":30.473,"right":120.290,"top":30.614,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //新昌
    {
        "url":"http://srv.tianditusx.cn/XCEMAP/wmts.asmx/WMTS","layer":"XCEMAP","matrixSet":"TileMatrixSet0","left":120.69370754,"bottom":29.22631923,"right":121.22699856,"top":29.55999888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/XCEMAPANNO/wmts.asmx/WMTS","layer":"XCEMAPANNO","matrixSet":"TileMatrixSet0","left":120.69370754,"bottom":29.22631923,"right":121.22699856,"top":29.55999888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //乐清
    {
        "url":"http://map.yueqing.gov.cn:88/YQEMAP/wmts.asmx/wmts","layer":"YQEMAP","matrixSet":"TileMatrixSet0","left":120.889,"bottom":28.073,"right":120.996,"top":28.161,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.yueqing.gov.cn:88/YQEMAPANNO/wmts.asmx/wmts","layer":"YQEMAPANNO","matrixSet":"TileMatrixSet0","left":120.889,"bottom":28.073,"right":120.996,"top":28.161,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //海宁
    {
        "url":"http://tianditu.haining.gov.cn/HNEMAP/service/WMTS","layer":"HNEMAP","matrixSet":"TileMatrixSet0","left":120.351,"bottom":30.390,"right":120.752,"top":30.540,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://tianditu.haining.gov.cn/HNEMAPANNO/service/WMTS","layer":"HNEMAPANNO","matrixSet":"TileMatrixSet0","left":120.351,"bottom":30.390,"right":120.752,"top":30.540,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //桐乡
    {
        "url":"http://www.txmap.gov.cn/TXEMAP/service/WMTS","layer":"TXEMAP","matrixSet":"TileMatrixSet0","left":120.29110905,"bottom":30.47147777,"right":120.66372096,"top":30.79669302,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.txmap.gov.cn/TXEMAPANNO/service/WMTS","layer":"TXEMAPANNO","matrixSet":"TileMatrixSet0","left":120.29110905,"bottom":30.47147777,"right":120.66372096,"top":30.79669302,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //永康
    {
        "url":"http://www.jhmap.gov.cn/ykemap/service/WMTS","layer":"YKEMAP","matrixSet":"TileMatrixSet0","left":119.959,"bottom":28.840,"right":120.223,"top":29.039,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.jhmap.gov.cn/ykemapanno/service/WMTS","layer":"YKEMAPANNO","matrixSet":"TileMatrixSet0","left":119.959,"bottom":28.840,"right":120.223,"top":29.039,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //萧山
    {
        "url":"http://map.xiaoshan.gov.cn/ogcservice/xsemap_all/service/WMTS","layer":"XSEMAP","matrixSet":"TileMatrixSet0","left":120.0724884,"bottom":29.84677539,"right":120.71400406,"top":30.39204709,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.xiaoshan.gov.cn/ogcservice/xsemapanno_all/service/WMTS","layer":"XSEMAPANNO","matrixSet":"TileMatrixSet0","left":120.0724884,"bottom":29.84677539,"right":120.71400406,"top":30.39204709,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //金华
    {
        "url":"http://www.jhmap.gov.cn/jhemap_2/service/WMTS","layer":"JHEMAP","matrixSet":"TileMatrixSet0","left":119.323,"bottom":28.864,"right":120.555,"top":29.405,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.jhmap.gov.cn/jhemapanno_2/service/WMTS","layer":"JHEMAPANNO","matrixSet":"TileMatrixSet0","left":119.323,"bottom":28.864,"right":120.555,"top":29.405,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //兰溪
    {
        "url":"http://srv.jhmap.gov.cn/LXEMAP/service/WMTS","layer":"LXEMAP","matrixSet":"TileMatrixSet0","left":119.21618035,"bottom":29.07500845,"right":119.89020399,"top":29.45645588,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/LXEMAPANNO/service/WMTS","layer":"LXEMAPANNO","matrixSet":"TileMatrixSet0","left":119.21618035,"bottom":29.07500845,"right":119.89020399,"top":29.45645588,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //武义
    {
        "url":"http://srv.jhmap.gov.cn/wyemap/service/WMTS","layer":"wyemap","matrixSet":"TileMatrixSet0","left":119.44993536,"bottom":28.51610034,"right":119.97234798,"top":29.05607483,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/wyemapanno/service/WMTS","layer":"wyemapanno","matrixSet":"TileMatrixSet0","left":119.44993536,"bottom":28.51610034,"right":119.97234798,"top":29.05607483,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //浦江
    {
        "url":"http://srv.jhmap.gov.cn/PJEMAP/service/WMTS","layer":"PJEMAP","matrixSet":"TileMatrixSet0","left":119.69732442,"bottom":29.3536799,"right":120.10657146,"top":29.68405181,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/PJEMAPANNO/service/WMTS","layer":"PJEMAPANNO","matrixSet":"TileMatrixSet0","left":119.69732442,"bottom":29.3536799,"right":120.10657146,"top":29.68405181,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //磐安
    {
        "url":"http://srv.jhmap.gov.cn/paemap/service/WMTS","layer":"PAEMAP","matrixSet":"TileMatrixSet0","left":120.29796725,"bottom":28.83024528,"right":120.780299,"top":29.32216888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/paemapanno/service/WMTS","layer":"PAEMAPANNO","matrixSet":"TileMatrixSet0","left":120.29796725,"bottom":28.83024528,"right":120.780299,"top":29.32216888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //海盐
    {
        "url":"http://www.hytdt.gov.cn/ogcservice/HYEMAP/service/WMTS","layer":"HYEMAP","matrixSet":"TileMatrixSet0","left":120.72292741,"bottom":30.27007254,"right":121.04859065,"top":30.64144738,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hytdt.gov.cn/ogcservice/HYEMAPANNO/service/WMTS","layer":"HYEMAPANNO","matrixSet":"TileMatrixSet0","left":120.72292741,"bottom":30.27007254,"right":121.04859065,"top":30.64144738,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //上虞
    {
        "url":"http://www.sydt.gov.cn/services/SYEMAP/service/wmts","layer":"syemap","matrixSet":"TileMatrixSet0","left":120.64010806,"bottom":29.73319618,"right":121.1033105,"top":30.27877502,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.sydt.gov.cn/services/SYEMAPANNO/service/wmts","layer":"syemapanno","matrixSet":"TileMatrixSet0","left":120.64010806,"bottom":29.73319618,"right":121.1033105,"top":30.27877502,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //柯桥
    {
        "url":"http://srv.tianditusx.cn/KQEMAP/wmts.asmx/WMTS","layer":"KQEMAP","matrixSet":"TileMatrixSet0","left":120.28244687,"bottom":29.70036653,"right":120.79423159,"top":30.29156507,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/KQEMAPANNO/wmts.asmx/WMTS","layer":"KQEMAPANNO","matrixSet":"TileMatrixSet0","left":120.28244687,"bottom":29.70036653,"right":120.79423159,"top":30.29156507,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //庆元
    {
        "url":"http://srv.tiandituls.cn/geoservices/QYEMAP/service/WMTS","layer":"QYEMAP","matrixSet":"TileMatrixSet0","left":118.83068242,"bottom":27.41960606,"right":119.49945725,"top":27.86036958,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tiandituls.cn/geoservices/QYEMAPANNO/service/WMTS","layer":"QYEMAPANNO","matrixSet":"TileMatrixSet0","left":118.83068242,"bottom":27.41960606,"right":119.49945725,"top":27.86036958,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //缙云
    {
        "url":"http://202.107.251.99/geoservices/JYEMAP/service/wmts","layer":"JYEMAP","matrixSet":"TileMatrixSet0","left":119.86559883,"bottom":28.41059477,"right":120.4222908,"top":28.95309383,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://202.107.251.99/geoservices/JYEMAPANNO/service/wmts","layer":"JYEMAPANNO","matrixSet":"TileMatrixSet0","left":119.86559883,"bottom":28.41059477,"right":120.4222908,"top":28.95309383,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //龙泉
    {
        "url":"http://srv.tiandituls.cn/geoservices/LQEMAP/service/WMTS","layer":"LQEMAP","matrixSet":"TileMatrixSet0","left":118.71146884,"bottom":27.70837627,"right":119.42076053,"top":28.33965045,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tiandituls.cn/geoservices/LQEMAPANNO/service/WMTS","layer":"LQEMAPANNO","matrixSet":"TileMatrixSet0","left":118.71146884,"bottom":27.70837627,"right":119.42076053,"top":28.33965045,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //安吉
    {
        "url":"http://www.hzmaps.com/ogcservice/AJEMAP/service/wmts","layer":"AJEMAP","matrixSet":"TileMatrixSet0","left":119.23236598,"bottom":30.37538678,"right":119.88530143,"top":30.87450824,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hzmaps.com/ogcservice/AJEMAPANNO/service/wmts","layer":"AJEMAPANNO","matrixSet":"TileMatrixSet0","left":119.23236598,"bottom":30.37538678,"right":119.88530143,"top":30.87450824,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //东阳
    {
        "url":"http://www.jhmap.gov.cn/dyemap/service/WMTS","layer":"DYEMAP","matrixSet":"TileMatrixSet0","left":120.07208321,"bottom":28.96870124,"right":120.73472833,"top":29.49849909,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.jhmap.gov.cn/dyemapanno/service/WMTS","layer":"DYEMAPANNO","matrixSet":"TileMatrixSet0","left":120.07208321,"bottom":28.96870124,"right":120.73472833,"top":29.49849909,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //江山
    {
        "url":"http://www.zjditu.cn:88/JSEMAP/wmts.asmx/wmts","layer":"JSEMAP","matrixSet":"TileMatrixSet0","left":118.37682186,"bottom":28.24133987,"right":118.81371883,"top":28.89128855,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/JSEMAPANNO/wmts.asmx/wmts","layer":"JSEMAPANNO","matrixSet":"TileMatrixSet0","left":118.37682186,"bottom":28.24133987,"right":118.81371883,"top":28.89128855,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //玉环
    {
        "url":"http://122.226.143.78/YHEMAP/service/WMTS?Service=WMTS","layer":"YHEMAP","matrixSet":"TileMatrixSet0","left":121.12216876,"bottom":28.01574985,"right":121.53005977,"top":28.3233684,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://122.226.143.78/YHEMAPANNO/service/WMTS","layer":"YHEMAPANNO","matrixSet":"TileMatrixSet0","left":121.12216876,"bottom":28.01574985,"right":121.53005977,"top":28.3233684,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //文成
    {
        "url":"http://www.wctdt.com/iserver/services/wcmap/wmts","layer":"wcmap","matrixSet":"Custom_wcmap","left":119.77918702,"bottom":27.56601575,"right":120.25318751,"top":27.9879272,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.wctdt.com/iserver/services/wcpoi/wmts","layer":"wcpoi","matrixSet":"Custom_wcpoi","left":119.77918702,"bottom":27.56601575,"right":120.25318751,"top":27.9879272,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //苍南
    {
        "url":"http://www.go577.com/iserver/services/cnmap/wmts","layer":"cnmap","matrixSet":"Custom_cnmap","left":120.06122345,"bottom":27.04529041,"right":120.85353176,"top":27.5968052,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.go577.com/iserver/services/cnpoi/wmts","layer":"cnpoi","matrixSet":"Custom_cnpoi","left":120.06122345,"bottom":27.04529041,"right":120.85353176,"top":27.5968052,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //平阳
    {
        "url":"http://www.pytdt.com/iserver/services/pymap/wmts","layer":"pymap","matrixSet":"Custom_pymap","left":120.06854387,"bottom":27.35390547,"right":121.13100423,"top":27.7657337,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.pytdt.com/iserver/services/pypoi/wmts","layer":"pypoi","matrixSet":"Custom_pypoi","left":120.06854387,"bottom":27.35390547,"right":121.13100423,"top":27.7657337,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //瑞安
    {
        "url":"http://www.ratdt.com/iserver/services/ramap/wmts","layer":"ramap","matrixSet":"Custom_ramap","left":120.16917718,"bottom":27.60635716,"right":121.22405973,"top":27.99139396,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.ratdt.com/iserver/services/rapoi/wmts","layer":"rapoi","matrixSet":"Custom_rapoi","left":120.16917718,"bottom":27.60635716,"right":121.22405973,"top":27.99139396,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    }
];
ZJCHMap.prototype.countyimgLayers = [
    //瑞安
    {
        "url":"http://www.ratdt.com/iserver/services/raimage/wmts","layer":"raimage","matrixSet":"Custom_raimage","left":120.16917718,"bottom":27.60635716,"right":121.22405973,"top":27.99139396,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.ratdt.com/iserver/services/raimgpoi/wmts","layer":"raimgpoi","matrixSet":"Custom_raimgpoi","left":120.16917718,"bottom":27.60635716,"right":121.22405973,"top":27.99139396,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //平阳
    {
        "url":"http://www.pytdt.com/iserver/services/pyimage/wmts","layer":"pyimage","matrixSet":"Custom_pyimage","left":120.06854387,"bottom":27.35390547,"right":121.13100423,"top":27.7657337,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.pytdt.com/iserver/services/pyimgpoi/wmts","layer":"pyimgpoi","matrixSet":"Custom_pyimgpoi","left":120.06854387,"bottom":27.35390547,"right":121.13100423,"top":27.7657337,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //玉环
    {
        "url":"http://122.226.143.78/YHIMG/service/WMTS?Service=WMTS","layer":"YHIMG","matrixSet":"TileMatrixSet0","left":121.12216876,"bottom":28.01574985,"right":121.53005977,"top":28.3233684,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://122.226.143.78/YHIMGANNO/service/WMTS","layer":"YHIMGANNO","matrixSet":"TileMatrixSet0","left":121.12216876,"bottom":28.01574985,"right":121.53005977,"top":28.3233684,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //江山
    {
        "url":"http://www.zjditu.cn:88/JSIMG/wmts.asmx/wmts","layer":"JSIMG","matrixSet":"TileMatrixSet0","left":118.37682186,"bottom":28.24133987,"right":118.81371883,"top":28.89128855,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/JSIMGANNO/wmts.asmx/wmts","layer":"JSIMGANNO","matrixSet":"TileMatrixSet0","left":118.37682186,"bottom":28.24133987,"right":118.81371883,"top":28.89128855,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //东阳
    {
        "url":"http://www.jhmap.gov.cn/dyimg/service/WMTS","layer":"DYIMG","matrixSet":"TileMatrixSet0","left":120.07208321,"bottom":28.96870124,"right":120.73472833,"top":29.49849909,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.jhmap.gov.cn/dyimganno/service/WMTS","layer":"DYIMGANNO","matrixSet":"TileMatrixSet0","left":120.07208321,"bottom":28.96870124,"right":120.73472833,"top":29.49849909,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //安吉
    {
        "url":"http://www.hzmaps.com/ogcservice/AJIMG_1/service/wmts","layer":"AJIMG","matrixSet":"TileMatrixSet0","left":119.23236598,"bottom":30.37538678,"right":119.88530143,"top":30.87450824,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hzmaps.com/ogcservice/AJIMGANNO_1/service/wmts","layer":"AJIMGANNO","matrixSet":"TileMatrixSet0","left":119.23236598,"bottom":30.37538678,"right":119.88530143,"top":30.87450824,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //庆元
    {
        "url":"http://srv.tiandituls.cn/geoservices/QYIMG/service/WMTS","layer":"QYIMG","matrixSet":"TileMatrixSet0","left":118.83068242,"bottom":27.41960606,"right":119.49945725,"top":27.86036958,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tiandituls.cn/geoservices/QYIMGANNO/service/WMTS","layer":"QYIMGANNO","matrixSet":"TileMatrixSet0","left":118.83068242,"bottom":27.41960606,"right":119.49945725,"top":27.86036958,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //海盐
    {
        "url":"http://www.hytdt.gov.cn/ogcservice/HYIMG/service/WMTS","layer":"HYIMG","matrixSet":"TileMatrixSet0","left":120.72292741,"bottom":30.27007254,"right":121.04859065,"top":30.64144738,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hytdt.gov.cn/ogcservice/HYEMAPANNO/service/WMTS","layer":"HYEMAPANNO","matrixSet":"TileMatrixSet0","left":120.72292741,"bottom":30.27007254,"right":121.04859065,"top":30.64144738,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //金华
    {
        "url":"http://www.jhmap.gov.cn/jhimg/service/WMTS","layer":"JHIMG","matrixSet":"TileMatrixSet0","left":119.323,"bottom":28.864,"right":120.555,"top":29.405,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.jhmap.gov.cn/jhimganno_2/service/WMTS","layer":"JHIMGANNO","matrixSet":"TileMatrixSet0","left":119.323,"bottom":28.864,"right":120.555,"top":29.405,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //兰溪
    {
        "url":"http://srv.jhmap.gov.cn/LXIMG/service/WMTS","layer":"LXIMG","matrixSet":"TileMatrixSet0","left":119.21618035,"bottom":29.07500845,"right":119.89020399,"top":29.45645588,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/LXIMGANNO/service/WMTS","layer":"LXIMGANNO","matrixSet":"TileMatrixSet0","left":119.21618035,"bottom":29.07500845,"right":119.89020399,"top":29.45645588,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //武义
    {
        "url":"http://srv.jhmap.gov.cn/WYIMG/service/WMTS","layer":"wyimg","matrixSet":"TileMatrixSet0","left":119.44993536,"bottom":28.51610034,"right":119.97234798,"top":29.05607483,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/WYIMGANNO/service/WMTS","layer":"wyimganno","matrixSet":"TileMatrixSet0","left":119.44993536,"bottom":28.51610034,"right":119.97234798,"top":29.05607483,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //浦江
    {
        "url":"http://srv.jhmap.gov.cn/PJIMG/service/WMTS","layer":"PJIMG","matrixSet":"TileMatrixSet0","left":119.69732442,"bottom":29.3536799,"right":120.10657146,"top":29.68405181,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/PJIMGANNO/service/WMTS","layer":"PJIMGANNO","matrixSet":"TileMatrixSet0","left":119.69732442,"bottom":29.3536799,"right":120.10657146,"top":29.68405181,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //磐安
    {
        "url":"http://srv.jhmap.gov.cn/paimg/service/WMTS","layer":"PAIMG","matrixSet":"TileMatrixSet0","left":120.29796725,"bottom":28.83024528,"right":120.780299,"top":29.32216888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.jhmap.gov.cn/paimganno/service/WMTS","layer":"PAIMGANNO","matrixSet":"TileMatrixSet0","left":120.29796725,"bottom":28.83024528,"right":120.780299,"top":29.32216888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //杭州
    {
        "url":"http://www.hangzhoumap.gov.cn/Tile/WMTS/hztdtraster.gis","layer":"zjemap","matrixSet":"hztdtraster","left":119.907,"bottom":30.147,"right":120.398,"top":30.449,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hangzhoumap.gov.cn/Tile/WMTS/hztdtrastermark.gis","layer":"zjemap","matrixSet":"hztdtrastermark","left":119.907,"bottom":30.147,"right":120.398,"top":30.449,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //宁波
    {
        "url":"http://60.190.2.120/wmts/nbrmapall","layer":"0","tileMatrixSet":"nbmap","left":120.88037781,"bottom":28.85637165,"right":122.27490212,"top":30.36922722,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://60.190.2.120/wmts/nbrmapannoall","layer":"0","tileMatrixSet":"nbmap","left":120.88037781,"bottom":28.85637165,"right":122.27490212,"top":30.36922722,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //余姚
    {
        "url":"http://www.nbmap.gov.cn/wmts/yuyaoimg","layer":"0","matrixSet":"jsvector","left":120.8785242,"bottom":29.66298688,"right":121.42030634,"top":30.3238531,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.nbmap.gov.cn/wmts/yuyaoimganno","layer":"0","matrixSet":"jsvector","left":120.8785242,"bottom":29.66298688,"right":121.42030634,"top":30.3238531,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //温州
    {
        "url":"http://www.go577.com/iserver/services/imagemap/wmts","layer":"imagemap","matrixSet":"custom_imagemap","left":120.446,"bottom":27.300,"right":121.121,"top":28.346,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.go577.com/iserver/services/imagepoi/wmts","layer":"imagepoi","matrixSet":"custom_imagepoi","left":120.446,"bottom":27.300,"right":121.121,"top":28.346,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //文成
    {
        "url":"http://www.wctdt.com/iserver/services/wcimgmap/wmts","layer":"wcimgmap","matrixSet":"Custom_wcimgmap","left":119.77918702,"bottom":27.56601575,"right":120.25318751,"top":27.9879272,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.wctdt.com/iserver/services/wcimgpoi/wmts","layer":"wcimgpoi","matrixSet":"Custom_wcimgpoi","left":119.77918702,"bottom":27.56601575,"right":120.25318751,"top":27.9879272,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //苍南
    {
        "url":"http://www.go577.com/iserver/services/cnimg/wmts","layer":"cnimg","matrixSet":"Custom_cnimg","left":120.06122345,"bottom":27.04529041,"right":120.85353176,"top":27.5968052,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.go577.com/iserver/services/cnimgpoi/wmts","layer":"cnimgpoi","matrixSet":"Custom_cnimgpoi","left":120.06122345,"bottom":27.04529041,"right":120.85353176,"top":27.5968052,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //嘉兴
    {
        "url":"http://220.191.220.90/JXIMG/service","layer":"JXIMG","matrixSet":"TileMatrixSet0","left":120.560,"bottom":30.559,"right":120.987,"top":30.847,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://220.191.220.90/JXIMGANNO/service","layer":"JXIMGANNO","matrixSet":"TileMatrixSet0","left":120.560,"bottom":30.559,"right":120.987,"top":30.847,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //平湖
    {
        "url":"http://map.pinghu.gov.cn/geoservices/PHIMG/service/wmts","layer":"phimg","matrixSet":"TileMatrixSet0","left":120.94613864,"bottom":30.49445271,"right":121.33567304,"top":30.85894075,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.pinghu.gov.cn/geoservices/PHIMGANNO/service/wmts","layer":"phimganno","matrixSet":"TileMatrixSet0","left":120.94613864,"bottom":30.49445271,"right":121.33567304,"top":30.85894075,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //嘉善
    {
        "url":"http://map.jiashan.gov.cn/jsimg/service/wmts","layer":"jsimg","matrixSet":"TileMatrixSet0","left":120.74140764,"bottom":30.76121486,"right":121.03377233,"top":31.03235917,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.jiashan.gov.cn/jsimganno/service/wmts","layer":"jsimganno","matrixSet":"TileMatrixSet0","left":120.74140764,"bottom":30.76121486,"right":121.03377233,"top":31.03235917,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //湖州
    {
        "url":"http://www.zjditu.cn:88/huzimg/wmts.asmx/WMTS","layer":"HUZIMG","matrixSet":"TileMatrixSet0","left":119.636,"bottom":30.729,"right":120.287,"top":30.952,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/huzimganno/wmts.asmx/WMTS","layer":"HUZIMGANNO","matrixSet":"TileMatrixSet0","left":119.636,"bottom":30.729,"right":120.287,"top":30.952,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //长兴
    {
        "url":"http://www.hzmaps.com/ogcservice/CXIMG/service/wmts","layer":"CXIMG","matrixSet":"TileMatrixSet0","left":119.54800554,"bottom":30.72063245,"right":120.10148442,"top":31.18247145,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.hzmaps.com/ogcservice/CXIMGANNO/service/wmts","layer":"CXIMGANNO","matrixSet":"TileMatrixSet0","left":119.54800554,"bottom":30.72063245,"right":120.10148442,"top":31.18247145,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //桐乡
    {
        "url":"http://www.txmap.gov.cn/TXIMG/service/WMTS","layer":"TXIMG","matrixSet":"TileMatrixSet0","left":120.29110905,"bottom":30.47147777,"right":120.66372096,"top":30.79669302,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.txmap.gov.cn/TXIMGANNO/service/WMTS","layer":"TXIMGANNO","matrixSet":"TileMatrixSet0","left":120.29110905,"bottom":30.47147777,"right":120.66372096,"top":30.79669302,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //绍兴
    {
        "url":"http://srv.tianditusx.cn/sximg_1/wmts.asmx/WMTS","layer":"SXIMG","matrixSet":"TileMatrixSet0","left":120.282,"bottom":29.833,"right":120.934,"top":30.284,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/sximganno_1/wmts.asmx/WMTS","layer":"SXIMGANNO","matrixSet":"TileMatrixSet0","left":120.282,"bottom":29.833,"right":120.934,"top":30.284,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //上虞
    {
        "url":"http://www.sydt.gov.cn/services/SYIMG/service/wmts","layer":"syimg","matrixSet":"TileMatrixSet0","left":120.64010806,"bottom":29.73319618,"right":121.1033105,"top":30.27877502,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.sydt.gov.cn/services/SYIMGANNO/service/wmts","layer":"syimganno","matrixSet":"TileMatrixSet0","left":120.64010806,"bottom":29.73319618,"right":121.1033105,"top":30.27877502,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //柯桥
    {
        "url":"http://srv.tianditusx.cn/kqimg/wmts.asmx/WMTS","layer":"KQIMG","matrixSet":"TileMatrixSet0","left":120.28244687,"bottom":29.70036653,"right":120.79423159,"top":30.29156507,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/kqimganno/wmts.asmx/WMTS","layer":"KQIMGANNO","matrixSet":"TileMatrixSet0","left":120.28244687,"bottom":29.70036653,"right":120.79423159,"top":30.29156507,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //诸暨
    {
        "url":"http://srv.tianditusx.cn/ZHUJIMG/wmts.asmx/wmts","layer":"ZHUJIMG","matrixSet":"TileMatrixSet0","left":119.88406281,"bottom":29.35723593,"right":120.53636056,"top":29.98482175,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/ZHUJIMGANNO/wmts.asmx/wmts","layer":"ZHUJIMGANNO","matrixSet":"TileMatrixSet0","left":119.88406281,"bottom":29.35723593,"right":120.53636056,"top":29.98482175,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //嵊州
    {
        "url":"http://srv.tianditusx.cn/SZIMG/wmts.asmx/wmts","layer":"SZIMG","matrixSet":"TileMatrixSet0","left":120.46380062,"bottom":29.32490184,"right":121.11600389,"top":29.83225084,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/SZIMGANNO/wmts.asmx/wmts","layer":"SZIMGANNO","matrixSet":"TileMatrixSet0","left":120.46380062,"bottom":29.32490184,"right":121.11600389,"top":29.83225084,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //衢州
    {
        "url":"http://www.qz-map.com/geoservices/qzimg/service/wmts","layer":"QZIMG","matrixSet":"TileMatrixSet0","left":118.375,"bottom":28.781,"right":119.235,"top":29.196,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/qzimganno_1/service/wmts","layer":"QZIMGANNO","matrixSet":"TileMatrixSet0","left":118.375,"bottom":28.781,"right":119.235,"top":29.196,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //常山
    {
        "url":"http://www.qz-map.com/geoservices/CSIMG/service/wmts","layer":"CSIMG","matrixSet":"TileMatrixSet0","left":118.25190476,"bottom":28.76944207,"right":118.75880822,"top":29.21653911,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/CSIMGANNO/service/wmts","layer":"CSIMGANNO","matrixSet":"TileMatrixSet0","left":118.25190476,"bottom":28.76944207,"right":118.75880822,"top":29.21653911,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //开化
    {
        "url":"http://www.qz-map.com/geoservices/KHIMG/service/wmts","layer":"KHIMG","matrixSet":"TileMatrixSet0","left":118.02252465,"bottom":28.90508445,"right":118.63205651,"top":29.50025031,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/KHIMGANNO/service/wmts","layer":"KHIMGANNO","matrixSet":"TileMatrixSet0","left":118.02252465,"bottom":28.90508445,"right":118.63205651,"top":29.50025031,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //龙游
    {
        "url":"http://www.qz-map.com/geoservices/LYIMG/service/wmts","layer":"LYIMG","matrixSet":"TileMatrixSet0","left":119.0295241,"bottom":28.73624287,"right":119.34189545,"top":29.29785673,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.qz-map.com/geoservices/LYIMGANNO/service/wmts","layer":"LYIMGANNO","matrixSet":"TileMatrixSet0","left":119.0295241,"bottom":28.73624287,"right":119.34189545,"top":29.29785673,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //舟山
    {
        "url":"http://www.zsch.gov.cn/ogcservice/zsyx_1/service/wmts","layer":"zsyx","matrixSet":"TileMatrixSet0","left":121.912,"bottom":29.899,"right":122.618,"top":30.360,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zsch.gov.cn/ogcservice/zsyxanno_201501/service/wmts","layer":"zsyxanno","matrixSet":"TileMatrixSet0","left":121.912,"bottom":29.899,"right":122.618,"top":30.360,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //台州
    {
        "url":"http://tmap.tzsjs.gov.cn/services/wmts/chinaimgmap","layer":"chinaimgmap","matrixSet":"esritilematirx","left":121.014,"bottom":28.236,"right":122.000,"top":29.167,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    //三门
    {
        "url":"http://tmap.smjs.com.cn/services/wmts/smimgmap","layer":"smimgmap","matrixSet":"esritilematirx","left":121.20179764,"bottom":28.83843207,"right":121.80453192,"top":29.20310078,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://tmap.smjs.com.cn/services/wmts/smimgmapanno","layer":"smimgmapanno","matrixSet":"esritilematirx","left":121.20179764,"bottom":28.83843207,"right":121.80453192,"top":29.20310078,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //临海
    {
        "url":"http://tmap.linhai.gov.cn/services/wmts/lhimgmap","layer":"lhimgmap","matrixSet":"esritilematirx","left":120.822,"bottom":28.688,"right":121.935,"top":29.067,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://tmap.linhai.gov.cn/services/wmts/lhimgmapanno","layer":"lhimgmapanno","matrixSet":"esritilematirx","left":120.822,"bottom":28.688,"right":121.935,"top":29.067,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //丽水
    {
        "url":"http://www.zjditu.cn:88/LSIMG/wmts.asmx/WMTS","layer":"LSIMG","matrixSet":"TileMatrixSet0","left":119.798,"bottom":28.000,"right":120.303,"top":29.648,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/LSIMGANNO/wmts.asmx/WMTS","layer":"LSIMGANNO","matrixSet":"TileMatrixSet0","left":119.798,"bottom":28.000,"right":120.303,"top":29.648,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //缙云
    {
        "url":"http://202.107.251.99/geoservices/JYIMG/service/wmts","layer":"JYIMG","matrixSet":"TileMatrixSet0","left":119.86559883,"bottom":28.41059477,"right":120.4222908,"top":28.95309383,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://202.107.251.99/geoservices/JYIMGANNO/service/wmts","layer":"JYIMGANNO","matrixSet":"TileMatrixSet0","left":119.86559883,"bottom":28.41059477,"right":120.4222908,"top":28.95309383,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //龙泉
    {
        "url":"http://srv.tiandituls.cn/geoservices/LQIMG/service/WMTS","layer":"LQIMG","matrixSet":"TileMatrixSet0","left":118.71146884,"bottom":27.70837627,"right":119.42076053,"top":28.33965045,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tiandituls.cn/geoservices/LQIMGANNO/service/WMTS","layer":"LQIMGANNO","matrixSet":"TileMatrixSet0","left":118.71146884,"bottom":27.70837627,"right":119.42076053,"top":28.33965045,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //德清
    {
        "url":"http://www.zjditu.cn:88/DQIMG/wmts.asmx/wmts","layer":"DQIMG","matrixSet":"TileMatrixSet0","left":119.811,"bottom":30.473,"right":120.290,"top":30.614,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.zjditu.cn:88/DQIMGANNO/wmts.asmx/wmts","layer":"DQIMGANNO","matrixSet":"TileMatrixSet0","left":119.811,"bottom":30.473,"right":120.290,"top":30.614,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //新昌
    {
        "url":"http://srv.tianditusx.cn/xcimg/wmts.asmx/WMTS","layer":"XCIMG","matrixSet":"TileMatrixSet0","left":120.69370754,"bottom":29.22631923,"right":121.22699856,"top":29.55999888,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://srv.tianditusx.cn/xcimganno/wmts.asmx/WMTS","layer":"XCIMGANNO","matrixSet":"TileMatrixSet0","left":120.69370754,"bottom":29.22631923,"right":121.22699856,"top":29.55999888,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //乐清
    {
        "url":"http://map.yueqing.gov.cn:88/YQIMG/wmts.asmx/wmts","layer":"YQIMG","matrixSet":"TileMatrixSet0","left":120.889,"bottom":28.073,"right":120.996,"top":28.161,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.yueqing.gov.cn:88/YQIMGANNO/wmts.asmx/wmts","layer":"YQIMGANNO","matrixSet":"TileMatrixSet0","left":120.889,"bottom":28.073,"right":120.996,"top":28.161,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //海宁
    {
        "url":"http://tianditu.haining.gov.cn/HNIMG/service/WMTS","layer":"HNIMG","matrixSet":"TileMatrixSet0","left":120.351,"bottom":30.390,"right":120.752,"top":30.540,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://tianditu.haining.gov.cn/HNIMGANNO_201501/service/WMTS","layer":"HNIMGANNO","matrixSet":"TileMatrixSet0","left":120.351,"bottom":30.390,"right":120.752,"top":30.540,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //永康
    {
        "url":"http://www.jhmap.gov.cn/ykimg/service/WMTS","layer":"YKIMG","matrixSet":"TileMatrixSet0","left":119.959,"bottom":28.840,"right":120.223,"top":29.039,"style":"default","format":"image/jpeg",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://www.jhmap.gov.cn/ykimganno/service/WMTS","layer":"YKIMGANNO","matrixSet":"TileMatrixSet0","left":119.959,"bottom":28.840,"right":120.223,"top":29.039,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    },
    //萧山
    {
        "url":"http://map.xiaoshan.gov.cn/ogcservice/XSIMG/service/WMTS","layer":"XSIMG","matrixSet":"TileMatrixSet0","left":120.0724884,"bottom":29.84677539,"right":120.71400406,"top":30.39204709,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": false
    },
    {
        "url":"http://map.xiaoshan.gov.cn/ogcservice/XSIMGANNO/service/WMTS","layer":"XSIMGANNO","matrixSet":"TileMatrixSet0","left":120.0724884,"bottom":29.84677539,"right":120.71400406,"top":30.39204709,"style":"default","format":"image/png",
        "transitionEffect": "map-resize", "baseLayer": false,
        "minLevel": 18, "maxLevel": 20,
        "isAnnoLayer": true
    }
];

ZJCHMap.prototype.createMap = function (mapDiv) {
    var controls = [];
    if (this.isPanZoomBar) {
        controls.push(new OpenLayers.Control.XPanZoomBar());
    }
    if (this.isNavigation) {
        controls.push(new OpenLayers.Control.Navigation());
    }
    if (this.isMousePosition) {
        controls.push(new OpenLayers.Control.MousePosition({
            prefix:'&nbsp;&nbsp;',
            numDigits:3,
            element:document.getElementById('position')}
        ));
    }
    var options = {
        controls: controls,
        maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
        units: 'degrees',
        projection: 'EPSG:4490'
    };
    this.map = new OpenLayers.Map(mapDiv, options);
};

/*
 初始化位置
 */
ZJCHMap.prototype.initLocation = function (lon, lat, level) {
    var initialPosition = new OpenLayers.LonLat(lon, lat);
    if(!level || level == null || level == '')level = this.map.getZoom();
    if(level >= 16)level = 13;
    this.map.moveTo(initialPosition, level);
};

/*
 切换矢量影像图层
 */
ZJCHMap.prototype.switchBaseLayer = function (maptype) {
    this.maptype = maptype;
    if (maptype === "影像") {
        if (this.imgmapLayers.length == 0) {
            this.baseLayersIndex = 0;
            //this.loadImgmapLayers();
            var zoom = this.map.getZoom();
            if (zoom <= MAPMAXLEVEL && zoom >= ZJMAPMAXLEVEL) {
                this.chinaLayers[0].maxLevel=20;
                this.loadGroupLayers(this.countyimgLayers,this.imgmapLayers,this.imgmapAnnoLayers);
                this.isLoadCountryLayers=true;
            } else if (zoom <= 15) {
                this.chinaLayers[0].maxLevel=20;
                this.loadEmapLayers();
                this.isLoadCountryLayers=false;
            }
            this.removeEmapLayers();
            this.removeYXLayers();
            this.map.setBaseLayer(this.map.layers[0]);
        }
    } else if (maptype === "矢量") {
        if (this.emapLayers.length == 0) {
            this.baseLayersIndex = 0;
            this.loadEmapLayers();
            var zoom = this.map.getZoom();
            //console.log("###############zoom#########################"+zoom);
            //console.log("###############isLoadCountryLayers#########################"+this.isLoadCountryLayers);
            if (zoom <= MAPMAXLEVEL && zoom >= ZJMAPMAXLEVEL) {
                this.chinaLayers[0].maxLevel=20;
                this.loadGroupLayers(this.countyLayers,this.emapLayers,this.emapAnnoLayers);
                this.isLoadCountryLayers=true;
            } else if (zoom <= 15) {
                this.chinaLayers[0].maxLevel=20;
                this.loadEmapLayers();
                this.isLoadCountryLayers=false;
            }
            this.removeImgmapLayers();
            this.removeYXLayers();
            this.removeWZJLayers();
            this.map.setBaseLayer(this.map.layers[0]);
        }
    } else if (maptype === "晕渲") {
        if (this.emapLayers.length == 0) {
            this.baseLayersIndex = 0;
            this.loadYXLayers();
            this.removeWZJLayers();
            this.removeEmapLayers();
            this.removeImgmapLayers();
            this.map.setBaseLayer(this.map.layers[0]);
        }
        if (this.emapLayers.length == 0) {
            this.baseLayersIndex = 0;
            this.loadWZJLayers();
            this.removeYXLayers();
            this.removeEmapLayers();
            this.removeImgmapLayers();
            this.map.setBaseLayer(this.map.layers[0]);
        }
    } else if (maptype === "无注记") {
        if (this.emapLayers.length == 0) {
            this.baseLayersIndex = 0;
            this.loadWZJLayers();
            this.removeYXLayers();
            this.removeEmapLayers();
            this.removeImgmapLayers();
            this.map.setBaseLayer(this.map.layers[0]);
        }
    }else if(maptype === "三维"){
        document.getElementById("map").style.display='none';
        document.getElementById("3dmap").style.display='block';
        document.getElementById("3dmap").style.width='100%';
        zjasm.platform.SkylineGlobe.init();
    }
};
/**
 *@Author  zkx
 *@Date 2016/9/9 15:11
 *@method  使用callback方法调用对用的zjchmap对象
 *@param   callback
 */
ZJCHMap.prototype.getZjchMapCallback=function(callback){
    if (callback && typeof(callback)==="function"){
        var $this=this;
        callback($this);

    }
};
ZJCHMap.prototype.getReservedLayers = function () {
    return [this.zjimgLayers,this.markerVector,this.pointMarkerVector,this.routeLayer,this.CircleLayer,this.boundary];
};

ZJCHMap.prototype.checkIsBaseLayer = function (layer) {
    if (layer == this.map.baseLayer) {
        return true;
    }
    if (this.imgmapLayers.indexOf(layer) != -1) {
        return true;
    }
    if (this.emapAnnoLayers.indexOf(layer) != -1) {
        return true;
    }
    if (this.emapLayers.indexOf(layer) != -1) {
        return true;
    }
    if (this.imgmapAnnoLayers.indexOf(layer) != -1) {
        return true;
    }
    if (this.imgmapYXLayers.indexOf(layer) != -1) {
        return true;
    }
    if (this.imgmapWZJLayers.indexOf(layer) != -1) {
        return true;
    }
    return false;
};

ZJCHMap.prototype.isReserveLayer = function (layer) {
    return layer != null && this.getReservedLayers().indexOf(layer) != -1;
};

ZJCHMap.prototype.generateResolutions = function (minLevel, maxLevel) {
    var resolutions = [];
    for (var n = minLevel; n <= maxLevel; n++) {
        resolutions.push(this.mapResolutions[n]);
    }
    return resolutions;
};
ZJCHMap.prototype.generateMatrixIds = function (minLevel, maxLevel) {
    var matrixIds = [];
    for (var n = minLevel; n <= maxLevel; n++) {
        matrixIds.push({
            identifier: n,
            matrixHeight: -1,
            matrixWidth: -1,
            scaleDenominator: this.mapScales[n],
            supportedCRS: "urn:ogc:def:crs:EPSG::4490",
            tileHeight: 256,
            tileWidth: 256,
            topLeftCorner: new OpenLayers.LonLat(-180, 90)
        });
    }
    return matrixIds;
};

/**
 * 加载图层
 * @param layersInfo
 * @param emapLayers
 * @param annoLayers
 */
ZJCHMap.prototype.loadGroupLayers = function (layersInfo, emapLayers, annoLayers) {
    var len = layersInfo.length;
    //var emapLayers_id=[];
    for (var i = 0; i < len; i++) {
        var layerInfo = layersInfo[i];
        var minLevel = layerInfo.minLevel;
        var maxLevel = layerInfo.maxLevel;
        var layer = new OpenLayers.Layer.WMTS({
            name: "瓦片地图",
            transitionEffect: layerInfo.transitionEffect,
            url: layerInfo.url,
            layer: layerInfo.layer,
            style: layerInfo.style,
            matrixSet: layerInfo.matrixSet,
            format: layerInfo.format,
            opacity: undefined == layerInfo.opacity ? 1 : layerInfo.opacity,
            maxExtent: new OpenLayers.Bounds(layerInfo.left, layerInfo.bottom, layerInfo.right, layerInfo.top),
            resolutions: this.generateResolutions(minLevel, maxLevel),
            matrixIds: this.generateMatrixIds(minLevel, maxLevel),
            buffer: 1,
            isBaseLayer: layerInfo.baseLayer
        });
        if (layerInfo.isuncoverenable) {
            layer.options.uncoverzones = layerInfo.uncoverzones;
            layer.options.minUncoverlevel = layerInfo.minUncoverlevel;
            layer.options.maxUncoverlevel = layerInfo.maxUncoverlevel;
            layer.options.isuncoverenable = layerInfo.isuncoverenable;
        }
        this.map.addLayer(layer);
        this.map.setLayerIndex(layer, this.baseLayersIndex);
        this.baseLayersIndex++;
        if (layerInfo.isAnnoLayer) {
            annoLayers.push(layer);
        } else {
            emapLayers.push(layer);
        }

    }

};

/*
 移除矢量图层
 */
ZJCHMap.prototype.removeEmapLayers = function () {
    var length = this.emapLayers.length;
    for (var i = 0; i < length; i++) {
        this.map.removeLayer(this.emapLayers[i]);
    }
    this.emapLayers = [];
    length = this.emapAnnoLayers.length;
    for (var i = 0; i < length; i++) {
        this.map.removeLayer(this.emapAnnoLayers[i]);
    }
    this.emapAnnoLayers = [];
};

/*
 移除影像图层
 */
ZJCHMap.prototype.removeImgmapLayers = function () {
    var length = this.imgmapLayers.length;
    for (var i = 0; i < length; i++) {
        this.map.removeLayer(this.imgmapLayers[i]);
    }
    this.imgmapLayers = [];
    //todo:更新图层测试 lg
    length = this.imgmapAnnoLayers.length;
    for (var i = 0; i < length; i++) {
        this.map.removeLayer(this.imgmapAnnoLayers[i]);
    }
    this.imgmapAnnoLayers = [];
};

/*
 移除晕渲图层
 */
ZJCHMap.prototype.removeYXLayers = function () {
    /*var length = this.imgmapYXLayers.length;
     for (var i = 0; i < length; i++) {
     this.map.removeLayer(this.imgmapYXLayers[i]);
     }
     this.imgmapYXLayers = [];
     */
};

/*
 移除无注记图层
 */
ZJCHMap.prototype.removeWZJLayers = function () {

    /* var length = this.imgmapWZJLayers.length;
     for (var i = 0; i < length; i++) {
         this.map.removeLayer(this.imgmapWZJLayers[i]);
     }
     this.imgmapWZJLayers = [];*/
};

/**
 * 切换影像注记
 * @param type
 */
ZJCHMap.prototype.switchMap = function(type){
    var layers = this.map.layers;
    var length = layers.length;
    //地图图层列表注记勾选同步
    var imgmapAnnoLayers=this.imgmapAnnoLayers;
    var imgmapAnnoLayersCheckbox=$("#menu_"+imgmapAnnoLayers[0].id);
    imgmapAnnoLayersCheckbox.attr("checked",type);
    if(type){
        imgmapAnnoLayersCheckbox.parent().addClass("on-check");
    }else{
        imgmapAnnoLayersCheckbox.parent().removeClass("on-check")
    }


    for(var i=0;i<this.imgmapAnnoLayers.length;i++){
        this.map.getLayer(this.imgmapAnnoLayers[i].id).setVisibility(type);
    }

    //if(type){ // 显示有注记
    //    for(var i = 0; i < length; i++){
    //        if(layers[i].visibility == false){
    //            layers[i].setVisibility(true);
    //        }
    //    }
    //
    //}else{ // 显示无注记
    //    for(var i = 0; i < length; i++){
    //        if(layers[i].layer == "ZJSZF_IMGZT" || layers[i].layer == "cia"){
    //            layers[i].setVisibility(false);
    //        }
    //    }
    //}
};

/**
 * 切换矢量注记
 * @param type
 */
ZJCHMap.prototype.switchMapSL = function(type){
    var layers = this.map.layers;
    var length = layers.length;
    if(type){ // 显示有注记
        for(var i = 0; i < length; i++){
            if(layers[i].visibility == false){
                layers[i].setVisibility(true);
            }
        }

    }else{ // 显示无注记
        for(var i = 0; i < length; i++){
            if(layers[i].layer == "" || layers[i].layer == "cva"){
                layers[i].setVisibility(false);
            }
        }
    }
};

/**
 * 加载矢量图
 */
ZJCHMap.prototype.loadEmapLayers = function () {
    this.loadGroupLayers(this.chinaLayers, this.emapLayers, this.emapAnnoLayers);
    this.loadGroupLayers(this.zjLayers, this.emapLayers, this.emapAnnoLayers);
    this.addLayerNametoList(1);

    /*var zoom = this.map.getZoom();
    if (zoom <= MAPMAXLEVEL && zoom >= ZJMAPMAXLEVEL) {
        if(isload20level==false){
            this.loadGroupLayers(this.countyLayers, this.emapLayers, this.emapAnnoLayers);
            isload20level=true;
        }
    } else if (zoom <= 15 ) {
        isload20level=false;
        this.loadGroupLayers(this.chinaLayers, this.emapLayers, this.emapAnnoLayers);
        this.loadGroupLayers(this.zjLayers, this.emapLayers, this.emapAnnoLayers);
    }
    this.addLayerNametoList(1);*/

};
/**
 * 加载影像图
 */
ZJCHMap.prototype.loadImgmapLayers = function () {
    this.loadGroupLayers(this.chinaimgLayers, this.imgmapLayers, this.imgmapAnnoLayers);
    this.loadGroupLayers(this.zjimgLayers, this.imgmapLayers, this.imgmapAnnoLayers);
    this.addLayerNametoList(2);
};

/**
 * 加载晕渲图
 */
ZJCHMap.prototype.loadYXLayers = function () {
    /* this.loadGroupLayers(this.chinaLayers, this.imgmapYXLayers);
     this.loadGroupLayers(this.zjLayers, this.imgmapYXLayers);*/
};

/**
 * 加载无注记图
 */
ZJCHMap.prototype.loadWZJLayers = function () {
    this.loadGroupLayers(this.chinaimgLayers, this.imgmapWZJLayers, this.imgmapAnnoLayers);
    this.loadGroupLayers(this.zjimgLayers_ZJSZF_IMG, this.imgmapWZJLayers, this.imgmapAnnoLayers);
};



ZJCHMap.prototype.addMarkerLayer = function (markerName, isListener) {
    var owner = this;
    var markerVector = null;
    if (isListener) {
        var layerListeners = {
            featureclick: function (e) {
                if (e) {
                    var feature = e.feature;
                    var params = feature.attributes.data;
                    var pic=feature.style.externalGraphic;
                    feature.style.externalGraphic= pic.replace("red","blue");
                    owner.markerVector.drawFeature(feature, feature.style);
                    owner.markerVector.popupCallback(params);
                    OpenLayers.Event.stop(e);
                }
                return false;
            },
            featureover:function(e){
                var feature = e.feature;
                //var params = feature.attributes.data;
                var pic=feature.style.externalGraphic;
                feature.style.externalGraphic= pic.replace("red","blue");
                owner.markerVector.drawFeature(feature, feature.style);
                OpenLayers.Event.stop(e);
            },
            featureout:function(e){
                var feature = e.feature;
                //var params = feature.attributes.data;
                var pic=feature.style.externalGraphic;
                feature.style.externalGraphic= pic.replace("blue","red");
                owner.markerVector.drawFeature(feature, feature.style);
                OpenLayers.Event.stop(e);
            }

        };

        //var cluster=new OpenLayers.Strategy.Cluster();
        markerVector = new OpenLayers.Layer.Vector(markerName, {
            eventListeners: layerListeners
        });

    } else {
        markerVector = new OpenLayers.Layer.Vector(markerName);
        markerVector.events.on({"featureselected": owner.clickFeature});
    }

    this.markerVector = markerVector;
    this.map.addLayer(markerVector);
    this.map.setLayerIndex(markerVector, this.baseLayersIndex + 1);
};

ZJCHMap.prototype.addPointMarkerLayer = function (markerName) {
    var pointVector = new OpenLayers.Layer.Vector(markerName);

    this.pointMarkerVector = pointVector;
    this.map.addLayer(pointVector);
    this.map.setLayerIndex(pointVector, this.baseLayersIndex + 2);
};

ZJCHMap.prototype.addCircleLayer = function(circleLayer){
    var circleVectorLayer = new OpenLayers.Layer.Vector(circleLayer);
    this.CircleLayer = circleVectorLayer;
    this.map.addLayer(circleVectorLayer);
};

ZJCHMap.prototype.clearFeatures = function () {
    if (this.pointMarkerVector != null) {
        this.pointMarkerVector.removeAllFeatures();
    }
    if (this.markerVector != null) {
        this.markerVector.removeAllFeatures();
    }

};


/**
 * 清除layers
 */
ZJCHMap.prototype.clearLayers = function () {
    var layers = this.map.layers;
    var len = layers.length;
    for (var i = len - 1; i >= 0; i--) {
        var layer = layers[i];
        if (!this.isReserveLayer(layer) && !this.checkIsBaseLayer(layer)) {
            this.map.removeLayer(layer);
        }
    }
};

/**
 * 根据名称清除对应layer
 * @param layerName
 */
ZJCHMap.prototype.clearLayerByName = function (layerName) {
    var layers = this.map.layers;
    var len = layers.length;
    for (var i = len - 1; i >= 0; i--) {
        var layer = layers[i];
        if (layer.name == layerName) {
            this.map.removeLayer(layer);
        }
    }
};
/**
 * 通过图层id移除图层
 * @param layerId
 */

ZJCHMap.prototype.removeLayerById=function(layerId){
    var layers=this.map.layers;
    var len=layers.length;
    for(var i=len-1;i>=0;i--){
        var layer = layers[i];
        if (layer.id == layerId) {
            this.map.removeLayer(layer);
            break;
        }
    }
};
/**
 * 获取图层透明度
 * @param layerid
 * @returns {*}
 */
ZJCHMap.prototype.getLayerOpacity=function(layerid){
    var layer=this.getLayerById(layerid);
    return layer.opacity;
};

/**
 * 设置图层透明度
 * @param opacityValue
 * @param layerId
 */
ZJCHMap.prototype.setLayerOpacity=function(opacityValue,layerId){
    var layer=this.getLayerById(layerId);
    layer.setOpacity(opacityValue);
};

/**
 * 根据Id 获取图层对象
 * @param layerid
 * @returns {*}
 */
ZJCHMap.prototype.getLayerById=function(layerid){
    var layers=this.map.layers;
    var len=layers.length;
    for(var i=len-1;i>=0;i--){
        var layer=layers[i];
        if(layer.id==layerid){
            return layer;
        }
    }
};

/**
 * 根据name 获取图层对象
 * @param layerName
 * @returns {*}
 */
ZJCHMap.prototype.getLayerByName=function(layerName){
    var layers=this.map.layers;
    var len=layers.length;
    for(var i=len-1;i>=0;i--){
        var layer=layers[i];
        if(layer.name==layerName){
            return layer;
        }
    }

};

/**
 * 添加marker
 * @param data
 * @param styleParams 样式
 * @param marker
 */
ZJCHMap.prototype.addMarkerFeature = function (data, styleParams,marker) {
    var lon = data.lon;
    var lat = data.lat;
    var position = this.transformTo900913(lon, lat);
    var feature = this.getGraphicFeature(position.lon, position.lat, styleParams, {data: data});
    marker.addFeatures([feature]);
};


ZJCHMap.prototype.clickFeature = function (event) {
    var f = event.feature;
    var param = null;
    if (f.attributes.count == 1) {
        param = f.cluster[0].data.data;
    } else if (f.attributes.count > 1) {
        mapEvent.zjchMap.map.zoomTo(mapEvent.zjchMap.getLevel() + 1, f.layer.getViewPortPxFromLonLat(new OpenLayers.LonLat(f.geometry.x, f.geometry.y)));
    } else {
        param = f.attributes.data;
    }

    mapEvent.getPopupContent(param);
    OpenLayers.Event.stop(event);
};


/**
 * 地图缩放
 * @param level
 */
ZJCHMap.prototype.zoomTo = function (level) {
    this.map.zoomTo(level);
};

/**
 *  当地图区域发生变化，重新渲染map位置
 */
ZJCHMap.prototype.renderMap = function () {
    // this.map.render(this.map.div);
    this.map.render(this.mapdiv);
};

/**
 *  当地图区域发生变化，更新map大小
 */
ZJCHMap.prototype.updateSize = function () {
    this.map.updateSize();
};


/**
 * 得到map的范围
 * @return {*}
 */
ZJCHMap.prototype.getExtent = function () {
    // 当前范围
    var bounds = this.map.getExtent();
    return bounds;
};


/**
 * 得到样式feature
 */
ZJCHMap.prototype.getGraphicFeature = function (lon, lat, styleParams, dataParams) {
    if (dataParams == null || dataParams == undefined) {
        dataParams = {};
    }
    var point = this.getGeometryPoint(lon, lat);
    var feature = new OpenLayers.Feature.Vector(point, dataParams, styleParams);
    return feature;
};
ZJCHMap.prototype.getGeometryPoint = function (lon, lat) {
    var point = new OpenLayers.Geometry.Point(lon, lat);
    return point;
};
/**
 * 创建圆形元素
 * @param lon
 * @param lat
 * @param radius
 * @returns {OpenLayers.Geometry.Polygon}
 */
ZJCHMap.prototype.getGeometryCircle=function(lon,lat,radius,rotation){
    var point = new OpenLayers.Geometry.Point(lon, lat);
    var circle=new OpenLayers.Geometry.Polygon(point,radius,20,rotation);
    return circle;
};



/**
 *  注册map点击事件
 * @param fun
 * @param isRegister
 */
ZJCHMap.prototype.clickEvent = function (fun, isRegister) {
    if (isRegister) {
        this.map.events.register('click', this.map, fun);
    } else {
        this.map.events.unregister('click', this.map, fun);
    }
};

/**
 *  注册map移动事件
 * @param fun
 * @param isRegister
 */
ZJCHMap.prototype.moveStartEvent = function (fun, isRegister) {
    if (isRegister) {
        this.map.events.register('movestart', this.map, fun);
    } else {
        this.map.events.unregister('movestart', this.map, fun);
    }
};

/**
 *  得到地图级别
 */
ZJCHMap.prototype.getLevel = function () {
    return this.map.getZoom();
};
/**
 *  得到地图级别
 */
ZJCHMap.prototype.getCenter = function () {
    return this.map.getCenter();
};


/**
 *  popup展示
 * @param lon
 * @param lat
 * @param content
 * @param popupWidth
 * @param popupHeight
 */
ZJCHMap.prototype.showPopup = function (lon, lat, content, popupWidth, popupHeight) {
    this.keepXXRemovePopupInMap();
    var owner = this;
    function popupDestroy() {
        this.destroy();
        owner.removePopupById(owner.popupFeatureId);
    }
    var lonlat = new OpenLayers.LonLat(lon, lat);
    var size = new OpenLayers.Size(popupWidth, popupHeight);
    var popup = new OpenLayers.Popup.EFramedCloud(this.popupFeatureId,
        lonlat,
        size,
        content,
        null,
        false,
        popupDestroy);
    popup.autoSize = false;
    this.map.addPopup(popup);
};


/**
 * 通过popup的id移除popup
 * @param id
 */
ZJCHMap.prototype.removePopupById = function (id) {
    /*
     通过pupu的id移除popup
     */
    var length = this.map.popups.length;
    var popups = this.map.popups;
    for (var i = 0; i < length; i++) {
        if (popups[i].id == id) {
            this.map.removePopup(popups[i]);
            break;
        }
    }
};

/**
 * 移除map中的all popup
 */
ZJCHMap.prototype.removePopupInMap = function () {
    var length = this.map.popups.length;
    var popups = this.map.popups;
    for (var i = 0; i < length; i++) {
        this.map.removePopup(popups[0]);
    }
};



ZJCHMap.prototype.transformTo900913 = function (lon, lat) {
    /* var fromProjection = new OpenLayers.Projection("EPSG:4326");
     var toProjection = new OpenLayers.Projection("EPSG:900913");
     var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
     */
    var position = new OpenLayers.LonLat(lon, lat);
    return position;
};

ZJCHMap.prototype.transformTo4326 = function (lon, lat) {
    /* var fromProjection = new OpenLayers.Projection("EPSG:900913");
     var toProjection = new OpenLayers.Projection("EPSG:4326");
     var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);*/
    var position = new OpenLayers.LonLat(lon, lat);
    return position;
};


/**
 * 根据feature值缩放地图
 * @param features
 */
ZJCHMap.prototype.zoomToExtentForFeature = function (features) {
    var bounds;
    if (features) {
        if (features.constructor != Array) {
            features = [features];
        }
        for (var i = 0; i < features.length; i++) {
            if (!bounds) {
                bounds = features[i].geometry.getBounds();
            } else {
                bounds.extend(features[i].geometry.getBounds());
            }
        }
        var z = this.map.getZoomForExtent(bounds, false);
        if (z > 17) {
            z = 17;
        } else {
            z = z - 1;
        }
        this.map.setCenter(new OpenLayers.LonLat((bounds.left + bounds.right) / 2, (bounds.bottom + bounds.top) / 2), z);
    }
};

/**
 *@Author
 *@Date 2016/9/9 15:11
 *@method  将地图的中心设置为点的位置，zoom 设置为14级，如果大于14级zoom为当前地图zoom等级
 *
 */
ZJCHMap.prototype.zoomToExtentForpoint = function (point) {

    var zoom = this.map.getZoom();
    if (zoom < 14) {
        zoom = 14;
    }
    this.map.setCenter(new OpenLayers.LonLat(point.lon, point.lat), zoom);
};

ZJCHMap.prototype.keepXXRemovePopupInMap = function () {
    var length = this.map.popups.length;
    var popups = this.map.popups;
    for (var i = length - 1; i >= 0; --i) {
        if (popups[i].id != "clear_2" && popups[i].id != "clear_1") {
            this.map.removePopup(popups[i]);
        }
    }

    for (var i = 0; i < this.map.controls.length; i++) {
        var control = this.map.controls[i];
        if (control instanceof OpenLayers.Control.SelectFeature)
            control.unselectAll();
    }
};


/**
 * 得到当前popup所在的点
 * @return {null}
 */
ZJCHMap.prototype.getPopupPoint = function () {
    // 得到popup的坐标
    var lonlat = null;
    if (this.map.popups.length > 0) {
        var point = this.map.popups[0];
        lonlat = point.lonlat;
    }
    var title = $(".popop_title").text();
    lonlat = this.transformTo4326(lonlat.lon, lonlat.lat);
    lonlat.name = title;
    return lonlat;
};

/*
 添加路线图层
 */
ZJCHMap.prototype.addRouteLayer = function () {
    var owner = this;
    var layerListeners = {
        featureclick: function (e) {
            if (e) {
                var feature = e.feature;
                if (feature) {
                    var data = feature.attributes.data;
                    if (data && data.routePoint == true) {
                        var centroid = feature.geometry.getCentroid();
                        var lon = centroid.x;
                        var lat = centroid.y;
                        owner.routeLayer.popupCallback(lon, lat, data, 218, 115);
                    }
                }
                OpenLayers.Event.stop(e);
            }
            return false;
        }
    };
    var routeLayer = new OpenLayers.Layer.Vector("routeLayer", {
        displayInLayerSwitcher: false,
        eventListeners: layerListeners,
        rendererOptions: {zIndexing: true}
    });
    this.routeLayer = routeLayer;
    this.routeLayer.popupCallback = null; // 点击路线feature时调用的方法
    this.routeLayer.routeSectionFeatures = []; // 存放路线段的数组
    this.map.addLayer(routeLayer);
};
/*
 画路线起始点
 */
ZJCHMap.prototype.getStartEndFeature = function (point, isStart, data) {
    if (!point) {
        return null;
    }
    if (!data) {
        data = {};
    }
    var dataParams = {data: data};
    var styleParams = {
        graphic: true,
        externalGraphic: '',
        graphicWidth: 24,
        graphicHeight: 39,
        graphicXOffset: -16,
        graphicYOffset: -35,
        graphicOpacity: 1,
        graphicZIndex: 100,
        cursor: 'pointer'
    };
    var attributes = {};
    if (isStart) {
        styleParams.externalGraphic = 'images/newImg/start.png';
        attributes = {'mark': 'start', data: data};
    } else {
        styleParams.externalGraphic = 'images/newImg/end.png';
        attributes = {'mark': 'end', data: data};
    }
    var p = point.split(',');
    var lon = p[0];
    var lat = p[1];
    var position = this.transformTo900913(lon, lat);
    var feature = this.getGraphicFeature(position.lon, position.lat, styleParams, dataParams);
    feature.attributes = attributes;
    return feature;
};

/**
 *   得到转车点feature  适合加密网站 http://developer.fundrive.com/service/route.html
 */
ZJCHMap.prototype.getTransferRouteFeature = function (point, data) {
    if (!point) {
        return null;
    }
    if (!data) {
        data = {};
    }
    var dataParams = {data: data};
    var styleParams = {
        graphic: true,
        externalGraphic: '',
        graphicWidth: 22,
        graphicHeight: 20,
        graphicOpacity: 1,
        graphicZIndex: 100,
        cursor: 'pointer'
    };
    styleParams.externalGraphic = 'images/subway.png';
    var position = this.transformTo900913(point.lon, point.lat);
    var feature = this.getGraphicFeature(position.lon, position.lat, styleParams, dataParams);
    return feature;
};

/**
 *   得到转车点feature  适合天地图
 */
ZJCHMap.prototype.getTransferRouteFeature_tianditu = function (point, data) {
    if (!point) {
        return null;
    }
    if (!data) {
        data = {};
    }
    var dataParams = {data: data};
    var styleParams = {
        graphic: true,
        externalGraphic: '',
        graphicWidth: 22,
        graphicHeight: 20,
        graphicOpacity: 1,
        graphicZIndex: 100,
        cursor: 'pointer'
    };
    if (data.tool == 'bus') {
        styleParams.externalGraphic = 'images/bus.png';
    }
    if (data.tool == 'subway') {
        styleParams.externalGraphic = 'images/subway.png';
    }

    var p = point.split(',');
    var lon = p[0];
    var lat = p[1];
    var position = this.transformTo900913(lon, lat);
    var feature = this.getGraphicFeature(position.lon, position.lat, styleParams, dataParams);
    return feature;
};

ZJCHMap.prototype.drawRouteFeature = function (feature) {
    if (feature) {
        this.routeLayer.addFeatures([feature]);
    }
};
/**
 *  得到线feature 适合加密网站 http://developer.fundrive.com/service/route.html
 */
ZJCHMap.prototype.getLineFeature = function (points, styleParams, dataParams) {
    if (points instanceof Array) {
        var length = points.length;
        var geometryPoints = [];
        for (var i = 0; i < length; i++) {
            //var point = points[i];
            var point = points[i].split(',');
            var geoPoint = this.getGeometryPoint(point[0], point[1]);
            geometryPoints.push(geoPoint);
        }
        var lineString = new OpenLayers.Geometry.LineString(geometryPoints);
//        lineString = lineString.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var feature = new OpenLayers.Feature.Vector(lineString, dataParams, styleParams);
        return feature;
    } else {
        return null;
    }
};
/**
 *  适合天地图
 */
ZJCHMap.prototype.getLineFeature_tianditu = function (points, styleParams, dataParams) {
    if (points instanceof Array) {
        var length = points.length;
        var geometryPoints = [];
        for (var i = 0; i < length; i++) {
            var point = points[i];
            var lonlat = point.split(',');
            var geoPoint = this.getGeometryPoint(lonlat[0], lonlat[1]);
            geometryPoints.push(geoPoint);
        }
        var lineString = new OpenLayers.Geometry.LineString(geometryPoints);
//        lineString = lineString.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var feature = new OpenLayers.Feature.Vector(lineString, dataParams, styleParams);
        return feature;
    } else {
        return null;
    }
};
/**
 *  得到虚线路线
 * @param point
 */
ZJCHMap.prototype.getDottedLineFeature = function (points, data, type) {
    if (!data) {
        data = {};
    }
    var dataParams = {data: data};
    var styleParams = {
        stroke: true,
        strokeColor: 'rgb(48, 162, 8)',
        strokeOpacity: 1,
        graphicZIndex: 10,
        strokeDashstyle: 'dash',
        strokeWidth: 3
    };
    if (type && type == "search") {
        return  this.getLineFeature(points, styleParams, dataParams);
    } else {
        return  this.getLineFeature_tianditu(points, styleParams, dataParams);
    }
};
/**
 *  画路线
 * @param points
 */
ZJCHMap.prototype.getRouteFeature = function (points, type) {
    var styleParams = {
        stroke: true,
//        strokeColor: "#AC5AF9",
        strokeColor: "#4989C5",
        strokeOpacity: 0.8,
        strokeWidth: 5,
        graphicZIndex: 10,
        cursor: 'pointer'
    };
    if (type && type == "search") {
        return  this.getLineFeature(points, styleParams);
    } else {
        return  this.getLineFeature_tianditu(points, styleParams);
    }
};

/*
 清除路线所有feature
 */
ZJCHMap.prototype.clearRouteFeature = function () {
    if (this.routeLayer) {
        this.routeLayer.removeAllFeatures();
    }
};

/*
 清除CircleLayer
 */
ZJCHMap.prototype.clearCircleLayer = function () {
    if (this.CircleLayer != null) {
        this.CircleLayer.removeAllFeatures();
    }
};

/*
 清除路线所有feature
 */
ZJCHMap.prototype.clearWmsLayer = function () {
    /* if(this.wmsLayer){
         this.clearLayerByName(this.wmsLayer.name);
     }*/
};

/*
 清除路线feature但不清除起始点
 */
ZJCHMap.prototype.clearRouteLineFeature = function () {
    if (this.routeLayer) {
        var features = this.routeLayer.features;
        var len = features.length;
        for (var i = 0; i < len; i++) {
            try {
                var attributes = (features[i].attributes == undefined) ? null : features[i].attributes;
                var mark = attributes == null ? null : attributes.mark;
                if (mark == null) {
                    this.routeLayer.removeFeatures(features[i]);
                }
            } catch (e) {
                this.routeLayer.removeFeatures(features[i]);
            }
        }
    }
};



/**
 * 测量距离
 */
ZJCHMap.prototype.selectMeasureDistanceTool = function () {
    //清除图层元素、Popup
//    this.clearFeatures();
//    this.removePopupInMap();
    this.deactiveAllControl();
    if (this.distanceTool == null) {
        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333",
                strokeLinecap:"round"
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#F36262",
                strokeDashstyle: "solid",
                strokeLinecap:"round"
            },
            "Polygon": {
                strokeWidth: 2,
                strokeOpacity: 1,
                strokeColor: "#F36262",
                fillColor: "white",
                fillOpacity: 0.3,
                strokeLinecap:"round"
            }
        };
        var style = new OpenLayers.Style();
        style.addRules([new OpenLayers.Rule({
            symbolizer: sketchSymbolizers
        })]);
        var styleMap = new OpenLayers.StyleMap({
            "default": style
        });
        this.distanceTool = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: true,
            geodesic:true,
            handlerOptions: {
                layerOptions: {
                    styleMap: styleMap
                }

            },
            measureComplete:function(){
                mapEvent.zjchMap.finishDistance = true;
            }

        });
        var owner = this;
        this.distanceTool.events.on({
            "measure": function (e) {
                owner.handleMeasurements(e, true);
            },
            "measurepartial": owner.handleMeasurements

        });
        this.map.addControl(this.distanceTool);
    }
    //用于判断一次绘制线段是否完成
    mapEvent.zjchMap.finishDistance = false;
    this.distanceTool.activate();
};
function moveDistanceMouse(e) {
    $("#map_meadis_btn").css({
        top: e.pageY - 40,
        left: e.pageX+10
    });
}
ZJCHMap.prototype.handleMeasurements = function (event) {
    mapEvent.zjchMap.removePopupById('map_meadis_btn');
    var units = event.units;
    if (units == "km") {
        units = "公里";
    } else {
        units = "米";
    }
    var measure = event.measure;
    var out = "";
    out += "<div style='padding:5px;width: 100%'><span style='color:red;'>&nbsp;" + measure.toFixed(3) + "</span> " + units + "</div>";
    var locations = event.geometry.components;
    mapEvent.zjchMap.createMeasurePopup('map_meadis_btn', locations[locations.length - 1].x, locations[locations.length - 1].y, out, "ranging");

    //判断是否注册距离显示标牌跟随鼠标移动事件
    if(mapEvent.zjchMap.finishDistance){
        mapEvent.zjchMap.map.events.unregister("mousemove",mapEvent.zjchMap.map,moveDistanceMouse);
        mapEvent.zjchMap.finishDistance = false;
    }else{
        mapEvent.zjchMap.map.events.unregister("mousemove",mapEvent.zjchMap.map,moveDistanceMouse);
        mapEvent.zjchMap.map.events.register("mousemove",mapEvent.zjchMap.map,moveDistanceMouse);
    }
};

ZJCHMap.prototype.selectMeasureAreaTool = function () {
//    this.clearFeatures();
//    this.removePopupInMap();
    this.deactiveAllControl();
    if (this.areaTool == null) {
        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333"
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#666666",
                strokeDashstyle: "solid",
                strokeLinecap:"round"
            },
            "Polygon": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#F36262",
                fillColor: "white",
                fillOpacity: 0.3,
                strokeLinecap:"round"
            }
        };
        var style = new OpenLayers.Style();
        style.addRules([new OpenLayers.Rule({
            symbolizer: sketchSymbolizers
        })]);
        var styleMap = new OpenLayers.StyleMap({
            "default": style
        });
        this.areaTool = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
            geodesic:true,
            persist: true,
            handlerOptions: {
                layerOptions: {
                    styleMap: styleMap
                }
            },
            measureComplete:function(){
                mapEvent.zjchMap.finishArea = true;
            }
        });
        var owner = this;
        this.areaTool.events.on({
            "measure": function (e) {
                owner.handleAreaMeasurements(e, true);
            },
            "measurepartial": owner.handleAreaMeasurements
        });
        this.map.addControl(this.areaTool);
    }
    mapEvent.zjchMap.finishArea = false;
    this.areaTool.activate();
};

ZJCHMap.prototype.handleAreaMeasurements = function (event) {
    var units = event.units;
    if (units == "km") {
        units = "平方公里";
    } else {
        units = "平方米";
    }
    var measure = event.measure;
    var out = "";
    out += "<div style='padding:5px; width: 100%'><span style='color:red;'>&nbsp;" + measure.toFixed(3) + "</span>" + units + "</div>";
    var locations = event.geometry.components[0].components;
    if (locations.length >= 4) {
        mapEvent.zjchMap.createMeasurePopup('map_meaarea_btn', locations[locations.length - 2].x, locations[locations.length - 2].y, out, "Area");
    }
    //判断是否注册 面积标牌是否跟随鼠标移动事件
    if(mapEvent.zjchMap.finishArea){
        mapEvent.zjchMap.map.events.unregister("mousemove",mapEvent.zjchMap.map,moveAreaMouse);
        mapEvent.zjchMap.finishArea = false;
    }else{
        mapEvent.zjchMap.map.events.unregister("mousemove",mapEvent.zjchMap.map,moveAreaMouse);
        mapEvent.zjchMap.map.events.register("mousemove",mapEvent.zjchMap.map,moveAreaMouse);
    }
};
function moveAreaMouse(e){
    $("#map_meaarea_btn").css({
        top: e.pageY -50,
        left: e.pageX+5
    });
}
ZJCHMap.prototype.createMeasurePopup = function (id, lon, lat, content, type) {
    mapEvent.zjchMap.removePopupById('map_meadis_btn');
    mapEvent.zjchMap.removePopupById('map_meaarea_btn');
    var owner = this;
    var width = 120;
    var height = 35;
    if (type == "Area"){width = 145;height = 40}
    var popup = new OpenLayers.Popup(id, new OpenLayers.LonLat(lon, lat), new OpenLayers.Size(width, height), content, true, function (e) {
        owner.deactiveAllControl();
        this.destroy();
    });
    popup.border = "1px solid red";
    this.map.addPopup(popup);
};

/**
 * 注册点图查询事件
 */
ZJCHMap.prototype.startsearchpoint=function(){


    //移除活动的地图事件和地图上的
    this.clearFeaturesandControl();

    //关闭搜索结果窗口和显示搜索按钮，不显示美食、商场搜索类型
    closeSearchResultPanel();
    //添加点圈查询事件
    var pointLayer=new OpenLayers.Layer.Vector("pointLayer");
    var style=this.featureStyle();
    var control=new OpenLayers.Control.DrawFeature(pointLayer,OpenLayers.Handler.Point,{
        handlerOptions:{
            layerOptions:{
                styleMap:style
            }
        },
        eventListeners:{
            "featureadded":function(obj){
                //console.log(obj.feature.geometry.bounds);
                var lon=obj.feature.geometry.x;
                var lat=obj.feature.geometry.y;
                searcharound(lon,lat);
                mapEvent.zjchMap.deactiveAllControl();
            }
        }
    });
    this.map.addControl(control);
    control.activate();
    //this.map.addLayer(pointLayer);
    //mapEvent.zjchMap.map.events.register("click",this.map,searcharound);

};

ZJCHMap.prototype.deactiveAllControl = function () {
    for (var i = 0; i < this.map.controls.length; i++) {
        var control = this.map.controls[i];
        if (
            control instanceof OpenLayers.Control.Navigation || control instanceof OpenLayers.Control.PanZoomBar ||
            control instanceof OpenLayers.Control.SelectFeature ||
            control instanceof OpenLayers.Control.Scale || control instanceof OpenLayers.Control.ScaleLine
            || control instanceof OpenLayers.Control.MousePosition)
            continue;
        control.deactivate();
    }
};

ZJCHMap.prototype.setThisPopupPoint = function (point) {
    this.thisPopupPoint = point;
};
ZJCHMap.prototype.getThisPopupPoint = function () {
    return  this.thisPopupPoint;
};

ZJCHMap.prototype.setStartEndPoint = function (point) {
    this.startEndPoint = point;
};
ZJCHMap.prototype.getStartEndPoint = function () {
    return    this.startEndPoint;
};
//移除元素和控件
ZJCHMap.prototype.clearFeaturesandControl=function(){
    this.deactiveAllControl();
    this.clearFeatures();
    this.removePopupInMap();
    this.clearCircleLayer();
    this.clearLayerByName("circleVector_jx");
    this.map.events.unregister("click",this.map,searcharound);
};

//添加圈选
ZJCHMap.prototype.searchbycircle=function(){
    circleIsOpen = true;
    //关闭搜索类型对话框
    if (!$('.searchTYPE').is(':hidden')) {
        $('.searchTYPE').hide();
    }
    //圈选加关键字查询
    //var keywords=$("#search_ipt").val();
    //keywords=keywords?keywords:"";
    var keywords="";
    this.clearFeaturesandControl();
    var styleMap=this.featureStyle();
    var layer=new OpenLayers.Layer.Vector("polygonLayer");
    var control=new OpenLayers.Control.DrawFeature(layer,OpenLayers.Handler.RegularPolygon,{
        handlerOptions: {
            sides:100,
            persist:false,
            layerOptions: {
                styleMap: styleMap
            },
            radius:0.01,
            fixedRadius:true
        },
        eventListeners: {
            "featureadded": function (obj) {
                displaySearchCloseBtn();
                var points=obj.feature.geometry.components[0].components;
                var maxLon=points[0].x;
                var minLon=points[0].x;
                var minLat=points[0].y;
                var maxLat=points[0].y;

                for(var i= 1;i<points.length-1;i++){
                    if(maxLon<points[i].x){
                        maxLon=points[i].x;
                    }
                    if(minLon>points[i].x){
                        minLon=points[i].x;
                    }
                    if(maxLat<points[i].y){
                        maxLat=points[i].y;
                    }
                    if(minLat>points[i].y){
                        minLat=points[i].y;
                    }

                }

                aroundDistance.lon=(maxLon+minLon)/2;
                aroundDistance.lat=(maxLat+minLat)/2;
                aroundDistance.radius=(maxLon-minLon)/2;

                var bounds={
                    left:minLon,
                    right:maxLon,
                    bottom:minLat,
                    top:maxLat
                };
                searchByFeature={
                    bounds:bounds,
                    type:"circle"
                };
                mapEvent.zjchMap.clearCircleLayer();
                mapEvent.zjchMap.deactiveAllControl();
                //点图查询，请求结果

                //圈选后地图自动缩放对应大小
                mapEvent.initLocation(aroundDistance.lon, aroundDistance.lat, 12);

                //搜索
                clickRequest(keywords, 'aroundSearch', 1, 10, 'all', bounds.left, bounds.bottom,bounds.right, bounds.top, null, null);

            }
        }
    });
    mapEvent.zjchMap.map.addControl(control);
    control.activate();
};
//添加矩形选择
ZJCHMap.prototype.searchbyrectangle=function(){
    $("#search_ipt").val("");
    rectangleIsOpen = true;
    this.clearFeaturesandControl();
    var styleMap=this.featureStyle();
    var layer=new OpenLayers.Layer.Vector("circleVector_jx",{styleMap: styleMap});
    var control=new OpenLayers.Control.DrawFeature(layer,OpenLayers.Handler.RegularPolygon,{
        handlerOptions: {
            //sides:20,
            persist:true,
            irregular:true,
            layerOptions: {
                styleMap: styleMap
            }
        },
        eventListeners: {
            "featureadded": function (obj) {
                displaySearchCloseBtn();
                var bounds=obj.feature.geometry.bounds;
                searchByFeature={
                    bounds:bounds,
                    type:"rectangle"
                };
                //var keywords=$("#search_ipt").val();
                //keywords=keywords?keywords:"";
                var keywords="";
                searchrequest(keywords,"all",bounds);
                //设置默认查询类型为地址名称
                resetSearchTypeHtml();
                //var feature = new OpenLayers.Feature.Vector(bounds.toGeometry());
                //var feature = new OpenLayers.Bounds(minLon,maxLon,minLat,maxLat).toGeometry();
                //mapEvent.zjchMap.CircleLayer.addFeatures([feature]);
                mapEvent.zjchMap.deactiveAllControl();
            }
        }
    });
    mapEvent.zjchMap.map.addLayer(layer);
    mapEvent.zjchMap.map.addControl(control);
    control.activate();

};

//定义默认样式
ZJCHMap.prototype.featureStyle=function(){
    var sketchSymbolizers = {
        "Point": {
            pointRadius: 4,
            graphicName: "cross",
            fillColor: "ffffff",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#333333"
        },
        "Line": {
            strokeWidth: 3,
            strokeOpacity: 1,
            strokeColor: "#666666",
            strokeDashstyle: "solid"
        },
        "Polygon": {
            fill: true,
            stroke: true,
            strokeWidth: 0.8,
            strokeOpacity: 1,
            strokeColor: "#009ACC",
            fillColor: "#009ACC",
            fillOpacity: 0.3,
            strokeLinecap:"square"
        }
    };
    var style = new OpenLayers.Style();
    style.addRules([new OpenLayers.Rule({
        symbolizer: sketchSymbolizers
    })]);
    var styleMap = new OpenLayers.StyleMap({
        "default": style});
    return styleMap;
};
/**
 * 加载图层名称添加
 * @param type 类型
 * @param mapDIV 添加的map id
 */
ZJCHMap.prototype.addLayerNametoList=function(type){
    switch (type){
        case 1:
            var baseLayer=this.emapAnnoLayers.concat(this.emapLayers);
            //var baseLayer=this.emapAnnoLayers.concat(this.emapLayers);
            this.removeBaseLayerName(this.imgmapAnnoLayers);
            this.removeBaseLayerName(this.imgmapLayers);
            this.addLayerNametoListEve(this.emapAnnoLayers,"电子地图注记",this.imgmapAnnoLayers);
            this.addLayerNametoListEve(baseLayer,"电子地图",this.imgmapLayers);
            break;
        case 2:
            this.removeBaseLayerName(this.emapAnnoLayers);
            this.removeBaseLayerName(this.emapLayers);
            this.addLayerNametoListEve(this.imgmapAnnoLayers,"影像地图注记",this.emapAnnoLayers);
            this.addLayerNametoListEve(this.imgmapLayers,"影像地图",this.emapLayers);
            break;
        case 3:
            if(this.maptype=="矢量"){
                this.removeBaseLayerName(this.emapAnnoLayers);
                this.removeBaseLayerName(this.emapLayers);
            }else if(this.maptype=="影像"){
                this.removeBaseLayerName(this.imgmapAnnoLayers);
                this.removeBaseLayerName(this.imgmapLayers);
            }

            break;
        default:
            var baseLayer=this.emapAnnoLayers.concat(this.emapLayers);
            this.removeBaseLayerName(this.imgmapAnnoLayers);
            this.removeBaseLayerName(this.imgmapLayers);
            this.addLayerNametoListEve(this.emapAnnoLayers,"电子地图注记",this.imgmapAnnoLayers);
            this.addLayerNametoListEve(baseLayer,"电子地图",this.imgmapLayers);
    }
};
ZJCHMap.prototype.removeBaseLayerName=function(removeLayer){
    if(removeLayer.length>0){
        $("#menu_"+removeLayer[0].id).parent().parent().remove();
    }
};

/**
 * 地图底图图层添加勾选事件
 * @param layertype
 * @param layername
 * @param mapDIV
 * @param removeLayer
 */
ZJCHMap.prototype.addLayerNametoListEve=function(layertype,layername,removeLayer){
    var $this=this;
    var mapDIV=this.mapdiv;
    if(layertype.length>0){
        //if(removeLayer.length>0){
        //    $("#menu_"+removeLayer[0].id).parent().parent().remove();
        //}
        var layerid=layertype[0].id;

        //添加图层名称到菜单图层列表
        if(layername === "电子地图注记")return;

        $this.addLayerNametoMenu(layername,layerid,mapDIV,true);

        $this.menuMapListCli(layerid,layertype);
        $this.gray=false;

    }

};

/**
 * 地图底图图层绑定事件
 * @param layerid
 */
ZJCHMap.prototype.menuMapListCli=function(layerid,layertype){
    var $this=this;
    var mapid=$this.map.div.id;
    $("#menu_"+layerid).bind("click",function(){

        /*        var zjchmap=multiScreen.getZjchMapById($this.mapdiv);
         zjchmap.switchMap(this.checked);
 */
        if(this.checked!=true){
            $(this).parent().removeClass("on-check");
            for(var i=0;i<layertype.length;i++){
                $this.map.getLayer(layertype[i].id).setVisibility(false);
            }



            //影像地图图层注记勾选同步
            $this.synchroChecked(mapid,this.checked);


        }else {
            $(this).parent().addClass("on-check");
            for (var i = 0; i < layertype.length; i++) {
                $this.map.getLayer(layertype[i].id).setVisibility(true);
            }
            //影像地图图层注记勾选同步

            $this.synchroChecked(mapid,this.checked);
        }

    });


    $("#menu_"+layerid).parent().parent().contextmenu({
        target: '#context-menu-base',
        before: function(e,context) {
            $("#context-menu-base1").hide();
            //判断地图是否置灰
            if ($this.gray) {
                //$("#chengeToGray").addClass("disabled");
                //$("#chengeToNormal").removeClass("disabled");
                $("#chengeToGray a").text("取消置灰");
            } else {
                $("#chengeToGray a").text("置灰地图");
                //$("#chengeToNormal").addClass("disabled");
                //$("#chengeToGray").removeClass("disabled");
            }
        },
        onItem: function (context, e) {
            //从右击对象中获取需要置灰的地图id
            var layerid_map=this.$element[0].id;
            var len=layerid.length+1;
            var mapid=layerid_map.slice(len);
            $("#mapscreentype").val(mapid);

            var i = e.target.tabIndex;
            var disabled=e.target.parentNode.className;
            if(disabled!="disabled"){
                if (i == 1) {
                    mapEvent.changeToGray();
                } else if (i == 2) {
                    mapEvent.changeToGray();
                }
            }

        }
    });

};
/**
 * 境界线范围
 * @param city
 * @param county
 */
ZJCHMap.prototype.loadBoundary=function(city) {
    var OID = $("#OID").val();
    if (
        OID.indexOf("2150") <= -1 &&
        OID.indexOf("2216") <= -1) {
        var filter = "NAME = '" + city + "'";
        var boundary = this.boundary;
        var map = this.map;
        if (boundary == null) {
            this.boundary = new OpenLayers.Layer.WMS("boundary", divisionURL,
                {
                    layers: "zjplatform:Bou",
                    CQL_FILTER: filter,
                    transparent: true,
                    format: "image/png",
                    srs: 'EPSG:4490'
                },
                {
                    tileOptions: {maxGetUrlLength: 2048},
                    isBaseLayer: false,
                    visibility: true
                }
            );
            map.addLayer(this.boundary);
            map.setLayerIndex(this.boundary, this.baseLayersIndex);

        } else {
            boundary.cql_filter = filter;//过滤
            boundary.visibility = true;
            boundary.mergeNewParams({cql_filter: boundary.cql_filter});
            boundary.setVisibility(true);
        }
        map.events.register("moveend", this.boundary, function () {
            this.redraw();
        });
    }

};
/**
 *@Author
 *@Date 2016/9/9 15:11
 * @param {layerName} layername  {layerid} layerid {mapid} the id of map where is the layer added
 *         {type} boolean when type is true  means basemap,  false  mean not basemap
 *
 */
ZJCHMap.prototype.addLayerNametoMenu=function(layerName ,layerid,mapid,type){
    var name=layerName;
    var lId=layerid;
    var mId=mapid;
    var menuMapList=$("#"+mId+"_screen .menu-map-list");


    var html="";
    html+="<div  id='"+lId+"_"+mId+"' class='map-layer-list'>";
    html+="<div class='map-manager-checkbox on-check'><input type='checkbox' name='dituC'checked='checked'class='radioclass checkbox-opacity' id='menu_"+lId+"'/><label for='"+lId+"_"+mId+"'></label>&nbsp&nbsp</div>";
    html+=name;
    html+="</div>";
    if(type){
        menuMapList.append(html);
    }else{
        menuMapList.prepend(html);
    }

};

/**
 *@Author
 *@Date 2016/9/9 15:11
 *@method 影像地图图层注记勾选同步
 *
 */
ZJCHMap.prototype.synchroChecked=function(mapid,type){
    switch (mapid) {
        case "map":
            $("#isOpen").attr("checked",type);
            if(type){
                $("#isOpen").parent().addClass("on-check");
            }else{
                $("#isOpen").parent().removeClass("on-check");
            }
            break;
        case "map1":
            $("#isOpen_1").attr("checked",type);
            if(type){
                $("#isOpen_1").parent().addClass("on-check");
            }else{
                $("#isOpen_1").parent().removeClass("on-check");
            }
            break;
        case "map2":
            $("#isOpen_2").attr("checked",type);
            if(type){
                $("#isOpen_2").parent().addClass("on-check");
            }else{
                $("#isOpen_2").parent().removeClass("on-check");
            }
            break;
        case "map3":
            $("#isOpen_3").attr("checked",type);
            if(type){
                $("#isOpen_3").parent().addClass("on-check");
            }else{
                $("#isOpen_3").parent().removeClass("on-check");
            }
            break;
    }
};


/**
 *@Method   圈选和框选都是使得左边搜索栏显示为关闭搜索的按钮
 *@Author
 */
function displaySearchCloseBtn(){
    $(".menuDIV").hide();
    expandSearchResult();
    $("#search_btn").attr("class", "clear_icon");
    $("#search_btn").attr("onclick", "clearSearch()");
    $("#search_btn").attr("title", "关闭搜索");
    $("#search_btn").attr("data-original-title", "关闭搜索");
}

