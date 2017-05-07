"use strict";
var clock_1 = require("./modules/clock/clock");
var guid_1 = require("./modules/guid/guid");
$(document).ready(function () {
    var settings = {
        useAnalogClock: true,
        showDate: true,
        clockDateFormat: 'ddd, Do MMM'
    };
    // register plugin
    var clock = new clock_1.Clock($('.clock-wrapper'), settings, new guid_1.Guid().generateGuid(), moment().valueOf(), moment);
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
        var data = JSON.stringify(jsonData);
    });
});
//# sourceMappingURL=app.js.map