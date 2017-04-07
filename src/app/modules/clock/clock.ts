export interface IClockOptions {
    clockSecondSelector?: string;
    clockMinuteSelector?: string;
    clockHourSelector?: string;
    clockNumberClass?: string;
    clockNumberSize: number;
    clockSize: number;
    clockFaceBackgroundColor?: string;
    numberSpaceBorder: number;
    
}

export class Clock {
    $element: JQuery;
    $second: JQuery;
    $minute: JQuery;
    $hour: JQuery;
    options: IClockOptions;
    private date: number;
    private step60 = 360 / 60;
    private step12 = 360 / 12;
    private step = (Math.PI * 2) / 12;

    constructor(element: JQuery, options: IClockOptions, guid: string, dateString: number) {
        this.$element = $(element);
        this.options = $.extend({}, Clock.Default, options);
        this.date = dateString;
        this.$element.attr('id', guid);

        this.init();
        setInterval(() => this.updateTime(), 1000);
    }

    public init() {
        this.setNeedle();
        this.generateClockNumbers();
        this.updateTime();
        this.setClockFaceBackgroundColor();
    }

    private setClockFaceBackgroundColor() {
        this.$element.css('background-color', this.options.clockFaceBackgroundColor);
    }

    private setNeedle() {
        this.$second = this.$element.find(this.options.clockSecondSelector);
        this.$minute = this.$element.find(this.options.clockMinuteSelector);
        this.$hour = this.$element.find(this.options.clockHourSelector);
    }

    private generateClockNumbers() {
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
            }).appendTo(this.$element);
            angle += this.step;
        }
    }

    private updateTime() {      
        var time = new Date(this.date);
        this.date += 1000;
        var secs = time.getSeconds() * this.step60 - 90;
        var mins = time.getMinutes() * this.step60 - 90;
        var hours = (time.getHours() % 12) * this.step12 - 90 + (time.getMinutes() * (this.step12/60));

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
        clockNumberSize:24,
        clockSize: 150,
        clockFaceBackgroundColor: '#fff',
        numberSpaceBorder: 30
    };
}

