import { Clock } from './modules/clock/clock';
import { Guid } from './modules/guid/guid';

declare var moment: any;

$(document).ready(function () {
    var settings = {
        useAnalogClock: true,
        showDate: true,
        clockDateFormat: 'ddd, Do MMM'
    };

    // register plugin
    var clock = new Clock($('.clock-wrapper'),
        settings,
        new Guid().generateGuid(),
        moment().valueOf(),
        moment
    );


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
            } else {
                jsonData[this.name] = this.value;
            }
        });
        var data = JSON.stringify(jsonData);
    });
});