export interface IClockOptions {
    clockAnalogSelector?: string;
    clockDigitalSelector?: string;
    clockDateSelector?: string;
    clockDateFormat?: string;
    clockSecondSelector?: string;
    clockMinuteSelector?: string;
    clockHourSelector?: string;
    clockNumberClassName?: string;
    clockNumberSize?: number;
    clockFaceBackgroundColor?: string;
    numberSpaceBorder?: number;
    useAnalogClock?: boolean;
    showDate?: boolean;
}

export class Clock {
    $element: JQuery;
    $clockAnalog: JQuery;
    $clockDigital: JQuery;
    $second: JQuery;
    $minute: JQuery;
    $hour: JQuery;
    $date: JQuery;
    options: IClockOptions;
    moment: any;
    private date: number;
    private step60 = 360 / 60;
    private step12 = 360 / 12;
    private step = (Math.PI * 2) / 12;

    constructor(element: JQuery, options: IClockOptions, dateString: number, moment: any) {
        this.$element = $(element);
        this.options = $.extend({}, Clock.Default, options);
        this.date = dateString;
        this.moment = moment;

        this.init();
        setInterval(() => this.updateTime(), 1000);
        setInterval(() => this.updateDate(), 1000);
        window.addEventListener('resize', () => this.init());

    }

    public init() {
        if (this.options.useAnalogClock) {
            this.setAnalogClock();
            this.generateClockNumbers();
            this.setClockFaceBackgroundColor();
        } else {
            this.setDigitalClock();
        }

        this.updateTime();
        if (this.options.showDate) {
            this.setDate();
            this.updateDate();
        }
    }

    private setClockFaceBackgroundColor() {
        this.$element.css('background-color', this.options.clockFaceBackgroundColor);
    }

    private setAnalogClock() {
        this.$clockAnalog = this.$element.find(this.options.clockAnalogSelector);

        if (this.$clockAnalog) {
            this.$clockAnalog.addClass('show');
            this.$second = this.$clockAnalog.find(this.options.clockSecondSelector);
            this.$minute = this.$clockAnalog.find(this.options.clockMinuteSelector);
            this.$hour = this.$clockAnalog.find(this.options.clockHourSelector);
        }
    }

    private setDigitalClock() {
        this.$clockDigital = this.$element.find(this.options.clockDigitalSelector);

        if (this.$clockDigital != null) {
            this.$clockDigital.addClass('show');
            this.$second = this.$clockDigital.find(this.options.clockSecondSelector);
            this.$minute = this.$clockDigital.find(this.options.clockMinuteSelector);
            this.$hour = this.$clockDigital.find(this.options.clockHourSelector);
        }
    }

    private setDate() {
        this.$date = this.$element.find(this.options.clockDateSelector);
        if (this.$date != null) {
            this.$date.addClass('show');

            if (this.options.useAnalogClock) {
                this.$date.addClass('-center');
            }
        }
    }

    private generateClockNumbers() {
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
    }

    private updateTime() {
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
        } else {
            this.$second.html(this.getDigitalNumber(secs));
            this.$minute.html(this.getDigitalNumber(mins));
            this.$hour.html(this.getDigitalNumber(hours));
        }
    }

    private updateDate() {
        if (this.$date != null) {
            var date = this.moment().format(this.options.clockDateFormat);
            this.$date.html(date);
        }
    }

    private getDigitalNumber(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }

    static Default: IClockOptions = {
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
}

