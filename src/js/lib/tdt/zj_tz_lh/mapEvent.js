var mapEvent = {
    zjchMap: null,
    map: null,
    defaultLocation: {lon: 120.06745136, lat: 29.17416216, level: 0},// 天地图 0 四维 8
    defaultMapType: '矢量',
    currentMapType:'矢量',
    featureIsClick: true,
    markerLayerName: 'markerVector',
    pointMarkerLayerName: 'pointMarkerVector',
    CircleLayer: 'circleVector',
    isPanZoomBar: false,
    isNavigation: true,
    isMousePosition: true,
    isInitMarkerLayer: true,
    isInitRouteLayer: true,    // 公交驾车layer
    createMap: function (divmap) {
        var config = {
            mapdiv: divmap,
            isPanZoomBar: this.isPanZoomBar,
            isNavigation: this.isNavigation,
            isMousePosition: this.isMousePosition
        };
        this.zjchMap = new ZJCHMap(config);
        $('#' + divmap).contextmenu({
            target: '#context-menu',
            onItem: function (context, e) {
                var i = e.target.tabIndex;
                if (i == 1) {
                    //设置起点
                    Navigator.setRoutePoint(true, divmap);
                } else if (i == 2) {
                    //设置终点
                    Navigator.setRoutePoint(false, divmap);
                } else if (i == 3) {
                    $(".tripRoute:eq(1)").find("i").removeClass("byBus");
                    $(".tripRoute:eq(0)").find("i").removeClass("byCar");
                    $(".tripRoute:eq(1)").removeClass("changeFont");
                    $(".tripRoute:eq(0)").removeClass("changeFont");
                    //切换模式
                    if ($(e.target).text() == '切换至公交查询') {
                        $(".tripRoute:eq(1)").addClass("changeFont");
                        $(".tripRoute:eq(1)").find("i").addClass("byBus");
                        Navigator.busDriver = true;
                        Navigator.showBusRoute();
                        $(e.target).text('切换至路线查询');
                    } else {
                        $(".tripRoute:eq(0)").addClass("changeFont");
                        $(".tripRoute:eq(0)").find("i").addClass("byCar");
                        $(e.target).text('切换至公交查询');
                        Navigator.busDriver = false;
                        Navigator.showRoute();
                    }
                } else if (i == 4) {
                    //清除
                    closeBusRoute();
                }
            }
        });
    },
    initMap: function (divmap) {
        this.createMap(divmap);
        this.zjchMap.switchBaseLayer(mapEvent.zjchMap.maptype);
        //this.zjchMap.beforeLoadCountryLayer();
        this.initLocation(this.defaultLocation.lon, this.defaultLocation.lat, this.defaultLocation.level);
        this.map = this.zjchMap.map;
        //注册鼠标移动获取行政区划事件
        this.setMapMoveendQueryDivision(true);
        if (this.isInitMarkerLayer) {
            this.zjchMap.addMarkerLayer(this.markerLayerName, this.featureIsClick);
            this.zjchMap.addPointMarkerLayer(this.pointMarkerLayerName);
            this.zjchMap.addCircleLayer(this.CircleLayer);
        }
        if (this.isInitRouteLayer) {
            // 路线layer
            this.zjchMap.addRouteLayer();
        }

        this.map.events.register('click', this.map, function (eventObj) {
            OpenLayers.Event.stop(eventObj);
            closeToolsDiv($('#gj'));
            closePositionCity($('#positionCity'));
            $(".searchTYPE").hide();
            //框选和圈选是否打开
            if(!rectangleIsOpen&&!circleIsOpen){
                slideupResult();
            }else if(rectangleIsOpen){
                $('#searchResultTotal').hide();
                rectangleIsOpen = false;
            }else if(circleIsOpen){
                $('#searchResultTotal').hide();
                circleIsOpen = false;
            }
            closeZYML();
            closeMENU();
            $('#context-menu').removeClass('open').off('click.context.data-api', 'li:not(.divider)');
        });
        //注册地图缩放事件
        //this.map.events.register('zoomend',this.map,this.isLoadCountryLayer);
        this.getLocationGEO(false);
        multiScreen.zjchMap[0] = mapEvent.zjchMap;
        this.addInterestLayer();

    },
    initLocation: function (lon, lat, level) {
        this.zjchMap.initLocation(lon, lat, level);
    },
    prompt: function (msg) {
        if(!$("#historyalert")[0]) {
            var html = "<div id='historyalert' class='alert alert-info alert-dismissible history-layer-alert fade in' role='alert'>";
            html += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
            html += msg + "</div>";
            $("#center").append(html);
            //警告窗自动关闭
            setTimeout(function () {
                $("#historyalert").remove()
            }, 2000);
        }
    },
    setMapMoveendQueryDivision: function (registerStatus) {
        if (registerStatus) {
            this.map.events.register('moveend', this.map, this.move_end_fun);
        } else {
            this.map.events.unregister('moveend', this.map, this.move_end_fun);
        }
    },
    move_end_fun: function () {
        var bounds =mapEvent.map.getExtent();
        var str = bounds.toString();
        var params = {
            v: 2,
            withgeometry: false,
            withparents: true,
            envelope: str
        };
        mapEvent.loadDivisionSearch(params, 1);
    },
    /**
     *  地图切换按钮
     * @param str
     */
    mapStatusSwitch: function (str,mapdiv) {
        //var maps = multiScreen.zjchMap;
        //var len = maps.length;
        //if (len > 0) {
        //    for (var i = 0; i < len; i++) {
        //        if (maps[i].maptype == str) {
        //            return;
        //        }
        //        maps[i].switchBaseLayer(str);
        //    }
        //
        //} else {
        //    if (this.zjchMap.maptype == str) {
        //        return;
        //    }
        //    this.zjchMap.switchBaseLayer(str);
        //}
        var curCenterLonLat = null;
        if ( dimension25Map && dimension25Map.dimension25Layers.length > 0){
            curCenterLonLat = dimension25Map.getCurrentDimension25MapCenter();
            // 卸载2.5维地图服务
            dimension25Map.uninstallDimension25Service();

            this.setMapMoveendQueryDivision(true);
        }
        var zjchmap=multiScreen.getZjchMapById(mapdiv) || mapEvent.zjchMap;
        if( zjchmap.maptype==str){
            return;
        }else{
            zjchmap.switchBaseLayer(str);
        }

        if(curCenterLonLat){
            this.map.setCenter(new OpenLayers.LonLat(curCenterLonLat.lon,curCenterLonLat.lat),curCenterLonLat.level);
        }

    },

    zoomTo: function (level) {
        this.zjchMap.zoomTo(level);
    },
    zoomIn: function () {
        var level = this.zjchMap.getLevel();
        if (level < 17) {
            this.zoomTo(level + 1);
        }
    },
    zoomOut: function () {
        var level = this.zjchMap.getLevel();
        if (level > 1) {
            this.zoomTo(level - 1);
        }
    },
    renderMap: function () {
        this.zjchMap.renderMap();
    },
    updateSize: function () {
        this.zjchMap.updateSize();
    },
    popupClose: function () {
        this.zjchMap.keepXXRemovePopupInMap();
        if ($("#autoCompleteDiv").is(":visible")) {
            $("#autoCompleteDiv").hide();
        }
    },
    ipLocation: function () {
        // todo: IP定位 lg
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            jsonp: "callback",
            cache: false,
            url: ipLocationURL_,
            data: {
                ver: 'v1.0',
                pver: 'v1.0',
                ip: localhostIP,
                ef: 1
            },
            async: false,
            success: function (response) {
                var result = response;
                var lon, lat;
                if (result) {
                    var status = result.status;
                    if (status == 0) {
                        if (result.res) {
                            lon = result.res.cplon;
                            lat = result.res.cplat;
                            mapEvent.zjchMap.initLocation(parseFloat(lon), parseFloat(lat), mapEvent.defaultLocation.level);
                        } else {
                            mapEvent.prompt("服务器异常");
                            mapEvent.zjchMap.initLocation(mapEvent.defaultLocation.lon, mapEvent.defaultLocation.lat, mapEvent.defaultLocation.level);
                        }
                    } else {
                        mapEvent.prompt(result.msg);
                        mapEvent.zjchMap.initLocation(mapEvent.defaultLocation.lon, mapEvent.defaultLocation.lat, mapEvent.defaultLocation.level);
                    }
                }
            }
        });
    },
    getIpLocationLevel: function (iplevel) {
        var level = 1;
        if (iplevel == 8) {
            level = 0;
        } else if (iplevel == 9) {
            level = 1;
        } else if (iplevel == 10) {
            level = 2;
        } else if (iplevel == 11) {
            level = 3;
        } else if (iplevel == 12) {
            level = 4;
        } else if (iplevel == 13) {
            level = 5;
        } else if (iplevel == 14) {
            level = 6;
        }
        return  level;
    },
    getCenter: function () {
        return this.zjchMap.getCenter();
    },
    initZjArea: function () {
        var bounds = new OpenLayers.Bounds(118.02252465, 27.04529041, 123.1561344, 31.18247145);
        this.zjchMap.map.zoomToExtent(bounds);
    },
    /**
     * 初始化 行政区位置
     * @param keywords
     * @param field
     */
    loadDivisionSearch: function (params, type) {
        var _this = this;
        $.ajax({
            type: "POST",
            dataType: 'jsonp',
            url: divisionSearch,
            async: true,
            data: params,
            success: function (obj) {
                var result = obj.result;
                if (!result)return;
                var z = 9;
                var bounds = null;
                var x = null, y = null;
                if (result.MAXX != "" && result.MAXY != "") {
                    var maxPoint = _this.zjchMap.transformTo900913(result.MAXX, result.MAXY);
                    var minPoint = _this.zjchMap.transformTo900913(result.MINX, result.MINY);
                    bounds = new OpenLayers.Bounds(minPoint.lon, minPoint.lat, maxPoint.lon, maxPoint.lat);
                    x = (bounds.left + bounds.right) / 2;
                    y = (bounds.bottom + bounds.top) / 2;
                    z = mapEvent.map.getZoomForExtent(bounds, false);
                } else {
                    x = result.LABELX;
                    y = result.LABELY;
                }

                var city = result.NAME;
                var _city = $.trim($("#city_location").html());
                if (city == _city)return;
                $("#city_location").html(result.NAME);
                $("#OID").val(result.OID);
                $("#fullName").val(result.FULLNAME);
                $("#cityName").val(result.CITY == "" ? result.NAME : result.CITY.NAME);
                var sectionType = result.SECTIONTYPE;
                _this.parseDivisionData(result);
                if (type == 2) {
                    _this.setMapMoveendQueryDivision(false);
                    if (z < 6) {
                        z = 6;
                    } // 默认加载浙江天地图图层*/
                    _this.map.setCenter(new OpenLayers.LonLat(x, y), z);
                    if (sectionType.indexOf("一级") > -1 || sectionType.indexOf("二级") > -1
                        || sectionType.indexOf("三级") > -1
                    //|| sectionType.indexOf("四级") > -1
                    ) {
                        //加载行政区划界限
                        beforeLoadBoundary(city);
                    }
                    //else{
                    //无边界时设置不显示
                    //_this.setVisibilityOfBoundary();
                    //}
                    // closePositionCity($('#positionCity'));
                    setTimeout(function(){_this.setMapMoveendQueryDivision(true);},5000);
                } else if (type == 3) {
                    _this.setMapMoveendQueryDivision(false);
                    _this.map.setCenter(new OpenLayers.LonLat(x, y), z);
//                    closePositionCity($('#positionCity'));
                    setTimeout(function(){_this.setMapMoveendQueryDivision(true);},5000);
                }
                closePositionCity($('#positionCity'));
            },
            error: function () {
            }
        });
    },
    parseDivisionData: function (result) {
        var children = result.children;
        $("#cityListBox").html("");
        $("#cityListBox").empty();
        var curCity = result.NAME;
        $("#curCity").html(curCity);

        var phtml = '<div class="nav_zj">';
        phtml += '<table align="center" style="margin:4px;width: 300px"><tr><td class="zj-city">';
        for (var i = 0; i < children.length; i++) {
            var divstr = '<li onclick="mapEvent.getDivisionList(\'{0}\',2);">{1}</li>';
            phtml += String.format(divstr, children[i].FULLNAME, children[i].NAME);
        }
        phtml += '</td></tr></table></div>';

        var parents = [result.PROVINCE, result.CITY, result.COUNTY, result.TOWN, result];
        var title = "";
        if (result.NAME == "浙江省") {
            title += '<a id="{divid}" href="javascript:mapEvent.getDivisionList(\'{fullname}\',2);">{name}</a>'.replace("{divid}", "catalognav_" + result.ID)
                .replace("{name}", result.NAME).replace("{fullname}", result.FULLNAME);
        } else {
            for (var i = 0, len = parents.length; i < len; i++) {
                var parent1 = parents[i];
                if (parent1 == null || parent1 == " " || parent1 == "") {
                    continue;
                } else {
                    title += '<a id="{divid}" geometry="{geometry}" href="javascript:mapEvent.getDivisionList(\'{fullname}\',2);"><span>{name}</span></a>'.replace("{divid}", "catalognav_" + parent1.ID)
                        .replace("{name}", parent1.NAME).replace("{fullname}", parent1.FULLNAME).replace("{geometry}", parent1.GEOMETRY);
                }
                if (title != "" && i != parents.length - 1) {
                    title += " &gt; ";
                }
            }
        }

        var html = '<div class="navigation_cur_city"><B>当前位置：</B> ' + title + '</div>';
        html += phtml;
        $("#cityHtml").empty();
        $("#cityHtml").html("");
        $("#cityHtml").append(html);

        if ($.trim($("#provinceCity").html()) == "") {
            var trs = '';
            var array = divisonSearch.parseJSON_province();
            $.each(array, function (i, item) {
                var hrefs = '';
                if (item.children && item.children.length > 0) {
                    $.each(item.children, function (e, child) {
                        var li = '<li onclick="{js};">' + child.name + '</li>';
                        if (item.exception == 'other') {
                            li = li.replace('{js}', "void(0)");
                        } else {
                            li = li.replace('{js}', "mapEvent.getDivisionList(\'" + child.fullName + "\',2)");
                        }
                        hrefs += li;
                    });
                }

                var tr = [
                    '<tr class="provinceCityList">',
                    '<td class="provinceListBox"><a name="' + item.EN + '" onclick="{js};">' + item.name + ':' + '</a></td>',
                    '<td class="cityListBox">' + hrefs + '</td>',
                    '</tr>'
                ];
                tr = tr.join('');
                if (item.exception) {
                    tr = tr.replace('{js}', "void(0)");
                } else {
                    tr = tr.replace('{js}', "mapEvent.getDivisionList(\'" + item.fullName + "\',2)");
                }
                trs += tr;
            });
            var table = '<table class="provinceAndCityBox">' + trs + '</table>';
            $("#provinceCity").empty();
            $("#provinceCity").html("");
            $("#provinceCity").append(table);
        }

        if ($.trim($("#OtherCity").html() == "")) {
            var trs_ = "";
            var array = divisonSearch.parseJSON_city();
            $.each(array, function (i, item) {
                var hrefs_ = '';
                if (item.arr && item.arr.length > 0) {
                    $.each(item.arr, function (e, arr) {
                        var li_ = '<li onclick="{js};">' + arr.name + '</li>';
                        if (item.exception == 'other') {
                            li_ = li_.replace('{js}', "void(0)");
                        } else {
                            li_ = li_.replace('{js}', "mapEvent.getDivisionList(\'" + arr.fullName + "\',2)");
                        }
                        hrefs_ += li_;
                    });

                    var tr_ = [
                        '<tr class="provinceCityList">',
                        '<td class="provinceListBox"><a name="' + item.en + '" onclick="{js};">' + item.en + ':' + '</a></td>',
                        '<td class="cityListBox">' + hrefs_ + '</td>',
                        '</tr>'
                    ];
                    tr_ = tr_.join('');
                    tr_ = tr_.replace('{js}', "void(0)");
                    trs_ += tr_;
                }
            });
            var table_ = '<table class="provinceAndCityBox customize-scroll-content">' + trs_ + '</table>';
            $("#OtherCity").empty();
            $("#OtherCity").html("");
            $("#OtherCity").append(table_);
            $("#OtherCity").append("<div class=\"customize-scroll-strip\"></div>");
        }
    },
    getDivisionList: function (fullName, type) {
        var params = {
            v: 2,
            withgeometry: false,
            withparents: true,
            fullname: fullName
        };
        this.loadDivisionSearch(params, type);
    },
    /**
     * 创建popup
     * @param id
     * @param feature
     */
    createPopupById: function (id, feature) {
        this.zjchMap.removePopupById(id);
        var popup = new OpenLayers.Popup(id, new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y), new OpenLayers.Size(0, 16), "", true, function (e) {
            closeBusRoute();
        });
        this.zjchMap.map.addPopup(popup);
    },
    /**
     * 清除所有的popup lg
     */
    destroyAllPopup: function () {
        var popups = this.zjchMap.map.popups;
        var len = popups.length;
        for (var i = 0; i < len; i++) {
            var popup = popups[0];
            popup.destroy();
        }
    },
    clearLayerByName: function (layerName) {
        this.zjchMap.clearLayerByName(layerName);
    },
    clearMarkerFeatures: function () {
        this.zjchMap.clearFeatures();
        this.zjchMap.removePopupInMap();


    },
    addPMarker: function (markerParam) {
        this.clearMarkerFeatures();
        this.zjchMap.clearRouteFeature();
        var popupData = markerParam;
        var p0 = popupData.centerx;
        var p1 = popupData.centery;
        popupData.lon = parseFloat(p0).toFixed(6) || p0;
        popupData.lat = parseFloat(p1).toFixed(6) || p1;
        var styleParams = {
            graphic: true,
            graphicWidth: 24,
            graphicHeight: 39,
            graphicXOffset: -11.5,
            graphicYOffset: -30,
            externalGraphic: 'images/red/1.png',
            graphicOpacity: 1,
            cursor: "pointer"
        };
        //点图查询标标志  点样式与其他不一样
        if(markerParam.isPointSearch){
            styleParams.externalGraphic='images/point-cluster.png';
        }
        this.zjchMap.addMarkerFeature(popupData, styleParams, this.zjchMap.markerVector);
        this.zjchMap.markerVector.setVisibility(true);
        mapEvent.showPopup(popupData);
        this.zjchMap.markerVector.popupCallback = this.getPopupContent;
    },
    addPageMarker: function (markerArr, searchType) {
        this.clearMarkerFeatures();
        this.zjchMap.clearRouteFeature();
        var len = markerArr.length;

        if (markerArr && len > 0) {
            for (var i = 0; i < len; i++) {
                var popupData = markerArr[i];
                var p0 = popupData.labelx;
                var p1 = popupData.labely;
                popupData.lon = parseFloat(p0).toFixed(6) || p0;
                popupData.lat = parseFloat(p1).toFixed(6) || p1;
                popupData.searchType = searchType;
                if (searchType == "spatialdata") {
                    var videoField = multimediaConfig['video'].attrName;
                    var audioField = multimediaConfig['audio'].attrName;
                    var imageField = multimediaConfig['image'].attrName;
                    var docField = multimediaConfig['doc'].attrName;
                    var links = multimediaConfig['links'];
                    if (popupData[videoField] && $.trim(popupData[videoField]) != '') {
                        popupData.videoPath = multimediaConfig['video'].path + '/' + popupData.metadataid + '/VIDEO/' + popupData.video;
                    }
                    if (popupData[audioField] && $.trim(popupData[audioField]) != '') {
                        popupData.audioPath = multimediaConfig['audio'].path + '/' + popupData.metadataid + '/AUDIO/' + popupData.audio;
                    }
                    if (popupData[imageField] && $.trim(popupData[imageField]) != '') {
                        var images = popupData.image.split(';');
                        var newImages = [];
                        for (var e = 0, len_imag = images.length; e < len_imag; e++) {
                            if (images[e] == null || images[e] == undefined || $.trim(images[e]) == '') {
                                continue;
                            }
                            newImages.push(images[e]);
                        }
                        var path = '';
                        for (var s = 0, len_s = newImages.length; s < len_s; s++) {
                            path += multimediaConfig['image'].path + '/' + popupData.metadataid + '/IMAGE/' + newImages[s];
                            if (s != newImages.length - 1) {
                                path += ',';
                            }
                        }
                        popupData.imagePath = path;
                    }
                    if (popupData[docField] && $.trim(popupData[docField]) != '') {
                        popupData.docPath = multimediaConfig['doc'].path + '/' + popupData.metadataid + '/DOC/' + popupData.doc;
                    }
                    var temp = [];
                    for (var l = 0, len_ = links.length; l < len_; l++) {
                        var link = links[l];
                        var attrName = link.attrName;
                        if (popupData[attrName] && $.trim(popupData[attrName]) != '') {
                            temp.push({path: popupData[attrName], chiName: link.chiName});
                        }
                    }
                    if (temp.length > 0) {
                        popupData.links = temp;
                    }
                }
                var styleParams = null;
                if (i < 10) {
                    styleParams = {
                        graphic: true,
                        graphicWidth: 24,
                        graphicHeight: 39,
                        graphicXOffset: -11.5,
                        graphicYOffset: -30,
                        externalGraphic: 'images/red/' + (i + 1) + '.png',
                        graphicOpacity: 1,
                        cursor: 'pointer'
                    };
                } else {
                    styleParams = {
                        graphic: true,
                        graphicWidth: 9,
                        graphicHeight: 8,
                        graphicXOffset: -4.5,
                        graphicYOffset: -8,
                        externalGraphic: 'images/red.png',
                        graphicOpacity: 1,
                        cursor: 'pointer'
                    };
                }

                //点图查询标标志  点样式与其他不一样
                if(markerArr[0].isPointSearch){
                    styleParams.externalGraphic='images/point-cluster.png';
                    mapEvent.showPopup(popupData);
                }
                if(searchByFeature!=null) {
                    switch (searchByFeature.type){
                        case 'circle':
                            popupData=calculateDistanceCircle(popupData);
                            break;
                        case 'rectangle':
                            popupData=calculateDistanceRectangle(popupData);
                            break;

                    }

                }
                this.zjchMap.addMarkerFeature(popupData, styleParams, this.zjchMap.markerVector);
            }
            this.zjchMap.markerVector.setVisibility(true);
            this.zjchMap.markerVector.popupCallback = this.getPopupContent;
        }

        //点加载完毕后，将点所在的图层zindex设置为最高级，防止点在显示时被后来添加的图层覆盖掉，不能点击。
        this.zjchMap.markerVector.setZIndex(500);
    },
    getPopupContent: function (params) {
        mapEvent.showPopup(params);
    },
    /*
     显示popup内容
     */
    showPopup: function (params) {
        var address = params.address == undefined ? "未知" : params.address;
        var name = params.name == undefined ? "未知" : params.name;

        var popupHtml = "";

        popupHtml += "<div class=\"popupTop\">";
        popupHtml += "<div class='popup_close_action' onclick='mapEvent.popupClose();'></div>";

        popupHtml += "<div class='popup_header' >";
        popupHtml += "<span>&nbsp;</span>";
        popupHtml += "<div class='popop_title'>" + name + "</div>";
        popupHtml += "</div>";

        switch (params.searchType) {
            case "spatialdata":
                popupHtml += "<div class='popup_content_wrap_spatialdata'>";
                var layerName = params.aliasname == undefined ? "无" : params.aliasname;//判断所属图层是否存在
                popupHtml += "<label>&nbsp;所属图层：" + layerName + "</label><br>";
                popupHtml += "<p>";
                var url = isNaN(params.metadataid)?null:"./home/metadata.html?id="+params.metadataid;
                popupHtml += "&nbsp;<a href='javascript:void(0);' onclick='mapEvent.openFancyboxForIframe(\"" + url + "\");'>查看图层元数据</a>&nbsp;";
                popupHtml += "<a href='javascript:void(0);' onclick='addMapLayer(\"" + params.metadataid + "\")'>添加图层</a>&nbsp;";
                popupHtml += "<a onclick=\"getAllDataById('" + params.objectid + "','" + params.tablename + "');\">查看全部数据</a>&nbsp;";
                var fileUrl = "";
                if (params.videoPath) {
                    fileUrl = "./home/showVideo.html?fileUrl=" + params.videoPath;
                    popupHtml += '<a href="javascript:void(0);" onclick="mapEvent.openFancyboxForIframe(\'' + fileUrl + '\')">查看视频</a>&nbsp;';
                }
                if (params.audioPath) {
                    fileUrl = "./home/showAudio.html?fileUrl=" + params.audioPath;
                    popupHtml += '<a href="javascript:void(0);" onclick="mapEvent.openFancyboxForIframe(\'' + fileUrl + '\')">听音频</a>&nbsp;';
                }
                if (params.imagePath) {
                    fileUrl = params.imagePath;
                    popupHtml += '<a href="javascript:void(0);" onclick="mapEvent.showFancyBoxImg(\'' + fileUrl + '\')">查看图片</a>&nbsp;';
                }
                if (params.docPath) {
                    popupHtml += '<a href="' + dituURL + params.docPath + '" target="_blank">下载word</a>&nbsp;';
                }
                if (params.links && params.links.length > 0) {
                    for (var l = 0; l < params.links.length; l++) {
                        var link = params.links[l];
                        popupHtml += '<a href="' + dituURL + link.path + '" target="_blank">' + link.chiName + '</a>&nbsp;';
                    }
                }
                popupHtml += "</p>";
                break;
            case "metadata":
                popupHtml += "<div class='popup_content_wrap'>";
                popupHtml += "地址：" + address;
                break;
            case "XQD":  // 兴趣点
                popupHtml += "<div class='popup_content_wrap'>";
                popupHtml += (address == "未知")?"":"地址："+address;
                break;
            //地名地址查询
            default :
                popupHtml += "<div class='popup_content_wrap'>";
                popupHtml += "地址：" + address;
        }
        popupHtml += "<div class='clearfix'></div>";
        popupHtml += "</div></div>";
        var phtml = "<div class='popup_tab_content'>";
        phtml += "<table class='nav_tab' cellpadding='0' cellspacing='0'>";
        phtml += "<tr>";
        phtml += "<td class='first blueA hover' data-tab=0 onclick='mapEvent.changeTAB(this)'><i class='to-icon'></i>到这去</td>";
        phtml += "<td class='second blueA' data-tab=1 onclick='mapEvent.changeTAB(this)'><i class='from-icon'></i>从这出发</td>";
        phtml += "<td class='third blueA' data-tab=2 onclick='mapEvent.changeTAB(this)'><i class='around-icon'></i>在附近找</td>";
        phtml += "</tr>";
        phtml += "</table>";

        phtml += "<div class='clearfix'></div>";

        phtml += "<div id='nav_B_C'>";
        phtml += "<input type='hidden' id='startEndVal' value='0'>";
        phtml += "<span class='popop-route' id='startEndLabel'>起点：</span>";
        phtml += "<input id='startEndKeyword' class='popup_input' type='text' autocomplete='off' maxlength='100' onfocus='Navigator.autoComplete(this)'>";
        phtml += "<div class=\"navi-input-box\">";
        phtml += "<input type='button' value='驾车' class='popup_content_button' onclick='Navigator.startQueryRoute(\"search\");'>";
        phtml += "<input type='button' value='公交' class='popup_content_button' onclick='Navigator.startQueryRoute(\"busline\");'>";
        phtml += "</div>";//navi-input-box end
        phtml += "</div>";

        phtml += " <div class='popup_aroundSearch' id='nearbyTool'>";
        phtml += "<div class=\"popup_aroundSearch_topic\">";
        phtml += "<a href='javascript:void(0);' onclick='showCategoriesAroundSearch(this," + params.lon + "," + params.lat + ")'>宾馆</a>";
        phtml += "<a href='javascript:void(0);' onclick='showCategoriesAroundSearch(this," + params.lon + "," + params.lat + ")'>公交</a>";
        phtml += "<a href='javascript:void(0);' onclick='showCategoriesAroundSearch(this," + params.lon + "," + params.lat + ")'>餐厅</a>";
        phtml += "<a href='javascript:void(0);' onclick='showCategoriesAroundSearch(this," + params.lon + "," + params.lat + ")'>银行</a>";
        phtml += "<a href='javascript:void(0);' onclick='showCategoriesAroundSearch(this," + params.lon + "," + params.lat + ")'>超市</a>";
        phtml += "</div>";//popup_aroundSearch_topic end
        //phtml += "<br>";
        phtml +="<div class=\"popup_aroundSearch_content\">";
        phtml += "<select id='around_range'>";
        phtml += "<option value='100米'>100米</option>";
        phtml += "<option value='200米'>200米</option>";
        phtml += "<option value='500米' selected=''>500米</option>";
        phtml += "<option value='1000米'>1000米</option>";
        phtml += "<option value='1500米'>1500米</option>";
        phtml += "<option value='2000米'>2000米</option>";
        phtml += "<option value='5000米'>5000米</option>";
        phtml += "</select>";
        phtml += "<div><input type='text' id='around_key' class='popup_input' placeholder='--请输入关键字--' /></div>";
        phtml += "<button type='button' value='' class='popup_content_button'";
        phtml += " onclick='aroundSearchBtn(" + params.lon + "," + params.lat + ")'></button>";
        phtml +="<div>";//popup_aroundSearch_content end
        phtml += "</div>";
        phtml += "</div>";

        popupHtml += phtml;
        popupHtml += "</div>";
        var point = this.zjchMap.transformTo900913(params.lon, params.lat);
        point.name = name;
        mapEvent.zjchMap.setThisPopupPoint(point);
        mapEvent.zjchMap.showPopup(point.lon, point.lat, popupHtml, 340, 200);
    },
    changeTAB: function (obj) {
        var tab = $(obj).attr("data-tab");
        if (tab == 0 || tab == "0") {
            $("#nav_B_C").show();
            $("#nearbyTool").hide();
            $("#startEndLabel").html("起点：");
            $("#startEndVal").val(tab);
        } else if (tab == 1 || tab == "1") {
            $("#nav_B_C").show();
            $("#nearbyTool").hide();
            $("#startEndLabel").html("终点：");
            $("#startEndVal").val(tab);
        } else if (tab == 2 || tab == "2") {
            $("#nav_B_C").hide();
            $("#nearbyTool").show();
        }
        var tr = $(obj).parent();
        $(tr).find("td").each(function (i, li) {
            if (li == obj) {
                $(li).addClass("hover");
            } else {
                $(li).removeClass("hover");
            }
        });
    },
    addResourceAsOneLayer: function (catalogId, fn) {
        var _this = this;
        $.ajax({
            type: "POST",
            dataType: 'jsonp',
            url: catalogSearch,
            fn: fn,
            data: {
                request: "getCatalogById",
                id: catalogId
            },
            success: function (obj) {
                var fn = this.fn;
                var name = obj.result[0].NAME;
                var services = obj.result[0].SERVICES;
                var metaid = obj.result[0].CATALOGID;
                if (fn != null && typeof(fn) == 'string' && fn.indexOf('nocapabilities') != -1) {
                    //点击'查看数据'链接过来 ,则不请求getCapabilities
                    if (services["wmts"]) {
                        /*      if(fn.indexOf('nocapabilities_search')!=-1){
                         //目录资源搜索结果中点击‘数据’的请求
                         layoutEvents.showSelectPanel('searchPanel');
                         }else{
                         layoutEvents.showSelectPanel('westLayerPanel');
                         }*/
                        var layerURI = services.wmts;
                        if (layerURI.indexOf('?') != -1) {
                            layerURI = layerURI.split('?')[0];
                        }
                        fn = null;
                        var layername = "D" + metaid;
                        _this.addWMTSToLayerTree(null, layerURI, name, layername, metaid, fn, false, "REST");
                        return;
                    }
                    //如果wmts服务不存在，继续向下走
                }
                if (services) {
                    if (services["wmts"]) {
                        LayoutEvent.addExternalLayerToMap("wmts", name, services.wmts, metaid, fn);
                        return;
                    }
                    if (services["wms"]) {
                        LayoutEvent.addExternalLayerToMap("wms", name, services.wms, metaid, fn);
                        return;
                    }
                    if (services["arcgisserverrest"]) {
                        LayoutEvent.addExternalLayerToMap("arcgisserverrest", name, services.arcgisserverrest, metaid, fn);
                        return;
                    }
                }
            }
        });
    },
    addWMTSToLayerTree: function (wmtscap, layerurl, name, layername, metaid, fn, isbaselayer, rest) {


        //获取getcapabilities提供的地址
        if (isbaselayer == null) {
            isbaselayer = false;
        }
        var options = {};
        if (wmtscap == null) {
            //没有请求getCapabilities
            options = {
                name: name,
                url: layerurl,
                layer: layername,
                matrixSet: 'esritilematirx',
                format: 'image/png',
                style: 'default',
                matrixIds: this.zjchMap.generateMatrixIds(5, 12),
                resolutions: this.zjchMap.mapResolutions,
                opacity: 1,
                isBaseLayer: isbaselayer,
                maxExtent: new OpenLayers.Bounds(
                    this.zjchMap.projCoordinate.X.lb,
                    this.zjchMap.projCoordinate.Y.lb,
                    this.zjchMap.projCoordinate.X.ub,
                    this.zjchMap.projCoordinate.Y.ub),
                nocapabilities: true,
                CAPABILITIESURL: layerurl
            };
        } else {
            var layer = wmtscap.contents.layers[0];
            for (var i = 0; i < wmtscap.contents.layers.length; i++) {
                if (layername == wmtscap.contents.layers[i].identifier) {
                    layer = wmtscap.contents.layers[i];

                }
            }
            var matrixset = layer.tileMatrixSetLinks[0].tileMatrixSet;
            var matrixs = wmtscap.contents.tileMatrixSets[matrixset].matrixIds;
            var style = 'default';
            if (layer.styles != null && layer.styles.length > 0) {
                style = layer.styles[0].identifier;
            }
            var layerMaxExtent = layer.bounds;
            var url = '';
            if (layerurl.indexOf('?') != -1) {
                url = layerurl.split('?')[0];
            }

            name = name ? name : (layer.title ? layer.title : '');
            options = {
                name: name,
                layer: layer.identifier,
                matrixSet: matrixset,
                format: layer.formats[0],
                style: style,
                isBaseLayer: isbaselayer,
                maxExtent: layerMaxExtent,
                CAPABILITIESURL: layerurl,
                url: url
            };
            if (this.zjchMap.projCoordinate.SRID == 4490) {
                var len = matrixs.length;
                var resolutions = [];
                for (var i = 0; i < len; i++) {
                    var resolution = matrixs[i].scaleDenominator / 420263251.3007425;
                    resolutions.push(resolution);
                }
                options.serverResolutions = resolutions;
                if (rest == "REST") {
                    options.requestEncoding = rest;
                }
            }
        }
        if (metaid != null) {
            options.metaid = metaid;
        }

        var layer = null;
        if (wmtscap != null && this.zjchMap.projCoordinate.SRID == 4490) {
            layer = (new OpenLayers.Format.WMTSCapabilities()).createLayer(wmtscap, options);
        } else {
            layer = new OpenLayers.Layer.WMTS(options);
        }
        if (name != undefined && name != "" && name != null) {
            layer.setName(name);
        }
        mapEvent.map.addLayer(layer);
        //mapEvent.map.map.addLayer(layer);
        //mapEvent.zjchMap.map.setLayerIndex(layer,mapEvent.zjchMap.map.getLayerIndex(mapEvent.zjchMap.getLayerByName("dragDrawLayer")));
        //mapEvent.zjchMap.getLayerByName("dragDrawLayer").setZIndex(500);


        LayoutEvent.addLayerToMenu_tools(layer.id, name, "map",metaid);
        //LayoutEvent.addLayerToMenu_tools(layer.id, name);
        /*if(layoutEvents.maptype == '三维'){
         // 加载到三维中
         // sgKMLThematicMap.DisplayKMLThematicMap(true);
         sgKMLThematicMap.AddThematicMap(layername, true);
         }*/

        if (fn != null) {
            fn(layer, fn);
        }
    },
    //地图置灰
    changeToGray: function () {
        var id = $("#mapscreentype").val();
        addArrayindexOf();
        if (multiScreen.zjchMap instanceof Array && multiScreen.zjchMap.length > 0) {
            var zjmap = multiScreen.zjchMap;
            for (var i = 0; i < zjmap.length; i++) {
                if (zjmap[i].mapdiv == id && zjmap[i].map != null) {
                    this.isSetToGray(zjmap[i]);
                    break;
                }
            }
        } else {
            var zjmap = mapEvent.zjchMap;
            if (zjmap.mapdiv == id && zjmap.map != null) {
                this.isSetToGray(zjmap);
            }
        }
    },
    //需要置灰的图层
    isSetToGray: function (zjmap) {
        var grayVal = zjmap.gray;
        for (var i = 0; i < zjmap.map.layers.length; i++) {
            if (zjmap.imgmapAnnoLayers.indexOf(zjmap.map.layers[i]) != -1 || zjmap.imgmapLayers.indexOf(zjmap.map.layers[i]) != -1 || zjmap.emapLayers.indexOf(zjmap.map.layers[i]) != -1 || zjmap.emapLayers.indexOf(zjmap.map.layers[i]) != -1) {
                if (!grayVal) {
                    if (navigator.userAgent.toLowerCase().indexOf("ie") > 0) {
                        var imgobj = zjmap.map.layers[i].div.getElementsByTagName('img');
                        var imgLength = imgobj.length;
                        if(navigator.userAgent.toLowerCase().indexOf("msie 10.0")>0||navigator.userAgent.toLowerCase().indexOf("msie 11.0")>0){
                            for(var j=0;j< imgLength;j++){
                                imgobj[j].className='ie11gray';

                            }
                            //zjmap.map.layers[i].div.className = 'ie11gray';
                        }else{
                            for(var j=0;j< imgLength;j++){
                                imgobj[j].className='iegray';
                            }
                        }


                    } else if($.browser.mozilla) {
                        zjmap.map.layers[i].div.className = 'firefoxgray';
                    }else if(navigator.userAgent.toLowerCase().indexOf("msie 10.0")>0||navigator.userAgent.toLowerCase().indexOf("msie 11.0")>0) {
                        zjmap.map.layers[i].div.className = 'ie11gray';
                    }else{
                        zjmap.map.layers[i].div.className = 'gray';
                    }

                    zjmap.gray = true;
                } else {
                    if (navigator.userAgent.toLowerCase().indexOf("ie") > 0) {
                        var imgobj = zjmap.map.layers[i].div.getElementsByTagName('img');
                        var imgLength = imgobj.length;

                        for(var j=0;j< imgLength;j++){
                            imgobj[j].className='';
                        }
                        zjmap.gray = false;
                    }else{
                        zjmap.map.layers[i].div.className = '';
                        zjmap.gray = false;
                    }

                }
            }
        }
    },
    //移除图层
    removeLayer: function () {
        var layerid = $("#layerid").val();
        var mapid = $("#mapscreentype1").val();
        var zjchMaps = multiScreen.zjchMap;
        var len = zjchMaps.length;
        var layer=null;
        for (var i = 0; i < len; i++) {
            if (zjchMaps[i].mapdiv == mapid) {
                layer=zjchMaps[i].getLayerById(layerid);
                zjchMaps[i].removeLayerById(layerid);
                break;
            }
        }
        //移除图层名称
        $("#menu_" + layerid).parent().parent().remove();
        this.deleteAddLayermetaids(layer);




    },
    deleteAddLayermetaids:function(layer){
        if(ExternalLayerids!=null&&ExternalLayerids.length>0){
            for(var j=0;j<ExternalLayerids.length;j++){
                if(ExternalLayerids[j]==layer.metaid){
                    ExternalLayerids.splice(j,1);
                    break;
                }
            }
            //ie 仅 Edge支持findIndex
            //var index=ExternalLayerids.findIndex(function(metaid){
            //    metaid==layer.metaid;
            //});
            //ExternalLayerids.splice(index,1);
        }
    },
    getLocationGEO: function (isLocation) {
        var _this = this;
        var options = {
            enableHighAccuracy: true,
            maximumAge: 1000
        };
        if (navigator.geolocation) {
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        }
        function onSuccess(position) {
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            //$("#startRoute").val("我的位置");
            $("#startRoute").attr("geo", longitude + "," + latitude);
            $(".icon").show();
            if (isLocation) {
                addPointToMap(longitude, latitude);
                _this.initLocation(longitude, latitude, 11);
            }
        }

        function onError(error) {
            switch (error.code) {
                case 1:
                    console.error("位置服务被拒绝");
                    break;
                case 2:
                    console.error("暂时获取不到位置信息");
                    break;
                case 3:
                    console.error("获取信息超时");
                    break;
                case 4:
                    console.error("未知错误");
                    break;
            }
        }

        function addPointToMap(lon, lat) {
            var popupData = {};
            popupData.lon = parseFloat(lon).toFixed(6) || lon;
            popupData.lat = parseFloat(lat).toFixed(6) || lat;
            var styleParams = {
                graphic: true,
                graphicWidth: 12,
                graphicHeight: 12,
                graphicXOffset: -6,
                graphicYOffset: -6,
                externalGraphic: 'images/blue.png',
                graphicOpacity: 1,
                cursor: 'pointer'
            };
            _this.zjchMap.addMarkerFeature(popupData, styleParams, _this.zjchMap.pointMarkerVector);
        }
    },
    openFancyboxForIframe: function (url) {
        if(url=="null"){
            mapEvent.prompt("没有找到相关图元数据!");
            return;
        }else{
            $.fancybox.open({
                href: url,
                type: 'iframe',
                padding: 0,
                scrolling: 'no',
                fitToView: true,
                width: 680,
                height: 500,
                autoSize: false,
                closeClick: false
            });
        }
    },
    /**
     * 查看图片
     * @param imgsStr
     */
    showFancyBoxImg: function (imgsStr) {
        var imags = [];
        if (imgsStr && imgsStr != "") {
            var imgs = imgsStr.split(",");
            $.each(imgs, function (i, img) {
                imags.push({
                    href: dituURL + img,
                    titleShow: false,
                    autoDimensions:false,
                    autoSize:false,
                    autoScale:false,
                    width:580,
                    height:450});
            });
        }
        $.fancybox(imags);
    },
    // 兴趣点功能
    div: 'titleDiv_JX',
    interestLayerControl: null,
    interestLayer: null,
    defaultFeatureStyles: {
        strokeColor: "#FF5500", //feature边框颜色
        strokeOpacity: 0,   //边框透明度
        strokeWidth: 1,     //边框宽度
        fillColor: "#00FF00",   //面的填充颜色
        fillOpacity: 0,
        pointRadius: 6
    },
    hoverFeatureStyles: {
        graphic: true,
        externalGraphic: 'images/tmp_bg.gif',
        graphicWidth: 16,
        graphicHeight: 16,
        graphicOpacity: 1
    },
    addInterestLayer: function () {
        //兴趣热点资源图层
        this.interestLayer = new OpenLayers.Layer.Vector("兴趣热点");
        this.map.addLayer(this.interestLayer);

        var callbacks = {
            over: mapEvent.feature_hover,
            out: mapEvent.feature_out
        };
        this.interestLayerControl = new OpenLayers.Control.SelectFeature(this.interestLayer, {
            onSelect: mapEvent.feature_click,
            callbacks: callbacks
        });
        this.map.addControl(this.interestLayerControl);

        this.zjchMap.deactiveAllControl();
        this.interestLayerControl.activate();

        this.requestInterestData();
        this.map.events.register('zoomend', this.map, this.clearFeatureName);
        this.map.events.register('moveend', this.map, this.requestInterestData);
    },
    feature_click: function (evt) {
        var params = {name: evt.data.name, lon: evt.geometry.x, lat: evt.geometry.y,searchType:"XQD"};
        mapEvent.showPopup(params);
        $("#autoCompleteDiv").hide();
        OpenLayers.Event.stop(evt);
    },
    feature_hover: function (feature) {
        /*
         鼠标一移到feature上时的执行动作
         */
        if (feature) {
            mapEvent.interestLayer.drawFeature(feature, mapEvent.hoverFeatureStyles);
            var pixel = mapEvent.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
            mapEvent.showFeatureName(pixel.x, pixel.y, feature, true);
        }

    },
    feature_out: function (feature) {
        /*
         鼠标移到feature外时的执行动作
         */
        if (feature) {
            mapEvent.interestLayer.drawFeature(feature, mapEvent.defaultFeatureStyles);
            var pixel = mapEvent.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
            mapEvent.showFeatureName(pixel.x, pixel.y, feature, false);
        }
    },
    showFeatureName: function (x, y, feature, isshow) {
        var mousePosition = {};
        mousePosition.x = x;
        mousePosition.y = y;
        var titleDiv = document.getElementById(mapEvent.div);
        if (isshow) {
            var contentHTML = '<span style="padding:5px;" >' + feature.data.name + '</span>';
            titleDiv.style.display = 'block';
            titleDiv.style.position = "absolute";
            titleDiv.style.left = (mousePosition.x + 15) + 'px';
            titleDiv.style.top = (mousePosition.y + 6) + 'px';
            titleDiv.innerHTML = contentHTML;
        } else {
            titleDiv.innerHTML = '';
            titleDiv.style.display = 'none';
        }
        OpenLayers.Event.stop(feature);
    },
    clearFeatureName: function () {
        var titleDiv = document.getElementById(mapEvent.div);
        titleDiv.innerHTML = '';
        titleDiv.style.display = 'none';
    },
    requestInterestData: function () {
        //var minx = mapEvent.map.getExtent().left;
        //var maxx = mapEvent.map.getExtent().right;
        //var miny = mapEvent.map.getExtent().bottom;
        //var maxy = mapEvent.map.getExtent().top;
        //
        //var zoom = mapEvent.map.getZoom();
        mapEvent.zjchMap.map
        var minx = mapEvent.zjchMap.map.getExtent().left;
        var maxx = mapEvent.zjchMap.map.getExtent().right;
        var miny = mapEvent.zjchMap.map.getExtent().bottom;
        var maxy = mapEvent.zjchMap.map.getExtent().top;

        var zoom = mapEvent.zjchMap.map.getZoom();
        var params = {
            withgeometry: false,
            searchtype: 'spatialdata',
            page: 1,
            pagesize: 500,
            keywords: '',
            city: '',
            v: 2,
            tableid: 'INTEREST_POINT,',
            minx: minx ? minx : '',
            maxx: maxx ? maxx : '',
            miny: miny ? miny : '',
            maxy: maxy ? maxy : '',
            lk: true
        };
        var level = mapEvent.getCurrentZoom(zoom);
        if (level) {
            params.field = level + ':1';

        }
        $.ajax({
            url: poisearchurl,
            data: params,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (res) {
                if (isExtent) {
                    var a = mapEvent.map.getLayer("OpenLayers_Layer_Vector_74");
                    var cl = a.getFeatureById("circleFeature");
                    var geo = cl.geometry;
                    mapEvent.map.zoomToExtent(geo.bounds, true);
                    isExtent = false;
                }
                mapEvent.drawFeature(res);
            }
        });
    },
    drawFeature: function (res) {
        this.interestLayer.removeAllFeatures();
        if (res) {
            var results = res.results;

            if (results) {
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var point = new OpenLayers.Geometry.Point(result.labelx, result.labely);
                    var feature = new OpenLayers.Feature.Vector(point, {name: result.fname}, this.defaultFeatureStyles);
                    this.interestLayer.addFeatures(feature);
                }
            }
        }
    },
    getCurrentZoom: function (zoom) {
        var level = null;
        zoom = zoom + 2;
        switch (zoom) {
            case 0:
                level = 'l0';
                break;
            case 1:
                level = 'l1';
                break;
            case 2:
                level = 'l2';
                break;
            case 3:
                level = 'l3';
                break;
            case 4:
                level = 'l4';
                break;
            case 5:
                level = 'l5';
                break;
            case 6:
                level = 'l6';
                break;
            case 7:
                level = 'l7';
                break;
            case 8:
                level = 'l8';
                break;
            case 9:
                level = 'l9';
                break;
            case 10:
                level = 'l10';
                break;
            case 11:
                level = 'l11';
                break;
            case 12:
                level = 'l12';
                break;
            case 13:
                level = 'l13';
                break;
            case 14:
                level = 'l14';
                break;
            case 15:
                level = 'l15';
                break;
            case 16:
                level = 'l16';
                break;
            case 17:
                level = 'l17';
                break;
            case 18:
                level = 'l19';
                break;
            case 20:
                level = 'l20';
                break;
        }
        return level;
    },
    /**
     *@Author  zkx
     *@Date 2016/9/9 15:11
     *@method  行政区区划边界隐藏
     *
     */
    setVisibilityOfBoundary:function() {
        for (var i = 0; i < multiScreen.zjchMap.length; i++) {
            multiScreen.zjchMap[i].map.layers[3].setVisibility(false);
        }
    }


};
