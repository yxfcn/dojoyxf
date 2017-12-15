///<reference path="../typings/typings.d.ts"/>
import declare=require("dojo/_base/declare");
import lang=require("dojo/_base/lang");
import _WidgetBase = require("dijit/_WidgetBase");
import _TemplatedMixin = require("dijit/_TemplatedMixin");
import _WidgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");
import template=require("dojo/text!./templates/Stopwatch.html");
import nls=require("dojo/i18n!../nls/nl/Stopwatch.js");
import NumberUtils=require("dojo/number");

var Stopwatch=declare("Stopwatch",[_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],{
    templateString: template,
    baseClass: "dijitStopwatch",
    declaredClass: "app.componnents.Stopwatch",
    updateRate: 30,

    __SECMS: 1000,
    __MINMS: 1000 * 60,
    __HRSMS: 1000 * 60 * 60,

    __nls: nls,

    __currentTime: 0,
    __pauseTime: 0,
    __timer: null,
    __started: false,

    onStart: function(newValue) {
        if (newValue && !this.__started) {
            this.__start();
        } else if (!newValue && this.__started) {
            this.__stop();
        } else {
            this.__resume();
        }
    },

    onReset: function() {
        this.__pauseTime = 0;
        this.__started = false;
        this.__render(0);
    },

    __getTime: function() {
        return new Date().getTime();
    },
    __start: function() {
        this.__started = true;
        this.__currentTime = this.__getTime();
        this.__startTimer();
    },
    __startTimer: function() {
        this.__pauseTime = 0;
        this.startBtn.set("label", nls.stop);
        this.resetBtn.set("disabled", true);
        this.__timer = setInterval(lang.hitch(this, "__render"), this.__SECMS / this.updateRate);
    },
    __stop: function() {
        clearInterval(this.__timer);
        this.startBtn.set("label", nls.resume);
        this.resetBtn.set("disabled", false);
        this.__pauseTime = this.__getTime();
    },
    __resume: function() {
        if (this.__pauseTime !== 0) {
            this.__currentTime += (this.__getTime() - this.__pauseTime);
        }
        this.__startTimer();
    },
    __render: function(milli) {
        if (milli === undefined) {
            milli = this.__getTime() - this.__currentTime;
        }
        var hrs = milli / this.__HRSMS;
        milli = milli % this.__HRSMS;
        var mins = milli / this.__MINMS;
        milli = milli % this.__MINMS;
        var secs = milli / this.__SECMS;
        milli = milli % this.__SECMS;

        this.hoursNode.innerHTML = this.__format(hrs, "00");
        this.minutesNode.innerHTML = this.__format(mins, "00");
        this.secondsNode.innerHTML = this.__format(secs, "00");
        this.milliNode.innerHTML = this.__format(milli, "000");
    },
    __format: function(value, pattern) {
        return NumberUtils.format(value, {
            pattern: pattern
        });
    },

    postCreate: function() {
        this.inherited(arguments);
        this.__render(0);
    }
});
export =Stopwatch;