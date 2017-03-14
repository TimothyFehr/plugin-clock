"use strict";
var clock_1 = require("./modules/clock/clock");
$(document).ready(function () {
    // register plugin
    new clock_1.Clock($('.clock'), {
        clockSize: 320,
        numberSpaceBorder: 24
    });
});
//# sourceMappingURL=app.js.map