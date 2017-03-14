export interface IClockOptions {
    clockSecondSelector?: string;
    clockMinuteSelector?: string;
    clockHourSelector?: string;
    clockNumberClass?: string;
    clockSize: number;
    numberSpaceBorder: number;
}

export class Clock {
    $element: JQuery;
    $second: JQuery;
    $minute: JQuery;
    $hour: JQuery;
    options: IClockOptions;
    private step60 = 360 / 60;
    private step12 = 360 / 12;
    private step = (Math.PI * 2) / 12;

    constructor(element: JQuery, options: IClockOptions) {
        this.$element = $(element);
        this.options = $.extend({}, Clock.Default, options);

        this.init();
        setInterval(() =>  this.updateTime(), 1000);
    }

    public init() {
        this.$second = this.$element.find(this.options.clockSecondSelector);
        this.$minute = this.$element.find(this.options.clockMinuteSelector);
        this.$hour = this.$element.find(this.options.clockHourSelector);

        var numberPosition = (this.options.clockSize / 2) - (this.options.numberSpaceBorder/2) + 2;
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
    }

    private updateTime() {
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
    }

    static Default: IClockOptions = {
        clockSecondSelector: '.clock-second',
        clockMinuteSelector: '.clock-minute',
        clockHourSelector: '.clock-hour',
        clockNumberClass: 'clock-number',
        clockSize: 150,
        numberSpaceBorder: 30
    };
}

