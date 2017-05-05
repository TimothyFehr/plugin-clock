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
            if (this.setAnalogClock) {
                this.$date.addClass('-center');
            }
        }
    };
    Clock.prototype.generateClockNumbers = function () {
        this.$element.find(this.options.clockNumberClass).remove();
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
            mins = mins * this.step60 - 90;
            hours = (hours % 12) * this.step12 - 90 + (mins * (this.step12 / 60));
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
    clockDateFormat: 'ddd, d MMM',
    clockSecondSelector: '.clock-second',
    clockMinuteSelector: '.clock-minute',
    clockHourSelector: '.clock-hour',
    clockNumberClass: 'clock-number',
    clockNumberSize: 24,
    clockSize: 150,
    clockFaceBackgroundColor: '#fff',
    numberSpaceBorder: 30,
    useAnalogClock: true,
    showDate: true
};
exports.Clock = Clock;
//# sourceMappingURL=clock.js.map