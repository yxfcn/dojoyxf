///<reference path="../../typings/typings.d.ts"/>
import dom=require("dojo/dom");
import domStyle=require("dojo/dom-style");
import on=require("dojo/on");
import _WidgetBase=require("dijit/_WidgetBase");
import _TemplatedMixin=require("dijit/_TemplatedMixin");
import template=require("dojo/text!");

console.log("come in");
var node=dom.byId("greeting");
on(node,"click",function(){
    console.log("change color in the script file coming from out file");
    domStyle.set(node,"color","red");
})
