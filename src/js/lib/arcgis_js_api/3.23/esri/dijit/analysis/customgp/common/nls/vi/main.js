// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/customgp/common/nls/vi/main",{common:{apply:"\u00c1p d\u1ee5ng",ok:"OK",cancel:"H\u1ee7y",yes:"C\u00f3",no:"Kh\u00f4ng",next:"Ti\u1ebfp",previous:"Tr\u01b0\u1edbc",back:"Quay l\u1ea1i",selected:"\u0111\u00e3 ch\u1ecdn",name:"T\u00ean",usage:"S\u1eed d\u1ee5ng",settings:"Thi\u1ebft l\u1eadp",home:"Trang ch\u1ee7",link:"Li\u00ean k\u1ebft",messages:"Th\u00f4ng b\u00e1o",outputs:"\u0110\u1ea7u ra",title:"Ti\u00eau \u0111\u1ec1",thumbnail:"H\u00ecnh thu nh\u1ecf",url:"URL",
actions:"C\u00e1c h\u00e0nh \u0111\u1ed9ng",layer:"L\u1edbp",action:"H\u00e0nh \u0111\u1ed9ng",input:"\u0110\u1ea7u v\u00e0o",output:"\u0110\u1ea7u ra",type:"Lo\u1ea1i",required:"Y\u00eau c\u1ea7u",options:"T\u00f9y ch\u1ecdn",label:"Nh\u00e3n",tooltip:"Ch\u00fa gi\u1ea3i c\u00f4ng c\u1ee5",visible:"Hi\u1ec3n th\u1ecb",symbol:"K\u00fd hi\u1ec7u",popup:"C\u1eeda s\u1ed5 pop-up",upload:"T\u1ea3i l\u00ean",execute:"Th\u1ef1c hi\u1ec7n",help:"Tr\u1ee3 gi\u00fap",executing:"Th\u1ef1c hi\u1ec7n",clear:"X\u00f3a",
error:"L\u1ed7i",zoomTo:"Ph\u00f3ng t\u1edbi",attribute:"Thu\u1ed9c t\u00ednh",exports:"Xu\u1ea5t",check:"Ki\u1ec3m tra",save:"L\u01b0u",close:"\u0110\u00f3ng",deleteText:"X\u00f3a",map:"B\u1ea3n \u0111\u1ed3",scene:"Scene",reset:"Thi\u1ebft l\u1eadp l\u1ea1i",icon:"Bi\u00ea\u0309u t\u01b0\u01a1\u0323ng",folder:"Th\u01b0 m\u1ee5c",share:"Chia s\u1ebb",view:"Xem",newText:"M\u1edbi",edit:"Ch\u1ec9nh s\u1eeda",wkid:"WKID",table:"B\u1ea3ng",zoomIn:"Thu nh\u1ecf",zoomOut:"Ph\u00f3ng to",continue1:"Ti\u1ebfp",
longitude:"Kinh \u0111\u1ed9",latitude:"V\u0129 \u0111\u1ed9",custom:"T\u00f9y ch\u1ec9nh",image:"H\u00ecnh \u1ea3nh",font:"Ph\u00f4ng ch\u1eef",text:"V\u0103n b\u1ea3n",all:"T\u1ea5t c\u1ea3",number:"S\u1ed1",percentage:"Ph\u1ea7n tr\u0103m",unit:"\u0110\u01a1n v\u1ecb",thousand:"Ng\u00e0n",billion:"T\u1ef7",million:"Tri\u1ec7u",none:"Kh\u00f4ng c\u00f3",field:"Tr\u01b0\u1eddng",operation:"Ho\u1ea1t \u0111\u1ed9ng",disableUpdateGeometry:"T\u1eaft C\u1eadp nh\u1eadt H\u00ecnh h\u1ecdc",preview:"Xem tr\u01b0\u1edbc"},
errorCode:"M\u00e3",errorMessage:"Th\u00f4ng b\u00e1o",errorDetail:"Chi ti\u1ebft",widgetPlaceholderTooltip:"\u0110\u1ec3 thi\u1ebft l\u1eadp, \u0111i t\u1edbi Ti\u1ec7n \u00edch v\u00e0 b\u1ea5m v\u00e0o tr\u00ecnh gi\u1eef ch\u1ed7 t\u01b0\u01a1ng \u1ee9ng",loadingShelter:{loading:"\u0110ang t\u1ea3i"},urlInput:{invalidUrl:"Url kh\u00f4ng h\u1ee3p l\u1ec7."},urlComboBox:{invalidUrl:"Url kh\u00f4ng h\u1ee3p l\u1ec7."},urlParams:{invalidToken:"M\u00e3 token kh\u00f4ng h\u1ee3p l\u1ec7",validateTokenError:"M\u00e3 token kh\u00f4ng h\u1ee3p l\u1ec7 ho\u1eb7c l\u1ed7i M\u1ea1ng"},
units:{miles:"D\u1eb7m",milesAbbr:"mi",kilometers:"Kil\u00f4m\u00e9t",kilometersAbbr:"km",feet:"B\u1ed9",feetAbbr:"ft",meters:"M\u00e9t",metersAbbr:"m",yards:"Th\u01b0\u1edbc",yardsAbbr:"yd",acres:"Acre",acresAbbr:"acre",nauticalMiles:"H\u1ea3i l\u00fd",nauticalMilesAbbr:"nmi",uSSurveyFeet:"Feet kh\u1ea3o s\u00e1t US",uSSurveyFeetAbbr:"ftUS",decimalDegree:"\u0110\u1ed9 th\u1eadp ph\u00e2n",decimalDegreeAbbr:"dd",degreeMinuteSeconds:"\u0110\u1ed9 ph\u00fat gi\u00e2y",degreeMinuteSecondsAbbr:"\u0111\u1ed9-ph\u00fat-gi\u00e2y",
squareMiles:"D\u1eb7m vu\u00f4ng",squareMilesAbbr:"mi2",squareKilometer:"Kil\u00f4m\u00e9t vu\u00f4ng",squareKilometerAbbr:"km2",squareFeet:"Feet vu\u00f4ng",squareFeetAbbr:"ft2",squareMeters:"M\u00e9t vu\u00f4ng",squareMetersAbbr:"m2",squareYards:"Th\u01b0\u1edbc vu\u00f4ng",squareYardsAbbr:"yd2",squareUSSurveyFeet:"Feet kh\u1ea3o s\u00e1t US vu\u00f4ng",squareUSSurveyFeetAbbr:"sq ftUS"}});