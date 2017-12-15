/**
 *   地址配置项
 */

var  systemplacename="浙江省台州市临海市";//修改地图显示位置“浙江省xx市xx县”格式
var  systemimg="copyright-logo.png"; //系统图标
var  email="hellogis@163.com";//联系方式
var  emailhttp="http://mail.163.com";//邮件主页
var  title="临海市地理信息公共服务平台"; //系统名称
//市县地址
var sxdituURL = "http://61.175.222.82:8181/";
// ip定位url

var dituURL = "http://ditu.zj.cn/";

var localdituURL="http://localhost:8083";  //用户登录接口更改
//var userLogin = "http://ditu.zj.cn:8084/zjasm/cas/cs-login.action";
var userLogin = "http://tmap.lhjs.gov.cn/zjasm/cas/cs-login.action";//临海
//var userLogin = "http://61.175.222.82:8181/zjasm/cas/cs-login.action";
//var userLogin = "http://126.33.8.69:8080/zjasm/cas/cs-login.action";
//var poisearchurl = "http://61.175.222.82:8181/services/placesearch"; //地名地址检索服务地址
var poisearchurl = dituURL+"services/placesearch"; //地名地址检索服务地址
var ipLocationURL = 'http://map.tianditu.com/cityNode/getCityName.shtml?time='+Math.random();
var ipLocationURL_ = 'http://sdk.navinfo.com/lbsnps/lbsip.do';
// 行政区划地址
var divisionPosition = dituURL+'services/datasearch';
//var divisionPosition = 'http://61.175.222.82:8181/services/datasearch';
var divisionURL = 'http://183.129.171.243:8899/geoserver/zjplatform/Bou/ows?SERVICE=WMS';

// 天地图 驾车 公交地址
var  transportationURL =  'http://183.129.171.247:8880/bus/getBusBigCity.jsonp';
// 实时路况
var trafficURL = 'http://183.129.171.243:8899/geoserver/zjplatform/RTIC_POLYLINE/ows?s='+Math.random();
//  地名地址 lg
var placeSearchURL_ = 'http://115.182.88.151:8828/search';
// 四维驾车地址
var CAR_URL = 'http://183.129.171.247:8880/route/getDriveByLatLon.jsonp';

// 行政区导航
var divisionSearch = dituURL+"services/divisionsearch";

//目录资源
//var catalogSearch = "http://61.175.222.82:8181/catalog";
//var thematicDataMetadata = "http://61.175.222.82:8181/thematicDataMetadata";
var thematicDataMetadata = dituURL+"thematicDataMetadata";
//var catalogSearch = dituURL+"catalog";
var catalogSearch = "http://tmap.lhjs.gov.cn/catalog";

var proxyurl = "ajax/proxy.jsp";
try {
    OpenLayers.ProxyHost = proxyurl + "?url=";
} catch (e) {
}
var circleIsOpen=false,rectangleIsOpen = false;
//快速导航
var navKeywords = ["机关单位","交通出行","金融机构","房产小区","日常生活","文化教育","医疗卫生","酒店住宿","餐饮美食","休闲娱乐","风景名胜","自然山水"];
//点图查询检索的表（按比例尺）  等级:图层id；等级:图层id；
var tableid ="0:;1:;2:;3:;4:;5:;6:369614,369595,369593,369591,369589,369600,369604,369602,369610,369608,369612,369606;7:369614,369595,369593,369591,369589,369600,369604,369602,369610,369608,369612,369606;8:369616,369634,369629,369632,369627,369644,369646,369648,369642,369640,369638,369636;9:369616,369634,369629,369632,369627,369644,369646,369648,369642,369640,369638,369636;10:369616,369634,369629,369632,369627,369644,369646,369648,369642,369640,369638,369636;11:369660,369664,369666,369662,369658,369668,369672,369670,369678,369676,369680,369674,369682;12:369660,369664,369666,369662,369658,369668,369672,369670,369678,369676,369680,369674,369682;13:369660,369664,369666,369662,369658,369668,369672,369670,369678,369676,369680,369674,369682;14:369660,369664,369666,369662,369658,369668,369672,369670,369678,369676,369680,369674,369682;15:369704,369702,369707,369709,369700,369763,369765,369711,369715,369717,369713,369719;16:369704,369702,369707,369709,369700,369763,369765,369711,369715,369717,369713,369719;17:369704,369702,369707,369709,369700,369763,369765,369711,369715,369717,369713,369719;18:369704,369702,369707,369709,369700,369763,369765,369711,369715,369717,369713,369719;19:369704,369702,369707,369709,369700,369763,369765,369711,369715,369717,369713,369719;20:369704,369702,369707,369709,369700,369763,369765,369711,369715,369717,369713,369719";
var searchtableid=[];
tableid=tableid.split(";");

for( var i=0;i<tableid.length;i++){
    searchtableid[tableid[i].split(":")[0]]=tableid[i].split(":")[1];
}
//不加载市县级图层的最大值
var ZJMAPMAXLEVEL=16;
//地图最大放大级别
var MAPMAXLEVEL=20;


// 多媒体文件路径及读取字段配置
var multimediaConfig = {
    video:{path:'MEDIA',attrName:'video'},
    audio:{path:'MEDIA',attrName:'audio'},
    image:{path:'MEDIA',attrName:'image'},
    doc:{path:'MEDIA',attrName:'doc'},
    links:[
        {attrName:'ViewAddres',chiName:'单景模式'},
        {attrName:'CompareAddress',chiName:'对比模式'}
    ]
};

/**
 * 获取链接参数 公用方法
 */
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

String.format = function() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for ( var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

jQuery.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=jQuery;
        for (j=(d[0] == "jQuery") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};
