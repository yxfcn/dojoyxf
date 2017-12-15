define(["require", "exports", "dojo/dom", "dojo/dom-style", "dojo/on"], function (require, exports, dom, domStyle, on) {
    "use strict";
    console.log("come in");
    var node = dom.byId("greeting");
    on(node, "click", function () {
        console.log("change color in the script file coming from out file");
        domStyle.set(node, "color", "red");
    });
});
//# sourceMappingURL=WidgetTest.js.map