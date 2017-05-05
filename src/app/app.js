"use strict";
var clock_1 = require("./modules/clock/clock");
var guid_1 = require("./modules/guid/guid");
$(document).ready(function () {
    // register plugin
    var clock = new clock_1.Clock($('.clock-wrapper'), {
        numberSpaceBorder: 12,
        clockNumberSize: 24,
        useAnalogClock: true,
        showDate: true
    }, new guid_1.Guid().generateGuid(), moment().valueOf(), moment);
    // localStorage.setItem('clock', JSON.stringify(clock));
    // localStorage.setItem('clockElement', JSON.stringify(clock.$element))
    // localStorage.setItem('clockOptions', JSON.stringify(clock.options));
});
//# sourceMappingURL=app.js.map