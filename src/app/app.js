"use strict";
var clock_1 = require("./modules/clock/clock");
var guid_1 = require("./modules/guid/guid");
$(document).ready(function () {
    // register plugin
    var clock = new clock_1.Clock($('.clock'), {
        clockSize: 320,
        numberSpaceBorder: 12,
        clockNumberSize: 24
    }, new guid_1.Guid().generateGuid(), moment().valueOf());
    localStorage.setItem('clock', JSON.stringify(clock));
    localStorage.setItem('clockElement', JSON.stringify(clock.$element));
    localStorage.setItem('clockOptions', JSON.stringify(clock.options));
});
//# sourceMappingURL=app.js.map