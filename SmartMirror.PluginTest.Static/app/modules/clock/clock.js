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
        var numberPosition = (this.options.clockSize / 2) - this.options.clockNumberSize / 2;
        var numberPositionSpace = (this.options.clockSize / 2) - this.options.numberSpaceBorder - this.options.clockNumberSize / 2;
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
        var hours = (time.getHours() % 12) * this.step12 - 90 + (time.getMinutes() * (this.step12 / 60));
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
    clockNumberSize: 24,
    clockSize: 150,
    numberSpaceBorder: 30
};
exports.Clock = Clock;
//# sourceMappingURL=clock.js.map