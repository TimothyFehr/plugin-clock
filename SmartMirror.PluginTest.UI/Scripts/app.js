/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Clock = (function () {
    function Clock(element, options) {
        var _this = this;
        this.step60 = 360 / 60;
        this.step12 = 360 / 12;
        this.step = (Math.PI * 2) / 12;
        this.$element = $(element);
        this.options = $.extend({}, Clock.Default, options);
        this.init();
        setInterval(function () { return _this.updateTime(); }, 1000);
    }
    Clock.prototype.init = function () {
        this.$second = this.$element.find(this.options.clockSecondSelector);
        this.$minute = this.$element.find(this.options.clockMinuteSelector);
        this.$hour = this.$element.find(this.options.clockHourSelector);
        var numberPosition = (this.options.clockSize / 2) - (this.options.numberSpaceBorder / 2) + 2;
        var numberPositionSpace = (this.options.clockSize / 2) - this.options.numberSpaceBorder;
        var angle = -this.step * 2;
        for (var i = 0; i < 12; i++) {
            $('<div>', {
                'class': this.options.clockNumberClass,
                css: {
                    left: (numberPosition) + numberPositionSpace * Math.cos(angle),
                    top: (numberPosition) + numberPositionSpace * Math.sin(angle)
                },
                text: i + 1
            }).appendTo(this.$element);
            angle += this.step;
        }
        this.updateTime();
    };
    Clock.prototype.updateTime = function () {
        var time = new Date();
        var secs = time.getSeconds() * this.step60 - 90;
        var mins = time.getMinutes() * this.step60 - 90;
        var hours = time.getHours() % 12 * this.step12 - 90;
        this.$second.css({
            '-webkit-transform': 'rotateZ(' + secs + 'deg)',
            '-moz-transform': 'rotate(' + secs + 'deg)',
            'transform': 'rotate(' + secs + 'deg)'
        });
        this.$minute.css({
            '-webkit-transform': 'rotateZ(' + mins + 'deg)',
            '-moz-transform': 'rotate(' + mins + 'deg)',
            'transform': 'rotate(' + mins + 'deg)'
        });
        this.$hour.css({
            '-webkit-transform': 'rotateZ(' + hours + 'deg)',
            '-moz-transform': 'rotate(' + hours + 'deg)',
            'transform': 'rotate(' + hours + 'deg)'
        });
    };
    return Clock;
}());
Clock.Default = {
    clockSecondSelector: '.clock-second',
    clockMinuteSelector: '.clock-minute',
    clockHourSelector: '.clock-hour',
    clockNumberClass: 'clock-number',
    clockSize: 150,
    numberSpaceBorder: 30
};
exports.Clock = Clock;


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var clock_1 = __webpack_require__(0);
$(document).ready(function () {
    // register plugin
    new clock_1.Clock($('.clock'), {
        clockSize: 320,
        numberSpaceBorder: 24
    });
});


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map