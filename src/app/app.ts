import { Clock } from './modules/clock/clock';
import { Guid } from './modules/guid/guid';

declare var moment: any;

$(document).ready(function () {
    // register plugin
    var clock = new Clock($('.clock-wrapper'),
        {
            clockSize: 320,
            numberSpaceBorder: 12,
            clockNumberSize: 24,
            useAnalogClock: true,
            showDate: true
        },
        new Guid().generateGuid(),
        moment().valueOf(),
        moment
    );

    // localStorage.setItem('clock', JSON.stringify(clock));
    // localStorage.setItem('clockElement', JSON.stringify(clock.$element))
    // localStorage.setItem('clockOptions', JSON.stringify(clock.options));
});