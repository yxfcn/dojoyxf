// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/printing/HeaderFooterSettingsBuilder",["esri/dijit/geoenrichment/utils/DateUtil"],function(g){return{createHeaderFooterParams:function(a,e,c){return(c.allAreas?a.getAnalysisAreas():[a.getCurrentAnalysisArea()]).map(function(b){var d=e.getDocumentDefaultStyles(),f=a.getReportData().reportObject.dataVintageDescription;return{header:{show:c.addHeader,title:a.getReportTitle(),subtitle:a.printConfig.subtitle,siteName:b.name,siteDesc:b.description,siteAddr:b.address,
latitude:b.latitude,longitude:b.longitude,style:{headerStyle:d,titleStyle:e.getTableDefaultStyles(null,"ReportTitle"),latLongStyle:e.getTableDefaultStyles(null,"GreyText")}},dataSource:{show:f&&c.addDataSource,sourceText:"Source: "+f,style:{dataSourceStyle:d}},footer:{show:c.addFooter,copyrightText:"\u00a9"+(new Date).getFullYear()+" Esri",formattedDate:g.getReportFooterDate(),style:{footerStyle:d}},documentStyle:d}})}}});