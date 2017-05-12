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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Clock = (function () {
    function Clock(element, options, guid, dateString, moment) {
        var _this = this;
        this.step60 = 360 / 60;
        this.step12 = 360 / 12;
        this.step = (Math.PI * 2) / 12;
        this.$element = $(element);
        this.options = $.extend({}, Clock.Default, options);
        this.date = dateString;
        this.moment = moment;
        this.$element.attr('id', guid);
        this.init();
        setInterval(function () { return _this.updateTime(); }, 1000);
        setInterval(function () { return _this.updateDate(); }, 1000);
        window.addEventListener('resize', function () { return _this.init(); });
    }
    Clock.prototype.init = function () {
        if (this.options.useAnalogClock) {
            this.setAnalogClock();
            this.generateClockNumbers();
            this.setClockFaceBackgroundColor();
        }
        else {
            this.setDigitalClock();
        }
        this.updateTime();
        if (this.options.showDate) {
            this.setDate();
            this.updateDate();
        }
    };
    Clock.prototype.setClockFaceBackgroundColor = function () {
        this.$element.css('background-color', this.options.clockFaceBackgroundColor);
    };
    Clock.prototype.setAnalogClock = function () {
        this.$clockAnalog = this.$element.find(this.options.clockAnalogSelector);
        if (this.$clockAnalog) {
            this.$clockAnalog.addClass('show');
            this.$second = this.$clockAnalog.find(this.options.clockSecondSelector);
            this.$minute = this.$clockAnalog.find(this.options.clockMinuteSelector);
            this.$hour = this.$clockAnalog.find(this.options.clockHourSelector);
        }
    };
    Clock.prototype.setDigitalClock = function () {
        this.$clockDigital = this.$element.find(this.options.clockDigitalSelector);
        if (this.$clockDigital != null) {
            this.$clockDigital.addClass('show');
            this.$second = this.$clockDigital.find(this.options.clockSecondSelector);
            this.$minute = this.$clockDigital.find(this.options.clockMinuteSelector);
            this.$hour = this.$clockDigital.find(this.options.clockHourSelector);
        }
    };
    Clock.prototype.setDate = function () {
        this.$date = this.$element.find(this.options.clockDateSelector);
        if (this.$date != null) {
            this.$date.addClass('show');
            if (this.options.useAnalogClock) {
                this.$date.addClass('-center');
            }
        }
    };
    Clock.prototype.generateClockNumbers = function () {
        this.$element.find(this.options.clockNumberClassName).remove();
        var clockSize = this.$clockAnalog.width();
        var numberPosition = (clockSize / 2) - this.options.clockNumberSize / 2;
        var numberPositionSpace = (clockSize / 2) - this.options.numberSpaceBorder - this.options.clockNumberSize / 2;
        var angle = -this.step * 2;
        this.$clockAnalog.find('.' + this.options.clockNumberClassName).remove();
        for (var i = 0; i < 12; i++) {
            $('<div>', {
                'class': this.options.clockNumberClassName,
                css: {
                    left: (numberPosition) + numberPositionSpace * Math.cos(angle),
                    top: (numberPosition) + numberPositionSpace * Math.sin(angle)
                },
                text: i + 1
            }).appendTo(this.$clockAnalog);
            angle += this.step;
        }
    };
    Clock.prototype.updateTime = function () {
        var time = new Date(this.date);
        this.date += 1000;
        var secs = time.getSeconds();
        var mins = time.getMinutes();
        var hours = time.getHours();
        if (this.options.useAnalogClock) {
            secs = secs * this.step60 - 90;
            hours = ((hours % 12) * this.step12 - 90) + (mins * (this.step12 / 60));
            mins = mins * this.step60 - 90;
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
        }
        else {
            this.$second.html(this.getDigitalNumber(secs));
            this.$minute.html(this.getDigitalNumber(mins));
            this.$hour.html(this.getDigitalNumber(hours));
        }
    };
    Clock.prototype.updateDate = function () {
        if (this.$date != null) {
            var date = this.moment().format(this.options.clockDateFormat);
            this.$date.html(date);
        }
    };
    Clock.prototype.getDigitalNumber = function (number) {
        return number < 10 ? '0' + number : number.toString();
    };
    return Clock;
}());
Clock.Default = {
    clockAnalogSelector: '.clock-analog',
    clockDigitalSelector: '.clock-digital',
    clockDateSelector: '.clock-date',
    clockDateFormat: 'ddd, Do MMM',
    clockSecondSelector: '.clock-second',
    clockMinuteSelector: '.clock-minute',
    clockHourSelector: '.clock-hour',
    clockNumberClassName: 'clock-number',
    clockNumberSize: 24,
    clockFaceBackgroundColor: '#000',
    numberSpaceBorder: 12,
    useAnalogClock: true,
    showDate: true
};
exports.Clock = Clock;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Guid = (function () {
    function Guid() {
    }
    Guid.prototype.generateGuid = function () {
        var guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var hex = '0123456789abcdef';
        var r = 0;
        var guidResponse = '';
        for (var i = 0; i < 36; i++) {
            if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                // each x and y needs to be random
                r = Math.random() * 16 || 0;
            }
            if (guidHolder[i] === 'x') {
                guidResponse += hex[r];
            }
            else if (guidHolder[i] === 'y') {
                // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                r = r && 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                r = r || 0x8; // set pos 3 to 1 as 1???
                guidResponse += hex[r];
            }
            else {
                guidResponse += guidHolder[i];
            }
        }
        return guidResponse;
    };
    return Guid;
}());
exports.Guid = Guid;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var clock_1 = __webpack_require__(0);
var guid_1 = __webpack_require__(1);
$(document).ready(function () {
    // register plugin
    function initializeClock(settings) {
        new clock_1.Clock($('.clock-wrapper'), settings, new guid_1.Guid().generateGuid(), moment().valueOf(), moment);
    }
    function getApiUrlParam() {
        var params = location.search;
        var apiUrl = null;
        if (params.length > 0) {
            apiUrl = location.search.substring(1).split('=')[1];
        }
        return apiUrl;
    }
    if ($('.clock-wrapper').length > 0) {
        if (window.mirror != null) {
            window.mirror.onInitialized(function (settings) {
                initializeClock(settings);
            });
        }
        else {
            var defaultSettings = {
                useAnalogClock: true,
                showDate: true,
                clockDateFormat: 'ddd, Do MMM'
            };
            initializeClock(defaultSettings);
        }
    }
    if ($('.js-settings-form').length > 0) {
        var apiUrl = getApiUrlParam();
        if (apiUrl.length > 0) {
            $.getJSON(apiUrl, function (data) {
                $.each(data, function (key, val) {
                    switch (key) {
                        case 'useAnalogClock':
                            $('#clockType').val(val);
                            break;
                        case 'showDate':
                            $('#showDate').val(val);
                            break;
                        case 'clockDateFormat':
                            $('#dateFormat').val(val);
                            break;
                        default:
                            break;
                    }
                });
            });
        }
        $('.js-settings-form-submit').on('click', function () {
            event.preventDefault();
            event.stopPropagation();
            var $form = $(this).closest('.js-settings-form');
            var jsonData = {};
            $.each($form.serializeArray(), function () {
                var isBoolean = this.value === 'true' || this.value === 'false';
                if (isBoolean) {
                    var value = this.value === 'true' ? true : false;
                    jsonData[this.name] = value;
                }
                else {
                    jsonData[this.name] = this.value;
                }
            });
            var apiUrl = getApiUrlParam();
            if (apiUrl.length > 0) {
                $.ajax({
                    url: apiUrl,
                    type: 'put',
                    data: JSON.stringify(jsonData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json'
                });
            }
        });
    }
});


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map